import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaxFuelRX from './MaxFuelRX'
import Maxfuel from './Maxfuel'
import HeroVideo from "./assets/lines.mp4";
import Cheetah from "./assets/cheetah0.jpg";
import ContactUs from './Contactus'
gsap.registerPlugin(ScrollTrigger);

// ─── Constants (mirrored from homepage) ───────────────────────────────────────
const COLORS = {
  black: "#000",
  white: "#fff",
  grey100: "#f7f5f1",
  grey600: "#383838",
  f1GreenDark: "#204338",
  f1LimeGreen: "#c6fd3a",
  f1LimeGreenDark: "#97cb11",
  introBg: "#0c1311",
  introBgTop: "#22473c",
  navSubtitle: "#95cf02",
};

const FONTS = {
  flare: `"ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif`,
  agrandir: `"AGRANDIR", "Helvetica Neue", Arial, sans-serif`,
  caslon: `"CASLON_DORIC", Arial, Helvetica, sans-serif`,
};

const easeSnappy = "cubic-bezier(0.87, 0, 0.13, 1)";
const easeSmooth = "cubic-bezier(0.45, 0.02, 0.09, 0.98)";
const f1Shadow = "0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%)";

const NAV_LINKS = [
  { label: "RX", sub: "Story & Experiences", href: "/" },
  { label: "Maxfuel", sub: "Expressions", href: "/maxfuel" },
  { label: "Contact Us", sub: "Sign Up", href: "/contact-us" },
];

const STATS = [
  { value: "6", label: "Pronged Formula", sub: "Unique approach to fuel optimization" },
  { value: "30+", label: "Years of Research", sub: "Decades of fuel science expertise" },
  { value: "98%", label: "Engine Protection", sub: "Proven acid neutralization rate" },
  { value: "40%", label: "Emission Reduction", sub: "Average exhaust improvement" },
];

const VALUES = [
  {
    number: "01",
    title: "Precision Engineering",
    body: "Every molecule in MaxFuel RX is engineered with purpose. Our formulation process combines decades of fuel chemistry research with cutting-edge laboratory testing to deliver consistent, measurable results.",
  },
  {
    number: "02",
    title: "Sustainable Performance",
    body: "We believe peak performance and environmental responsibility are not mutually exclusive. MaxFuel RX reduces harmful emissions while maximising engine output — a dual commitment to progress.",
  },
  {
    number: "03",
    title: "Long-Term Protection",
    body: "Short-term gains are not our measure of success. Our 6-pronged approach actively works to extend engine lifespan, reduce maintenance intervals, and protect your investment over the long haul.",
  },
  {
    number: "04",
    title: "Transparent Science",
    body: "We stand behind our chemistry. Every claim is backed by independent laboratory data, third-party testing, and real-world validation across commercial fleet and high-performance applications.",
  },
];

const TEAM = [
  { name: "Malvin Chiwanga", role: "Chief Formulation Scientist", tenure: "Founder" },
  { name: "Martin Singh", role: "Head of R&D", tenure: "12 Years" },
  { name: "Nathan Hill", role: "Director of Engineering", tenure: "9 Years" },
  { name: "Amir Mirza", role: "Environmental Compliance", tenure: "7 Years" },
];

const TIMELINE_EVENTS = [
  { year: "2018", title: "Founded", desc: "Matrix Petroleum established in Johannesburg with a singular focus on diesel fuel chemistry." },
  { year: "2023", title: "First Formula", desc: "Launch of our proprietary acid-neutralizing compound, the cornerstone of what would become MaxFuel RX." },
  { year: "2022", title: "Global Expansion", desc: "Operations extended to the United Kingdom and European markets, serving major commercial fleets." },
  { year: "2023", title: "MaxFuel RX", desc: "The 6-pronged formula officially commercialised and launched to the public after 8 years of refinement." },
  { year: "2025", title: "South Africa Launch", desc: "MaxFuel RX unveiled at a landmark event in South Africa, marking a new chapter in fuel innovation." },
];

