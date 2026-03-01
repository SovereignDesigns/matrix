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

const SAKURA_PETALS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${7 + Math.random() * 7}s`,
  size: `${10 + Math.random() * 16}px`,
  rotation: Math.random() * 360,
}));

function SakuraPetal({ style }) {
  return <div className="gy-sakura-petal" style={style} />;
}

function MegaNav({ scrolled, onRegisterClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTopId, setActiveTopId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: "home", label: "Home" },
  ]);
  const [subVisible, setSubVisible] = useState(false);

  const resetNav = useCallback(() => {
    setActiveTopId(null);
    setBreadcrumbs([{ id: "home", label: "Home" }]);
    setSubVisible(false);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (prev) setTimeout(resetNav, 450);
      return !prev;
    });
  };

  const handleTopItemClick = (item) => {
    if (activeTopId === item.id) {
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
      <nav className={`gy-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="gy-nav-left">
          <span className="gy-nav-wordmark">
            {scrolled ? "Maxfuel RX" : "Matrix Petroleum"}
          </span>
        </div>

        <div
          className={`gy-nav-logo-wrap ${scrolled ? "scrolled-hide" : ""}`}
        ></div>

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

      <div
        className={`gy-menu-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      <div
        className={`gy-menu-panel-wrap ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
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

        <div className="gy-menu-body">
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

  const isValidDate = (y, m, d) => {
    const month = Number(m) - 1;
    const dt = new Date(Number(y), month, Number(d));
    return (
      dt.getFullYear() === Number(y) &&
      dt.getMonth() === month &&
      dt.getDate() === Number(d)
    );
  };

  const isValidEmail = (e) =>
    /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);

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
              We'll be in touch about Max Fuel RX availability in your region.
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

