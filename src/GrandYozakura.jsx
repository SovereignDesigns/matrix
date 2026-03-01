import { useState, useEffect, useRef, useCallback } from "react";
import heroVideo from "./assets/carlines.mp4";
import bottleImage from "./assets/pump.png";

const VT = { L: 0, M: 6, B: 7, S: 12, K: 0, D: 6 };

const NAV_MENU = [
  {
    id: "collection",
    label: "Our Collection",
    children: [
      { label: "Grand Series", href: "#" },
      { label: "Flagship Collection", href: "#" },
      { label: "Limited Edition", href: "#" },
      { label: "Experimental Series", href: "#" },
      { label: "Travel Exclusive", href: "#" },
    ],
  },
  {
    id: "grand-series",
    label: "Grand Series",
    children: [
      { label: "Max Fuel RX 29YO", href: "#" },
      { label: "Grande Couronne 26YO", href: "#" },
      { label: "Grand Cru 23YO", href: "#" },
      { label: "Grand Reserva 21YO", href: "#" },
    ],
  },
  {
    id: "story",
    label: "Our Story",
    children: [
      { label: "The Distillery", href: "#" },
      { label: "Brian Kinsman — Malt Master", href: "#" },
      { label: "Our Heritage", href: "#" },
      { label: "Sustainability", href: "#" },
    ],
  },
  {
    id: "tours",
    label: "Distillery Tours",
    children: [
      { label: "Book a Tour", href: "#" },
      { label: "Whisky Experiences", href: "#" },
      { label: "The Warehouse", href: "#" },
    ],
  },
];

/* ── Articles data  (articles.js year-filter) ───────────────────────────── */
const ARTICLES_BY_YEAR = {
  2024: [
    { title: "The Art of Awamori Cask Finishing", date: "March 2024" },
    { title: "Yozakura: Moonlit Cherry Blossoms", date: "April 2024" },
    { title: "Brian Kinsman on 29 Years of Patience", date: "May 2024" },
  ],
  2023: [
    { title: "Max Fuel RX Launch Event, Tokyo", date: "September 2023" },
    { title: "A First of Its Kind: Ex-Awamori Casks", date: "October 2023" },
    { title: "The Grand Series — Four Chapters", date: "November 2023" },
  ],
  2022: [
    { title: "Inside the Matrix Petroleum Cooperage", date: "February 2022" },
    { title: "Grand Cru: Champagne Cask Mastery", date: "June 2022" },
  ],
};

