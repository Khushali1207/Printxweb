import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: COLORS.offWhite, minHeight: '100vh', fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: COLORS.darkPurple,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/models/logo.jpg" alt="PrintX" style={{ height: 28, objectFit: 'contain' }} />
          </Link>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500,
            transition: 'color 0.2s'
          }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <div></div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', color: COLORS.deepPlum, marginBottom: '16px' }}>Contact Us</h1>
          <p style={{ fontSize: '18px', color: 'rgba(55, 30, 48, 0.7)' }}>Want a PrintX kiosk in your college or office? Get in touch.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'flex-start' }}>
          {/* Info Column */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { icon: Phone, title: 'Call Us', value: '+91 7972396229', link: 'tel:+917972396229' },
              { icon: Mail, title: 'Email Us', value: 'printx78@gmail.com', link: 'mailto:printx78@gmail.com' },
              { icon: Globe, title: 'Headquarters', value: 'Indiranagar 100ft Road, Bengaluru, India', link: 'https://maps.google.com/?q=Indiranagar+100ft+Road,+Bengaluru,+India' }
            ].map((c, i) => (
              <a key={c.title} href={c.link} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '20px', padding: '24px',
                backgroundColor: '#fff', borderRadius: '16px', textDecoration: 'none', color: 'inherit',
                boxShadow: '0 10px 30px rgba(55, 30, 48, 0.05)', transition: 'transform 0.3s'
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  backgroundColor: 'rgba(180, 134, 159, 0.1)', color: COLORS.deepPlum,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <c.icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'rgba(55, 30, 48, 0.5)', marginBottom: '4px', fontWeight: 600 }}>{c.title}</div>
                  <div style={{ fontSize: '16px', color: COLORS.deepPlum, fontWeight: 700 }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form Column */}
          <div style={{ flex: '1.5', minWidth: '320px', backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(55, 30, 48, 0.08)' }}>
            <form onSubmit={e => { e.preventDefault(); alert("Thank you! We'll get back within 24 hours."); }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="name">Full Name</label>
                <input type="text" id="name" required placeholder="John Doe" style={{
                  width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                  fontSize: '15px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s'
                }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="email">Email Address</label>
                <input type="email" id="email" required placeholder="john@example.com" style={{
                  width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                  fontSize: '15px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s'
                }} />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="message">Message / Inquiry</label>
                <textarea id="message" rows="4" required placeholder="Tell us about your requirements..." style={{
                  width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                  fontSize: '15px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s'
                }} />
              </div>
              <button type="submit" style={{
                width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
                backgroundColor: COLORS.electricYellow, color: COLORS.deepPlum,
                fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                Send Message <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
