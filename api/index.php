<?php

declare(strict_types=1);

session_name('tukodph_cms');
session_start();

const DATA_ROOT = __DIR__ . '/../data';
const PORTALS_FILE = DATA_ROOT . '/portals.json';
const CONTENT_ROOT = DATA_ROOT . '/content';
const INQUIRY_ROOT = DATA_ROOT . '/inquiries';
const MEDIA_ROOT = DATA_ROOT . '/media';
const LOCAL_CONFIG_FILE = __DIR__ . '/../config.local.php';
const DATABASE_CONFIG_FILE = __DIR__ . '/../config/database.php';
const UPLOAD_ROOT = __DIR__ . '/../uploads';
const TEMPLATE_ROOT = __DIR__ . '/../templates';
const MAX_UPLOAD_BYTES = 8388608;

$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . ($origin === 'null' ? '*' : $origin));
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Tenant-ID');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return $_POST;
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        respond(['ok' => false, 'error' => 'Invalid JSON request body.'], 400);
    }

    return $decoded;
}

function cms_debug_detail(string $message): string
{
    return clean_text($message, 600);
}

function set_last_database_error(string $message): void
{
    $GLOBALS['tukodph_last_database_error'] = cms_debug_detail($message);
}

function last_database_error(): string
{
    return clean_text($GLOBALS['tukodph_last_database_error'] ?? '', 600);
}

function env_value(array $keys): string
{
    foreach ($keys as $key) {
        $value = $_SERVER[$key] ?? $_ENV[$key] ?? getenv($key);
        if (is_string($value) && trim($value) !== '') {
            return trim($value);
        }
    }

    return '';
}

function request_host(): string
{
    $host = strtolower(trim((string) ($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? '')));
    if (str_starts_with($host, '[')) {
        $closingBracket = strpos($host, ']');
        return $closingBracket === false ? $host : substr($host, 1, $closingBracket - 1);
    }
    return explode(':', $host, 2)[0];
}

function is_local_request(): bool
{
    $host = request_host();
    if ($host === '') {
        return false;
    }

    if (in_array($host, ['localhost', '127.0.0.1', '::1'], true)) {
        return true;
    }

    return str_ends_with($host, '.local');
}

function local_config(): array
{
    static $config = null;

    if ($config !== null) {
        return $config;
    }

    if (!is_local_request() || !is_file(LOCAL_CONFIG_FILE)) {
        $config = [];
        return $config;
    }

    $loaded = require LOCAL_CONFIG_FILE;
    $config = is_array($loaded) ? $loaded : [];
    return $config;
}

function cms_username(): string
{
    $fromEnv = env_value(['TUKODPH_CMS_USERNAME', 'CMS_USERNAME']);
    if ($fromEnv !== '') {
        return $fromEnv;
    }

    $local = local_config();
    $value = $local['cms_username'] ?? '';
    return is_string($value) ? trim($value) : '';
}

function cms_password(): string
{
    $fromEnv = env_value(['TUKODPH_CMS_PASSWORD', 'CMS_PASSWORD']);
    if ($fromEnv !== '') {
        return $fromEnv;
    }

    $local = local_config();
    $value = $local['cms_password'] ?? '';
    return is_string($value) ? trim($value) : '';
}

function database_connection(): ?PDO
{
    static $pdo = false;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    if (!is_file(DATABASE_CONFIG_FILE)) {
        set_last_database_error('Database config file is missing.');
        return null;
    }

    $config = require DATABASE_CONFIG_FILE;
    if (!is_array($config)) {
        set_last_database_error('Database config file is invalid.');
        return null;
    }

    $host = trim((string) ($config['host'] ?? 'localhost'));
    $port = (int) ($config['port'] ?? 3306);
    $database = trim((string) ($config['database'] ?? ''));
    $username = trim((string) ($config['username'] ?? ''));
    $password = (string) ($config['password'] ?? '');
    $charset = trim((string) ($config['charset'] ?? 'utf8mb4'));

    if ($database === '' || $username === '') {
        set_last_database_error('Database name or username is missing in config/database.php.');
        return null;
    }

    try {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $host,
            $port,
            $database,
            $charset
        );

        $pdo = new PDO(
            $dsn,
            $username,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );

        set_last_database_error('');
        return $pdo;
    } catch (Throwable $error) {
        error_log('TukodPH CMS database connection failed: ' . $error->getMessage());
        set_last_database_error('Database connection failed: ' . $error->getMessage());
        return null;
    }
}

function database_user_profiles(): array
{
    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        return [];
    }

    try {
        $rows = $pdo->query(
            "SELECT
                u.id,
                u.username,
                u.email,
                u.password,
                u.is_super_admin,
                u.status AS user_status,
                p.tenant_id,
                pu.role,
                pu.status AS assignment_status
             FROM users u
             LEFT JOIN portal_user pu ON pu.user_id = u.id
             LEFT JOIN portals p ON p.id = pu.portal_id
             WHERE u.status = 'active'
             ORDER BY u.id ASC"
        )->fetchAll();
    } catch (Throwable $error) {
        error_log('TukodPH CMS user query failed: ' . $error->getMessage());
        return [];
    }

    $knownTenants = known_portal_tenant_ids();
    $grouped = [];

    foreach ($rows as $row) {
        $userId = (int) ($row['id'] ?? 0);
        if ($userId <= 0) {
            continue;
        }

        if (!isset($grouped[$userId])) {
            $loginName = trim((string) ($row['username'] ?? ''));
            if ($loginName === '') {
                $loginName = trim((string) ($row['email'] ?? ''));
            }
            if ($loginName === '') {
                continue;
            }

            $isSuperAdmin = (bool) ($row['is_super_admin'] ?? false);
            $grouped[$userId] = [
                'username' => $loginName,
                'email' => trim((string) ($row['email'] ?? '')),
                'passwordHash' => (string) ($row['password'] ?? ''),
                'role' => $isSuperAdmin ? 'admin' : 'editor',
                'allowedTenants' => $isSuperAdmin ? $knownTenants : [],
                'defaultTenant' => '',
                'canSwitchTenants' => $isSuperAdmin,
                'isSuperAdmin' => $isSuperAdmin,
            ];
        }

        $tenantId = strtolower(trim((string) ($row['tenant_id'] ?? '')));
        $assignmentActive = (string) ($row['assignment_status'] ?? '') === 'active';

        if ($tenantId !== '' && $assignmentActive) {
            $grouped[$userId]['allowedTenants'][] = $tenantId;
            if ((string) ($row['role'] ?? '') === 'portal_admin') {
                $grouped[$userId]['role'] = 'admin';
            }
        }
    }

    $profiles = [];
    foreach ($grouped as $profile) {
        $profile['allowedTenants'] = array_values(array_unique($profile['allowedTenants']));
        if (!$profile['isSuperAdmin'] && $profile['allowedTenants'] === []) {
            continue;
        }
        $profile['defaultTenant'] = $profile['allowedTenants'][0] ?? '';
        $profile['canSwitchTenants'] = $profile['isSuperAdmin'] || count($profile['allowedTenants']) > 1;
        if ($profile['passwordHash'] === '') {
            continue;
        }
        $profiles[] = $profile;
    }

    return $profiles;
}

function verify_profile_password(array $profile, string $password): bool
{
    $hash = (string) ($profile['passwordHash'] ?? '');
    if ($hash !== '') {
        return password_verify($password, $hash);
    }

    $plain = (string) ($profile['password'] ?? '');
    return $plain !== '' && hash_equals($plain, $password);
}

function portal_registry(): array
{
    $data = read_json_file(PORTALS_FILE, ['portals' => []]);
    return is_array($data['portals'] ?? null) ? array_values($data['portals']) : [];
}

function known_portal_tenant_ids(): array
{
    $tenants = [];
    foreach (portal_registry() as $portal) {
        $id = strtolower(trim((string) ($portal['id'] ?? '')));
        if ($id !== '' && preg_match('/^[a-z0-9][a-z0-9-]{1,62}$/', $id)) {
            $tenants[] = $id;
        }
    }

    return array_values(array_unique($tenants));
}

function template_manifest(string $templateId): ?array
{
    $templateId = strtolower(trim($templateId));
    if ($templateId === '' || !preg_match('/^[a-z0-9][a-z0-9-]{1,62}$/', $templateId)) {
        return null;
    }

    $path = TEMPLATE_ROOT . '/' . $templateId . '/template.json';
    if (!is_file($path)) {
        return null;
    }

    $raw = read_json_file($path, []);
    if ($raw === []) {
        return null;
    }

    $siteWidgets = is_array($raw['siteWidgets'] ?? null) ? $raw['siteWidgets'] : [];

    return [
        'id' => clean_text($raw['id'] ?? $templateId, 80),
        'name' => clean_text($raw['name'] ?? 'Festival template', 120),
        'description' => clean_text($raw['description'] ?? '', 400),
        'version' => clean_text($raw['version'] ?? '1.0.0', 40),
        'preview' => clean_text($raw['preview'] ?? '', 255),
        'frontendPath' => clean_text($raw['frontendPath'] ?? 'frontend', 120),
        'legacyReferencePath' => clean_text($raw['legacyReferencePath'] ?? '', 160),
        'seedContentPath' => clean_text($raw['seedContentPath'] ?? 'seed-content.json', 120),
        'scaffoldPath' => clean_text($raw['scaffoldPath'] ?? '', 160),
        'supportedContentTypes' => array_values(array_map(
            static fn(mixed $value): string => clean_text($value, 80),
            is_array($raw['supportedContentTypes'] ?? null) ? $raw['supportedContentTypes'] : []
        )),
        'implementationFamily' => clean_text($raw['implementationFamily'] ?? 'standard-festival-site', 80),
        'structureVersion' => clean_text($raw['structureVersion'] ?? 'festival-site-v1', 80),
        'isGeneric' => (bool) ($raw['isGeneric'] ?? true),
        'designTone' => clean_text($raw['designTone'] ?? '', 160),
        'palette' => array_values(array_map(
            static fn(mixed $value): string => clean_text($value, 20),
            is_array($raw['palette'] ?? null) ? $raw['palette'] : []
        )),
        'siteWidgets' => [
            'enabled' => (bool) ($siteWidgets['enabled'] ?? true),
            'countdownEnabled' => (bool) ($siteWidgets['countdownEnabled'] ?? true),
            'supportedTypes' => array_values(array_filter(array_map(
                static fn(mixed $value): string => clean_text($value, 80),
                is_array($siteWidgets['supportedTypes'] ?? null) ? $siteWidgets['supportedTypes'] : []
            ))),
        ],
    ];
}

function template_catalog(): array
{
    $templates = [];
    foreach (glob(TEMPLATE_ROOT . '/*', GLOB_ONLYDIR) ?: [] as $directory) {
        $templateId = basename($directory);
        $manifest = template_manifest($templateId);
        if ($manifest === null) {
            continue;
        }
        $templates[] = $manifest;
    }

    usort(
        $templates,
        static fn(array $left, array $right): int => strcmp((string) ($left['name'] ?? ''), (string) ($right['name'] ?? ''))
    );

    return $templates;
}

function normalize_allowed_tenants(array $values, array $knownTenants): array
{
    $allowed = [];
    foreach ($values as $value) {
        $candidate = strtolower(trim((string) $value));
        if ($candidate === '' || !preg_match('/^[a-z0-9][a-z0-9-]{1,62}$/', $candidate)) {
            continue;
        }
        if ($knownTenants !== [] && !in_array($candidate, $knownTenants, true)) {
            continue;
        }
        $allowed[] = $candidate;
    }

    if ($allowed === [] && $knownTenants !== []) {
        return array_values($knownTenants);
    }

    return array_values(array_unique($allowed));
}

function normalize_user_profile(array $profile, array $knownTenants): ?array
{
    $username = clean_text($profile['username'] ?? '', 80);
    $password = trim((string) ($profile['password'] ?? ''));
    if ($username === '' || $password === '') {
        return null;
    }

    $role = clean_text($profile['role'] ?? 'editor', 30);
    if (!in_array($role, ['writer', 'editor', 'admin'], true)) {
        $role = 'editor';
    }

    $rawTenants = is_array($profile['tenants'] ?? null) ? $profile['tenants'] : $knownTenants;
    $allowedTenants = normalize_allowed_tenants($rawTenants, $knownTenants);
    $defaultTenant = strtolower(trim((string) ($profile['defaultTenant'] ?? $profile['default_tenant'] ?? '')));
    if ($defaultTenant === '' || !in_array($defaultTenant, $allowedTenants, true)) {
        $defaultTenant = $allowedTenants[0] ?? '';
    }

    $canSwitchTenants = (bool) ($profile['canSwitchTenants'] ?? $profile['can_switch_tenants'] ?? (count($allowedTenants) > 1));

    return [
        'username' => $username,
        'password' => $password,
        'role' => $role,
        'allowedTenants' => $allowedTenants,
        'defaultTenant' => $defaultTenant,
        'canSwitchTenants' => $canSwitchTenants,
    ];
}

function cms_user_profiles(): array
{
    static $profiles = null;

    if ($profiles !== null) {
        return $profiles;
    }

    $knownTenants = known_portal_tenant_ids();
    $profiles = database_user_profiles();

    $rawEnvProfiles = env_value(['TUKODPH_CMS_USERS_JSON', 'CMS_USERS_JSON']);
    if ($profiles === [] && $rawEnvProfiles !== '') {
        $decoded = json_decode($rawEnvProfiles, true);
        if (is_array($decoded)) {
            foreach ($decoded as $profile) {
                if (!is_array($profile)) {
                    continue;
                }
                $normalized = normalize_user_profile($profile, $knownTenants);
                if ($normalized !== null) {
                    $profiles[] = $normalized;
                }
            }
        }
    }

    if ($profiles === []) {
        $local = local_config();
        $rawLocalProfiles = is_array($local['cms_users'] ?? null) ? $local['cms_users'] : [];
        foreach ($rawLocalProfiles as $profile) {
            if (!is_array($profile)) {
                continue;
            }
            $normalized = normalize_user_profile($profile, $knownTenants);
            if ($normalized !== null) {
                $profiles[] = $normalized;
            }
        }
    }

    if ($profiles === []) {
        $legacyUsername = cms_username();
        $legacyPassword = cms_password();
        if ($legacyUsername !== '' && $legacyPassword !== '') {
            $profiles[] = [
                'username' => $legacyUsername,
                'password' => $legacyPassword,
                'role' => 'editor',
                'allowedTenants' => $knownTenants,
                'defaultTenant' => $knownTenants[0] ?? '',
                'canSwitchTenants' => true,
            ];
        }
    }

    return $profiles;
}

