<?php

declare(strict_types=1);

const ROOT_DIR = __DIR__ . '/../..';
const DIYANDI_DIR = ROOT_DIR . '/diyandi';
const PORTALS_FILE = ROOT_DIR . '/cms/data/portals.json';
const CONTENT_FILE = ROOT_DIR . '/cms/data/content/diyandi-festival.json';
const TENANT_ID = 'diyandi-festival';

function read_json(string $path, array $fallback): array
{
    if (!is_file($path)) {
        return $fallback;
    }

    $contents = file_get_contents($path);
    if ($contents === false) {
        return $fallback;
    }

    $decoded = json_decode($contents, true);
    return is_array($decoded) ? $decoded : $fallback;
}

function write_json(string $path, array $payload): void
{
    $directory = dirname($path);
    if (!is_dir($directory)) {
        mkdir($directory, 0775, true);
    }

    file_put_contents(
        $path,
        json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL
    );
}

function slugify(string $value): string
{
    $slug = strtolower(trim($value));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
    return trim($slug, '-') ?: 'content';
}

function normalize_space(string $value): string
{
    $value = html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $value = preg_replace('/\s+/u', ' ', trim($value)) ?? '';
    return trim($value);
}

function page_path_for_file(string $file): string
{
    $relative = str_replace('\\', '/', substr($file, strlen(DIYANDI_DIR)));
    $relative = ltrim($relative, '/');
    if ($relative === 'index.html') {
        return '/';
    }

    if (!str_ends_with($relative, '/index.html')) {
        return '/';
    }

    $directory = substr($relative, 0, -strlen('/index.html'));
    return '/' . trim($directory, '/');
}

function content_type_for_page(string $page): string
{
    return $page !== '/events' && str_starts_with($page, '/events/')
        ? 'Event'
        : 'Page section';
}

function inner_html(DOMElement $element): string
{
    $html = '';
    foreach ($element->childNodes as $child) {
        $html .= $element->ownerDocument->saveHTML($child);
    }
    return trim($html);
}

function first_non_empty(string ...$values): string
{
    foreach ($values as $value) {
        if (trim($value) !== '') {
            return $value;
        }
    }
    return '';
}

