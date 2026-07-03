import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import SiteFooter from './SiteFooter';

export default function PrivacyPage() {
  const sections = [
    {
      num: '01', icon: '📦', title: 'Information We Collect',
      intro: 'PX may collect the following types of information:',
      bullets: ['Name', 'Email address', 'Phone number', 'Login credentials', 'Payment-related information', 'Uploaded documents and files', 'Device and usage information']
    },
    {
      num: '02', icon: '🎯', title: 'Purpose of Data Collection',
      intro: 'We collect information to:',
      bullets: ['Process print orders', 'Facilitate payments', 'Improve service quality', 'Provide customer support', 'Ensure platform security']
    },
    {
      num: '03', icon: '🗑️', title: 'Document Storage and Deletion Policy',
      bullets: [
        'Uploaded documents are stored only for the purpose of processing print requests.',
        'Documents are automatically deleted from our active systems after successful order completion or within a predefined retention period.',
        'PX regularly reviews and removes stored files using secure deletion practices.',
        'Once deleted from PX systems, documents are no longer accessible through our platform.'
      ]
    },
    {
      num: '04', icon: '🔒', title: 'Data Security Measures',
      intro: 'PX implements reasonable security safeguards including:',
      bullets: ['Encrypted data transmission', 'Secure cloud storage practices', 'Access control mechanisms', 'Authentication and authorization procedures', 'Regular monitoring and security reviews'],
      note: 'However, no method of electronic transmission or storage is 100% secure, and PX cannot guarantee absolute security.'
    },
    {
      num: '05', icon: '🤝', title: 'Third-Party Services',
      content: 'PX may use third-party payment gateways, cloud providers, analytics services, or printing partners. These third parties operate under their own privacy and security policies. We recommend reviewing their policies when you interact with them.'
    },
    {
      num: '06', icon: '⚠️', title: 'Data Breach and Liability Disclaimer',
      intro: 'While PX employs reasonable security measures and regularly deletes user documents, users acknowledge that no digital system can guarantee complete protection. PX shall not be held liable for:',
      bullets: [
        'Unauthorized access caused by hacking attempts.',
        'Security breaches affecting third-party service providers.',
        'Information disclosed due to user negligence.',
        'Events beyond PX\'s reasonable control.'
      ]
    },
    {
      num: '07', icon: '🧑‍⚖️', title: 'User Rights',
      intro: 'Users may:',
      bullets: [
        'Request information regarding their personal data.',
        'Request correction of inaccurate information.',
        'Request deletion of eligible personal information, subject to legal and operational requirements.'
      ]
    },
    {
      num: '08', icon: '📧', title: 'Contact Information',
      content: 'For privacy, security, or legal inquiries, users may contact us at: printx78@gmail.com'
    },
    {
      num: '09', icon: '🏛️', title: 'Governing Law',
      content: 'These Terms & Policies shall be governed by and interpreted in accordance with the laws of India.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#030D1A', minHeight: '100vh', fontFamily: "'Space Grotesk', sans-serif", color: '#F0F8FF' }}>
      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(3,13,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(100,180,255,0.08)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img src="/models/logo.jpg" alt="PrintX" style={{ height: 28, objectFit: 'contain' }} />
        </Link>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      {/* Hero Header — Blue/Security theme */}
      <div style={{ background: 'linear-gradient(135deg, #040F1E 0%, #0A2040 50%, #102E57 100%)', padding: '80px 40px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '8%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(64,140,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '5%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(64,140,255,0.1)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(64,140,255,0.12)', border: '1px solid rgba(64,140,255,0.25)', borderRadius: '99px', padding: '6px 16px', marginBottom: '24px' }}>
          <Lock size={14} style={{ color: '#60AFFF' }} />
          <span style={{ fontSize: '13px', color: '#60AFFF', fontWeight: 600 }}>Legal Document</span>
        </div>
        <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: '16px', background: 'linear-gradient(135deg, #F0F8FF, #60AFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Privacy &amp; Data Security Policy
        </h1>
        <p style={{ color: 'rgba(240,248,255,0.45)', fontSize: '15px' }}>Last Updated: July 2026 &nbsp;·&nbsp; Governing Law: India</p>

        {/* Trust indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '36px', flexWrap: 'wrap' }}>
          {['🔐 AES-256 Encryption', '🗑️ Auto Document Deletion', '🔍 Regular Security Audits'].map(tag => (
            <div key={tag} style={{ fontSize: '13px', color: 'rgba(96,175,255,0.7)', display: 'flex', alignItems: 'center', gap: '6px' }}>{tag}</div>
          ))}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 40px' }}>
        {sections.map((s) => (
          <div key={s.num} style={{ marginBottom: '40px', background: 'rgba(64,140,255,0.03)', border: '1px solid rgba(64,140,255,0.08)', borderRadius: '16px', padding: '28px 28px 28px 36px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '14px', top: '28px', width: '4px', height: '36px', backgroundColor: '#408CFF', borderRadius: '2px' }} />
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '15px', color: '#F0F8FF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ backgroundColor: 'rgba(64,140,255,0.15)', color: '#60AFFF', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', fontWeight: 700 }}>{s.num}</span>
              <span>{s.icon}</span> {s.title}
            </h2>
            {s.intro && <p style={{ color: 'rgba(240,248,255,0.55)', fontSize: '14px', marginBottom: '10px' }}>{s.intro}</p>}
            {s.content && <p style={{ color: 'rgba(240,248,255,0.65)', lineHeight: 1.8, fontSize: '15px' }}>{s.content}</p>}
            {s.bullets && (
              <ul style={{ paddingLeft: '20px', color: 'rgba(240,248,255,0.65)', lineHeight: 1.8, fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            {s.note && <p style={{ marginTop: '12px', color: 'rgba(240,248,255,0.45)', fontSize: '14px', fontStyle: 'italic' }}>{s.note}</p>}
          </div>
        ))}

        <div style={{ marginTop: '40px', padding: '28px', background: 'linear-gradient(135deg, rgba(64,140,255,0.06), rgba(64,140,255,0.02))', border: '1px solid rgba(64,140,255,0.12)', borderRadius: '16px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(240,248,255,0.5)', marginBottom: '8px' }}>Privacy concerns or data requests?</p>
          <a href="mailto:printx78@gmail.com" style={{ color: '#60AFFF', fontWeight: 600, textDecoration: 'none' }}>printx78@gmail.com</a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
