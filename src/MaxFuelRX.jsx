
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import HeroVideo from "./assets/innovation.mp4";
import HeroVideo1 from "./assets/beerlines2.mp4";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  "EXCLUSIVE CONTENT",
  "COMPETITIONS",
  "PRODUCT RELEASES",
  "UNIQUE EXPERIENCES",
];
const CARDS = [
  { label: "Past", title: "A Partnership Forged in Racing DNA", img: IMG_PAST },
  { label: "Present", title: "Iconic Together – 2025 Season", img: null },
  { label: "Future", title: "The Next Chapter Begins", img: IMG_FUTURE },
];
const EVENTS = [
  {
    title: "Celebrating at Silverstone",
    sub: "In celebration before the race weekend",
    href: "#silverstone",
  },
  {
    title: "A toast to the Miami Grand Prix",
    sub: "Elevating the race weekend in South Beach",
    href: "#miami",
  },
  {
    title: "Shanghai Showcase",
    sub: "A celebration in Shanghai",
    href: "#shanghai",
  },
];
const NAV_LINKS = [
  { label: "Our Partnership", sub: "Story & Experiences" },
  { label: "Limited Editions", sub: "Expressions" },
  { label: "Maxfuel RX", sub: "Sign Up" },
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
  flare: `"ASTON_MARTIN_FLARE", Georgia, "Times New Roman", serif`,
  agrandir: `"AGRANDIR", "Helvetica Neue", Arial, sans-serif`,
  caslon: `"CASLON_DORIC", Arial, Helvetica, sans-serif`,
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
    --font-flare:        "ASTON_MARTIN_FLARE", Georgia, serif;
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
  body, html { margin: 0; padding: 0; }

  /* ── Keyframes ── */
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

  /* ── Buttons ── */
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

  /* ── Tags ── */
  .am-tag {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.38rem 1rem 0.31rem;
    font-family: var(--font-agrandir); font-size: 0.625rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0313rem;
    border-radius: 0.1875rem;
  }
  .am-tag-green { color: var(--color-f1-lime-green); border: 1px solid var(--color-f1-lime-green); }
  .am-tag-light { color: #fff; border: 1px solid #fff; }

  /* ── Hover links ── */
  .am-footer-link { opacity: 1; transition: opacity 0.15s var(--easing-smooth); }
  .am-footer-link:hover { opacity: 0.6; }
  .am-card-link .am-card-subtitle,
  .am-card-link .am-card-title { transition: color 0.3s ease-in-out; }
  .am-card-link:hover .am-card-subtitle,
  .am-card-link:hover .am-card-title { color: var(--color-f1-lime-green-darker) !important; }
  .am-nav-item-link { transition: opacity 0.15s var(--easing-smooth); }
  .am-nav-item-link:hover { opacity: 0.6; }

  /* ── Timeline nav  ── */
  /* Background bar uses GSAP transform instead of CSS left; */
  /* The nav pill starts invisible (GSAP sets autoAlpha on first scroll). */
  .am-timeline-nav-pill {
    opacity: 0;           /* GSAP → autoAlpha:1 on first scroll */
    visibility: hidden;
  }
  .am-timeline-item {
    font-family: var(--font-flare); font-size: 0.75rem; font-weight: 400;
    line-height: 100%; text-transform: uppercase; letter-spacing: 0.0225rem;
  }
  /* Active bar — transformed by GSAP */
  .am-timeline-bar {
    position: absolute;
    top: 0.21rem; left: 0.21rem;
    width: 5rem; height: calc(100% - 0.42rem);
    background: var(--color-f1-green-dark);
    border-radius: var(--border-radius-1x);
    z-index: 0; pointer-events: none;
    will-change: transform, width;
  }

  /* ── Drag sliders (no scrollbar) ── */
  .am-slider {
    display: flex; overflow: scroll hidden;
    -ms-overflow-style: none; scrollbar-width: none;
    user-select: none;
  }
  .am-slider::-webkit-scrollbar { display: none; }
  .am-slider.is-dragging { cursor: grabbing; }

  /* ── Homepage transition asset — ScollTrigger target ── */
  #homepage-transition-asset {
    position: relative; overflow: hidden;
    width: 100%; height: 100vh;
  }
  #homepage-transition-asset-mask {
    position: absolute; inset: 0;
    transform: scale(1.12);   /* GSAP scrub → scale(1) */
    transform-origin: center center;
    will-change: transform;
  }
  #homepage-transition-asset-image-container {
    position: absolute; inset: 0;
    transform: scale(1.08);   /* GSAP scrub → scale(1) */
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
  <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
    {open ? (
      <>
        <line
          x1="3"
          y1="3"
          x2="23"
          y2="13"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="13"
          x2="23"
          y2="3"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <line
          x1="3"
          y1="6"
          x2="23"
          y2="6"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="10"
          x2="23"
          y2="10"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
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

// ─── useDragScroll  (drag-to-scroll slider logic from layout-5ebb6801db75b5ff.js) ─
function useDragScroll() {
  const ref = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!drag.current.active) return;
    const el = ref.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - drag.current.startX) * 1.5;
    el.scrollLeft = drag.current.scrollLeft - walk;
  }, []);

  const onPointerUp = useCallback((e) => {
    drag.current.active = false;
    const el = ref.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
    el.classList.remove("is-dragging");
  }, []);

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave: onPointerUp,
  };
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AstonMartinGlenfiddich() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // 0=Past, 1=Present, 2=Future
  const [benefitIdx, setBenefitIdx] = useState(0);

  // ── Refs for GSAP-powered timeline nav ────────────────────────────────────
  // These mirror: backgroundBarRef (active bar), navRef (pill container), itemRefs[]
  const navPillRef = useRef(null); // the white pill (autoAlpha)
  const navBarRef = useRef(null); // dark green sliding bar (gsap.to for hover/active)
  const itemRefs = useRef([]); // individual tab button refs
  const posCache = useRef(new Map()); // position cache (cleared on resize)
  const hoverTimer = useRef(null);
  const cycleTimer = useRef(null); // gsap.delayedCall handle
  const activeTabRef = useRef(activeTab); // keep in sync for GSAP callbacks
  activeTabRef.current = activeTab;

  // ── Drag-to-scroll sliders ────────────────────────────────────────────────
  const slider1 = useDragScroll();
  const slider2 = useDragScroll();

  // ── GTM siteDataLoaded on mount  (37804) ─────────────────────────────────
  useEffect(() => {
    pushDataLayer({
      event: "siteDataLoaded",
      site: { brand: "Glenfiddich", country: "GB", region: "EMEA" },
      page: { type: "homepage", name: "Aston Martin F1 × Glenfiddich" },
    });
  }, []);

  // ── Body scroll lock when menu open ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Cycling newsletter benefit ────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setBenefitIdx((i) => (i + 1) % NEWSLETTER_BENEFITS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // GSAP helpers — mirror setActive / setHover / clearHover from template JS
  // ─────────────────────────────────────────────────────────────────────────

  /** Returns { x, width } of item at index, using cached values */
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

  /** Instantly reposition bar to active tab (no animation) — gsap.set */
  const setActiveBar = useCallback(
    (index) => {
      const pos = getBarPos(index);
      if (!pos || !navBarRef.current) return;
      gsap.set(navBarRef.current, { x: pos.x, width: pos.width });
      // Update data-active on all items
      itemRefs.current.forEach((el, i) => {
        if (el) el.dataset.active = i === index ? "true" : "false";
      });
    },
    [getBarPos],
  );

  /** Smoothly slide bar to hovered item — gsap.to (duration .33, power2.inOut) */
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

  /** Return bar to active tab after hover ends */
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

  // ── Set active bar whenever activeTab changes ────────────────────────────
  useEffect(() => {
    // Small rAF delay so DOM is painted before measuring
    const id = requestAnimationFrame(() => setActiveBar(activeTab));
    return () => cancelAnimationFrame(id);
  }, [activeTab, setActiveBar]);

  // ── Resize → clear position cache → recalculate bar ─────────────────────
  useEffect(() => {
    const onResize = () => {
      posCache.current.clear();
      setActiveBar(activeTabRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setActiveBar]);

  // ─────────────────────────────────────────────────────────────────────────
  // useScroll equivalent  (6018-2291abea0eb9a32b.js → j class, scrollChange)
  //
  // Original behaviour:
  //   e.first  → gsap.to(navRef, { autoAlpha: 1, duration: .7 })
  //   e.xy[1] > innerHeight/4
  //             → data-position-center = "false"
  //   else      → data-position-center = "true"
  // ─────────────────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────────────────
  // ScrollTrigger — "homepage-transition-asset"  (template-99d0405c36d482df.js)
  //
  // Original:
  //   trigger: "#homepage-transition-asset"
  //   start:   "top-=200 top"
  //   end:     "bottom bottom"
  //   scrub:   0.2
  //   animation: gsap.timeline()
  //     .to("#homepage-transition-asset-mask",            { scale: 1 }, "0")
  //     .to("#homepage-transition-asset-image-container", { scale: 1 }, "<")
  //   onEnter:  anticipateCycle  (GSAP delayedCall 1s → push next tab)
  //   onUpdate: progress > 0.9 → delayedCall(1, goNext); progress===0 → abortCycle
  // ─────────────────────────────────────────────────────────────────────────
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
        // anticipateCycle — schedule next tab after 1 s (matches original delayedCall(1, …))
        if (cycleTimer.current) cycleTimer.current.kill();
        cycleTimer.current = gsap.delayedCall(1, () => {
          setActiveTab((t) => (t + 1) % TIMELINE_TABS.length);
        });
      },
      onUpdate: (self) => {
        if (self.progress > 0.9) {
          if (!cycleTimer.current || cycleTimer.current.progress() === 1) {
            // Re-arm if not already running
            cycleTimer.current = gsap.delayedCall(1, () => {
              setActiveTab((t) => (t + 1) % TIMELINE_TABS.length);
            });
          }
        } else if (self.progress === 0) {
          // abortCycle
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

  // ─────────────────────────────────────────────────────────────────────────
  // Section-based ScrollTrigger — update activeTab as each section enters view
  // (mirrors the pathname-based logic in the original; here it's scroll-based)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Map: [selector, tabIndex]
    const sections = [
      ["#section-past", 0],
      ["#homepage-transition-asset", 1], // Present = hero
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

  // ─────────────────────────────────────────────────────────────────────────
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
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* ══════════════════════════════════════════════════════════════
            OVERLAY NAV
        ══════════════════════════════════════════════════════════════ */}
        <nav
          style={{
            position: "fixed",
            inset: "0 0 0 0",
            zIndex: "var(--z-nav)",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* Hamburger pill */}
          <div
            style={{
              position: "relative",
              width: "4.25rem",
              height: "1.5442rem",
              margin: "0.75rem",
              borderRadius: "0.1875rem",
              boxShadow: f1Shadow,
              pointerEvents: "auto",
              alignSelf: "flex-start",
            }}
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                position: "relative",
                zIndex: 100,
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
            zIndex: 12,
            padding: "0.5rem",
            pointerEvents: menuOpen ? "auto" : "none",
            visibility: menuOpen ? "visible" : "hidden",
            transition: `visibility 0s ${menuOpen ? "0s" : "0.35s"}`,
          }}
        >
          {/* Backdrop */}
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
          {/* Panel */}
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
                  href="#"
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

        {/* ══════════════════════════════════════════════════════════════
            TIMELINE NAV PILL  — F1TimelineNavigation
            • Starts hidden (opacity:0 via .am-timeline-nav-pill)
            • GSAP fades it in on first scroll (autoAlpha:1, duration:.7)
            • Background bar moved by GSAP (setActive / setHover / clearHover)
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "fixed",
            bottom: "1.25rem",
            left: 0,
            right: 0,
            zIndex: "var(--z-timeline-nav)",
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
              position: "relative", // needed for bar absolute positioning
            }}
          >
            {/* GSAP-animated background bar */}
            <div ref={navBarRef} className="am-timeline-bar" />

            {/* Tab buttons */}
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
                    zIndex: 1,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            HERO  — #homepage-transition-asset (ScrollTrigger target)
            Mask + image-container scale from 1.12 / 1.08 → 1 via scrub
        ══════════════════════════════════════════════════════════════ */}
        {/* id="homepage-transition-asset" is the ScrollTrigger target; section-present drives tab sync */}
        <section id="homepage-transition-asset" data-section="section-present">
          {/* The mask layer (scaled by GSAP ScrollTrigger) */}
          <div
            id="homepage-transition-asset-mask"
            style={{ background: bgGradient, position: "absolute", inset: 0 }}
          >
            {/* Video background */}
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
              <source src={ HeroVideo }  type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Image container (second scale layer) */}
            <div
              id="homepage-transition-asset-image-container"
              style={{ position: "absolute", inset: 0, overflow: "hidden" }}
            >
              {/* Headline */}
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
                  padding: "2rem 0",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.flare,
                    fontSize: "11vw",
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
                    fontFamily: FONTS.flare,
                    fontSize: "8vw",
                    fontWeight: 300,
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
              {/* Scroll nudge */}
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

        {/* ══════════════════════════════════════════════════════════════
            BLOCK TEXT
        ══════════════════════════════════════════════════════════════ */}
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
           MaxFuel RX achieves fuel optimisation through a unique, 6 pronged approach. It addresses issues that have long plagued the fuel industry while delivering results that are both immediate and long lasting.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CARD SLIDER — drag-to-scroll enabled
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-past"
          style={{
            position: "relative",
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
              The Partnership
            </span>
            <button
              className="am-btn am-btn-light"
              style={{ flexShrink: 0 }}
              onClick={() =>
                pushDataLayer({
                  event: "ctaClicks",
                  ga_event: { category: "CTA", action: "View All Partnership" },
                })
              }
            >
              View All
            </button>
          </div>

          {/* Draggable slider */}
          <div
            ref={slider1.ref}
            className="am-slider"
            style={{ gap: "10.63vw", padding: "0 1.5rem 4rem", cursor: "grab" }}
            onPointerDown={slider1.onPointerDown}
            onPointerMove={slider1.onPointerMove}
            onPointerUp={slider1.onPointerUp}
            onPointerLeave={slider1.onPointerLeave}
          >
            {CARDS.map((card, i) => (
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
                  {card.img ? (
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        pointerEvents: "none",
                      }}
                      draggable={false}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(180deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                      }}
                    >
                      <div
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconPlay />
                      </div>
                    </div>
                  )}
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
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FREE ASSET COMPOSITION — 16 Year Old
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ position: "relative", margin: "13rem 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
              padding: "0 1.5rem",
              alignItems: "center",
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
                <source src={HeroVideo1} type="video/mp4" />
                Your browser does not support the video tag.
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
                <img
                  src={IMG_16YO}
                  alt="Glenfiddich 16 Year Old"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
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
                  16 Year Old
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

        {/* ══════════════════════════════════════════════════════════════
            NEWSLETTER TEASER
        ══════════════════════════════════════════════════════════════ */}
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
              Sign Up
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
              Join the Maxfuel RX for exclusive access to limited
              edition expressions, race experiences, and behind-the-scenes
              content from our partnership with Aston Martin F1 Team.
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

        {/* ══════════════════════════════════════════════════════════════
            AMR26 FULL-HEIGHT SECTION  (section-future)
        ══════════════════════════════════════════════════════════════ */}
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
            <img
              src={IMG_AMR26}
              alt="AMR26"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
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
              AMR26 unveiled in Saudi Arabia
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
              The AMR26 made its racing debut in Saudi Arabia, marking the
              beginning of a new chapter for the Aston Martin F1 Team and
              Glenfiddich partnership.
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

        {/* ══════════════════════════════════════════════════════════════
            FREE ASSET COMPOSITION — 19 Year Old (Inverted)
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ position: "relative", margin: "13rem 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
              padding: "0 1.5rem",
              alignItems: "center",
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
                <img
                  src={IMG_19YO}
                  alt="Glenfiddich 19 Year Old"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
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
                  <span className="am-tag am-tag-green">19 Year Old</span>
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
                  19 Year Old
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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(160deg, ${COLORS.introBgTop}, ${COLORS.introBg})`,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
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

        {/* ══════════════════════════════════════════════════════════════
            EVENTS SLIDER — drag-to-scroll enabled
        ══════════════════════════════════════════════════════════════ */}
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
              Club 1959 around the world
            </span>
            <button
              className="am-btn am-btn-light"
              style={{ flexShrink: 0 }}
              onClick={() =>
                pushDataLayer({
                  event: "ctaClicks",
                  ga_event: { category: "CTA", action: "View All Events" },
                })
              }
            >
              View All Events
            </button>
          </div>

          <div
            ref={slider2.ref}
            className="am-slider"
            style={{ gap: "10.63vw", padding: "0 1.5rem 4rem", cursor: "grab" }}
            onPointerDown={slider2.onPointerDown}
            onPointerMove={slider2.onPointerMove}
            onPointerUp={slider2.onPointerUp}
            onPointerLeave={slider2.onPointerLeave}
          >
            {EVENTS.map((ev, i) => (
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
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg, ${COLORS.introBgTop} ${i * 20}%, ${COLORS.introBg})`,
                    }}
                  />
                  <button
                    style={{
                      position: "relative",
                      zIndex: 1,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <IconPlay />
                  </button>
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
            ))}
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
            Skilfully crafted. Enjoy responsibly. Never drink and drive.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════ */}
        <footer
          style={{
            position: "relative",
            zIndex: "var(--z-footer)",
            display: "grid",
            padding: "9.62rem 1.5rem 1.5rem",
            marginTop: 0,
            color: COLORS.white,
            background: bgGradient,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "4rem",
            }}
          >
            {/* Newsletter */}
            <div style={{ gridColumn: "1 / -1" }}>
              <p
                style={{
                  fontFamily: FONTS.flare,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  lineHeight: "90%",
                  letterSpacing: "-0.09rem",
                  textTransform: "uppercase",
                  color: COLORS.white,
                  maxWidth: "20ch",
                  marginBottom: "1.5rem",
                }}
              >
                Stay in the race
              </p>
              <p
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  lineHeight: "140%",
                  letterSpacing: "0.0075rem",
                  color: COLORS.white,
                  opacity: 0.8,
                  maxWidth: "40ch",
                  marginBottom: "1rem",
                }}
              >
                Subscribe to receive exclusive updates about our Aston Martin F1
                Team × Glenfiddich partnership, limited editions and more.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  height: "2.5rem",
                  padding: "0 0.875rem 0 0.625rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "0.1875rem",
                }}
              >
                <input
                  placeholder="Your email"
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: COLORS.white,
                    fontFamily: FONTS.agrandir,
                    fontSize: "0.625rem",
                    letterSpacing: "0.065rem",
                    textTransform: "uppercase",
                    width: "14rem",
                  }}
                />
                <button
                  className="am-btn am-btn-light"
                  style={{ height: "1.75rem", padding: "0 1rem" }}
                  onClick={() =>
                    pushDataLayer({
                      event: "ctaClicks",
                      ga_event: {
                        category: "Newsletter",
                        action: "Subscribe Footer",
                      },
                    })
                  }
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Link groups */}
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                flexWrap: "wrap",
                gap: "3.125rem",
                marginTop: "5rem",
              }}
            >
              {[
                {
                  title: "Partnership",
                  links: ["Our Story", "The AMR26", "Club 1959", "Events"],
                },
                {
                  title: "Limited Editions",
                  links: [
                    "16 Year Old",
                    "19 Year Old – Travel Exclusive",
                    "Shop Now",
                  ],
                },
                {
                  title: "Follow Us",
                  links: ["Instagram", "Facebook", "Twitter / X", "YouTube"],
                },
              ].map((group) => (
                <div
                  key={group.title}
                  style={{ width: "100%", maxWidth: "12rem" }}
                >
                  <p
                    style={{
                      fontFamily: FONTS.flare,
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      lineHeight: "140%",
                      textTransform: "uppercase",
                      letterSpacing: "0.06rem",
                      color: COLORS.white,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {group.title}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {group.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="am-footer-link"
                        style={{
                          fontFamily: FONTS.agrandir,
                          fontSize: "0.625rem",
                          fontWeight: 400,
                          lineHeight: "140%",
                          textTransform: "uppercase",
                          letterSpacing: "0.065rem",
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          padding: "0.5rem 0",
                          display: "block",
                        }}
                        onClick={() =>
                          pushDataLayer({
                            event: "ctaClicks",
                            ga_event: {
                              category: "Footer Links",
                              action: link,
                            },
                          })
                        }
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership mark */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "8rem 0 9.32rem",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.flare,
                fontSize: "clamp(0.75rem, 2vw, 1.25rem)",
                fontWeight: 400,
                letterSpacing: "0.3rem",
                textTransform: "uppercase",
                color: COLORS.f1LimeGreen,
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Aston Martin F1 Team
              <br />
              <span
                style={{
                  fontFamily: FONTS.agrandir,
                  fontSize: "0.8em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                ×
              </span>
              <br />
              Glenfiddich
            </div>
          </div>

          {/* Footer lower */}
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
              © {new Date().getFullYear()} Glenfiddich. All rights reserved.
              William Grant & Sons. Please drink responsibly.
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