function bootstrap_records(): array
{
    $records = [];
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(DIYANDI_DIR, FilesystemIterator::SKIP_DOTS)
    );

    foreach ($iterator as $fileInfo) {
        if (!$fileInfo->isFile() || strtolower($fileInfo->getFilename()) !== 'index.html') {
            continue;
        }

        $path = str_replace('\\', '/', $fileInfo->getPathname());
        if (str_contains($path, '/assets/') || str_contains($path, '/generated-images/') || str_contains($path, '/.vite/')) {
            continue;
        }

        $html = file_get_contents($path);
        if ($html === false) {
            continue;
        }

        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML($html, LIBXML_NOWARNING | LIBXML_NOERROR);
        libxml_clear_errors();

        $xpath = new DOMXPath($dom);
        $page = page_path_for_file($path);
        $type = content_type_for_page($page);

        foreach ($xpath->query('//*[@data-tukod-record]') as $node) {
            if (!$node instanceof DOMElement) {
                continue;
            }

            $key = trim($node->getAttribute('data-tukod-record'));
            if ($key === '') {
                continue;
            }

            if (!isset($records[$key])) {
                $records[$key] = [
                    'id' => $key,
                    'slug' => slugify($key),
                    'page' => $page,
                    'type' => $type,
                    'template' => $type === 'Event' ? 'event' : 'section',
                    'status' => 'published',
                    'updated' => 'Bootstrap import',
                    'updatedAt' => gmdate('c'),
                    'author' => 'bootstrap-import',
                    'title' => ucwords(str_replace(['-', '_'], ' ', $key)),
                    'excerpt' => '',
                    'body' => '',
                    'language' => 'English',
                    'pushFacebook' => false,
                    'fields' => [
                        'eyebrow' => '',
                        'heading' => '',
                        'summary' => '',
                        'body' => '',
                        'ctaLabel' => '',
                        'ctaUrl' => '',
                        'image' => '',
                        'imageAlt' => '',
                    ],
                    'createdAt' => gmdate('c'),
                ];
            }

            $record = &$records[$key];
            if ($record['page'] === '/' && $page !== '/') {
                $record['page'] = $page;
            }
            if ($type === 'Event') {
                $record['type'] = 'Event';
                $record['template'] = 'event';
                $record['page'] = $page;
            }

            $textField = trim($node->getAttribute('data-tukod-text-field'));
            $htmlField = trim($node->getAttribute('data-tukod-html-field'));
            $richField = trim($node->getAttribute('data-tukod-rich-field'));
            $labelField = trim($node->getAttribute('data-tukod-label-field'));
            $wordmarkField = trim($node->getAttribute('data-tukod-wordmark-field'));
            $hrefField = trim($node->getAttribute('data-tukod-href-field'));

            if ($textField !== '') {
                $record['fields'][$textField] = first_non_empty(
                    $record['fields'][$textField],
                    normalize_space($node->textContent)
                );
            }

            if ($htmlField !== '') {
                $record['fields'][$htmlField] = first_non_empty(
                    $record['fields'][$htmlField],
                    trim(inner_html($node))
                );
            }

            if ($richField !== '') {
                $record['fields'][$richField] = first_non_empty(
                    $record['fields'][$richField],
                    trim(inner_html($node))
                );
            }

            if ($labelField !== '') {
                $label = normalize_space($node->textContent);
                $label = trim(str_replace(['↗', '→'], '', $label));
                $record['fields'][$labelField] = first_non_empty($record['fields'][$labelField], $label);
            }

            if ($wordmarkField !== '') {
                $heading = normalize_space($node->getAttribute('aria-label'));
                if ($heading === '') {
                    $heading = normalize_space($node->textContent);
                }
                $record['fields'][$wordmarkField] = first_non_empty($record['fields'][$wordmarkField], $heading);
            }

            if ($hrefField !== '') {
                $href = trim($node->getAttribute('href'));
                $record['fields'][$hrefField] = first_non_empty($record['fields'][$hrefField], $href);
            }

            $record['title'] = first_non_empty($record['fields']['heading'], $record['title']);
            $record['excerpt'] = $record['fields']['summary'];
            $record['body'] = $record['fields']['body'];
        }
    }

    ksort($records);
    return array_values($records);
}

function upsert_portal(int $contentCount): void
{
    $data = read_json(PORTALS_FILE, ['portals' => []]);
    $portals = is_array($data['portals'] ?? null) ? $data['portals'] : [];
    $portal = [
        'id' => TENANT_ID,
        'name' => 'Diyandi Festival',
        'domain' => 'http://diyandi.local/',
        'previewUrl' => 'http://diyandi.local/',
        'short' => 'DF',
        'kind' => 'government',
        'status' => 'live',
        'color' => '#176b68',
        'users' => 1,
        'content' => $contentCount,
        'uptime' => 'Local preview',
        'articles' => $contentCount,
        'integrated' => true,
    ];

    $updated = false;
    foreach ($portals as $index => $existing) {
        if (($existing['id'] ?? '') === TENANT_ID) {
            $portals[$index] = array_merge($existing, $portal);
            $updated = true;
            break;
        }
    }

    if (!$updated) {
        $portals[] = $portal;
    }

    write_json(PORTALS_FILE, ['portals' => array_values($portals)]);
}

$records = bootstrap_records();
write_json(CONTENT_FILE, [
    'tenant' => TENANT_ID,
    'updatedAt' => gmdate('c'),
    'records' => $records,
]);
upsert_portal(count($records));

echo 'Bootstrapped ' . count($records) . ' Diyandi records into the CMS store.' . PHP_EOL;
