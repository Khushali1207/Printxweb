import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLORS = {
  deepPlum: '#371E30',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
  electricYellow: '#FFE347',
};

export default function HelpBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, fontFamily: "'Inter', sans-serif" }}>
      {/* Pop-up panel */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 72, right: 0,
          width: 300,
          background: `linear-gradient(145deg, ${COLORS.darkPurple}, ${COLORS.deepPlum})`,
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          animation: 'bubbleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <style>{`
            @keyframes bubbleIn {
              from { opacity: 0; transform: scale(0.85) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* Header */}
          <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(195,141,158,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12
            }}>
              <MessageCircle size={20} color={COLORS.dustyRose} />
            </div>
            <h4 style={{ margin: '0 0 4px', color: '#fff', fontWeight: 700, fontSize: 16 }}>Need help?</h4>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>We're here for you 24/7</p>
          </div>

          {/* Options */}
          <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              to="/help"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none', color: '#fff',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(195,141,158,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ExternalLink size={16} color={COLORS.dustyRose} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Help Center</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>FAQs, guides & tips</div>
              </div>
            </Link>

            <a
              href="mailto:printx78@gmail.com"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none', color: '#fff',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(195,141,158,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={16} color={COLORS.dustyRose} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Email Us</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>printx78@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+917972396229"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 14,
                background: 'rgba(195,141,158,0.1)',
                border: '1px solid rgba(195,141,158,0.2)',
                textDecoration: 'none', color: '#fff',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(195,141,158,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={16} color={COLORS.dustyRose} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Call Us</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>+91 7972396229</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          backgroundColor: COLORS.deepPlum,
          boxShadow: '0 8px 32px rgba(55,30,48,0.5)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease',
          transform: open ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {open
          ? <X size={22} color="#fff" />
          : <MessageCircle size={22} color="#fff" />
        }
      </button>
    </div>
  );
}
