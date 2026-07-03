import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  Wallet,
  ScanLine,
  FileText,
  X,
  Printer,
  Navigation
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import MarqueeBanner from './MarqueeBanner';
import HomeAnimation from './HomeAnimation';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
  softCream: '#FAF5F0',
  muted: 'rgba(255, 255, 255, 0.6)'
};

/* ─── Animation Presets ─── */
const EASE_SPRING  = [0.34, 1.56, 0.64, 1];   // spring overshoot
const EASE_SMOOTH  = [0.25, 0.46, 0.45, 0.94]; // snappy interactive
const EASE_EXIT    = [0.7, 0, 1, 0.72];        // quick exit

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SPRING, delay: delay / 1000 }
  })
};

const staggerContainer = (staggerMs = 100) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerMs / 1000 } }
});

/* ─── Scroll-Reveal Text Component (Framer Motion) ─── */
const RevealText = ({ children, tag: Tag = 'h2', className = '', style = {}, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <Tag ref={ref} className={className} style={{
      ...style,
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(50px)',
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'transform, opacity'
    }}>
      {children}
    </Tag>
  );
};

/* ─── Reveal Block (Framer Motion) ─── */
const RevealBlock = ({ children, delay = 0, className = '', style = {} }) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px' }}
      custom={delay}
      variants={fadeUpVariants}
    >
      {children}
    </motion.div>
  );
};

