import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, Shield, Gavel } from 'lucide-react';
import SiteFooter from './SiteFooter';

export default function TermsPage() {
  const sections = [
    {
      num: '01', icon: '📋', title: 'Acceptance of Terms',
      content: 'By accessing or using the PX (PrintX) mobile application, website, kiosks, or related services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately.'
    },
    {
      num: '02', icon: '🖨️', title: 'Description of Service',
      content: 'PX provides a platform that enables users to upload, manage, and print documents through authorized PX kiosks and partner printing locations. Services are available 24/7 at designated kiosk points.'
    },
    {
      num: '03', icon: '👤', title: 'User Responsibilities',
      bullets: [
        'Provide accurate information when using PX services.',
        'Upload only content that you legally own or have permission to use.',
        'Not upload unlawful, harmful, defamatory, obscene, or copyrighted material without authorization.',
        'Ensure documents are reviewed before submission.'
      ]
    },
    {
      num: '04', icon: '🖨️', title: 'Printing Services',
      bullets: [
        'PX aims to provide accurate printing services based on your selected specifications.',
        'Minor variations in color, formatting, or print quality may occur due to printer limitations.',
        'PX is not responsible for errors caused by incorrect files uploaded by users.'
      ]
    },
    {
      num: '05', icon: '💳', title: 'Payments and Refunds',
      bullets: [
        'Payments made through the platform are subject to applicable fees and taxes.',
        'Refund requests will be reviewed on a case-by-case basis.',
        'No refunds will be provided for errors caused by incorrect document uploads by users.'
      ]
    },
    {
      num: '06', icon: '⚖️', title: 'Intellectual Property',
      content: 'Users retain full ownership of their uploaded content. By uploading content, users grant PX a limited, non-exclusive license solely for the purpose of processing and printing the requested documents. PX does not claim ownership over any user content.'
    },
    {
      num: '07', icon: '🔧', title: 'Service Availability',
      content: 'PX may temporarily suspend or modify services for maintenance, upgrades, or operational reasons without prior notice. We strive to minimize downtime and will communicate scheduled maintenance where possible.'
    },
    {
      num: '08', icon: '🛡️', title: 'Limitation of Liability',
      bullets: [
        'PX shall not be liable for indirect, incidental, consequential, or special damages arising from use of the service.',
        'PX is not responsible for losses resulting from user negligence, unauthorized account access, network failures, or force majeure events.'
      ]
    },
    {
      num: '09', icon: '🚫', title: 'Termination',
      content: 'PX reserves the right to suspend or terminate accounts that violate these Terms & Conditions, without prior notice, at our sole discretion.'
    },
    {
      num: '10', icon: '🔄', title: 'Changes to Terms',
      content: 'PX may update these Terms & Conditions from time to time. Continued use of the service after changes are posted constitutes acceptance of the revised terms. We encourage you to review this page periodically.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#0E0612', minHeight: '100vh', fontFamily: "'Space Grotesk', sans-serif", color: '#FCF7F8' }}>
      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(14,6,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img src="/models/logo.jpg" alt="PrintX" style={{ height: 28, objectFit: 'contain' }} />
        </Link>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(135deg, #1E0F1A 0%, #371E30 50%, #5A2040 100%)', padding: '80px 40px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20px', right: '10%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255,227,71,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '5%', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(180,134,159,0.08)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,227,71,0.1)', border: '1px solid rgba(255,227,71,0.2)', borderRadius: '99px', padding: '6px 16px', marginBottom: '24px' }}>
          <Gavel size={14} style={{ color: '#FFE347' }} />
          <span style={{ fontSize: '13px', color: '#FFE347', fontWeight: 600 }}>Legal Document</span>
        </div>
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: '16px', background: 'linear-gradient(135deg, #FCF7F8, #C38D9E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ color: 'rgba(252,247,248,0.5)', fontSize: '15px' }}>Last Updated: July 2026 &nbsp;·&nbsp; Governing Law: India</p>
      </div>

      {/* Content */}
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 40px' }}>
        {sections.map((s) => (
          <div key={s.num} style={{ marginBottom: '40px', borderLeft: '3px solid rgba(255,227,71,0.2)', paddingLeft: '28px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-14px', top: 0, width: '25px', height: '25px', borderRadius: '50%', backgroundColor: '#FFE347', color: '#371E30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>{s.num}</div>
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '16px', color: '#FCF7F8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{s.icon}</span> {s.title}
            </h2>
            {s.content && <p style={{ color: 'rgba(252,247,248,0.65)', lineHeight: 1.8, fontSize: '15px' }}>{s.content}</p>}
            {s.bullets && (
              <ul style={{ paddingLeft: '20px', color: 'rgba(252,247,248,0.65)', lineHeight: 1.8, fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        ))}

        <div style={{ marginTop: '60px', padding: '28px', background: 'linear-gradient(135deg, rgba(255,227,71,0.05), rgba(180,134,159,0.05))', border: '1px solid rgba(255,227,71,0.15)', borderRadius: '16px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Questions about these terms?</p>
          <a href="mailto:printx78@gmail.com" style={{ color: '#FFE347', fontWeight: 600, textDecoration: 'none' }}>printx78@gmail.com</a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
