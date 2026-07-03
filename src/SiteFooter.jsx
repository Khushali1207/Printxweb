import React from 'react';

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
};

const DOT = () => <span style={{ margin: '0 10px', opacity: 0.35 }}>·</span>;

export default function SiteFooter() {
  return (
    <footer style={{
      backgroundColor: COLORS.darkPurple,
      color: 'rgba(255,255,255,0.55)',
      padding: '36px 40px',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '13px',
      textAlign: 'center',
    }}>
      {/* Brand */}
      <div style={{ marginBottom: '8px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
        © {new Date().getFullYear()} PrintX Technologies Pvt. Ltd. All rights reserved.
      </div>

      {/* Tagline */}
      <div style={{ marginBottom: '16px' }}>
        Made with ❤️ in India. Military-grade encryption protection.
      </div>

      {/* Nav Links */}
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '4px' }}>
        <a href="/help" style={{ color: COLORS.dustyRose, textDecoration: 'none', fontWeight: 600 }}>Help &amp; Support</a>
        <DOT />
        <a href="/terms" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
          Terms &amp; Conditions
        </a>
        <DOT />
        <a href="/privacy" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
          Privacy Policy
        </a>
        <DOT />
        <a href="/refund" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
          Refund Policy
        </a>
      </div>

      {/* Contact + Social */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <a href="mailto:printx78@gmail.com" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#fff'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
          printx78@gmail.com
        </a>
        <DOT />
        <a href="https://instagram.com" target="_blank" rel="noreferrer"
          style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#E1306C'}
          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </a>
      </div>
    </footer>
  );
}