function cms_auth_configured(): bool
{
    return cms_user_profiles() !== [];
}

function auth_session(): array
{
    return is_array($_SESSION['cms_auth'] ?? null) ? $_SESSION['cms_auth'] : [];
}

function current_user_public_profile(): ?array
{
    $session = auth_session();
    $username = clean_text($session['username'] ?? '', 80);
    if ($username === '') {
        return null;
    }

    return [
        'username' => $username,
        'role' => clean_text($session['role'] ?? 'editor', 30),
        'allowedTenants' => array_values(array_filter(
            array_map(
                static fn(mixed $tenant): string => strtolower(trim((string) $tenant)),
                is_array($session['allowedTenants'] ?? null) ? $session['allowedTenants'] : []
            ),
            static fn(string $tenant): bool => $tenant !== ''
        )),
        'activeTenant' => clean_text($session['activeTenant'] ?? '', 80),
        'canSwitchTenants' => (bool) ($session['canSwitchTenants'] ?? false),
    ];
}

function require_auth_config(): void
{
    if (!cms_auth_configured()) {
        respond([
            'ok' => false,
            'error' => is_local_request()
                ? 'CMS credentials are not configured. Set TUKODPH_CMS_USERNAME and TUKODPH_CMS_PASSWORD, or create cms/config.local.php for local testing.'
                : 'CMS credentials are not configured. Set TUKODPH_CMS_USERNAME and TUKODPH_CMS_PASSWORD before signing in.',
        ], 503);
    }
}

function is_authenticated(): bool
{
    $session = auth_session();
    return clean_text($session['username'] ?? '', 80) !== '';
}

function require_auth(): void
{
    if (!is_authenticated()) {
        respond(['ok' => false, 'error' => 'Authentication required.'], 401);
    }
}

function current_user_role(): string
{
    $user = current_user_public_profile();
    return $user['role'] ?? 'editor';
}

function current_user_allowed_tenants(): array
{
    $user = current_user_public_profile();
    return is_array($user['allowedTenants'] ?? null) ? $user['allowedTenants'] : [];
}

function current_user_can_switch_tenants(): bool
{
    $user = current_user_public_profile();
    return (bool) ($user['canSwitchTenants'] ?? false);
}

function current_active_tenant(): string
{
    $user = current_user_public_profile();
    $active = strtolower(trim((string) ($user['activeTenant'] ?? '')));
    if ($active !== '' && in_array($active, current_user_allowed_tenants(), true)) {
        return $active;
    }

    return current_user_allowed_tenants()[0] ?? '';
}

function current_user_visible_tenants(): array
{
    $allowed = current_user_allowed_tenants();
    if ($allowed === []) {
        return [];
    }

    if (current_user_can_switch_tenants()) {
        return $allowed;
    }

    $active = current_active_tenant();
    return $active !== '' ? [$active] : [($allowed[0] ?? '')];
}

function set_active_tenant(string $tenant): void
{
    if (!is_authenticated()) {
        return;
    }

    $tenant = strtolower(trim($tenant));
    if ($tenant === '' || !in_array($tenant, current_user_allowed_tenants(), true)) {
        return;
    }

    $_SESSION['cms_auth']['activeTenant'] = $tenant;
}

function require_tenant_access(string $tenant): void
{
    require_auth();
    if (!in_array($tenant, current_user_allowed_tenants(), true)) {
        respond(['ok' => false, 'error' => 'You do not have access to this festival workspace.'], 403);
    }
    set_active_tenant($tenant);
}

function require_portal_management(): void
{
    require_auth();
    if (!current_user_can_switch_tenants() || current_user_role() !== 'admin') {
        respond(['ok' => false, 'error' => 'You do not have permission to manage other festival portals.'], 403);
    }
}

function safe_tenant_id(string $value): string
{
    $value = strtolower(trim($value));
    if (!preg_match('/^[a-z0-9][a-z0-9-]{1,62}$/', $value)) {
        respond(['ok' => false, 'error' => 'Invalid tenant ID.'], 422);
    }
    return $value;
}

function read_json_file(string $path, array $fallback): array
{
    if (!is_file($path)) {
        return $fallback;
    }

    $contents = file_get_contents($path);
    if ($contents === false) {
        respond(['ok' => false, 'error' => 'Unable to read CMS data.'], 500);
    }

    $decoded = json_decode($contents, true);
    return is_array($decoded) ? $decoded : $fallback;
}

function write_json_file(string $path, array $payload): void
{
    $directory = dirname($path);
    if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
        respond(['ok' => false, 'error' => 'Unable to create CMS data directory.'], 500);
    }

    $temporary = $path . '.tmp';
    $encoded = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($encoded === false || file_put_contents($temporary, $encoded, LOCK_EX) === false) {
        respond(['ok' => false, 'error' => 'Unable to write CMS data.'], 500);
    }

    if (!rename($temporary, $path)) {
        @unlink($temporary);
        respond(['ok' => false, 'error' => 'Unable to finalize CMS data update.'], 500);
    }
}

function text_substr(string $value, int $start, int $length): string
{
    return function_exists('mb_substr') ? mb_substr($value, $start, $length) : substr($value, $start, $length);
}

function text_upper(string $value): string
{
    return function_exists('mb_strtoupper') ? mb_strtoupper($value) : strtoupper($value);
}

function clean_text(mixed $value, int $maxLength = 12000): string
{
    $text = trim((string) $value);
    $text = preg_replace('/[\x00\x08\x0B\x0C\x0E-\x1F]/u', '', $text) ?? '';
    return text_substr($text, 0, $maxLength);
}

function clean_coordinate(mixed $value, float $min, float $max): string
{
    $source = clean_text($value, 40);
    if ($source === '' || !is_numeric($source)) {
        return '';
    }

    $numeric = (float) $source;
    if ($numeric < $min || $numeric > $max) {
        return '';
    }

    $formatted = number_format($numeric, 7, '.', '');
    return rtrim(rtrim($formatted, '0'), '.');
}

