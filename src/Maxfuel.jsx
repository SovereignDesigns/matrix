import { useState, useEffect, useRef, useCallback } from "react";
import heroVideo from "./assets/carlines.mp4";
import bottleImage from "./assets/pump.png";
import sparkImage from "./assets/spark.png";
import splashImage from "./assets/splash.png";
import engineImage from "./assets/engine.png";

const VT = { L: 0, M: 6, B: 7, S: 12, K: 0, D: 6 };

const NAV_LINKS = [
  { label: "RX", sub: "Story & Experiences", href: "/maxfuelrx" },
  { label: "About Us", sub: "Expressions", href: "/about-us" },
  { label: "Contact Us", sub: "Sign Up", href: "/contact-us" },
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
    { title: "The Grand Series - Four Chapters", date: "November 2023" },
  ],
  2022: [
    { title: "Inside the Matrix Petroleum Cooperage", date: "February 2022" },
    { title: "Grand Cru: Champagne Cask Mastery", date: "June 2022" },
  ],
};

const easeSnappy = "cubic-bezier(0.87, 0, 0.13, 1)";
const easeSmooth = "cubic-bezier(0.45, 0.02, 0.09, 0.98)";
const f1Shadow = "0 0 5.2px 0 rgb(0 0 0/8%), 0 3.335px 3.335px 0 rgb(0 0 0/7%)";
const FONTS = {
  flare: '"ASTON_MARTIN_FLARE", Arial, Helvetica, sans-serif',
  agrandir: '"AGRANDIR", "Helvetica Neue", Arial, sans-serif',
};
const COLORS = {
  white: "#fff",
  black: "#000",
  f1GreenDark: "#204338",
  f1LimeGreen: "#c6fd3a",
  f1LimeGreenDark: "#97cb11",
  navSubtitle: "#95cf02",
};

