'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Top6CalcDropdown from './Top6CalcDropdown';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [showCalc, setShowCalc] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Collapse on scroll
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setCollapsed(true);
      } else if (currentScroll < lastScroll) {
        setCollapsed(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '48px',
          right: '38px',
          backgroundColor: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: '9999px',
          padding: collapsed ? '8px' : '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: collapsed ? '0' : '20px',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          fontFamily: 'Inter, sans-serif',
          width: collapsed ? '48px' : 'auto',
          height: '48px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: collapsed ? 'pointer' : 'default',
        }}
      >
        {!collapsed && (
          <>
            <button
              onClick={() => {
                if (pathname === '/') {
                  const el = document.getElementById('top');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  router.push('/');
                }
              }}
              style={navStyle}
            >
              Home
            </button>
            <button onClick={() => scrollToSection('events')} style={navStyle}>Events</button>
            <button onClick={() => router.push('/programs')} style={navStyle}>Programs</button>
            <button onClick={() => router.push('/schools')} style={navStyle}>Schools</button>
            <button
              onClick={() => setShowCalc(!showCalc)}
              style={{
                ...navStyle,
                fontWeight: 700,
                color: '#BE123C',
              }}
            >
              Top6Calc
            </button>
            <img
              src="/pfp.png"
              alt="Profile"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '9999px',
                objectFit: 'cover',
                border: '0px solid black',
              }}
            />
          </>
        )}

        {/* 👇 This Top6Calc button stays even when collapsed */}
        {collapsed && (
          <button
            onClick={() => setShowCalc(!showCalc)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
            title="Top6Calc"
          >
            🎓
          </button>
        )}
      </div>

      {showCalc && <Top6CalcDropdown />}
    </>
  );
}

const navStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
};
