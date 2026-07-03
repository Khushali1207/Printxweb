import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer, CreditCard, Smartphone, MapPin, Star, Phone, Mail,
  ChevronDown, ChevronUp, Search, ArrowLeft, MessageCircle,
  Globe, FileText, ScanLine, Edit3, Layout, ShoppingCart, CheckCircle
} from 'lucide-react';

const COLORS = {
  offWhite: '#FCF7F8',
  deepPlum: '#371E30',
  electricYellow: '#FFE347',
  darkPurple: '#1E0F1A',
  dustyRose: '#C38D9E',
};

const faqs = [
  {
    category: 'PrintX Overview',
    icon: Globe,
    color: '#C38D9E',
    questions: [
      { q: 'What is PrintX?', a: 'PrintX is an all-in-one app designed to make printing smarter, faster, and better. It offers comprehensive features, including assignment support, scanning, printing, and document editing.' }
    ]
  },
  {
    category: 'Smart Cover Page',
    icon: FileText,
    color: '#FFE347',
    questions: [
      { q: 'Create Cover Pages', a: 'Easily create professional assignment and project cover pages. The app automatically adds your details, such as name, branch, semester, subject, and roll number, for quick and perfect printing.' }
    ]
  },
  {
    category: 'Converter & Size',
    icon: Printer,
    color: '#C38D9E',
    questions: [
      { q: 'Format & Size Management', a: 'Convert various file types (such as DOC, PPT, or JPG) into print-ready PDF formats. Manage document sizes (e.g., A4) to ensure smooth, professional printing without formatting issues.' }
    ]
  },
  {
    category: 'Document Scanner',
    icon: ScanLine,
    color: '#FFE347',
    questions: [
      { q: 'Auto Detect & Enhance', a: 'Automatically detects and improves scan quality when you scan physical documents directly with your camera.' },
      { q: 'HD Scan', a: 'Produces high-quality, print-ready digital files instantly.' }
    ]
  },
  {
    category: 'Premium Printing',
    icon: Star,
    color: '#C38D9E',
    questions: [
      { q: 'Faster Workflow', a: 'Enjoy an advanced, faster, and more convenient printing workflow. Key benefits include high-quality output, high-speed processing, Cloud printing capabilities, and Smart Queue management for better performance.' }
    ]
  },
  {
    category: 'AI Writer Assistant',
    icon: Edit3,
    color: '#FFE347',
    questions: [
      { q: 'Capabilities', a: 'Generate project reports and assignment content using AI-powered assistance. Includes smart content generation, grammar and style improvements, and context-aware suggestions.' },
      { q: 'Safety', a: 'Provides plagiarism-safe, ready-to-use content.' }
    ]
  },
  {
    category: 'Document Editor',
    icon: Layout,
    color: '#C38D9E',
    questions: [
      { q: 'Text & Layout', a: 'Create, edit, and customize documents before you print. Change fonts, colors, and alignment.' },
      { q: 'Elements', a: 'Easily insert images, professional tables, shapes, and icons.' },
      { q: 'Preview', a: 'Review your document with precision to ensure it is perfect before final printing.' }
    ]
  },
  {
    category: 'Print Cart & Docs',
    icon: ShoppingCart,
    color: '#FFE347',
    questions: [
      { q: 'Flexibility', a: 'Upload and organize multiple files in one central location.' },
      { q: 'Review', a: 'Preview, reorder, or remove files before proceeding.' },
      { q: 'Security', a: 'Track and handle your print jobs through a secure and reliable system.' }
    ]
  },
  {
    category: 'Summary',
    icon: CheckCircle,
    color: '#C38D9E',
    questions: [
      { q: 'Endless possibilities.', a: 'PrintX provides a seamless experience, consolidating cover page generation, conversion, scanning, premium printing, AI writing, and document editing into one powerful app.' }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: `1px solid rgba(55,30,48,0.08)`,
        padding: '20px 0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 16, color: COLORS.deepPlum, lineHeight: 1.4 }}>{question}</p>
        <div style={{ flexShrink: 0, color: COLORS.dustyRose }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      {open && (
        <p style={{ margin: '12px 0 0', fontSize: 15, color: 'rgba(55,30,48,0.7)', lineHeight: 1.7 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0 && (activeCategory === null || cat.category === activeCategory));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: COLORS.offWhite, minHeight: '100vh' }}>

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
        <div>{/* Empty right side for global login button */}</div>
      </nav>

      {/* Hero Banner — compact */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPlum} 100%)`,
        padding: '36px 32px 48px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(195,141,158,0.07)'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(195,141,158,0.15)', border: '1px solid rgba(195,141,158,0.3)',
            borderRadius: 99, padding: '6px 14px', marginBottom: 14
          }}>
            <MessageCircle size={13} color={COLORS.dustyRose} />
            <span style={{ fontSize: 12, color: COLORS.dustyRose, fontWeight: 600 }}>Help & Support</span>
          </div>

          <h1 style={{ margin: '0 0 24px', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
            How can we help you?
          </h1>

          {/* Search */}
          <div style={{ maxWidth: 540, margin: '0 auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(55,30,48,0.4)' }} />
            <input
              type="text"
              placeholder="Search your question..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '16px 20px 16px 52px',
                fontSize: 15, borderRadius: 14, border: 'none',
                backgroundColor: COLORS.offWhite,
                color: COLORS.deepPlum, outline: 'none',
                fontFamily: 'inherit',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(55,30,48,0.08)', padding: '20px 32px', display: 'flex', gap: 12, overflowX: 'auto' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '10px 20px', borderRadius: 99, border: '1.5px solid',
            borderColor: activeCategory === null ? COLORS.deepPlum : 'rgba(55,30,48,0.15)',
            backgroundColor: activeCategory === null ? COLORS.deepPlum : 'transparent',
            color: activeCategory === null ? '#fff' : COLORS.deepPlum,
            fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: 'inherit', transition: 'all 0.2s'
          }}
        >All Topics</button>
        {faqs.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(isActive ? null : cat.category)}
              style={{
                padding: '10px 20px', borderRadius: 99, border: '1.5px solid',
                borderColor: isActive ? COLORS.deepPlum : 'rgba(55,30,48,0.15)',
                backgroundColor: isActive ? COLORS.deepPlum : 'transparent',
                color: isActive ? '#fff' : COLORS.deepPlum,
                fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: 'inherit', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              <Icon size={14} />{cat.category}
            </button>
          );
        })}
      </div>

      {/* FAQ Sections */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 18, color: 'rgba(55,30,48,0.5)' }}>No results found for "<strong>{search}</strong>"</p>
            <p style={{ fontSize: 15, color: 'rgba(55,30,48,0.4)', marginTop: 8 }}>Try different keywords or contact us directly.</p>
          </div>
        ) : (
          filtered.map(cat => {
            const Icon = cat.icon;
            return (
              <div key={cat.category} style={{ marginBottom: 56 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: cat.color === COLORS.electricYellow ? 'rgba(255,227,71,0.15)' : 'rgba(195,141,158,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: cat.color === COLORS.electricYellow ? '#b8a000' : COLORS.dustyRose
                  }}>
                    <Icon size={20} />
                  </div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: COLORS.deepPlum, letterSpacing: '-0.5px' }}>
                    {cat.category}
                  </h2>
                </div>
                <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '4px 28px', boxShadow: '0 4px 24px rgba(55,30,48,0.06)' }}>
                  {cat.questions.map((faq, i) => (
                    <FAQItem key={i} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* Contact Support Card */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.deepPlum}, ${COLORS.darkPurple})`,
          borderRadius: 28, padding: '48px 40px', textAlign: 'center',
          boxShadow: '0 20px 60px rgba(55,30,48,0.2)'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 26, fontWeight: 800, color: '#fff' }}>Still need help?</h3>
          <p style={{ margin: '0 0 36px', fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>Our support team replies within 24 hours.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:printx78@gmail.com" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px',
              backgroundColor: COLORS.dustyRose, color: '#fff',
              borderRadius: 14, fontWeight: 600, fontSize: 15, textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}>
              <Mail size={18} /> Email Support
            </a>
            <a href="tel:+917972396229" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px',
              backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: 14, fontWeight: 600, fontSize: 15, textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}>
              <Phone size={18} /> +91 7972396229
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(55,30,48,0.08)',
        padding: '24px 32px', textAlign: 'center',
        color: 'rgba(55,30,48,0.4)', fontSize: 14
      }}>
        © {new Date().getFullYear()} PrintX Technologies Pvt. Ltd. All rights reserved.
      </div>
    </div>
  );
}
