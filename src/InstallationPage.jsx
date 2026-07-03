import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
};

export default function InstallationPage() {
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
      </nav>

      {/* Main Content */}
      <main style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(255, 227, 71, 0.2)', color: COLORS.deepPlum, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={32} />
            </div>
          </div>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', color: COLORS.deepPlum, marginBottom: '16px' }}>
            Request Installation
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(55, 30, 48, 0.7)', lineHeight: 1.6 }}>
            Ready to bring 24/7 smart printing to your college, hostel, or workspace? Fill out the details below and our team will get back to you to discuss the setup process.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(55, 30, 48, 0.08)' }}>
          <form onSubmit={e => { e.preventDefault(); alert("Installation Request Sent! We'll contact you soon."); }}>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="name">Full Name / Organization</label>
              <input type="text" id="name" required placeholder="e.g. Rahul Sharma or XYZ College" style={{
                width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                fontSize: '15px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s'
              }} />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="state">State</label>
                <input type="text" id="state" required placeholder="e.g. Karnataka" style={{
                  width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                  fontSize: '15px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s'
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="district">District / City</label>
                <input type="text" id="district" required placeholder="e.g. Bengaluru" style={{
                  width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                  fontSize: '15px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s'
                }} />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: COLORS.deepPlum, marginBottom: '8px' }} htmlFor="discuss">Discuss Your Requirements</label>
              <textarea id="discuss" rows="5" required placeholder="Tell us about the location, expected footfall, and any specific requirements you have..." style={{
                width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(55, 30, 48, 0.1)',
                fontSize: '15px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s'
              }} />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
              backgroundColor: COLORS.electricYellow, color: COLORS.deepPlum,
              fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Submit Request <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