function clean_url(mixed $value): string
{
    $url = clean_text($value, 2000);
    if ($url === '') {
        return '';
    }

    if (str_starts_with($url, '/') || str_starts_with($url, '#')) {
        return $url;
    }

    $scheme = parse_url($url, PHP_URL_SCHEME);
    if ($scheme === null && !str_contains($url, '..')) {
        return $url;
    }
    return in_array($scheme, ['http', 'https', 'mailto', 'tel'], true) ? $url : '';
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function rich_text_from_plain_text(string $value): string
{
    $blocks = preg_split('/\R{2,}/', trim($value)) ?: [];
    $html = [];

    foreach ($blocks as $block) {
        $lines = preg_split('/\R/', trim($block)) ?: [];
        $lines = array_values(array_filter(array_map('trim', $lines), static fn (string $line): bool => $line !== ''));
        if ($lines === []) {
            continue;
        }

        $allBullets = true;
        foreach ($lines as $line) {
            if (!preg_match('/^[-*]\s+/', $line)) {
                $allBullets = false;
                break;
            }
        }

        if ($allBullets) {
            $items = array_map(
                static fn (string $line): string => '<li>' . escape_html((string) preg_replace('/^[-*]\s+/', '', $line)) . '</li>',
                $lines
            );
            $html[] = '<ul>' . implode('', $items) . '</ul>';
            continue;
        }

        $firstLine = $lines[0];
        if (str_starts_with($firstLine, '## ')) {
            $heading = '<h3>' . escape_html(substr($firstLine, 3)) . '</h3>';
            $paragraphs = array_map(
                static fn (string $line): string => '<p>' . escape_html($line) . '</p>',
                array_slice($lines, 1)
            );
            $html[] = $heading . implode('', $paragraphs);
            continue;
        }

        $html[] = '<p>' . implode('<br>', array_map('escape_html', $lines)) . '</p>';
    }

    return implode('', $html);
}

function dom_child_nodes_array(DOMNode $node): array
{
    $children = [];
    foreach ($node->childNodes as $child) {
        $children[] = $child;
    }
    return $children;
}

function unwrap_dom_element(DOMElement $element): void
{
    $parent = $element->parentNode;
    if ($parent === null) {
        return;
    }

    while ($element->firstChild !== null) {
        $parent->insertBefore($element->firstChild, $element);
    }
    $parent->removeChild($element);
}

function replace_dom_tag(DOMElement $element, string $tagName, DOMDocument $document): DOMElement
{
    $replacement = $document->createElement($tagName);
    foreach (dom_child_nodes_array($element) as $child) {
        $replacement->appendChild($child);
    }

    $element->parentNode?->replaceChild($replacement, $element);
    return $replacement;
}

function sanitize_rich_text_node(DOMNode $node, DOMDocument $document): void
{
    $allowedTags = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote'];

    foreach (dom_child_nodes_array($node) as $child) {
        if ($child instanceof DOMText) {
            continue;
        }

        if (!$child instanceof DOMElement) {
            $node->removeChild($child);
            continue;
        }

        $tag = strtolower($child->tagName);
        if (in_array($tag, ['script', 'style', 'iframe', 'object', 'embed'], true)) {
            $node->removeChild($child);
            continue;
        }

        if ($tag === 'div') {
            $child = replace_dom_tag($child, 'p', $document);
            $tag = 'p';
        } elseif ($tag === 'b') {
            $child = replace_dom_tag($child, 'strong', $document);
            $tag = 'strong';
        } elseif ($tag === 'i') {
            $child = replace_dom_tag($child, 'em', $document);
            $tag = 'em';
        }

        if (in_array($tag, ['span', 'font'], true) || !in_array($tag, $allowedTags, true)) {
            unwrap_dom_element($child);
            continue;
        }

        sanitize_rich_text_node($child, $document);

        $href = $tag === 'a' ? clean_url($child->getAttribute('href')) : '';

        while ($child->attributes->length > 0) {
            $attribute = $child->attributes->item(0);
            if ($attribute === null) {
                break;
            }
            $child->removeAttribute($attribute->name);
        }

        if ($tag === 'a') {
            if ($href === '') {
                unwrap_dom_element($child);
                continue;
            }

            $child->setAttribute('href', $href);
            if (preg_match('#^https?://#i', $href)) {
                $child->setAttribute('target', '_blank');
                $child->setAttribute('rel', 'noopener noreferrer');
            }
        }

        if (in_array($tag, ['p', 'h2', 'h3', 'h4', 'blockquote', 'li'], true)) {
            $hasBreak = $child->getElementsByTagName('br')->length > 0;
            if (trim($child->textContent) === '' && !$hasBreak) {
                $child->parentNode?->removeChild($child);
            }
        }
    }
}

function clean_rich_text(mixed $value, int $maxLength = 40000): string
{
    $html = trim((string) $value);
    $html = preg_replace('/[\x00\x08\x0B\x0C\x0E-\x1F]/u', '', $html) ?? '';
    if ($html === '') {
        return '';
    }

    if (!preg_match('/<[^>]+>/', $html)) {
        $html = rich_text_from_plain_text($html);
    }

    if (!class_exists(DOMDocument::class)) {
        return text_substr(strip_tags($html, '<p><br><strong><em><u><a><ul><ol><li><h2><h3><h4><blockquote>'), 0, $maxLength);
    }

    $document = new DOMDocument('1.0', 'UTF-8');
    $encoded = function_exists('mb_convert_encoding')
        ? mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8')
        : $html;

    $previousErrors = libxml_use_internal_errors(true);
    $document->loadHTML(
        '<?xml encoding="utf-8" ?><div id="tukod-rich-text-root">' . $encoded . '</div>',
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
    );
    libxml_clear_errors();
    libxml_use_internal_errors($previousErrors);

    $root = $document->getElementById('tukod-rich-text-root');
    if (!$root instanceof DOMElement) {
        return '';
    }

    sanitize_rich_text_node($root, $document);

    foreach (dom_child_nodes_array($root) as $child) {
        if ($child instanceof DOMText && trim($child->textContent) !== '') {
            $paragraph = $document->createElement('p');
            $paragraph->appendChild($document->createTextNode(trim($child->textContent)));
            $root->replaceChild($paragraph, $child);
        }
    }

    $output = '';
    foreach (dom_child_nodes_array($root) as $child) {
        $output .= $document->saveHTML($child) ?: '';
    }

    return text_substr(trim($output), 0, $maxLength);
}

function normalize_path(string $value): string
{
    $trimmed = trim($value);
    if ($trimmed === '') {
        return '/';
    }

    $path = preg_replace('#/+#', '/', $trimmed) ?? '/';
    if (!str_starts_with($path, '/')) {
        $path = '/' . $path;
    }

    if ($path !== '/' && !str_ends_with($path, '/')) {
        $path .= '/';
    }

    return $path;
}

function is_event_type(string $value): bool
{
    return (bool) preg_match('/\bevent\b|festival event|schedule item/i', $value);
}

function supported_event_categories(): array
{
    return [
        'Major Event',
        'Minor Event',
        'Core Event',
        'Parallel Event',
    ];
}

function normalize_event_category(mixed $value, bool $strict = false): string
{
    $clean = clean_text($value, 40);
    if ($clean === '') {
        return '';
    }

    $normalized = strtolower(preg_replace('/[^a-z]+/', '', $clean) ?? '');
    $aliases = [
        'major' => 'Major Event',
        'majorevent' => 'Major Event',
        'minor' => 'Minor Event',
        'minorevent' => 'Minor Event',
        'core' => 'Core Event',
        'coreevent' => 'Core Event',
        'parallel' => 'Parallel Event',
        'parallelevent' => 'Parallel Event',
    ];
    if (isset($aliases[$normalized])) {
        return $aliases[$normalized];
    }

    if ($strict) {
        respond([
            'ok' => false,
            'error' => 'Invalid event category. Supported values are: ' . implode(', ', supported_event_categories()) . '.',
        ], 422);
    }

    return '';
}

function normalize_clock_time_value(mixed $value): string
{
    $clean = clean_text($value, 40);
    if ($clean === '') {
        return '';
    }

    if (preg_match('/^([01]?\d|2[0-3]):([0-5]\d)$/', $clean, $matches)) {
        return sprintf('%02d:%02d', (int) $matches[1], (int) $matches[2]);
    }

    if (preg_match('/^([1-9]|1[0-2]):([0-5]\d)\s*([ap]m)$/i', $clean, $matches)) {
        $hour = (int) $matches[1];
        $minute = (int) $matches[2];
        $meridiem = strtoupper($matches[3]);
        if ($meridiem === 'PM' && $hour < 12) {
            $hour += 12;
        } elseif ($meridiem === 'AM' && $hour === 12) {
            $hour = 0;
        }
        return sprintf('%02d:%02d', $hour, $minute);
    }

    return '';
}

function format_clock_time_display(string $value): string
{
    if (!preg_match('/^([01]\d|2[0-3]):([0-5]\d)$/', $value, $matches)) {
        return '';
    }

    $hour = (int) $matches[1];
    $minute = $matches[2];
    $suffix = $hour >= 12 ? 'PM' : 'AM';
    $displayHour = $hour % 12;
    if ($displayHour === 0) {
        $displayHour = 12;
    }

    return $displayHour . ':' . $minute . ' ' . $suffix;
}

function build_event_time_display(string $startTime, string $endTime): string
{
    $start = format_clock_time_display($startTime);
    $end = format_clock_time_display($endTime);

    if ($start !== '' && $end !== '') {
        return $start . ' - ' . $end;
    }

    if ($start !== '') {
        return $start;
    }

    if ($end !== '') {
        return $end;
    }

    return '';
}

function normalize_event_csv_date(mixed $value): string
{
    $clean = clean_text($value, 80);
    if ($clean === '') {
        return '';
    }

    $formats = ['Y-m-d', 'n/j/Y', 'm/d/Y', 'n-j-Y', 'm-d-Y'];
    foreach ($formats as $format) {
        $date = DateTimeImmutable::createFromFormat('!' . $format, $clean);
        if ($date instanceof DateTimeImmutable && $date->format($format) === $clean) {
            return $date->format('Y-m-d');
        }
    }

    return '';
}

function event_csv_column_definitions(): array
{
    return [
        ['key' => 'title', 'label' => 'Event Title', 'aliases' => ['Event Title', 'Title']],
        ['key' => 'slug', 'label' => 'Slug', 'aliases' => ['Slug']],
        ['key' => 'summary', 'label' => 'Summary / Description', 'aliases' => ['Summary / Description', 'Summary', 'Description']],
        ['key' => 'date', 'label' => 'Date', 'aliases' => ['Date', 'Event Date']],
        ['key' => 'start_time', 'label' => 'Start Time', 'aliases' => ['Start Time']],
        ['key' => 'end_time', 'label' => 'End Time', 'aliases' => ['End Time']],
        ['key' => 'venue', 'label' => 'Venue / Location', 'aliases' => ['Venue / Location', 'Venue', 'Location']],
        ['key' => 'category', 'label' => 'Event Category', 'aliases' => ['Event Category', 'Category']],
        ['key' => 'what_to_expect_title', 'label' => 'What to Expect Title', 'aliases' => ['What to Expect Title']],
        ['key' => 'what_to_expect_summary', 'label' => 'What to Expect Summary', 'aliases' => ['What to Expect Summary']],
        ['key' => 'arrival_window', 'label' => 'Arrival Window', 'aliases' => ['Arrival Window']],
        ['key' => 'access', 'label' => 'Access', 'aliases' => ['Access']],
        ['key' => 'bring', 'label' => 'Bring', 'aliases' => ['Bring']],
        ['key' => 'tips', 'label' => 'Tips', 'aliases' => ['Tips']],
        ['key' => 'presented_by', 'label' => 'Presented By', 'aliases' => ['Presented By']],
        ['key' => 'presented_by_image', 'label' => 'Presented By Image', 'aliases' => ['Presented By Image']],
        ['key' => 'event_editorial_title', 'label' => 'Event Editorial Title', 'aliases' => ['Event Editorial Title']],
        ['key' => 'event_editorial_summary', 'label' => 'Event Editorial Summary', 'aliases' => ['Event Editorial Summary']],
        ['key' => 'event_editorial_image', 'label' => 'Event Editorial Image', 'aliases' => ['Event Editorial Image']],
    ];
}

function event_csv_template_headers(): array
{
    return array_map(
        static fn(array $definition): string => $definition['label'],
        event_csv_column_definitions()
    );
}

function normalize_csv_header_key(string $value): string
{
    return strtolower(trim((string) preg_replace('/[^a-z0-9]+/i', ' ', $value)));
}

function parse_csv_text(string $csvText): array
{
    $source = preg_replace('/^\xEF\xBB\xBF/', '', $csvText) ?? $csvText;
    $handle = fopen('php://temp', 'r+');
    if ($handle === false) {
        return ['headers' => [], 'rows' => [], 'errors' => ['Unable to read the CSV upload.']];
    }

    fwrite($handle, $source);
    rewind($handle);

    $headers = fgetcsv($handle);
    if (!is_array($headers)) {
        fclose($handle);
        return ['headers' => [], 'rows' => [], 'errors' => ['The CSV file must include a header row.']];
    }

    $rows = [];
    $lineNumber = 1;
    while (($row = fgetcsv($handle)) !== false) {
        $lineNumber++;
        $isBlank = true;
        foreach ($row as $value) {
            if (trim((string) $value) !== '') {
                $isBlank = false;
                break;
            }
        }
        if ($isBlank) {
            continue;
        }

        $rows[] = [
            'line' => $lineNumber,
            'values' => $row,
        ];
    }

    fclose($handle);

    return [
        'headers' => array_map(static fn(mixed $value): string => trim((string) $value), $headers),
        'rows' => $rows,
        'errors' => [],
    ];
}

function event_csv_header_map(array $headers): array
{
    $normalizedHeaderLookup = [];
    foreach ($headers as $header) {
        $normalized = normalize_csv_header_key((string) $header);
        if ($normalized === '' || isset($normalizedHeaderLookup[$normalized])) {
            continue;
        }
        $normalizedHeaderLookup[$normalized] = (string) $header;
    }

    $map = [];
    foreach (event_csv_column_definitions() as $definition) {
        foreach ($definition['aliases'] as $alias) {
            $normalizedAlias = normalize_csv_header_key($alias);
            if (isset($normalizedHeaderLookup[$normalizedAlias])) {
                $map[$definition['key']] = $normalizedHeaderLookup[$normalizedAlias];
                break;
            }
        }
    }

    return $map;
}

function event_csv_media_reference_map(string $tenant): array
{
    $assets = array_values(load_media($tenant)['assets'] ?? []);
    $lookup = [];

    foreach ($assets as $asset) {
        if (!is_array($asset)) {
            continue;
        }

        $url = clean_url($asset['url'] ?? '');
        $assetId = strtolower(clean_text($asset['id'] ?? '', 120));
        $fileName = strtolower(clean_text($asset['fileName'] ?? '', 255));
        $name = strtolower(clean_text($asset['name'] ?? '', 255));

        foreach ([$assetId, $fileName, $name, strtolower($url)] as $key) {
            if ($key !== '' && !isset($lookup[$key])) {
                $lookup[$key] = $url;
            }
        }
    }

    return $lookup;
}

function resolve_event_csv_image_reference(mixed $value, array $mediaLookup): array
{
    $source = clean_text($value, 2000);
    if ($source === '') {
        return ['value' => '', 'error' => ''];
    }

    $url = clean_url($source);
    if ($url !== '') {
        return ['value' => $url, 'error' => ''];
    }

    $lookupKey = strtolower($source);
    if (isset($mediaLookup[$lookupKey]) && $mediaLookup[$lookupKey] !== '') {
        return ['value' => $mediaLookup[$lookupKey], 'error' => ''];
    }

    return [
        'value' => '',
        'error' => 'Invalid image URL or media library reference.',
    ];
}

function validate_event_csv_import(string $tenant, string $csvText): array
{
    $parsed = parse_csv_text($csvText);
    $headers = $parsed['headers'];
    $rows = $parsed['rows'];
    $generalErrors = $parsed['errors'];
    $headerMap = event_csv_header_map($headers);

    $missingHeaders = [];
    foreach (event_csv_column_definitions() as $definition) {
        if (!isset($headerMap[$definition['key']])) {
            $missingHeaders[] = $definition['label'];
        }
    }
    if ($missingHeaders !== []) {
        $generalErrors[] = 'Missing required CSV columns: ' . implode(', ', $missingHeaders) . '.';
    }

    $existingRows = database_event_records($tenant, true);
    $existingSlugs = [];
    $existingEventKeys = [];
    foreach ($existingRows as $record) {
        $recordSlug = strtolower(clean_text($record['slug'] ?? '', 160));
        $recordTitle = strtolower(clean_text($record['title'] ?? '', 1000));
        $recordDate = clean_text($record['fields']['eventDate'] ?? '', 80);
        if ($recordSlug !== '') {
            $existingSlugs[$recordSlug] = true;
        }
        if ($recordTitle !== '' && $recordDate !== '') {
            $existingEventKeys[$recordTitle . '|' . $recordDate] = true;
        }
    }

    $mediaLookup = event_csv_media_reference_map($tenant);
    $seenSlugs = [];
    $seenEventKeys = [];
    $validatedRows = [];

    foreach ($rows as $row) {
        $lineNumber = (int) ($row['line'] ?? 0);
        $values = is_array($row['values'] ?? null) ? $row['values'] : [];
        $rowData = [];
        foreach ($headers as $index => $header) {
            $rowData[(string) $header] = trim((string) ($values[$index] ?? ''));
        }

        $cell = static fn(string $key): string => isset($headerMap[$key]) ? trim((string) ($rowData[$headerMap[$key]] ?? '')) : '';

        $title = clean_text($cell('title'), 1000);
        $slugSource = clean_text($cell('slug'), 160);
        $slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', ($slugSource !== '' ? $slugSource : $title)) ?? '');
        $slug = trim($slug, '-');
        $summary = clean_text($cell('summary'), 3000);
        $eventDate = normalize_event_csv_date($cell('date'));
        $startTime = normalize_clock_time_value($cell('start_time'));
        $endTime = normalize_clock_time_value($cell('end_time'));
        $arrivalWindow = normalize_clock_time_value($cell('arrival_window'));
        $eventCategory = normalize_event_category($cell('category'));
        $venue = clean_text($cell('venue'), 500);
        $whatToExpectTitle = clean_text($cell('what_to_expect_title'), 1000);
        $whatToExpectSummary = clean_text($cell('what_to_expect_summary'), 5000);
        $eventAccess = clean_text($cell('access'), 2000);
        $eventBring = clean_text($cell('bring'), 2000);
        $eventTips = clean_text($cell('tips'), 2000);
        $presentedByName = clean_text($cell('presented_by'), 500);
        $presentedByImage = resolve_event_csv_image_reference($cell('presented_by_image'), $mediaLookup);
        $eventEditorialTitle = clean_text($cell('event_editorial_title'), 1000);
        $eventEditorialSummary = clean_text($cell('event_editorial_summary'), 5000);
        $eventEditorialImage = resolve_event_csv_image_reference($cell('event_editorial_image'), $mediaLookup);
        $eventTime = build_event_time_display($startTime, $endTime);
        $errors = [];

        if ($title === '') {
            $errors[] = 'Event Title is required.';
        }

        if ($slug === '') {
            $errors[] = 'Slug is required or must be derivable from Event Title.';
        }

        if ($eventDate === '') {
            $errors[] = $cell('date') === '' ? 'Date is required.' : 'Date must use YYYY-MM-DD or a supported month/day/year format.';
        }

        if ($cell('start_time') !== '' && $startTime === '') {
            $errors[] = 'Start Time must use HH:MM or h:MM AM/PM.';
        }

        if ($cell('end_time') !== '' && $endTime === '') {
            $errors[] = 'End Time must use HH:MM or h:MM AM/PM.';
        }

        if ($cell('end_time') !== '' && $startTime === '') {
            $errors[] = 'Start Time is required when End Time is provided.';
        }

        if ($startTime !== '' && $endTime !== '' && strcmp($endTime, $startTime) < 0) {
            $errors[] = 'End Time must be the same as or later than Start Time.';
        }

        if ($cell('arrival_window') !== '' && $arrivalWindow === '') {
            $errors[] = 'Arrival Window must use HH:MM or h:MM AM/PM.';
        }

        if ($cell('category') !== '' && $eventCategory === '') {
            $errors[] = 'Invalid event category. Use Major, Minor, Core, or Parallel.';
        }

        if ($presentedByImage['error'] !== '') {
            $errors[] = 'Presented By Image: ' . $presentedByImage['error'];
        }

        if ($eventEditorialImage['error'] !== '') {
            $errors[] = 'Event Editorial Image: ' . $eventEditorialImage['error'];
        }

        if ($slug !== '') {
            if (isset($seenSlugs[$slug])) {
                $errors[] = 'Duplicate slug in this CSV upload.';
            } elseif (isset($existingSlugs[$slug])) {
                $errors[] = 'Duplicate slug already exists in the active festival.';
            }
        }

        $eventKey = strtolower($title) . '|' . $eventDate;
        if ($title !== '' && $eventDate !== '') {
            if (isset($seenEventKeys[$eventKey])) {
                $errors[] = 'Duplicate event in this CSV upload.';
            } elseif (isset($existingEventKeys[$eventKey])) {
                $errors[] = 'Duplicate event already exists in the active festival.';
            }
        }

        $record = normalize_record([
            'id' => $slug,
            'slug' => $slug,
            'type' => 'Event',
            'status' => 'draft',
            'title' => $title,
            'excerpt' => $summary,
            'body' => '',
            'language' => 'English',
            'fields' => [
                'heading' => $title,
                'summary' => $summary,
                'eventDate' => $eventDate,
                'eventStartTime' => $startTime,
                'eventEndTime' => $endTime,
                'eventTime' => $eventTime,
                'eventVenue' => $venue,
                'eventCategory' => $eventCategory,
                'whatToExpectTitle' => $whatToExpectTitle,
                'whatToExpectSummary' => $whatToExpectSummary,
                'arrivalWindow' => $arrivalWindow,
                'eventAccess' => $eventAccess,
                'eventBring' => $eventBring,
                'eventTips' => $eventTips,
                'presentedByName' => $presentedByName,
                'presentedByImage' => $presentedByImage['value'],
                'eventEditorialTitle' => $eventEditorialTitle,
                'eventEditorialSummary' => $eventEditorialSummary,
                'eventEditorialImage' => $eventEditorialImage['value'],
            ],
        ]);

        if ($errors === []) {
            $seenSlugs[$slug] = true;
            if ($title !== '' && $eventDate !== '') {
                $seenEventKeys[$eventKey] = true;
            }
        }

        $validatedRows[] = [
            'line' => $lineNumber,
            'valid' => $errors === [],
            'errors' => $errors,
            'preview' => [
                'title' => $record['title'],
                'slug' => $record['slug'],
                'summary' => $record['excerpt'],
                'date' => $record['fields']['eventDate'] ?? '',
                'startTime' => $record['fields']['eventStartTime'] ?? '',
                'endTime' => $record['fields']['eventEndTime'] ?? '',
                'time' => $record['fields']['eventTime'] ?? '',
                'venue' => $record['fields']['eventVenue'] ?? '',
                'category' => $record['fields']['eventCategory'] ?? '',
                'presentedBy' => $record['fields']['presentedByName'] ?? '',
                'presentedByImage' => $record['fields']['presentedByImage'] ?? '',
                'eventEditorialTitle' => $record['fields']['eventEditorialTitle'] ?? '',
                'eventEditorialImage' => $record['fields']['eventEditorialImage'] ?? '',
            ],
            'record' => $record,
        ];
    }

    $validCount = count(array_filter($validatedRows, static fn(array $row): bool => $row['valid']));
    $invalidCount = count($validatedRows) - $validCount;

    return [
        'headers' => $headers,
        'missingHeaders' => $missingHeaders,
        'errors' => $generalErrors,
        'rows' => $validatedRows,
        'validCount' => $validCount,
        'invalidCount' => $invalidCount,
        'canImport' => $generalErrors === [] && $validCount > 0 && $invalidCount === 0,
    ];
}

function record_template(string $type, string $page): string
{
    if (is_event_type($type) || str_starts_with($page, '/events/')) {
        return 'event';
    }

    if ($type === 'Page section' || $page === '/') {
        return 'section';
    }

    return 'page';
}

function normalized_record_page(string $page, string $slug, string $type): string
{
    $cleanPage = normalize_path($page);
    if ($cleanPage !== '/' || $slug === '') {
        return $cleanPage;
    }

    if (is_event_type($type)) {
        return normalize_path('/events/' . $slug);
    }

    if ($type === 'Page') {
        return normalize_path('/' . $slug);
    }

    return '/';
}

function normalize_section_target(mixed $value): string
{
    $clean = strtolower(clean_text($value, 120));
    $clean = preg_replace('/[^a-z0-9-]+/', '-', $clean) ?? '';
    $clean = trim($clean, '-');
    return $clean !== '' ? $clean : 'end-of-page';
}

function request_scheme(): string
{
    $forwarded = strtolower(trim((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')));
    if ($forwarded === 'https') {
        return 'https';
    }

    $https = strtolower(trim((string) ($_SERVER['HTTPS'] ?? '')));
    if ($https !== '' && $https !== 'off') {
        return 'https';
    }

    $port = (string) ($_SERVER['SERVER_PORT'] ?? '');
    return $port === '443' ? 'https' : 'http';
}

function upload_public_base_url(): string
{
    $host = trim((string) ($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
    $script = str_replace('\\', '/', (string) ($_SERVER['SCRIPT_NAME'] ?? '/cms/api/index.php'));
    $cmsRoot = str_replace('\\', '/', dirname(dirname($script)));
    $cmsRoot = $cmsRoot === '/' ? '' : rtrim($cmsRoot, '/');
    $path = ($cmsRoot !== '' ? $cmsRoot : '') . '/uploads';

    if ($host === '') {
        return $path;
    }

    return request_scheme() . '://' . $host . $path;
}

function safe_file_stem(string $value): string
{
    $stem = strtolower(trim($value));
    $stem = preg_replace('/[^a-z0-9]+/', '-', $stem) ?? '';
    $stem = trim($stem, '-');
    return $stem !== '' ? $stem : 'asset';
}

function human_filesize(int $bytes): string
{
    if ($bytes < 1024) {
        return $bytes . ' B';
    }

    $units = ['KB', 'MB', 'GB'];
    $size = $bytes / 1024;
    foreach ($units as $unit) {
        if ($size < 1024 || $unit === 'GB') {
            return number_format($size, $size >= 10 ? 1 : 2) . ' ' . $unit;
        }
        $size /= 1024;
    }

    return number_format($size, 1) . ' GB';
}

function media_file(string $tenant): string
{
    return MEDIA_ROOT . '/' . $tenant . '.json';
}

function load_media(string $tenant): array
{
    return read_json_file(media_file($tenant), [
        'tenant' => $tenant,
        'updatedAt' => gmdate('c'),
        'assets' => [],
    ]);
}

function detect_upload_mime(string $path, string $fallback = ''): string
{
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo !== false) {
            $mime = finfo_file($finfo, $path);
            finfo_close($finfo);
            if (is_string($mime) && trim($mime) !== '') {
                return trim($mime);
            }
        }
    }

    return trim($fallback);
}

function upload_extension_map(): array
{
    return [
        'jpg' => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png' => ['image/png'],
        'webp' => ['image/webp'],
        'gif' => ['image/gif'],
    ];
}

function derive_alt_text(string $filename): string
{
    $stem = pathinfo($filename, PATHINFO_FILENAME);
    $label = preg_replace('/[^a-z0-9]+/i', ' ', $stem) ?? '';
    $label = trim($label);
    return $label !== '' ? ucwords(strtolower($label)) : '';
}

function normalize_media_asset(array $asset): array
{
    $name = clean_text($asset['name'] ?? $asset['fileName'] ?? 'Uploaded asset', 255);
    $url = clean_url($asset['url'] ?? '');
    $tags = array_values(array_filter(
        array_map(
            static fn (mixed $tag): string => clean_text($tag, 40),
            is_array($asset['tags'] ?? null) ? $asset['tags'] : []
        ),
        static fn (string $tag): bool => $tag !== ''
    ));

    return [
        'id' => clean_text($asset['id'] ?? ('asset-' . time()), 80),
        'name' => $name,
        'fileName' => clean_text($asset['fileName'] ?? $name, 255),
        'url' => $url,
        'mime' => clean_text($asset['mime'] ?? 'image/jpeg', 120),
        'size' => (int) ($asset['size'] ?? 0),
        'alt' => clean_text($asset['alt'] ?? '', 300),
        'copyright' => clean_text($asset['copyright'] ?? '', 300),
        'meta' => clean_text($asset['meta'] ?? '', 300),
        'tags' => $tags,
        'style' => clean_text($asset['style'] ?? 'festival', 30) ?: 'festival',
        'uploadedAt' => clean_text($asset['uploadedAt'] ?? gmdate('c'), 80),
        'uploadedBy' => clean_text($asset['uploadedBy'] ?? (current_user_public_profile()['username'] ?? 'editor'), 80),
    ];
}

function store_uploaded_media(string $tenant, array $file, string $altText = '', string $copyrightText = ''): array
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        respond(['ok' => false, 'error' => 'The selected file could not be uploaded.'], 422);
    }

    $size = (int) ($file['size'] ?? 0);
    if ($size <= 0) {
        respond(['ok' => false, 'error' => 'Uploaded files must not be empty.'], 422);
    }

    if ($size > MAX_UPLOAD_BYTES) {
        respond(['ok' => false, 'error' => 'Uploaded files must be 8 MB or smaller.'], 422);
    }

    $tmpPath = (string) ($file['tmp_name'] ?? '');
    if ($tmpPath === '' || !is_uploaded_file($tmpPath)) {
        respond(['ok' => false, 'error' => 'The uploaded file was not received correctly.'], 422);
    }

    $originalName = clean_text($file['name'] ?? 'upload', 255);
    $extension = strtolower((string) pathinfo($originalName, PATHINFO_EXTENSION));
    $allowed = upload_extension_map();
    if (!isset($allowed[$extension])) {
        respond(['ok' => false, 'error' => 'Only JPG, PNG, WEBP, and GIF images are supported right now.'], 422);
    }

    $mime = detect_upload_mime($tmpPath, (string) ($file['type'] ?? ''));
    if (!in_array($mime, $allowed[$extension], true)) {
        respond(['ok' => false, 'error' => 'The uploaded file type did not match its extension.'], 422);
    }

    $year = gmdate('Y');
    $month = gmdate('m');
    $targetDirectory = UPLOAD_ROOT . '/' . $tenant . '/' . $year . '/' . $month;
    if (!is_dir($targetDirectory) && !mkdir($targetDirectory, 0775, true) && !is_dir($targetDirectory)) {
        respond(['ok' => false, 'error' => 'Unable to create the media upload directory.'], 500);
    }

    $base = safe_file_stem(pathinfo($originalName, PATHINFO_FILENAME));
    $storedName = $base . '-' . gmdate('YmdHis') . '-' . bin2hex(random_bytes(3)) . '.' . $extension;
    $targetPath = $targetDirectory . '/' . $storedName;

    if (!move_uploaded_file($tmpPath, $targetPath)) {
        respond(['ok' => false, 'error' => 'Unable to save the uploaded file.'], 500);
    }

    $relativePath = $tenant . '/' . $year . '/' . $month . '/' . $storedName;
    $url = rtrim(upload_public_base_url(), '/') . '/' . str_replace('\\', '/', $relativePath);
    $kind = str_starts_with($mime, 'image/') ? 'Image' : 'Asset';

    return normalize_media_asset([
        'id' => 'asset-' . gmdate('YmdHis') . '-' . bin2hex(random_bytes(3)),
        'name' => $originalName,
        'fileName' => $storedName,
        'url' => $url,
        'mime' => $mime,
        'size' => $size,
        'alt' => clean_text($altText !== '' ? $altText : derive_alt_text($originalName), 300),
        'copyright' => clean_text($copyrightText, 300),
        'meta' => $kind . ' · ' . human_filesize($size) . ' · uploaded ' . gmdate('M j, Y'),
        'tags' => ['#Upload', '#Image'],
        'style' => 'festival',
        'uploadedAt' => gmdate('c'),
        'uploadedBy' => clean_text(current_user_public_profile()['username'] ?? (cms_username() ?: 'editor'), 80),
    ]);
}

function inquiry_file(string $tenant): string
{
    return INQUIRY_ROOT . '/' . $tenant . '.json';
}

function contact_inquiry_types(): array
{
    return [
        'Visitor Planning',
        'Events and Venue',
        'Accessibility Support',
        'Media or Partnerships',
    ];
}

function contact_submission_statuses(): array
{
    return ['New', 'In Progress', 'Resolved', 'Closed'];
}

function normalize_contact_submission(array $entry): array
{
    $status = clean_text($entry['status'] ?? 'New', 30);
    if (!in_array($status, contact_submission_statuses(), true)) {
        $status = 'New';
    }

    return [
        'id' => clean_text($entry['id'] ?? ('inq-' . time()), 80),
        'fullName' => clean_text($entry['fullName'] ?? $entry['name'] ?? '', 120),
        'email' => clean_text($entry['email'] ?? '', 160),
        'inquiryType' => clean_text($entry['inquiryType'] ?? $entry['interest'] ?? '', 120),
        'message' => clean_text($entry['message'] ?? '', 4000),
        'submittedAt' => clean_text($entry['submittedAt'] ?? gmdate('c'), 80),
        'updatedAt' => clean_text($entry['updatedAt'] ?? $entry['submittedAt'] ?? gmdate('c'), 80),
        'status' => $status,
        'page' => clean_text($entry['page'] ?? '', 300),
        'notificationSent' => (bool) ($entry['notificationSent'] ?? false),
    ];
}

function load_contact_submissions(string $tenant): array
{
    $data = read_json_file(inquiry_file($tenant), [
        'tenant' => $tenant,
        'updatedAt' => gmdate('c'),
        'entries' => [],
    ]);
    $entries = array_map(
        'normalize_contact_submission',
        array_values(is_array($data['entries'] ?? null) ? $data['entries'] : [])
    );

    return [
        'tenant' => $tenant,
        'updatedAt' => clean_text($data['updatedAt'] ?? gmdate('c'), 80),
        'entries' => $entries,
    ];
}

function contact_notification_recipient(string $tenant): string
{
    $fromEnv = env_value(['TUKODPH_CONTACT_RECIPIENT', 'CONTACT_NOTIFICATION_RECIPIENT']);
    if (filter_var($fromEnv, FILTER_VALIDATE_EMAIL)) {
        return $fromEnv;
    }

    $local = local_config();
    $tenantRecipients = is_array($local['contact_notification_recipients'] ?? null)
        ? $local['contact_notification_recipients']
        : [];
    $recipient = trim((string) ($tenantRecipients[$tenant] ?? $local['contact_notification_recipient'] ?? ''));
    return filter_var($recipient, FILTER_VALIDATE_EMAIL) ? $recipient : '';
}

function send_contact_notification(string $tenant, array $entry): bool
{
    $recipient = contact_notification_recipient($tenant);
    if ($recipient === '' || !function_exists('mail')) {
        return false;
    }

    $subject = 'New website contact inquiry';
    $body = implode("\n", [
        'A new contact inquiry was submitted.',
        '',
        'Festival workspace: ' . $tenant,
        'Full name: ' . $entry['fullName'],
        'Email address: ' . $entry['email'],
        'Inquiry type: ' . $entry['inquiryType'],
        'Submitted: ' . $entry['submittedAt'],
        '',
        'Message:',
        $entry['message'],
    ]);
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $entry['email'],
    ];

    return @mail($recipient, $subject, $body, implode("\r\n", $headers));
}

function normalize_record(array $record, ?array $existing = null, bool $strict = false): array
{
    $now = gmdate('c');
    $id = clean_text($record['id'] ?? $record['slug'] ?? '', 80);
    $slug = clean_text($record['slug'] ?? $id, 80);
    $slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '');
    $slug = trim($slug, '-');

    if ($id === '') {
        $id = $slug !== '' ? $slug : 'content-' . time();
    }
    if ($slug === '') {
        $slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $id) ?? 'content');
    }

    $allowedStatuses = ['draft', 'review', 'published', 'needs-changes'];
    $status = clean_text($record['status'] ?? 'draft', 30);
    if (!in_array($status, $allowedStatuses, true)) {
        $status = 'draft';
    }

    $fields = is_array($record['fields'] ?? null) ? $record['fields'] : [];
    $widgetOrder = is_numeric($fields['widgetOrder'] ?? null) ? (int) $fields['widgetOrder'] : 0;
    $allowedContentCategories = [
        'general',
        'faq',
        'hero',
        'cta',
        'ticker-band',
        'featured',
        'partner-recognition',
        'about',
        'story',
        'value-strip',
        'explore',
        'visit-band',
        'calendar',
    ];
    $contentCategory = clean_text($fields['contentCategory'] ?? 'general', 80);
    if (!in_array($contentCategory, $allowedContentCategories, true)) {
        $contentCategory = 'general';
    }
    $allowedSponsorTypes = [
        'Platinum Partners',
        'Diamond Partners',
        'Gold Partners',
        'Silver Partners',
        'Bronze Partners',
        'Festival Donors',
    ];
    $sponsorType = clean_text($fields['sponsorType'] ?? $record['sponsorType'] ?? 'Platinum Partners', 120);
    if (!in_array($sponsorType, $allowedSponsorTypes, true)) {
        $sponsorType = 'Platinum Partners';
    }
    $widgetSponsorType = clean_text($fields['widgetSponsorType'] ?? '', 120);
    if ($widgetSponsorType !== '' && !in_array($widgetSponsorType, $allowedSponsorTypes, true)) {
        $widgetSponsorType = '';
    }
    $eventCategory = normalize_event_category(
        $fields['eventCategory'] ?? $record['eventCategory'] ?? '',
        $strict
    );
    $eventStartTime = normalize_clock_time_value($fields['eventStartTime'] ?? $record['eventStartTime'] ?? '');
    $eventEndTime = normalize_clock_time_value($fields['eventEndTime'] ?? $record['eventEndTime'] ?? '');
    $eventTime = clean_text($fields['eventTime'] ?? $record['eventTime'] ?? '', 160);
    if ($eventStartTime !== '' || $eventEndTime !== '') {
        $eventTime = build_event_time_display($eventStartTime, $eventEndTime);
    }
    $normalizedFields = [
        'eyebrow' => clean_text($fields['eyebrow'] ?? $record['eyebrow'] ?? '', 500),
        'heading' => clean_text($fields['heading'] ?? $record['title'] ?? '', 1000),
        'summary' => clean_text($fields['summary'] ?? $record['excerpt'] ?? '', 3000),
        'body' => clean_rich_text($fields['body'] ?? $record['body'] ?? '', 40000),
        'ctaLabel' => clean_text($fields['ctaLabel'] ?? $record['ctaLabel'] ?? '', 300),
        'ctaUrl' => clean_url($fields['ctaUrl'] ?? $record['ctaUrl'] ?? ''),
        'widgetConfig' => clean_text($fields['widgetConfig'] ?? '', 40000),
        'image' => clean_url($fields['image'] ?? $record['image'] ?? ''),
        'imageAlt' => clean_text($fields['imageAlt'] ?? $record['imageAlt'] ?? '', 1000),
        'imageCopyright' => clean_text($fields['imageCopyright'] ?? $record['imageCopyright'] ?? '', 300),
        'eventDate' => clean_text($fields['eventDate'] ?? $record['eventDate'] ?? '', 80),
        'eventEndDate' => clean_text($fields['eventEndDate'] ?? $record['eventEndDate'] ?? '', 80),
        'eventCategory' => $eventCategory,
        'hideCountdown' => (bool) ($fields['hideCountdown'] ?? false),
        'eventStartTime' => $eventStartTime,
        'eventEndTime' => $eventEndTime,
        'eventTime' => $eventTime,
        'eventVenue' => clean_text($fields['eventVenue'] ?? $record['eventVenue'] ?? '', 500),
        'eventLatitude' => clean_coordinate($fields['eventLatitude'] ?? $record['eventLatitude'] ?? '', -90, 90),
        'eventLongitude' => clean_coordinate($fields['eventLongitude'] ?? $record['eventLongitude'] ?? '', -180, 180),
        'eventPlaceId' => clean_text($fields['eventPlaceId'] ?? $record['eventPlaceId'] ?? '', 255),
        'whatToExpectTitle' => clean_text($fields['whatToExpectTitle'] ?? '', 1000),
        'whatToExpectSummary' => clean_text($fields['whatToExpectSummary'] ?? '', 5000),
        'arrivalWindow' => normalize_clock_time_value($fields['arrivalWindow'] ?? ''),
        'eventAccess' => clean_text($fields['eventAccess'] ?? '', 2000),
        'eventBring' => clean_text($fields['eventBring'] ?? '', 2000),
        'eventTips' => clean_text($fields['eventTips'] ?? '', 2000),
        'presentedByName' => clean_text($fields['presentedByName'] ?? '', 500),
        'presentedByImage' => clean_url($fields['presentedByImage'] ?? ''),
        'presentedByImageCopyright' => clean_text($fields['presentedByImageCopyright'] ?? '', 300),
        'eventEditorialLabel' => clean_text($fields['eventEditorialLabel'] ?? '', 300),
        'eventEditorialTitle' => clean_text($fields['eventEditorialTitle'] ?? '', 1000),
        'eventEditorialSummary' => clean_text($fields['eventEditorialSummary'] ?? '', 5000),
        'eventEditorialImage' => clean_url($fields['eventEditorialImage'] ?? ''),
        'eventEditorialImageCopyright' => clean_text($fields['eventEditorialImageCopyright'] ?? '', 300),
        'eventEditorialLabel2' => clean_text($fields['eventEditorialLabel2'] ?? '', 300),
        'eventEditorialTitle2' => clean_text($fields['eventEditorialTitle2'] ?? '', 1000),
        'eventEditorialSummary2' => clean_text($fields['eventEditorialSummary2'] ?? '', 5000),
        'eventEditorialImage2' => clean_url($fields['eventEditorialImage2'] ?? ''),
        'eventEditorialImage2Copyright' => clean_text($fields['eventEditorialImage2Copyright'] ?? '', 300),
        'connectedEventId' => clean_text($fields['connectedEventId'] ?? '', 120),
        'featuredHomepageEvent' => (bool) ($fields['featuredHomepageEvent'] ?? false),
        'mainHomepageEvent' => (bool) ($fields['mainHomepageEvent'] ?? false),
        'featuredEvent' => (bool) ($fields['featuredEvent'] ?? false),
        'sponsorType' => $sponsorType,
        'sponsorUrl' => clean_url($fields['sponsorUrl'] ?? $record['sponsorUrl'] ?? ''),
        'contentCategory' => $contentCategory,
        'widgetKind' => clean_text($fields['widgetKind'] ?? '', 80),
        'widgetType' => clean_text($fields['widgetType'] ?? '', 80),
        'widgetOrder' => max(0, $widgetOrder),
        'widgetSourceId' => clean_text($fields['widgetSourceId'] ?? '', 120),
        'widgetAssetId' => clean_text($fields['widgetAssetId'] ?? '', 120),
        'widgetSponsorType' => $widgetSponsorType,
        'widgetEnabled' => (bool) ($fields['widgetEnabled'] ?? true),
    ];

    if (
        preg_match('/^\d{4}-\d{2}-\d{2}$/', $normalizedFields['eventDate']) &&
        preg_match('/^\d{4}-\d{2}-\d{2}$/', $normalizedFields['eventEndDate']) &&
        strcmp($normalizedFields['eventEndDate'], $normalizedFields['eventDate']) < 0
    ) {
        $normalizedFields['eventEndDate'] = $normalizedFields['eventDate'];
    }

    if ($normalizedFields['mainHomepageEvent']) {
        $normalizedFields['featuredHomepageEvent'] = true;
    }

    $type = clean_text($record['type'] ?? 'Page section', 100);
    if ($type === '') {
        $type = 'Page section';
    }

    $page = normalized_record_page(clean_text($record['page'] ?? '/', 300), $slug, $type);
    $rawPlacements = is_array($record['placements'] ?? null) ? $record['placements'] : [];
    $normalizedPlacements = [];
    foreach ($rawPlacements as $placement) {
        $candidate = normalize_path(clean_text((string) $placement, 300));
        if ($candidate === '') {
            continue;
        }
        $normalizedPlacements[] = $candidate;
    }
    $normalizedPlacements = array_values(array_unique($normalizedPlacements));

    $rawTargets = is_array($record['targets'] ?? null) ? $record['targets'] : [];
    $normalizedTargets = [];
    $seenTargetPages = [];
    foreach ($rawTargets as $target) {
        if (!is_array($target)) {
            continue;
        }
        $targetPage = normalize_path(clean_text((string) ($target['page'] ?? ''), 300));
        if ($targetPage === '' || isset($seenTargetPages[$targetPage])) {
            continue;
        }
        $seenTargetPages[$targetPage] = true;
        $normalizedTargets[] = [
            'page' => $targetPage,
            'section' => normalize_section_target($target['section'] ?? ''),
        ];
    }
    if (!$normalizedTargets) {
        foreach (array_values(array_unique(array_merge([$page], $normalizedPlacements))) as $fallbackPage) {
            $normalizedTargets[] = [
                'page' => $fallbackPage,
                'section' => 'end-of-page',
            ];
        }
    }
    $page = $normalizedTargets[0]['page'] ?? $page;
    $normalizedPlacements = array_map(
        static fn(array $target): string => $target['page'],
        array_slice($normalizedTargets, 1)
    );

    return [
        'id' => $id,
        'slug' => $slug,
        'page' => $page,
        'placements' => $normalizedPlacements,
        'targets' => $normalizedTargets,
        'type' => $type,
        'template' => record_template($type, $page),
        'status' => $status,
        'updated' => clean_text($record['updated'] ?? 'Just now', 100),
        'updatedAt' => $now,
        'author' => clean_text($record['author'] ?? (current_user_public_profile()['username'] ?? (cms_username() ?: 'editor')), 80),
        'title' => $normalizedFields['heading'] !== '' ? $normalizedFields['heading'] : clean_text($record['title'] ?? 'Untitled content record', 1000),
        'excerpt' => $normalizedFields['summary'],
        'body' => $normalizedFields['body'],
        'language' => clean_text($record['language'] ?? 'English', 50),
        'pushFacebook' => (bool) ($record['pushFacebook'] ?? false),
        'fields' => $normalizedFields,
        'createdAt' => $existing['createdAt'] ?? $now,
    ];
}

