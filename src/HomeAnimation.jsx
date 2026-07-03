import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import "./HomeAnimation.css";
gsap.registerPlugin(ScrollTrigger, TextPlugin);


export default function HomeAnimation() {
  const containerRef = useRef(null);
  const kioskWrapperRef = useRef(null);
  const navbarRef = useRef(null);
  const labRecordRef = useRef(null);
  const certRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    // First scroll to the end of the animation (past all home-animation sections)
    // then jump to the target section
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1️⃣ Typewriter on mount (no scroll)
      gsap.fromTo(
        "#heroText",
        { text: "" },
        {
          duration: 2,
          text: "Print<br>Instantly,<br>Think<br>Differently.",
          ease: "none"
        }
      );

      // Reveal full navbar after kiosk animation (when #section5 enters view)
      ScrollTrigger.create({
        trigger: "#section5",
        start: "top bottom",
        onEnter: () => {
          setNavbarVisible(true);
          gsap.fromTo(
            ".pill-navbar",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" }
          );
        }
      });

      // Create scroll triggers immediately so context can track and clean them up
      initScroll();

      // All scroll-based animations are defined in this helper
      function initScroll() {
        // ---- Scene 1 – pin + gentle float ----
        ScrollTrigger.create({
          trigger: "#section1",
          start: "top top",
          end: "+=50%", // ~1 scroll step
          pin: true,
          scrub: 1.5,
        });
        // No floating animation as requested

        // ---- Scene 2 – Meet PX ----
        // 1. Hero text vanishes fully
        gsap.to("#heroText", {
          opacity: 0,
          scrollTrigger: {
            trigger: "#section2",
            start: "top top",
            end: "20% top",
            scrub: 1.5,
          }
        });

        // 2. Meet PX fades in
        gsap.fromTo(
          ".meet-px",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: "#section2",
              start: "20% top",
              end: "40% top",
              scrub: 1.5,
            },
          }
        );

        // ---- Scene 3 – Camera push (slight zoom) ----
        gsap.to(kioskWrapperRef.current, {
          scale: 1.3,
          y: -60,
          scrollTrigger: {
            trigger: "#section3",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // ---- Scene 4 – Fullscreen zoom ----
        gsap.to(kioskWrapperRef.current, {
          scale: 6, // Massive zoom to make screen fill the page
          y: -150,
          scrollTrigger: {
            trigger: "#section4",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        
        // Fade out the kiosk device image so the off-white background seamlessly becomes the screen
        gsap.to(".px-kiosk-image", {
          opacity: 0,
          scrollTrigger: {
            trigger: "#section4",
            start: "center top", // Start fading halfway through the zoom
            end: "bottom top",
            scrub: 1.5,
          }
        });

        // ---- Scene 5 – Word sequence (Upload / Print / Done) ----
        const tl5 = gsap.timeline({
          scrollTrigger: {
            trigger: "#section5",
            start: "15% top", // Start it late
            end: "80% top",
            scrub: true,
          }
        });
        
        gsap.utils.toArray('.screen-word').forEach((el) => {
          tl5.fromTo(
            el,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1 }
          );
        });

        // ---- Transition to Rest of Page ----
        // Fade out the fixed kiosk wrapper so it doesn't overlap the landing page content
        gsap.to(kioskWrapperRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: "#section5", // Fade out after words are done
            start: "bottom center",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, containerRef);

    // Mouse tracking for illustrations
    const handleMouseMove = (e) => {
      // Don't animate if scrolled past the hero section (e.g. y > 800)
      if (window.scrollY > 800) return;

      const { innerWidth } = window;
      const mouseX = e.clientX;
      const center = innerWidth / 2;
      const distanceFromCenter = mouseX - center;
      
      const maxDist = innerWidth / 2;
      const normalizedDist = Math.min(Math.max(distanceFromCenter / maxDist, -1), 1);
      
      // Deadzone ensures illustrations only pop out when cursor moves outside the kiosk area
      const deadzone = 0.35; 
      let leftIntensity = 0;
      let rightIntensity = 0;
      
      if (normalizedDist < -deadzone) {
        leftIntensity = (Math.abs(normalizedDist) - deadzone) / (1 - deadzone);
      } else if (normalizedDist > deadzone) {
        rightIntensity = (normalizedDist - deadzone) / (1 - deadzone);
      }
      
      gsap.to(labRecordRef.current, {
        x: leftIntensity * -450, 
        y: leftIntensity * -60,  
        rotation: leftIntensity * -12,
        opacity: leftIntensity * 0.95,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto"
      });
      
      gsap.to(certRef.current, {
        x: rightIntensity * 450, 
        y: rightIntensity * -60, 
        rotation: rightIntensity * 12,
        opacity: rightIntensity * 0.95,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
    <div className="home-animation" ref={containerRef}>
      {/* Floating pill navbar */}
        <nav className={`pill-navbar ${navbarVisible ? 'nav-visible nav-expanded' : ''}`} ref={navbarRef}>
          <img src="/models/logo.jpg" alt="PrintX logo" className="pill-navbar-logo" />
          <ul className="pill-navbar-links">
            <li><a href="/about" style={{ fontWeight: 600 }}>About PX</a></li>
            <li><a href="#premium" onClick={(e) => handleNavClick(e, 'premium')}>Premium</a></li>
            <li><a href="#app" onClick={(e) => handleNavClick(e, 'app')}>Our App</a></li>
            <li><a href="#map" onClick={(e) => handleNavClick(e, 'map')}>Find a Kiosk</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          <a href="/print" className="pill-navbar-cta">Print Now!</a>
        </nav>

      {/* Fixed kiosk wrapper with screen overlay */}
        <div className="px-kiosk-wrapper" ref={kioskWrapperRef}>
        
        {/* Illustrations (hidden behind kiosk) */}
        <div ref={labRecordRef} className="kiosk-illustration lab-record">
          <svg viewBox="0 0 210 297" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="premium-vector">
            <rect x="10" y="10" width="190" height="277" rx="8" />
            <text x="105" y="45" fontSize="16" fontFamily="'Unbounded', sans-serif" fontWeight="800" textAnchor="middle" stroke="none" fill="var(--primary)">Lab Record</text>
            <line x1="35" y1="70" x2="175" y2="70" strokeWidth="6" />
            <line x1="35" y1="100" x2="175" y2="100" />
            <line x1="35" y1="130" x2="175" y2="130" />
            <line x1="35" y1="160" x2="120" y2="160" />
            <rect x="35" y="190" width="140" height="70" rx="4" />
            <polyline points="50,240 85,210 125,230 155,200" strokeWidth="4" />
            <circle cx="50" cy="240" r="4" fill="var(--bg-cream)" />
            <circle cx="85" cy="210" r="4" fill="var(--bg-cream)" />
            <circle cx="125" cy="230" r="4" fill="var(--bg-cream)" />
            <circle cx="155" cy="200" r="4" fill="var(--bg-cream)" />
          </svg>
        </div>
        
        <div ref={certRef} className="kiosk-illustration certificate">
          <svg viewBox="0 0 297 210" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="premium-vector">
            <rect x="10" y="10" width="277" height="190" rx="8" />
            <rect x="24" y="24" width="249" height="162" rx="4" strokeWidth="2" strokeDasharray="8 8" />
            <text x="148" y="55" fontSize="18" fontFamily="'Unbounded', sans-serif" fontWeight="800" textAnchor="middle" stroke="none" fill="var(--primary)">Certificate</text>
            <line x1="88" y1="75" x2="208" y2="75" strokeWidth="8" />
            <line x1="50" y1="110" x2="247" y2="110" />
            <line x1="50" y1="140" x2="180" y2="140" />
            <line x1="50" y1="170" x2="120" y2="170" />
            <circle cx="230" cy="145" r="22" strokeWidth="4" />
            <path d="M218 163 L210 190 L230 177 L250 190 L242 163" strokeWidth="3" />
            <circle cx="230" cy="145" r="8" />
          </svg>
        </div>

        <img
          src="/models/kiosk.png"
          alt="PX Kiosk"
          className="px-kiosk-image"
          id="kiosk-image"
          style={{ position: 'relative', zIndex: 5 }}
        />
        <div className="screen-overlay" style={{ zIndex: 6 }}>
          <h1 id="heroText" className="txt"></h1>
          <h2 className="meet-px">Meet PX.</h2>
        </div>
      </div>

      {/* Scene 1 – pinned placeholder */}
      <section id="section1" className="home-section"></section>

      {/* Scene 2 – Meet PX placeholder */}
      <section id="section2" className="home-section"></section>

      {/* Scene 3 – Camera push placeholder */}
      <section id="section3" className="home-section"></section>

      {/* Scene 4 – Fullscreen zoom placeholder */}
      <section id="section4" className="home-section"></section>

      {/* Screen Words (Scene 5) */}
      <section id="section5" className="home-section screen-content">
        <h1 className="screen-word">Upload.</h1>
        <h1 className="screen-word">Print.</h1>
        <h1 className="screen-word">Done.</h1>
      </section>
    </div>
  );
}