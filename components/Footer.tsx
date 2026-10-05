'use client'

import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'
import { useLanguage } from '@/components/LanguageContext'
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa'

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT = [
  { label: 'info@asort.uz',        href: 'mailto:info@asort.uz'     },
  { label: '+998 99 010 04 90',    href: 'tel:+998990100490'        },
  { label: 'Telegram: @asortuz',   href: 'https://t.me/asortuz'     },
  { label: 'Instagram: @asort.uz', href: 'https://instagram.com/asort.uz' },
  { label: "Toshkent, O'zbekiston", href: null                       },
]

const SOCIALS = [
  {
    label: 'Telegram',
    href: 'https://t.me/asortuz',
    icon: (size: number) => <FaTelegramPlane size={size} />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/asort.uz',
    icon: (size: number) => <FaInstagram size={size} />,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const DARK = {
  bg:           '#070E17',
  topBorder:    'rgba(91,184,212,0.18)',
  divider:      'rgba(91,184,212,0.08)',
  brand:        '#E4F0F5',
  accent:       '#5BB8D4',
  text:         '#4A7A90',
  textHov:      '#E4F0F5',
  dim:          'rgba(91,184,212,0.28)',
  // Social icons — distinct from accent so they stand apart
  socialBg:     'rgba(91,184,212,0.07)',
  socialBorder: 'rgba(91,184,212,0.20)',
  socialIcon:   '#5BB8D4',
  socialHovBg:  'rgba(91,184,212,0.16)',
  socialHovBorder: '#5BB8D4',
  socialHovIcon:   '#E4F0F5',
}

const LIGHT = {
  bg:           '#FAF6EE',
  topBorder:    '#E6E1D8',
  divider:      '#E6E1D8',
  brand:        '#1E2520',
  accent:       '#2D5F3E',
  text:         '#505A53',
  textHov:      '#1E2520',
  dim:          '#869389',
  socialBg:     'rgba(45, 95, 62, 0.05)',
  socialBorder: 'rgba(45, 95, 62, 0.18)',
  socialIcon:   '#2D5F3E',
  socialHovBg:  '#2D5F3E',
  socialHovBorder: '#2D5F3E',
  socialHovIcon:   '#FAF6EE',
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const footerTranslations = {
  uz: {
    description: "Markaziy Osiyodagi hamkor xo'jaliklardan keltiriladigan yuqori sifatli oziq-ovqat mahsulotlari — sertifikatlangan va 1000 dan ortiq mamnun mijozlar hamda distribyutorlar ishonchini qozongan.",
    products: "Mahsulotlar",
    company: "Kompaniya",
    contact: "Aloqa",
    rights: "Asort MChJ. Barcha huquqlar himoyalangan.",
    about: "Biz haqimizda",
    partners: "Hamkorlar",
    news: "Yangiliklar",
    productList: ['Rossiya shakari', 'Grechka yormasi', 'Alanga guruch'],
  },
  ru: {
    description: "Высококачественные продукты питания от партнерских хозяйств Центральной Азии — сертифицированы и пользуются доверием более 1000 довольных клиентов и дистрибьюторов.",
    products: "Продукты",
    company: "Компания",
    contact: "Контакты",
    rights: "ООО Asort. Все права защищены.",
    about: "О нас",
    partners: "Партнеры",
    news: "Новости",
    productList: ['Российский сахар', 'Гречневая крупа', 'Рис Аланга'],
  },
  en: {
    description: "High-quality food products sourced from partner farms in Central Asia — certified and trusted by over 1000 happy clients and distributors.",
    products: "Products",
    company: "Company",
    contact: "Contact",
    rights: "Asort LLC. All rights reserved.",
    about: "About Us",
    partners: "Partners",
    news: "News",
    productList: ['Russian sugar', 'Buckwheat', 'Alanga rice'],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const T = theme === 'dark' ? DARK : LIGHT

  const getLocalizedHref = (href: string) => {
    return `/${language}${href}`
  }

  const t = footerTranslations[language] || footerTranslations.uz

  const NAV = [
    { name: t.about,    href: '/about'    },
    { name: t.products, href: '/products' },
    { name: t.news,     href: '/news'     },
    { name: t.partners, href: '/partners' },
    { name: t.contact,  href: '/contact'  },
  ]

  return (
    <footer style={{
      background: T.bg,
      borderTop: `1px solid ${T.topBorder}`,
      transition: 'background 0.3s',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* Nav / contact links */
        .ft-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          color: ${T.text};
          text-decoration: none;
          display: block;
          padding: 3.5px 0;
          line-height: 1.65;
          transition: color 0.14s;
        }
        .ft-link:hover { color: ${T.textHov}; }

        /* Column labels */
        .ft-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: ${T.accent};
          margin-bottom: 16px;
          display: block;
        }

        /* Social icon button */
        .ft-social {
          width: 34px; height: 34px;
          border-radius: 2px;
          border: 1px solid ${T.socialBorder};
          background: ${T.socialBg};
          color: ${T.socialIcon};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.16s, border-color 0.16s, color 0.16s, transform 0.16s;
          cursor: pointer;
        }
        .ft-social:hover {
          background: ${T.socialHovBg};
          border-color: ${T.socialHovBorder};
          color: ${T.socialHovIcon};
          transform: translateY(-2px);
        }

        /* Desktop: 4-col grid */
        .ft-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 0 52px;
        }

        /* Tablet: 3-col — Products hidden */
        @media (max-width: 900px) {
          .ft-grid {
            grid-template-columns: 2fr 1fr 1.3fr;
            gap: 0 36px;
          }
          .ft-products-col { display: none !important; }
        }

        /* Mobile: 2-col — Brand spans full, Products hidden */
        @media (max-width: 600px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 24px;
          }
          .ft-brand-col { grid-column: 1 / -1; }
          .ft-products-col { display: none !important; }
        }

        /* Very small: single col */
        @media (max-width: 380px) {
          .ft-grid { grid-template-columns: 1fr; }
          .ft-bottom-bar { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
        }

        @media (max-width: 600px) {
          .ft-bottom-bar { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>

      {/* ── MAIN GRID ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px 48px' }}>
        <div className="ft-grid">

          {/* COL 1 — Brand */}
          <div className="ft-brand-col" style={{ paddingRight: 8 }}>
            {/* Logo image */}
            <div style={{ marginBottom: 16 }}>
              <img
                src="/images/logo.webp"
                alt="Asort Logo"
                style={{
                  height: 48,
                  width: 'auto',
                  maxHeight: 48,
                  objectFit: 'contain',
                  display: 'block',
                  filter: theme === 'dark' ? 'brightness(1.1)' : 'none',
                }}
              />
            </div>

            {/* Accent rule */}
            <div style={{ width:28, height:1, background: T.accent, marginBottom:18 }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 12.5,
              color: T.text,
              lineHeight: 1.80,
              maxWidth: 254,
              marginBottom: 26,
            }}>
              {t.description}
            </p>

            {/* Social icons */}
            <div style={{ display:'flex', gap:8 }}>
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social"
                  aria-label={label}
                >
                  {icon(13)}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — Products (hidden on mobile/tablet) */}
          <div className="ft-products-col">
            <span className="ft-label">{t.products}</span>
            {t.productList.map(name => (
              <Link key={name} href={getLocalizedHref('/products')} prefetch={false} className="ft-link">{name}</Link>
            ))}
          </div>

          {/* COL 3 — Company */}
          <div>
            <span className="ft-label">{t.company}</span>
            {NAV.map(({ name, href }) => (
              <Link key={name} href={getLocalizedHref(href)} prefetch={false} className="ft-link">{name}</Link>
            ))}
          </div>

          {/* COL 4 — Contact */}
          <div>
            <span className="ft-label">{t.contact}</span>
            {CONTACT.map(({ label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  className="ft-link"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </a>
              ) : (
                <span key={label} style={{
                  display: 'block',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12.5,
                  color: T.text,
                  padding: '3.5px 0',
                  lineHeight: 1.65,
                }}>{label}</span>
              )
            )}
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ borderTop:`1px solid ${T.divider}` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'15px 48px' }}>
          <div
            className="ft-bottom-bar"
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}
          >
            <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:11, color: T.dim }}>
              © {new Date().getFullYear()} {t.rights}
            </span>
          </div>
        </div>
      </div>

    </footer>
  )
}
