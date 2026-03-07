import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import Maxfuel from "./Maxfuel";
import AboutUs from './Aboutus'
import ContactUs from './Contactus'
import HeroVideo from "./assets/innovation.mp4";
import HeroVideo1 from "./assets/beerlines2.mp4";
import HeroVideo2 from "./assets/new-engine.mp4";
import HeroVideo3 from "./assets/green-fuel.mp4";
import Video1 from "./assets/climat-4.mp4";
import Video2 from "./assets/climat-5.mp4";
import Video3 from "./assets/climat-6.mp4";
import Team from "./assets/the~team.mp4";
import Droplets from "./assets/droplets.mp4";
import Droplets2 from "./assets/droplets2.mp4";
import Droplets3 from "./assets/droplets1.mp4";
import Theteam from "./assets/the~team.mp4";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cheetah from "./assets/cheetah0.jpg";
import sparkImage from "./assets/spark.png";
import theme5 from "./assets/Theme5.jpg";
import FlareFont from "./assets/fonts/02a1216b6c704030-s.p.woff";
import AgrandirFont from "./assets/fonts/161374021bd9bd1d-s.p.woff";
import CaslonFont from "./assets/fonts/2be595c6b136c288-s.p.woff";
import Fontflare from "./assets/fonts/5f17bc9335138f9d-s.p.woff2";
import AgrandFont from "./assets/fonts/991e0bc14bbf4d90-s.p.woff2";
import CasloFont from "./assets/fonts/9ee57a5762846d75-s.p.woff2";
import FlaresFont from "./assets/fonts/a81f89e159e0486f-s.p.woff";
import AgrandirsFont from "./assets/fonts/abff1420e55a5ceb-s.p.woff2";


gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────
const IMG_PAST =
  "https://images.ctfassets.net/53l6u5v24bqr/62r2Oi2rC5ReXcSzBonIld/c8a4d85796ffcd37ec01a8d2f01c6b43/AMF1_X_GLENFIDDICH_2025_9.jpg";
const IMG_FUTURE =
  "https://images.ctfassets.net/53l6u5v24bqr/1CC5DZRnbyOkl9BFByuj8q/380c99d75ca180f7e5bf9d3eaebcb791/AMR25_SHOT6_1x1__2_.jpg";
const IMG_16YO =
  "https://images.ctfassets.net/53l6u5v24bqr/2Xw8nFm72Pq1cQH8M5nkd8/57d8e477e20ca03f20da8e01e3aaa2a1/16.jpg";
const IMG_19YO =
  "https://images.ctfassets.net/53l6u5v24bqr/5mc3XjZIPySAjD0AWdzNYA/8912370269859d7e8878f4a3bdd253a0/19.jpg";
const IMG_AMR26 =
  "https://images.ctfassets.net/53l6u5v24bqr/6NZQ56rJT4rMtqXj84ySIl/fda0d6b5a3d3bcbd8dfe51bb53e7451a/v2AMR03338-2__2_.jpg";

const TIMELINE_TABS = ["Past", "Present", "Future"];
const NEWSLETTER_BENEFITS = [
  "NEUTRALIZING ACIDS",
  "DECREASING DIESEL BUG GROWTH",
  "LUBRICATING ENGINE COMPONENTS",
  "INCREASING FUEL COMBUSTIBILITY",
];
const CARDS = [
  {
    label: "Past",
    title: "Actively Cleaning the Combustion Process",
    img: null,
  },
  { label: "Present", title: "Increasing Fuel Combustibility", img: null },
  {
    label: "Future",
    title: "Passively Cleaning Exhaust-Related Components",
    img: null,
  },
];
const EVENTS = [
  {
    title: "Neutralizing Acids",
    sub: "MaxFuel RX neutralises harmful acids, protecting engines and extending machinery life.",
    href: "#silverstone",
  },
  {
    title: "Decreasing Diesel Bug Growth",
    sub: "MaxFuel RX prevents diesel bug growth, keeping engines clean, efficient, and lower in emissions.",
    href: "#miami",
  },
  {
    title: "Lubricating Engine Components",
    sub: "MaxFuel RX enhances engine lubrication, reducing wear, maintenance needs, and extending equipment lifespan.",
    href: "#shanghai",
  },
];
const NAV_LINKS = [
  { label: "RX", sub: "Story & Experiences", href: "/maxfuel" },
  { label: "About Us", sub: "Expressions", href: "/about-us" },
  { label: "Contact Us", sub: "Sign Up", href: "/contact-us" },
];
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
  flare: `"ASTON_MARTIN_FLARE", "ASTON_MARTIN_FLARE Fallback", Arial, Helvetica, sans-serif;`,
  agrandir: `"AGRANDIR", "Helvetica Neue", Arial, sans-serif`,
  caslon: `"CASLON_DORIC", Arial, Helvetica, sans-serif`,
  flareWoff: `url(${AgrandirsFont}) format('woff')`,
  // Add your custom fonts here
  // fontName: `"FONT_FAMILY_NAME", Arial, sans-serif`,
};
const easeSnappy = "cubic-bezier(0.87, 0, 0.13, 1)";
const easeSmooth = "cubic-bezier(0.45, 0.02, 0.09, 0.98)";
const f1Shadow = "0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%)";