/* ─── Animated Counter (IntersectionObserver) ─── */
const AnimatedCounter = ({ end, duration = 1200, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // cubic-bezier(0.25, 0.46, 0.45, 0.94) approximation
            const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            setCount(Math.floor(ease * end));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── 3D Flip Card ─── */
const PremiumFlipCard = ({ emoji, title, subtitle, headline, description, delay = 0 }) => {
  const handleEnter = () => setIsFlipped(true);
  const handleLeave = () => setIsFlipped(false);
  const handleClick = () => setIsFlipped(!isFlipped);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <RevealBlock delay={delay}>
      <div
        className="flip-card"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div
          className="flip-card-inner"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <div className="flip-card-front">
            <span className="flip-emoji">{emoji}</span>
            <h3 className="flip-title">{title}</h3>
            <p className="flip-subtitle">{subtitle}</p>
          </div>
          <div className="flip-card-back">
            <h4 className="flip-headline">{headline}</h4>
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
                <Star key={j} size={14} fill={'var(--color-accent)'} color={'var(--color-accent)'} />
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
  const [activeStep, setActiveStep] = useState('01');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const INITIAL_COLLEGES = [
    { id: 'iit_delhi', name: 'IIT Delhi', city: 'New Delhi', lat: 28.5450, lng: 77.1926, status: 'Online', kiosks: 3 },
    { id: 'dtu', name: 'DTU', city: 'New Delhi', lat: 28.7499, lng: 77.1183, status: 'Online', kiosks: 2 },
    { id: 'bvcoe', name: 'Bharati Vidyapeeth College Of Engineering', city: 'Navi Mumbai', lat: 19.0288, lng: 73.0594, status: 'Online', kiosks: 3 },
    { id: 'iit_kharagpur', name: 'IIT Kharagpur', city: 'Kolkata', lat: 22.3149, lng: 87.3105, status: 'Online', kiosks: 3 },
  ];

  const [colleges, setColleges] = useState(() => 
    INITIAL_COLLEGES.map(c => ({ ...c, distanceValue: Infinity, distanceStr: 'Calculating...' }))
  );
  const [selectedCollege, setSelectedCollege] = useState('iit_delhi');

  const currentCollege = colleges.find(c => c.id === selectedCollege) || colleges[0];
  const mapSrc = `https://maps.google.com/maps?q=${currentCollege.lat},${currentCollege.lng}&z=16&output=embed`;

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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          try {
            const updatedColleges = await Promise.all([...INITIAL_COLLEGES].map(async c => {
              try {
                const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${lng},${lat};${c.lng},${c.lat}?overview=false`);
                const data = await res.json();
                
                if (data.routes && data.routes.length > 0) {
                  const distKm = data.routes[0].distance / 1000;
                  const durationMin = data.routes[0].duration / 60;
                  
                  return {
                    ...c,
                    distanceValue: distKm,
                    distanceStr: distKm < 1 ? `${(distKm * 1000).toFixed(0)} m · ~${Math.ceil(durationMin)} min drive` : `${distKm.toFixed(1)} km · ~${Math.ceil(durationMin)} min drive`
                  };
                }
              } catch(e) {
                console.error("OSRM failed for", c.name, e);
              }
              // Fallback to Haversine
              const dist = getDistanceFromLatLonInKm(lat, lng, c.lat, c.lng);
              return {
                ...c,
                distanceValue: dist,
                distanceStr: dist < 1 ? `${(dist * 1000).toFixed(0)} m · ~${Math.ceil((dist/5)*60)} min walk` : `${dist.toFixed(1)} km · ~${Math.ceil((dist/40)*60)} min drive`
              };
            }));

            const sorted = updatedColleges.sort((a, b) => a.distanceValue - b.distanceValue);
            setColleges(sorted);
            if (sorted.length > 0) setSelectedCollege(sorted[0].id);
          } catch(e) {
             console.error("Failed real distance", e);
          }
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setColleges(INITIAL_COLLEGES.map(c => ({...c, distanceValue: Infinity, distanceStr: 'Location Off'})));
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
      );
    } else {
       setColleges(INITIAL_COLLEGES.map(c => ({...c, distanceValue: Infinity, distanceStr: 'Unsupported'})));
    }
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      <HomeAnimation />
      <MarqueeBanner />



      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="section">
        <RevealText tag="h2" className="section-title">How PrintX Works</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: 'rgba(55,30,48,0.7)' }} delay={80}>
          Printing your documents has never been simpler. Three quick steps at any kiosk.
        </RevealText>

        <motion.div
          className="steps-grid"
          variants={staggerContainer(100)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          {[
            { num: '01', icon: MapPin, title: 'Locate Kiosk', desc: 'Find your closest PrintX kiosk in key colleges, metro stations, and business hubs using our locator map.' },
            { num: '02', icon: UploadCloud, title: 'Upload & Pay', desc: 'Scan the QR code, upload your PDF/Word documents from mobile, and make a quick UPI payment.' },
            { num: '03', icon: CheckCircle, title: 'Instant Printout', desc: 'Watch your document compile and print in under 30 seconds. Zero hassle, zero waiting.' }
          ].map((step, i) => (

  <motion.div
    key={step.num}
    variants={fadeUpVariants}
    className={`step-card-wrapper ${activeStep === step.num ? 'expanded' : ''}`}
    style={{ willChange: 'transform, opacity' }}
    whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(180,134,159,0.25)', transition: { duration: 0.25, ease: EASE_SMOOTH } }}
    onMouseEnter={() => setActiveStep(step.num)}
    onMouseLeave={() => setActiveStep('01')}
  >
    <div className="step-card">
      <div className="step-num">{step.num}</div>
      <div className="step-icon-wrapper"><step.icon size={32} className={activeStep===step.num ? 'filled' : ''} /></div>
      <h3 className="step-title">{step.title}</h3>
      <p className="step-desc">{step.desc}</p>
    </div>
  </motion.div>
))}


        </motion.div>
      </section>

      {/* ═══ PREMIUM ═══ */}
      <section id="premium" className="section">
        <RevealText tag="h2" className="section-title">Premium Features</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: 'rgba(55,30,48,0.8)' }} delay={80}>
          Unlock the absolute best in automated kiosk printing.
        </RevealText>

        <motion.div
          className="premium-grid"
          variants={staggerContainer(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px 0px' }}
        >
          <PremiumFlipCard emoji="🚫" title="No Ads" subtitle="Ad-free experience" headline="No Distractions" description="Print without pop-ups or sponsored content. Just pure printing." delay={0} />
          <PremiumFlipCard emoji="✨" title="AI-Powered Editor" subtitle="Edit before printing" headline="Perfect Every Time" description="Fix formatting, adjust colors, optimize layouts with one click. Your documents, perfected." delay={100} />
          <PremiumFlipCard emoji="🪄" title="AI Writer" subtitle="Generate content instantly" headline="Write in Seconds" description="Generate essays, letters, assignments in seconds. Perfect for last-minute reports and creative writing." delay={200} />
          <PremiumFlipCard emoji="✓" title="Smart Cover Pages" subtitle="Auto-fill your details" headline="Zero Manual Work" description="Auto-fill name, roll number, year, college, date. No more typing — just upload and print." delay={300} />
        </motion.div>
      </section>



      {/* ═══ OUR APP ═══ */}
      <section id="app" className="section section-app" style={{ backgroundColor: 'var(--color-ink)', padding: '80px 0' }}>
        <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', padding: '0 24px' }}>
          <motion.div
            className="app-visual"
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', willChange: 'transform' }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE_SPRING }}
            viewport={{ once: true, margin: '-80px 0px' }}
          >
            <div style={{ width: '300px', height: '620px', backgroundColor: 'var(--color-bg)', borderRadius: '40px', padding: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: `4px solid ${'var(--color-accent)'}`, position: 'relative' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-bg)', borderRadius: '28px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px', backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}><Smartphone size={20} /> PrintX App</h4>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ backgroundColor: 'var(--color-bg)', padding: '16px', borderRadius: '12px', border: `1px solid rgba(55,30,48,0.1)`, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-ink-soft)' }}>Next Print Queue</p>
                    <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)' }}>Indiranagar Metro</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4ade80' }}>● Available (Wait: 0 mins)</p>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-bg)', padding: '16px', borderRadius: '12px', border: `1px solid rgba(55,30,48,0.1)`, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-ink-soft)' }}>Cloud Storage</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-accent)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--color-bg)' }}><UploadCloud size={20} /></div>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-ink)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--color-bg)' }}><Wallet size={20} /></div>
                    </div>
                  </div>
                  <button style={{ marginTop: 'auto', backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>Print Now <ArrowRight size={18} /></button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="app-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE_SPRING, delay: 0.15 }}
            viewport={{ once: true, margin: '-80px 0px' }}
          >
            <RevealText tag="h2" className="section-title" style={{ color: 'var(--color-bg)', textAlign: 'left' }}>
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
                    <div className="feature-check" style={{ backgroundColor: 'rgba(195, 141, 158, 0.2)', color: 'var(--color-accent)', flexShrink: 0 }}><f.icon size={20} /></div>
                    <div>
                      <span className="feature-text" style={{ color: 'var(--color-bg)', display: 'block', marginBottom: '4px' }}>{f.title}</span>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{f.desc}</span>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="stats" className="section section-70vh">
        <RevealText tag="h2" className="section-title">PrintX in Numbers</RevealText>
        <RevealText tag="p" className="section-subtitle" style={{ color: 'rgba(55,30,48,0.8)' }} delay={80}>
          Powering students, professionals, and commuters across India.
        </RevealText>

        <motion.div
          className="stats-grid"
          variants={staggerContainer(100)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
        >
          {[
            { end: 100, suffix: '+', label: 'Active Kiosks' },
            { end: 15, suffix: 'M+', label: 'Pages Printed' },
            { end: 30, suffix: 's', label: 'Average Print Time' },
            { end: 99, suffix: '%', label: 'Uptime Record' }
          ].map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUpVariants}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="stat-card">
                <div className="stat-number"><AnimatedCounter end={s.end} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ KIOSK LOCATOR MAP ═══ */}
      <section id="map" className="section">
        <RevealText tag="h2" className="section-title">Locate a Kiosk</RevealText>
        <RevealText tag="p" className="section-subtitle">
          Nearest colleges first — click any name to zoom to that kiosk.
        </RevealText>

        <div className="map-container">
          <div className="map-sidebar">
            <RevealText tag="h3" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Colleges Near You</RevealText>
            <RevealBlock>
              <p style={{ color: 'var(--color-ink-soft)', fontSize: '14px', marginBottom: '16px' }}>Sorted by proximity · click to zoom</p>
            </RevealBlock>

            <div className="city-list">
              {colleges.map((college, i) => (
                <RevealBlock key={college.id} delay={i * 50}>
                  <div
                    className={`city-item ${selectedCollege === college.id ? 'active' : ''}`}
                    onClick={() => setSelectedCollege(college.id)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                      <span className="city-name" style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{college.name}</span>
                      <span style={{ fontSize: '12px', opacity: 0.65, fontWeight: 400 }}>{college.city} · {college.distanceStr}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                      <span className="city-count">{college.kiosks} Kiosks</span>
                      <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 600 }}>● {college.status}</span>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>

          <RevealBlock delay={100}>
            <div className="map-visual-wrapper" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
              <iframe
                key={selectedCollege}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 'none', borderRadius: '28px' }}
                title={`PrintX Kiosk — ${currentCollege.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* College name badge over map */}
              <div style={{
                position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)',
                padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 10, pointerEvents: 'none',
                whiteSpace: 'nowrap'
              }}>
                <MapPin size={14} color={'var(--color-accent)'} />
                {currentCollege.name}
              </div>

              {/* Go to Map / Get Directions Button */}
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${currentCollege.lat},${currentCollege.lng}`}
                target="_blank" rel="noreferrer"
                style={{
                  position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)',
                  padding: '12px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.4)', zIndex: 10, cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)'; }}
              >
                <Navigation size={18} /> Get Directions
              </a>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══ MARQUEE REVIEWS ═══ */}
      <section style={{ backgroundColor: 'var(--color-ink)', padding: '48px 0', overflow: 'hidden' }}>
        <RevealText tag="h2" className="section-title" style={{ color: 'var(--color-bg)', marginBottom: '32px', textAlign: 'center' }}>
          What Students Say
        </RevealText>
        <MarqueeReviews />
      </section>

      {/* ═══ HOST A KIOSK CTA ═══ */}
      <section style={{ backgroundColor: COLORS.electricYellow, color: COLORS.deepPlum, padding: '40px 32px', borderRadius: '24px', margin: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(20px, 3vw, 28px)', margin: 0 }}>
          Want to offer 24/7 printing?
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(55, 30, 48, 0.8)', maxWidth: '600px', margin: 0 }}>
          You can host your own PrintX machine in your college, hostel, co-working space, or public area.
        </p>
        <Link to="/installation" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '15px', background: COLORS.deepPlum, color: COLORS.offWhite, borderRadius: '99px', textDecoration: 'none', fontWeight: 600, marginTop: '8px' }}>
          Request Installation <ArrowRight size={18} />
        </Link>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <p>&copy; {new Date().getFullYear()} PrintX Technologies Pvt. Ltd. All rights reserved.</p>
        <p style={{ marginTop: '8px', fontSize: '13px' }}>Made with ❤️ in India. Military-grade encryption protection.</p>
        <p style={{ marginTop: '12px', fontSize: '13px' }}>
          <a href="/help" style={{ color: COLORS.dustyRose, textDecoration: 'none', fontWeight: 600 }}>Help &amp; Support</a>
          <span style={{ margin: '0 12px', opacity: 0.4 }}>·</span>
          <a href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms &amp; Conditions</a>
          <span style={{ margin: '0 12px', opacity: 0.4 }}>·</span>
          <a href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</a>
          <span style={{ margin: '0 12px', opacity: 0.4 }}>·</span>
          <a href="/refund" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Refund Policy</a>
        </p>
        <p style={{ marginTop: '8px', fontSize: '13px' }}>
          <a href="mailto:printx78@gmail.com" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>printx78@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}
