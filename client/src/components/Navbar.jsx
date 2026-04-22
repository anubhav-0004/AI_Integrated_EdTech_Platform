import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Features', 'How it Works', 'Try Now']

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-sm:left-[3%]!"
        style={{
          position: 'fixed',
          top: 16,
          left: '18%',
          margin: '0 auto',
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: 'calc(100% - 32px)',
          maxWidth: 1000,
          background: scrolled ? 'rgba(15,15,26,0.92)' : 'rgba(15,15,26,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99,102,241,0.6)',
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
          }}>
            E
          </div>
          <span className="font-display" style={{
            fontSize: 19,
            color: '#f1f5f9',
            textShadow: '0 0 16px rgba(167,139,250,0.5)',
            letterSpacing: '0.3px',
          }}>
            EduMind
          </span>
        </div>

        {/* Desktop Nav links */}
        <div style={{
          display: 'flex',
          gap: 28,
          alignItems: 'center',
        }}
          className="desktop-nav"
        >
          {navLinks.map((item) => (
            <a
              key={item}
              href={item === 'Try Now' ? '#assistant' : '#'}
              style={{
                color: item === 'Try Now' ? '#a78bfa' : '#94a3b8',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                transition: 'color 0.2s ease',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.target.style.color = '#f1f5f9'}
              onMouseLeave={e => e.target.style.color = item === 'Try Now' ? '#a78bfa' : '#94a3b8'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'flex-end',
          }}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            style={{ display: 'block', width: 22, height: 2, background: '#94a3b8', borderRadius: 2, transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : 16 }}
            style={{ display: 'block', width: 16, height: 2, background: '#94a3b8', borderRadius: 2 }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            style={{ display: 'block', width: 22, height: 2, background: '#94a3b8', borderRadius: 2, transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: 1000,
              zIndex: 99,
              background: 'rgba(15,15,26,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '8px 8px',
              display: 'none',
            }}
            className="mobile-dropdown"
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={item === 'Try Now' ? '#assistant' : '#'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '13px 16px',
                  color: item === 'Try Now' ? '#a78bfa' : '#94a3b8',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  borderRadius: 10,
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                  e.currentTarget.style.color = '#f1f5f9'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = item === 'Try Now' ? '#a78bfa' : '#94a3b8'
                }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-dropdown {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}