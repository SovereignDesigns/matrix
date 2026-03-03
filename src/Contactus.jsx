import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Maxfuel from "./Maxfuel";
import AboutUs from './Aboutus'
import HeroVideo from "./assets/innovation.mp4";
import Cheetah from "./assets/cheetah0.jpg";
import MaxFuelRX from "./MaxfuelRX";
gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  black: "#000",
  white: "#fff",
  grey100: "#f7f5f1",
  grey200: "#ebebeb",
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
  { label: "RX", sub: "Story & Experiences", href: "/maxfuelrx" },
  { label: "About Us", sub: "Expressions", href: "/about-us" },
  { label: "Maxfuel", sub: "Sign Up", href: "/maxfuel" },
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Product Information",
  "Fleet & Commercial",
  "Distribution & Trade",
  "Media & Press",
  "Technical Support",
];

const OFFICES = [
  {
    city: "Johannesburg",
    country: "South Africa",
    address: "14 Sandton Drive, Sandton, 2196",
    phone: "+27 11 000 0000",
    email: "za@matrixpetroleum.com",
    tag: "Headquarters",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "22 Cannon Street, London, EC4M 5TE",
    phone: "+44 20 0000 0000",
    email: "uk@matrixpetroleum.com",
    tag: "EMEA Office",
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "DIFC Gate Village, Building 3, Level 4",
    phone: "+971 4 000 0000",
    email: "me@matrixpetroleum.com",
    tag: "Middle East",
  },
];

const FAQS = [
  {
    q: "How do I order MaxFuel RX for a commercial fleet?",
    a: "Commercial and fleet orders are handled by our dedicated trade team. Select 'Fleet & Commercial' from the enquiry type above and a specialist will contact you within one business day.",
  },
  {
    q: "Is MaxFuel RX compatible with all diesel engines?",
    a: "MaxFuel RX is engineered for broad compatibility across diesel applications — from passenger vehicles to heavy commercial equipment. Our technical team can advise on specific applications.",
  },
  {
    q: "Where can I find MaxFuel RX in my region?",
    a: "We operate across the UK, South Africa, and the Middle East, with distribution partners in over 18 countries. Use the contact form to enquire about availability in your area.",
  },
  {
    q: "Do you offer a media or press kit?",
    a: "Yes. Select 'Media & Press' from the enquiry type dropdown and our communications team will respond with press assets and product information within 48 hours.",
  },
];