/* ── Sakura petals ──────────────────────────────────────────────────────── */
const SAKURA_PETALS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${7 + Math.random() * 7}s`,
  size: `${10 + Math.random() * 16}px`,
  rotation: Math.random() * 360,
}));

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function SakuraPetal({ style }) {
  return <div className="gy-sakura-petal" style={style} />;
}

/* ── MegaNav  (menu.js translated)
   Layout: [left: empty] [centre: stag logo] [right: hamburger]
   Menu: full-height panel slides in from RIGHT → LEFT                     */
function MegaNav({ scrolled, onRegisterClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTopId, setActiveTopId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: "home", label: "Home" },
  ]);
  /* animate sub-panel in */
  const [subVisible, setSubVisible] = useState(false);

  /* mirrors menu.js v() — reset to top-level */
  const resetNav = useCallback(() => {
    setActiveTopId(null);
    setBreadcrumbs([{ id: "home", label: "Home" }]);
    setSubVisible(false);
  }, []);

  /* mirrors .menu-toggle click — close resets after transition */
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (prev) setTimeout(resetNav, 450);
      return !prev;
    });
  };

  /* mirrors .menu-item--expanded click → show second-column */
  const handleTopItemClick = (item) => {
    if (activeTopId === item.id) {
      /* collapse back to top level */
      setSubVisible(false);
      setTimeout(() => {
        setActiveTopId(null);
        setBreadcrumbs([{ id: "home", label: "Home" }]);
      }, 220);
    } else {
      setSubVisible(false);
      setTimeout(
        () => {
          setActiveTopId(item.id);
          setBreadcrumbs([
            { id: "home", label: "Home" },
            { id: item.id, label: item.label },
          ]);
          setTimeout(() => setSubVisible(true), 30);
        },
        activeTopId ? 200 : 0,
      );
    }
  };

  /* breadcrumb "Home" click — mirrors breadcrumb_link data-target-id=0 */
  const handleBreadcrumbHome = () => {
    setSubVisible(false);
    setTimeout(() => {
      setActiveTopId(null);
      setBreadcrumbs([{ id: "home", label: "Home" }]);
    }, 220);
  };

  const activeTopItem = NAV_MENU.find((m) => m.id === activeTopId);

  return (
    <>
      {/* ── Nav bar: [Matrix Petroleum. left] [stag centre, fades on scroll] [≡ right] */}
      <nav className={`gy-nav ${scrolled ? "scrolled" : ""}`}>
        {/* LEFT — "Matrix Petroleum." wordmark */}
        <div className="gy-nav-left">
          <span className="gy-nav-wordmark">
            {scrolled ? "Maxfuel RX" : "Matrix Petroleum"}
          </span>
        </div>

        {/* CENTRE — stag SVG, hidden when scrolled */}
        <div className={`gy-nav-logo-wrap ${scrolled ? "scrolled-hide" : ""}`}>
       

        </div>

        {/* RIGHT — hamburger */}
        <div className="gy-nav-right">
          <button
            className={`gy-hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="gy-ham-line" />
            <span className="gy-ham-line" />
            <span className="gy-ham-line" />
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay backdrop ─────────────────────────────────── */}
      <div
        className={`gy-menu-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* ── Slide panel: enters from RIGHT, pushes LEFT ───────────────────
          mirrors main--navigation.show / .hide + sub-menu--loaded          */}
      <div
        className={`gy-menu-panel-wrap ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        {/* Panel header: Matrix Petroleum. wordmark left, × close right */}
        <div className="gy-menu-head">
          <div className="gy-menu-head-logo">
            <svg
              className="gy-menu-stag"
              viewBox="0 0 60 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M30 28 C25 28 21 32 21 37 C21 40 23 43 26 44.5 L25 52 C24 55 25 58 28 59.5 L28 64 C28 66 29 67 30 67 C31 67 32 66 32 64 L32 59.5 C35 58 36 55 35 52 L34 44.5 C37 43 39 40 39 37 C39 32 35 28 30 28Z"
                fill="currentColor"
              />
              <path
                d="M26 28 C26 22 28 18 30 16 C32 18 34 22 34 28"
                fill="currentColor"
              />
              <ellipse cx="30" cy="14" rx="5" ry="5.5" fill="currentColor" />
              <path
                d="M27 10 L18 2 M27 10 L22 1 M27 10 L20 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M33 10 L42 2 M33 10 L38 1 M33 10 L40 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="gy-menu-head-wordmark">Matrix Petroleum.</span>
          </div>
          <button
            className="gy-menu-close"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>

        {/* ── Breadcrumb trail (mirrors menu.js .breadcrumb ol) */}
        <div
          className={`gy-menu-breadcrumb-wrap ${breadcrumbs.length > 1 ? "visible" : ""}`}
        >
          {breadcrumbs.length > 1 && (
            <nav className="gy-menu-breadcrumb" aria-label="Menu breadcrumb">
              <ol>
                <li>
                  <button
                    className="gy-breadcrumb-link"
                    onClick={handleBreadcrumbHome}
                  >
                    ← Back
                  </button>
                </li>
                <li>
                  <span className="gy-crumb-current">
                    {breadcrumbs[breadcrumbs.length - 1].label}
                  </span>
                </li>
              </ol>
            </nav>
          )}
        </div>

        {/* ── Dual-column panel body ──────────────────────────────────────
            first-column always visible; second-column slides in when item selected */}
        <div className="gy-menu-body">
          {/* FIRST COLUMN — top-level items (mirrors .menu--top-level.first-column) */}
          <ul
            className={`gy-menu-col gy-menu-first-col ${menuOpen ? "visible" : ""} ${activeTopId ? "sub-open" : ""}`}
          >
            {NAV_MENU.map((item, i) => (
              <li
                key={item.id}
                className={`gy-menu-item gy-menu-item--expanded ${activeTopId === item.id ? "active" : ""}`}
                style={{
                  transitionDelay: menuOpen ? `${0.18 + i * 0.07}s` : "0s",
                }}
              >
                <button
                  className="gy-menu-item-btn"
                  onClick={() => handleTopItemClick(item)}
                  aria-expanded={activeTopId === item.id}
                >
                  <span className="gy-menu-item-label">{item.label}</span>
                  <span
                    className={`gy-menu-item-arrow ${activeTopId === item.id ? "rotated" : ""}`}
                  >
                    ›
                  </span>
                </button>
              </li>
            ))}
            {/* Extra non-expanded items */}
            {[
              { label: "The Collective", href: "#" },
              { label: "Magazine", href: "#" },
            ].map((item, i) => (
              <li
                key={item.label}
                className="gy-menu-item"
                style={{
                  transitionDelay: menuOpen
                    ? `${0.18 + (NAV_MENU.length + i) * 0.07}s`
                    : "0s",
                }}
              >
                <a className="gy-menu-item-btn" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* SECOND COLUMN — sub-items (mirrors .second-column in-from-right) */}
          <ul
            className={`gy-menu-col gy-menu-second-col ${activeTopItem && subVisible ? "visible" : ""}`}
          >
            {activeTopItem?.children.map((child, i) => (
              <li
                key={child.label}
                className="gy-menu-item"
                style={{ transitionDelay: subVisible ? `${i * 0.06}s` : "0s" }}
              >
                <a
                  className="gy-menu-item-btn gy-menu-child-btn"
                  href={child.href}
                >
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer strip */}
        <div className="gy-menu-footer">
          <p className="gy-menu-footer-disc">
            Skilfully crafted. Drink responsibly.
          </p>
          <button
            className="gy-cta-btn"
            onClick={() => {
              onRegisterClick();
              toggleMenu();
            }}
          >
            Register Interest
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Register Interest Form  (form-api.js translated) ──────────────────── */
function RegisterForm({ visible, onClose }) {
  const [fields, setFields] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    country: "",
    agree: false,
    analytics: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  /* mirrors form-api.js date validation */
  const isValidDate = (y, m, d) => {
    const month = Number(m) - 1;
    const dt = new Date(Number(y), month, Number(d));
    return (
      dt.getFullYear() === Number(y) &&
      dt.getMonth() === month &&
      dt.getDate() === Number(d)
    );
  };

  /* mirrors form-api.js email regex */
  const isValidEmail = (e) =>
    /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);

  /* auto-advance DOB fields (mirrors #dob-day keyup in form-api.js) */
  const handleDobKey = (field, e) => {
    if (e.target.value.length === 2) {
      if (field === "dobDay") monthRef.current?.focus();
      else if (field === "dobMonth") yearRef.current?.focus();
    }
  };

  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  /* mirrors form-api.js #submit-btn click validation */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fields.firstname) newErrors.firstname = true;
    if (!fields.lastname) newErrors.lastname = true;
    if (!isValidEmail(fields.email)) newErrors.email = true;
    if (!fields.country) newErrors.country = true;
    if (!isValidDate(fields.dobYear, fields.dobMonth, fields.dobDay))
      newErrors.dob = true;
    if (!fields.agree) newErrors.agree = true;
    if (!fields.analytics) newErrors.analytics = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    /* Simulate grecaptcha + AJAX (form-api.js $.ajax POST) */
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setApiError("");
      setErrors({});
    }, 500);
  };

  return (
    <div className={`gy-form-overlay ${visible ? "show" : ""}`}>
      <div className={`gy-form-container ${visible ? "open" : ""}`}>
        <button
          className="gy-form-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className="gy-form-thank-you">
            <div className="gy-form-ty-icon">夜桜</div>
            <h2>Thank you for your interest</h2>
            <p>
              We'll be in touch about Max Fuel RX availability in your
              region.
            </p>
          </div>
        ) : (
          <>
            <h2 className="gy-form-title">Register Interest</h2>
            <p className="gy-form-subtitle">Max Fuel RX — Limited Edition</p>

            {apiError && <div className="gy-form-error-msg">{apiError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="gy-form-row">
                <div
                  className={`gy-form-field ${errors.firstname ? "error" : ""}`}
                >
                  <label>First Name</label>
                  <input
                    id="firstname"
                    type="text"
                    value={fields.firstname}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div
                  className={`gy-form-field ${errors.lastname ? "error" : ""}`}
                >
                  <label>Last Name</label>
                  <input
                    id="lastname"
                    type="text"
                    value={fields.lastname}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className={`gy-form-field ${errors.email ? "error" : ""}`}>
                <label>Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div className={`gy-form-field ${errors.dob ? "error" : ""}`}>
                <label>Date of Birth</label>
                <div className="gy-dob-row">
                  <input
                    ref={dayRef}
                    type="text"
                    maxLength={2}
                    placeholder="DD"
                    value={fields.dobDay}
                    onChange={(e) => handleChange("dobDay", e.target.value)}
                    onKeyUp={(e) => handleDobKey("dobDay", e)}
                  />
                  <span>/</span>
                  <input
                    ref={monthRef}
                    type="text"
                    maxLength={2}
                    placeholder="MM"
                    value={fields.dobMonth}
                    onChange={(e) => handleChange("dobMonth", e.target.value)}
                    onKeyUp={(e) => handleDobKey("dobMonth", e)}
                  />
                  <span>/</span>
                  <input
                    ref={yearRef}
                    type="text"
                    maxLength={4}
                    placeholder="YYYY"
                    value={fields.dobYear}
                    onChange={(e) => handleChange("dobYear", e.target.value)}
                  />
                </div>
              </div>

              <div className={`gy-form-field ${errors.country ? "error" : ""}`}>
                <label>Country</label>
                <select
                  id="country-select-field"
                  value={fields.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                >
                  <option value="">Select country</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Japan</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>South Africa</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="gy-form-checkboxes">
                <label
                  className={`gy-check-label ${errors.agree ? "error" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={fields.agree}
                    onChange={(e) => handleChange("agree", e.target.checked)}
                  />
                  I confirm I am of legal purchase age and agree to the{" "}
                  <a href="#">Terms & Conditions</a>
                </label>
                <label
                  className={`gy-check-label ${errors.analytics ? "error" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={fields.analytics}
                    onChange={(e) =>
                      handleChange("analytics", e.target.checked)
                    }
                  />
                  I accept the use of analytics cookies to improve my experience
                </label>
              </div>

              <button
                type="submit"
                className={`gy-cta-btn gy-submit-btn ${submitting ? "loading" : ""}`}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit Interest"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Articles section  (articles.js year-filter) ───────────────────────── */
function ArticlesSection() {
  const [year, setYear] = useState("2024");
  const [articles, setArticles] = useState(ARTICLES_BY_YEAR["2024"]);
  const [fading, setFading] = useState(false);

  /* mirrors articles.js .articles-year change → $.ajax GET /article_list_content/ */
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setFading(true);
    setTimeout(() => {
      /* simulates AJAX success: t('.block-gf-themes').html(e) */
      setArticles(ARTICLES_BY_YEAR[newYear] || []);
      setYear(newYear);
      setFading(false);
    }, 320);
  };

  return (
    <section className="gy-articles">
      <div className="gy-articles-inner">
        <div className="gy-articles-header">
          <h2 className="gy-section-heading">From the Journal</h2>
          {/* .articles-year select — mirrors articles.js Drupal behaviour */}
          <select
            className="articles-year gy-year-select"
            value={year}
            onChange={handleYearChange}
          >
            {Object.keys(ARTICLES_BY_YEAR)
              .sort()
              .reverse()
              .map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
          </select>
        </div>
        <div
          className={`gy-articles-grid block-gf-themes ${fading ? "fading" : ""}`}
        >
          {articles.map((a, i) => (
            <article key={i} className="gy-article-card">
              <div className="gy-article-img-placeholder">
                <div className="gy-article-img-inner">
                  <span>夜桜</span>
                </div>
              </div>
              <div className="gy-article-body">
                <p className="gy-article-date">{a.date}</p>
                <h3 className="gy-article-title">{a.title}</h3>
                <a href="#" className="gy-article-link">
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function GrandYozakura({
  groupImage,
  bgImage,
  masterImage,
  noteImages = [],
} = {}) {
  const [activeNote, setActiveNote] = useState(0);
  const [noteFading, setNoteFading] = useState(false);
  const [heroStep, setHeroStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [whereVisible, setWhereVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [articlesVisible, setArticlesVisible] = useState(false);

  const heroVideoRef = useRef(null);
  const heroRef = useRef(null);
  const mainRef = useRef(null);
  const notesRef = useRef(null);
  const introRef = useRef(null);
  const detailsRef = useRef(null);
  const whereRef = useRef(null);
  const quoteRef = useRef(null);
  const articlesRef = useRef(null);

  /* Shared animation lock (mirrors `I` in globals.js) */
  const animLock = useRef(false);
  const heroLocked = useRef(true);
  const notesLocked = useRef(false);
  const heroStepRef = useRef(0);
  const activeNoteRef = useRef(0);
   const productRevealRef = useRef(null);
const leftVideoRef = useRef(null);
const [bottleOffset, setBottleOffset] = useState(0);

  /* ── Video time helper  (mirrors p() in globals.js) ─────────────────── */
  const setVideoTime = useCallback((t) => {
    if (heroVideoRef.current) heroVideoRef.current.currentTime = t;
  }, []);

  /* ── Hero step machine  (mirrors globals.js d()/g() + Observer) ──────── */
  const goToStep = useCallback(
    (next) => {
      if (animLock.current) return;
      const cur = heroStepRef.current;
      if (next === cur || next < 0) return;

      if (next >= 3) {
        heroLocked.current = false;
        heroStepRef.current = 3;
        setHeroStep(3);
        mainRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      animLock.current = true;

      if (next === 0) setVideoTime(VT.L);
      else if (next === 1) setVideoTime(VT.B);
      else if (next === 2) setVideoTime(VT.K);

      heroStepRef.current = next;
      setHeroStep(next);

      setTimeout(() => {
        animLock.current = false;
      }, 800);
    },
    [setVideoTime],
  );

  useEffect(() => {
  const handleScroll = () => {
    if (!productRevealRef.current) return;

    const rect = productRevealRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // ── Parallax bottle ──────────────────────────────────
    // How far the section has scrolled through the viewport (0 → 1)
    const progress = 1 - (rect.bottom / (windowH + rect.height));
    const clampedProgress = Math.max(0, Math.min(1, progress));
    setBottleOffset(clampedProgress * -120); // moves up 120px max

    // ── Video play/pause ─────────────────────────────────
    if (!leftVideoRef.current) return;
    const fullyVisible = rect.top >= 0 && rect.bottom <= windowH;
    if (fullyVisible) {
      leftVideoRef.current.play();
    } else {
      leftVideoRef.current.pause();
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    /* nav blur + CTA  (home.js ScrollTrigger .scrolltrigger equivalent) */
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setCtaVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Hero wheel/touch  (globals.js Observer type:"wheel,touch") */
    const onHeroWheel = (e) => {
      if (!heroLocked.current || animLock.current) return;
      e.preventDefault();
      goToStep(heroStepRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    let touchY = 0;
    const onHeroTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };
    const onHeroTouchEnd = (e) => {
      if (!heroLocked.current || animLock.current) return;
      const delta = touchY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      goToStep(heroStepRef.current + (delta > 0 ? 1 : -1));
    };

    const hero = heroRef.current;
    if (!isMobile && hero) {
      hero.addEventListener("wheel", onHeroWheel, { passive: false });
      hero.addEventListener("touchstart", onHeroTouchStart, { passive: true });
      hero.addEventListener("touchend", onHeroTouchEnd, { passive: true });
    }

    /* Notes wheel  (globals.js inner Observer in o()/n()) */
    const onNotesWheel = (e) => {
      if (!notesLocked.current || animLock.current) return;
      const goingDown = e.deltaY > 0;
      const cur = activeNoteRef.current;
      if ((goingDown && cur >= 3) || (!goingDown && cur <= 0)) {
        notesLocked.current = false;
        return;
      }
      e.preventDefault();
      animLock.current = true;
      const next = goingDown ? Math.min(3, cur + 1) : Math.max(0, cur - 1);
      activeNoteRef.current = next;
      setNoteFading(true);
      setTimeout(() => {
        setActiveNote(next);
        setNoteFading(false);
        setTimeout(() => {
          animLock.current = false;
        }, 400);
      }, 220);
    };
    const notesEl = notesRef.current;
    if (notesEl)
      notesEl.addEventListener("wheel", onNotesWheel, { passive: false });

    /* IntersectionObserver — section entry animations
       mirrors home.js gsap.timeline({ scrollTrigger: { toggleActions:"play none play reset" }}) */
    const makeIO = (setter, threshold = 0.18) =>
      new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setter(true);
        },
        { threshold },
      );

    const ioIntro = makeIO(setIntroVisible, 0.2);
    const ioDetails = makeIO(setDetailsVisible, 0.2);
    const ioWhere = makeIO(setWhereVisible, 0.12);
    const ioQuote = makeIO(setQuoteVisible, 0.3);
    const ioArticles = makeIO(setArticlesVisible, 0.15);

    /* Notes IO also controls wheel lock  (globals.js onEnter/onLeave) */
    const ioNotes = new IntersectionObserver(
      ([e]) => {
        setNotesVisible(e.isIntersecting);
        notesLocked.current = e.isIntersecting;
      },
      { threshold: 0.1 },
    );

    if (introRef.current) ioIntro.observe(introRef.current);
    if (notesRef.current) ioNotes.observe(notesRef.current);
    if (detailsRef.current) ioDetails.observe(detailsRef.current);
    if (whereRef.current) ioWhere.observe(whereRef.current);
    if (quoteRef.current) ioQuote.observe(quoteRef.current);
    if (articlesRef.current) ioArticles.observe(articlesRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hero) {
        hero.removeEventListener("wheel", onHeroWheel);
        hero.removeEventListener("touchstart", onHeroTouchStart);
        hero.removeEventListener("touchend", onHeroTouchEnd);
      }
      if (notesEl) notesEl.removeEventListener("wheel", onNotesWheel);
      ioIntro.disconnect();
      ioNotes.disconnect();
      ioDetails.disconnect();
      ioWhere.disconnect();
      ioQuote.disconnect();
      ioArticles.disconnect();
    };
  }, [goToStep]);

  /* ── Derived ─────────────────────────────────────────────────────────── */
  const activeBgImage = noteImages[activeNote] || null;

  const handleNoteChange = (i) => {
    if (i === activeNote || animLock.current) return;
    activeNoteRef.current = i;
    setNoteFading(true);
    setTimeout(() => {
      setActiveNote(i);
      setNoteFading(false);
    }, 220);
  };

  const notes = [
    { label: "Colour", content: "Deep Gold." },
    {
      label: "Nose",
      content:
        "Zesty, ripe fruits and caramelised almonds. Lovely rich oak notes with hints of cinnamon and a distinctive herbal zing.",
    },
    {
      label: "Taste",
      content:
        "Indulgent layers of toasted oak, creamy vanilla toffee and silky tannin. Sporadic bursts of spice and sherbet lemons with crunchy green apple and warming earthy tones.",
    },
    { label: "Finish", content: "Long lasting oak." },
  ];

  const relatedWhiskies = [
    { age: "23", name: "Grand Cru", subtitle: "year old" },
    { age: "26", name: "Grande Couronne", subtitle: "year old" },
    { age: "18", name: "Small Batch Eighteen", subtitle: "year old" },
    { age: "15", name: "Solera Fifteen", subtitle: "year old" },
  ];

  /* ── Hero step CSS transforms  (mirrors GSAP .to() in globals.js) ────── */
  const titleStyle = {
    transform: heroStep >= 1 ? "translateY(-100vh)" : "translateY(0)",
    transition: "transform 1s cubic-bezier(0.098,0.496,0.504,1)",
    opacity: heroStep >= 1 ? 0 : 1,
  };
  const bottleStyle = {
    transform:
      heroStep === 0
        ? "translateY(0)"
        : heroStep === 1
          ? "translateY(-65vh)"
          : "translateY(-220vh)",
    transition: "transform 1s cubic-bezier(0.098,0.496,0.504,1)",
  };
  const teaserStyle = {
    transform: heroStep >= 1 ? "translateY(-100vh)" : "translateY(0)",
    transition: "transform 1s cubic-bezier(0.098,0.496,0.504,1)",
    opacity: heroStep >= 1 ? 0 : 1,
  };
  const longDescStyle = {
    transform: heroStep >= 2 ? "translateY(-70vh)" : "translateY(0vh)",
    opacity: heroStep >= 2 ? 1 : 0,
    transition:
      "transform 1s cubic-bezier(0.098,0.496,0.504,1), opacity 0.5s ease",
    pointerEvents: heroStep >= 2 ? "auto" : "none",
  };

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy:        #0D101E;
          --navy-light:  #151929;
          --gold:        #C8A96E;
          --gold-pale:   #E8D5A8;
          --white:       #F5F0E8;
          --blush:       #E8A0A8;
          --muted:       rgba(245,240,232,0.5);
          --display:     'Cormorant Garamond', serif;
          --body:        'Josefin Sans', sans-serif;
          --ease-custom: cubic-bezier(0.098,0.496,0.504,1);
        }

        /* ── ROOT */
        .gy-root { background: var(--navy); color: var(--white); font-family: var(--body); font-weight: 300; overflow-x: hidden; min-height: 100vh; }

        /* ── NAV BAR
           Screenshot match:
           LEFT  = "Matrix Petroleum." wordmark text (white, serif)
           CENTRE = stag SVG icon only — fades out + slides up when scrolled
           RIGHT  = hamburger ≡ lines only                                          */
        .gy-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 60px;
          padding: 0 28px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          transition: background 0.4s, backdrop-filter 0.4s;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .gy-nav.scrolled {
          background: rgba(8,10,18,0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        /* LEFT — wordmark "Matrix Petroleum." */
        .gy-nav-left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .gy-nav-wordmark {
          font-family: var(--display);
          font-size: 19px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: .04em;
          color: var(--white);
          white-space: nowrap;
          line-height: 1;
          user-select: none;
        }
        .gy-nav-wordmark::after { content: '.'; }

        /* CENTRE — stag icon, fades on scroll */
        .gy-nav-logo-wrap {
          justify-self: center;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .gy-nav-logo-wrap.scrolled-hide {
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
        }
        .gy-nav-stag {
          width: 30px;
          height: 36px;
          color: var(--white);
          display: block;
        }

        /* RIGHT — hamburger */
        .gy-nav-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        /* Register btn only lives inside menu panel — hidden in nav bar */
        .gy-nav-register-btn { display: none; }

        /* ── HAMBURGER — 3 clean lines, no text label */
        .gy-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px 6px;
          z-index: 201;
          width: 36px;
          height: 36px;
        }
        .gy-ham-line {
          display: block;
          width: 24px;
          height: 1px;
          background: var(--white);
          transition: transform .35s var(--ease-custom), opacity .2s ease;
          transform-origin: center;
        }
        /* open → X */
        .gy-hamburger.open .gy-ham-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .gy-hamburger.open .gy-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .gy-hamburger.open .gy-ham-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ── BACKDROP — darkens page when menu is open */
        .gy-menu-backdrop {
          position: fixed; inset: 0; z-index: 148;
          background: rgba(5,7,15,.6);
          opacity: 0; pointer-events: none;
          transition: opacity .45s ease;
        }
        .gy-menu-backdrop.visible { opacity: 1; pointer-events: auto; }

        /* ── SLIDE PANEL — enters from right edge, pushes left
           mirrors: main--navigation translateX + .show/.hide classes              */
        .gy-menu-panel-wrap {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 149;
          width: min(540px, 100vw);
          background: rgba(10,12,22,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid rgba(200,169,110,.15);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform .5s var(--ease-custom);
          overflow: hidden;
        }
        .gy-menu-panel-wrap.open { transform: translateX(0); }

        /* Panel header: logo left, X right */
        .gy-menu-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(200,169,110,.12);
          flex-shrink: 0;
          height: 72px;
        }
        .gy-menu-head-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gy-menu-stag {
          width: 24px;
          height: 28px;
          color: var(--gold);
        }
        .gy-menu-head-wordmark {
          font-family: var(--display);
          font-size: 18px;
          letter-spacing: .15em;
          color: var(--gold);
          text-transform: uppercase;
        }
        .gy-menu-close {
          width: 38px; height: 38px;
          background: transparent;
          border: 1px solid rgba(200,169,110,.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: border-color .2s, background .2s;
          flex-shrink: 0;
        }
        .gy-menu-close:hover { border-color: var(--gold); background: rgba(200,169,110,.08); }
        .gy-menu-close span {
          position: absolute;
          width: 16px; height: 1px;
          background: var(--gold);
        }
        .gy-menu-close span:nth-child(1) { transform: rotate(45deg); }
        .gy-menu-close span:nth-child(2) { transform: rotate(-45deg); }

        /* Breadcrumb strip — appears when sub-menu is open */
        .gy-menu-breadcrumb-wrap {
          height: 0;
          overflow: hidden;
          transition: height .25s ease;
          flex-shrink: 0;
          border-bottom: 1px solid transparent;
        }
        .gy-menu-breadcrumb-wrap.visible {
          height: 48px;
          border-bottom-color: rgba(200,169,110,.1);
        }
        .gy-menu-breadcrumb { padding: 0 40px; }
        .gy-menu-breadcrumb ol { display: flex; list-style: none; align-items: center; gap: 16px; height: 48px; }
        .gy-breadcrumb-link {
          background: transparent; border: none;
          font-family: var(--body); font-size: 10px;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--gold); cursor: pointer;
          transition: opacity .2s;
          display: flex; align-items: center; gap: 6px;
        }
        .gy-breadcrumb-link:hover { opacity: .7; }
        .gy-crumb-current {
          font-family: var(--body); font-size: 10px;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--muted);
        }

        /* Panel body — holds both columns side by side */
        .gy-menu-body {
          flex: 1;
          display: flex;
          overflow: hidden;
          position: relative;
        }

        /* FIRST COLUMN — top-level (mirrors .menu--top-level.first-column) */
        .gy-menu-first-col {
          list-style: none;
          width: 100%;
          padding: 16px 0;
          overflow-y: auto;
          flex-shrink: 0;
          transition: transform .4s var(--ease-custom), opacity .3s ease;
        }
        /* When a sub-item is open, slide first column further left (peek effect) */
        .gy-menu-first-col.sub-open {
          transform: translateX(-20px);
          opacity: 0.4;
        }

        /* SECOND COLUMN — sub-items (mirrors .second-column in-from-right) */
        .gy-menu-second-col {
          list-style: none;
          position: absolute;
          inset: 0;
          padding: 16px 0;
          overflow-y: auto;
          transform: translateX(60px);
          opacity: 0;
          pointer-events: none;
          transition: transform .35s var(--ease-custom), opacity .3s ease;
        }
        .gy-menu-second-col.visible {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Staggered item entrance (mirrors menu.js .animate() setTimeout) */
        .gy-menu-col .gy-menu-item {
          opacity: 0;
          transform: translateX(32px);
          transition: opacity .4s ease, transform .4s var(--ease-custom);
        }
        .gy-menu-first-col.visible .gy-menu-item,
        .gy-menu-second-col.visible .gy-menu-item {
          opacity: 1;
          transform: translateX(0);
        }

        /* Item button / link */
        .gy-menu-item-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 17px 40px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(200,169,110,.08);
          font-family: var(--display);
          font-size: 26px;
          font-weight: 300;
          color: var(--white);
          text-decoration: none;
          cursor: pointer;
          text-align: left;
          transition: color .2s, background .2s, padding-left .2s;
        }
        .gy-menu-item-btn:hover { color: var(--gold); padding-left: 48px; background: rgba(200,169,110,.03); }
        .gy-menu-item.active .gy-menu-item-btn { color: var(--gold); }

        .gy-menu-child-btn { font-size: 20px; }

        .gy-menu-item-label { flex: 1; }
        .gy-menu-item-arrow {
          font-size: 20px;
          color: rgba(200,169,110,.4);
          transition: transform .3s var(--ease-custom), color .2s;
          display: inline-block;
        }
        .gy-menu-item-arrow.rotated { transform: rotate(90deg); color: var(--gold); }

        /* Panel footer */
        .gy-menu-footer {
          padding: 24px 40px;
          border-top: 1px solid rgba(200,169,110,.12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 16px;
        }
        .gy-menu-footer-disc {
          font-size: 10px;
          letter-spacing: .14em;
          color: rgba(245,240,232,.3);
          text-transform: uppercase;
        }

        /* ══════════════════════════════════════════════════════════════════
           SECTION STYLES — rebuilt from screenshots
           ══════════════════════════════════════════════════════════════════ */

        /* ── HERO (section 1)
           Full-viewport dark sky background, video plays fullscreen.
           Box + text overlay centred. Sakura petals float.                   */
        .gy-hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #070c1a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gy-hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .gy-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(5,8,20,.35);
          z-index: 1; pointer-events: none;
        }
        /* starfield dots */
        .gy-hero-grid {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,.35) 1px, transparent 1px);
          background-size: 120px 120px, 80px 80px;
          background-position: 0 0, 40px 40px;
          opacity: .4;
        }
        .gy-hero-bg-pattern { display: none; }

        /* Sakura petals — large, organic, scattered */
        @keyframes sakuraFloat {
          0%   { transform: translateY(0)   rotate(0deg)   translateX(0);     opacity: 0; }
          8%   { opacity: .9; }
          90%  { opacity: .7; }
          100% { transform: translateY(110vh) rotate(540deg) translateX(60px); opacity: 0; }
        }
        .gy-sakura-petal {
          position: absolute; top: -40px;
          border-radius: 50% 10% 50% 10%;
          background: linear-gradient(135deg, #f4a7b9, #e07090, #f9c8d4);
          animation: sakuraFloat linear infinite;
          pointer-events: none; z-index: 2;
          filter: blur(.3px);
        }

        /* Centre content: product text overlaid on box image */
        .gy-hero-centre {
          position: relative; z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          height: 100%;
        }
        /* Bottle+box image centred */
        .gy-hero-box-img {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -54%);
          width: auto;
          height: 80vh;
          max-height: 700px;
          object-fit: contain;
          z-index: 3;
          pointer-events: none;
        }
        /* Placeholder box if no image */
        .gy-hero-box-placeholder {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -54%);
          width: 340px; height: 500px;
          background: linear-gradient(160deg,#0a1628,#1a2540);
          border: 1px solid rgba(200,169,110,.2);
          z-index: 3;
          display: flex; align-items: center; justify-content: center;
        }
        /* Text overlaid on box */
        .gy-hero-text {
          position: absolute;
          bottom: 14vh; left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          text-align: center;
          white-space: nowrap;
          pointer-events: none;
        }
        .gy-hero-age {
          font-family: var(--display);
          font-size: clamp(28px, 4.5vw, 64px);
          font-weight: 400;
          font-style: italic;
          color: var(--white);
          letter-spacing: .04em;
          line-height: 1;
        }
        .gy-hero-name {
          font-family: var(--display);
          font-size: clamp(22px, 3.5vw, 48px);
          font-weight: 400;
          color: var(--white);
          letter-spacing: .12em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .gy-hero-sub {
          font-family: var(--body);
          font-size: clamp(9px, 1vw, 13px);
          letter-spacing: .35em;
          text-transform: uppercase;
          color: rgba(245,240,232,.55);
          margin-top: 6px;
        }
        /* Big CAPTURE THE MOMENT */
        .gy-hero-tagline-big {
          font-family: var(--display);
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 400;
          letter-spacing: .02em;
          color: var(--white);
          line-height: .95;
          text-align: center;
          position: absolute;
          bottom: 6vh; left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          pointer-events: none;
          white-space: nowrap;
        }
        .gy-hero-tagline-big .italic-line {
          font-style: italic;
          display: block;
        }

        /* ── SECTION 2: PRODUCT REVEAL
           Left half: dark navy with box image
           Right half: white/light with solo bottle + info                    */
        .gy-product-reveal {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
          .gy-product-center-bottle {
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: auto;
  z-index: 10;
  filter: drop-shadow(0 20px 80px rgba(0, 0, 0, 0.6));
  pointer-events: none;
  will-change: transform;   
  transition: transform 0.1s linear;  
}
        .gy-product-left {
          background: linear-gradient(135deg, #0d1628 0%, #1a2d50 60%, #0a1020 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 100vh;
        }
        /* starfield in left half */
        .gy-product-left::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: .35;
          pointer-events: none;
        }
        .gy-product-left-img {
          position: relative; z-index: 2;
          width: 85%;
          height: 90%;
          object-fit: contain;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,.6));
        }
        .gy-product-left-placeholder {
          position: relative; z-index: 2;
          width: 340px; height: 500px;
          background: linear-gradient(160deg,#0a1628,#1a2540);
          border: 1px solid rgba(200,169,110,.3);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 14px; color: var(--gold);
          letter-spacing: .1em; text-align: center;
        }
        .gy-product-right {
          background: #f5f4f0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 0 6vw 60px;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }
        .gy-product-right-img {
          position: absolute;
          bottom: 0; left: 8%;
          height: 95%;
          width: auto;
          object-fit: contain;
          z-index: 1;
        }
        .gy-product-right-placeholder {
          position: absolute;
          bottom: 0; left: 8%;
          width: 200px; height: 480px;
          background: linear-gradient(180deg,rgba(200,169,110,.8),rgba(140,100,40,.9));
          border-radius: 6px 6px 2px 2px;
          z-index: 1;
        }
        .gy-product-info {
          position: relative; z-index: 2;
          align-self: flex-end;
          text-align: left;
          margin-left: auto;
          max-width: 340px;
          padding-bottom: 40px;
        }
        .gy-product-age {
          font-family: var(--display);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 300;
          color: #1a1a1a;
          letter-spacing: .04em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .gy-product-name {
          font-family: var(--body);
          font-size: clamp(11px, 1.2vw, 15px);
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #1a1a1a;
          margin-bottom: 32px;
        }
        /* Gold-bordered descriptor pills */
        .gy-product-pills {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #c8a96e;
        }
        .gy-product-pill {
          padding: 12px 18px;
          font-family: var(--body);
          font-size: 13px;
          color: #c8a96e;
          letter-spacing: .04em;
          border-bottom: 1px solid #c8a96e;
        }
        .gy-product-pill:last-child { border-bottom: none; }

        /* ── SECTION 3: CAPTURE THE MOMENT
           Full viewport, dark starfield, box open in centre, big text below  */
        .gy-capture {
          width: 100vw;
          height: 100vh;
          position: relative;
          background: radial-gradient(ellipse at 50% 30%, #1a1e3a 0%, #080c1e 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .gy-capture-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.45) 1px, transparent 1px);
          background-size: 110px 110px;
          opacity: .3; pointer-events: none;
        }
        .gy-capture-box-img {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -52%);
          height: 72vh; width: auto;
          object-fit: contain; z-index: 2;
          pointer-events: none;
        }
        .gy-capture-box-placeholder {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -52%);
          width: 300px; height: 480px;
          background: linear-gradient(160deg,#0f1830,#1d2e50);
          border: 1px solid rgba(200,169,110,.2);
          z-index: 2;
        }
        .gy-capture-text {
          position: absolute;
          bottom: 8vh; left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          text-align: center;
          white-space: nowrap;
        }
        .gy-capture-line1 {
          font-family: var(--display);
          font-size: clamp(48px, 8.5vw, 120px);
          font-weight: 400;
          font-style: italic;
          color: var(--white);
          line-height: .9;
          display: block;
        }
        .gy-capture-line2 {
          font-family: var(--display);
          font-size: clamp(48px, 8.5vw, 120px);
          font-weight: 400;
          font-style: normal;
          color: var(--white);
          line-height: .9;
          display: block;
        }

        /* ── SECTION 4: MAGICAL MOMENT (fleeting beauty)
           Full viewport dark, bottle surrounded by pink petals, headline+body left */
        .gy-magical {
          width: 100vw;
          min-height: 100vh;
          position: relative;
          background: radial-gradient(ellipse at 60% 50%, #0e1230 0%, #050810 70%);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .gy-magical-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.4) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: .25; pointer-events: none;
        }
        /* Big petals behind bottle */
        .gy-magical-petal {
          position: absolute;
          border-radius: 50% 8% 50% 8%;
          background: linear-gradient(135deg, #f4a0b8, #e06888, #f8b8c8);
          pointer-events: none; z-index: 1;
          filter: blur(.5px);
        }
        .gy-magical-bottle-img {
          position: absolute;
          bottom: 0;
          left: 50%; transform: translateX(-40%);
          height: 95vh; width: auto;
          object-fit: contain; z-index: 2;
        }
        .gy-magical-bottle-placeholder {
          position: absolute;
          bottom: 0; left: 55%;
          width: 160px; height: 460px;
          background: linear-gradient(180deg,rgba(200,169,110,.8),rgba(140,100,40,.9));
          border-radius: 6px 6px 2px 2px; z-index: 2;
        }
        .gy-magical-content {
          position: relative; z-index: 3;
          padding: 0 6vw;
          max-width: 60%;
        }
        .gy-magical-title {
          font-family: var(--display);
          font-size: clamp(28px, 5vw, 72px);
          font-weight: 400;
          text-transform: uppercase;
          color: var(--white);
          line-height: 1.05;
          margin-bottom: 32px;
          letter-spacing: .02em;
        }
        .gy-magical-body {
          font-family: var(--body);
          font-size: clamp(12px, 1.3vw, 16px);
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--white);
          line-height: 1.75;
          max-width: 620px;
        }

        /* ── SECTION 5: LIMITED EDITION (product + text)
           Dark navy. Big ALL-CAPS text left, bottle+box right                */
        .gy-limited {
          width: 100vw;
          min-height: 100vh;
          background: #0a0e1e;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .gy-limited-content {
          position: relative; z-index: 2;
          padding: 80px 6vw;
          width: 45%;
          flex-shrink: 0;
        }
        .gy-limited-body {
          font-family: var(--display);
          font-size: clamp(20px, 2.4vw, 32px);
          font-weight: 400;
          text-transform: uppercase;
          color: var(--white);
          line-height: 1.5;
          letter-spacing: .04em;
        }
        .gy-limited-imgs {
          position: relative; z-index: 2;
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
        }
        .gy-limited-product-img {
          height: 95%; width: auto;
          object-fit: contain;
          position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
        }
        .gy-limited-product-placeholder {
          position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 380px; height: 520px;
          background: linear-gradient(160deg,#0a1628,#1a2540);
          border: 1px solid rgba(200,169,110,.2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 14px; color: var(--gold);
          letter-spacing: .08em; text-align: center; padding: 20px;
        }

        /* ── SECTION 6: TASTING NOTES
           Dark navy (#0a0e1e). Header "THE TASTING NOTES" small caps top-left.
           2×2 grid: COLOUR / NOSE / TASTE / FINISH
           Active note title highlighted blue, description below it.          */
        .gy-tasting {
          width: 100vw;
          min-height: 100vh;
          background: #080c1c;
          padding: 80px 8vw;
          position: relative;
        }
        .gy-tasting-label {
          font-family: var(--body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--white);
          margin-bottom: 60px;
          display: block;
        }
        .gy-tasting-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 60px;
          column-gap: 8vw;
        }
        .gy-tasting-note {}
        .gy-tasting-note-title {
          font-family: 'Arial', sans-serif;
          font-size: clamp(48px, 8vw, 110px);
          font-weight: 800;
          text-transform: uppercase;
          color: var(--white);
          line-height: .95;
          margin-bottom: 12px;
          letter-spacing: -.01em;
          display: block;
        }
        /* Active note title gets blue highlight box */
        .gy-tasting-note.active .gy-tasting-note-title {
          background: transparent;
          display: inline-block;
          padding: 4px 10px 4px 0;
        }
        .gy-tasting-note-desc {
          font-family: var(--body);
          font-size: 14px;
          line-height: 1.7;
          color: var(--white);
          max-width: 440px;
          margin-top: 6px;
        }
        /* Blue highlight on desc when active */
        .gy-tasting-note.active .gy-tasting-note-desc {
          background: #1a3de8;
          padding: 4px 8px;
          display: inline;
        }
        .gy-tasting-note-short {
          font-family: var(--body);
          font-size: 14px;
          color: rgba(245,240,232,.6);
          margin-top: 8px;
          display: block;
        }

        /* ── REGISTER FORM (form-api.js) */
        .gy-form-overlay { position: fixed; inset: 0; z-index: 300; pointer-events: none; }
        .gy-form-overlay.show { pointer-events: auto; }
        .gy-form-overlay::before { content:''; position:absolute;inset:0;background:rgba(5,7,15,.75);opacity:0;transition:opacity .4s;pointer-events:none; }
        .gy-form-overlay.show::before { opacity:1; }
        .gy-form-container { position: absolute; right: 0; top: 0; bottom: 0; width: min(520px, 100vw); background: var(--navy-light); border-left: 1px solid rgba(200,169,110,.2); padding: 60px 48px; overflow-y: auto; transform: translateX(100%); transition: transform .5s var(--ease-custom); }
        .gy-form-container.open { transform: translateX(0); }
        .gy-form-close { position: absolute; top: 24px; right: 24px; background: transparent; border: 1px solid rgba(200,169,110,.3); color: var(--gold); width: 36px; height: 36px; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .gy-form-close:hover { background: rgba(200,169,110,.1); }
        .gy-form-title { font-family: var(--display); font-size: 40px; font-weight: 300; margin-bottom: 8px; }
        .gy-form-subtitle { font-size: 11px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; margin-bottom: 40px; }
        .gy-form-error-msg { background: rgba(232,80,80,.15); border: 1px solid rgba(232,80,80,.4); padding: 12px 16px; font-size: 12px; color: #f88; margin-bottom: 24px; }
        .gy-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .gy-form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .gy-form-field label { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); }
        .gy-form-field input, .gy-form-field select { background: rgba(245,240,232,.05); border: 1px solid rgba(200,169,110,.2); color: var(--white); padding: 12px 14px; font-family: var(--body); font-size: 13px; outline: none; transition: border-color .2s; }
        .gy-form-field input:focus, .gy-form-field select:focus { border-color: var(--gold); }
        .gy-form-field select option { background: var(--navy); color: var(--white); }
        .gy-form-field.error input, .gy-form-field.error select { border-color: #f66; }
        .gy-dob-row { display: flex; align-items: center; gap: 8px; }
        .gy-dob-row input { width: 60px; text-align: center; }
        .gy-dob-row input:last-child { width: 80px; }
        .gy-dob-row span { color: var(--muted); }
        .gy-form-checkboxes { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
        .gy-check-label { display: flex; align-items: flex-start; gap: 12px; font-size: 12px; line-height: 1.6; color: rgba(245,240,232,.7); cursor: pointer; }
        .gy-check-label.error { color: #f88; }
        .gy-check-label input[type="checkbox"] { margin-top: 2px; accent-color: var(--gold); flex-shrink: 0; }
        .gy-check-label a { color: var(--gold); }
        .gy-submit-btn { width: 100%; padding: 16px; font-size: 12px; letter-spacing: .2em; }
        .gy-submit-btn.loading { opacity: .6; cursor: not-allowed; }
        .gy-form-thank-you { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; gap: 24px; }
        .gy-form-ty-icon { font-family: var(--display); font-size: 80px; color: var(--gold); opacity: .4; }
        .gy-form-thank-you h2 { font-family: var(--display); font-size: 36px; font-weight: 300; }
        .gy-form-thank-you p { font-size: 14px; line-height: 1.8; color: var(--muted); max-width: 320px; }

        /* ── HERO */
        .gy-hero { min-height: 100vh; width: 100%; position: relative; overflow: hidden; background: radial-gradient(ellipse at 70% 40%, #1a1330, var(--navy) 60%); cursor: default; }
        .gy-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; pointer-events: none; }
        .gy-hero-overlay { position: absolute; inset: 0; background: rgba(10,12,24,.55); z-index: 1; pointer-events: none; }
        .gy-hero-bg-pattern { position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(circle at 20% 80%, rgba(232,160,168,.08), transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,169,110,.06), transparent 50%); }
        .gy-hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(200,169,110,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,.04) 1px, transparent 1px); background-size: 80px 80px; }

        @keyframes sakuraFall { 0% { transform: translateY(-60px) rotate(0deg) translateX(0); opacity: 0; } 10% { opacity: .7; } 90% { opacity: .4; } 100% { transform: translateY(110vh) rotate(720deg) translateX(40px); opacity: 0; } }
        .gy-sakura-petal { position: absolute; top: -20px; border-radius: 50% 0 50% 0; background: linear-gradient(135deg, var(--blush), rgba(232,160,168,.5)); animation: sakuraFall linear infinite; pointer-events: none; z-index: 1; }

        .gy-hero-content { position: absolute; z-index: 5; top: 50%; left: 50%; transform: translate(-50%, -44%); text-align: center; padding: 0 20px; width: 100%; opacity: 0; transition: opacity 1.2s ease; pointer-events: none; }
        .gy-hero-content.visible { opacity: 1; }
        .gy-hero-title-wrap { will-change: transform, opacity; }
        .gy-hero-eyebrow { font-size: 11px; letter-spacing: .3em; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; }
        .gy-hero-title { font-family: var(--display); font-size: clamp(56px,9vw,120px); font-weight: 300; line-height: .9; color: var(--white); margin-bottom: 8px; }
        .gy-hero-title em { font-style: italic; color: var(--gold); }
        .gy-hero-subtitle { font-family: var(--display); font-size: clamp(14px,2vw,20px); letter-spacing: .2em; color: var(--muted); text-transform: uppercase; margin-bottom: 40px; }
        .gy-hero-tagline { font-family: var(--display); font-size: clamp(16px,2.2vw,22px); font-style: italic; color: var(--gold-pale); margin-bottom: 48px; }
        .gy-hero-badges { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; }
        .gy-badge { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .gy-badge-value { font-family: var(--display); font-size: 32px; font-weight: 600; color: var(--gold); }
        .gy-badge-label { font-size: 10px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }
        .gy-badge-divider { width: 1px; height: 50px; background: rgba(200,169,110,.3); align-self: center; }

        .gy-hero-bottle { position: absolute; bottom: 0; left: 50%; z-index: 4; will-change: transform; }
        .gy-bottle-img { width: auto; max-width: 180px; height: 380px; object-fit: contain; filter: drop-shadow(0 0 40px rgba(200,169,110,.25)) drop-shadow(0 20px 60px rgba(0,0,0,.6)); }
        .gy-bottle-placeholder { width: 110px; height: 320px; background: linear-gradient(180deg, rgba(200,169,110,.9), rgba(160,130,70,.8) 30%, rgba(200,169,110,.7) 60%, rgba(120,90,40,.9)); border-radius: 8px 8px 4px 4px; box-shadow: 0 0 60px rgba(200,169,110,.25), 0 20px 60px rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; }
        .gy-bottle-placeholder-label { font-family: var(--display); font-size: 11px; letter-spacing: .1em; color: var(--gold); line-height: 1.6; text-align: center; padding: 12px; background: rgba(13,16,30,.7); border: 1px solid rgba(200,169,110,.3); }

        .gy-hero-teaser { position: absolute; bottom: 80px; left: 0; right: 0; z-index: 6; will-change: transform, opacity; display: flex; justify-content: center; gap: 40px; pointer-events: none; }
        .gy-teaser-pill { background: rgba(13,16,30,.7); border: 1px solid rgba(200,169,110,.3); backdrop-filter: blur(8px); padding: 12px 28px; text-align: center; }
        .gy-teaser-age { font-family: var(--display); font-size: 40px; font-weight: 300; color: var(--gold); line-height: 1; }
        .gy-teaser-label { font-size: 10px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; margin-top: 4px; }

        .gy-hero-long-desc { position: absolute; z-index: 7; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 700px; text-align: center; padding: 60px 40px; will-change: transform, opacity; }
        .gy-hero-long-desc p { font-family: var(--display); font-size: clamp(28px,4vw,56px); font-weight: 300; font-style: italic; color: var(--white); line-height: 1.2; }
        .gy-hero-long-desc p span { font-style: normal; color: var(--gold); }

        @keyframes scrollBounce { 0%,100%{transform:rotate(45deg) translateY(0);opacity:.5} 50%{transform:rotate(45deg) translateY(6px);opacity:1} }
        .gy-scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 8; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .gy-scroll-text { font-size: 9px; letter-spacing: .25em; color: var(--muted); text-transform: uppercase; }
        .gy-scroll-arrow { width: 20px; height: 20px; border-right: 1px solid var(--gold); border-bottom: 1px solid var(--gold); transform: rotate(45deg); animation: scrollBounce 2s ease-in-out infinite; }

        .gy-step-dots { position: absolute; right: 32px; top: 50%; transform: translateY(-50%); z-index: 9; display: flex; flex-direction: column; gap: 10px; }
        .gy-step-dot { width: 6px; height: 6px; border-radius: 50%; border: 1px solid rgba(200,169,110,.5); background: transparent; cursor: pointer; transition: background .3s, transform .3s; }
        .gy-step-dot.active { background: var(--gold); transform: scale(1.4); }

        /* ── REVEAL ANIMATIONS (home.js ScrollTrigger equivalents) */
        .gy-reveal { opacity: 0; transition: opacity .7s ease, transform .7s var(--ease-custom); }
        .gy-from-left   { transform: translateX(-200px); }
        .gy-from-right  { transform: translateX(200px); }
        .gy-from-bottom { transform: translateY(200px); }
        .gy-from-top50  { transform: translateY(50px); }
        .gy-stagger-1 { transition-delay: .1s; }
        .gy-stagger-2 { transition-delay: .2s; }
        .gy-stagger-3 { transition-delay: .3s; }
        .gy-stagger-4 { transition-delay: .4s; }
        .gy-reveal.in { opacity: 1; transform: translate(0); }

        /* ── SHARED */
        .gy-section-label { font-size: 10px; letter-spacing: .3em; color: var(--gold); text-transform: uppercase; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
        .gy-section-label::before { content:''; display:block; width:40px; height:1px; background:var(--gold); }
        .gy-cta-btn { background: var(--gold); color: var(--navy); border: none; padding: 14px 36px; font-family: var(--body); font-size: 11px; letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: background .2s; }
        .gy-cta-btn:hover { background: var(--gold-pale); }

        /* ── INTRO */
        .gy-intro { width: 100vw; background: var(--navy); padding: 120px 8vw; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .gy-intro-heading { font-family: var(--display); font-size: clamp(36px,5vw,64px); font-weight: 300; line-height: 1.05; margin-bottom: 32px; }
        .gy-intro-heading em { font-style: italic; color: var(--gold); }
        .gy-intro-body { font-size: 14px; line-height: 1.85; color: rgba(245,240,232,.75); letter-spacing: .04em; }
        .gy-bottle-visual { position: relative; display: flex; align-items: center; justify-content: center; height: 480px; }
        .gy-bottle-glow { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(200,169,110,.12), transparent 70%); pointer-events: none; }
        .gy-intro-bottle-img { position: relative; z-index: 2; width: auto; max-width: 220px; height: 420px; object-fit: contain; filter: drop-shadow(0 0 40px rgba(200,169,110,.25)) drop-shadow(0 20px 60px rgba(0,0,0,.6)); }
        .gy-intro-placeholder { position: relative; z-index: 2; width: 120px; height: 360px; background: linear-gradient(180deg,rgba(200,169,110,.9),rgba(160,130,70,.8) 30%,rgba(200,169,110,.7) 60%,rgba(120,90,40,.9)); border-radius: 8px 8px 4px 4px; box-shadow: 0 0 60px rgba(200,169,110,.25),0 20px 60px rgba(0,0,0,.5); display:flex;align-items:center;justify-content:center; }
        .gy-intro-placeholder-label { font-family:var(--display);font-size:11px;letter-spacing:.1em;color:var(--gold);line-height:1.6;text-align:center;padding:12px;background:rgba(13,16,30,.7);border:1px solid rgba(200,169,110,.3); }

        /* ── YOZAKURA */
        .gy-yozakura { width: 100vw; background: linear-gradient(180deg, var(--navy), #0a0d1a); padding: 120px 8vw; text-align: center; position: relative; overflow: hidden; }
        .gy-section-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; filter: brightness(.35); }
        .gy-yozakura-deco { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 100%, rgba(232,160,168,.08), transparent 60%); pointer-events: none; }
        .gy-yozakura-kanji { font-family: var(--display); font-size: clamp(80px,15vw,180px); font-weight: 300; color: rgba(200,169,110,.08); position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); white-space: nowrap; pointer-events: none; letter-spacing: .1em; }
        .gy-yozakura-content { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; }
        .gy-yozakura-title { font-family: var(--display); font-size: clamp(40px,6vw,80px); font-weight: 300; font-style: italic; color: var(--white); margin-bottom: 32px; line-height: 1.1; }
        .gy-yozakura-body { font-size: 14px; line-height: 2; color: rgba(245,240,232,.7); letter-spacing: .05em; }

        /* ── TASTING NOTES */
        .gy-notes { width: 100vw; background-color: var(--navy-light); background-size: cover; background-position: center; padding: 100px 8vw; border-top: 1px solid rgba(200,169,110,.15); border-bottom: 1px solid rgba(200,169,110,.15); position: relative; }
        .gy-notes::before { content: ''; position: absolute; inset: 0; background: rgba(10,12,22,.72); pointer-events: none; z-index: 0; }
        .gy-notes-inner { width: 100%; position: relative; z-index: 1; }
        .gy-notes-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; flex-wrap: wrap; gap: 20px; }
        .gy-notes-title { font-family: var(--display); font-size: clamp(32px,5vw,60px); font-weight: 300; }
        .gy-notes-tabs { display: flex; border: 1px solid rgba(200,169,110,.3); }
        .gy-note-tab { padding: 10px 20px; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; background: transparent; border: none; color: var(--muted); cursor: pointer; border-right: 1px solid rgba(200,169,110,.2); transition: all .2s; font-family: var(--body); }
        .gy-note-tab:last-child { border-right: none; }
        .gy-note-tab.active { background: var(--gold); color: var(--navy); }
        .gy-note-tab:hover:not(.active) { background: rgba(200,169,110,.08); color: var(--gold); }
        .gy-note-display { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; transition: opacity .22s ease; }
        .gy-note-display.fading { opacity: 0; }
        .gy-note-label { font-family: var(--display); font-size: clamp(60px,10vw,120px); font-weight: 300; color: rgba(200,169,110,.2); line-height: 1; margin-bottom: -20px; }
        .gy-note-content { font-family: var(--display); font-size: clamp(20px,2.5vw,32px); font-weight: 300; font-style: italic; line-height: 1.5; color: var(--white); }
        .gy-note-accent-line { width: 60px; height: 1px; background: var(--gold); margin: 24px 0; }
        .gy-note-visual { height: 300px; position: relative; overflow: hidden; border: 1px solid rgba(200,169,110,.12); background: rgba(200,169,110,.04); }
        .gy-note-visual img { width: 100%; height: 100%; object-fit: cover; transition: opacity .22s ease; }
        .gy-note-visual img.fading { opacity: 0; }
        .gy-note-visual-inner { width: 140px; height: 140px; border-radius: 50%; border: 1px solid rgba(200,169,110,.25); display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .gy-note-visual-dot { width: 60px; height: 60px; border-radius: 50%; background: radial-gradient(circle, var(--gold), rgba(200,169,110,.3)); opacity: .4; }
        .gy-note-slides { display: flex; gap: 12px; margin-top: 48px; flex-wrap: wrap; }
        .gy-note-slide { position: relative; width: 100px; height: 70px; cursor: pointer; overflow: hidden; border: 2px solid transparent; opacity: .3; transition: opacity .25s, border-color .25s; flex-shrink: 0; background: rgba(200,169,110,.08); display: flex; align-items: center; justify-content: center; }
        .gy-note-slide.active { opacity: 1; border-color: var(--gold); }
        .gy-note-slide:hover { opacity: .8; }
        .gy-note-slide.active:hover { opacity: 1; }
        .gy-note-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gy-note-slide-label { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(13,16,30,.75); font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--gold-pale); text-align: center; padding: 4px 2px; }

        /* ── QUOTE */
        .gy-quote { width: 100vw; background: var(--navy); padding: 100px 8vw; text-align: center; }
        .gy-quote-inner { max-width: 860px; margin: 0 auto; }
        .gy-quote-mark { font-family: var(--display); font-size: 80px; color: var(--gold); line-height: .5; margin-bottom: 32px; opacity: .5; }
        .gy-quote-text { font-family: var(--display); font-size: clamp(18px,2.5vw,28px); font-style: italic; font-weight: 300; line-height: 1.65; color: var(--white); margin-bottom: 32px; }
        .gy-quote-author { font-size: 11px; letter-spacing: .25em; color: var(--gold); text-transform: uppercase; }
        .gy-master-img { width: 100%; height: 320px; object-fit: cover; object-position: top; display: block; border: 1px solid rgba(200,169,110,.15); margin-bottom: 32px; }

        /* ── DETAILS */
        .gy-details { width: 100vw; background: var(--navy-light); padding: 100px 8vw; border-top: 1px solid rgba(200,169,110,.15); }
        .gy-details-inner { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .gy-details-heading { font-family: var(--display); font-size: clamp(36px,5vw,60px); font-weight: 300; margin-bottom: 40px; line-height: 1.1; }
        .gy-details-heading em { color: var(--gold); font-style: italic; }
        .gy-details-body { font-size: 14px; line-height: 1.9; color: rgba(245,240,232,.7); letter-spacing: .04em; margin-bottom: 48px; }
        .gy-details-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .gy-spec { border-top: 1px solid rgba(200,169,110,.25); padding-top: 16px; }
        .gy-spec-label { font-size: 10px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; margin-bottom: 6px; }
        .gy-spec-value { font-family: var(--display); font-size: 22px; font-weight: 300; }
        .gy-details-image { height: 500px; border: 1px solid rgba(200,169,110,.15); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; background: repeating-linear-gradient(-45deg,transparent,transparent 10px,rgba(200,169,110,.03) 10px,rgba(200,169,110,.03) 11px); }
        .gy-details-img { width: 100%; height: 100%; object-fit: cover; display: block; position: absolute; inset: 0; }
        .gy-box-visual { width: 200px; height: 220px; background: linear-gradient(135deg,rgba(200,169,110,.15),rgba(200,169,110,.05)); border: 1px solid rgba(200,169,110,.3); display: flex; align-items: center; justify-content: center; }
        .gy-box-inner { width: 80px; height: 160px; background: linear-gradient(180deg,rgba(200,169,110,.5),rgba(160,130,70,.4)); border-radius: 4px; box-shadow: 0 0 30px rgba(200,169,110,.2); }
        .gy-box-label { font-family: var(--display); font-size: 13px; letter-spacing: .15em; color: var(--gold-pale); text-transform: uppercase; text-align: center; }

        /* ── WHERE NEXT */
        .gy-where-next { width: 100vw; background: var(--navy); padding: 100px 8vw; border-top: 1px solid rgba(200,169,110,.15); }
        .gy-where-next-inner { width: 100%; }
        .gy-where-next-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; }
        .gy-where-next-title { font-family: var(--display); font-size: clamp(28px,4vw,48px); font-weight: 300; }
        .gy-wn-arrows { display: flex; gap: 12px; }
        .gy-wn-arrow { width: 44px; height: 44px; border: 1px solid rgba(200,169,110,.4); background: transparent; color: var(--gold); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; font-size: 16px; }
        .gy-wn-arrow:hover { background: rgba(200,169,110,.1); border-color: var(--gold); }
        .gy-whisky-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; }
        .gy-whisky-card { background: var(--navy-light); aspect-ratio: 1; position: relative; overflow: hidden; cursor: pointer; border: 1px solid rgba(200,169,110,.08); transition: border-color .3s; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 32px 24px; }
        .gy-whisky-card:hover { border-color: rgba(200,169,110,.4); }
        .gy-whisky-card-bg { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,16,30,.9), transparent 60%); transition: opacity .3s; }
        .gy-whisky-card:hover .gy-whisky-card-bg { opacity: .7; }
        .gy-whisky-card-pat { position: absolute; inset: 0; opacity: .04; background: repeating-linear-gradient(45deg,rgba(200,169,110,1),rgba(200,169,110,1) 1px,transparent 1px,transparent 20px); }
        .gy-whisky-card-cnt { position: relative; z-index: 2; text-align: center; }
        .gy-whisky-age { font-family: var(--display); font-size: 56px; font-weight: 300; color: var(--gold); line-height: 1; }
        .gy-whisky-name { font-family: var(--display); font-size: 18px; font-weight: 300; color: var(--white); line-height: 1.2; margin-top: 4px; }
        .gy-whisky-sub { font-size: 10px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; margin-top: 4px; }
        .gy-whisky-disc { margin-top: 16px; font-size: 10px; letter-spacing: .25em; text-transform: uppercase; color: var(--gold); border-bottom: 1px solid rgba(200,169,110,.4); padding-bottom: 2px; display: inline-block; opacity: 0; transition: opacity .2s; }
        .gy-whisky-card:hover .gy-whisky-disc { opacity: 1; }

        /* ── ARTICLES (articles.js) */
        .gy-articles { width: 100vw; background: var(--navy); padding: 100px 8vw; border-top: 1px solid rgba(200,169,110,.15); }
        .gy-articles-inner { width: 100%; }
        .gy-articles-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; }
        .gy-section-heading { font-family: var(--display); font-size: clamp(28px,4vw,48px); font-weight: 300; }
        .gy-year-select { background: transparent; border: 1px solid rgba(200,169,110,.3); color: var(--gold); padding: 10px 20px; font-family: var(--body); font-size: 12px; letter-spacing: .15em; cursor: pointer; outline: none; transition: border-color .2s; }
        .gy-year-select:hover { border-color: var(--gold); }
        .gy-year-select option { background: var(--navy); }
        .gy-articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; transition: opacity .32s ease; }
        .gy-articles-grid.fading { opacity: 0; }
        .gy-article-card { background: var(--navy-light); }
        .gy-article-img-placeholder { height: 240px; position: relative; overflow: hidden; background: linear-gradient(135deg, #1a1428, #0d101e); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(200,169,110,.1); }
        .gy-article-img-inner { font-family: var(--display); font-size: 60px; color: rgba(200,169,110,.15); }
        .gy-article-body { padding: 28px 32px 36px; }
        .gy-article-date { font-size: 10px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; margin-bottom: 12px; }
        .gy-article-title { font-family: var(--display); font-size: 22px; font-weight: 300; line-height: 1.3; margin-bottom: 20px; }
        .gy-article-link { font-size: 10px; letter-spacing: .2em; color: var(--gold); text-decoration: none; text-transform: uppercase; border-bottom: 1px solid rgba(200,169,110,.4); padding-bottom: 2px; transition: border-color .2s; }
        .gy-article-link:hover { border-color: var(--gold); }

        /* ── CTA BANNER */
        .gy-cta-banner { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: linear-gradient(90deg, var(--navy-light), var(--navy)); border-top: 1px solid rgba(200,169,110,.3); padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; opacity: 0; transform: translateY(100%); transition: opacity .5s ease, transform .5s var(--ease-custom); pointer-events: none; }
        .gy-cta-banner.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .gy-cta-name { font-family: var(--display); font-size: 22px; font-weight: 300; font-style: italic; }

        /* ── FOOTER — matches screenshot:
           Pure black bg, no gold. Left = logo + big ALL-CAPS nav links.
           Right = Follow Us social + Contact Us links + legal copy.           */
        .gy-footer {
          width: 100vw;
          background: #0d0d0d;
          padding: 72px 8vw 48px;
          border-top: none;
        }
        /* Two-column layout: left nav ~40%, right content ~55% */
        .gy-footer-inner {
          width: 100%;
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 80px;
          align-items: start;
        }

        /* LEFT COLUMN */
        .gy-footer-left {}
        .gy-footer-logo {
          font-family: var(--display);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400;
          letter-spacing: .03em;
          color: var(--white);
          margin-bottom: 48px;
          line-height: 1;
        }
        .gy-footer-logo::after { content: '.'; }
        /* Big ALL-CAPS nav links */
        .gy-footer-nav { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .gy-footer-nav li a {
          display: block;
          font-family: var(--display);
          font-size: clamp(22px, 2.8vw, 38px);
          font-weight: 700;
          font-style: normal;
          letter-spacing: .02em;
          text-transform: uppercase;
          color: var(--white);
          text-decoration: none;
          line-height: 1.25;
          padding: 4px 0;
          transition: opacity .2s;
        }
        .gy-footer-nav li a:hover { opacity: .6; }

        /* RIGHT COLUMN */
        .gy-footer-right { display: flex; flex-direction: column; gap: 40px; padding-top: 8px; }

        /* Section label (FOLLOW US / CONTACT US) */
        .gy-footer-section-label {
          font-family: var(--body);
          font-size: 10px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: rgba(245,240,232,.45);
          margin-bottom: 14px;
        }
        /* Social links inline */
        .gy-footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 32px;
          list-style: none;
        }
        .gy-footer-social a {
          font-family: var(--body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--white);
          text-decoration: none;
          transition: opacity .2s;
        }
        .gy-footer-social a:hover { opacity: .6; }
        /* Contact links stacked */
        .gy-footer-contact { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .gy-footer-contact a {
          font-family: var(--body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--white);
          text-decoration: none;
          transition: opacity .2s;
        }
        .gy-footer-contact a:hover { opacity: .6; }

        /* Legal block */
        .gy-footer-legal { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
        .gy-footer-tagline {
          font-family: var(--body);
          font-size: 10px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(245,240,232,.4);
          margin-bottom: 4px;
        }
        .gy-footer-disclaimer {
          font-size: 11px;
          line-height: 1.75;
          color: rgba(245,240,232,.28);
          letter-spacing: .02em;
        }
          .gy-product-left-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
        .gy-footer-drinkaware {
          font-size: 11px;
          color: rgba(245,240,232,.35);
          text-align: right;
          letter-spacing: .04em;
          margin-top: 4px;
        }
        .gy-footer-drinkaware strong { font-weight: 700; }

        /* ── DRUPAL UTILITY CLASSES (system.base.css — applicable subset)
           .hidden        → managed via React state; kept here as CSS fallback
           .visually-hidden → screen-reader-only text (WCAG)
           .visually-hidden.focusable → skip links, visible on focus           */
        .hidden { display: none !important; }
        .visually-hidden {
          position: absolute !important;
          overflow: hidden;
          clip: rect(1px, 1px, 1px, 1px);
          width: 1px;
          height: 1px;
          word-wrap: normal;
        }
        .visually-hidden.focusable:active,
        .visually-hidden.focusable:focus {
          position: static !important;
          overflow: visible;
          clip: auto;
          width: auto;
          height: auto;
        }
        .invisible { visibility: hidden; }
        /* Skip-to-content link (mirrors Drupal's skip nav pattern) */
        .gy-skip-link {
          position: absolute;
          top: -100px;
          left: 0;
          z-index: 9999;
          background: var(--gold);
          color: var(--navy);
          padding: 10px 20px;
          font-size: 12px;
          letter-spacing: .15em;
          text-transform: uppercase;
          text-decoration: none;
          font-family: var(--body);
          transition: top .2s;
        }
        .gy-skip-link:focus { top: 0; }
        /* ── 3-panel row ───────────────────────────────────────── */
.gy-panels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 520px;
  position: relative;
  background: #070c1a;
}

.gy-panel {
  position: relative;
  overflow: visible;
}

.gy-panel-left {
  background: #0b1120;
}

.gy-panel-center {
  background: #060a16;
}

.gy-panel-right {
  background: #0d1225;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;
}

.gy-panel-bottle-img {
  position: absolute;
  bottom: -120px;          /* overlaps DOWN into body copy section */
  width: 420px;
  max-width: 90%;
  z-index: 10;
  filter: drop-shadow(0 20px 60px rgba(0,0,0,0.7));
}

/* ── Large body copy ───────────────────────────────────── */
.gy-bodycopy {
  background: #070c1a;
  padding: 180px 8vw 100px;   /* top padding makes room for overlapping image */
  position: relative;
  z-index: 1;
}

.gy-bodycopy-text {
  font-family: var(--display, "Times New Roman", serif);
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.7;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  max-width: 900px;
}
        /* ── RESPONSIVE */
        @media (max-width: 768px) {
          .gy-nav { padding: 0 20px; }
          .gy-nav-register-btn { display: none; }
          .gy-nav-wordmark { font-size: 11px; letter-spacing: .15em; }
          .gy-menu-panel-wrap { width: 100vw; border-left: none; }
          .gy-menu-head { padding: 0 24px; }
          .gy-menu-breadcrumb { padding: 0 24px; }
          .gy-menu-item-btn { padding: 15px 24px; font-size: 22px; }
          .gy-menu-item-btn:hover { padding-left: 32px; }
          .gy-menu-child-btn { font-size: 18px; }
          .gy-menu-footer { padding: 20px 24px; }
          /* New sections responsive */
          .gy-product-reveal { grid-template-columns: 1fr; }
          .gy-product-left { min-height: 60vh; }
          .gy-product-right { min-height: 60vh; padding: 0 6vw 48px; }
          .gy-limited { flex-direction: column; }
          .gy-limited-content { width: 100%; }
          .gy-limited-imgs { height: 60vh; width: 100%; }
          .gy-tasting-grid { grid-template-columns: 1fr; row-gap: 40px; }
          .gy-tasting-note-title { font-size: clamp(40px, 12vw, 80px); }
          .gy-magical-content { max-width: 100%; padding: 0 6vw; }
          .gy-magical-title { font-size: clamp(22px, 6vw, 40px); }
          .gy-capture-line1, .gy-capture-line2 { font-size: clamp(36px, 10vw, 70px); }
          .gy-intro { grid-template-columns: 1fr; gap: 40px; padding: 80px 6vw; }
          .gy-note-display { grid-template-columns: 1fr; gap: 32px; }
          .gy-details-inner { grid-template-columns: 1fr; gap: 40px; }
          .gy-whisky-grid { grid-template-columns: 1fr 1fr; }
          .gy-articles-grid { grid-template-columns: 1fr; }
          .gy-footer-inner { grid-template-columns: 1fr; gap: 48px; }
          .gy-footer-nav li a { font-size: clamp(20px, 6vw, 28px); }
          .gy-notes-header { flex-direction: column; align-items: flex-start; }
          .gy-yozakura, .gy-quote, .gy-notes, .gy-details, .gy-where-next, .gy-articles, .gy-footer { padding: 80px 6vw; }
          .gy-step-dots { display: none; }
          .gy-hero-teaser { flex-direction: column; align-items: center; gap: 12px; bottom: 60px; }
          .gy-form-container { padding: 48px 28px; }
          .gy-form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="gy-root">
        {/* Skip-to-content (mirrors Drupal visually-hidden.focusable skip nav) */}
        <a
          href="#gy-main-content"
          className="gy-skip-link visually-hidden focusable"
        >
          Skip to main content
        </a>

        {/* ── NAV + MEGA MENU (menu.js) ─────────────────────────────────── */}
        <MegaNav
          scrolled={scrolled}
          onRegisterClick={() => setFormVisible(true)}
        />

        {/* ── REGISTER FORM (form-api.js) ──────────────────────────────── */}
        <RegisterForm
          visible={formVisible}
          onClose={() => setFormVisible(false)}
        />

        {/* ══════════════════════════════════════════════════════════════
           SECTION 1: HERO — video bg, box centred, text overlay, petals
           ══════════════════════════════════════════════════════════════ */}
        <section className="gy-hero" ref={heroRef}>
          {heroVideo ? (
            <video
              ref={heroVideoRef}
              className="gy-hero-video"
              autoPlay
              muted
              playsInline
              loop
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <div
              className="gy-hero-video"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, #1a2040 0%, #070c1a 70%)",
              }}
            />
          )}
          <div className="gy-hero-overlay" />
          <div className="gy-hero-grid" />

          {/* Big CAPTURE / THE MOMENT at bottom */}
          <div className="gy-hero-tagline-big">
            <span className="italic-line">Capture</span>
            <span>The Moment</span>
          </div>
        </section>

        {/* ScrollTrigger anchor */}
        <div ref={mainRef} id="gy-main-content" tabIndex={-1} />

        {/* ══════════════════════════════════════════════════════════════
           SECTION 2: PRODUCT REVEAL
           LEFT: dark navy starfield + box+bottle image
           RIGHT: white/light bg + solo bottle foreground + product info
           ══════════════════════════════════════════════════════════════ */}
       <section className="gy-product-reveal" ref={productRevealRef}>
  {/* Left dark half */}
  <div className="gy-product-left">
    <video
      ref={leftVideoRef}
      className="gy-product-left-video"
      muted
      playsInline
      loop
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
  </div>

  {/* Right light half */}
  <div className="gy-product-right">
    <div className="gy-product-info">
      <p className="gy-product-age">29 Year Old</p>
      <p className="gy-product-name">Max Fuel RX</p>
      <div className="gy-product-pills">
        <div className="gy-product-pill">
          Toasted oak, creamy vanilla toffee and silky tannin.
        </div>
        <div className="gy-product-pill">
          Grand Series Limited Edition
        </div>
      </div>
    </div>
  </div>

  {/* Bottle floats across both halves with parallax */}
  {bottleImage && (
    <img
      src={bottleImage}
      alt="Max Fuel RX bottle"
      className="gy-product-center-bottle"
      style={{
        transform: `translate(-50%, calc(-50% + ${bottleOffset}px))`,
      }}
    />
  )}
</section>

        {/* ══════════════════════════════════════════════════════════════
           SECTION 3: CAPTURE THE MOMENT
           Full-viewport dark, open box centred, big "CAPTURE / THE MOMENT"
           ══════════════════════════════════════════════════════════════ */}
        <section className="gy-capture">
          <div className="gy-capture-grid" />

          {heroVideo ? (
            <video
              ref={heroVideoRef}
              className="gy-hero-video"
              autoPlay
              muted
              playsInline
              loop
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <div
              className="gy-hero-video"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, #1a2040 0%, #070c1a 70%)",
              }}
            />
          )}

          <div className="gy-capture-text">
            <span className="gy-capture-line1">Capture</span>
            <span className="gy-capture-line2">The Moment</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
           SECTION 4: MAGICAL MOMENT OF FLEETING BEAUTY
           Dark, bottle among giant pink petals, headline + body left
           ══════════════════════════════════════════════════════════════ */}
        <section className="gy-magical" ref={whereRef}>
          <div className="gy-magical-grid" />
          {/* Bottle */}
          {bottleImage ? (
            <img
              src={bottleImage}
              alt="Max Fuel RX bottle"
              className="gy-magical-bottle-img"
            />
          ) : (
            <div className="gy-magical-bottle-placeholder" />
          )}

          {/* Text */}
          <div className="gy-magical-content">
            <h2 className="gy-magical-title">
              Magical Moment
              <br />
              of Fleeting Beauty
            </h2>
            <p className="gy-magical-body">
              Matrix Petroleum Max Fuel RX, 'Cherry Blossom Viewing at
              <br />
              Night' in Japanese, is the magical moment of fleeting beauty
              <br />
              when Japanese cherry blossoms are admired and celebrated
              <br />
              under moonlight.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
           SECTION 5: LIMITED EDITION — text left, product right
           Dark navy, big uppercase text, bottle+box imagery right
           ══════════════════════════════════════════════════════════════ */}
        <section className="gy-limited" ref={detailsRef}>
          <div
            className={`gy-limited-content gy-reveal gy-from-left ${
              detailsVisible ? "in" : ""
            }`}
          >
            <p className="gy-limited-body">
              This limited edition Matrix Petroleum is the first single malt
              Scotch whisky finished in Japanese Ex-Awamori casks. This rare
              whisky has spent 29 years maturing in American and Oak casks at
              the Matrix Petroleum Distillery before being finished in rare
              Japanese Awamori casks to give it an unforgettable taste.
            </p>
          </div>

          <div
            className={`gy-limited-imgs gy-reveal gy-from-right ${
              detailsVisible ? "in" : ""
            }`}
          >
            {bottleImage ? (
              <img
                src={bottleImage}
                alt="Max Fuel RX bottle"
                className="gy-limited-product-img"
              />
            ) : (
              <div className="gy-limited-product-placeholder">
                Matrix Petroleum
                <br />
                Max Fuel RX
                <br />
                29 Year Old
                <br />
                Box Set
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
           SECTION 6: TASTING NOTES
           Dark navy. "THE TASTING NOTES" small header.
           2×2 grid: COLOUR / NOSE / TASTE / FINISH
           Active note title has blue highlight box behind it.
           ══════════════════════════════════════════════════════════════ */}
        <section className="gy-tasting" ref={notes}>
          <span className="gy-tasting-label">The Tasting Notes</span>
          <div className="gy-tasting-grid">
            {[
              {
                key: "colour",
                title: "Colour",
                short: "Deep Gold.",
                desc: null,
              },
              {
                key: "nose",
                title: "Nose",
                short: null,
                desc: "Zesty, ripe fruits and caramelised almonds. Lovely rich oak notes with hints of cinnamon and a distinctive herbal zing.",
              },
              {
                key: "taste",
                title: "Taste",
                short: null,
                desc: "Indulgent layers of toasted oak, creamy vanilla toffee and silky tannin. Sporadic bursts of spice and sherbet lemons with crunchy green apple and warming earthy tones.",
              },
              {
                key: "finish",
                title: "Finish",
                short: null,
                desc: "Long lasting oak.",
              },
            ].map((note, i) => (
              <div
                key={note.key}
                className={`gy-tasting-note ${activeNote === i ? "active" : ""}`}
                onClick={() => handleNoteChange(i)}
                style={{ cursor: "pointer" }}
              >
                <span className="gy-tasting-note-title">{note.title}</span>
                {note.short && (
                  <span className="gy-tasting-note-short">{note.short}</span>
                )}
                {note.desc && (
                  <p className="gy-tasting-note-desc">{note.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="gy-bodycopy">
          <p className="gy-bodycopy-text">
            Glenfiddich Max Fuel RX, 'Cherry Blossom Viewing at Night' in
            Japanese, is the magical moment of fleeting beauty when Japanese
            cherry blossoms are admired and celebrated under moonlight. A
            limited edition release 45.1% ABV single malt that is housed in an
            elegant whisky box with Sakura imagery, and a Hanko stamp engraved
            bespoke stopper, a cloth capsule with a poem that are included for a
            complete gifting experience.
          </p>
        </section>
        {/* 3-panel image row */}
        <section className="gy-panels">
          <div className="gy-panel gy-panel-left">
            <img
              src={bottleImage}
              alt="Max Fuel RX bottle and box"
              className="gy-panel-bottle-img"
            />
          </div>
          <div className="gy-panel gy-panel-center">
            <img
              src={bottleImage}
              alt="Max Fuel RX bottle and box"
              className="gy-panel-bottle-img"
            />
          </div>
          <div className="gy-panel gy-panel-right">
            <img
              src={bottleImage}
              alt="Max Fuel RX bottle and box"
              className="gy-panel-bottle-img"
            />
          </div>
        </section>

        <div className={`gy-cta-banner ${ctaVisible ? "visible" : ""}`}>
          <p className="gy-cta-name">Maxfuel RX</p>
          <button className="gy-cta-btn" onClick={() => setFormVisible(true)}>
            Register Interest
          </button>
        </div>

        {/* ── FOOTER */}
        <footer className="gy-footer">
          <div className="gy-footer-inner">
            {/* LEFT — logo + big ALL-CAPS nav links */}
            <div className="gy-footer-left">
              <div className="gy-footer-logo">Matrix Petroleum</div>
              <ul className="gy-footer-nav">
                {[
                  "Home",
                  "Our Collection",
                  "Our Story",
                  "Distillery Tours",
                  "Terms & Conditions of Sale",
                  "FAQs",
                  "Website Terms & Conditions",
                  "Privacy Policy & Cookies",
                  "Matrix Petroleum x Aston Martin F1",
                ].map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — social + contact + legal */}
            <div className="gy-footer-right">
              {/* Follow Us */}
              <div>
                <p className="gy-footer-section-label">Follow Us</p>
                <ul className="gy-footer-social">
                  {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
                    <li key={s}>
                      <a href="#">{s}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Us */}
              <div>
                <p className="gy-footer-section-label">Contact Us</p>
                <ul className="gy-footer-contact">
                  <li>
                    <a href="#">Distillery Tours</a>
                  </li>
                  <li>
                    <a href="#">General Enquiries</a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="gy-footer-legal">
                <p className="gy-footer-tagline">
                  Skilfully Crafted. Drink Responsibly.
                </p>
                <p className="gy-footer-disclaimer">
                  ©2024 William Grant &amp; Sons Ltd Registered in Scotland.
                  Registered Number SC131772
                  <br />
                  Registered Office: The Matrix Petroleum Distillery, Dufftown,
                  Banffshire AB55 4DH VAT No: 554690029 William Grant &amp; Sons
                  Ltd is a member of the Scotch Whisky Association (SWA).
                  <br />
                  This content is intended only for people who are of legal
                  purchase age in their country. Do not forward to minors.
                  <br />
                  *The Matrix Petroleum range has received more awards since
                  2000 than any other single malt Scotch whisky in two of the
                  world's most prestigious competitions, the International Wine
                  &amp; Spirit Competition and the International Spirits
                  Challenge.
                </p>
                <p className="gy-footer-drinkaware">
                  be <strong>drinkaware</strong>.co.uk
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