function content_file(string $tenant): string
{
    return CONTENT_ROOT . '/' . $tenant . '.json';
}

function load_content(string $tenant): array
{
    return read_json_file(content_file($tenant), [
        'tenant' => $tenant,
        'updatedAt' => gmdate('c'),
        'records' => [],
    ]);
}

function is_event_record(array $record): bool
{
    $type = clean_text($record['type'] ?? '', 100);
    $page = normalize_path(clean_text($record['page'] ?? '/', 300));
    return is_event_type($type) || str_starts_with($page, '/events/');
}

function events_table_name(): string
{
    return 'events';
}

function ensure_events_table(): void
{
    static $ready = false;
    if ($ready) {
        return;
    }

    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        throw new RuntimeException(last_database_error() !== '' ? last_database_error() : 'Events database connection is unavailable.');
    }

    $table = events_table_name();
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS `{$table}` (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `tenant_id` VARCHAR(80) NOT NULL,
            `record_id` VARCHAR(120) NOT NULL,
            `slug` VARCHAR(160) NOT NULL,
            `type` VARCHAR(100) NOT NULL DEFAULT 'Event',
            `page` VARCHAR(255) NOT NULL DEFAULT '/',
            `status` VARCHAR(40) NOT NULL DEFAULT 'draft',
            `title` VARCHAR(1000) NOT NULL,
            `excerpt` TEXT NULL,
            `body` LONGTEXT NULL,
            `language` VARCHAR(50) NOT NULL DEFAULT 'English',
            `event_date` VARCHAR(80) NULL,
            `event_end_date` VARCHAR(80) NULL,
            `event_category` VARCHAR(40) NULL,
            `event_time` VARCHAR(160) NULL,
            `event_venue` VARCHAR(500) NULL,
            `event_latitude` DECIMAL(10,7) NULL,
            `event_longitude` DECIMAL(10,7) NULL,
            `event_place_id` VARCHAR(255) NULL,
            `image_url` VARCHAR(2000) NULL,
            `image_alt` VARCHAR(1000) NULL,
            `author` VARCHAR(80) NULL,
            `push_facebook` TINYINT(1) NOT NULL DEFAULT 0,
            `featured_homepage_event` TINYINT(1) NOT NULL DEFAULT 0,
            `main_homepage_event` TINYINT(1) NOT NULL DEFAULT 0,
            `featured_event` TINYINT(1) NOT NULL DEFAULT 0,
            `placements_json` LONGTEXT NULL,
            `targets_json` LONGTEXT NULL,
            `record_json` LONGTEXT NOT NULL,
            `created_at` DATETIME NOT NULL,
            `updated_at` DATETIME NOT NULL,
            `deleted_at` DATETIME NULL DEFAULT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY `uniq_events_tenant_record` (`tenant_id`, `record_id`),
            UNIQUE KEY `uniq_events_tenant_slug` (`tenant_id`, `slug`),
            KEY `idx_events_tenant_status` (`tenant_id`, `status`),
            KEY `idx_events_tenant_updated` (`tenant_id`, `updated_at`),
            KEY `idx_events_tenant_deleted` (`tenant_id`, `deleted_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    try {
        $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `event_end_date` VARCHAR(80) NULL AFTER `event_date`");
    } catch (Throwable $error) {
        if (stripos($error->getMessage(), 'Duplicate column name') === false) {
            throw $error;
        }
    }

    try {
        $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `event_category` VARCHAR(40) NULL AFTER `event_end_date`");
    } catch (Throwable $error) {
        if (stripos($error->getMessage(), 'Duplicate column name') === false) {
            throw $error;
        }
    }

    try {
        $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `main_homepage_event` TINYINT(1) NOT NULL DEFAULT 0 AFTER `featured_homepage_event`");
    } catch (Throwable $error) {
        if (stripos($error->getMessage(), 'Duplicate column name') === false) {
            throw $error;
        }
    }

    try {
        $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `event_latitude` DECIMAL(10,7) NULL AFTER `event_venue`");
    } catch (Throwable $error) {
        if (stripos($error->getMessage(), 'Duplicate column name') === false) {
            throw $error;
        }
    }

    try {
        $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `event_longitude` DECIMAL(10,7) NULL AFTER `event_latitude`");
    } catch (Throwable $error) {
        if (stripos($error->getMessage(), 'Duplicate column name') === false) {
            throw $error;
        }
    }

    try {
        $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `event_place_id` VARCHAR(255) NULL AFTER `event_longitude`");
    } catch (Throwable $error) {
        if (stripos($error->getMessage(), 'Duplicate column name') === false) {
            throw $error;
        }
    }

    $ready = true;
}

function sql_datetime_from_iso(?string $value, ?string $fallback = null): string
{
    $source = trim((string) ($value ?? ''));
    if ($source !== '') {
        try {
            return (new DateTimeImmutable($source))->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d H:i:s');
        } catch (Throwable $error) {
        }
    }

    if ($fallback !== null && trim($fallback) !== '') {
        return $fallback;
    }

    return gmdate('Y-m-d H:i:s');
}

function iso_from_sql_datetime(?string $value): string
{
    $source = trim((string) ($value ?? ''));
    if ($source === '') {
        return gmdate('c');
    }

    try {
        return (new DateTimeImmutable($source, new DateTimeZone('UTC')))->format('c');
    } catch (Throwable $error) {
        return gmdate('c');
    }
}

function encode_database_json(mixed $value): string
{
    $json = json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    return is_string($json) ? $json : '[]';
}

function decode_database_json(?string $value, mixed $fallback): mixed
{
    $source = trim((string) ($value ?? ''));
    if ($source === '') {
        return $fallback;
    }

    $decoded = json_decode($source, true);
    return json_last_error() === JSON_ERROR_NONE ? $decoded : $fallback;
}

function event_record_key(array $record): string
{
    $id = clean_text($record['id'] ?? '', 120);
    $slug = clean_text($record['slug'] ?? '', 160);
    return $id !== '' ? 'id:' . $id : 'slug:' . $slug;
}

function remove_legacy_event_content_record(string $tenant, array $record): void
{
    $data = load_content($tenant);
    $records = is_array($data['records'] ?? null) ? array_values($data['records']) : [];
    $recordId = clean_text($record['id'] ?? '', 120);
    $slug = clean_text($record['slug'] ?? '', 160);

    $filtered = array_values(array_filter(
        $records,
        static function (array $candidate) use ($recordId, $slug): bool {
            if (!is_event_record($candidate)) {
                return true;
            }

            $candidateId = clean_text($candidate['id'] ?? '', 120);
            $candidateSlug = clean_text($candidate['slug'] ?? '', 160);
            if ($recordId !== '' && $candidateId === $recordId) {
                return false;
            }
            if ($slug !== '' && $candidateSlug === $slug) {
                return false;
            }
            return true;
        }
    ));

    if (count($filtered) === count($records)) {
        return;
    }

    $data['tenant'] = $tenant;
    $data['updatedAt'] = gmdate('c');
    $data['records'] = $filtered;
    write_json_file(content_file($tenant), $data);
}

function event_record_from_database_row(array $row): array
{
    $stored = decode_database_json($row['record_json'] ?? '', []);
    $base = is_array($stored) ? $stored : [];
    $record = normalize_record($base, $base);

    $record['id'] = clean_text($row['record_id'] ?? $record['id'] ?? '', 120);
    $record['slug'] = clean_text($row['slug'] ?? $record['slug'] ?? '', 160);
    $record['type'] = clean_text($row['type'] ?? $record['type'] ?? 'Event', 100);
    $record['page'] = normalized_record_page(
        clean_text($row['page'] ?? $record['page'] ?? '/', 300),
        $record['slug'],
        $record['type']
    );
    $record['status'] = clean_text($row['status'] ?? $record['status'] ?? 'draft', 40);
    $record['title'] = clean_text($row['title'] ?? $record['title'] ?? '', 1000);
    $record['excerpt'] = clean_text($row['excerpt'] ?? $record['excerpt'] ?? '', 3000);
    $record['body'] = clean_rich_text($row['body'] ?? $record['body'] ?? '', 40000);
    $record['language'] = clean_text($row['language'] ?? $record['language'] ?? 'English', 50);
    $record['author'] = clean_text($row['author'] ?? $record['author'] ?? 'editor', 80);
    $record['pushFacebook'] = (bool) ($row['push_facebook'] ?? $record['pushFacebook'] ?? false);
    $record['updatedAt'] = iso_from_sql_datetime($row['updated_at'] ?? null);
    $record['createdAt'] = iso_from_sql_datetime($row['created_at'] ?? null);
    $record['updated'] = 'Just now';

    $record['placements'] = is_array($record['placements'] ?? null)
        ? array_values($record['placements'])
        : decode_database_json($row['placements_json'] ?? '', []);
    $record['targets'] = is_array($record['targets'] ?? null)
        ? array_values($record['targets'])
        : decode_database_json($row['targets_json'] ?? '', []);

    $fields = is_array($record['fields'] ?? null) ? $record['fields'] : [];
    $fields['heading'] = $record['title'];
    $fields['summary'] = $record['excerpt'];
    $fields['body'] = $record['body'];
    $fields['image'] = clean_url($row['image_url'] ?? ($fields['image'] ?? ''));
    $fields['imageAlt'] = clean_text($row['image_alt'] ?? ($fields['imageAlt'] ?? ''), 1000);
    $fields['eventDate'] = clean_text($row['event_date'] ?? ($fields['eventDate'] ?? ''), 80);
    $fields['eventEndDate'] = clean_text($row['event_end_date'] ?? ($fields['eventEndDate'] ?? ''), 80);
    $fields['eventCategory'] = normalize_event_category($row['event_category'] ?? ($fields['eventCategory'] ?? ''));
    $fields['eventTime'] = clean_text($row['event_time'] ?? ($fields['eventTime'] ?? ''), 160);
    $fields['eventVenue'] = clean_text($row['event_venue'] ?? ($fields['eventVenue'] ?? ''), 500);
    $fields['eventLatitude'] = clean_coordinate($row['event_latitude'] ?? ($fields['eventLatitude'] ?? ''), -90, 90);
    $fields['eventLongitude'] = clean_coordinate($row['event_longitude'] ?? ($fields['eventLongitude'] ?? ''), -180, 180);
    $fields['eventPlaceId'] = clean_text($row['event_place_id'] ?? ($fields['eventPlaceId'] ?? ''), 255);
    $fields['featuredHomepageEvent'] = (bool) ($row['featured_homepage_event'] ?? ($fields['featuredHomepageEvent'] ?? false));
    $fields['mainHomepageEvent'] = (bool) ($row['main_homepage_event'] ?? ($fields['mainHomepageEvent'] ?? false));
    if ($fields['mainHomepageEvent']) {
        $fields['featuredHomepageEvent'] = true;
    }
    $fields['featuredEvent'] = (bool) ($row['featured_event'] ?? ($fields['featuredEvent'] ?? false));
    $record['fields'] = $fields;

    return $record;
}

function database_event_record(string $tenant, string $idOrSlug, bool $includeDeleted = false): ?array
{
    $needle = clean_text($idOrSlug, 160);
    if ($needle === '') {
        return null;
    }

    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        return null;
    }

    ensure_events_table();
    $table = events_table_name();
    $sql = "SELECT * FROM `{$table}` WHERE tenant_id = :tenant AND (record_id = :record_id_needle OR slug = :slug_needle)";
    if (!$includeDeleted) {
        $sql .= " AND deleted_at IS NULL";
    }
    $sql .= " ORDER BY updated_at DESC LIMIT 1";

    $statement = $pdo->prepare($sql);
    $statement->execute([
        ':tenant' => $tenant,
        ':record_id_needle' => $needle,
        ':slug_needle' => $needle,
    ]);
    $row = $statement->fetch();

    return is_array($row) ? $row : null;
}

function database_event_records(string $tenant, bool $includeDrafts = false): array
{
    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        return [];
    }

    ensure_events_table();
    $table = events_table_name();
    $sql = "SELECT * FROM `{$table}` WHERE tenant_id = :tenant AND deleted_at IS NULL";
    if ($includeDrafts) {
        $sql .= " AND status <> 'archived'";
    } else {
        $sql .= " AND status = 'published'";
    }
    $sql .= " ORDER BY updated_at DESC, id DESC";

    $statement = $pdo->prepare($sql);
    $statement->execute([':tenant' => $tenant]);
    $rows = $statement->fetchAll();

    $records = [];
    foreach ($rows as $row) {
        if (!is_array($row)) {
            continue;
        }
        $records[] = event_record_from_database_row($row);
    }

    return $records;
}

function save_event_record_to_database(string $tenant, array $incoming): array
{
    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        throw new RuntimeException(last_database_error() !== '' ? last_database_error() : 'Events database connection is unavailable.');
    }

    ensure_events_table();

    $incomingId = clean_text($incoming['id'] ?? '', 120);
    $incomingSlug = clean_text($incoming['slug'] ?? '', 160);
    $existingRow = $incomingId !== ''
        ? database_event_record($tenant, $incomingId, true)
        : ($incomingSlug !== '' ? database_event_record($tenant, $incomingSlug, true) : null);
    $existing = is_array($existingRow) ? event_record_from_database_row($existingRow) : null;
    $normalized = normalize_record($incoming, $existing, true);

    $fields = is_array($normalized['fields'] ?? null) ? $normalized['fields'] : [];
    $eventLatitude = clean_coordinate($fields['eventLatitude'] ?? '', -90, 90);
    $eventLongitude = clean_coordinate($fields['eventLongitude'] ?? '', -180, 180);
    $createdAtSql = sql_datetime_from_iso($normalized['createdAt'] ?? null, is_array($existingRow) ? (string) ($existingRow['created_at'] ?? '') : null);
    $updatedAtSql = sql_datetime_from_iso($normalized['updatedAt'] ?? null);
    $table = events_table_name();

    $statement = $pdo->prepare(
        "INSERT INTO `{$table}` (
            tenant_id,
            record_id,
            slug,
            type,
            page,
            status,
            title,
            excerpt,
            body,
            language,
            event_date,
            event_end_date,
            event_category,
            event_time,
            event_venue,
            event_latitude,
            event_longitude,
            event_place_id,
            image_url,
            image_alt,
            author,
            push_facebook,
            featured_homepage_event,
            main_homepage_event,
            featured_event,
            placements_json,
            targets_json,
            record_json,
            created_at,
            updated_at,
            deleted_at
        ) VALUES (
            :tenant_id,
            :record_id,
            :slug,
            :type,
            :page,
            :status,
            :title,
            :excerpt,
            :body,
            :language,
            :event_date,
            :event_end_date,
            :event_category,
            :event_time,
            :event_venue,
            :event_latitude,
            :event_longitude,
            :event_place_id,
            :image_url,
            :image_alt,
            :author,
            :push_facebook,
            :featured_homepage_event,
            :main_homepage_event,
            :featured_event,
            :placements_json,
            :targets_json,
            :record_json,
            :created_at,
            :updated_at,
            NULL
        )
        ON DUPLICATE KEY UPDATE
            slug = VALUES(slug),
            type = VALUES(type),
            page = VALUES(page),
            status = VALUES(status),
            title = VALUES(title),
            excerpt = VALUES(excerpt),
            body = VALUES(body),
            language = VALUES(language),
            event_date = VALUES(event_date),
            event_end_date = VALUES(event_end_date),
            event_category = VALUES(event_category),
            event_time = VALUES(event_time),
            event_venue = VALUES(event_venue),
            event_latitude = VALUES(event_latitude),
            event_longitude = VALUES(event_longitude),
            event_place_id = VALUES(event_place_id),
            image_url = VALUES(image_url),
            image_alt = VALUES(image_alt),
            author = VALUES(author),
            push_facebook = VALUES(push_facebook),
            featured_homepage_event = VALUES(featured_homepage_event),
            main_homepage_event = VALUES(main_homepage_event),
            featured_event = VALUES(featured_event),
            placements_json = VALUES(placements_json),
            targets_json = VALUES(targets_json),
            record_json = VALUES(record_json),
            updated_at = VALUES(updated_at),
            deleted_at = NULL"
    );

    $startedTransaction = !$pdo->inTransaction();
    if ($startedTransaction) {
        $pdo->beginTransaction();
    }
    try {
        $statement->execute([
            ':tenant_id' => $tenant,
            ':record_id' => $normalized['id'],
            ':slug' => $normalized['slug'],
            ':type' => $normalized['type'],
            ':page' => $normalized['page'],
            ':status' => $normalized['status'],
            ':title' => $normalized['title'],
            ':excerpt' => $normalized['excerpt'],
            ':body' => $normalized['body'],
            ':language' => $normalized['language'],
            ':event_date' => clean_text($fields['eventDate'] ?? '', 80),
            ':event_end_date' => clean_text($fields['eventEndDate'] ?? '', 80),
            ':event_category' => normalize_event_category($fields['eventCategory'] ?? '', true),
            ':event_time' => clean_text($fields['eventTime'] ?? '', 160),
            ':event_venue' => clean_text($fields['eventVenue'] ?? '', 500),
            ':event_latitude' => $eventLatitude !== '' ? $eventLatitude : null,
            ':event_longitude' => $eventLongitude !== '' ? $eventLongitude : null,
            ':event_place_id' => clean_text($fields['eventPlaceId'] ?? '', 255),
            ':image_url' => clean_url($fields['image'] ?? ''),
            ':image_alt' => clean_text($fields['imageAlt'] ?? '', 1000),
            ':author' => $normalized['author'],
            ':push_facebook' => $normalized['pushFacebook'] ? 1 : 0,
            ':featured_homepage_event' => !empty($fields['featuredHomepageEvent']) ? 1 : 0,
            ':main_homepage_event' => !empty($fields['mainHomepageEvent']) ? 1 : 0,
            ':featured_event' => !empty($fields['featuredEvent']) ? 1 : 0,
            ':placements_json' => encode_database_json($normalized['placements'] ?? []),
            ':targets_json' => encode_database_json($normalized['targets'] ?? []),
            ':record_json' => encode_database_json($normalized),
            ':created_at' => $createdAtSql,
            ':updated_at' => $updatedAtSql,
        ]);

        if (!empty($fields['mainHomepageEvent'])) {
            $clearOtherMainEvents = $pdo->prepare(
                "UPDATE `{$table}`
                 SET main_homepage_event = 0
                 WHERE tenant_id = :tenant
                   AND record_id <> :record_id
                   AND main_homepage_event = 1"
            );
            $clearOtherMainEvents->execute([
                ':tenant' => $tenant,
                ':record_id' => $normalized['id'],
            ]);
        }

        if ($startedTransaction) {
            $pdo->commit();
        }
    } catch (Throwable $error) {
        if ($startedTransaction && $pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $error;
    }

    return event_record_from_database_row(
        database_event_record($tenant, (string) $normalized['id'], true) ?? []
    );
}

function update_database_event_status(string $tenant, string $id, string $status): ?array
{
    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        throw new RuntimeException(last_database_error() !== '' ? last_database_error() : 'Events database connection is unavailable.');
    }

    $row = database_event_record($tenant, $id, true);
    if (!is_array($row)) {
        return null;
    }

    $record = event_record_from_database_row($row);
    $record['status'] = $status;
    $record['updated'] = 'Just now';
    $record['updatedAt'] = gmdate('c');
    $record['author'] = current_user_public_profile()['username'] ?? 'editor';

    return save_event_record_to_database($tenant, $record);
}

function soft_delete_database_event(string $tenant, string $id): bool
{
    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        throw new RuntimeException(last_database_error() !== '' ? last_database_error() : 'Events database connection is unavailable.');
    }

    ensure_events_table();
    $table = events_table_name();
    $statement = $pdo->prepare(
        "UPDATE `{$table}`
         SET status = 'archived', deleted_at = :deleted_at, updated_at = :updated_at
         WHERE tenant_id = :tenant AND record_id = :id AND deleted_at IS NULL"
    );
    $statement->execute([
        ':deleted_at' => gmdate('Y-m-d H:i:s'),
        ':updated_at' => gmdate('Y-m-d H:i:s'),
        ':tenant' => $tenant,
        ':id' => $id,
    ]);

    return $statement->rowCount() > 0;
}

function merged_content_payload(string $tenant, bool $includeDrafts): array
{
    $jsonData = load_content($tenant);
    $jsonRecords = is_array($jsonData['records'] ?? null) ? array_values($jsonData['records']) : [];
    $dbEvents = database_event_records($tenant, $includeDrafts);

    $records = [];
    $seenEventKeys = [];

    foreach ($dbEvents as $record) {
        $records[] = $record;
        $seenEventKeys[event_record_key($record)] = true;
    }

    foreach ($jsonRecords as $record) {
        if (!is_array($record)) {
            continue;
        }

        if (!$includeDrafts && ($record['status'] ?? '') !== 'published') {
            continue;
        }

        if (is_event_record($record)) {
            $key = event_record_key($record);
            if (isset($seenEventKeys[$key])) {
                continue;
            }
        }

        $records[] = $record;
    }

    $updatedAt = (string) ($jsonData['updatedAt'] ?? gmdate('c'));
    foreach ($dbEvents as $record) {
        $candidate = (string) ($record['updatedAt'] ?? '');
        if ($candidate !== '' && strcmp($candidate, $updatedAt) > 0) {
            $updatedAt = $candidate;
        }
    }

    return [
        'tenant' => $tenant,
        'updatedAt' => $updatedAt,
        'records' => $records,
    ];
}

$action = $_GET['action'] ?? 'health';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($action === 'health' && $method === 'GET') {
    respond([
        'ok' => true,
        'service' => 'TukodPH CMS API',
        'version' => '0.1-testing',
        'authenticated' => is_authenticated(),
        'authConfigured' => cms_auth_configured(),
        'user' => current_user_public_profile(),
        'time' => gmdate('c'),
    ]);
}

if ($action === 'login' && $method === 'POST') {
    require_auth_config();
    $body = request_json();
    $username = clean_text($body['username'] ?? '', 80);
    $password = (string) ($body['password'] ?? '');
    $requestedTenant = trim((string) ($body['tenant'] ?? ''));
    $requestedTenant = $requestedTenant !== '' ? safe_tenant_id($requestedTenant) : '';
    $matchedProfile = null;

    foreach (cms_user_profiles() as $profile) {
        $usernameMatches = hash_equals((string) ($profile['username'] ?? ''), $username)
            || (
                trim((string) ($profile['email'] ?? '')) !== ''
                && hash_equals((string) $profile['email'], $username)
            );

        if (!$usernameMatches || !verify_profile_password($profile, $password)) {
            continue;
        }
        $matchedProfile = $profile;
        break;
    }

    if ($matchedProfile === null) {
        respond(['ok' => false, 'error' => 'The username or password is incorrect.'], 401);
    }

    if ($requestedTenant !== '' && !in_array($requestedTenant, $matchedProfile['allowedTenants'], true)) {
        respond(['ok' => false, 'error' => 'This account cannot access the requested festival workspace.'], 403);
    }

    $activeTenant = $requestedTenant !== ''
        ? $requestedTenant
        : ($matchedProfile['defaultTenant'] !== '' ? $matchedProfile['defaultTenant'] : ($matchedProfile['allowedTenants'][0] ?? ''));

    session_regenerate_id(true);
    $_SESSION['cms_auth'] = [
        'username' => $matchedProfile['username'],
        'role' => $matchedProfile['role'],
        'allowedTenants' => $matchedProfile['allowedTenants'],
        'activeTenant' => $activeTenant,
        'canSwitchTenants' => $matchedProfile['canSwitchTenants'],
    ];
    respond(['ok' => true, 'user' => current_user_public_profile()]);
}

if ($action === 'logout' && $method === 'POST') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
    respond(['ok' => true]);
}

if ($action === 'portals' && $method === 'GET') {
    $requestedTenant = trim((string) ($_GET['tenant'] ?? ''));
    $requestedTenant = $requestedTenant !== '' ? safe_tenant_id($requestedTenant) : '';
    $portals = portal_registry();

    if (is_authenticated()) {
        $visibleTenantIds = current_user_visible_tenants();
        $portals = array_values(array_filter(
            $portals,
            static fn(array $portal): bool => in_array((string) ($portal['id'] ?? ''), $visibleTenantIds, true)
        ));
    } elseif ($requestedTenant !== '') {
        $portals = array_values(array_filter(
            $portals,
            static fn(array $portal): bool => (string) ($portal['id'] ?? '') === $requestedTenant
        ));
    }

    respond([
        'ok' => true,
        'portals' => $portals,
        'activeTenant' => is_authenticated() ? current_active_tenant() : ($requestedTenant !== '' ? $requestedTenant : ($portals[0]['id'] ?? '')),
        'canSwitchTenants' => is_authenticated() ? current_user_can_switch_tenants() : false,
        'user' => current_user_public_profile(),
    ]);
}

if ($action === 'templates' && $method === 'GET') {
    respond([
        'ok' => true,
        'templates' => template_catalog(),
    ]);
}

if ($action === 'validate-event-csv' && $method === 'POST') {
    if (!is_authenticated()) {
        respond(['ok' => false, 'error' => 'Sign in first to validate an event CSV upload.'], 401);
    }

    $tenant = current_active_tenant();
    require_tenant_access($tenant);
    $body = request_json();
    $csvText = (string) ($body['csv'] ?? '');
    if (trim($csvText) === '') {
        respond(['ok' => false, 'error' => 'Upload a CSV file first.'], 422);
    }

    $validation = validate_event_csv_import($tenant, $csvText);
    respond([
        'ok' => true,
        'tenant' => $tenant,
        'templateHeaders' => event_csv_template_headers(),
        'validation' => $validation,
    ]);
}

if ($action === 'import-event-csv' && $method === 'POST') {
    if (!is_authenticated()) {
        respond(['ok' => false, 'error' => 'Sign in first to import event records.'], 401);
    }

    $tenant = current_active_tenant();
    require_tenant_access($tenant);
    $body = request_json();
    $csvText = (string) ($body['csv'] ?? '');
    if (trim($csvText) === '') {
        respond(['ok' => false, 'error' => 'Upload a CSV file first.'], 422);
    }

    $validation = validate_event_csv_import($tenant, $csvText);
    if (!empty($validation['errors'])) {
        respond([
            'ok' => false,
            'error' => 'The CSV file could not be imported until the header issues are fixed.',
            'validation' => $validation,
        ], 422);
    }

    if (($validation['invalidCount'] ?? 0) > 0 || empty($validation['canImport'])) {
        respond([
            'ok' => false,
            'error' => 'Fix every invalid CSV row before importing events.',
            'validation' => $validation,
        ], 422);
    }

    $pdo = database_connection();
    if (!$pdo instanceof PDO) {
        respond([
            'ok' => false,
            'error' => last_database_error() !== '' ? last_database_error() : 'Events database connection is unavailable.',
        ], 500);
    }

    $importedRecords = [];
    $pdo->beginTransaction();
    try {
        foreach ($validation['rows'] as $row) {
            if (empty($row['valid']) || !is_array($row['record'] ?? null)) {
                continue;
            }
            $saved = save_event_record_to_database($tenant, $row['record']);
            remove_legacy_event_content_record($tenant, $saved);
            $importedRecords[] = $saved;
        }
        $pdo->commit();
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log('TukodPH CMS event CSV import failed: ' . $error->getMessage());
        respond([
            'ok' => false,
            'error' => 'The CSV import could not be completed.',
            'detail' => cms_debug_detail($error->getMessage()),
        ], 500);
    }

    respond([
        'ok' => true,
        'tenant' => $tenant,
        'importedCount' => count($importedRecords),
        'records' => $importedRecords,
        'updatedAt' => gmdate('c'),
    ]);
}

if ($action === 'event-record' && $method === 'GET') {
    $tenantFromHeader = $_SERVER['HTTP_X_TENANT_ID'] ?? '';
    $tenant = safe_tenant_id((string) ($_GET['tenant'] ?? $tenantFromHeader));
    $needle = clean_text($_GET['id'] ?? $_GET['slug'] ?? '', 160);
    $includeDrafts = ($_GET['includeDrafts'] ?? '') === '1';

    if ($includeDrafts) {
        require_tenant_access($tenant);
    }

    $record = null;
    $row = database_event_record($tenant, $needle, $includeDrafts);
    if (is_array($row)) {
        $candidate = event_record_from_database_row($row);
        if ($includeDrafts || ($candidate['status'] ?? '') === 'published') {
            $record = $candidate;
        }
    }

    if ($record === null) {
        $data = load_content($tenant);
        foreach (array_values($data['records'] ?? []) as $candidate) {
            if (!is_array($candidate) || !is_event_record($candidate)) {
                continue;
            }

            $matches = ($candidate['id'] ?? '') === $needle || ($candidate['slug'] ?? '') === $needle;
            if (!$matches) {
                continue;
            }

            if (!$includeDrafts && ($candidate['status'] ?? '') !== 'published') {
                continue;
            }

            $record = $candidate;
            break;
        }
    }

    if ($record === null) {
        respond(['ok' => false, 'error' => 'Event record not found.'], 404);
    }

    respond([
        'ok' => true,
        'tenant' => $tenant,
        'record' => $record,
    ]);
}

if (($action === 'content' || $action === 'public-content') && $method === 'GET') {
    $tenantFromHeader = $_SERVER['HTTP_X_TENANT_ID'] ?? '';
    $tenant = safe_tenant_id((string) ($_GET['tenant'] ?? $tenantFromHeader));
    $includeDrafts = $action === 'content' && ($_GET['includeDrafts'] ?? '') === '1';
    $payload = merged_content_payload($tenant, $includeDrafts);

    if ($includeDrafts) {
        require_tenant_access($tenant);
        respond([
            'ok' => true,
            'tenant' => $tenant,
            'updatedAt' => $payload['updatedAt'] ?? null,
            'records' => array_values($payload['records'] ?? []),
        ]);
    }

    $published = [];
    foreach (($payload['records'] ?? []) as $record) {
        if (($record['status'] ?? '') !== 'published') {
            continue;
        }
        $published[$record['slug']] = [
            'id' => $record['id'],
            'slug' => $record['slug'],
            'page' => $record['page'] ?? '/',
            'placements' => array_values($record['placements'] ?? []),
            'targets' => array_values($record['targets'] ?? []),
            'type' => $record['type'] ?? 'Page section',
            'template' => $record['template'] ?? record_template((string) ($record['type'] ?? 'Page section'), (string) ($record['page'] ?? '/')),
            'updatedAt' => $record['updatedAt'] ?? null,
            'fields' => $record['fields'] ?? [],
        ];
    }

    header('Cache-Control: no-store, max-age=0');
    respond([
        'ok' => true,
        'tenant' => $tenant,
        'updatedAt' => $payload['updatedAt'] ?? null,
        'records' => $published,
    ]);
}

if ($action === 'media' && $method === 'GET') {
    $tenantFromHeader = $_SERVER['HTTP_X_TENANT_ID'] ?? '';
    $tenant = safe_tenant_id((string) ($_GET['tenant'] ?? $tenantFromHeader));
    require_tenant_access($tenant);
    $data = load_media($tenant);
    $assets = array_map('normalize_media_asset', array_values($data['assets'] ?? []));
    respond([
        'ok' => true,
        'tenant' => $tenant,
        'updatedAt' => $data['updatedAt'] ?? null,
        'assets' => $assets,
    ]);
}

if ($action === 'save-content' && $method === 'POST') {
    $body = request_json();
    $tenant = safe_tenant_id((string) ($body['tenant'] ?? ''));
    require_tenant_access($tenant);
    $incoming = is_array($body['record'] ?? null) ? $body['record'] : [];

    if (is_event_record($incoming)) {
        try {
            $savedEvent = save_event_record_to_database($tenant, $incoming);
            remove_legacy_event_content_record($tenant, $savedEvent);
            respond(['ok' => true, 'record' => $savedEvent, 'updatedAt' => $savedEvent['updatedAt'] ?? gmdate('c')]);
        } catch (Throwable $error) {
            error_log('TukodPH CMS event save failed: ' . $error->getMessage());
            respond([
                'ok' => false,
                'error' => 'Event record could not be saved to the events table.',
                'detail' => cms_debug_detail($error->getMessage()),
            ], 500);
        }
    }

    $data = load_content($tenant);
    $records = array_values($data['records'] ?? []);

    $existingIndex = null;
    $existing = null;
    $incomingId = clean_text($incoming['id'] ?? '', 80);
    foreach ($records as $index => $record) {
        if (($record['id'] ?? '') === $incomingId || (($record['slug'] ?? '') !== '' && ($record['slug'] ?? '') === ($incoming['slug'] ?? ''))) {
            $existingIndex = $index;
            $existing = $record;
            break;
        }
    }

    $normalized = normalize_record($incoming, $existing, true);
    if ($existingIndex === null) {
        array_unshift($records, $normalized);
    } else {
        $records[$existingIndex] = $normalized;
    }

    $data['tenant'] = $tenant;
    $data['updatedAt'] = gmdate('c');
    $data['records'] = array_values($records);
    write_json_file(content_file($tenant), $data);

    respond(['ok' => true, 'record' => $normalized, 'updatedAt' => $data['updatedAt']]);
}

if ($action === 'upload-media' && $method === 'POST') {
    $tenantFromHeader = $_SERVER['HTTP_X_TENANT_ID'] ?? '';
    $tenant = safe_tenant_id((string) ($_POST['tenant'] ?? $tenantFromHeader));
    require_tenant_access($tenant);
    if (!isset($_FILES['file']) || !is_array($_FILES['file'])) {
        respond(['ok' => false, 'error' => 'Select an image file to upload.'], 422);
    }

    $asset = store_uploaded_media(
        $tenant,
        $_FILES['file'],
        clean_text($_POST['alt'] ?? '', 300),
        clean_text($_POST['copyright'] ?? '', 300)
    );
    $data = load_media($tenant);
    $assets = array_values($data['assets'] ?? []);
    array_unshift($assets, $asset);
    $data['tenant'] = $tenant;
    $data['updatedAt'] = gmdate('c');
    $data['assets'] = array_slice(array_map('normalize_media_asset', $assets), 0, 500);
    write_json_file(media_file($tenant), $data);

    respond([
        'ok' => true,
        'tenant' => $tenant,
        'asset' => $asset,
        'updatedAt' => $data['updatedAt'],
    ], 201);
}

if ($action === 'update-status' && $method === 'POST') {
    $body = request_json();
    $tenant = safe_tenant_id((string) ($body['tenant'] ?? ''));
    require_tenant_access($tenant);
    $id = clean_text($body['id'] ?? '', 80);
    $status = clean_text($body['status'] ?? '', 30);
    $allowed = ['draft', 'review', 'published', 'needs-changes'];
    if (!in_array($status, $allowed, true)) {
        respond(['ok' => false, 'error' => 'Invalid status.'], 422);
    }

    try {
        $updatedEvent = update_database_event_status($tenant, $id, $status);
        if (is_array($updatedEvent)) {
            remove_legacy_event_content_record($tenant, $updatedEvent);
            respond(['ok' => true, 'id' => $id, 'status' => $status, 'updatedAt' => $updatedEvent['updatedAt'] ?? gmdate('c')]);
        }
    } catch (Throwable $error) {
        error_log('TukodPH CMS event status update failed: ' . $error->getMessage());
        respond([
            'ok' => false,
            'error' => 'Event status could not be updated in the events table.',
            'detail' => cms_debug_detail($error->getMessage()),
        ], 500);
    }

    $data = load_content($tenant);
    $found = false;
    foreach ($data['records'] as &$record) {
        if (($record['id'] ?? '') === $id) {
            $record['status'] = $status;
            $record['updated'] = 'Just now';
            $record['updatedAt'] = gmdate('c');
            $record['author'] = current_user_public_profile()['username'] ?? 'editor';
            $found = true;
            break;
        }
    }
    unset($record);

    if (!$found) {
        respond(['ok' => false, 'error' => 'Content record not found.'], 404);
    }

    $data['updatedAt'] = gmdate('c');
    write_json_file(content_file($tenant), $data);
    respond(['ok' => true, 'id' => $id, 'status' => $status, 'updatedAt' => $data['updatedAt']]);
}

if ($action === 'delete-content' && $method === 'POST') {
    $body = request_json();
    $tenant = safe_tenant_id((string) ($body['tenant'] ?? ''));
    require_tenant_access($tenant);
    $id = clean_text($body['id'] ?? '', 80);
    if ($id === '') {
        respond(['ok' => false, 'error' => 'Content record ID is required.'], 422);
    }

    try {
        if (soft_delete_database_event($tenant, $id)) {
            remove_legacy_event_content_record($tenant, ['id' => $id]);
            respond(['ok' => true, 'id' => $id, 'updatedAt' => gmdate('c')]);
        }
    } catch (Throwable $error) {
        error_log('TukodPH CMS event archive failed: ' . $error->getMessage());
        respond([
            'ok' => false,
            'error' => 'Event record could not be archived in the events table.',
            'detail' => cms_debug_detail($error->getMessage()),
        ], 500);
    }

    $data = load_content($tenant);
    $before = count($data['records'] ?? []);
    $data['records'] = array_values(array_filter(
        $data['records'] ?? [],
        static fn(array $record): bool => ($record['id'] ?? '') !== $id
    ));

    if (count($data['records']) === $before) {
        respond(['ok' => false, 'error' => 'Content record not found.'], 404);
    }

    $data['updatedAt'] = gmdate('c');
    write_json_file(content_file($tenant), $data);
    respond(['ok' => true, 'id' => $id, 'updatedAt' => $data['updatedAt']]);
}

if ($action === 'register-portal' && $method === 'POST') {
    require_portal_management();
    $body = request_json();
    $name = clean_text($body['name'] ?? '', 120);
    $domain = clean_text($body['domain'] ?? '', 255);
    $id = safe_tenant_id((string) ($body['id'] ?? strtolower(preg_replace('/[^a-z0-9]+/', '-', $name) ?? '')));
    $templateId = clean_text($body['templateId'] ?? '', 80);

    if ($name === '' || $domain === '' || $templateId === '') {
        respond(['ok' => false, 'error' => 'Website name, domain, and template are required.'], 422);
    }
    $templateId = safe_tenant_id($templateId);

    $template = template_manifest($templateId);
    if ($template === null) {
        respond(['ok' => false, 'error' => 'The selected website template could not be found.'], 422);
    }

    $data = read_json_file(PORTALS_FILE, ['portals' => []]);
    foreach (($data['portals'] ?? []) as $portal) {
        if (($portal['id'] ?? '') === $id || strtolower((string) ($portal['domain'] ?? '')) === strtolower($domain)) {
            respond(['ok' => false, 'error' => 'A portal with this ID or domain already exists.'], 409);
        }
    }

    $words = preg_split('/\s+/', $name) ?: [];
    $short = '';
    foreach (array_slice($words, 0, 2) as $word) {
        $short .= text_upper(text_substr($word, 0, 1));
    }

    $portal = [
        'id' => $id,
        'name' => $name,
        'domain' => $domain,
        'short' => $short !== '' ? $short : 'NW',
        'kind' => clean_text($body['kind'] ?? 'government', 30),
        'status' => 'pending',
        'color' => clean_text($body['color'] ?? '#176b68', 20),
        'users' => 1,
        'content' => 0,
        'uptime' => 'Provisioning',
        'articles' => 0,
        'integrated' => false,
        'templateId' => $template['id'],
        'templateName' => $template['name'],
        'structureVersion' => $template['structureVersion'],
        'implementationFamily' => $template['implementationFamily'],
    ];

    $data['portals'][] = $portal;
    write_json_file(PORTALS_FILE, $data);
    write_json_file(content_file($id), ['tenant' => $id, 'updatedAt' => gmdate('c'), 'records' => []]);
    respond(['ok' => true, 'portal' => $portal]);
}

if ($action === 'contact-submissions' && $method === 'GET') {
    $tenantFromHeader = $_SERVER['HTTP_X_TENANT_ID'] ?? '';
    $tenant = safe_tenant_id((string) ($_GET['tenant'] ?? $tenantFromHeader));
    require_tenant_access($tenant);
    $data = load_contact_submissions($tenant);
    respond([
        'ok' => true,
        'tenant' => $tenant,
        'updatedAt' => $data['updatedAt'],
        'entries' => $data['entries'],
    ]);
}

if ($action === 'update-contact-submission-status' && $method === 'POST') {
    $body = request_json();
    $tenant = safe_tenant_id((string) ($body['tenant'] ?? ''));
    require_tenant_access($tenant);
    $id = clean_text($body['id'] ?? '', 80);
    $status = clean_text($body['status'] ?? '', 30);
    if ($id === '' || !in_array($status, contact_submission_statuses(), true)) {
        respond(['ok' => false, 'error' => 'A valid submission and status are required.'], 422);
    }

    $data = load_contact_submissions($tenant);
    $updatedEntry = null;
    foreach ($data['entries'] as &$entry) {
        if (($entry['id'] ?? '') !== $id) {
            continue;
        }
        $entry['status'] = $status;
        $entry['updatedAt'] = gmdate('c');
        $updatedEntry = $entry;
        break;
    }
    unset($entry);

    if ($updatedEntry === null) {
        respond(['ok' => false, 'error' => 'Contact submission not found.'], 404);
    }

    $data['updatedAt'] = gmdate('c');
    write_json_file(inquiry_file($tenant), $data);
    respond([
        'ok' => true,
        'entry' => $updatedEntry,
        'updatedAt' => $data['updatedAt'],
    ]);
}

if ($action === 'submit-inquiry' && $method === 'POST') {
    $body = request_json();
    $tenant = safe_tenant_id((string) ($body['tenant'] ?? ''));
    $fullName = clean_text($body['fullName'] ?? $body['name'] ?? '', 120);
    $email = clean_text($body['email'] ?? '', 160);
    $inquiryType = clean_text($body['inquiryType'] ?? $body['interest'] ?? '', 120);
    $message = clean_text($body['message'] ?? '', 4000);
    $page = clean_text($body['page'] ?? '', 300);
    $website = clean_text($body['website'] ?? '', 300);

    if ($website !== '') {
        respond(['ok' => true, 'received' => true], 202);
    }

    if ($fullName === '' || $email === '' || $inquiryType === '' || $message === '') {
        respond(['ok' => false, 'error' => 'Full name, email address, inquiry type, and message are required.'], 422);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(['ok' => false, 'error' => 'Enter a valid email address.'], 422);
    }

    if (!in_array($inquiryType, contact_inquiry_types(), true)) {
        respond(['ok' => false, 'error' => 'Select a valid inquiry type.'], 422);
    }

    $data = load_contact_submissions($tenant);
    $entry = normalize_contact_submission([
        'id' => 'inq-' . gmdate('YmdHis') . '-' . bin2hex(random_bytes(3)),
        'submittedAt' => gmdate('c'),
        'updatedAt' => gmdate('c'),
        'fullName' => $fullName,
        'email' => $email,
        'inquiryType' => $inquiryType,
        'message' => $message,
        'page' => $page,
        'status' => 'New',
    ]);
    $entry['notificationSent'] = send_contact_notification($tenant, $entry);

    $entries = array_values($data['entries'] ?? []);
    array_unshift($entries, $entry);
    $data['tenant'] = $tenant;
    $data['updatedAt'] = gmdate('c');
    $data['entries'] = array_slice($entries, 0, 500);
    write_json_file(inquiry_file($tenant), $data);

    respond([
        'ok' => true,
        'received' => true,
        'notificationSent' => $entry['notificationSent'],
        'message' => 'Inquiry received. The festival team can review it in Contact Submissions.',
    ], 201);
}

respond(['ok' => false, 'error' => 'Unknown API action or unsupported method.'], 404);
