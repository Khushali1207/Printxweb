import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, FileText, X, Printer, CheckCircle } from 'lucide-react';

export default function PrintPage() {
  const [files, setFiles] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming);
    if (!arr.length) return;
    setScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setFiles(prev => {
        const names = new Set(prev.map(f => f.name));
        return [...prev, ...arr.filter(f => !names.has(f.name))];
      });
      setScanning(false);
      setScanDone(true);
      setTimeout(() => setScanDone(false), 2000);
    }, 1200);
  };

  const removeFile = (name) => setFiles(f => f.filter(x => x.name !== name));

  const fmtSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Floating pill navbar */}
      <nav className="pill-navbar nav-expanded">
        <Link to="/">
          <img src="/models/logo.jpg" alt="PrintX logo" className="pill-navbar-logo" />
        </Link>
        <ul className="pill-navbar-links" style={{ opacity: 1, visibility: 'visible', display: 'flex' }}>
          <li><Link to="/about" style={{ fontWeight: 600 }}>About PX</Link></li>
          <li><a href="/#premium">Premium</a></li>
          <li><a href="/#app">Our App</a></li>
          <li><a href="/#map">Find a Kiosk</a></li>
          <li><a href="/#contact">Contact Us</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/login" style={{ color: 'var(--cta-bg)', fontWeight: 700, textDecoration: 'none' }}>Login</Link>
          <Link to="/print" className="pill-navbar-cta" style={{ textDecoration: 'none' }}>Print Now!</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px' }}>
        <div className="scan-print-container" style={{ maxWidth: '1000px', width: '100%', margin: '0', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          <div className="scan-print-content">
            <h2 className="scan-print-title" style={{ color: 'var(--color-ink)', marginBottom: '24px', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Scan, Upload, &amp;<br />Print on the Go
            </h2>
            <p className="scan-print-desc" style={{ color: 'rgba(55, 30, 48, 0.7)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '40px' }}>
              Our smart document scanner converts physical notes, pages, or IDs into high-quality PDFs and prints them in seconds. No apps, no signups.
            </p>

            <div className="features-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['Automated page alignment & deskewing', 'High contrast B&W and color presets', 'Multi-page binding template builder'].map((f, i) => (
                <div key={i} className="feature-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="feature-check" style={{ color: '#B4869F', marginTop: '2px' }}><CheckCircle size={20} /></div>
                  <span className="feature-text" style={{ color: 'var(--color-ink)', fontSize: '1.05rem', fontWeight: 600 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Scanner Widget (Dark Theme) */}
            <div className="floating-card" style={{ width: '100%', maxWidth: '420px', minHeight: '380px', display: 'flex', flexDirection: 'column', padding: '24px', background: 'var(--color-ink)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(55, 30, 48, 0.35)' }}>
              {/* Header */}
              <div className="floating-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="flow-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-bg)', fontWeight: 600 }}>
                  <ScanLine size={18} style={{ color: 'var(--color-accent)' }} /> Document Scanner
                </span>
                <span className="flow-step-pill" style={{ fontSize: '12px', padding: '4px 10px', background: 'rgba(255,227,71,0.1)', color: 'var(--color-accent)', borderRadius: '12px', fontWeight: 600 }}>
                  {scanning ? '⏳ Scanning…' : scanDone ? '✅ Ready' : 'Kiosk Active'}
                </span>
              </div>

              {/* Scan zone */}
              <div
                className="flow-graphic"
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', marginBottom: '16px', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1.5px dashed rgba(255,255,255,0.15)', borderRadius: '16px', transition: 'background 0.2s, border-color 0.2s' }}
                onClick={() => !scanning && fileInputRef.current?.click()}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              >
                {scanning && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '3px', background: 'var(--color-accent)',
                    animation: 'scanLine 1.2s ease-in-out',
                    boxShadow: `0 0 12px var(--color-accent)`,
                    zIndex: 10
                  }} />
                )}
                <ScanLine size={48} className="flow-upload-icon" style={{ opacity: scanning ? 0.4 : 1, transition: 'opacity 0.3s', color: 'var(--color-bg)', marginBottom: '16px' }} />
                <p className="flow-upload-label" style={{ fontWeight: 600, color: 'var(--color-bg)', marginBottom: '8px', fontSize: '15px' }}>
                  {scanning ? 'Scanning document…' : 'Tap to scan or select files'}
                </p>
                <p className="flow-upload-label" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  PDF, DOCX, PNG, JPG · Max 50 MB each
                </p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                style={{ display: 'none' }}
                onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
              />

              {/* File list */}
              {files.length > 0 && (
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px' }}>
                  {files.map(f => (
                    <div key={f.name} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      background: 'rgba(255,255,255,0.05)', borderRadius: '10px',
                      padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <FileText size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: '13px', color: 'var(--color-bg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>{fmtSize(f.size)}</span>
                      <button
                        onClick={() => removeFile(f.name)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '2px', display: 'flex', flexShrink: 0 }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <button
                  style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.2)', color: 'var(--color-bg)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: scanning ? 'not-allowed' : 'pointer' }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={scanning}
                >
                  <ScanLine size={16} /> Add Files
                </button>
                {files.length > 0 && (
                  <button
                    style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--color-accent)', color: 'var(--color-ink)', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,227,71,0.25)' }}
                    onClick={() => alert(`Sending ${files.length} file(s) to nearest kiosk…`)}
                  >
                    <Printer size={16} /> Print {files.length} file{files.length > 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <style>{`
        @keyframes scanLine {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @media (max-width: 900px) {
          .scan-print-container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .features-list {
            align-items: center;
          }
          .feature-item {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}