const IconHamburger = ({ open }) =>
  open ? (
    <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
      <line
        x1="1"
        y1="1"
        x2="25"
        y2="15"
        stroke="black"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="15"
        x2="25"
        y2="1"
        stroke="black"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="30" height="14" viewBox="0 0 26 16" fill="none">
      <line
        x1="1"
        y1="2"
        x2="25"
        y2="2"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="12"
        x2="25"
        y2="12"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

function SimpleNav({ menuOpen, setMenuOpen }) {
  return (
    <>
      <nav
        style={{
          position: "fixed",
          inset: "0 0 0 0",
          zIndex: 200,
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
              zIndex: 1,
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
              transition: "scale 0.3s " + easeSmooth,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.scale = "1.05")}
            onMouseLeave={(e) => (e.currentTarget.style.scale = "1")}
          >
            <IconHamburger open={menuOpen} />
          </button>
        </div>
      </nav>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 201,
          padding: "0.5rem",
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
          transition: "visibility 0s " + (menuOpen ? "0s" : "0.35s"),
        }}
      >
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: COLORS.black,
            opacity: menuOpen ? 0.35 : 0,
            transition: "opacity 0.35s " + easeSmooth,
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
            transition:
              "transform 0.35s " + easeSnappy + ", opacity 0.3s " + easeSmooth,
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
  const dayRef = useRef(null),
    monthRef = useRef(null),
    yearRef = useRef(null);
  const isValidDate = (y, m, d) => {
    const mo = Number(m) - 1;
    const dt = new Date(Number(y), mo, Number(d));
    return (
      dt.getFullYear() === Number(y) &&
      dt.getMonth() === mo &&
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
    setFields((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: false }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ne = {};
    if (!fields.firstname) ne.firstname = true;
    if (!fields.lastname) ne.lastname = true;
    if (!isValidEmail(fields.email)) ne.email = true;
    if (!fields.country) ne.country = true;
    if (!isValidDate(fields.dobYear, fields.dobMonth, fields.dobDay))
      ne.dob = true;
    if (!fields.agree) ne.agree = true;
    if (!fields.analytics) ne.analytics = true;
    if (Object.keys(ne).length > 0) {
      setErrors(ne);
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
    <div className={"gy-form-overlay" + (visible ? " show" : "")}>
      <div className={"gy-form-container" + (visible ? " open" : "")}>
        <button
          className="gy-form-close"
          onClick={handleClose}
          aria-label="Close"
        >
          X
        </button>
        {submitted ? (
          <div className="gy-form-thank-you">
            <div className="gy-form-ty-icon">RX</div>
            <h2>Thank you for your interest</h2>
            <p>
              We will be in touch about Max Fuel RX availability in your region.
            </p>
          </div>
        ) : (
          <>
            <h2 className="gy-form-title">Register Interest</h2>
            <p className="gy-form-subtitle">Max Fuel RX - Limited Edition</p>
            {apiError && <div className="gy-form-error-msg">{apiError}</div>}
            <form onSubmit={handleSubmit} noValidate>
              <div className="gy-form-row">
                <div
                  className={
                    "gy-form-field" + (errors.firstname ? " error" : "")
                  }
                >
                  <label>First Name</label>
                  <input
                    type="text"
                    value={fields.firstname}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div
                  className={
                    "gy-form-field" + (errors.lastname ? " error" : "")
                  }
                >
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={fields.lastname}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className={"gy-form-field" + (errors.email ? " error" : "")}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={fields.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className={"gy-form-field" + (errors.dob ? " error" : "")}>
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
              <div
                className={"gy-form-field" + (errors.country ? " error" : "")}
              >
                <label>Country</label>
                <select
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
                  className={"gy-check-label" + (errors.agree ? " error" : "")}
                >
                  <input
                    type="checkbox"
                    checked={fields.agree}
                    onChange={(e) => handleChange("agree", e.target.checked)}
                  />
                  I confirm I am of legal purchase age and agree to the{" "}
                  <a href="#">Terms and Conditions</a>
                </label>
                <label
                  className={
                    "gy-check-label" + (errors.analytics ? " error" : "")
                  }
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
                className={
                  "gy-cta-btn gy-submit-btn" + (submitting ? " loading" : "")
                }
                disabled={submitting}
              >
                {submitting ? "Submitting" : "Submit Interest"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function MaxFuelRX({
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [whereVisible, setWhereVisible] = useState(false);

  const heroVideoRef = useRef(null);
  const heroRef = useRef(null);
  const mainRef = useRef(null);
  const notesRef = useRef(null);
  const detailsRef = useRef(null);
  const whereRef = useRef(null);
  const animLock = useRef(false);
  const heroLocked = useRef(true);
  const notesLocked = useRef(false);
  const heroStepRef = useRef(0);
  const activeNoteRef = useRef(0);
  const productRevealRef = useRef(null);
  const leftVideoRef = useRef(null);
  const [bottleOffset, setBottleOffset] = useState(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      const wH = window.innerHeight;
      const progress = 1 - rect.bottom / (wH + rect.height);
      setBottleOffset(Math.max(0, Math.min(1, progress)) * -120);
      if (!leftVideoRef.current) return;
      if (rect.top >= 0 && rect.bottom <= wH) leftVideoRef.current.play();
      else leftVideoRef.current.pause();
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
    const ioDetails = makeIO(setDetailsVisible, 0.2);
    const ioWhere = makeIO(setWhereVisible, 0.12);
    const ioNotes = new IntersectionObserver(
      ([e]) => {
        notesLocked.current = e.isIntersecting;
      },
      { threshold: 0.1 },
    );
    if (detailsRef.current) ioDetails.observe(detailsRef.current);
    if (whereRef.current) ioWhere.observe(whereRef.current);
    if (notesRef.current) ioNotes.observe(notesRef.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hero) {
        hero.removeEventListener("wheel", onHeroWheel);
        hero.removeEventListener("touchstart", onHeroTouchStart);
        hero.removeEventListener("touchend", onHeroTouchEnd);
      }
      if (notesEl) notesEl.removeEventListener("wheel", onNotesWheel);
      ioDetails.disconnect();
      ioWhere.disconnect();
      ioNotes.disconnect();
    };
  }, [goToStep]);

  const handleNoteChange = (i) => {
    if (i === activeNote || animLock.current) return;
    activeNoteRef.current = i;
    setNoteFading(true);
    setTimeout(() => {
      setActiveNote(i);
      setNoteFading(false);
    }, 220);
  };

  const tastingNotes = [
    {
      key: "acids",
      title: "Neutralizing Acids",
      short:
        "MaxFuel RX neutralises harmful acids that can corrode engine components over time, prolonging machinery life and reducing environmental footprint.",
      desc: null,
    },
    {
      key: "bug",
      title: "Decreasing Diesel Bug Growth",
      short: null,
      desc: "Diesel bug growth compromises fuel quality and engine performance. By preventing microbial contamination, MaxFuel RX helps engines run cleaner and more efficiently, further reducing harmful emissions.",
    },
    {
      key: "combust",
      title: "Increasing Fuel Combustibility",
      short: null,
      desc: "With enhanced combustibility, MaxFuel RX ensures engines burn fuel more completely, resulting in higher performance, lower emissions and greater fuel efficiency.",
    },
    {
      key: "lube",
      title: "Lubricating Engine Components",
      short: null,
      desc: "Effective lubrication reduces wear and tear on engine components. MaxFuel RX's proprietary formula significantly enhances lubrication, reducing maintenance needs and extending equipment lifespan.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Raleway:wght@200;300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --navy:#0D101E;--navy-light:#151929;--gold:#C8A96E;--gold-pale:#E8D5A8;
          --white:#F5F0E8;--blush:#E8A0A8;--muted:rgba(245,240,232,0.5);
          --display:'Tenor Sans',serif;--body:'Raleway',sans-serif;
          --ease-custom:cubic-bezier(0.098,0.496,0.504,1);
        }
        .gy-root{background:var(--navy);color:var(--white);font-family:var(--body);font-weight:300;overflow-x:hidden;min-height:100vh;}
        .gy-skip-link{position:absolute;top:-100px;left:0;z-index:9999;background:var(--gold);color:var(--navy);padding:10px 20px;font-size:12px;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;font-family:var(--body);transition:top .2s;}
        .gy-skip-link:focus{top:0;}
        .visually-hidden{position:absolute!important;overflow:hidden;clip:rect(1px,1px,1px,1px);width:1px;height:1px;}
        .visually-hidden.focusable:active,.visually-hidden.focusable:focus{position:static!important;overflow:visible;clip:auto;width:auto;height:auto;}
        .gy-reveal{opacity:0;transition:opacity .7s ease,transform .7s var(--ease-custom);}
        .gy-from-left{transform:translateX(-60px);}
        .gy-from-right{transform:translateX(60px);}
        .gy-reveal.in{opacity:1;transform:translate(0);}
        .gy-cta-btn{background:var(--gold);color:var(--navy);border:none;padding:14px 36px;font-family:var(--body);font-size:11px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .2s;white-space:nowrap;min-height:44px;}
        .gy-cta-btn:hover{background:var(--gold-pale);}
        .gy-hero{position:relative;width:100vw;min-height:100vh;overflow:hidden;background:radial-gradient(ellipse at 70% 40%,#1a1330,var(--navy) 60%);display:flex;align-items:center;justify-content:center;}
        .gy-hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none;}
        .gy-hero-overlay{position:absolute;inset:0;background:rgba(10,12,24,.55);z-index:1;pointer-events:none;}
        .gy-hero-grid{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(200,169,110,.04) 1px,transparent 1px),radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);background-size:120px 120px,80px 80px;background-position:0 0,40px 40px;opacity:.4;}
        .gy-hero-tagline-big{font-family:var(--display);font-size:clamp(36px,8vw,140px);font-weight:400;letter-spacing:.02em;color:var(--white);line-height:.95;text-align:center;position:absolute;bottom:6vh;left:50%;transform:translateX(-50%);z-index:6;pointer-events:none;white-space:nowrap;}
        .gy-hero-tagline-big .italic-line{font-style:italic;display:block;}
        .gy-product-reveal{position:relative;width:100vw;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
        .gy-product-center-bottle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:90%;width:auto;z-index:10;filter:drop-shadow(0 20px 80px rgba(0,0,0,0.6));pointer-events:none;will-change:transform;transition:transform 0.1s linear;}
        .gy-product-left{background:linear-gradient(135deg,#0d1628 0%,#1a2d50 60%,#0a1020 100%);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;min-height:50vh;}
        .gy-product-left::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.5) 1px,transparent 1px);background-size:100px 100px;opacity:.35;pointer-events:none;}
        .gy-product-left-video{width:100%;height:100%;object-fit:cover;display:block;}
        .gy-product-right{background:#f5f4f0;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:80px 6vw 60px;position:relative;overflow:hidden;min-height:50vh;}
        .gy-product-info{position:relative;z-index:2;width:100%;text-align:left;padding-bottom:20px;}
        .gy-product-age{font-family:var(--display);font-size:clamp(18px,3vw,56px);font-weight:300;color:#1a1a1a;letter-spacing:.04em;line-height:1;margin-bottom:8px;}
        .gy-product-name{font-family:var(--body);font-size:clamp(11px,1.2vw,15px);font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#1a1a1a;margin-bottom:32px;}
        .gy-product-pills{display:flex;flex-direction:column;gap:0;border:1px solid #c8a96e;}
        .gy-product-pill{padding:12px 18px;font-family:var(--body);font-size:13px;color:#c8a96e;letter-spacing:.04em;border-bottom:1px solid #c8a96e;line-height:1.6;}
        .gy-product-pill:last-child{border-bottom:none;}
        .gy-capture{width:100vw;min-height:100vh;position:relative;background:radial-gradient(ellipse at 50% 30%,#1a1e3a 0%,#080c1e 60%);display:flex;align-items:center;justify-content:center;overflow:hidden;}
        .gy-capture-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.45) 1px,transparent 1px);background-size:110px 110px;opacity:.3;pointer-events:none;}
        .gy-capture-text{position:absolute;bottom:8vh;left:50%;transform:translateX(-50%);z-index:4;text-align:center;width:100%;padding:0 20px;}
        .gy-capture-line1{font-family:var(--display);font-size:clamp(32px,8.5vw,120px);font-weight:400;font-style:italic;color:var(--white);line-height:.9;display:block;}
        .gy-capture-line2{font-family:var(--display);font-size:clamp(32px,8.5vw,120px);font-weight:400;color:var(--white);line-height:.9;display:block;}
        .gy-magical{width:100vw;min-height:100vh;position:relative;background:radial-gradient(ellipse at 60% 50%,#0e1230 0%,#050810 70%);display:flex;align-items:center;overflow:hidden;}
        .gy-magical-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.4) 1px,transparent 1px);background-size:100px 100px;opacity:.25;pointer-events:none;}
        .gy-magical-bottle-img{position:absolute;bottom:0;left:50%;transform:translateX(-40%);height:95vh;width:auto;object-fit:contain;z-index:2;}
        .gy-magical-content{position:relative;z-index:3;padding:80px 6vw;max-width:60%;}
        .gy-magical-title{font-family:var(--display);font-size:clamp(24px,4vw,72px);font-weight:400;text-transform:uppercase;color:var(--white);line-height:1.05;margin-bottom:32px;letter-spacing:.02em;}
        .gy-magical-body{font-family:var(--body);font-size:clamp(12px,1.3vw,16px);font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--white);line-height:1.75;max-width:620px;}
        .gy-limited{width:100vw;min-height:100vh;background:#0a0e1e;display:flex;align-items:center;position:relative;overflow:hidden;}
        .gy-limited-content{position:relative;z-index:2;padding:80px 6vw;width:45%;flex-shrink:0;}
        .gy-limited-body{font-family:var(--display);font-size:clamp(16px,2.4vw,32px);font-weight:400;text-transform:uppercase;color:var(--white);line-height:1.5;letter-spacing:.04em;}
        .gy-limited-imgs{position:relative;z-index:2;flex:1;display:flex;align-items:flex-end;justify-content:center;height:100vh;overflow:hidden;}
        .gy-limited-product-img{height:95%;width:auto;object-fit:contain;position:absolute;bottom:0;left:50%;transform:translateX(-50%);}
        .gy-limited-product-placeholder{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:380px;height:520px;background:linear-gradient(160deg,#0a1628,#1a2540);border:1px solid rgba(200,169,110,.2);display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:14px;color:var(--gold);letter-spacing:.08em;text-align:center;padding:20px;}
        .gy-tasting{width:100vw;min-height:100vh;background:#080c1c;padding:80px 8vw;position:relative;}
        .gy-tasting-label{font-family:var(--body);font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--white);margin-bottom:60px;display:block;}
        .gy-tasting-grid{display:grid;grid-template-columns:1fr 1fr;row-gap:20px;column-gap:2vw;}
        .gy-tasting-note-title{font-family:'Arial',sans-serif;font-size:clamp(14px,3.5vw,80px);font-weight:600;text-transform:uppercase;color:var(--white);line-height:.95;margin-bottom:12px;letter-spacing:-.01em;display:block;word-break:break-word;}
        .gy-tasting-note.active .gy-tasting-note-title{display:inline-block;padding:4px 10px 4px 0;}
        .gy-tasting-note-desc{font-family:var(--body);font-size:13px;line-height:1.7;color:var(--white);max-width:440px;margin-top:6px;}
        .gy-tasting-note.active .gy-tasting-note-desc{background:transparent;padding:4px 8px;display:inline;}
        .gy-tasting-note-short{font-family:var(--body);font-size:14px;color:rgba(245,240,232,.6);margin-top:8px;display:block;}
        .gy-bodycopy{background:#070c1a;padding:100px 8vw 80px;position:relative;z-index:1;}
        .gy-bodycopy-text{font-family:var(--display,"Times New Roman",serif);font-size:clamp(1rem,2vw,1.5rem);line-height:1.7;letter-spacing:0.08em;text-transform:uppercase;color:#fff;max-width:900px;}
        .gy-panels{display:grid;grid-template-columns:1fr 1fr 1fr;height:520px;position:relative;background:#070c1a;overflow:hidden;}
        .gy-panel{position:relative;overflow:hidden;}
        .gy-panel-left{background:#0b1120;}.gy-panel-center{background:#060a16;}.gy-panel-right{background:#0d1225;display:flex;align-items:center;justify-content:center;}
        .gy-panel-bottle-img{width:100%;height:100%;object-fit:contain;display:block;padding:20px;}
        .gy-cta-banner{position:fixed;bottom:0;left:0;right:0;z-index:50;background:transparent;border-top:0px solid rgba(200,169,110,.2);padding:16px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;opacity:0;transform:translateY(100%);transition:opacity .5s ease,transform .5s var(--ease-custom);pointer-events:none;}
        .gy-cta-banner.visible{opacity:1;transform:translateY(0);pointer-events:auto;}
        .gy-cta-name{font-family:var(--display);font-size:20px;font-weight:300;font-style:italic;}
        .gy-form-overlay{position:fixed;inset:0;z-index:300;pointer-events:none;}
        .gy-form-overlay.show{pointer-events:auto;}
        .gy-form-overlay::before{content:'';position:absolute;inset:0;background:rgba(5,7,15,.75);opacity:0;transition:opacity .4s;pointer-events:none;}
        .gy-form-overlay.show::before{opacity:1;}
        .gy-form-container{position:absolute;right:0;top:0;bottom:0;width:min(520px,100vw);background:var(--navy-light);border-left:1px solid rgba(200,169,110,.2);padding:60px 48px;overflow-y:auto;-webkit-overflow-scrolling:touch;transform:translateX(100%);transition:transform .5s var(--ease-custom);}
        .gy-form-container.open{transform:translateX(0);}
        .gy-form-close{position:absolute;top:24px;right:24px;background:transparent;border:1px solid rgba(200,169,110,.3);color:var(--gold);width:44px;height:44px;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}
        .gy-form-close:hover{background:rgba(200,169,110,.1);}
        .gy-form-title{font-family:var(--display);font-size:36px;font-weight:300;margin-bottom:8px;}
        .gy-form-subtitle{font-size:11px;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:40px;}
        .gy-form-error-msg{background:rgba(232,80,80,.15);border:1px solid rgba(232,80,80,.4);padding:12px 16px;font-size:12px;color:#f88;margin-bottom:24px;}
        .gy-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .gy-form-field{display:flex;flex-direction:column;gap:6px;margin-bottom:20px;}
        .gy-form-field label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);}
        .gy-form-field input,.gy-form-field select{background:rgba(245,240,232,.05);border:1px solid rgba(200,169,110,.2);color:var(--white);padding:12px 14px;font-family:var(--body);font-size:16px;outline:none;transition:border-color .2s;-webkit-appearance:none;appearance:none;border-radius:0;}
        .gy-form-field input:focus,.gy-form-field select:focus{border-color:var(--gold);}
        .gy-form-field select option{background:var(--navy);color:var(--white);}
        .gy-form-field.error input,.gy-form-field.error select{border-color:#f66;}
        .gy-dob-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
        .gy-dob-row input{min-width:60px;text-align:center;font-size:16px;}
        .gy-dob-row input:last-child{min-width:80px;}
        .gy-dob-row span{color:var(--muted);}
        .gy-form-checkboxes{display:flex;flex-direction:column;gap:14px;margin-bottom:32px;}
        .gy-check-label{display:flex;align-items:flex-start;gap:12px;font-size:12px;line-height:1.6;color:rgba(245,240,232,.7);cursor:pointer;}
        .gy-check-label.error{color:#f88;}
        .gy-check-label input[type="checkbox"]{margin-top:2px;accent-color:var(--gold);flex-shrink:0;width:18px;height:18px;}
        .gy-check-label a{color:var(--gold);}
        .gy-submit-btn{width:100%;padding:16px;font-size:12px;letter-spacing:.2em;min-height:48px;}
        .gy-submit-btn.loading{opacity:.6;cursor:not-allowed;}
        .gy-form-thank-you{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:24px;}
        .gy-form-ty-icon{font-family:var(--display);font-size:80px;color:var(--gold);opacity:.4;}
        .gy-form-thank-you h2{font-family:var(--display);font-size:36px;font-weight:300;}
        .gy-form-thank-you p{font-size:14px;line-height:1.8;color:var(--muted);max-width:320px;}
        .gy-footer{width:100vw;background:#0d0d0d;padding:72px 8vw 48px;}
        .gy-footer-inner{width:100%;display:grid;grid-template-columns:2fr 3fr;gap:80px;align-items:start;}
        .gy-footer-logo{font-family:var(--display);font-size:clamp(28px,4vw,48px);font-weight:400;letter-spacing:.03em;color:var(--white);margin-bottom:48px;line-height:1;}
        .gy-footer-logo::after{content:'.';}
        .gy-footer-nav{list-style:none;display:flex;flex-direction:column;gap:0;}
        .gy-footer-nav li a{display:block;font-family:var(--display);font-size:clamp(16px,2.8vw,38px);font-weight:700;text-transform:uppercase;color:var(--white);text-decoration:none;line-height:1.25;padding:4px 0;transition:opacity .2s;}
        .gy-footer-nav li a:hover{opacity:.6;}
        .gy-footer-right{display:flex;flex-direction:column;gap:40px;padding-top:8px;}
        .gy-footer-section-label{font-family:var(--body);font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,240,232,.45);margin-bottom:14px;}
        .gy-footer-social{display:flex;flex-wrap:wrap;gap:8px 32px;list-style:none;}
        .gy-footer-social a{font-family:var(--body);font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--white);text-decoration:none;transition:opacity .2s;min-height:44px;display:flex;align-items:center;}
        .gy-footer-social a:hover{opacity:.6;}
        .gy-footer-contact{list-style:none;display:flex;flex-direction:column;gap:4px;}
        .gy-footer-contact a{font-family:var(--body);font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--white);text-decoration:none;transition:opacity .2s;min-height:44px;display:flex;align-items:center;}
        .gy-footer-contact a:hover{opacity:.6;}
        .gy-footer-legal{display:flex;flex-direction:column;gap:10px;margin-top:8px;}
        .gy-footer-tagline{font-family:var(--body);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,240,232,.4);margin-bottom:4px;}
        .gy-footer-disclaimer{font-size:11px;line-height:1.75;color:rgba(245,240,232,.28);letter-spacing:.02em;}
        .gy-footer-drinkaware{font-size:11px;color:rgba(245,240,232,.35);letter-spacing:.04em;margin-top:4px;}
        .gy-footer-drinkaware strong{font-weight:700;}
        @media(max-width:768px){
          .gy-hero-tagline-big{font-size:clamp(28px,10vw,56px);bottom:10vh;}
          .gy-product-reveal{grid-template-columns:1fr;min-height:auto;}
          .gy-product-left{min-height:55vw;}
          .gy-product-right{min-height:auto;padding:60px 6vw 280px;}
          .gy-product-center-bottle{position:relative;top:auto;left:auto;transform:none;display:block;width:60%;max-width:220px;height:auto;margin:-120px auto 0;z-index:10;transition:none;}
          .gy-product-center-bottle[style]{transform:none!important;}
          .gy-magical-content{max-width:100%;padding:60px 6vw 300px;}
          .gy-limited{flex-direction:column;}
          .gy-limited-content{width:100%;padding:60px 6vw 40px;}
          .gy-limited-imgs{height:60vw;width:100%;flex-shrink:0;}
          .gy-tasting-grid{grid-template-columns:1fr;row-gap:32px;}
          .gy-tasting{padding:60px 6vw;min-height:auto;}
          .gy-panels{height:260px;}
          .gy-form-row{grid-template-columns:1fr;gap:0;}
          .gy-footer-inner{grid-template-columns:1fr;gap:40px;}
          .gy-footer{padding:60px 6vw 40px;}
        }
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <div className="gy-root">
        <a
          href="#gy-main-content"
          className="gy-skip-link visually-hidden focusable"
        >
          Skip to main content
        </a>

        <SimpleNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <RegisterForm
          visible={formVisible}
          onClose={() => setFormVisible(false)}
        />

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
                  "radial-gradient(ellipse at 50% 40%,#1a2040 0%,#070c1a 70%)",
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
                  "radial-gradient(ellipse at 50% 40%,#1a2040 0%,#070c1a 70%)",
              }}
            />
          )}
          <div className="gy-capture-text">
            <span className="gy-capture-line1">Neutralizing Acids</span>
            <span className="gy-capture-line2">RX</span>
          </div>
        </section>

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

        <section className="gy-limited" ref={detailsRef}>
          <div
            className={
              "gy-limited-content gy-reveal gy-from-left" +
              (detailsVisible ? " in" : "")
            }
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
            className={
              "gy-limited-imgs gy-reveal gy-from-right" +
              (detailsVisible ? " in" : "")
            }
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

        <section className="gy-tasting" ref={notesRef}>
          <span className="gy-tasting-label">ASPECTS OF FUEL OPTIMIZATION</span>
          <div className="gy-tasting-grid">
            {tastingNotes.map((note, i) => (
              <div
                key={note.key}
                className={
                  "gy-tasting-note" + (activeNote === i ? " active" : "")
                }
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
            MaxFuel RX is an elite precision engineered fuel crafted to deeply
            cleanse and sustain your diesel engine's performance over the long
            haul. Its advanced formula goes beyond standard fuels, ensuring
            continuous protection that maximises efficiency and longevity.
          </p>
        </section>

        <section className="gy-panels">
          <div className="gy-panel gy-panel-left">
            <img
              src={engineImage}
              alt="Max Fuel RX"
              className="gy-panel-bottle-img"
            />
          </div>
          <div className="gy-panel gy-panel-center">
            <img
              src={splashImage}
              alt="Max Fuel RX"
              className="gy-panel-bottle-img"
            />
          </div>
          <div className="gy-panel gy-panel-right">
            <img
              src={sparkImage}
              alt="Max Fuel RX"
              className="gy-panel-bottle-img"
            />
          </div>
        </section>

        <section className="gy-bodycopy">
          <p className="gy-bodycopy-text">
            The future is one where technology and sustainability are
            inextricably linked and MaxFuel RX is at the forefront of this
            evolution. The combination of fuel innovation and AI-powered
            monitoring allows for a holistic approach to both reducing pollution
            and improving fuel efficiency.
          </p>
        </section>

        <div className={"gy-cta-banner" + (ctaVisible ? " visible" : "")}>
          <p className="gy-cta-name"></p>
          <button className="gy-cta-btn" onClick={() => setFormVisible(true)}>
            Register Interest
          </button>
        </div>

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
                  "Terms and Conditions of Sale",
                  "FAQs",
                  "Website Terms and Conditions",
                  "Privacy Policy and Cookies",
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
                  2024 William Grant and Sons Ltd Registered in Scotland.
                  Registered Number SC131772
                  <br />
                  Registered Office: The Matrix Petroleum Distillery, Dufftown,
                  Banffshire AB55 4DH
                  <br />
                  This content is intended only for people who are of legal
                  purchase age in their country. Do not forward to minors.
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
