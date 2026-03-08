'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/components/ThemeContext'

const PRODUCTS = [
  { name: 'Crystal White Sugar', href: '/products' },
  { name: 'Long Grain Rice', href: '/products' },
  { name: 'Roasted Buckwheat', href: '/products' },
  { name: 'Red Split Lentils', href: '/products' },
  { name: 'Whole Chickpeas', href: '/products' },
  { name: 'Sunflower Oil', href: '/products' },
]

const COMPANY = [
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'News', href: '/news' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
]

const CONTACT = [
  { icon: '✉', label: 'info@asort.com' },
  { icon: '✉', label: 'sales@asort.com' },
  { icon: '☎', label: '+998 90 123 45 67' },
  { icon: '⌖', label: 'Tashkent, Uzbekistan' },
]

const SOCIALS = [
  { label: 'LinkedIn', href: '#', abbr: 'LI' },
  { label: 'Instagram', href: '#', abbr: 'IG' },
  { label: 'Twitter', href: '#', abbr: 'TW' },
]

// ── Theme tokens ──────────────────────────────────────────────────────────────
const DARK = {
  footerBg: 'linear-gradient(135deg, #0F1729 0%, #1a2a4e 100%)',
  topBandBg: 'linear-gradient(135deg, #1a2a4e 0%, #0F1729 100%)',
  topBandBorder: 'rgba(100,200,255,0.15)',
  borderThin: 'rgba(100,200,255,0.12)',
  divider:
    'linear-gradient(90deg, transparent, rgba(100,200,255,0.20) 30%, rgba(100,200,255,0.20) 70%, transparent)',
  brandText: '#E8F1FF',
  brandSub: 'rgba(100,200,255,0.32)',
  brandReg: 'rgba(100,200,255,0.28)',
  brandDivider: 'rgba(100,200,255,0.20)',
  accent: '#64C8FF',
  accentHov: '#85D8FF',
  linkColor: 'rgba(168,210,255,0.48)',
  linkHov: 'rgba(168,210,255,0.90)',
  bodyText: 'rgba(168,210,255,0.55)',
  dimText: 'rgba(168,210,255,0.35)',
  veryDim: 'rgba(168,210,255,0.25)',
  iconColor: 'rgba(100,200,255,0.50)',
  socialBorder: 'rgba(100,200,255,0.18)',
  socialBg: 'rgba(100,200,255,0.08)',
  socialText: 'rgba(100,200,255,0.60)',
  inputBg: 'rgba(100,200,255,0.06)',
  inputBorder: 'rgba(100,200,255,0.18)',
  inputBorderErr: 'rgba(255,80,80,0.5)',
  inputText: '#E8F1FF',
  inputPlaceholder: 'rgba(168,210,255,0.35)',
  cardBg: 'rgba(100,200,255,0.05)',
  cardBorder: 'rgba(100,200,255,0.12)',
  hoursLabel: 'rgba(100,200,255,0.40)',
  hoursText: 'rgba(168,210,255,0.55)',
  badgeBg: 'rgba(100,200,255,0.08)',
  badgeBorder: 'rgba(100,200,255,0.15)',
  badgeText: 'rgba(168,210,255,0.50)',
  statNum: '#64C8FF',
  statLabel: 'rgba(100,200,255,0.35)',
  tagline: 'rgba(168,210,255,0.28)',
  formPanelBg: 'rgba(100,200,255,0.04)',
  formPanelBorder: 'rgba(100,200,255,0.12)',
  successBg: 'rgba(80,200,120,0.15)',
  successBorder: 'rgba(80,200,120,0.35)',
  successText: 'rgba(168,210,255,0.70)',
  errorText: 'rgba(255,100,100,0.90)',
}

const LIGHT = {
  footerBg: '#FFFFFF',
  topBandBg: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
  topBandBorder: 'rgba(100,150,200,0.15)',
  borderThin: 'rgba(100,150,200,0.12)',
  divider:
    'linear-gradient(90deg, transparent, rgba(100,150,200,0.15) 30%, rgba(100,150,200,0.15) 70%, transparent)',
  brandText: '#1a1f3a',
  brandSub: '#6b7a9e',
  brandReg: '#8b96b5',
  brandDivider: 'rgba(100,150,200,0.20)',
  accent: '#2c5aa0',
  accentHov: '#1a3a70',
  linkColor: '#4a5f8f',
  linkHov: '#1a1f3a',
  bodyText: '#3a4a6f',
  dimText: '#7a8aaf',
  veryDim: '#9ba5bf',
  iconColor: '#2c5aa0',
  socialBorder: 'rgba(100,150,200,0.18)',
  socialBg: 'rgba(100,150,200,0.06)',
  socialText: '#6b7a9e',
  inputBg: '#F5F7FB',
  inputBorder: 'rgba(100,150,200,0.22)',
  inputBorderErr: 'rgba(220,38,38,0.5)',
  inputText: '#1a1f3a',
  inputPlaceholder: '#8b96b5',
  cardBg: 'rgba(100,150,200,0.05)',
  cardBorder: 'rgba(100,150,200,0.12)',
  hoursLabel: '#8b96b5',
  hoursText: '#4a5f8f',
  badgeBg: 'rgba(100,150,200,0.08)',
  badgeBorder: 'rgba(100,150,200,0.14)',
  badgeText: '#4a5f8f',
  statNum: '#2c5aa0',
  statLabel: '#8b96b5',
  tagline: '#8b96b5',
  formPanelBg: 'rgba(100,150,200,0.04)',
  formPanelBorder: 'rgba(100,150,200,0.12)',
  successBg: 'rgba(46,122,62,0.10)',
  successBorder: 'rgba(46,122,62,0.25)',
  successText: '#3a6f3a',
  errorText: 'rgba(220,38,38,0.9)',
}