function ArticlesSection() {
  const [year, setYear] = useState("2024");
  const [articles, setArticles] = useState(ARTICLES_BY_YEAR["2024"]);
  const [fading, setFading] = useState(false);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setFading(true);
    setTimeout(() => {
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

  const animLock = useRef(false);
  const heroLocked = useRef(true);
  const notesLocked = useRef(false);
  const heroStepRef = useRef(0);
  const activeNoteRef = useRef(0);
  const productRevealRef = useRef(null);
  const leftVideoRef = useRef(null);
  const [bottleOffset, setBottleOffset] = useState(0);

  const setVideoTime = useCallback((t) => {
    if (heroVideoRef.current) heroVideoRef.current.currentTime = t;
  }, []);

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

      const progress = 1 - rect.bottom / (windowH + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      setBottleOffset(clampedProgress * -120);

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

    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setCtaVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');

        /* ── RESET & BASE ──────────────────────────────────── */
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

        /* ── ROOT ─────────────────────────────────────────── */
        .gy-root {
          background: var(--navy);
          color: var(--white);
          font-family: var(--body);
          font-weight: 300;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── SKIP LINK ──────────────────────────────────────── */
        .gy-skip-link {
          position: absolute; top: -100px; left: 0; z-index: 9999;
          background: var(--gold); color: var(--navy); padding: 10px 20px;
          font-size: 12px; letter-spacing: .15em; text-transform: uppercase;
          text-decoration: none; font-family: var(--body); transition: top .2s;
        }
        .gy-skip-link:focus { top: 0; }
        .hidden { display: none !important; }
        .visually-hidden {
          position: absolute !important; overflow: hidden;
          clip: rect(1px,1px,1px,1px); width: 1px; height: 1px;
        }
        .visually-hidden.focusable:active,
        .visually-hidden.focusable:focus {
          position: static !important; overflow: visible;
          clip: auto; width: auto; height: auto;
        }
        .invisible { visibility: hidden; }

        /* ── NAV BAR ─────────────────────────────────────────
           3-column grid: [wordmark] [logo centre] [hamburger]              */
        .gy-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 60px; padding: 0 28px;
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center;
          transition: background 0.4s, backdrop-filter 0.4s;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .gy-nav.scrolled {
          background: rgba(8,10,18,0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .gy-nav-left { display: flex; align-items: center; justify-content: flex-start; }
        .gy-nav-wordmark {
          font-family: var(--display); font-size: 19px; font-weight: 400;
          letter-spacing: .04em; color: var(--white); white-space: nowrap;
          line-height: 1; user-select: none;
        }
        .gy-nav-wordmark::after { content: '.'; }
        .gy-nav-logo-wrap {
          justify-self: center; display: flex;
          align-items: center; justify-content: center;
          transition: opacity .45s ease, transform .45s ease;
        }
        .gy-nav-logo-wrap.scrolled-hide { opacity: 0; transform: translateY(-8px); pointer-events: none; }
        .gy-nav-right { display: flex; align-items: center; justify-content: flex-end; }

        /* ── HAMBURGER ─────────────────────────────────────── */
        .gy-hamburger {
          display: flex; flex-direction: column; justify-content: center;
          gap: 5px; background: transparent; border: none; cursor: pointer;
          padding: 8px 6px; z-index: 201; width: 36px; height: 36px;
          /* Increase tap target on mobile */
          min-width: 44px; min-height: 44px;
        }
        .gy-ham-line {
          display: block; width: 24px; height: 1px; background: var(--white);
          transition: transform .35s var(--ease-custom), opacity .2s ease;
          transform-origin: center;
        }
        .gy-hamburger.open .gy-ham-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .gy-hamburger.open .gy-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .gy-hamburger.open .gy-ham-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ── MENU BACKDROP ──────────────────────────────────── */
        .gy-menu-backdrop {
          position: fixed; inset: 0; z-index: 148;
          background: rgba(5,7,15,.6);
          opacity: 0; pointer-events: none; transition: opacity .45s ease;
        }
        .gy-menu-backdrop.visible { opacity: 1; pointer-events: auto; }

        /* ── SLIDE PANEL ─────────────────────────────────────── */
        .gy-menu-panel-wrap {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 149;
          width: min(540px, 100vw);
          background: rgba(10,12,22,0.98);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid rgba(200,169,110,.15);
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform .5s var(--ease-custom);
          overflow: hidden;
        }
        .gy-menu-panel-wrap.open { transform: translateX(0); }

        .gy-menu-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 40px; border-bottom: 1px solid rgba(200,169,110,.12);
          flex-shrink: 0; height: 72px;
        }
        .gy-menu-head-logo { display: flex; align-items: center; gap: 10px; }
        .gy-menu-stag { width: 24px; height: 28px; color: var(--gold); }
        .gy-menu-head-wordmark {
          font-family: var(--display); font-size: 18px;
          letter-spacing: .15em; color: var(--gold); text-transform: uppercase;
        }
        .gy-menu-close {
          width: 38px; height: 38px; min-width: 44px; min-height: 44px;
          background: transparent; border: 1px solid rgba(200,169,110,.3);
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; position: relative;
          transition: border-color .2s, background .2s; flex-shrink: 0;
        }
        .gy-menu-close:hover { border-color: var(--gold); background: rgba(200,169,110,.08); }
        .gy-menu-close span {
          position: absolute; width: 16px; height: 1px; background: var(--gold);
        }
        .gy-menu-close span:nth-child(1) { transform: rotate(45deg); }
        .gy-menu-close span:nth-child(2) { transform: rotate(-45deg); }

        /* Breadcrumb */
        .gy-menu-breadcrumb-wrap {
          height: 0; overflow: hidden; transition: height .25s ease;
          flex-shrink: 0; border-bottom: 1px solid transparent;
        }
        .gy-menu-breadcrumb-wrap.visible {
          height: 48px; border-bottom-color: rgba(200,169,110,.1);
        }
        .gy-menu-breadcrumb { padding: 0 40px; }
        .gy-menu-breadcrumb ol {
          display: flex; list-style: none; align-items: center;
          gap: 16px; height: 48px;
        }
        .gy-breadcrumb-link {
          background: transparent; border: none;
          font-family: var(--body); font-size: 10px;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--gold); cursor: pointer; transition: opacity .2s;
          display: flex; align-items: center; gap: 6px;
          min-height: 44px;
        }
        .gy-breadcrumb-link:hover { opacity: .7; }
        .gy-crumb-current {
          font-family: var(--body); font-size: 10px;
          letter-spacing: .18em; text-transform: uppercase; color: var(--muted);
        }

        /* Panel body */
        .gy-menu-body { flex: 1; display: flex; overflow: hidden; position: relative; }

        .gy-menu-first-col {
          list-style: none; width: 100%; padding: 16px 0;
          overflow-y: auto; flex-shrink: 0;
          transition: transform .4s var(--ease-custom), opacity .3s ease;
          /* allow scroll on iOS */
          -webkit-overflow-scrolling: touch;
        }
        .gy-menu-first-col.sub-open { transform: translateX(-20px); opacity: 0.4; }

        .gy-menu-second-col {
          list-style: none; position: absolute; inset: 0; padding: 16px 0;
          overflow-y: auto; -webkit-overflow-scrolling: touch;
          transform: translateX(60px); opacity: 0; pointer-events: none;
          transition: transform .35s var(--ease-custom), opacity .3s ease;
        }
        .gy-menu-second-col.visible { transform: translateX(0); opacity: 1; pointer-events: auto; }

        .gy-menu-col .gy-menu-item {
          opacity: 0; transform: translateX(32px);
          transition: opacity .4s ease, transform .4s var(--ease-custom);
        }
        .gy-menu-first-col.visible .gy-menu-item,
        .gy-menu-second-col.visible .gy-menu-item { opacity: 1; transform: translateX(0); }

        .gy-menu-item-btn {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; padding: 17px 40px; background: transparent; border: none;
          border-bottom: 1px solid rgba(200,169,110,.08);
          font-family: var(--display); font-size: 26px; font-weight: 300;
          color: var(--white); text-decoration: none; cursor: pointer;
          text-align: left; transition: color .2s, background .2s, padding-left .2s;
          min-height: 44px;
        }
        .gy-menu-item-btn:hover { color: var(--gold); padding-left: 48px; background: rgba(200,169,110,.03); }
        .gy-menu-item.active .gy-menu-item-btn { color: var(--gold); }
        .gy-menu-child-btn { font-size: 20px; }
        .gy-menu-item-label { flex: 1; }
        .gy-menu-item-arrow {
          font-size: 20px; color: rgba(200,169,110,.4);
          transition: transform .3s var(--ease-custom), color .2s; display: inline-block;
        }
        .gy-menu-item-arrow.rotated { transform: rotate(90deg); color: var(--gold); }

        .gy-menu-footer {
          padding: 24px 40px; border-top: 1px solid rgba(200,169,110,.12);
          display: flex; justify-content: space-between; align-items: center;
          flex-shrink: 0; flex-wrap: wrap; gap: 16px;
        }
        .gy-menu-footer-disc {
          font-size: 10px; letter-spacing: .14em;
          color: rgba(245,240,232,.3); text-transform: uppercase;
        }

        /* ── SHARED COMPONENTS ──────────────────────────────── */
        .gy-section-label {
          font-size: 10px; letter-spacing: .3em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 24px;
          display: flex; align-items: center; gap: 16px;
        }
        .gy-section-label::before { content:''; display:block; width:40px; height:1px; background:var(--gold); }

        .gy-cta-btn {
          background: var(--gold); color: var(--navy); border: none;
          padding: 14px 36px; font-family: var(--body); font-size: 11px;
          letter-spacing: .2em; text-transform: uppercase; cursor: pointer;
          transition: background .2s; white-space: nowrap;
          min-height: 44px; /* accessible tap target */
        }
        .gy-cta-btn:hover { background: var(--gold-pale); }

        /* ── REVEAL ANIMATIONS ─────────────────────────────── */
        .gy-reveal { opacity: 0; transition: opacity .7s ease, transform .7s var(--ease-custom); }
        .gy-from-left   { transform: translateX(-60px); } /* reduced on mobile */
        .gy-from-right  { transform: translateX(60px); }
        .gy-from-bottom { transform: translateY(60px); }
        .gy-from-top50  { transform: translateY(50px); }
        .gy-stagger-1 { transition-delay: .1s; }
        .gy-stagger-2 { transition-delay: .2s; }
        .gy-stagger-3 { transition-delay: .3s; }
        .gy-stagger-4 { transition-delay: .4s; }
        .gy-reveal.in { opacity: 1; transform: translate(0); }

        /* ═══════════════════════════════════════════════════
           HERO SECTION
           ═══════════════════════════════════════════════════ */
        .gy-hero {
          position: relative; width: 100vw; min-height: 100vh;
          overflow: hidden; background: radial-gradient(ellipse at 70% 40%, #1a1330, var(--navy) 60%);
          display: flex; align-items: center; justify-content: center;
        }
        .gy-hero-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 0; pointer-events: none;
        }
        .gy-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(10,12,24,.55); z-index: 1; pointer-events: none;
        }
        .gy-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(circle, rgba(200,169,110,.04) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 120px 120px, 80px 80px;
          background-position: 0 0, 40px 40px;
          opacity: .4;
        }

        @keyframes sakuraFall {
          0%   { transform: translateY(-60px) rotate(0deg) translateX(0); opacity: 0; }
          10%  { opacity: .7; }
          90%  { opacity: .4; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(40px); opacity: 0; }
        }
        .gy-sakura-petal {
          position: absolute; top: -20px; border-radius: 50% 0 50% 0;
          background: linear-gradient(135deg, var(--blush), rgba(232,160,168,.5));
          animation: sakuraFall linear infinite; pointer-events: none; z-index: 1;
        }

        .gy-hero-tagline-big {
          font-family: var(--display);
          font-size: clamp(36px, 8vw, 140px);
          font-weight: 400; letter-spacing: .02em; color: var(--white);
          line-height: .95; text-align: center;
          position: absolute; bottom: 6vh; left: 50%;
          transform: translateX(-50%); z-index: 6; pointer-events: none;
          white-space: nowrap;
        }
        .gy-hero-tagline-big .italic-line { font-style: italic; display: block; }

        /* ═══════════════════════════════════════════════════
           PRODUCT REVEAL SECTION
           Split: left video | right info | bottle overlay
           On mobile: stacks vertically, bottle resets position
           ═══════════════════════════════════════════════════ */
        .gy-product-reveal {
          position: relative; width: 100vw; min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr;
        }

        .gy-product-center-bottle {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          height: 90%; width: auto; z-index: 10;
          filter: drop-shadow(0 20px 80px rgba(0,0,0,0.6));
          pointer-events: none; will-change: transform;
          transition: transform 0.1s linear;
        }

        .gy-product-left {
          background: linear-gradient(135deg, #0d1628 0%, #1a2d50 60%, #0a1020 100%);
          position: relative; display: flex;
          align-items: center; justify-content: center;
          overflow: hidden; min-height: 50vh;
        }
        .gy-product-left::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px);
          background-size: 100px 100px; opacity: .35; pointer-events: none;
        }
        .gy-product-left-video { width: 100%; height: 100%; object-fit: cover; display: block; }

        .gy-product-right {
          background: #f5f4f0; display: flex; flex-direction: column;
          align-items: flex-start; justify-content: flex-end;
          padding: 80px 6vw 60px; position: relative; overflow: hidden;
          min-height: 50vh;
        }

        .gy-product-info {
          position: relative; z-index: 2; width: 100%;
          text-align: left; padding-bottom: 20px;
        }
        .gy-product-age {
          font-family: var(--display); font-size: clamp(18px, 3vw, 56px);
          font-weight: 300; color: #1a1a1a; letter-spacing: .04em;
          line-height: 1; margin-bottom: 8px;
        }
        .gy-product-name {
          font-family: var(--body); font-size: clamp(11px, 1.2vw, 15px);
          font-weight: 700; letter-spacing: .28em; text-transform: uppercase;
          color: #1a1a1a; margin-bottom: 32px;
        }
        .gy-product-pills { display: flex; flex-direction: column; gap: 0; border: 1px solid #c8a96e; }
        .gy-product-pill {
          padding: 12px 18px; font-family: var(--body); font-size: 13px;
          color: #c8a96e; letter-spacing: .04em;
          border-bottom: 1px solid #c8a96e; line-height: 1.6;
        }
        .gy-product-pill:last-child { border-bottom: none; }

        /* ═══════════════════════════════════════════════════
           CAPTURE SECTION
           ═══════════════════════════════════════════════════ */
        .gy-capture {
          width: 100vw; min-height: 100vh; position: relative;
          background: radial-gradient(ellipse at 50% 30%, #1a1e3a 0%, #080c1e 60%);
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .gy-capture-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.45) 1px, transparent 1px);
          background-size: 110px 110px; opacity: .3; pointer-events: none;
        }
        .gy-capture-text {
          position: absolute; bottom: 8vh; left: 50%;
          transform: translateX(-50%); z-index: 4; text-align: center;
          width: 100%; padding: 0 20px;
        }
        .gy-capture-line1 {
          font-family: var(--display); font-size: clamp(32px, 8.5vw, 120px);
          font-weight: 400; font-style: italic; color: var(--white);
          line-height: .9; display: block;
        }
        .gy-capture-line2 {
          font-family: var(--display); font-size: clamp(32px, 8.5vw, 120px);
          font-weight: 400; color: var(--white); line-height: .9; display: block;
        }

        /* ═══════════════════════════════════════════════════
           MAGICAL SECTION
           ═══════════════════════════════════════════════════ */
        .gy-magical {
          width: 100vw; min-height: 100vh; position: relative;
          background: radial-gradient(ellipse at 60% 50%, #0e1230 0%, #050810 70%);
          display: flex; align-items: center; overflow: hidden;
        }
        .gy-magical-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.4) 1px, transparent 1px);
          background-size: 100px 100px; opacity: .25; pointer-events: none;
        }
        .gy-magical-bottle-img {
          position: absolute; bottom: 0;
          left: 50%; transform: translateX(-40%);
          height: 95vh; width: auto; object-fit: contain; z-index: 2;
        }
        .gy-magical-bottle-placeholder {
          position: absolute; bottom: 0; left: 55%;
          width: 160px; height: 460px;
          background: linear-gradient(180deg,rgba(200,169,110,.8),rgba(140,100,40,.9));
          border-radius: 6px 6px 2px 2px; z-index: 2;
        }
        .gy-magical-content {
          position: relative; z-index: 3; padding: 80px 6vw; max-width: 60%;
        }
        .gy-magical-title {
          font-family: var(--display); font-size: clamp(24px, 4vw, 72px);
          font-weight: 400; text-transform: uppercase; color: var(--white);
          line-height: 1.05; margin-bottom: 32px; letter-spacing: .02em;
        }
        .gy-magical-body {
          font-family: var(--body); font-size: clamp(12px, 1.3vw, 16px);
          font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
          color: var(--white); line-height: 1.75; max-width: 620px;
        }

        /* ═══════════════════════════════════════════════════
           LIMITED EDITION SECTION
           ═══════════════════════════════════════════════════ */
        .gy-limited {
          width: 100vw; min-height: 100vh; background: #0a0e1e;
          display: flex; align-items: center; position: relative; overflow: hidden;
        }
        .gy-limited-content {
          position: relative; z-index: 2; padding: 80px 6vw; width: 45%; flex-shrink: 0;
        }
        .gy-limited-body {
          font-family: var(--display); font-size: clamp(16px, 2.4vw, 32px);
          font-weight: 400; text-transform: uppercase; color: var(--white);
          line-height: 1.5; letter-spacing: .04em;
        }
        .gy-limited-imgs {
          position: relative; z-index: 2; flex: 1;
          display: flex; align-items: flex-end; justify-content: center;
          height: 100vh; overflow: hidden;
        }
        .gy-limited-product-img {
          height: 95%; width: auto; object-fit: contain;
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
        }
        .gy-limited-product-placeholder {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 380px; height: 520px;
          background: linear-gradient(160deg,#0a1628,#1a2540);
          border: 1px solid rgba(200,169,110,.2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 14px; color: var(--gold);
          letter-spacing: .08em; text-align: center; padding: 20px;
        }

        /* ═══════════════════════════════════════════════════
           TASTING NOTES (ASPECTS)
           ═══════════════════════════════════════════════════ */
        .gy-tasting {
          width: 100vw; min-height: 100vh; background: #080c1c;
          padding: 80px 8vw; position: relative;
        }
        .gy-tasting-label {
          font-family: var(--body); font-size: 11px; font-weight: 700;
          letter-spacing: .28em; text-transform: uppercase; color: var(--white);
          margin-bottom: 60px; display: block;
        }
        .gy-tasting-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          row-gap: 20px; column-gap: 2vw;
        }
        .gy-tasting-note-title {
          font-family: 'Arial', sans-serif;
          font-size: clamp(14px, 3.5vw, 80px);
          font-weight: 600; text-transform: uppercase; color: var(--white);
          line-height: .95; margin-bottom: 12px; letter-spacing: -.01em;
          display: block; word-break: break-word;
        }
        .gy-tasting-note.active .gy-tasting-note-title { display: inline-block; padding: 4px 10px 4px 0; }
        .gy-tasting-note-desc {
          font-family: var(--body); font-size: 13px; line-height: 1.7;
          color: var(--white); max-width: 440px; margin-top: 6px;
        }
        .gy-tasting-note.active .gy-tasting-note-desc { background: #1a3de8; padding: 4px 8px; display: inline; }
        .gy-tasting-note-short {
          font-family: var(--body); font-size: 14px;
          color: rgba(245,240,232,.6); margin-top: 8px; display: block;
        }

        /* ═══════════════════════════════════════════════════
           BODY COPY SECTION
           ═══════════════════════════════════════════════════ */
        .gy-bodycopy {
          background: #070c1a; padding: 100px 8vw 80px;
          position: relative; z-index: 1;
        }
        .gy-bodycopy-text {
          font-family: var(--display, "Times New Roman", serif);
          font-size: clamp(1rem, 2vw, 1.5rem); line-height: 1.7;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #fff; max-width: 900px;
        }

        /* ═══════════════════════════════════════════════════
           3-PANEL ROW
           ═══════════════════════════════════════════════════ */
        .gy-panels {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          height: 520px; position: relative; background: #070c1a;
          overflow: hidden;
        }
        .gy-panel { position: relative; overflow: hidden; }
        .gy-panel-left { background: #0b1120; }
        .gy-panel-center { background: #060a16; }
        .gy-panel-right { background: #0d1225; display: flex; align-items: center; justify-content: center; }
        .gy-panel-bottle-img {
          width: 100%; height: 100%; object-fit: contain;
          display: block; padding: 20px;
        }

        /* ═══════════════════════════════════════════════════
           CTA BANNER
           ═══════════════════════════════════════════════════ */
        .gy-cta-banner {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          background: rgba(13,16,30,0.95); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-top: 1px solid rgba(200,169,110,.2);
          padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px;
          opacity: 0; transform: translateY(100%);
          transition: opacity .5s ease, transform .5s var(--ease-custom);
          pointer-events: none;
        }
        .gy-cta-banner.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .gy-cta-name { font-family: var(--display); font-size: 20px; font-weight: 300; font-style: italic; }

        /* ═══════════════════════════════════════════════════
           REGISTER FORM
           ═══════════════════════════════════════════════════ */
        .gy-form-overlay {
          position: fixed; inset: 0; z-index: 300; pointer-events: none;
        }
        .gy-form-overlay.show { pointer-events: auto; }
        .gy-form-overlay::before {
          content:''; position:absolute; inset:0;
          background:rgba(5,7,15,.75); opacity:0; transition:opacity .4s; pointer-events:none;
        }
        .gy-form-overlay.show::before { opacity:1; }
        .gy-form-container {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: min(520px, 100vw);
          background: var(--navy-light);
          border-left: 1px solid rgba(200,169,110,.2);
          padding: 60px 48px; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          transform: translateX(100%);
          transition: transform .5s var(--ease-custom);
        }
        .gy-form-container.open { transform: translateX(0); }
        .gy-form-close {
          position: absolute; top: 24px; right: 24px; background: transparent;
          border: 1px solid rgba(200,169,110,.3); color: var(--gold);
          width: 44px; height: 44px; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s;
        }
        .gy-form-close:hover { background: rgba(200,169,110,.1); }
        .gy-form-title { font-family: var(--display); font-size: 36px; font-weight: 300; margin-bottom: 8px; }
        .gy-form-subtitle { font-size: 11px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; margin-bottom: 40px; }
        .gy-form-error-msg {
          background: rgba(232,80,80,.15); border: 1px solid rgba(232,80,80,.4);
          padding: 12px 16px; font-size: 12px; color: #f88; margin-bottom: 24px;
        }
        .gy-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .gy-form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .gy-form-field label { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); }
        .gy-form-field input,
        .gy-form-field select {
          background: rgba(245,240,232,.05); border: 1px solid rgba(200,169,110,.2);
          color: var(--white); padding: 12px 14px; font-family: var(--body);
          font-size: 16px; /* 16px prevents iOS zoom */ outline: none;
          transition: border-color .2s; -webkit-appearance: none; appearance: none;
          border-radius: 0;
        }
        .gy-form-field input:focus, .gy-form-field select:focus { border-color: var(--gold); }
        .gy-form-field select option { background: var(--navy); color: var(--white); }
        .gy-form-field.error input, .gy-form-field.error select { border-color: #f66; }
        .gy-dob-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .gy-dob-row input { min-width: 60px; text-align: center; font-size: 16px; }
        .gy-dob-row input:last-child { min-width: 80px; }
        .gy-dob-row span { color: var(--muted); }
        .gy-form-checkboxes { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
        .gy-check-label {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 12px; line-height: 1.6; color: rgba(245,240,232,.7); cursor: pointer;
        }
        .gy-check-label.error { color: #f88; }
        .gy-check-label input[type="checkbox"] { margin-top: 2px; accent-color: var(--gold); flex-shrink: 0; width: 18px; height: 18px; }
        .gy-check-label a { color: var(--gold); }
        .gy-submit-btn { width: 100%; padding: 16px; font-size: 12px; letter-spacing: .2em; min-height: 48px; }
        .gy-submit-btn.loading { opacity: .6; cursor: not-allowed; }
        .gy-form-thank-you {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 60vh; text-align: center; gap: 24px;
        }
        .gy-form-ty-icon { font-family: var(--display); font-size: 80px; color: var(--gold); opacity: .4; }
        .gy-form-thank-you h2 { font-family: var(--display); font-size: 36px; font-weight: 300; }
        .gy-form-thank-you p { font-size: 14px; line-height: 1.8; color: var(--muted); max-width: 320px; }

        /* ═══════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════ */
        .gy-footer { width: 100vw; background: #0d0d0d; padding: 72px 8vw 48px; }
        .gy-footer-inner {
          width: 100%; display: grid; grid-template-columns: 2fr 3fr;
          gap: 80px; align-items: start;
        }
        .gy-footer-logo {
          font-family: var(--display); font-size: clamp(28px, 4vw, 48px);
          font-weight: 400; letter-spacing: .03em; color: var(--white);
          margin-bottom: 48px; line-height: 1;
        }
        .gy-footer-logo::after { content: '.'; }
        .gy-footer-nav { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .gy-footer-nav li a {
          display: block; font-family: var(--display);
          font-size: clamp(16px, 2.8vw, 38px);
          font-weight: 700; text-transform: uppercase; color: var(--white);
          text-decoration: none; line-height: 1.25; padding: 4px 0;
          transition: opacity .2s;
        }
        .gy-footer-nav li a:hover { opacity: .6; }
        .gy-footer-right { display: flex; flex-direction: column; gap: 40px; padding-top: 8px; }
        .gy-footer-section-label {
          font-family: var(--body); font-size: 10px; letter-spacing: .28em;
          text-transform: uppercase; color: rgba(245,240,232,.45); margin-bottom: 14px;
        }
        .gy-footer-social { display: flex; flex-wrap: wrap; gap: 8px 32px; list-style: none; }
        .gy-footer-social a {
          font-family: var(--body); font-size: 11px; font-weight: 700;
          letter-spacing: .22em; text-transform: uppercase; color: var(--white);
          text-decoration: none; transition: opacity .2s; min-height: 44px;
          display: flex; align-items: center;
        }
        .gy-footer-social a:hover { opacity: .6; }
        .gy-footer-contact { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .gy-footer-contact a {
          font-family: var(--body); font-size: 11px; font-weight: 700;
          letter-spacing: .22em; text-transform: uppercase; color: var(--white);
          text-decoration: none; transition: opacity .2s;
          min-height: 44px; display: flex; align-items: center;
        }
        .gy-footer-contact a:hover { opacity: .6; }
        .gy-footer-legal { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
        .gy-footer-tagline {
          font-family: var(--body); font-size: 10px; letter-spacing: .22em;
          text-transform: uppercase; color: rgba(245,240,232,.4); margin-bottom: 4px;
        }
        .gy-footer-disclaimer {
          font-size: 11px; line-height: 1.75; color: rgba(245,240,232,.28); letter-spacing: .02em;
        }
        .gy-footer-drinkaware {
          font-size: 11px; color: rgba(245,240,232,.35); letter-spacing: .04em; margin-top: 4px;
        }
        .gy-footer-drinkaware strong { font-weight: 700; }

        /* ═══════════════════════════════════════════════════
           STEP DOTS
           ═══════════════════════════════════════════════════ */
        .gy-step-dots {
          position: absolute; right: 32px; top: 50%;
          transform: translateY(-50%); z-index: 9;
          display: flex; flex-direction: column; gap: 10px;
        }
        .gy-step-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: 1px solid rgba(200,169,110,.5); background: transparent;
          cursor: pointer; transition: background .3s, transform .3s;
        }
        .gy-step-dot.active { background: var(--gold); transform: scale(1.4); }

        /* ════════════════════════════════════════════════════════════
           MOBILE FIRST — max-width: 768px
           ════════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {

          /* Nav */
          .gy-nav { padding: 0 16px; height: 56px; }
          .gy-nav-wordmark { font-size: 14px; letter-spacing: .05em; }
          /* Remove wordmark "after dot" overflow on very small screens */
          @media (max-width: 360px) {
            .gy-nav-wordmark { font-size: 12px; }
          }

          /* Menu panel: full width on mobile */
          .gy-menu-panel-wrap { width: 100vw; border-left: none; }
          .gy-menu-head { padding: 0 20px; }
          .gy-menu-head-wordmark { font-size: 15px; letter-spacing: .1em; }
          .gy-menu-breadcrumb { padding: 0 20px; }
          .gy-menu-item-btn { padding: 15px 20px; font-size: 20px; }
          .gy-menu-item-btn:hover { padding-left: 28px; }
          .gy-menu-child-btn { font-size: 17px; }
          .gy-menu-footer { padding: 16px 20px; flex-direction: column; align-items: flex-start; }

          /* Hero */
          .gy-hero-tagline-big { font-size: clamp(28px, 10vw, 56px); bottom: 10vh; }

          /* Step dots: hide on mobile to avoid obscuring content */
          .gy-step-dots { display: none; }

          /* ── PRODUCT REVEAL: stack vertically ── */
          .gy-product-reveal {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .gy-product-left { min-height: 55vw; }
          .gy-product-right {
            min-height: auto; padding: 60px 6vw 280px;
            /* Extra bottom padding for the overlapping bottle */
          }
          /* Bottle: repositioned to sit at bottom center in mobile stacked layout */
          .gy-product-center-bottle {
            position: relative;
            top: auto; left: auto;
            transform: none;
            display: block;
            width: 60%;
            max-width: 220px;
            height: auto;
            margin: -120px auto 0;
            z-index: 10;
            /* Disable parallax transform on mobile */
            transition: none;
          }
          /* Override the inline JS transform on mobile */
          .gy-product-center-bottle[style] {
            transform: none !important;
          }

          /* ── CAPTURE: tighten text ── */
          .gy-capture { min-height: 60vh; }
          .gy-capture-text { bottom: 6vh; padding: 0 16px; }
          .gy-capture-line1, .gy-capture-line2 { font-size: clamp(28px, 10vw, 56px); line-height: 1; }

          /* ── MAGICAL: full width text, bottle behind ── */
          .gy-magical { min-height: 100vh; align-items: flex-start; padding-top: 80px; }
          .gy-magical-content { max-width: 100%; padding: 60px 6vw 300px; }
          .gy-magical-title { font-size: clamp(22px, 7vw, 40px); }
          .gy-magical-body { font-size: 12px; letter-spacing: .1em; }
          /* Bottle smaller & repositioned */
          .gy-magical-bottle-img {
            height: 55vh; left: auto; right: -10%;
            transform: none; opacity: 0.5;
          }

          /* ── LIMITED: stack vertically ── */
          .gy-limited { flex-direction: column; }
          .gy-limited-content { width: 100%; padding: 60px 6vw 40px; }
          .gy-limited-body { font-size: clamp(14px, 4vw, 22px); }
          .gy-limited-imgs { height: 60vw; width: 100%; flex-shrink: 0; }
          .gy-limited-product-img { height: 100%; }

          /* ── TASTING NOTES: single column ── */
          .gy-tasting { padding: 60px 6vw; min-height: auto; }
          .gy-tasting-label { margin-bottom: 32px; }
          .gy-tasting-grid { grid-template-columns: 1fr; row-gap: 32px; }
          .gy-tasting-note-title { font-size: clamp(20px, 6vw, 48px); word-break: break-word; }

          /* ── BODY COPY ── */
          .gy-bodycopy { padding: 60px 6vw; }
          .gy-bodycopy-text { font-size: clamp(0.9rem, 4vw, 1.2rem); letter-spacing: .04em; }

          /* ── 3-PANEL ROW: reduce height, horizontal scroll if needed ── */
          .gy-panels {
            height: 260px;
            /* On very small screens, show 2 panels and allow horizontal scroll */
          }
          .gy-panel-bottle-img { padding: 10px; }

          /* ── CTA BANNER ── */
          .gy-cta-banner { padding: 12px 16px; }
          .gy-cta-name { font-size: 16px; }
          .gy-cta-btn { padding: 12px 20px; font-size: 10px; }

          /* ── REGISTER FORM ── */
          .gy-form-container { padding: 56px 20px 40px; }
          .gy-form-row { grid-template-columns: 1fr; gap: 0; }
          .gy-form-title { font-size: 28px; }

          /* ── FOOTER: single column ── */
          .gy-footer { padding: 60px 6vw 40px; }
          .gy-footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .gy-footer-logo { font-size: clamp(24px, 6vw, 36px); margin-bottom: 32px; }
          .gy-footer-nav li a { font-size: clamp(14px, 5vw, 22px); padding: 6px 0; }
        }

        /* ════════════════════════════════════════════════════════════
           SMALL MOBILE — max-width: 480px
           Extra tweaks for narrow phones
           ════════════════════════════════════════════════════════════ */
        @media (max-width: 480px) {
          .gy-nav-wordmark { font-size: 13px; }

          .gy-hero-tagline-big { font-size: clamp(24px, 9vw, 44px); white-space: normal; text-align: center; padding: 0 16px; }

          .gy-product-right { padding: 40px 6vw 220px; }
          .gy-product-center-bottle { width: 55%; max-width: 180px; }
          .gy-product-pill { font-size: 12px; padding: 10px 14px; }
          .gy-product-age { font-size: clamp(14px, 4vw, 24px); }

          .gy-tasting-note-title { font-size: clamp(18px, 7vw, 36px); }

          .gy-panels { height: 200px; }

          .gy-cta-banner { flex-direction: column; align-items: center; gap: 10px; padding: 14px 16px; }
          .gy-cta-name { font-size: 14px; }
          .gy-cta-btn { width: 100%; text-align: center; padding: 14px; }

          .gy-form-container { padding: 56px 16px 40px; }
          .gy-form-title { font-size: 26px; }
          .gy-form-subtitle { font-size: 10px; }

          .gy-menu-item-btn { font-size: 18px; padding: 14px 18px; }
          .gy-menu-child-btn { font-size: 15px; }
        }

        /* ════════════════════════════════════════════════════════════
           TABLET — 769px to 1024px
           ════════════════════════════════════════════════════════════ */
        @media (min-width: 769px) and (max-width: 1024px) {
          .gy-product-right { padding: 0 4vw 60px; }
          .gy-product-age { font-size: clamp(14px, 2vw, 32px); }
          .gy-product-pill { font-size: 12px; }

          .gy-magical-content { max-width: 70%; padding: 0 4vw; }
          .gy-magical-title { font-size: clamp(22px, 3.5vw, 52px); }
          .gy-magical-body { font-size: 13px; }

          .gy-limited-content { width: 50%; padding: 60px 4vw; }
          .gy-limited-body { font-size: clamp(14px, 2vw, 24px); }

          .gy-tasting-note-title { font-size: clamp(14px, 3vw, 60px); }
          .gy-tasting { padding: 60px 6vw; }

          .gy-footer-inner { gap: 40px; }
          .gy-footer-nav li a { font-size: clamp(14px, 2vw, 28px); }

          .gy-panels { height: 380px; }
        }

        /* ════════════════════════════════════════════════════════════
           TOUCH / HOVER IMPROVEMENTS
           ════════════════════════════════════════════════════════════ */
        @media (hover: none) {
          /* Disable hover states that can stick on touch */
          .gy-menu-item-btn:hover { padding-left: 40px; color: var(--white); background: transparent; }
          .gy-menu-item.active .gy-menu-item-btn { color: var(--gold); }
          .gy-cta-btn:hover { background: var(--gold); }
          .gy-menu-close:hover { border-color: rgba(200,169,110,.3); background: transparent; }
        }

        /* ════════════════════════════════════════════════════════════
           REDUCED MOTION SUPPORT
           ════════════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .gy-sakura-petal { display: none; }
        }
      `}</style>

      <div className="gy-root">
        <a
          href="#gy-main-content"
          className="gy-skip-link visually-hidden focusable"
        >
          Skip to main content
        </a>

        <MegaNav
          scrolled={scrolled}
          onRegisterClick={() => setFormVisible(true)}
        />

        <RegisterForm
          visible={formVisible}
          onClose={() => setFormVisible(false)}
        />

        {/* ── HERO ──────────────────────────────────────────────────── */}
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

          <div className="gy-hero-tagline-big">
            <span className="italic-line">Matrix</span>
            <span>MaxFuel RX</span>
          </div>
        </section>

        <div ref={mainRef} id="gy-main-content" tabIndex={-1} />

        {/* ── PRODUCT REVEAL ──────────────────────────────────────── */}
        <section className="gy-product-reveal" ref={productRevealRef}>
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

          <div className="gy-product-right">
            <div className="gy-product-info">
              <p className="gy-product-age">CRITICAL ASPECTS OF</p>
              <p className="gy-product-name">Max Fuel RX</p>
              <div className="gy-product-pills">
                <div className="gy-product-pill">
                  MaxFuel RX achieves fuel optimisation through a unique, 6
                  pronged approach. It addresses issues that have long plagued
                  the fuel industry while delivering results that are both
                  immediate and long lasting.
                </div>
                <div className="gy-product-pill">
                  MaxFuel RX neutralises harmful acids that can corrode engine
                  components over time. This not only prolongs the life of
                  machinery but also reduces the environmental footprint of fuel
                  consumption by decreasing the need for repairs and
                  replacements.
                </div>
              </div>
            </div>
          </div>

          {/* Bottle overlay — parallax on desktop, static on mobile */}
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

        {/* ── CAPTURE ─────────────────────────────────────────────── */}
        <section className="gy-capture">
          <div className="gy-capture-grid" />
          {heroVideo ? (
            <video className="gy-hero-video" autoPlay muted playsInline loop>
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
            <span className="gy-capture-line1">Neutralizing Acids</span>
            <span className="gy-capture-line2">RX</span>
          </div>
        </section>

        {/* ── MAGICAL ─────────────────────────────────────────────── */}
        <section className="gy-magical" ref={whereRef}>
          <div className="gy-magical-grid" />
          {bottleImage ? (
            <img
              src={bottleImage}
              alt="Max Fuel RX bottle"
              className="gy-magical-bottle-img"
            />
          ) : (
            <div className="gy-magical-bottle-placeholder" />
          )}
          <div className="gy-magical-content">
            <h2 className="gy-magical-title">
              Decreasing
              <br />
              Diesel Bug Growth
            </h2>
            <p className="gy-magical-body">
              Diesel bug growth is a persistent issue that compromises fuel
              quality and engine performance.
              <br />
              By preventing microbial contamination,
              <br />
              MaxFuel RX helps engines run cleaner and more efficiently, thereby
              further reducing
              <br />
              harmful emissions.
            </p>
          </div>
        </section>

        {/* ── LIMITED ─────────────────────────────────────────────── */}
        <section className="gy-limited" ref={detailsRef}>
          <div
            className={`gy-limited-content gy-reveal gy-from-left ${detailsVisible ? "in" : ""}`}
          >
            <p className="gy-limited-body">
              Passively Cleaning Exhaust-Related Components — Over time exhaust
              systems accumulate residue that reduces their effectiveness in
              filtering harmful gases. MaxFuel RX passively cleans these
              components, ensuring that exhaust systems operate at peak
              efficiency thereby significantly reducing emissions.
            </p>
          </div>
          <div
            className={`gy-limited-imgs gy-reveal gy-from-right ${detailsVisible ? "in" : ""}`}
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

        {/* ── TASTING NOTES ───────────────────────────────────────── */}
        <section className="gy-tasting" ref={notes}>
          <span className="gy-tasting-label">ASPECTS OF FUEL OPTIMIZATION</span>
          <div className="gy-tasting-grid">
            {[
              {
                key: "colour",
                title: "Neutralizing Acids",
                short:
                  "MaxFuel RX neutralises harmful acids that can corrode engine components over time. This not only prolongs the life of machinery but also reduces the environmental footprint of fuel consumption by decreasing the need for repairs and replacements.",
                desc: null,
              },
              {
                key: "nose",
                title: "Decreasing Diesel Bug Growth",
                short: null,
                desc: "Diesel bug growth is a persistent issue that compromises fuel quality and engine performance. By preventing microbial contamination, MaxFuel RX helps engines run cleaner and more efficiently, thereby further reducing harmful emissions.",
              },
              {
                key: "taste",
                title: "Increasing Fuel Combustibility",
                short: null,
                desc: "With enhanced combustibility, MaxFuel RX ensures that engines burn fuel more completely, resulting in higher performance, lower emissions and greater fuel efficiency. This not only reduces costs but also directly contributes to lowering the carbon footprint of vehicles.",
              },
              {
                key: "finish",
                title: "Lubricating Engine Components",
                short: null,
                desc: "Effective lubrication reduces wear and tear on engine components, improving overall efficiency. MaxFuel RX’s proprietary formula significantly enhances the lubrication of engine parts, reducing maintenance needs and extending the lifespan of vehicles and equipment.",
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

        {/* ── BODY COPY 1 ─────────────────────────────────────────── */}
        <section className="gy-bodycopy">
          <p className="gy-bodycopy-text">
            MaxFuel RX is an elite precision engineered fuel crafted to deeply
            cleanse and sustain your diesel engine's performance over the long
            haul. Its advanced formula goes beyond standard fuels, ensuring
            continuous protection that maximises efficiency and longevity.
          </p>
        </section>

        {/* ── 3-PANEL ROW ─────────────────────────────────────────── */}
        <section className="gy-panels">
          <div className="gy-panel gy-panel-left">
            <img
              src={bottleImage}
              alt="Max Fuel RX"
              className="gy-panel-bottle-img"
            />
          </div>
          <div className="gy-panel gy-panel-center">
            <img
              src={bottleImage}
              alt="Max Fuel RX"
              className="gy-panel-bottle-img"
            />
          </div>
          <div className="gy-panel gy-panel-right">
            <img
              src={bottleImage}
              alt="Max Fuel RX"
              className="gy-panel-bottle-img"
            />
          </div>
        </section>

        {/* ── BODY COPY 2 ─────────────────────────────────────────── */}
        <section className="gy-bodycopy">
          <p className="gy-bodycopy-text">
            The future is one where technology and sustainability are
            inextricably linked and MaxFuel RX is at the forefront of this
            evolution. The combination of fuel innovation and AI-powered
            monitoring allows for a holistic approach to both reducing pollution
            and improving fuel efficiency.
          </p>
        </section>

        {/* ── CTA BANNER ──────────────────────────────────────────── */}
        <div className={`gy-cta-banner ${ctaVisible ? "visible" : ""}`}>
          <p className="gy-cta-name">Maxfuel RX</p>
          <button className="gy-cta-btn" onClick={() => setFormVisible(true)}>
            Register Interest
          </button>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer className="gy-footer">
          <div className="gy-footer-inner">
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

            <div className="gy-footer-right">
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
