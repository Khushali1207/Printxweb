import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
};

export default function RefundPage() {
  return (
    <div style={{ backgroundColor: COLORS.offWhite, minHeight: '100vh', fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: COLORS.darkPurple,
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', gap: 24
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img src="/models/logo.jpg" alt="PrintX" style={{ height: 28, objectFit: 'contain' }} />
        </Link>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      <main style={{ padding: '60px 40px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,227,71,0.15)', color: COLORS.deepPlum, borderRadius: '8px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>Legal</div>
          <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', color: COLORS.deepPlum, marginBottom: '12px' }}>Refund Policy</h1>
          <p style={{ color: 'rgba(55,30,48,0.5)', fontSize: '14px' }}>Last Updated: July 2026</p>
          <div style={{ height: '3px', width: '60px', backgroundColor: COLORS.electricYellow, marginTop: '16px', borderRadius: '2px' }} />
        </div>

        {[
          {
            num: '1', title: 'Overview',
            body: 'PX (PrintX) is committed to fair and transparent refund practices. This Refund Policy outlines the conditions under which refunds may or may not be issued for payments made through our platform.'
          },
          {
            num: '2', title: 'Eligibility for Refund',
            bullets: [
              'The document failed to print due to a technical error on PX\'s end.',
              'The kiosk malfunctioned and the print was not completed after payment.',
              'You were charged incorrectly (duplicate charges or wrong amount).',
              'The printed output was materially different from the selected specifications through no fault of the user.'
            ]
          },
          {
            num: '3', title: 'Non-Refundable Cases',
            bullets: [
              'Errors in the document uploaded by the user (wrong file, formatting issues, missing pages).',
              'Minor variations in color, shade, or print quality within acceptable printer limits.',
              'User uploaded an incorrect file or selected wrong print settings.',
              'The document was successfully printed and collected.',
              'Refund requests submitted after 24 hours of the transaction.'
            ]
          },
          {
            num: '4', title: 'How to Request a Refund',
            body: 'To request a refund, contact us within 24 hours of the transaction at printx78@gmail.com with your transaction ID, kiosk location, and a brief description of the issue. Our team will review your request and respond within 3–5 business days.'
          },
          {
            num: '5', title: 'Refund Processing',
            body: 'Approved refunds will be processed back to the original payment method within 7–10 business days, depending on your bank or payment provider.'
          },
          {
            num: '6', title: 'PX Credits',
            body: 'In some cases, at PX\'s discretion, refunds may be issued as PX Credits instead of a direct payment reversal. PX Credits can be used for future prints on the platform.'
          },
          {
            num: '7', title: 'Changes to this Policy',
            body: 'PX reserves the right to update this Refund Policy at any time. Continued use of the platform after changes constitutes acceptance of the revised policy.'
          }
        ].map((item) => (
          <div key={item.num} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '18px', color: COLORS.deepPlum, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ backgroundColor: COLORS.electricYellow, color: COLORS.deepPlum, borderRadius: '50%', width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{item.num}</span>
              {item.title}
            </h2>
            <div style={{ color: 'rgba(55,30,48,0.75)', lineHeight: 1.8, fontSize: '15px', paddingLeft: '44px' }}>
              {item.body && <p>{item.body}</p>}
              {item.bullets && (
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '60px', padding: '24px', backgroundColor: 'rgba(55,30,48,0.04)', borderRadius: '16px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(55,30,48,0.6)', fontSize: '14px' }}>Need help with a refund?</p>
          <a href="mailto:printx78@gmail.com" style={{ color: COLORS.deepPlum, fontWeight: 600, textDecoration: 'none' }}>printx78@gmail.com</a>
        </div>
      </main>
    </div>
  );
}