export default function Footer() {
  const { theme } = useTheme()
  const T = theme === 'dark' ? DARK : LIGHT

  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)
  const [subError, setSubError] = useState(false)

  const handleSub = () => {
    if (!email.includes('@')) {
      setSubError(true)
      return
    }
    setSubbed(true)
    setSubError(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@300;400;500;600&display=swap');

        .ft-link {
          font-family: 'Barlow', sans-serif;
          font-size: 12px; font-weight: 400;
          color: ${T.linkColor};
          text-decoration: none;
          display: block; padding: 4px 0;
          transition: color 0.18s ease;
          line-height: 1.6;
        }
        .ft-link:hover { color: ${T.linkHov}; }

        .social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid ${T.socialBorder};
          background: ${T.socialBg};
          color: ${T.socialText};
          font-family: 'Barlow', sans-serif; font-size: 9px;
          font-weight: 600; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.18s ease;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: #C47830;
          background: rgba(196,120,48,0.12);
          color: #C47830;
          transform: translateY(-2px);
        }

        .nl-input {
          flex: 1; border: none; background: transparent;
          font-family: 'Barlow', sans-serif; font-size: 12px;
          color: ${T.inputText}; padding: 11px 0;
        }
        .nl-input::placeholder { color: ${T.inputPlaceholder}; }
        .nl-input:focus { outline: none; }

        .nl-btn {
          flex-shrink: 0;
          padding: 8px 16px; border-radius: 8px;
          background: #2c5aa0; border: none;
          color: #fff; font-family: 'Barlow', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: background 0.18s;
          white-space: nowrap;
        }
        .nl-btn:hover { background: #1a3a70; }

        @keyframes subIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .sub-in { animation: subIn 0.3s cubic-bezier(.22,.68,0,1.2) forwards; }

        .ft-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 48px;
        }
        @media (max-width: 960px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 36px 28px; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr; gap: 28px; }
        }
        .ft-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
      `}</style>

      <footer
        style={{
          background: T.footerBg,
          borderTop: `1px solid ${T.borderThin}`,
          transition: 'background 0.3s ease',
        }}
      >
        {/* ── TOP BAND ── */}
        <div
          style={{
            background: T.topBandBg,
            borderBottom: `1px solid ${T.topBandBorder}`,
            padding: '16px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: T.brandText,
                letterSpacing: '0.24em',
              }}
            >
              ASORT
            </span>
            <span style={{ fontSize: 8, color: T.brandReg }}>®</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="social-btn"
              >
                {s.abbr}
              </a>
            ))}
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '36px 40px 28px',
          }}
        >
          <div className="ft-grid">
            {/* COL 1 — Brand + newsletter */}
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 11,
                  color: T.bodyText,
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginBottom: 18,
                  maxWidth: 280,
                }}
              >
                Premium-grade food staples from Central Asia. Quality certified
                & trusted globally.
              </p>

              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: T.accent,
                  marginBottom: 10,
                }}
              >
                Updates
              </p>

              {subbed ? (
                <div
                  className="sub-in"
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: T.successBg,
                      border: `1px solid ${T.successBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                    }}
                  >
                    ✓
                  </div>
                  <p
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 10,
                      color: T.successText,
                    }}
                  >
                    Subscribed!
                  </p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: T.inputBg,
                      border: `1px solid ${subError ? T.inputBorderErr : T.inputBorder}`,
                      borderRadius: 8,
                      padding: '2px 6px 2px 12px',
                      transition: 'border-color 0.18s',
                    }}
                  >
                    <input
                      className="nl-input"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setSubError(false)
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSub()}
                    />
                    <button className="nl-btn" onClick={handleSub}>
                      Go
                    </button>
                  </div>
                  {subError && (
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        color: T.errorText,
                        marginTop: 4,
                      }}
                    >
                      ⚠ Valid email
                    </p>
                  )}
                </>
              )}
            </div>

            {/* COL 2 — Products */}
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: T.accent,
                  marginBottom: 12,
                }}
              >
                Products
              </p>
              {PRODUCTS.slice(0, 4).map((p) => (
                <Link key={p.name} href={p.href} className="ft-link">
                  {p.name}
                </Link>
              ))}
            </div>

            {/* COL 3 — Company */}
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: T.accent,
                  marginBottom: 12,
                }}
              >
                Links
              </p>
              {COMPANY.slice(0, 4).map((c) => (
                <Link key={c.name} href={c.href} className="ft-link">
                  {c.name}
                </Link>
              ))}
            </div>

            {/* COL 4 — Contact (simplified) */}
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: T.accent,
                  marginBottom: 12,
                }}
              >
                Contact
              </p>
              {CONTACT.slice(0, 3).map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 7,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: T.iconColor,
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 11,
                      color: T.hoursText,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ height: 1, background: T.divider }} />
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 40px' }}>
          <div className="ft-bottom">
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 9,
                color: T.dimText,
              }}
            >
              © {new Date().getFullYear()} Asort. All rights reserved.
            </span>

            <div
              style={{
                display: 'flex',
                gap: 20,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {[
                { v: '8', l: 'Products' },
                { v: '40+', l: 'Countries' },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: 14,
                      color: T.statNum,
                    }}
                  >
                    {v}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 8,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: T.statLabel,
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
