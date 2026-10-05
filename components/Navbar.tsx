'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeContext'
import { useHomeColor } from './HomeColorContext'
import { useLanguage } from './LanguageContext'

const NAV_LABELS: Record<'uz' | 'ru' | 'en', string[]> = {
  uz: ['Bosh sahifa', 'Biz haqimizda', 'Mahsulotlar', 'Yangiliklar', 'Hamkorlar', 'Aloqa'],
  ru: ['Главная', 'О нас', 'Продукты', 'Новости', 'Партнёры', 'Контакты'],
  en: ['Home', 'About Us', 'Products', 'News', 'Partners', 'Contact'],
}
const NAV_HREFS = ['/', '/about', '/products', '/news', '/partners', '/contact']

const getNavLinks = (lang: 'uz' | 'ru' | 'en') =>
  NAV_HREFS.map((href, i) => ({ label: NAV_LABELS[lang][i], href }))

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { homeColor } = useHomeColor()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === `/${language}` || pathname === `/${language}/`

  const getLocalizedHref = (href: string) => {
    if (href === '/') return `/${language}/`
    return `/${language}${href}`
  }

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
  // Inner pages: transparent → light warm ivory on scroll for readability
  const navBg = isHome
    ? homeColor
      ? homeColor.bg
      : 'transparent'
    : scrolled
      ? 'rgba(253, 251, 247, 0.95)'
      : 'transparent'

  const drawerBg = 'rgba(253, 251, 247, 0.98)'
  const borderCol = scrolled ? '#E6E1D8' : 'transparent'
  const linkColorActive = isHome
    ? homeColor
      ? homeColor.text
      : '#2D5F3E'
    : '#2D5F3E'
  const linkColorBase = isHome
    ? homeColor
      ? `${homeColor.text}80`
      : 'rgba(30, 37, 32, 0.48)'
    : 'rgba(30, 37, 32, 0.65)'
  const linkColorHover = isHome
    ? homeColor
      ? homeColor.text
      : 'rgba(30, 37, 32, 0.9)'
    : '#1E2520'

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
          color: rgba(30, 37, 32, 0.65);
          text-decoration: none;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 28px;
          transition: background 0.15s, color 0.15s;
        }
        .mob-lnk:hover  { background: rgba(100, 150, 200, 0.08); color: #1E2520; }
        .mob-lnk.act    { color: #2D5F3E; background: rgba(100, 150, 200, 0.10); }
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
          .nav-container { padding: 0 16px !important; }
        }
        @media (max-width: 1024px) and (min-width: 769px) { .nav-gap { gap: 22px !important; } }

        /* Logo — use element+class selector and !important to beat Tailwind global img reset */
        img.nav-logo-img {
          height: 56px !important;
          width: 175px !important;
          min-width: 175px !important;
          max-width: 175px !important;
          min-height: 56px !important;
          max-height: 56px !important;
          object-fit: contain !important;
          display: block !important;
          flex-shrink: 0 !important;
          transition: none;
        }
        @media (max-width: 768px) {
          img.nav-logo-img {
            height: 48px !important;
            width: 150px !important;
            min-width: 150px !important;
            max-width: 150px !important;
            min-height: 48px !important;
            max-height: 48px !important;
            object-fit: contain !important;
          }
        }
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
        <div className="nav-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
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
              href={getLocalizedHref('/')}
              prefetch={false}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                flexShrink: 0,
              }}
            >
              <img
                src="/images/logo.webp"
                alt="Asort Logo"
                className="nav-logo-img"
                style={{
                  height: 56,
                  width: 175,
                  objectFit: 'contain',
                  display: 'block',
                  flexShrink: 0,
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
              {getNavLinks(language).map(({ label, href }) => (
                <Link
                  key={href}
                  href={getLocalizedHref(href)}
                  prefetch={false}
                  className={`nav-lnk ${pathname === getLocalizedHref(href) ? 'act' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* RIGHT: language switcher */}
            <div
              className="desk"
              style={{ alignItems: 'center', gap: 16, flexShrink: 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  background: isHome ? 'rgba(255, 255, 255, 0.08)' : 'rgba(45, 95, 62, 0.08)',
                  border: isHome ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(45, 95, 62, 0.18)',
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
                          ? isHome
                            ? 'rgba(255, 255, 255, 0.15)'
                            : 'rgba(45, 95, 62, 0.15)'
                          : 'transparent',
                      color:
                        language === lang.toLowerCase()
                          ? isHome
                            ? '#FFFFFF'
                            : '#2D5F3E'
                          : isHome
                            ? 'rgba(255, 255, 255, 0.65)'
                            : 'rgba(30, 37, 32, 0.55)',
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
                      e.currentTarget.style.color = isHome ? '#FFFFFF' : '#1E2520'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        language === lang.toLowerCase()
                          ? isHome
                            ? '#FFFFFF'
                            : '#2D5F3E'
                          : isHome
                            ? 'rgba(255, 255, 255, 0.65)'
                            : 'rgba(30, 37, 32, 0.55)'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* MOBILE RIGHT: hamburger */}
            <div className="mob" style={{ alignItems: 'center', gap: 10 }}>
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
                    background: menuOpen
                      ? '#000000'
                      : isHome
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
                    background: menuOpen
                      ? '#000000'
                      : isHome
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
                    background: menuOpen
                      ? '#000000'
                      : isHome
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
            {getNavLinks(language).map(({ label, href }, i) => (
              <Link
                key={href}
                href={getLocalizedHref(href)}
                prefetch={false}
                className={`mob-lnk ${pathname === getLocalizedHref(href) ? 'act' : ''}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  borderBottom:
                    i < NAV_HREFS.length - 1
                      ? '1px solid rgba(45, 95, 62, 0.08)'
                      : 'none',
                }}
              >
                <span>{label}</span>
                <span className="arrow">→</span>
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div
              style={{
                padding: '14px 28px',
                borderTop: '1px solid rgba(45, 95, 62, 0.08)',
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
                  color: 'rgba(30, 37, 32, 0.45)',
                }}
              >
                Til / Язык / Language
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  background: 'rgba(45, 95, 62, 0.08)',
                  border: '1px solid rgba(45, 95, 62, 0.18)',
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
                          ? 'rgba(45, 95, 62, 0.15)'
                          : 'transparent',
                      color:
                        language === lang.toLowerCase()
                          ? '#2D5F3E'
                          : 'rgba(30, 37, 32, 0.55)',
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
