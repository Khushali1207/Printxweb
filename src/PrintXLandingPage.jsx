import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap,
  ShieldCheck,
  Coins,
  Cpu,
  GraduationCap,
  Clock,
  UploadCloud,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  Globe,
  Compass,
  Star,
  Quote,
  Smartphone,
  Wallet
} from 'lucide-react';
import MarqueeBanner from './MarqueeBanner';

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
  softCream: '#FAF5F0',
  muted: 'rgba(255, 255, 255, 0.6)'
};

/* ─── Scroll-Reveal Text Component ─── */
const RevealText = ({ children, tag: Tag = 'h2', className = '', style = {} }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal-text ${visible ? 'revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

/* ─── Reveal Block (paragraphs, cards, etc.) ─── */
const RevealBlock = ({ children, delay = 0, className = '', style = {} }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-block ${visible ? 'revealed' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const inc = end / (duration / 16);
          const timer = setInterval(() => {
            start += inc;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── 3D Flip Card ─── */
const PremiumFlipCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <RevealBlock delay={delay}>
      <div
        className="flip-card"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="flip-card-inner"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <div className="flip-card-front">
            <Icon size={44} className="flip-icon" />
            <h3 className="flip-title">{title}</h3>
          </div>
          <div className="flip-card-back">
            <p className="flip-desc">{description}</p>
          </div>
        </div>
      </div>
    </RevealBlock>
  );
};

/* ─── Marquee Review Component ─── */
const REVIEWS = [
  { name: 'Arjun M.', college: 'IIT Bombay', text: 'Printed my entire thesis in 45 seconds. Absolutely blown away!', stars: 5 },
  { name: 'Priya S.', college: 'RVCE Bengaluru', text: 'No more standing in queues at the Xerox shop. PrintX is a lifesaver.', stars: 5 },
  { name: 'Rahul K.', college: 'DTU Delhi', text: 'The quality is incredible for the price. Better than any print shop near campus.', stars: 5 },
  { name: 'Sneha T.', college: 'VIT Vellore', text: 'Used it at the metro station before my interview. Got my resume printed in 20 seconds!', stars: 5 },
  { name: 'Vikram P.', college: 'NIT Trichy', text: 'AI formatting fixed my messy Word doc automatically. Pure magic.', stars: 5 },
  { name: 'Ananya R.', college: 'Christ University', text: 'Love that I don\'t need any app. Just scan QR, upload, and done. So seamless!', stars: 4 },
  { name: 'Karthik D.', college: 'BITS Pilani', text: 'The 24/7 availability is a game changer during exam season. Printed notes at 2 AM.', stars: 5 },
  { name: 'Meera J.', college: 'SRM Chennai', text: 'Cheapest prints I\'ve ever gotten. ₹2 per page for this quality is unreal.', stars: 5 },
];

const MarqueeReviews = () => {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-stars">
              {Array.from({ length: r.stars }).map((_, j) => (
                <Star key={j} size={14} fill={COLORS.dustyRose} color={COLORS.dustyRose} />
              ))}
            </div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-author">
              <span className="review-name">{r.name}</span>
              <span className="review-college">{r.college}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════════════════ */
export default function PrintXLandingPage() {
  const [activeNav, setActiveNav] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCity, setSelectedCity] = useState('bengaluru');

  const CITIES = [
    { id: 'delhi', name: 'New Delhi', kiosks: 18, coords: { x: '48%', y: '25%' }, location: 'Connaught Place Metro Hub', status: 'Online' },
    { id: 'mumbai', name: 'Mumbai', kiosks: 24, coords: { x: '30%', y: '58%' }, location: 'Bandra Kurla Complex (BKC)', status: 'Online' },
    { id: 'bengaluru', name: 'Bengaluru', kiosks: 32, coords: { x: '42%', y: '78%' }, location: 'Indiranagar Metro & Tech Parks', status: 'Online' },
    { id: 'chennai', name: 'Chennai', kiosks: 15, coords: { x: '52%', y: '82%' }, location: 'OMR IT Expressway Corridor', status: 'Online' },
    { id: 'kolkata', name: 'Kolkata', kiosks: 12, coords: { x: '72%', y: '45%' }, location: 'Salt Lake Sector V', status: 'Online' }
  ];

  const currentCityData = CITIES.find(c => c.id === selectedCity) || CITIES[2];

  const NAV_ITEMS = [
    { label: 'Home', id: 'hero' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Premium', id: 'premium' },
    { label: 'Scan & Print', id: 'scan-print' },
    { label: 'Our App', id: 'app' },
    { label: 'Contact Us', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setScrollProgress(Math.min(Math.max(y / 700, 0), 1));

      NAV_ITEMS.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 150 && r.bottom >= 150) setActiveNav(item.id);
        }
      });

      if (window.innerHeight + y >= document.documentElement.scrollHeight - 100) {
        setActiveNav('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Derived hero values */
  const textOpacity = Math.max(0, 1 - scrollProgress * 2);
  const textY = scrollProgress * 120;
  const kioskScale = 1 + scrollProgress * 0.35;

  return (
    <div style={{ position: 'relative' }}>

      {/* ═══ STICKY NAVBAR ═══ */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-brand" onClick={e => handleNavClick(e, 'hero')}>
          <div className="nav-logo-container logo-bounce">
            <img src="/logo.jpg" alt="PrintX Logo" className="nav-logo" />
          </div>
          <span>Print<span style={{ color: COLORS.dustyRose }}>X</span></span>
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className="nav-item">
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeNav === item.id ? 'active' : ''}`}
                onClick={e => handleNavClick(e, item.id)}
              >{item.label}</a>
            </li>
          ))}
          <li className="nav-item">
            <a href="#map" className="nav-link nav-kiosk-btn" onClick={e => handleNavClick(e, 'map')}>
              Find a Kiosk
            </a>
          </li>
        </ul>
      </nav>

      {/* ═══ HERO SECTION — Full-screen kiosk, no background ═══ */}
      <section
        id="hero"
        style={{
          minHeight: '200vh',
          backgroundColor: COLORS.offWhite,
          position: 'relative',
          padding: 0
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Ambient glow behind kiosk */}
          <div
            style={{
              position: 'absolute',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255, 227, 71, ${0.15 + scrollProgress * 0.2}) 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Hero text — fades and rises out on scroll */}
          <div
            style={{
              opacity: textOpacity,
              transform: `translateY(-${textY}px)`,
              textAlign: 'center',
              zIndex: 5,
              position: 'absolute',
              top: '8%',
              left: 0,
              right: 0,
              margin: '0 auto',
              maxWidth: '800px',
              padding: '0 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: scrollProgress > 0.4 ? 'none' : 'auto',
              willChange: 'transform, opacity'
            }}
          >
            <div className="badge" style={{ margin: '0 auto 20px' }}>FASTEST PRINT KIOSKS IN INDIA</div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
              Print Instantly.<br />
              <span style={{ color: COLORS.dustyRose }}>Think Differently.</span>
            </h1>
            <p className="hero-subtitle" style={{ margin: '0 auto 32px', maxWidth: '600px' }}>
              Locate the nearest PrintX smart kiosk, upload your documents securely via cloud, and collect high-quality prints in less than 30 seconds.
            </p>
            <div className="hero-cta-group cta-slide-right" style={{ justifyContent: 'center' }}>
              <a href="#map" className="btn-primary" onClick={e => handleNavClick(e, 'map')}>
                Locate Kiosk <Compass size={18} />
              </a>
              <a href="#how-it-works" className="btn-secondary" onClick={e => handleNavClick(e, 'how-it-works')}>
                How It Works
              </a>
            </div>
          </div>

          {/* KIOSK IMAGE — Raw, transparent, full-screen, no wrapper background */}
          <img
            src="/kiosk.png"
            alt="PrintX Kiosk"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: `translateX(-50%) scale(${kioskScale})`,
              transformOrigin: 'bottom center',
              height: `${65 + scrollProgress * 35}vh`,
              maxHeight: '95vh',
              width: 'auto',
              objectFit: 'contain',
              zIndex: 3,
              filter: `drop-shadow(0 -20px 80px rgba(195, 141, 158, ${0.15 + scrollProgress * 0.2}))`,
              willChange: 'transform, height',
              transition: 'none'
            }}
          />

          {/* "Scroll down" hint */}
          {scrollProgress < 0.1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(55,30,48,0.6)',
                fontSize: '13px',
                fontWeight: 500,
                zIndex: 10,
                animation: 'scrollHintPulse 2s infinite'
              }}
            >
              <span>Scroll to explore</span>
              <div style={{
                width: '24px', height: '40px', border: '2px solid rgba(55,30,48,0.4)',
                borderRadius: '12px', position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: '6px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px', height: '8px', borderRadius: '2px',
                  backgroundColor: COLORS.deepPlum,
                  animation: 'scrollDot 2s infinite'
                }} />
              </div>
            </div>
          )}
        </div>
      </section>

      <MarqueeBanner />

      {/* ═══ MARQUEE REVIEWS ═══ */}
      <section style={{ backgroundColor: COLORS.darkPurple, padding: '48px 0', overflow: 'hidden' }}>
        <RevealText tag="h2" className="section-title" style={{ color: COLORS.offWhite, marginBottom: '32px', textAlign: 'center' }}>
          What Students Say
        </RevealText>
        <MarqueeReviews />
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="section">
        <RevealText tag="h2" className="section-title">How PrintX Works</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: 'rgba(55,30,48,0.7)' }}>
          Printing your documents has never been simpler. Three quick steps at any kiosk.
        </RevealText>

        <div className="steps-grid">
          {[
            { num: '01', icon: MapPin, title: 'Locate Kiosk', desc: 'Find your closest PrintX kiosk in key colleges, metro stations, and business hubs using our locator map.' },
            { num: '02', icon: UploadCloud, title: 'Upload & Pay', desc: 'Scan the QR code, upload your PDF/Word documents from mobile, and make a quick UPI payment.' },
            { num: '03', icon: CheckCircle, title: 'Instant Printout', desc: 'Watch your document compile and print in under 30 seconds. Zero hassle, zero waiting.' }
          ].map((step, i) => (
            <RevealBlock key={step.num} delay={i * 120}>
              <div className="step-card">
                <div className="step-num">{step.num}</div>
                <div className="step-icon-wrapper"><step.icon size={32} /></div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ═══ PREMIUM — PURE YELLOW ═══ */}
      <section id="premium" className="section">
        <RevealText tag="h2" className="section-title">Premium Features</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: 'rgba(55,30,48,0.8)' }}>
          Unlock the absolute best in automated kiosk printing.
        </RevealText>

        <div className="premium-grid">
          <PremiumFlipCard icon={Zap} title="Lightning Fast" description="Upload and print in under 30 seconds" delay={0} />
          <PremiumFlipCard icon={ShieldCheck} title="Zero Privacy Risk" description="Military-grade encryption, no human oversight" delay={80} />
          <PremiumFlipCard icon={Coins} title="Lowest Prices" description="Most affordable per-page printing in India" delay={160} />
          <PremiumFlipCard icon={Cpu} title="AI Powered" description="Smart document formatting & conversion" delay={240} />
          <PremiumFlipCard icon={GraduationCap} title="College Ready" description="Pre-built templates for assignments & thesis" delay={320} />
          <PremiumFlipCard icon={Clock} title="24/7 Available" description="Access kiosks anytime, anywhere in India" delay={400} />
        </div>
      </section>

      {/* ═══ SCAN & PRINT ═══ */}
      <section id="scan-print" className="section">
        <div className="scan-print-container">
          <div className="scan-print-content">
            <RevealText tag="h2" className="scan-print-title">
              Scan, Upload, &amp;<br />Print on the Go
            </RevealText>
            <RevealBlock delay={100}>
              <p className="scan-print-desc">
                Our smart document scanner converts physical notes, pages, or IDs into high-quality PDFs and prints them in seconds. No apps, no signups.
              </p>
            </RevealBlock>

            <div className="features-list">
              {['Automated page alignment & deskewing', 'High contrast B&W and color presets', 'Multi-page binding template builder'].map((f, i) => (
                <RevealBlock key={i} delay={200 + i * 80}>
                  <div className="feature-item">
                    <div className="feature-check"><CheckCircle size={16} /></div>
                    <span className="feature-text">{f}</span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>

          <RevealBlock delay={150}>
            <div className="floating-card">
              <div className="floating-card-header">
                <span className="flow-title">Secure Upload Tunnel</span>
                <span className="flow-step-pill">Kiosk Active</span>
              </div>
              <div className="flow-graphic">
                <UploadCloud size={48} className="flow-upload-icon" />
                <p className="flow-upload-label" style={{ fontWeight: 600, color: COLORS.offWhite, marginBottom: '8px' }}>
                  Drag & drop your files here
                </p>
                <p className="flow-upload-label" style={{ fontSize: '12px' }}>
                  Supports PDF, DOCX, PNG, JPG (Max 50MB)
                </p>
              </div>
              <button className="flow-btn">Select Files <ArrowRight size={16} /></button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══ OUR APP ═══ */}
      <section id="app" className="section section-app" style={{ backgroundColor: COLORS.darkPurple, padding: '80px 0' }}>
        <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', padding: '0 24px' }}>
          <div className="app-visual" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Phone Mockup */}
            <div style={{ width: '300px', height: '620px', backgroundColor: COLORS.offWhite, borderRadius: '40px', padding: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: `4px solid ${COLORS.dustyRose}`, position: 'relative' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.softCream, borderRadius: '28px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px', backgroundColor: COLORS.deepPlum, color: COLORS.offWhite }}>
                  <h4 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}><Smartphone size={20} /> PrintX App</h4>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ backgroundColor: COLORS.offWhite, padding: '16px', borderRadius: '12px', border: `1px solid rgba(55,30,48,0.1)`, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: COLORS.muted }}>Next Print Queue</p>
                    <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 600, color: COLORS.deepPlum }}>Indiranagar Metro</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4ade80' }}>● Available (Wait: 0 mins)</p>
                  </div>
                  <div style={{ backgroundColor: COLORS.offWhite, padding: '16px', borderRadius: '12px', border: `1px solid rgba(55,30,48,0.1)`, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: COLORS.muted }}>Cloud Storage</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: COLORS.dustyRose, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: COLORS.offWhite }}><UploadCloud size={20} /></div>
                      <div style={{ width: '40px', height: '40px', backgroundColor: COLORS.deepPlum, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: COLORS.offWhite }}><Wallet size={20} /></div>
                    </div>
                  </div>
                  <button style={{ marginTop: 'auto', backgroundColor: COLORS.darkPurple, color: COLORS.offWhite, border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>Print Now <ArrowRight size={18}/></button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="app-content">
            <RevealText tag="h2" className="section-title" style={{ color: COLORS.offWhite, textAlign: 'left' }}>
              Print from Your Pocket
            </RevealText>
            <RevealBlock delay={100}>
              <p className="scan-print-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Download the PrintX app to manage your documents, check live kiosk queues, and pay instantly via UPI. Your personal printing assistant.
              </p>
            </RevealBlock>
            <div className="features-list" style={{ marginTop: '32px' }}>
              {[
                { icon: Compass, title: 'Live Queue Tracking', desc: 'Check wait times before you walk in.' },
                { icon: UploadCloud, title: 'Cloud Integration', desc: 'Sync with Google Drive & OneDrive.' },
                { icon: Wallet, title: 'One-Tap Payments', desc: 'Built-in wallet & seamless UPI integration.' }
              ].map((f, i) => (
                <RevealBlock key={i} delay={200 + i * 100}>
                  <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div className="feature-check" style={{ backgroundColor: 'rgba(195, 141, 158, 0.2)', color: COLORS.dustyRose, flexShrink: 0 }}><f.icon size={20} /></div>
                    <div>
                      <span className="feature-text" style={{ color: COLORS.offWhite, display: 'block', marginBottom: '4px' }}>{f.title}</span>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{f.desc}</span>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="stats" className="section section-70vh">
        <RevealText tag="h2" className="section-title">PrintX in Numbers</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: 'rgba(55,30,48,0.8)' }}>
          Powering students, professionals, and commuters across India.
        </RevealText>

        <div className="stats-grid">
          {[
            { end: 100, suffix: '+', label: 'Active Kiosks' },
            { end: 15, suffix: 'M+', label: 'Pages Printed' },
            { end: 30, suffix: 's', label: 'Average Print Time' },
            { end: 99, suffix: '%', label: 'Uptime Record' }
          ].map((s, i) => (
            <RevealBlock key={s.label} delay={i * 100}>
              <div className="stat-card">
                <div className="stat-number"><AnimatedCounter end={s.end} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ═══ KIOSK LOCATOR MAP ═══ */}
      <section id="map" className="section">
        <RevealText tag="h2" className="section-title">Locate a Kiosk</RevealText>
        <RevealText tag="p" className="section-subtitle">
          Select a city to view live kiosk status. Walk in to start printing.
        </RevealText>

        <div className="map-container">
          <div className="map-sidebar">
            <RevealText tag="h3" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Select City Hub</RevealText>
            <RevealBlock>
              <p style={{ color: COLORS.muted, fontSize: '15px' }}>Kiosk installations at major tech corridors and transit hubs.</p>
            </RevealBlock>

            <div className="city-list">
              {CITIES.map((city, i) => (
                <RevealBlock key={city.id} delay={i * 60}>
                  <div
                    className={`city-item ${selectedCity === city.id ? 'active' : ''}`}
                    onClick={() => setSelectedCity(city.id)}
                  >
                    <span className="city-name">{city.name}</span>
                    <span className="city-count">{city.kiosks} Kiosks</span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>

          <RevealBlock delay={100}>
            <div className="map-visual-wrapper" style={{ padding: 0, overflow: 'hidden' }}>
              <iframe 
                src="https://viewer.mapme.com/5a655c2e-2e4a-433b-acaf-f3c9bc28db94" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '28px' }}
                title="PrintX Locations"
                allowFullScreen
              />
              {/* Overlay to hide MapMe free trial watermark */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', backgroundColor: COLORS.darkPurple, zIndex: 10, pointerEvents: 'none' }} />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="section">
        <RevealText tag="h2" className="section-title">Contact Us</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: COLORS.muted }}>
          Want a PrintX kiosk in your college or office? Get in touch.
        </RevealText>

        <div className="contact-container">
          <div className="contact-info-col">
            {[
              { icon: Phone, title: 'Call Us', value: '+91 98765 43210' },
              { icon: Mail, title: 'Email Us', value: 'support@printx.in' },
              { icon: Globe, title: 'Headquarters', value: 'Indiranagar 100ft Road, Bengaluru, India' }
            ].map((c, i) => (
              <RevealBlock key={c.title} delay={i * 100}>
                <div className="contact-info-card">
                  <div className="contact-icon-wrapper"><c.icon size={24} /></div>
                  <div>
                    <div className="contact-card-title">{c.title}</div>
                    <div className="contact-card-value">{c.value}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={100}>
            <div className="contact-form-wrapper">
              <form onSubmit={e => { e.preventDefault(); alert('Thank you! We\'ll get back within 24 hours.'); }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input type="text" id="name" className="form-control" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="form-control" required placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message / Inquiry</label>
                  <textarea id="message" className="form-control" rows="4" required placeholder="Tell us about your requirements..." />
                </div>
                <button type="submit" className="form-submit-btn">Send Message <ArrowRight size={18} /></button>
              </form>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <p>&copy; {new Date().getFullYear()} PrintX Technologies Pvt. Ltd. All rights reserved.</p>
        <p style={{ marginTop: '8px', fontSize: '13px' }}>Made with ❤️ in India. Military-grade encryption protection.</p>
      </footer>
    </div>
  );
}
