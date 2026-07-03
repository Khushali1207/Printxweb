import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalLoginButton() {
  const location = useLocation();

  if (location.pathname === '/login') return null;

  return (
    <Link
      to="/login"
      style={{
        position: 'fixed',
        top: '28px',
        right: '28px',
        zIndex: 9999,
        fontFamily: "'Unbounded', sans-serif",
        textTransform: 'uppercase',
        fontWeight: 800,
        fontSize: '14px',
        color: '#1E0F1A',
        backgroundColor: '#FFE347',
        padding: '12px 24px',
        borderRadius: '99px',
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(255,227,71,0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '0.05em'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(255,227,71,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,227,71,0.3)';
      }}
    >
      Login
    </Link>
  );
}
