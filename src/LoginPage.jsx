import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowLeft, Printer } from 'lucide-react';

const C = {
  bg: '#FCF7F8',
  plum: '#371E30',
  mid: '#5A3B57',
  rose: '#B4869F',
  yellow: '#FFE347',
  border: '#E3D3D9',
};

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* ── LEFT ── */
        .lp-left {
          flex: 1;
          min-width: 0;
          background: ${C.bg};
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 52px;
          overflow: hidden;
        }

        /* ── RIGHT ── */
        .lp-right {
          width: 46%;
          flex-shrink: 0;
          background: linear-gradient(145deg, ${C.rose} 0%, ${C.mid} 48%, ${C.plum} 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
        }

        .lp-right::before {
          content: '';
          position: absolute;
          top: -50px; left: -50px;
          width: 220px; height: 220px;
          background-image: radial-gradient(circle, rgba(252,247,248,0.22) 1px, transparent 1px);
          background-size: 16px 16px;
          border-radius: 50%;
          pointer-events: none;
        }

        .lp-right::after {
          content: '';
          position: absolute;
          bottom: -90px; right: -90px;
          width: 340px; height: 340px;
          border-radius: 50%;
          border: 1.5px solid rgba(252,247,248,0.1);
          pointer-events: none;
        }

        .lp-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          font-size: 14px;
          font-family: 'Space Grotesk', sans-serif;
          border: 1.5px solid ${C.border};
          border-radius: 9px;
          background: #fff;
          color: ${C.plum};
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .lp-input:focus {
          border-color: ${C.rose};
          box-shadow: 0 0 0 3px rgba(180,134,159,0.14);
        }

        .lp-btn-primary {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          background: ${C.plum};
          color: ${C.bg};
          cursor: pointer;
          transition: all 0.22s ease;
          letter-spacing: 0.02em;
        }
        .lp-btn-primary:hover {
          background: ${C.mid};
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(55,30,48,0.22);
        }

        .lp-btn-outline {
          width: 100%;
          padding: 11px;
          border: 1.5px solid ${C.border};
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          background: #fff;
          color: ${C.plum};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: all 0.2s ease;
        }
        .lp-btn-outline:hover {
          border-color: ${C.rose};
          box-shadow: 0 4px 14px rgba(180,134,159,0.14);
          transform: translateY(-1px);
        }

        .lp-btn-upi {
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          background: ${C.plum};
          color: ${C.bg};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: all 0.2s ease;
        }
        .lp-btn-upi:hover {
          background: ${C.mid};
          box-shadow: 0 6px 20px rgba(55,30,48,0.22);
          transform: translateY(-1px);
        }

        .lp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${C.rose};
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }
        .lp-divider::before, .lp-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: ${C.border};
        }

        @media (max-width: 860px) {
          .lp-root { flex-direction: column-reverse; height: auto; overflow: auto; }
          .lp-right { width: 100%; min-height: 240px; padding: 32px 24px; }
          .lp-right::after { display: none; }
          .lp-left { padding: 32px 24px; justify-content: flex-start; }
        }
      `}</style>

      <div className="lp-root">

        {/* ════ LEFT: FORM ════ */}
        <div className="lp-left">

          {/* Back */}
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.rose, fontSize: 12, fontWeight: 500, textDecoration: 'none', marginBottom: 28 }}>
            <ArrowLeft size={13} /> Back to home
          </Link>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: C.plum, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Printer size={18} color={C.bg} />
            </div>
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, fontSize: 18, color: C.plum, letterSpacing: '-0.5px' }}>PrintX</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.plum, marginBottom: 4, letterSpacing: '-0.4px' }}>Welcome back</h1>
          <p style={{ fontSize: 13, color: C.rose, marginBottom: 24 }}>Sign in to your PrintX account</p>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.plum, marginBottom: 6 }}>Email or Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.rose, pointerEvents: 'none' }} />
              <input type="text" placeholder="you@printx.com" className="lp-input" />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.plum, marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.rose, pointerEvents: 'none' }} />
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="lp-input" style={{ paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.rose, padding: 0, display: 'flex', alignItems: 'center' }}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)}
              style={{ accentColor: C.plum, width: 15, height: 15, cursor: 'pointer', flexShrink: 0 }} />
            <label htmlFor="remember" style={{ cursor: 'pointer' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.plum }}>Remember me</span>
              <span style={{ fontSize: 11, color: C.rose, marginLeft: 6 }}>Stay signed in on this device</span>
            </label>
          </div>

          {/* Sign In */}
          <button className="lp-btn-primary" style={{ marginBottom: 14 }}>Sign In</button>

          {/* Sign up */}
          <p style={{ textAlign: 'center', fontSize: 13, color: C.rose, marginBottom: 16 }}>
            New to PrintX?{' '}
            <a href="#" style={{ color: C.plum, fontWeight: 700, textDecoration: 'none' }}>Create an account</a>
          </p>

          {/* Divider */}
          <div className="lp-divider" style={{ marginBottom: 12 }}>OR CONTINUE WITH</div>

          {/* Auth buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
            <button className="lp-btn-outline">
              <GoogleIcon /> Sign in with Google
            </button>
          </div>

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: 11, color: C.rose }}>
            © {new Date().getFullYear()} PrintX. All rights reserved.
          </p>
        </div>

        {/* ════ RIGHT: BRANDED PANEL ════ */}
        <div className="lp-right">
          <h2 style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.65rem)',
            fontWeight: 600,
            color: C.bg,
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 340,
            marginBottom: 36,
            position: 'relative', zIndex: 1
          }}>
            Securely Upload And Print Your Important Documents With{' '}
            <span style={{ color: C.yellow }}>PrintX</span>!
          </h2>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img
              src="/kiosk.png"
              alt="PrintX Kiosk"
              style={{
                height: 'clamp(200px, 46vh, 400px)',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 24px 50px rgba(55,30,48,0.55)) drop-shadow(0 0 36px rgba(180,134,159,0.3))',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