function pushDataLayer(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// ─── Global styles ────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
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
    --border-radius-1x: 0.125rem;
    --border-radius-2x: 0.1875rem;
    --page-margin:      1.5rem;
    --nav-height:       4rem;
    --z-nav:            6;
    --z-timeline-nav:   5;
    --z-footer:         3;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body, html { margin: 0; padding: 0; overflow-x: hidden; max-width: 100vw; }

  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-0.35rem); }
  }
  @keyframes benefitSwap {
    0%   { opacity: 0; transform: translateY(0.4rem); }
    15%  { opacity: 1; transform: translateY(0); }
    85%  { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-0.4rem); }
  }

  .am-scroll-arrow { animation: bounce 2s infinite; transition: scale 0.2s ease; }
  .am-scroll-arrow:hover { scale: 1.2; animation-play-state: paused; }
  .am-benefit { animation: benefitSwap 2.2s ease forwards; }

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
  .am-btn-dark:active { background: rgba(0,0,0,0.6); transform: scale(0.97); }
  .am-btn-light { color: #fff; background: rgba(255,255,255,0.2); }
  .am-btn-light:hover  { background: rgba(255,255,255,0.5); }
  .am-btn-light:active { background: rgba(255,255,255,0.5); transform: scale(0.97); }

  .am-tag {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.38rem 1rem 0.31rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0313rem;
    border-radius: 0.1875rem;
  }
  .am-tag-green { color: var(--color-f1-lime-green); border: 1px solid var(--color-f1-lime-green); }
  .am-tag-light { color: #fff; border: 1px solid #fff; }

  .am-footer-link { opacity: 1; transition: opacity 0.15s var(--easing-smooth); }
  .am-footer-link:hover { opacity: 0.6; }
  .am-card-link .am-card-subtitle,
  .am-card-link .am-card-title { transition: color 0.3s ease-in-out; }
  .am-card-link:hover .am-card-subtitle,
  .am-card-link:hover .am-card-title { color: var(--color-f1-lime-green-darker) !important; }
  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  .am-timeline-nav-pill {
    opacity: 0;
    visibility: hidden;
  }
  .am-timeline-item {
    font-family: var(--font-flare); font-size: 0.75rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0225rem;
  }
  .am-timeline-bar {
    position: absolute;
    top: 0.21rem; left: 0.21rem;
    width: 5rem; height: calc(100% - 0.42rem);
    background: var(--color-f1-green-dark);
    border-radius: var(--border-radius-1x);
    z-index: 0; pointer-events: none;
    will-change: transform, width;
  }

  .am-slider {
    display: flex; overflow: scroll hidden;
    -ms-overflow-style: none; scrollbar-width: none;
    user-select: none;
    max-width: 100vw;
  }
  .am-slider::-webkit-scrollbar { display: none; }
  .am-slider.is-dragging { cursor: grabbing; }

  #homepage-transition-asset {
    position: relative; overflow: hidden;
    width: 100%; height: 100vh;
  }
  #homepage-transition-asset-mask {
    position: absolute; inset: 0;
    transform: scale(1.12);
    transform-origin: center center;
    will-change: transform;
  }
  #homepage-transition-asset-image-container {
    position: absolute; inset: 0;
    transform: scale(1.08);
    transform-origin: center center;
    will-change: transform;
  }

  @media only screen and (max-width: 767px) {
    .am-hide-mobile  { display: none !important; }
  }
  @media only screen and (min-width: 768px) {
    .am-hide-desktop { display: none !important; }
  }
