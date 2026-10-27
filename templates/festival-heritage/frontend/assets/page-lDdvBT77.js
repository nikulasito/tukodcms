import { r as e } from "./rolldown-runtime-S-ySWqyJ.js";
import { i as t, r as n } from "./framework-DjPHiq1u.js";
import r from "./link-DYNzsh_b.js";
import { a as i, i as a, o, r as s, t as c } from "./SiteHeader-CctrR2OR.js";
const tukodBasePath = new URL(".", import.meta.url).pathname
  .replace(/\/assets\/$/, "")
  .replace(/\/+$/, "");
const tukodHref = (e) => {
  const t = e.startsWith("/") ? e : `/${e}`;
  return tukodBasePath
    ? t === "/"
      ? `${tukodBasePath}/`
      : `${tukodBasePath}${t}`
    : t;
};
var l = e(t(), 1),
  u = n();
function d({ events: e, variant: t = `default` }) {
  return (0, u.jsx)(`div`, {
    className: `agenda-list ${t === `featured` ? `agenda-list-featured` : ``}`,
    children: e.map((e, t) =>
      (0, u.jsxs)(
        r,
        {
          className: `agenda-item`,
          href: tukodHref(`/events/${e.slug}/`),
          children: [
            (0, u.jsxs)(`div`, {
              className: `agenda-date`,
              children: [
                (0, u.jsx)(`span`, { children: e.date.split(` `)[0] }),
                (0, u.jsx)(`strong`, { children: e.date.split(` `)[1] }),
              ],
            }),
            (0, u.jsxs)(`div`, {
              className: `agenda-copy`,
              children: [
                (0, u.jsxs)(`span`, {
                  className: `agenda-kicker`,
                  children: [e.time, ` · `, e.meta],
                }),
                (0, u.jsx)(`h3`, { children: e.title }),
                (0, u.jsx)(`p`, { children: e.text }),
              ],
            }),
            (0, u.jsxs)(`figure`, {
              className: `agenda-media`,
              children: [
                (0, u.jsx)(`img`, {
                  src: e.image,
                  alt: e.imageAlt,
                  style: { objectPosition: e.imagePosition },
                }),
                (0, u.jsx)(`span`, {
                  children: String(t + 1).padStart(2, `0`),
                }),
              ],
            }),
            (0, u.jsx)(`span`, {
              className: `agenda-arrow`,
              "aria-hidden": `true`,
              children: `↗`,
            }),
          ],
        },
        e.title,
      ),
    ),
  });
}
function f() {
  return (0, u.jsxs)(`footer`, {
    className: `site-footer`,
    children: [
      (0, u.jsxs)(`div`, {
        className: `footer-marquee`,
        "aria-hidden": `true`,
        children: [
          (0, u.jsx)(`span`, { children: `FAITH` }),
          (0, u.jsx)(`i`, { children: `✦` }),
          (0, u.jsx)(`span`, { children: `CULTURE` }),
          (0, u.jsx)(`i`, { children: `✦` }),
          (0, u.jsx)(`span`, { children: `COMMUNITY` }),
          (0, u.jsx)(`i`, { children: `✦` }),
          (0, u.jsx)(`span`, { children: `ILIGAN` }),
        ],
      }),
      (0, u.jsxs)(`div`, {
        className: `footer-main`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `footer-lead`,
            children: [
              (0, u.jsx)(`p`, {
                className: `footer-eyebrow`,
                children: `Diyandi Festival 2026`,
              }),
              (0, u.jsx)(`h2`, {
                children: `Meet us where the city celebrates.`,
              }),
              (0, u.jsxs)(r, {
                href: tukodHref(`/events/`),
                children: [
                  `Build your festival route `,
                  (0, u.jsx)(`span`, { "aria-hidden": `true`, children: `↗` }),
                ],
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `footer-nav-block`,
            children: [
              (0, u.jsx)(`span`, { children: `Explore` }),
              (0, u.jsxs)(`nav`, {
                "aria-label": `Footer navigation`,
                children: [
                  i.map((e) =>
                    (0, u.jsx)(r, { href: e.href, children: e.label }, e.key),
                  ),
                  (0, u.jsx)(r, {
                    href: tukodHref(`/sponsor/`),
                    children: `Be a sponsor`,
                  }),
                  (0, u.jsx)(r, {
                    href: tukodHref(`/volunteer/`),
                    children: `Be a volunteer`,
                  }),
                ],
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `footer-contact-block`,
            children: [
              (0, u.jsx)(`span`, { children: `Festival desk` }),
              (0, u.jsx)(`a`, {
                href: `mailto:hello@diyandifestival.ph`,
                children: `hello@diyandifestival.ph`,
              }),
              (0, u.jsx)(`a`, {
                href: `tel:+63812210000`,
                children: `+63 81 221 0000`,
              }),
              (0, u.jsxs)(`p`, {
                children: [
                  `Iligan City Hall`,
                  (0, u.jsx)(`br`, {}),
                  `Pala-o, Iligan City`,
                ],
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `footer-date-block`,
            children: [
              (0, u.jsx)(`span`, { children: `Save the dates` }),
              (0, u.jsx)(`strong`, { children: `20—29` }),
              (0, u.jsxs)(`p`, {
                children: [`September`, (0, u.jsx)(`br`, {}), `2026`],
              }),
            ],
          }),
        ],
      }),
      (0, u.jsxs)(`div`, {
        className: `footer-bottom`,
        children: [
          (0, u.jsx)(`span`, { children: `© 2026 Diyandi Festival` }),
          (0, u.jsx)(`span`, { children: `Official visitor guide concept` }),
          (0, u.jsx)(`span`, { children: `Iligan City, Philippines` }),
        ],
      }),
    ],
  });
}
function p({ active: e, children: t }) {
  return (0, u.jsxs)(`div`, {
    className: `site-shell`,
    children: [
      (0, u.jsx)(`a`, {
        className: `skip-link`,
        href: `#main-content`,
        children: `Skip to content`,
      }),
      (0, u.jsx)(c, { active: e }),
      (0, u.jsx)(`main`, { id: `main-content`, children: t }),
      (0, u.jsx)(f, {}),
      (0, u.jsx)(m, {}),
    ],
  });
}
function m() {
  return (0, u.jsx)(`aside`, {
    className: `sticky-sponsor-bar`,
    "aria-label": `Festival sponsors and participation links`,
    children: (0, u.jsxs)(`div`, {
      className: `sticky-sponsor-inner`,
      children: [
        (0, u.jsxs)(`div`, {
          className: `sticky-sponsor-intro`,
          children: [
            (0, u.jsx)(`span`, { children: `Festival partners` }),
            (0, u.jsx)(`small`, {
              children: `Supporting culture, community, and a better visitor experience.`,
            }),
          ],
        }),
        (0, u.jsx)(`div`, {
          className: `sticky-sponsor-list`,
          "aria-label": `Featured festival partners`,
          children: o.map((e, t) =>
            (0, u.jsxs)(
              `span`,
              {
                children: [
                  (0, u.jsx)(`i`, { children: String(t + 1).padStart(2, `0`) }),
                  e,
                ],
              },
              e,
            ),
          ),
        }),
        (0, u.jsxs)(r, {
          className: `sticky-sponsor-link`,
          href: tukodHref(`/sponsor/`),
          children: [
            `View sponsors `,
            (0, u.jsx)(`span`, { "aria-hidden": `true`, children: `↗` }),
          ],
        }),
        (0, u.jsxs)(r, {
          className: `sticky-volunteer-link`,
          href: tukodHref(`/volunteer/`),
          children: [
            `Be a volunteer `,
            (0, u.jsx)(`span`, { "aria-hidden": `true`, children: `↗` }),
          ],
        }),
      ],
    }),
  });
}
function h() {
  return (0, u.jsxs)(`section`, {
    className: `partner-band`,
    "aria-label": `Festival partners`,
    children: [
      (0, u.jsxs)(`div`, {
        className: `partner-band-title`,
        children: [
          (0, u.jsx)(`span`, { children: `Festival partners` }),
          (0, u.jsx)(`p`, {
            children: `Organizations helping make Diyandi welcoming, useful, and accessible.`,
          }),
        ],
      }),
      (0, u.jsx)(`div`, {
        className: `partner-logos`,
        children: o.map((e, t) =>
          (0, u.jsxs)(
            `span`,
            {
              children: [
                (0, u.jsx)(`i`, { children: String(t + 1).padStart(2, `0`) }),
                e,
              ],
            },
            e,
          ),
        ),
      }),
      (0, u.jsxs)(r, {
        href: tukodHref(`/sponsor/`),
        children: [
          `Partner with Diyandi `,
          (0, u.jsx)(`span`, { "aria-hidden": `true`, children: `↗` }),
        ],
      }),
    ],
  });
}
var v = [
  {
    index: `01`,
    label: `See the schedule`,
    note: `Rituals, parades, markets & music`,
    href: tukodHref(`/events/`),
  },
  {
    index: `02`,
    label: `Plan your days`,
    note: `Food, stays, routes & side trips`,
    href: tukodHref(`/plan-your-festival-days/`),
  },
  {
    index: `03`,
    label: `Know the story`,
    note: `Faith, heritage & shared identity`,
    href: tukodHref(`/about/`),
  },
  {
    index: `04`,
    label: `Be a volunteer`,
    note: `Help welcome, guide, and support guests`,
    href: tukodHref(`/volunteer/`),
  },
];
function y() {
  return (0, u.jsxs)(p, {
    active: `home`,
    children: [
      (0, u.jsxs)(`section`, {
        className: `home-hero`,
        "aria-labelledby": `home-title`,
        children: [
            (0, u.jsxs)(`div`, {
              className: `home-hero-copy`,
              children: [
                (0, u.jsx)(`div`, {
                  "data-tukod-slot-anchor": `home-hero-copy`,
                  hidden: !0,
                }),
                (0, u.jsxs)(`div`, {
                  className: `hero-countdown`,
                  "aria-label": `Festival countdown`,
                  "data-countdown": !0,
                  "data-countdown-enabled": `true`,
                  "data-countdown-fallback": ``,
                  "data-tukod-record": `home-countdown`,
                  "data-tukod-date-field": `eventDate`,
                  children: [
                    (0, u.jsx)(`span`, {
                      className: `countdown-label`,
                      "data-tukod-record": `home-countdown`,
                      "data-tukod-text-field": `heading`,
                      children: `Until opening day`,
                    }),
                    (0, u.jsxs)(`div`, {
                      children: [
                        (0, u.jsx)(`strong`, {
                          "data-countdown-value": `days`,
                          children: `00`,
                        }),
                        (0, u.jsx)(`span`, { children: `Days` }),
                      ],
                    }),
                    (0, u.jsxs)(`div`, {
                      children: [
                        (0, u.jsx)(`strong`, {
                          "data-countdown-value": `hours`,
                          children: `00`,
                        }),
                        (0, u.jsx)(`span`, { children: `Hours` }),
                      ],
                    }),
                    (0, u.jsxs)(`div`, {
                      children: [
                        (0, u.jsx)(`strong`, {
                          "data-countdown-value": `minutes`,
                          children: `00`,
                        }),
                        (0, u.jsx)(`span`, { children: `Min` }),
                      ],
                    }),
                    (0, u.jsxs)(`div`, {
                      children: [
                        (0, u.jsx)(`strong`, {
                          "data-countdown-value": `seconds`,
                          children: `00`,
                        }),
                        (0, u.jsx)(`span`, { children: `Sec` }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          (0, u.jsx)(`div`, {
            className: `home-hero-gallery`,
            children: (0, u.jsx)(`div`, {
              "data-tukod-slot-anchor": `home-hero-gallery`,
              hidden: !0,
            }),
          }),
        ],
      }),
      (0, u.jsxs)(`section`, {
        className: `route-section`,
        "aria-label": `Quick festival navigation`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `route-heading`,
            children: [
              (0, u.jsx)(`span`, { children: `Choose your route` }),
              (0, u.jsx)(`p`, {
                children: `Start anywhere. Every path leads into the celebration.`,
              }),
            ],
          }),
          (0, u.jsx)(`div`, {
            className: `route-grid`,
            children: v.map((e) =>
              (0, u.jsxs)(
                r,
                {
                  href: e.href,
                  className: `route-card`,
                  children: [
                    (0, u.jsx)(`span`, {
                      className: `route-index`,
                      children: e.index,
                    }),
                    (0, u.jsxs)(`div`, {
                      children: [
                        (0, u.jsx)(`strong`, { children: e.label }),
                        (0, u.jsx)(`p`, { children: e.note }),
                      ],
                    }),
                    (0, u.jsx)(`i`, { "aria-hidden": `true`, children: `↗` }),
                  ],
                },
                e.index,
              ),
            ),
          }),
        ],
      }),
      (0, u.jsxs)(`section`, {
        className: `manifesto-section`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `manifesto-title`,
            children: [
              (0, u.jsx)(`p`, {
                className: `section-label`,
                children: `The spirit of Diyandi`,
              }),
              (0, u.jsxs)(`h2`, {
                children: [
                  `Not one tradition.`,
                  (0, u.jsx)(`br`, {}),
                  `A shared rhythm.`,
                ],
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `manifesto-copy`,
            children: [
              (0, u.jsx)(`p`, {
                className: `manifesto-lead`,
                children: `Diyandi is Iligan's living expression of faith and belonging—a festival shaped by Higaonon memory, Maranao artistry, Christian devotion, and the energy of a modern city.`,
              }),
              (0, u.jsxs)(`div`, {
                className: `manifesto-stats`,
                children: [
                  (0, u.jsxs)(`div`, {
                    children: [
                      (0, u.jsx)(`strong`, { children: `10` }),
                      (0, u.jsx)(`span`, { children: `festival days` }),
                    ],
                  }),
                  (0, u.jsxs)(`div`, {
                    children: [
                      (0, u.jsx)(`strong`, { children: `03` }),
                      (0, u.jsx)(`span`, { children: `cultural roots` }),
                    ],
                  }),
                  (0, u.jsxs)(`div`, {
                    children: [
                      (0, u.jsx)(`strong`, { children: `01` }),
                      (0, u.jsx)(`span`, { children: `city together` }),
                    ],
                  }),
                ],
              }),
              (0, u.jsxs)(r, {
                className: `button-outline`,
                href: tukodHref(`/about/`),
                children: [
                  `Read the Diyandi story `,
                  (0, u.jsx)(`span`, {
                    "aria-hidden": `true`,
                    children: `↗`,
                  }),
                ],
              }),
            ],
          }),
          (0, u.jsxs)(`figure`, {
            className: `manifesto-image`,
            children: [
              (0, u.jsx)(`img`, {
                src: a.ritual,
                alt: `Diyandi cultural and devotional gathering`,
              }),
              (0, u.jsx)(`figcaption`, {
                children: `Faith · Culture · Community`,
              }),
            ],
          }),
        ],
      }),
      (0, u.jsxs)(`section`, {
        className: `program-section`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `program-heading`,
            children: [
              (0, u.jsxs)(`div`, {
                children: [
                  (0, u.jsx)(`p`, {
                    className: `section-label`,
                    children: `Festival program`,
                  }),
                  (0, u.jsxs)(`h2`, {
                    children: [
                      `Mark the moments`,
                      (0, u.jsx)(`br`, {}),
                      `you cannot miss.`,
                    ],
                  }),
                ],
              }),
              (0, u.jsxs)(`div`, {
                children: [
                  (0, u.jsx)(`p`, {
                    children: `From the first morning ritual to the final night of music and light, build a route that moves with the city.`,
                  }),
                  (0, u.jsxs)(r, {
                    className: `button-text`,
                    href: tukodHref(`/events/`),
                    children: [
                      `View complete schedule `,
                      (0, u.jsx)(`span`, {
                        "aria-hidden": `true`,
                        children: `↗`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, u.jsx)(d, { events: s.slice(0, 4), variant: `featured` }),
        ],
      }),
      (0, u.jsxs)(`section`, {
        className: `city-section`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `city-collage`,
            children: [
              (0, u.jsx)(`figure`, {
                className: `city-image-large`,
                children: (0, u.jsx)(`img`, {
                  src: a.market,
                  alt: `Diyandi food and trade fair`,
                }),
              }),
              (0, u.jsx)(`figure`, {
                className: `city-image-small`,
                children: (0, u.jsx)(`img`, {
                  src: a.night,
                  alt: `Diyandi evening celebration`,
                }),
              }),
              (0, u.jsxs)(`div`, {
                className: `city-stamp`,
                "aria-hidden": `true`,
                children: [
                  (0, u.jsx)(`span`, { children: `City of` }),
                  (0, u.jsxs)(`strong`, {
                    children: [`Majestic`, (0, u.jsx)(`br`, {}), `Waterfalls`],
                  }),
                ],
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `city-copy`,
            children: [
              (0, u.jsx)(`p`, {
                className: `section-label`,
                children: `Beyond the parade`,
              }),
              (0, u.jsxs)(`h2`, {
                children: [
                  `Come for Diyandi.`,
                  (0, u.jsx)(`br`, {}),
                  `Stay for Iligan.`,
                ],
              }),
              (0, u.jsx)(`p`, {
                children: `Find local food, practical transport, comfortable stays, public markets, and waterfall side trips that make the festival visit feel complete.`,
              }),
              (0, u.jsxs)(r, {
                className: `button-solid button-light`,
                href: tukodHref(`/plan-your-festival-days/`),
                children: [
                  `Open the visitor guide `,
                  (0, u.jsx)(`span`, {
                    "aria-hidden": `true`,
                    children: `↗`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, u.jsxs)(`section`, {
        className: `volunteer-callout`,
        "aria-labelledby": `volunteer-callout-title`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `volunteer-callout-media`,
            children: [
              (0, u.jsx)(`img`, {
                src: a.dance,
                alt: `Festival volunteers supporting a lively Diyandi celebration`,
              }),
              (0, u.jsx)(`span`, { children: `Community powered` }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `volunteer-callout-copy`,
            children: [
              (0, u.jsx)(`p`, {
                className: `section-label`,
                children: `Be part of the festival`,
              }),
              (0, u.jsx)(`h2`, {
                id: `volunteer-callout-title`,
                children: `Help the city welcome everyone.`,
              }),
              (0, u.jsx)(`p`, {
                children: `Join the volunteer team as a guest guide, event marshal, cultural support aide, documentation assistant, or clean-and-green advocate.`,
              }),
              (0, u.jsxs)(`div`, {
                className: `volunteer-role-chips`,
                "aria-label": `Volunteer roles`,
                children: [
                  (0, u.jsx)(`span`, { children: `Guest assistance` }),
                  (0, u.jsx)(`span`, { children: `Event support` }),
                  (0, u.jsx)(`span`, { children: `Culture desk` }),
                  (0, u.jsx)(`span`, { children: `Clean & green` }),
                ],
              }),
              (0, u.jsxs)(r, {
                className: `button-solid`,
                href: tukodHref(`/volunteer/`),
                children: [
                  `Apply as a volunteer `,
                  (0, u.jsx)(`span`, {
                    "aria-hidden": `true`,
                    children: `↗`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, u.jsx)(h, {}),
    ],
  });
}
export { y as default };