// ─── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  :root {
    --font-flare:        "ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif;
    --font-agrandir:     "AGRANDIR", "Helvetica Neue", Arial, sans-serif;
    --font-caslon-doric: "CASLON_DORIC", Arial, sans-serif;
    --color-black:            #000;
    --color-white:            #fff;
    --color-grey-100:         #f7f5f1;
    --color-grey-600:         #383838;
    --color-f1-green-dark:    #204338;
    --color-f1-lime-green:    #c6fd3a;
    --color-f1-lime-green-darker: #97cb11;
    --easing-snappy:   cubic-bezier(0.87, 0, 0.13, 1);
    --easing-smooth:   cubic-bezier(0.45, 0.02, 0.09, 0.98);
    --f1-shadow:       0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%);
    --page-margin: 1.5rem;
    --nav-height: 4rem;
    --z-nav: 6;
    --z-footer: 3;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }

  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-0.35rem); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(2rem); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .am-scroll-arrow { animation: bounce 2s infinite; }
  .am-scroll-arrow:hover { animation-play-state: paused; }

  .am-btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 2.125rem; padding: 0.75rem 2rem 0.69rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.065rem;
    cursor: pointer; border: none; border-radius: 0.1875rem;
    transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
  }
  .am-btn-dark  { color: #fff; background: #000; }
  .am-btn-dark:hover  { background: rgba(0,0,0,0.6); }
  .am-btn-dark:active { transform: scale(0.97); }
  .am-btn-light { color: #fff; background: rgba(255,255,255,0.2); }
  .am-btn-light:hover  { background: rgba(255,255,255,0.5); }
  .am-btn-light:active { transform: scale(0.97); }
  .am-btn-green { color: #000; background: #c6fd3a; }
  .am-btn-green:hover  { background: #97cb11; }

  .am-tag {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.38rem 1rem 0.31rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0313rem;
    border-radius: 0.1875rem;
  }
  .am-tag-green { color: var(--color-f1-lime-green); border: 1px solid var(--color-f1-lime-green); }

  .am-footer-link { opacity: 1; transition: opacity 0.15s var(--easing-smooth); }
  .am-footer-link:hover { opacity: 0.6; }
  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  .reveal-up {
    opacity: 0;
    transform: translateY(2.5rem);
    will-change: opacity, transform;
  }

  .stat-card:hover .stat-value {
    color: var(--color-f1-lime-green) !important;
    transition: color 0.3s ease;
  }

  .value-card {
    border-top: 1px solid rgba(32,67,56,0.2);
    transition: border-color 0.3s ease;
  }
  .value-card:hover {
    border-top-color: var(--color-f1-lime-green-darker);
  }

  .timeline-dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: var(--color-f1-green-dark);
    border: 2px solid var(--color-f1-lime-green);
    flex-shrink: 0;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .timeline-item:hover .timeline-dot {
    background: var(--color-f1-lime-green);
    transform: scale(1.4);
  }

  .team-card {
    border-bottom: 1px solid rgba(255,255,255,0.12);
    transition: border-color 0.3s ease;
  }
  .team-card:hover {
    border-bottom-color: var(--color-f1-lime-green);
  }

  @media only screen and (max-width: 767px) {
    .am-hide-mobile  { display: none !important; }
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .two-col-grid { grid-template-columns: 1fr !important; }
  }
  @media only screen and (min-width: 768px) {
    .am-hide-desktop { display: none !important; }
  }
`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block" }}>
    <path d="M8 2v12M2 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHamburger = ({ open }) => (
  <svg width="30" height="14" viewBox="0 0 26 16" zIndex="1004" fill="none">
    {open ? (
      <>
        <line x1="1" y1="1" x2="25" y2="15" stroke="black" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="1" y1="15" x2="25" y2="1" stroke="black" strokeWidth="4.5" strokeLinecap="round" />
      </>
    ) : (
      <>
        <line x1="1" y1="2" x2="25" y2="2" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="12" x2="25" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll-triggered reveal animations
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-up");
    const triggers = [];
    els.forEach((el) => {
      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        once: true,
      });
      triggers.push(t);
    });

    // Hero text stagger on load
    gsap.fromTo(
      ".hero-text-item",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1.1, ease: "power3.out", delay: 0.3 }
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const bgGradient = `linear-gradient(0deg, ${COLORS.introBg}, ${COLORS.introBgTop})`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      <div style={{
        fontFamily: FONTS.caslon,
        background: COLORS.white,
        color: COLORS.black,
        overflowX: "hidden",
        maxWidth: "100vw",
        WebkitFontSmoothing: "antialiased",
      }}>

        {/* ── OVERLAY NAV ── */}
        <nav
          style={{
            position: "fixed",
            top: "0.75rem",
            left: 0,
            right: 0,
            zIndex: 10003,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "4.25rem",
              height: "1.5442rem",
              borderRadius: "0.1875rem",
              boxShadow: f1Shadow,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                background: COLORS.white,
                border: "none",
                borderRadius: "0.1875rem",
                cursor: "pointer",
                transition: `scale 0.3s ${easeSmooth}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.scale = "1.05")}
              onMouseLeave={(e) => (e.currentTarget.style.scale = "1")}
            >
              <IconHamburger open={menuOpen} />
            </button>
          </div>
        </nav>

        {/* Overlay nav panel */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1002,
            padding: "0.5rem",
            pointerEvents: menuOpen ? "auto" : "none",
            visibility: menuOpen ? "visible" : "hidden",
            transition: `visibility 0s ${menuOpen ? "0s" : "0.35s"}`,
          }}
        >
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: COLORS.black,
              opacity: menuOpen ? 0.35 : 0,
              transition: `opacity 0.35s ${easeSmooth}`,
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "4rem",
              margin: "0 auto",
              width: "100%",
              maxWidth: "23.5rem",
              padding: "8.25rem 1.5rem 7.75rem",
              overflowY: "auto",
              background: COLORS.white,
              borderRadius: "0.1875rem",
              transform: menuOpen ? "translateY(0)" : "translateY(-1rem)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.35s ${easeSnappy}, opacity 0.3s ${easeSmooth}`,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "100%",
                  maxWidth: "25ch",
                  margin: "0 auto",
                }}
              >
                <a
                  href={link.href}
                  className="am-nav-item-link"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                   
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      lineHeight: "140%",
                      color: COLORS.black,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "100%",
                      color: COLORS.navSubtitle,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.0312rem",
                    }}
                  >
                    {link.sub}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>


        {/* ── HERO ── */}
        <section style={{
          position: "relative", width: "100%", height: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", overflow: "hidden",
        }}>
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(12, 19, 17, 0.5)",
            zIndex: 0,
          }} />

          {/* Animated grid overlay */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.06,
            backgroundImage: `linear-gradient(${COLORS.f1LimeGreen} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.f1LimeGreen} 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
            pointerEvents: "none",
            zIndex: 0,
          }} />

          {/* Glowing orb */}
          <div style={{
            position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: "40vw", height: "40vw", maxWidth: "600px", maxHeight: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(198,253,58,0.12) 0%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 0,
          }} />

         <div style={{ position: "relative", zIndex: 100, textAlign: "center", padding: "0 1.5rem" }}>
            <div className="hero-text-item" style={{ opacity: 0 }}>
              <span className="am-tag am-tag-green" style={{ marginBottom: "2rem", display: "inline-flex" }}>
                Matrix Petroleum
              </span>
            </div>
            <h1 className="hero-text-item" style={{
              opacity: 0, margin: "1rem 0 0",
              fontFamily: FONTS.flare,
              fontSize: "clamp(3.5rem, 11vw, 9rem)",
              fontWeight: 400, lineHeight: "88%",
              color: COLORS.white,
              textTransform: "uppercase",
              letterSpacing: "-0.1rem",
            }}>
              Our
              <br />
              <span style={{ color: COLORS.f1LimeGreen }}>Story</span>
            </h1>
            <p className="hero-text-item" style={{
              opacity: 0,
              fontFamily: FONTS.agrandir,
              fontSize: "0.75rem",
              lineHeight: "170%",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.06rem",
              maxWidth: "36ch",
              margin: "2rem auto 0",
            }}>
              Three decades of fuel science. One uncompromising mission.
            </p>
            <div className="hero-text-item" style={{ opacity: 0, marginTop: "3rem" }}>
              <button
                className="am-scroll-arrow"
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "2rem", color: COLORS.f1LimeGreen }}
                aria-label="Scroll down"
              >
                <IconArrowDown />
              </button>
            </div>
          </div>
        </section>

        {/* ── MISSION STATEMENT ── */}
        <section style={{ padding: "10rem var(--page-margin)", textAlign: "center" }}>
          <div className="reveal-up" style={{ maxWidth: "55rem", margin: "0 auto" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem", fontWeight: 400,
              letterSpacing: "0.065rem", textTransform: "uppercase",
              color: COLORS.f1LimeGreenDark, marginBottom: "1.5rem",
            }}>
              Our Mission
            </p>
            <p style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 400, lineHeight: "130%",
              color: COLORS.f1GreenDark,
              textTransform: "uppercase",
              letterSpacing: "-0.03rem",
              margin: 0,
            }}>
              To engineer fuel solutions that protect engines, reduce emissions, and redefine what is possible in diesel performance — today and for decades to come.
            </p>
          </div>
        </section>

        {/* ── STATS GRID ── */}
        <section style={{
          background: COLORS.f1GreenDark,
          padding: "8rem 1.5rem",
          overflow: "hidden",
        }}>
          <div className="reveal-up" style={{ marginBottom: "4rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.065rem",
              color: COLORS.f1LimeGreenDark, margin: 0,
            }}>
              By the Numbers
            </p>
          </div>
          <div className="stats-grid reveal-up" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}>
            {STATS.map((stat, i) => (
              <div key={i} className="stat-card" style={{
                padding: "3rem 2rem",
                borderLeft: i > 0 ? `1px solid rgba(198,253,58,0.15)` : "none",
              }}>
                <div className="stat-value" style={{
                  fontFamily: FONTS.flare,
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  fontWeight: 400, lineHeight: "100%",
                  color: COLORS.white,
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: FONTS.flare, fontSize: "0.75rem",
                  color: COLORS.f1LimeGreenDark, textTransform: "uppercase",
                  letterSpacing: "0.05rem", marginTop: "0.75rem", lineHeight: "130%",
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                  color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
                  letterSpacing: "0.04rem", marginTop: "0.5rem", lineHeight: "150%",
                }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ORIGIN STORY ── */}
        <section style={{ padding: "13rem 1.5rem" }}>
          <div className="two-col-grid reveal-up" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
            maxWidth: "100%",
          }}>
            <div>
              <span className="am-tag am-tag-green" style={{ marginBottom: "2rem", display: "inline-flex" }}>
                Founded 2018
              </span>
              <h2 style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 400, lineHeight: "100%",
                color: COLORS.f1GreenDark,
                textTransform: "uppercase",
                letterSpacing: "-0.05rem",
                margin: "0 0 2.5rem",
              }}>
                Born from a need the industry refused to acknowledge
              </h2>
              <p style={{
                fontFamily: FONTS.flare, fontSize: "1.75rem",
                lineHeight: "165%", color: COLORS.grey600, maxWidth: "42ch",
              }}>
                In 2018, Malvin Chiwanga observed a persistent, industry-wide problem: diesel engines were failing prematurely, not from mechanical failure, but from the cumulative effects of acid buildup, microbial contamination, and inadequate lubrication within the fuel system itself.
              </p>
              <p style={{
                fontFamily: FONTS.flare, fontSize: "1.24rem",
                lineHeight: "165%", color: COLORS.grey600, maxWidth: "42ch",
                marginTop: "1.25rem",
              }}>
                Standard diesel additives addressed symptoms. Malvin Chiwanga set out to solve the root causes — all six of them — simultaneously. Twenty-five years of iteration later, MaxFuel RX was born.
              </p>
              <div style={{ marginTop: "2.5rem" }}>
                <button className="am-btn am-btn-dark">Our Science</button>
              </div>
            </div>

            {/* Visual block */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "relative",
                aspectRatio: "4/5",
                background: `linear-gradient(135deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                borderRadius: "0.1875rem",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* decorative geometry */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `radial-gradient(circle at 30% 70%, rgba(198,253,58,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(32,67,56,0.8) 0%, transparent 60%)`,
                }} />
                <div style={{
                  position: "relative", zIndex: 1, textAlign: "center", padding: "2rem",
                }}>
                  <div style={{
                    fontFamily: FONTS.flare, fontSize: "clamp(4rem, 10vw, 8rem)",
                    fontWeight: 400, color: "rgba(198,253,58,0.15)",
                    textTransform: "uppercase", letterSpacing: "-0.2rem",
                    lineHeight: "100%", userSelect: "none",
                  }}>
                    2018
                  </div>
                  <div style={{
                    fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                    color: COLORS.f1LimeGreen, textTransform: "uppercase",
                    letterSpacing: "0.065rem", marginTop: "1rem",
                  }}>
                    Johannesburg, South Africa
                  </div>
                </div>
              </div>
              {/* floating accent card */}
              <div style={{
                position: "absolute", bottom: "-2rem", left: "-2rem",
                background: COLORS.f1LimeGreen, padding: "1.5rem",
                borderRadius: "0.1875rem", maxWidth: "14rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              }}>
                <div style={{
                  fontFamily: FONTS.flare, fontSize: "1.25rem",
                  color: COLORS.f1GreenDark, textTransform: "uppercase",
                  lineHeight: "120%",
                }}>
                  30+ Years
                </div>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "0.5rem",
                  color: COLORS.f1GreenDark, textTransform: "uppercase",
                  letterSpacing: "0.055rem", marginTop: "0.35rem", opacity: 0.7,
                }}>
                  of unbroken research
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{
          background: COLORS.grey100,
          padding: "10rem 1.5rem",
        }}>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.065rem",
              color: COLORS.f1LimeGreenDark, marginBottom: "0.75rem",
            }}>
              Our History
            </p>
            <h2 style={{
              fontFamily: FONTS.flare, fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, lineHeight: "100%",
              color: COLORS.f1GreenDark, textTransform: "uppercase",
              letterSpacing: "-0.04rem", margin: 0,
            }}>
              Milestones
            </h2>
          </div>
          <div style={{ position: "relative", maxWidth: "48rem" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", top: 0, left: "calc(5rem + 0.25rem)",
              width: "1px", height: "100%",
              background: `linear-gradient(to bottom, ${COLORS.f1GreenDark}30, ${COLORS.f1GreenDark}30)`,
              pointerEvents: "none",
            }} />
            {TIMELINE_EVENTS.map((event, i) => (
              <div key={i} className="timeline-item reveal-up" style={{
                display: "flex", gap: "2rem", alignItems: "flex-start",
                paddingBottom: i < TIMELINE_EVENTS.length - 1 ? "3.5rem" : 0,
              }}>
                <div style={{
                  width: "5rem", flexShrink: 0, textAlign: "right",
                  paddingTop: "0.1rem",
                }}>
                  <span style={{
                    fontFamily: FONTS.flare, fontSize: "0.75rem",
                    color: COLORS.f1GreenDark, textTransform: "uppercase",
                    letterSpacing: "0.03rem", opacity: 0.5,
                  }}>
                    {event.year}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flex: 1 }}>
                  <div style={{ paddingTop: "0.25rem" }}>
                    <div className="timeline-dot" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: FONTS.flare, fontSize: "0.875rem",
                      color: COLORS.f1GreenDark, textTransform: "uppercase",
                      letterSpacing: "0.02rem", lineHeight: "140%",
                      marginBottom: "0.4rem",
                    }}>
                      {event.title}
                    </div>
                    <div style={{
                      fontFamily: FONTS.agrandir, fontSize: "1.625rem",
                      color: COLORS.grey600, lineHeight: "160%",
                      letterSpacing: "0.02rem",
                    }}>
                      {event.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VALUES ── */}
        <section style={{ padding: "13rem 1.5rem" }}>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.065rem",
              color: COLORS.f1LimeGreenDark, marginBottom: "0.75rem",
            }}>
              What We Stand For
            </p>
            <h2 style={{
              fontFamily: FONTS.flare, fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, lineHeight: "100%",
              color: COLORS.f1GreenDark, textTransform: "uppercase",
              letterSpacing: "-0.04rem", margin: 0,
            }}>
              Our Values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 4rem" }}>
            {VALUES.map((v, i) => (
              <div key={i} className="value-card reveal-up" style={{
                padding: "2.5rem 0",
              }}>
                <div style={{
                  fontFamily: FONTS.flare, fontSize: "12px",
                  color: COLORS.f1LimeGreenDark, textTransform: "uppercase",
                  letterSpacing: "0.05rem", marginBottom: "1rem",
                }}>
                  {v.number}
                </div>
                <h3 style={{
                  fontFamily: FONTS.flare, fontSize: "1rem",
                  fontWeight: 400, lineHeight: "140%",
                  color: COLORS.f1GreenDark, textTransform: "uppercase",
                  letterSpacing: "0.01rem", margin: "0 0 1rem",
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontFamily: FONTS.agrandir, fontSize: "1.625rem",
                  lineHeight: "175%", color: COLORS.grey600,
                  letterSpacing: "0.02rem", margin: 0,
                }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{
          background: COLORS.f1GreenDark,
          padding: "10rem 1.5rem",
          overflow: "hidden",
        }}>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.065rem",
              color: COLORS.f1LimeGreenDark, marginBottom: "0.75rem",
            }}>
              The People Behind the Formula
            </p>
            <h2 style={{
              fontFamily: FONTS.flare, fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, lineHeight: "100%",
              color: COLORS.white, textTransform: "uppercase",
              letterSpacing: "-0.04rem", margin: 0,
            }}>
              Leadership
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
            {TEAM.map((member, i) => (
              <div key={i} className="team-card reveal-up" style={{
                padding: "2.5rem 1.5rem 2.5rem 0",
                borderTop: "1px solid rgba(198,253,58,0.15)",
              }}>
                <div style={{
                  width: "3rem", height: "3rem", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS.introBgTop}, ${COLORS.f1LimeGreen}30)`,
                  border: `1px solid rgba(198,253,58,0.3)`,
                  marginBottom: "1.5rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: FONTS.flare, fontSize: "0.875rem",
                    color: COLORS.f1LimeGreen,
                  }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div style={{
                  fontFamily: FONTS.flare, fontSize: "0.875rem",
                  color: COLORS.white, textTransform: "uppercase",
                  lineHeight: "140%", marginBottom: "0.35rem",
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "0.5625rem",
                  color: COLORS.f1LimeGreenDark, textTransform: "uppercase",
                  letterSpacing: "0.04rem", lineHeight: "130%",
                  marginBottom: "1rem",
                }}>
                  {member.role}
                </div>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "0.5rem",
                  color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
                  letterSpacing: "0.04rem",
                }}>
                  {member.tenure}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{
          position: "relative",
          padding: "12rem 1.5rem",
          textAlign: "center",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 50% 50%, rgba(198,253,58,0.06) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <div className="reveal-up" style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 400, lineHeight: "90%",
              color: COLORS.f1GreenDark, textTransform: "uppercase",
              letterSpacing: "-0.1rem", margin: "0 0 1.5rem",
            }}>
              Ready to
              <br />
              <span style={{ color: COLORS.f1LimeGreenDark }}>Experience It</span>
            </h2>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.05rem",
              color: COLORS.grey600, maxWidth: "40ch", margin: "0 auto 2.5rem",
              lineHeight: "170%",
            }}>
              Join thousands of engineers and fleet operators who have made MaxFuel RX the cornerstone of their fuel management strategy.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="am-btn am-btn-dark">Discover MaxFuel RX</button>
              <button className="am-btn am-btn-green" style={{ color: COLORS.black }}>Contact Us</button>
            </div>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div style={{ padding: "2rem 1.5rem", textAlign: "center", background: COLORS.grey100 }}>
          <p style={{
            fontFamily: FONTS.agrandir, fontSize: "0.625rem",
            fontWeight: 400, lineHeight: "140%",
            letterSpacing: "0.065rem", textTransform: "uppercase",
            color: COLORS.grey600, opacity: 0.8, margin: 0,
          }}>
            Passively Cleaning Exhaust-Related Components
          </p>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{
          position: "relative", zIndex: "var(--z-footer)",
          display: "grid", padding: "9.62rem 1.5rem 1.5rem",
          marginTop: 0, color: COLORS.white,
          backgroundImage: `linear-gradient(rgba(32, 67, 56, 0.8), rgba(32, 67, 56, 0.8)), url('${Cheetah}')`,
        }}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "8rem 0 9.32rem" }} />
          <div style={{ marginTop: "8rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              fontWeight: 400, lineHeight: "170%",
              letterSpacing: "0.045rem", opacity: 0.8, color: COLORS.white, marginBottom: "1.38rem",
            }}>
              © {new Date().getFullYear()} Matrix Petroleum. All rights reserved.
            </p>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map((item) => (
                  <a key={item} href="#" className="am-footer-link" style={{
                    fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                    fontWeight: 400, lineHeight: "140%",
                    textTransform: "uppercase", letterSpacing: "0.05rem",
                    color: "rgba(255,255,255,0.6)", textDecoration: "none",
                  }}>
                    {item}
                  </a>
                ))}
              </div>
              <div style={{
                fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                letterSpacing: "0.05rem", textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}>
                EN-GB
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}