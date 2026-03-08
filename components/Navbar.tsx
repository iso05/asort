'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeContext'
import { useHomeColor } from './HomeColorContext'
import { useLanguage } from './LanguageContext'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'News', href: '/news' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { homeColor } = useHomeColor()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 20
      setScrolled(s)
      if (s) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // ── Navbar bg logic ──────────────────────────────────────────────
  // Home:        colored bg based on product (if homeColor is set)
  // Light mode:  transparent → light blue on scroll for readability
  // Dark mode:   transparent → dark blue on scroll
  const navBg = isHome
    ? homeColor
      ? homeColor.bg
      : 'transparent'
    : scrolled
      ? theme === 'dark'
        ? 'rgba(15, 23, 41, 0.97)' // dark blue
        : 'rgba(255, 255, 255, 0.95)' // white in light mode
      : 'transparent' // transparent before scroll

  const drawerBg =
    theme === 'dark' ? 'rgba(15, 23, 41, 0.98)' : 'rgba(240, 245, 250, 0.97)'
  const borderCol = scrolled
    ? theme === 'dark'
      ? 'rgba(100,200,255,0.15)'
      : 'rgba(100,150,200,0.15)'
    : 'transparent'
  const linkColorActive = isHome
    ? homeColor
      ? homeColor.text
      : '#64C8FF'
    : theme === 'dark'
      ? '#64C8FF'
      : '#2c5aa0'
  const linkColorBase = isHome
    ? homeColor
      ? `${homeColor.text}80`
      : 'rgba(255,255,255,0.48)'
    : theme === 'dark'
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(60,80,100,0.7)'
  const linkColorHover = isHome
    ? homeColor
      ? homeColor.text
      : 'rgba(255,255,255,0.9)'
    : theme === 'dark'
      ? 'rgba(255,255,255,0.95)'
      : 'rgba(40,60,90,0.95)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        .nav-lnk {
          font-family: 'Barlow', sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${linkColorBase};
          text-decoration: none;
          position: relative; padding-bottom: 3px;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .nav-lnk::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          height: 1px; width: 0;
          background: ${linkColorActive};
          transition: width 0.25s ease;
        }
        .nav-lnk:hover            { color: ${linkColorHover}; }
        .nav-lnk:hover::after     { width: 100%; }
        .nav-lnk.act              { color: ${linkColorActive}; }
        .nav-lnk.act::after       { width: 100%; }

        .hbar {
          display: block; width: 22px; height: 1.5px;
          background: #ffffff;
          transition: transform 0.26s ease, opacity 0.26s ease;
          border-radius: 99px;
        }

        .mob-lnk {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${linkColorBase};
          text-decoration: none;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 28px;
          transition: background 0.15s, color 0.15s;
        }
        .mob-lnk:hover  { background: ${theme === 'dark' ? 'rgba(100,200,255,0.08)' : 'rgba(100,150,200,0.08)'}; color: ${linkColorHover}; }
        .mob-lnk.act    { color: ${linkColorActive}; background: ${theme === 'dark' ? 'rgba(100,200,255,0.12)' : 'rgba(100,150,200,0.1)'}; }
        .mob-lnk .arrow { opacity: 0.22; font-size: 13px; transition: transform 0.18s; }
        .mob-lnk:hover .arrow { transform: translateX(4px); opacity: 0.5; }

        .theme-btn {
          width: 34px; height: 34px; border-radius: 10px;
          border: 1px solid ${theme === 'dark' ? 'rgba(100,200,255,0.20)' : 'rgba(100,150,200,0.18)'};
          background: ${theme === 'dark' ? 'rgba(100,200,255,0.08)' : 'rgba(100,150,200,0.08)'};
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .theme-btn:hover {
          background: ${theme === 'dark' ? 'rgba(100,200,255,0.15)' : 'rgba(100,150,200,0.15)'};
          border-color: ${linkColorActive};
        }

        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .drawer { animation: drawerIn 0.2s ease forwards; }

        /* Responsive */
        @media (min-width: 769px) { .desk { display: flex !important; } .mob  { display: none  !important; } }
        @media (max-width: 768px) {
          .desk { display: none  !important; }
          .mob  { display: flex  !important; }
          .logo-text { font-size: 14px !important; letter-spacing: 0.15em !important; }
        }
        @media (max-width: 1024px) and (min-width: 769px) { .nav-gap { gap: 22px !important; } }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${borderCol}`,
          transition:
            'background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 64,
            }}
          >
            {/* LOGO */}
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                flexShrink: 0,
              }}
            >
              <img
                src="/images/logo.png"
                alt="Asort Logo"
                style={{
                  height: 100,
                  width: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </Link>

            {/* DESKTOP LINKS */}
            <div
              className="desk nav-gap"
              style={{ gap: 32, alignItems: 'center' }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-lnk ${pathname === href ? 'act' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* RIGHT: theme toggle + language switcher */}
            <div
              className="desk"
              style={{ alignItems: 'center', gap: 16, flexShrink: 0 }}
            >
              {!isHome && (
                <>
                  <button
                    onClick={toggle}
                    className="theme-btn"
                    aria-label={`Switch to ${String(theme) === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {String(theme) === 'light' ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                          String(theme) === 'light'
                            ? '#333333'
                            : 'rgba(255,220,140,0.75)'
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                          String(theme) === 'light'
                            ? '#333333'
                            : 'rgba(255,220,140,0.9)'
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    )}
                  </button>

                  {/* Language Switcher */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      background:
                        theme === 'dark'
                          ? 'rgba(100,200,255,0.08)'
                          : 'rgba(100,150,200,0.08)',
                      border: `1px solid ${theme === 'dark' ? 'rgba(100,200,255,0.20)' : 'rgba(100,150,200,0.18)'}`,
                      borderRadius: 10,
                      padding: '6px 10px',
                      flexShrink: 0,
                    }}
                  >
                    {['EN', 'RU', 'UZ'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() =>
                          setLanguage(lang.toLowerCase() as 'en' | 'ru' | 'uz')
                        }
                        style={{
                          background:
                            language === lang.toLowerCase()
                              ? theme === 'dark'
                                ? 'rgba(100,200,255,0.2)'
                                : 'rgba(100,150,200,0.15)'
                              : 'transparent',
                          color:
                            language === lang.toLowerCase()
                              ? theme === 'dark'
                                ? '#64C8FF'
                                : '#2c5aa0'
                              : theme === 'dark'
                                ? 'rgba(255,255,255,0.5)'
                                : 'rgba(100,150,200,0.55)',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          padding: '4px 8px',
                          borderRadius: 6,
                          transition: 'all 0.2s ease',
                          fontFamily: "'Barlow', sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color =
                            theme === 'dark'
                              ? 'rgba(255,255,255,0.8)'
                              : 'rgba(100,150,200,0.85)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            language === lang.toLowerCase()
                              ? theme === 'dark'
                                ? '#64C8FF'
                                : '#2c5aa0'
                              : theme === 'dark'
                                ? 'rgba(255,255,255,0.5)'
                                : 'rgba(100,150,200,0.55)'
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* MOBILE RIGHT: theme toggle + hamburger */}
            <div className="mob" style={{ alignItems: 'center', gap: 10 }}>
              {!isHome && (
                <button
                  onClick={toggle}
                  className="theme-btn"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        isHome
                          ? '#ffffff'
                          : theme === 'light'
                            ? '#000000'
                            : '#ffffff'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        isHome
                          ? '#ffffff'
                          : theme === 'light'
                            ? '#000000'
                            : '#ffffff'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  )}
                </button>
              )}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  flexDirection: 'column',
                  gap: 5,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 4px',
                  display: 'flex',
                }}
              >
                <span
                  className="hbar"
                  style={{
                    background: isHome
                      ? '#ffffff'
                      : theme === 'light'
                        ? '#000000'
                        : '#ffffff',
                    transform: menuOpen
                      ? 'rotate(44deg) translate(4.5px, 5px)'
                      : 'none',
                  }}
                />
                <span
                  className="hbar"
                  style={{
                    background: isHome
                      ? '#ffffff'
                      : theme === 'light'
                        ? '#000000'
                        : '#ffffff',
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? 'scaleX(0)' : 'none',
                  }}
                />
                <span
                  className="hbar"
                  style={{
                    background: isHome
                      ? '#ffffff'
                      : theme === 'light'
                        ? '#000000'
                        : '#ffffff',
                    transform: menuOpen
                      ? 'rotate(-44deg) translate(4.5px, -5px)'
                      : 'none',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {menuOpen && (
          <div
            className="drawer mob"
            style={{
              flexDirection: 'column',
              background: drawerBg,
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,200,100,0.07)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                className={`mob-lnk ${pathname === href ? 'act' : ''}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  borderBottom:
                    i < NAV_LINKS.length - 1
                      ? theme === 'dark'
                        ? '1px solid rgba(255,200,100,0.05)'
                        : '1px solid rgba(100,150,200,0.08)'
                      : 'none',
                }}
              >
                <span>{label}</span>
                <span className="arrow">→</span>
              </Link>
            ))}
            {!isHome && (
              <div
                style={{
                  padding: '14px 28px',
                  borderTop:
                    theme === 'dark'
                      ? '1px solid rgba(255,200,100,0.05)'
                      : '1px solid rgba(100,150,200,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:
                      theme === 'dark'
                        ? 'rgba(255,200,100,0.3)'
                        : 'rgba(100,150,200,0.4)',
                  }}
                >
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </span>
                <button
                  onClick={() => {
                    toggle()
                    setMenuOpen(false)
                  }}
                  className="theme-btn"
                >
                  {theme === 'light' ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        theme === 'light' ? '#333333' : 'rgba(255,220,140,0.7)'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        theme === 'dark' ? 'rgba(255,220,140,0.85)' : '#333333'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {/* Mobile Language Switcher */}
            {!isHome && (
              <div
                style={{
                  padding: '14px 28px',
                  borderTop:
                    theme === 'dark'
                      ? '1px solid rgba(255,200,100,0.05)'
                      : '1px solid rgba(100,150,200,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:
                      theme === 'dark'
                        ? 'rgba(255,200,100,0.3)'
                        : 'rgba(100,150,200,0.4)',
                  }}
                >
                  Language
                </span>
                <div
                  style={{
                    display: 'flex',
                    gap: 4,
                    background:
                      theme === 'dark'
                        ? 'rgba(100,200,255,0.08)'
                        : 'rgba(100,150,200,0.08)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(100,200,255,0.20)' : 'rgba(100,150,200,0.18)'}`,
                    borderRadius: 8,
                    padding: '4px 6px',
                  }}
                >
                  {['EN', 'RU', 'UZ'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang.toLowerCase() as 'en' | 'ru' | 'uz')
                        setMenuOpen(false)
                      }}
                      style={{
                        background:
                          language === lang.toLowerCase()
                            ? theme === 'dark'
                              ? 'rgba(100,200,255,0.2)'
                              : 'rgba(100,150,200,0.15)'
                            : 'transparent',
                        color:
                          language === lang.toLowerCase()
                            ? theme === 'dark'
                              ? '#64C8FF'
                              : '#2c5aa0'
                            : theme === 'dark'
                              ? 'rgba(255,255,255,0.5)'
                              : 'rgba(100,150,200,0.55)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        padding: '3px 6px',
                        borderRadius: 5,
                        fontFamily: "'Barlow', sans-serif",
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div
              style={{
                padding: '12px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 1,
                  background: 'rgba(212,135,60,0.25)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 8,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,135,60,0.25)',
                }}
              >
                ASORT EST. 2025
              </span>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