`;

// ─── SVG icons ────────────────────────────────────────────────────────────────
const IconArrowDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ display: "block" }}
  >
    <path
      d="M8 2v12M2 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1" />
    <path d="M8 7l6 3-6 3V7z" fill="white" />
  </svg>
);

// ─── useDragScroll ────────────────────────────────────────────────────────────
function useDragScroll(ref) {
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      drag.current = {
        active: true,
        startX: e.pageX - el.offsetLeft,
        scrollLeft: el.scrollLeft,
      };
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    },
    [ref],
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!drag.current.active) return;
      const el = ref.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - drag.current.startX) * 1.5;
      el.scrollLeft = drag.current.scrollLeft - walk;
    },
    [ref],
  );

  const onPointerUp = useCallback(
    (e) => {
      drag.current.active = false;
      const el = ref.current;
      if (!el) return;
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("is-dragging");
    },
    [ref],
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave: onPointerUp,
  };
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MaxfuelRX() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [benefitIdx, setBenefitIdx] = useState(0);

  const navPillRef = useRef(null);
  const navBarRef = useRef(null);
  const itemRefs = useRef([]);
  const posCache = useRef(new Map());
  const hoverTimer = useRef(null);
  const cycleTimer = useRef(null);
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);
  const slider1 = useDragScroll(slider1Ref);
  const slider2 = useDragScroll(slider2Ref);

  useEffect(() => {
    pushDataLayer({
      event: "siteDataLoaded",
      site: { brand: "Matrix Petroleum", country: "GB", region: "EMEA" },
      page: { type: "homepage", name: "Maxfuel RX × Matrix Petroleum" },
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const id = setInterval(
      () => setBenefitIdx((i) => (i + 1) % NEWSLETTER_BENEFITS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  const getBarPos = useCallback((index) => {
    if (posCache.current.has(index)) return posCache.current.get(index);
    const pill = navPillRef.current;
    const item = itemRefs.current[index];
    if (!pill || !item) return null;
    const pillRect = pill.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const pos = { x: itemRect.left - pillRect.left, width: itemRect.width };
    posCache.current.set(index, pos);
    return pos;
  }, []);

  const setActiveBar = useCallback(
    (index) => {
      const pos = getBarPos(index);
      if (!pos || !navBarRef.current) return;
      gsap.set(navBarRef.current, { x: pos.x, width: pos.width });
      itemRefs.current.forEach((el, i) => {
        if (el) el.dataset.active = i === index ? "true" : "false";
      });
    },
    [getBarPos],
  );

  const setHoverBar = useCallback(
    (index) => {
      const pos = getBarPos(index);
      if (!pos || !navBarRef.current) return;
      itemRefs.current.forEach((el, i) => {
        if (el) el.dataset.target = i === index ? "true" : "false";
      });
      gsap.to(navBarRef.current, {
        x: pos.x,
        width: pos.width,
        duration: 0.33,
        ease: "power2.inOut",
      });
    },
    [getBarPos],
  );

  const clearHoverBar = useCallback(() => {
    itemRefs.current.forEach((el) => {
      if (el) el.dataset.target = "false";
    });
    const pos = getBarPos(activeTabRef.current);
    if (!pos || !navBarRef.current) return;
    gsap.to(navBarRef.current, {
      x: pos.x,
      width: pos.width,
      duration: 0.33,
      ease: "power2.inOut",
    });
  }, [getBarPos]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setActiveBar(activeTab));
    return () => cancelAnimationFrame(id);
  }, [activeTab, setActiveBar]);

  useEffect(() => {
    const onResize = () => {
      posCache.current.clear();
      setActiveBar(activeTabRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setActiveBar]);

  useEffect(() => {
    let isFirst = true;
    const pill = navPillRef.current;
    const onScroll = () => {
      if (isFirst) {
        isFirst = false;
        gsap.to(pill, { autoAlpha: 1, duration: 0.7 });
      }
      if (pill) {
        const pastQuarter = window.scrollY > window.innerHeight / 4;
        pill.dataset.positionCenter = pastQuarter ? "false" : "true";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
    tl.to("#homepage-transition-asset-mask", { scale: 1 }, "0").to(
      "#homepage-transition-asset-image-container",
      { scale: 1 },
      "<",
    );

    const st = ScrollTrigger.create({
      trigger: "#homepage-transition-asset",
      start: "top-=200 top",
      end: "bottom bottom",
      scrub: 0.2,
      animation: tl,
      onEnter: () => {
        if (cycleTimer.current) cycleTimer.current.kill();
        cycleTimer.current = gsap.delayedCall(1, () => {
          setActiveTab((t) => (t + 1) % TIMELINE_TABS.length);
        });
      },
      onUpdate: (self) => {
        if (self.progress > 0.9) {
          if (!cycleTimer.current || cycleTimer.current.progress() === 1) {
            cycleTimer.current = gsap.delayedCall(1, () => {
              setActiveTab((t) => (t + 1) % TIMELINE_TABS.length);
            });
          }
        } else if (self.progress === 0) {
          if (cycleTimer.current) {
            cycleTimer.current.kill();
            cycleTimer.current = null;
          }
        }
      },
    });

    return () => {
      st.kill();
      tl.kill();
      if (cycleTimer.current) cycleTimer.current.kill();
    };
  }, []);

  useEffect(() => {
    const sections = [
      ["#section-past", 0],
      ["#homepage-transition-asset", 1],
      ["#section-future", 2],
    ];
    const triggers = sections.map(([sel, i]) =>
      ScrollTrigger.create({
        trigger: sel,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveTab(i),
        onEnterBack: () => setActiveTab(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const bgGradient = `linear-gradient(0deg, ${COLORS.introBg}, ${COLORS.introBgTop})`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      <div
        style={{
          fontFamily: FONTS.caslon,
          background: COLORS.white,
          color: COLORS.black,
          overflowX: "hidden",
          maxWidth: "100vw",   
          WebkitFontSmoothing: "antialiased",
        }}
      >
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

        {/* ── TIMELINE NAV PILL ── */}
        <div
          style={{
            position: "fixed",
            bottom: "1.25rem",
            left: 0,
            right: 0,
            zIndex: 10001,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            ref={navPillRef}
            className="am-timeline-nav-pill"
            data-position-center="true"
            style={{
              height: "2.3465rem",
              padding: "0.21rem",
              pointerEvents: "auto",
              background: "hsla(0, 0%, 100%, 0.95)",
              borderRadius: "var(--border-radius-1x)",
              boxShadow: f1Shadow,
              position: "relative",
            }}
          >
            <div ref={navBarRef} className="am-timeline-bar" />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              {TIMELINE_TABS.map((tab, i) => (
                <button
                  key={tab}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-active={activeTab === i}
                  className="am-timeline-item"
                  onClick={() => {
                    setActiveTab(i);
                    pushDataLayer({
                      event: "ctaClicks",
                      ga_event: { category: "Timeline Nav", action: tab },
                    });
                  }}
                  onMouseEnter={() => {
                    if (hoverTimer.current) {
                      clearTimeout(hoverTimer.current);
                      hoverTimer.current = null;
                    }
                    if (i !== activeTab) setHoverBar(i);
                  }}
                  onMouseLeave={() => {
                    hoverTimer.current = setTimeout(() => clearHoverBar(), 50);
                  }}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "5rem",
                    padding: "0.78rem 0 0.72rem",
                    fontFamily: FONTS.flare,
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    lineHeight: "100%",
                    color:
                      activeTab === i ? COLORS.f1LimeGreen : COLORS.f1GreenDark,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.0225rem",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    transition: "color 0.33s ease",
                    zIndex: 10002,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO ── */}
        <section
          id="homepage-transition-asset"
          data-section="section-present"
          style={{ position: "relative", overflow: "hidden" }}   
        >
          <div
            id="homepage-transition-asset-mask"
            style={{ background: bgGradient, position: "absolute", inset: 0 }}
          >
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
                display: "block",
              }}
            >
              <source src={HeroVideo} type="video/mp4" />
            </video>
            <div
              id="homepage-transition-asset-image-container"
              style={{ position: "absolute", inset: 0, overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "100%",
                  padding: "clamp(1rem, 5vh, 2rem) 2.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.flareWoff,
                    fontSize: "clamp(2rem, 11vw, 11vw)",
                    fontWeight: 400,
                    lineHeight: "90%",
                    color: COLORS.f1LimeGreen,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "-0.1rem",
                  }}
                >
                  Visionary Fuel
                </div>
                <div
                  style={{
                    fontFamily: FONTS.flareWoff,
                    fontSize: "clamp(1.25rem, 8vw, 8vw)",
                    fontWeight: 400,
                    lineHeight: "90%",
                    color: COLORS.f1LimeGreen,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "-0.1rem",
                  }}
                >
                  Timeless Tomorrow
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "5rem",
                  left: 0,
                  zIndex: 1,
                  display: "grid",
                  placeItems: "center",
                  width: "100%",
                }}
              >
                <button
                  className="am-scroll-arrow"
                  onClick={() =>
                    window.scrollBy({
                      top: window.innerHeight,
                      behavior: "smooth",
                    })
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2rem",
                    color: COLORS.f1LimeGreen,
                    width: "1rem",
                  }}
                  aria-label="Scroll down"
                >
                  <IconArrowDown />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOCK TEXT ── */}
        <section
          style={{
            padding: "0 var(--page-margin)",
            margin: "9rem 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.flare,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 400,
              lineHeight: "140%",
              color: COLORS.f1GreenDark,
              maxWidth: "22ch",
              margin: "0 auto",
            }}
          >
            MaxFuel RX's unique 6-pronged approach solves long-standing fuel
            industry problems — delivering results that are immediate and built
            to last.
          </p>
        </section>

        {/* ── CARD SLIDER ── */}
        <section
          id="section-past"
          style={{
            position: "relative",
            padding: "13rem 0",
            color: COLORS.white,
            background: COLORS.f1GreenDark,
           maxWidth: "100%",   // ← ADD THIS
           width: "100%",  
           overflow: "hidden",
           WebkitFontSmoothing: "antialiased",
           MozOsxFontSmoothing: "grayscale",
           MsFontSmoothing: "grayscale",
           fontSmoothing: "antialiased",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "3.5rem",
              padding: "0 1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.flare,
                fontSize: "1.5rem",
                fontWeight: 400,
                lineHeight: "150%",
                color: COLORS.f1LimeGreenDark,
                textTransform: "uppercase",
              }}
            >
             CRITICAL ASPECTS OF FUEL OPTIMIZATION
            </span>
            <button
              className="am-btn am-btn-light"
              style={{ flexShrink: 0 }}
              onClick={() =>
                pushDataLayer({
                  event: "ctaClicks",
                  ga_event: { category: "CTA", action: "View All Aspects" },
                })
              }
            >
              View All
            </button>
          </div>

          <div
            ref={slider1Ref}
            className="am-slider"
            style={{ gap: "10.63vw", padding: "0 1.5rem 4rem", cursor: "grab" }}
            onPointerDown={slider1.onPointerDown}
            onPointerMove={slider1.onPointerMove}
            onPointerUp={slider1.onPointerUp}
            onPointerLeave={slider1.onPointerLeave}
          >
            {CARDS.map((card, i) => {
              const videos = [Video1, Video2, Video3];
              return (
              <div
                key={i}
                className="am-card-link"
                style={{
                  flexShrink: 0,
                  width: "min(80.36vw, 27.5vw)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "272.61 / 444",
                    background: COLORS.f1GreenDark,
                    overflow: "hidden",
                  }}
                >
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
                      display: "block",
                      zIndex: 1,
                    }}
                  >
                    <source src={videos[i]} type="video/mp4" />
                  </video>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                      zIndex: 2,
                      opacity: 0.6,
                    }}
                  />
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <span
                    className="am-card-subtitle"
                    style={{
                      display: "block",
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "100%",
                      color: COLORS.white,
                      textTransform: "uppercase",
                      letterSpacing: "0.0312rem",
                    }}
                  >
                    {card.label}
                  </span>
                  <span
                    className="am-card-title"
                    style={{
                      display: "block",
                      marginTop: "0.25rem",
                      fontFamily: FONTS.flare,
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: "150%",
                      textTransform: "uppercase",
                      color: COLORS.white,
                    }}
                  >
                    {card.title}
                  </span>
                </div>
              </div>
            )})}
            {/* Trailing spacer — ensures right padding is respected in overflow scroll */}
            <div
              style={{ flexShrink: 0, width: "1.5rem" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ── RX SECTION ── */}
        <section style={{ position: "relative", margin: "13rem 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
              gap: "1.5rem",
              padding: "0 1.5rem",
              alignItems: "center",
               maxWidth: "100%",   // ← ADD THIS
               width: "100%",  
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "217 / 325",
                background: COLORS.f1GreenDark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
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
                  display: "block",
                  zIndex: 1001,
                }}
              >
                <source src={HeroVideo3} type="video/mp4" />
              </video>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: FONTS.agrandir,
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: "100%",
                  color: COLORS.f1LimeGreen,
                  textAlign: "center",
                  textTransform: "uppercase",
                  maxWidth: "10rem",
                  padding: "1rem",
                }}
              >
                Limited Edition
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "1.5rem",
                  zIndex: 3,
                }}
              >
                <button
                  className="am-btn am-btn-light"
                  onClick={() =>
                    pushDataLayer({
                      event: "ctaClicks",
                      ga_event: {
                        category: "CTA",
                        action: "Discover Limited Edition",
                      },
                    })
                  }
                >
                  Discover
                </button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "26rem",
                  aspectRatio: "217 / 325",
                  overflow: "hidden",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                >
                  <source src={Droplets2} type="video/mp4" />
                </video>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "0.625rem",
                    fontWeight: 400,
                    lineHeight: "100%",
                    color: COLORS.black,
                    textTransform: "uppercase",
                    letterSpacing: "0.0313rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Limited Edition
                </p>
                <p
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: COLORS.black,
                    textTransform: "uppercase",
                  }}
                >
                  RX
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button
                    className="am-btn am-btn-dark"
                    onClick={() =>
                      pushDataLayer({
                        event: "ctaClicks",
                        ga_event: { category: "CTA", action: "Shop 16YO" },
                      })
                    }
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER TEASER ── */}
        <section
          style={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            padding: "0 var(--page-margin)",
            margin: "13rem 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                paddingBottom: "1rem",
                fontFamily: FONTS.agrandir,
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: "100%",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.0438rem",
                color: COLORS.f1GreenDark,
              }}
            >
             Matrix Petroleum
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: FONTS.flare,
                fontSize: "clamp(2.875rem, 6vw, 5rem)",
                fontWeight: 400,
                lineHeight: "90%",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "clamp(-0.115rem, -0.5vw, -0.15rem)",
                color: COLORS.f1GreenDark,
              }}
            >
              Maxfuel RX
            </h2>
            <div
              style={{
                position: "relative",
                display: "grid",
                height: "2rem",
                marginTop: "1rem",
                overflow: "hidden",
              }}
            >
              <span
                key={benefitIdx}
                className="am-benefit"
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  letterSpacing: "0.0438rem",
                  textTransform: "uppercase",
                  color: COLORS.f1LimeGreenDark,
                  textAlign: "center",
                  gridArea: "1/-1",
                }}
              >
                {NEWSLETTER_BENEFITS[benefitIdx]}
              </span>
            </div>
            <p
              style={{
                maxWidth: "45.0625rem",
                marginTop: "1.75rem",
                fontFamily: FONTS.flare,
                fontSize: "0.75rem",
                fontWeight: 400,
                lineHeight: "145%",
                textAlign: "center",
                color: COLORS.f1GreenDark,
              }}
            >
              MaxFuel RX is an elite precision engineered fuel
                            crafted to deeply cleanse and sustain your diesel engine’s performance over the
                            long haul. Its advanced formula goes beyond standard fuels, ensuring continuous
                            protection that maximises efficiency and longevity. 
            </p>
            <div style={{ margin: "2.02rem auto 0" }}>
              <button
                className="am-btn am-btn-dark"
                onClick={() =>
                  pushDataLayer({
                    event: "ctaClicks",
                    ga_event: {
                      category: "CTA",
                      action: "Join the Collective",
                    },
                  })
                }
              >
                Join the Collective
              </button>
            </div>
          </div>
        </section>

        {/* ── AMR26 SECTION ── */}
        <section
          id="section-future"
          style={{
            position: "relative",
            display: "grid",
            width: "100%",
            height: "100vh",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
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
                display: "block",
              }}
            >
              <source src={HeroVideo1} type="video/mp4" />
            </video>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(32,67,56,0.3) 0%, rgba(12,19,17,0.7) 100%)",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 1.5rem 3rem",
              color: COLORS.white,
              width: "100%",
              height: "100%",
            }}
          >
            <h2
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                fontWeight: 400,
                lineHeight: "150%",
                textTransform: "uppercase",
                color: COLORS.white,
                maxWidth: "30ch",
                marginBottom: "1rem",
              }}
            >
              MAXFUEL RX  unveiled in South Africa
            </h2>
            <p
              style={{
                fontFamily: FONTS.flare,
                fontSize: "0.75rem",
                fontWeight: 400,
                lineHeight: "145%",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "40ch",
                marginBottom: "1.48rem",
              }}
            >
              Over time exhaust systems accumulate residue that reduces their effectiveness in filtering harmful gases. MaxFuel RX passively cleans these components, ensuring that exhaust systems operate at peak efficiency thereby significantly reducing emissions.
            </p>
            <div>
              <button
                className="am-btn am-btn-light"
                onClick={() =>
                  pushDataLayer({
                    event: "ctaClicks",
                    ga_event: { category: "CTA", action: "Read More AMR26" },
                  })
                }
              >
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* ── RX Benefits SECTION ── */}
        <section style={{ position: "relative", margin: "13rem 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
              gap: "1.5rem",
              padding: "0 1.5rem",
              alignItems: "center",
               maxWidth: "100%",   // ← ADD THIS
               width: "100%",  
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "26rem",
                  aspectRatio: "217 / 325",
                  overflow: "hidden",
                }}
              >
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
                display: "block",
              }}
            >
              <source src={Droplets} type="video/mp4" />
            </video>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span className="am-tag am-tag-green">Travel Exclusive</span>
                  <span className="am-tag am-tag-green">RX Benefits</span>
                </div>
                <p
                  style={{
                    fontFamily: FONTS.agrandir,
                    fontSize: "0.625rem",
                    fontWeight: 400,
                    lineHeight: "100%",
                    color: COLORS.black,
                    textTransform: "uppercase",
                    letterSpacing: "0.0313rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Travel Retail Exclusive
                </p>
                <p
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: "150%",
                    textTransform: "uppercase",
                    color: COLORS.black,
                  }}
                >
                  RX Benefits
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button
                    className="am-btn am-btn-dark"
                    onClick={() =>
                      pushDataLayer({
                        event: "ctaClicks",
                        ga_event: {
                          category: "CTA",
                          action: "Find In Store 19YO",
                        },
                      })
                    }
                  >
                    Find In Store
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "217 / 325",
                background: COLORS.f1GreenDark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
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
                  display: "block",
                  zIndex: 1001,
                }}
              >
                <source src={HeroVideo2} type="video/mp4" />
              </video>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(160deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: FONTS.agrandir,
                  fontSize: "1rem",
                  color: COLORS.f1LimeGreen,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Travel Retail
              </div>
            </div>
          </div>
        </section>

        {/* ── EVENTS SLIDER ── */}
        <section
          style={{
            position: "relative",
            background: bgGradient,
            padding: "13rem 0",
            color: COLORS.white,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "3.5rem",
              padding: "0 1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.flare,
                fontSize: "1.5rem",
                fontWeight: 400,
                lineHeight: "150%",
                color: COLORS.white,
                textTransform: "uppercase",
              }}
            >
              CRITICAL ASPECTS OF FUEL OPTIMIZATION
            </span>
            <button
              className="am-btn am-btn-light"
              style={{ flexShrink: 0 }}
              onClick={() =>
                pushDataLayer({
                  event: "ctaClicks",
                  ga_event: { category: "CTA", action: "View All Aspects" },
                })
              }
            >
              View All Aspects
            </button>
          </div>

          <div
            ref={slider2Ref}
            className="am-slider"
            style={{ gap: "10.63vw", padding: "0 1.5rem 4rem", cursor: "grab" }}
            onPointerDown={slider2.onPointerDown}
            onPointerMove={slider2.onPointerMove}
            onPointerUp={slider2.onPointerUp}
            onPointerLeave={slider2.onPointerLeave}
          >
            {EVENTS.map((ev, i) => {
              const eventVideos = [Theteam, Theteam, Theteam];
              return (
              <div
                key={i}
                className="am-card-link"
                style={{
                  flexShrink: 0,
                  width: "min(80.36vw, 27.5vw)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "272.61 / 444",
                    background: COLORS.f1GreenDark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
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
                      display: "block",
                      zIndex: 1001,
                    }}
                  >
                    <source src={eventVideos[i]} type="video/mp4" />
                  </video>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg, ${COLORS.introBgTop} ${i * 20}%, ${COLORS.introBg})`,
                      zIndex: 2,
                    }}
                  />
                  <button
                    style={{
                      position: "relative",
                      zIndex: 3,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <span
                    className="am-card-subtitle"
                    style={{
                      display: "block",
                      fontFamily: FONTS.agrandir,
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "100%",
                      color: COLORS.white,
                      textTransform: "uppercase",
                      letterSpacing: "0.0312rem",
                    }}
                  >
                    {ev.sub}
                  </span>
                  <span
                    className="am-card-title"
                    style={{
                      display: "block",
                      marginTop: "0.25rem",
                      fontFamily: FONTS.flare,
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: "150%",
                      textTransform: "uppercase",
                      color: COLORS.white,
                    }}
                  >
                    {ev.title}
                  </span>
                </div>
              </div>
            )})}
            {/* Trailing spacer — ensures right padding is respected in overflow scroll */}
            <div
              style={{ flexShrink: 0, width: "1.5rem" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div
          style={{
            padding: "2rem 1.5rem",
            textAlign: "center",
            background: COLORS.grey100,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.agrandir,
              fontSize: "0.625rem",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "0.065rem",
              textTransform: "uppercase",
              color: COLORS.grey600,
              opacity: 0.8,
            }}
          >
            Passively Cleaning Exhaust-Related Components
          </p>
        </div>

        {/* ── FOOTER ── */}
        <footer
          style={{
            position: "relative",
            zIndex: "var(--z-footer)",
            display: "grid",
            padding: "9.62rem 1.5rem 1.5rem",
            marginTop: 0,
            color: COLORS.white,
            backgroundImage: `linear-gradient(rgba(32, 67, 56, 0.8), rgba(32, 67, 56, 0.8)), url('${Cheetah}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "8rem 0 9.32rem",
            }}
          />
          <div style={{ marginTop: "8rem" }}>
            <p
              style={{
                fontFamily: FONTS.agrandir,
                fontSize: "0.625rem",
                fontWeight: 400,
                lineHeight: "170%",
                letterSpacing: "0.045rem",
                opacity: 0.8,
                color: COLORS.white,
                marginBottom: "1.38rem",
              }}
            >
              © {new Date().getFullYear()} Matrix Petroleum. All rights
              reserved.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="am-footer-link"
                      style={{
                        fontFamily: FONTS.agrandir,
                        fontSize: "0.625rem",
                        fontWeight: 400,
                        lineHeight: "140%",
                        textTransform: "uppercase",
                        letterSpacing: "0.05rem",
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
              <div
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "0.625rem",
                  letterSpacing: "0.05rem",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                EN-GB
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
