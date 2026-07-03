import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const statsRef = useRef(null);
  const dragWrapRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 2. Vision Text scrub
      gsap.fromTo('.ab-vision-text', 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: '.ab-vision-text',
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1
          }
        }
      );

      // 3. Vision Phone scrub
      gsap.fromTo('.ab-vision-phone',
        { opacity: 0, y: 80, rotateY: -15, rotateX: 10 },
        {
          opacity: 1, y: 0, rotateY: -10, rotateX: 5,
          scrollTrigger: {
            trigger: '.ab-vision',
            start: 'top 75%',
            end: 'center center',
            scrub: 1
          }
        }
      );

      // 4. Info Cards Stagger Scrub
      gsap.fromTo('.ab-info-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.ab-static-info',
            start: 'top 80%',
            end: 'center 40%',
            scrub: 1
          }
        }
      );

      // 5. Letter Section scrub
      gsap.fromTo('.ab-letter-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          scrollTrigger: {
            trigger: '.ab-letter-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 1
          }
        }
      );

      // 6. Stats Counter on Enter
      const animateCount = (span, target) => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => { span.textContent = Math.floor(obj.val).toLocaleString(); }
        });
      };
      
      ScrollTrigger.create({
        trigger: '.ab-stats',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          document.querySelectorAll('.ab-stats [data-target]').forEach(span => {
            animateCount(span, parseInt(span.dataset.target, 10));
          });
        }
      });
      
      // 7. Stats fade up
      gsap.fromTo('.ab-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.15,
          scrollTrigger: { trigger: '.ab-stats', start: 'top 85%', scrub: 1, end: 'center center' }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  // Drag pillars
  useEffect(() => {
    const wrap = dragWrapRef.current;
    if (!wrap) return;
    let isDragging = false, startX = 0, scrollLeft = 0;
    const onMouseDown = (e) => { isDragging = true; startX = e.pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft; };
    const onMouseLeave = () => { isDragging = false; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e) => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - wrap.offsetLeft; wrap.scrollLeft = scrollLeft - (x - startX) * 1.5; };
    const onTouchStart = (e) => { startX = e.touches[0].pageX; scrollLeft = wrap.scrollLeft; };
    const onTouchMove = (e) => { wrap.scrollLeft = scrollLeft - (e.touches[0].pageX - startX); };
    wrap.addEventListener('mousedown', onMouseDown);
    wrap.addEventListener('mouseleave', onMouseLeave);
    wrap.addEventListener('mouseup', onMouseUp);
    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('touchstart', onTouchStart);
    wrap.addEventListener('touchmove', onTouchMove);
    return () => {
      wrap.removeEventListener('mousedown', onMouseDown);
      wrap.removeEventListener('mouseleave', onMouseLeave);
      wrap.removeEventListener('mouseup', onMouseUp);
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('touchstart', onTouchStart);
      wrap.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const heroLines = [
    { id: 'h1', text: '"You had an assignment due', classes: '' },
    { id: 'h2', text: 'at midnight.', classes: 'accent' },
    { id: 'h3', text: 'The shop was closed.', classes: '' },
    { id: 'h4', text: 'The queue was long."', classes: '', delay: '0.15s' },
    { id: 'h5', text: "We've been there.", classes: 'big', delay: '0.3s' },
    { id: 'h6', text: "So we built PrintX — for every student who's ever been stuck.", classes: 'sub' },
  ];

  const marqueeItems = [
    'Last minute assignments', 'Queue fatigue', 'No printing at 2AM',
    'Document stress', 'Limited access', 'Formatting chaos', 'Missed deadlines',
  ];

  return (
    <div className="about-page" style={{ position: 'relative' }}>
      {/* Navbar */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: 'transparent',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/models/logo.jpg" alt="PrintX" style={{ height: 28, objectFit: 'contain' }} />
          </Link>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: '#371E30', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            transition: 'color 0.2s', fontFamily: 'Space Grotesk, sans-serif'
          }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <div>{/* Empty right side for global login button */}</div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="ab-hero">
        <div className="ab-hero-bg-text">PX</div>
        {heroLines.map((line, i) => (
          <div
            key={line.id}
            className={`ab-hero-line ${line.classes}`}
            style={{ transitionDelay: line.delay || `${i * 0.12}s` }}
          >
            {line.text}
          </div>
        ))}
      </section>

      {/* SECTION 2: VISION + PHONE MOCKUP */}
      <section className="ab-vision">
        <div className="ab-vision-split">
          <div className="ab-vision-content">
            <div className="ab-vision-quote-mark">"</div>
            <div className="ab-vision-text" ref={visionRef}>
              To <em>empower students</em> with seamless solutions that turn everyday struggles into <em>effortless experiences.</em>
            </div>
          </div>
          
          <div className="ab-vision-phone">
            <div className="ab-phone-frame">
              <div className="ab-phone-notch"></div>
              <div className="ab-phone-screen">
                <div className="ab-phone-content">
                  <h3>Our Vision</h3>
                  <p>
                    "To empower students with seamless solutions that turn everyday struggles into effortless experiences."
                  </p>
                  <div className="ab-phone-btns">
                    <Link to="/installation" className="ab-phone-btn primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Join Us</Link>
                    <Link to="/print" className="ab-phone-btn icon" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ab-marquee-wrap">
          <div className="ab-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span className="ab-marquee-item" key={i}>
                {item} <span className="ab-marquee-dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MODIFIED STATIC INFO SECTION */}
      <section className="ab-static-info">
        <div className="ab-info-grid">
          <div className="ab-info-card">
            <div className="ab-info-num">01 — What We Are</div>
            <div className="ab-info-title">Simple</div>
            <div className="ab-info-desc">No apps. No signups. No complexity. Just scan, upload, pay, and print. We stripped away everything that frustrated you.</div>
          </div>
          <div className="ab-info-card">
            <div className="ab-info-num">02 — Our Promise</div>
            <div className="ab-info-title">Fast</div>
            <div className="ab-info-desc">Under 30 seconds from scan to printout. 24/7. No queues. No waiting. Your time is too valuable to waste on printing.</div>
          </div>
          <div className="ab-info-card">
            <div className="ab-info-num">03 — Built For You</div>
            <div className="ab-info-title">Yours</div>
            <div className="ab-info-desc">AI editor, smart cover pages, document management — PrintX is built around how students actually work, not how shops want them to.</div>
          </div>
        </div>
      </section>


      {/* SECTION 5: DRAG PILLARS */}
      <section className="ab-pillars">
        <div className="ab-pillars-label">What PrintX Stands For</div>
        <div className="ab-pillars-track-wrap" ref={dragWrapRef}>
          <div className="ab-pillars-track">
            <div className="ab-pillar ab-pillar-1">
              <div className="ab-pillar-num">01</div>
              <div>
                <div className="ab-pillar-title">Student First</div>
                <div className="ab-pillar-desc">Every decision we make starts with one question: does this make a student's life easier? If no, we don't ship it.</div>
              </div>
            </div>
            <div className="ab-pillar ab-pillar-2">
              <div className="ab-pillar-num">02</div>
              <div>
                <div className="ab-pillar-title">Technology That Serves</div>
                <div className="ab-pillar-desc">We use AI and smart systems to remove friction — not to add features for the sake of it. Simpler is always better.</div>
              </div>
            </div>
            <div className="ab-pillar ab-pillar-3">
              <div className="ab-pillar-num">03</div>
              <div>
                <div className="ab-pillar-title">Access For All</div>
                <div className="ab-pillar-desc">Printing should not be a privilege. We're building PrintX to be available everywhere students are — 24/7, no exceptions.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="ab-drag-hint">← Drag to explore →</div>
      </section>

      {/* SECTION 6: FOUNDER LETTER */}
      <section className="ab-letter-section">
        <div className="ab-letter-card">
          <div className="ab-letter-seal">PX</div>
          <div className="ab-letter-date">July 2026 · Bengaluru, India</div>
          <div className="ab-letter-greeting">Dear Student,</div>
          <div className="ab-letter-body">
            <p>We started PrintX because we lived your frustration. Assignments due at midnight. Printing shops closed. Queues that ate into your study time. Documents lost or corrupted at the worst moment.</p>
            <p>We didn't want to build another app that promised to "disrupt printing." We wanted to build something that just worked — quietly, reliably, always there when you needed it.</p>
            <p>PrintX is built for you. Not for investors. Not for press releases. For the student with 20 minutes before submission. For the one printing at 2AM. For the one who deserves better.</p>
            <p>We're just getting started.</p>
          </div>
          <div className="ab-letter-sign-label">With respect,</div>
          <div className="ab-letter-signature">The PrintX Team</div>
          <div className="ab-letter-from">Founders, PrintX</div>
        </div>
      </section>

      {/* SECTION 7: STATS */}
      <section className="ab-stats" ref={statsRef}>
        <div className="ab-stat">
          <div className="ab-stat-num"><span data-target="50">0</span>+</div>
          <div className="ab-stat-label">Active Kiosks</div>
        </div>
        <div className="ab-stat">
          <div className="ab-stat-num"><span data-target="4000">0</span>+</div>
          <div className="ab-stat-label">Daily Prints</div>
        </div>
        <div className="ab-stat">
          <div className="ab-stat-num"><span data-target="2000">0</span>+</div>
          <div className="ab-stat-label">Students Served</div>
        </div>
      </section>

      {/* SECTION 8: ECOSYSTEM */}
      <section className="ab-ecosystem">
        <div className="ab-eco-title">A Smarter Student Ecosystem</div>
        <div className="ab-eco-sub">Everything connected. Everything instant.</div>
        <div className="ab-eco-network">
          <svg viewBox="0 0 700 300" fill="none">
            <line x1="120" y1="150" x2="240" y2="100" stroke="#B4869F" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
            <line x1="240" y1="100" x2="360" y2="150" stroke="#B4869F" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
            <line x1="360" y1="150" x2="480" y2="100" stroke="#B4869F" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
            <line x1="480" y1="100" x2="590" y2="150" stroke="#B4869F" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
            <circle cx="120" cy="150" r="36" fill="#371E30" />
            <text x="120" y="146" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FCF7F8">Find</text>
            <text x="120" y="158" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#B4869F">Kiosk</text>
            <circle cx="240" cy="100" r="36" fill="#5A3B57" />
            <text x="240" y="96" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FCF7F8">Upload</text>
            <text x="240" y="108" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FEEDA0">&amp; Pay</text>
            <circle cx="360" cy="150" r="44" fill="#B4869F" />
            <text x="360" y="146" textAnchor="middle" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" fill="#FCF7F8">Print</text>
            <text x="360" y="160" textAnchor="middle" fontFamily="Space Grotesk" fontSize="10" fontWeight="700" fill="#FCF7F8">30s</text>
            <circle cx="480" cy="100" r="36" fill="#5A3B57" />
            <text x="480" y="96" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FCF7F8">Collect</text>
            <text x="480" y="108" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FEEDA0">Prints</text>
            <circle cx="590" cy="150" r="36" fill="#371E30" />
            <text x="590" y="146" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FCF7F8">Done</text>
            <text x="590" y="158" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#FFE347">Always</text>
          </svg>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta-section">
        <div className="ab-cta-title">Ready to Print Smarter?</div>
        <div className="ab-cta-sub">Find your nearest PrintX kiosk and experience it yourself.</div>
        <div className="ab-cta-btns">
          <a href="/#map" className="ab-btn ab-btn-dark" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); window.location.href = '/'; setTimeout(() => { const el = document.getElementById('map'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 500); }}>Find a Kiosk</a>
          <Link to="/print" className="ab-btn ab-btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>Start Printing</Link>
        </div>
      </section>
    </div>
  );
}