// ─── Global Styles ─────────────────────────────────────────────────────────────
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
    --z-nav: 6;
    --z-footer: 3;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }

  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-0.35rem); }
  }
  @keyframes spinPulse {
    0%   { transform: rotate(0deg) scale(1); opacity: 0.4; }
    50%  { transform: rotate(180deg) scale(1.05); opacity: 0.7; }
    100% { transform: rotate(360deg) scale(1); opacity: 0.4; }
  }
  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.85) translateY(0.5rem); }
    60%  { transform: scale(1.03) translateY(0); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
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
  .am-btn-dark:hover  { background: rgba(0,0,0,0.65); }
  .am-btn-dark:active { transform: scale(0.97); }
  .am-btn-light { color: #fff; background: rgba(255,255,255,0.2); }
  .am-btn-light:hover  { background: rgba(255,255,255,0.5); }
  .am-btn-green { color: #000 !important; background: #c6fd3a; }
  .am-btn-green:hover  { background: #97cb11; }
  .am-btn-green:active { transform: scale(0.97); }

  .am-tag {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.38rem 1rem 0.31rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0313rem;
    border-radius: 0.1875rem;
  }
  .am-tag-green { color: var(--color-f1-lime-green); border: 1px solid var(--color-f1-lime-green); }
  .am-tag-dark  { color: var(--color-f1-green-dark); border: 1px solid var(--color-f1-green-dark); }

  .am-footer-link { opacity: 1; transition: opacity 0.15s var(--easing-smooth); }
  .am-footer-link:hover { opacity: 0.6; }
  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  /* ── Form inputs ── */
  .am-input, .am-select, .am-textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(32,67,56,0.25);
    border-radius: 0;
    padding: 0.75rem 0;
    font-family: var(--font-agrandir);
    font-size: 0.625rem;
    font-weight: 400;
    letter-spacing: 0.04rem;
    text-transform: uppercase;
    color: #000;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.25s ease;
    resize: none;
  }
  .am-input::placeholder,
  .am-textarea::placeholder { color: rgba(32,67,56,0.4); }
  .am-input:focus,
  .am-select:focus,
  .am-textarea:focus { border-bottom-color: #97cb11; }
  .am-select { cursor: pointer; color: rgba(32,67,56,0.4); }
  .am-select.has-value { color: #000; }
  .am-select option { text-transform: uppercase; }

  .form-field-label {
    display: block;
    font-family: var(--font-agrandir);
    font-size: 0.5rem;
    letter-spacing: 0.065rem;
    text-transform: uppercase;
    color: rgba(32,67,56,0.5);
    margin-bottom: 0.25rem;
  }

  /* ── Reveal ── */
  .reveal-up {
    opacity: 0;
    transform: translateY(2.5rem);
    will-change: opacity, transform;
  }

  /* ── Office card hover ── */
  .office-card {
    border-top: 1px solid rgba(255,255,255,0.1);
    transition: border-top-color 0.3s ease;
  }
  .office-card:hover { border-top-color: var(--color-f1-lime-green); }

  /* ── FAQ ── */
  .faq-item {
    border-bottom: 1px solid rgba(32,67,56,0.15);
    transition: border-bottom-color 0.3s ease;
  }
  .faq-item:hover { border-bottom-color: var(--color-f1-lime-green-darker); }
  .faq-toggle {
    background: none; border: none; cursor: pointer;
    width: 100%; text-align: left; padding: 1.75rem 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .faq-icon {
    width: 1.25rem; height: 1.25rem; flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid rgba(32,67,56,0.3);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.25s ease, border-color 0.25s ease, transform 0.3s ease;
  }
  .faq-item.open .faq-icon {
    background: var(--color-f1-lime-green-darker);
    border-color: var(--color-f1-lime-green-darker);
    transform: rotate(45deg);
  }
  .faq-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s cubic-bezier(0.45,0.02,0.09,0.98);
  }
  .faq-item.open .faq-body { max-height: 12rem; }

  /* ── Success ── */
  .success-msg {
    animation: successPop 0.5s ease forwards;
  }

  /* ── Decorative orb ── */
  .hero-orb {
    animation: spinPulse 8s ease-in-out infinite;
  }

  @media only screen and (max-width: 767px) {
    .am-hide-mobile  { display: none !important; }
    .contact-grid    { grid-template-columns: 1fr !important; }
    .offices-grid    { grid-template-columns: 1fr !important; }
  }
  @media only screen and (min-width: 768px) {
    .am-hide-desktop { display: none !important; }
  }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block" }}>
    <path d="M8 2v12M2 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconHamburger = ({ open }) => (
  <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
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
const IconPlus = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#97cb11" strokeWidth="1.5" />
    <path d="M8 14l4 4 8-8" stroke="#97cb11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    company: "", enquiryType: "", message: "",
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal-up");
    const triggers = [];
    els.forEach((el) => {
      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
        once: true,
      });
      triggers.push(t);
    });

    gsap.fromTo(
      ".hero-text-item",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1.1, ease: "power3.out", delay: 0.3 }
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "enquiryType" && e.target.tagName === "SELECT") {
      e.target.classList.toggle("has-value", !!value);
    }
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1400);
  };

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

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", inset: "0 0 0 0", zIndex: "var(--z-nav)",
          display: "flex", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            position: "relative", width: "4.25rem", height: "1.5442rem",
            margin: "0.75rem", borderRadius: "0.1875rem",
            boxShadow: f1Shadow, pointerEvents: "auto", alignSelf: "flex-start",
          }}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                position: "relative", zIndex: 1, display: "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center",
                width: "100%", height: "100%", background: COLORS.white,
                border: "none", borderRadius: "0.1875rem", cursor: "pointer",
                transition: `scale 0.3s ${easeSmooth}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.scale = "1.05")}
              onMouseLeave={(e) => (e.currentTarget.style.scale = "1")}
            >
              <IconHamburger open={menuOpen} />
            </button>
          </div>
        </nav>

        {/* Overlay panel */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 12, padding: "0.5rem",
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
          transition: `visibility 0s ${menuOpen ? "0s" : "0.35s"}`,
        }}>
          <div onClick={() => setMenuOpen(false)} style={{
            position: "absolute", inset: 0, background: COLORS.black,
            opacity: menuOpen ? 0.35 : 0,
            transition: `opacity 0.35s ${easeSmooth}`,
          }} />
          <div style={{
            position: "relative", display: "flex", flexDirection: "column",
            gap: "4rem", margin: "0 auto", width: "100%", maxWidth: "23.5rem",
            padding: "8.25rem 1.5rem 7.75rem", overflowY: "auto",
            background: COLORS.white, borderRadius: "0.1875rem",
            transform: menuOpen ? "translateY(0)" : "translateY(-1rem)",
            opacity: menuOpen ? 1 : 0,
            transition: `transform 0.35s ${easeSnappy}, opacity 0.3s ${easeSmooth}`,
          }}>
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
                    pushDataLayer({
                      event: "ctaClicks",
                      ga_event: {
                        category: "Internal CTA Clicks",
                        action: link.label,
                      },
                    });
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
          background: bgGradient,
        }}>
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source src={HeroVideo} type="video/mp4" />
          </video>
          
          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0, background: bgGradient,
            opacity: 0.7, zIndex: 1, pointerEvents: "none",
          }} />
          
          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.05,
            backgroundImage: `linear-gradient(${COLORS.f1LimeGreen} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.f1LimeGreen} 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem", pointerEvents: "none", zIndex: 1,
          }} />
          {/* Decorative rings */}
          <div className="hero-orb" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw", height: "60vw", maxWidth: "700px", maxHeight: "700px",
            borderRadius: "50%",
            border: `1px solid rgba(198,253,58,0.08)`,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40vw", height: "40vw", maxWidth: "500px", maxHeight: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(198,253,58,0.09) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 1.5rem" }}>
            <div className="hero-text-item" style={{ opacity: 0 }}>
              <span className="am-tag am-tag-green" style={{ marginBottom: "2rem", display: "inline-flex" }}>
                Get in Touch
              </span>
            </div>
            <h1 className="hero-text-item" style={{
              opacity: 0, margin: "1rem 0 0",
              fontFamily: FONTS.flare,
              fontSize: "clamp(3.5rem, 11vw, 9rem)",
              fontWeight: 400, lineHeight: "88%",
              color: COLORS.white, textTransform: "uppercase",
              letterSpacing: "-0.1rem",
            }}>
              Let's
              <br />
              <span style={{ color: COLORS.f1LimeGreen }}>Talk</span>
            </h1>
            <p className="hero-text-item" style={{
              opacity: 0,
              fontFamily: FONTS.agrandir, fontSize: "0.75rem",
              lineHeight: "170%", color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase", letterSpacing: "0.06rem",
              maxWidth: "36ch", margin: "2rem auto 0",
            }}>
              Whether you're a fleet operator, distributor, or simply curious — we're here.
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

        {/* ── CONTACT FORM + SIDEBAR ── */}
        <section style={{ padding: "10rem 1.5rem" }}>
          <div className="contact-grid reveal-up" style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "6rem",
            alignItems: "start",
            maxWidth: "100%",
          }}>

            {/* Sidebar */}
            <div>
              <p style={{
                fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                textTransform: "uppercase", letterSpacing: "0.065rem",
                color: COLORS.f1LimeGreenDark, marginBottom: "0.75rem",
              }}>
                Direct Contact
              </p>
              <h2 style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 400, lineHeight: "105%",
                color: COLORS.f1GreenDark, textTransform: "uppercase",
                letterSpacing: "-0.04rem", margin: "0 0 3rem",
              }}>
                We respond within one business day
              </h2>

              {/* Contact bullets */}
              {[
                { label: "Global Enquiries", value: "hello@matrixpetroleum.com" },
                { label: "Trade & Distribution", value: "trade@matrixpetroleum.com" },
                { label: "Press & Media", value: "press@matrixpetroleum.com" },
                { label: "Head Office (ZA)", value: "+27 11 000 0000" },
              ].map((item, i) => (
                <div key={i} style={{
                  borderTop: `1px solid rgba(32,67,56,0.12)`,
                  padding: "1.25rem 0",
                }}>
                  <div style={{
                    fontFamily: FONTS.agrandir, fontSize: "1.25rem",
                    textTransform: "uppercase", letterSpacing: "0.055rem",
                    color: "rgba(32,67,56,0.45)", marginBottom: "0.3rem",
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: FONTS.flare, fontSize: "1.75rem",
                    color: COLORS.f1GreenDark, textTransform: "uppercase",
                    letterSpacing: "0.02rem",
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div style={{ marginTop: "3rem" }}>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "0.5rem",
                  textTransform: "uppercase", letterSpacing: "0.055rem",
                  color: "rgba(32,67,56,0.45)", marginBottom: "1rem",
                }}>
                  Follow Us
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {["LinkedIn", "Instagram", "X"].map((s) => (
                    <a key={s} href="#" style={{
                      fontFamily: FONTS.agrandir, fontSize: "0.5rem",
                      textTransform: "uppercase", letterSpacing: "0.05rem",
                      color: COLORS.f1GreenDark, textDecoration: "none",
                      borderBottom: `1px solid rgba(32,67,56,0.3)`,
                      paddingBottom: "0.1rem",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.f1LimeGreenDark; e.currentTarget.style.borderColor = COLORS.f1LimeGreenDark; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.f1GreenDark; e.currentTarget.style.borderColor = "rgba(32,67,56,0.3)"; }}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{
              background: COLORS.grey100,
              padding: "3.5rem",
              borderRadius: "0.1875rem",
              position: "relative",
              minHeight: "26rem",
            }}>
              {!submitted ? (
                <>
                  <p style={{
                    fontFamily: FONTS.flare, fontSize: "1rem",
                    textTransform: "uppercase", color: COLORS.f1GreenDark,
                    lineHeight: "140%", marginBottom: "3rem",
                  }}>
                    Send an Enquiry
                  </p>

                  {/* Name row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
                    <div>
                      <label className="form-field-label">First Name *</label>
                      <input
                        name="firstName" value={form.firstName}
                        onChange={handleChange} placeholder="Alister"
                        className="am-input" required
                      />
                    </div>
                    <div>
                      <label className="form-field-label">Last Name</label>
                      <input
                        name="lastName" value={form.lastName}
                        onChange={handleChange} placeholder="Osei"
                        className="am-input"
                      />
                    </div>
                  </div>

                  {/* Email + Company */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
                    <div>
                      <label className="form-field-label">Email Address *</label>
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="you@company.com"
                        className="am-input" required
                      />
                    </div>
                    <div>
                      <label className="form-field-label">Company</label>
                      <input
                        name="company" value={form.company}
                        onChange={handleChange} placeholder="Matrix Petroleum"
                        className="am-input"
                      />
                    </div>
                  </div>

                  {/* Enquiry type */}
                  <div style={{ marginBottom: "2.5rem" }}>
                    <label className="form-field-label">Enquiry Type</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="enquiryType" value={form.enquiryType}
                        onChange={handleChange}
                        className={`am-select${form.enquiryType ? " has-value" : ""}`}
                      >
                        <option value="">Select a category</option>
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {/* custom arrow */}
                      <div style={{
                        position: "absolute", right: 0, top: "50%",
                        transform: "translateY(-50%)", pointerEvents: "none",
                      }}>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke={COLORS.f1GreenDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "3rem" }}>
                    <label className="form-field-label">Message *</label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5} className="am-textarea"
                      style={{ display: "block" }}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <button
                      className={`am-btn am-btn-green`}
                      onClick={handleSubmit}
                      disabled={sending}
                      style={{
                        opacity: sending ? 0.7 : 1,
                        cursor: sending ? "wait" : "pointer",
                        minWidth: "9rem",
                      }}
                    >
                      {sending ? "Sending…" : "Send Message"}
                    </button>
                    <p style={{
                      fontFamily: FONTS.agrandir, fontSize: "0.5rem",
                      textTransform: "uppercase", letterSpacing: "0.04rem",
                      color: "rgba(32,67,56,0.4)", margin: 0,
                    }}>
                      * Required fields
                    </p>
                  </div>
                </>
              ) : (
                /* Success state */
                <div className="success-msg" style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  textAlign: "center", minHeight: "22rem", gap: "1.5rem",
                }}>
                  <IconCheck />
                  <div>
                    <h3 style={{
                      fontFamily: FONTS.flare, fontSize: "1.25rem",
                      fontWeight: 400, textTransform: "uppercase",
                      color: COLORS.f1GreenDark, letterSpacing: "-0.02rem",
                      lineHeight: "120%", margin: "0 0 0.75rem",
                    }}>
                      Message Received
                    </h3>
                    <p style={{
                      fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                      textTransform: "uppercase", letterSpacing: "0.04rem",
                      color: "rgba(32,67,56,0.55)", lineHeight: "170%", margin: 0,
                    }}>
                      Thank you, {form.firstName}. A member of our team<br />
                      will be in touch within one business day.
                    </p>
                  </div>
                  <button
                    className="am-btn am-btn-dark"
                    style={{ marginTop: "1rem" }}
                    onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", company: "", enquiryType: "", message: "" }); }}
                  >
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── OFFICES ── */}
        <section style={{ background: COLORS.f1GreenDark, padding: "10rem 1.5rem" }}>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.065rem",
              color: COLORS.f1LimeGreenDark, marginBottom: "0.75rem",
            }}>
              Where to Find Us
            </p>
            <h2 style={{
              fontFamily: FONTS.flare, fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, lineHeight: "100%",
              color: COLORS.white, textTransform: "uppercase",
              letterSpacing: "-0.04rem", margin: 0,
            }}>
              Our Offices
            </h2>
          </div>
          <div className="offices-grid reveal-up" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0",
          }}>
            {OFFICES.map((office, i) => (
              <div key={i} className="office-card" style={{
                padding: "2.5rem 2.5rem 2.5rem 0",
                borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.08)` : "none",
                paddingLeft: i > 0 ? "2.5rem" : 0,
              }}>
                <span className="am-tag am-tag-green" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
                  {office.tag}
                </span>
                <div style={{
                  fontFamily: FONTS.flare, fontSize: "1.25rem",
                  color: COLORS.white, textTransform: "uppercase",
                  letterSpacing: "-0.02rem", lineHeight: "120%",
                  marginBottom: "0.25rem",
                }}>
                  {office.city}
                </div>
                <div style={{
                  fontFamily: FONTS.agrandir, fontSize: "0.5rem",
                  color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
                  letterSpacing: "0.045rem", marginBottom: "2rem",
                }}>
                  {office.country}
                </div>
                {[office.address, office.phone, office.email].map((line, j) => (
                  <div key={j} style={{
                    fontFamily: FONTS.agrandir, fontSize: "0.5625rem",
                    color: j === 0 ? "rgba(255,255,255,0.55)" : COLORS.f1LimeGreenDark,
                    textTransform: "uppercase", letterSpacing: "0.04rem",
                    lineHeight: "160%", marginBottom: j === 0 ? "1rem" : "0.35rem",
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "10rem 1.5rem" }}>
          <div className="reveal-up" style={{ marginBottom: "5rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.065rem",
              color: COLORS.f1LimeGreenDark, marginBottom: "0.75rem",
            }}>
              Common Questions
            </p>
            <h2 style={{
              fontFamily: FONTS.flare, fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, lineHeight: "100%",
              color: COLORS.f1GreenDark, textTransform: "uppercase",
              letterSpacing: "-0.04rem", margin: 0,
            }}>
              FAQ
            </h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: "48rem" }}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="faq-toggle"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{
                    fontFamily: FONTS.flare, fontSize: "0.875rem",
                    fontWeight: 400, color: COLORS.f1GreenDark,
                    textTransform: "uppercase", letterSpacing: "0.01rem",
                    lineHeight: "140%", textAlign: "left", paddingRight: "2rem",
                  }}>
                    {faq.q}
                  </span>
                  <span className="faq-icon">
                    <IconPlus />
                  </span>
                </button>
                <div className="faq-body">
                  <p style={{
                    fontFamily: FONTS.agrandir, fontSize: "0.625rem",
                    color: COLORS.grey600, lineHeight: "175%",
                    letterSpacing: "0.02rem", margin: "0 0 1.75rem",
                    paddingRight: "3rem",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{
          position: "relative",
          background: bgGradient,
          padding: "12rem 1.5rem",
          textAlign: "center",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: `linear-gradient(${COLORS.f1LimeGreen} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.f1LimeGreen} 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem", pointerEvents: "none",
          }} />
          <div className="reveal-up" style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 400, lineHeight: "90%",
              color: COLORS.white, textTransform: "uppercase",
              letterSpacing: "-0.1rem", margin: "0 0 1.5rem",
            }}>
              Still have
              <br />
              <span style={{ color: COLORS.f1LimeGreen }}>Questions?</span>
            </h2>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              textTransform: "uppercase", letterSpacing: "0.05rem",
              color: "rgba(255,255,255,0.5)", maxWidth: "40ch", margin: "0 auto 2.5rem",
              lineHeight: "170%",
            }}>
              Our technical and commercial teams are available to discuss your specific requirements — no matter the scale.
            </p>
            <button
              className="am-btn am-btn-green"
              onClick={() => window.scrollTo({ top: document.querySelector("section:nth-of-type(2)").offsetTop, behavior: "smooth" })}
            >
              Back to Form
            </button>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div style={{ padding: "2rem 1.5rem", textAlign: "center", background: COLORS.grey100 }}>
          <p style={{
            fontFamily: FONTS.agrandir, fontSize: "0.625rem",
            lineHeight: "140%", letterSpacing: "0.065rem",
            textTransform: "uppercase", color: COLORS.grey600, opacity: 0.8, margin: 0,
          }}>
            Passively Cleaning Exhaust-Related Components
          </p>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{
          position: "relative", zIndex: "var(--z-footer)",
          display: "grid", padding: "9.62rem 1.5rem 1.5rem",
          color: COLORS.white,
         backgroundImage: `linear-gradient(rgba(32, 67, 56, 0.8), rgba(32, 67, 56, 0.8)), url('${Cheetah}')`,
        }}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "8rem 0 9.32rem" }} />
          <div style={{ marginTop: "8rem" }}>
            <p style={{
              fontFamily: FONTS.agrandir, fontSize: "0.625rem",
              lineHeight: "170%", letterSpacing: "0.045rem",
              opacity: 0.8, color: COLORS.white, marginBottom: "1.38rem",
            }}>
              © {new Date().getFullYear()} Matrix Petroleum. All rights reserved.
            </p>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map((item) => (
                  <a key={item} href="#" className="am-footer-link" style={{
                    fontFamily: FONTS.agrandir, fontSize: "0.625rem",
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