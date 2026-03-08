'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'

// ── Theme tokens ──────────────────────────────────────────────────────────────
const LIGHT_C = {
  bg: '#FFFFFF',
  bgCard: '#F5F8FF',
  bgCardHov: '#F0F4FA',
  surface: '#E8ECFF',
  border: '#D8E0ED',
  borderHov: '#2c5aa0',
  accent: '#2c5aa0',
  accentDeep: '#1a3a70',
  accentLight: '#E8F1FF',
  accentGlow: 'rgba(44,90,160,0.10)',
  text: '#1a1f3a',
  textMid: '#4a5f8f',
  textMuted: '#7a8aaf',
  textDim: '#9ba5bf',
  green: '#3a6f3a',
  greenBg: '#E8F5EC',
  greenBorder: '#A8D4B4',
  navBg: '#FFFFFF',
  navBorder: 'rgba(100,150,200,0.10)',
  darkCard: '#E8F1FF',
  darkBorder: 'rgba(100,150,200,0.15)',
  darkText: '#1a1f3a',
  darkMuted: 'rgba(26,31,58,0.55)',
}

const DARK_C = {
  bg: '#0F1729',
  bgCard: '#1a2a4e',
  bgCardHov: '#1f3458',
  surface: '#232d45',
  border: '#3a4d70',
  borderHov: '#64C8FF',
  accent: '#64C8FF',
  accentDeep: '#3a9acc',
  accentLight: 'rgba(100,200,255,0.12)',
  accentGlow: 'rgba(100,200,255,0.08)',
  text: '#E8F1FF',
  textMid: '#9abadb',
  textMuted: '#6a8abd',
  textDim: '#4a6a9d',
  green: '#3A9A50',
  greenBg: 'rgba(46,122,62,0.15)',
  greenBorder: 'rgba(58,154,80,0.35)',
  navBg: '#0F1729',
  navBorder: 'rgba(100,200,255,0.08)',
  darkCard: '#1a2a4e',
  darkBorder: 'rgba(100,200,255,0.12)',
  darkText: '#E8F1FF',
  darkMuted: 'rgba(232,241,255,0.50)',
}

type Partner = {
  id: number
  name: string
  type: 'Retail' | 'Distributor' | 'Hospitality' | 'Industrial'
  region:
    | 'Central Asia'
    | 'Eastern Europe'
    | 'Middle East'
    | 'Western Europe'
    | 'South Asia'
  country: string
  flag: string
  initial: string
  color: string
  since: string
  description: string
  products: string[]
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: 'FreshMart Group',
    type: 'Retail',
    region: 'Central Asia',
    country: 'Uzbekistan',
    flag: '🇺🇿',
    initial: 'FM',
    color: '#1E4D8C',
    since: '2025',
    description:
      "One of the region's largest supermarket chains with 320+ locations across 7 countries. Carries the full Asort range.",
    products: ['Sugar', 'Rice', 'Lentils', 'Chickpeas'],
  },
  {
    id: 2,
    name: 'AgroTrade KZ',
    type: 'Distributor',
    region: 'Central Asia',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    initial: 'AT',
    color: '#14532D',
    since: '2021',
    description:
      'Primary wholesale distributor for Asort products across Kazakhstan, covering 1,200+ retail touchpoints.',
    products: ['Rice', 'Buckwheat', 'Pearl Barley'],
  },
  {
    id: 3,
    name: 'NutriCore Almaty',
    type: 'Industrial',
    region: 'Central Asia',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    initial: 'NC',
    color: '#7C3AED',
    since: '2022',
    description:
      'Food manufacturing partner that uses Asort grains and legumes as core ingredients in packaged meal solutions.',
    products: ['Buckwheat', 'Rice', 'Lentils'],
  },
  {
    id: 4,
    name: 'Golden Shelf',
    type: 'Retail',
    region: 'Eastern Europe',
    country: 'Poland',
    flag: '🇵🇱',
    initial: 'GS',
    color: '#C2410C',
    since: '2023',
    description:
      'Premium grocery chain operating 140 stores across Poland and Czech Republic. Dedicated Asort branded shelf space.',
    products: ['Sugar', 'Chickpeas', 'Sunflower Oil'],
  },
  {
    id: 5,
    name: 'EuroGrain Distribution',
    type: 'Distributor',
    region: 'Eastern Europe',
    country: 'Romania',
    flag: '🇷🇴',
    initial: 'EG',
    color: '#15803D',
    since: '2022',
    description:
      "Regional distributor covering Romania, Bulgaria, and Moldova. Manages Asort's entire Eastern European logistics chain.",
    products: ['Rice', 'Buckwheat', 'Lentils'],
  },
  {
    id: 6,
    name: 'Palmera Hotels UAE',
    type: 'Hospitality',
    region: 'Middle East',
    country: 'UAE',
    flag: '🇦🇪',
    initial: 'PH',
    color: '#B45309',
    since: '2024',
    description:
      'Luxury hotel group with 12 five-star properties across Dubai and Abu Dhabi. Asort Rice is the house rice across all kitchens.',
    products: ['Rice'],
  },
  {
    id: 7,
    name: 'Al Qudra Food Group',
    type: 'Distributor',
    region: 'Middle East',
    country: 'Qatar',
    flag: '🇶🇦',
    initial: 'AQ',
    color: '#0F766E',
    since: '2024',
    description:
      "Leading Gulf food distributor managing Asort's hospitality and retail supply across UAE, Qatar and Kuwait.",
    products: ['Rice', 'Lentils', 'Chickpeas'],
  },
  {
    id: 8,
    name: 'Saveur Bio France',
    type: 'Retail',
    region: 'Western Europe',
    country: 'France',
    flag: '🇫🇷',
    initial: 'SB',
    color: '#4338CA',
    since: '2024',
    description:
      "Organic and premium food retailer with 80 locations across France. Carries Asort's certified product lines.",
    products: ['Chickpeas', 'Lentils', 'Sunflower Oil'],
  },
  {
    id: 9,
    name: 'PortuFresh Lisboa',
    type: 'Distributor',
    region: 'Western Europe',
    country: 'Portugal',
    flag: '🇵🇹',
    initial: 'PF',
    color: '#DC2626',
    since: '2024',
    description:
      "Asort's newest distribution partner, managing retail placement across Portugal's independent grocery sector.",
    products: ['Sugar', 'Rice', 'Buckwheat'],
  },
  {
    id: 10,
    name: 'SpiceRoute India',
    type: 'Distributor',
    region: 'South Asia',
    country: 'India',
    flag: '🇮🇳',
    initial: 'SR',
    color: '#D97706',
    since: '2023',
    description:
      "Premium food distributor based in Mumbai, managing Asort's growing South Asian wholesale and specialty retail channel.",
    products: ['Lentils', 'Chickpeas', 'Rice'],
  },
  {
    id: 11,
    name: 'Ritz Grand Doha',
    type: 'Hospitality',
    region: 'Middle East',
    country: 'Qatar',
    flag: '🇶🇦',
    initial: 'RG',
    color: '#92400E',
    since: '2024',
    description:
      '5-star luxury hotel group using Asort Rice and Lentils across their 6 restaurant kitchens in Doha.',
    products: ['Rice', 'Lentils'],
  },
  {
    id: 12,
    name: 'BioMarkt Vienna',
    type: 'Retail',
    region: 'Western Europe',
    country: 'Austria',
    flag: '🇦🇹',
    initial: 'BM',
    color: '#065F46',
    since: '2023',
    description:
      "Austria's fastest-growing organic food chain. Asort's buckwheat and lentils have been top sellers since launch.",
    products: ['Buckwheat', 'Lentils', 'Chickpeas'],
  },
]

const PARTNER_TYPES = [
  'All',
  'Retail',
  'Distributor',
  'Hospitality',
  'Industrial',
] as const
const REGIONS = [
  'All Regions',
  'Central Asia',
  'Eastern Europe',
  'Middle East',
  'Western Europe',
  'South Asia',
] as const

function getTypeStyle(type: string, C: typeof LIGHT_C) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    Retail: { bg: C.accentLight, text: C.accent, border: '#F0CC9A' },
    Distributor: { bg: C.greenBg, text: C.green, border: C.greenBorder },
    Hospitality: {
      bg: 'rgba(194,65,12,0.10)',
      text: '#C2410C',
      border: 'rgba(194,65,12,0.25)',
    },
    Industrial: {
      bg: 'rgba(109,40,217,0.10)',
      text: '#7C3AED',
      border: 'rgba(109,40,217,0.25)',
    },
  }
  return map[type] || { bg: C.surface, text: C.textMid, border: C.border }
}

const REGION_DATA = [
  {
    name: 'Central Asia',
    count: 3,
    icon: '🌾',
    x: '62%',
    y: '32%',
    color: '#C47830',
  },
  {
    name: 'Eastern Europe',
    count: 2,
    icon: '🏪',
    x: '48%',
    y: '24%',
    color: '#2E7A3E',
  },
  {
    name: 'Middle East',
    count: 3,
    icon: '🏨',
    x: '56%',
    y: '40%',
    color: '#C2410C',
  },
  {
    name: 'Western Europe',
    count: 3,
    icon: '🛒',
    x: '42%',
    y: '22%',
    color: '#4338CA',
  },
  {
    name: 'South Asia',
    count: 1,
    icon: '📦',
    x: '68%',
    y: '44%',
    color: '#0891B2',
  },
]

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true)
          obs.disconnect()
        }
      },
      { threshold: 0.07 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function PartnerModal({
  partner,
  onClose,
  C,
}: {
  partner: Partner
  onClose: () => void
  C: typeof LIGHT_C
}) {
  const ts = getTypeStyle(partner.type, C)
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(10,7,3,0.52)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fadeOv .2s ease forwards',
      }}
    >
      <style>{`@keyframes fadeOv{from{opacity:0}to{opacity:1}} @keyframes slideM{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bgCard,
          borderRadius: 24,
          maxWidth: 540,
          width: '100%',
          boxShadow: '0 40px 100px rgba(0,0,0,0.18)',
          border: `1px solid ${C.border}`,
          animation: 'slideM .28s cubic-bezier(.22,.68,0,1.1) forwards',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: partner.color,
            padding: '36px 36px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 900,
              fontSize: 160,
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {partner.initial}
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              zIndex: 1,
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: 16,
                color: '#fff',
                letterSpacing: '0.05em',
              }}
            >
              {partner.initial}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: 4,
                }}
              >
                Partner
              </p>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {partner.name}
              </h2>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '28px 36px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                ...ts,
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '4px 11px',
                borderRadius: 99,
              }}
            >
              {partner.type}
            </span>
            <span
              style={{
                background: C.surface,
                color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 9,
                fontWeight: 600,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '4px 11px',
                borderRadius: 99,
              }}
            >
              {partner.flag} {partner.country}
            </span>
            <span
              style={{
                background: C.surface,
                color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 9,
                fontWeight: 600,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '4px 11px',
                borderRadius: 99,
              }}
            >
              Since {partner.since}
            </span>
            <span
              style={{
                background: C.surface,
                color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 9,
                fontWeight: 600,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '4px 11px',
                borderRadius: 99,
              }}
            >
              {partner.region}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 13.5,
              color: C.textMid,
              lineHeight: 1.82,
              fontWeight: 300,
            }}
          >
            {partner.description}
          </p>
          <div style={{ height: 1, background: C.border }} />
          <div>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 9,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: C.textMuted,
                marginBottom: 10,
              }}
            >
              Products Carried
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {partner.products.map((prod) => (
                <span
                  key={prod}
                  style={{
                    background: C.accentLight,
                    color: C.accent,
                    border: `1px solid #F0CC9A`,
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'Barlow',sans-serif",
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: 99,
                  }}
                >
                  {prod}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <Link
              href="/contact"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 0',
                borderRadius: 12,
                background: C.accent,
                color: '#fff',
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(196,120,48,0.22)',
              }}
            >
              Contact Us →
            </Link>
            <button
              onClick={onClose}
              style={{
                padding: '13px 20px',
                borderRadius: 12,
                background: C.surface,
                border: `1.5px solid ${C.border}`,
                color: C.textMid,
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PartnersPage() {
  const { theme } = useTheme()
  const C = theme === 'dark' ? DARK_C : LIGHT_C

  const [activeType, setActiveType] = useState<string>('All')
  const [activeRegion, setActiveRegion] = useState<string>('All Regions')
  const [openPartner, setOpenPartner] = useState<Partner | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    type: '',
    message: '',
  })

  const filtered = PARTNERS.filter((p) => {
    const typeOk = activeType === 'All' || p.type === activeType
    const regionOk = activeRegion === 'All Regions' || p.region === activeRegion
    return typeOk && regionOk
  })

  const handleSubmit = () => {
    if (formData.company && formData.email.includes('@')) setFormSent(true)
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        fontFamily: "'Barlow Condensed',sans-serif",
        transition: 'background 0.3s ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:99px;}

        .chip {
          font-family:'Barlow',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:.18em; text-transform:uppercase;
          padding:7px 16px; border-radius:99px; cursor:pointer;
          border:1.5px solid ${C.border}; background:${C.bgCard}; color:${C.textMuted};
          transition:all .18s; white-space:nowrap;
        }
        .chip:hover { border-color:${C.accent}; color:${C.accent}; background:${C.accentLight}; }
        .chip.on    { background:${C.accent}; border-color:${C.accent}; color:#fff; }
        .chip.sm    { font-size:9px; padding:5px 12px; }

        .partner-card {
          background:${C.bgCard}; border:1.5px solid ${C.border};
          border-radius:18px; cursor:pointer; transition:all .22s ease;
          overflow:hidden; display:flex; flex-direction:column; height:100%;
        }
        .partner-card:hover { border-color:${C.borderHov}; transform:translateY(-5px); box-shadow:0 20px 48px rgba(196,120,48,0.11), 0 4px 14px rgba(0,0,0,0.06); }
        .partner-card:hover .pc-arrow { transform:translateX(4px); color:${C.accent}; }
        .pc-arrow { transition:all .2s; color:${C.textMuted}; }

        .form-input {
          width:100%; padding:12px 16px; border-radius:12px;
          border:1.5px solid ${C.border}; background:${C.surface};
          font-family:'Barlow',sans-serif; font-size:13px; color:${C.text};
          transition:border-color .18s;
        }
        .form-input:focus { outline:none; border-color:${C.accent}; background:${C.bgCard}; }
        .form-input::placeholder { color:${C.textMuted}; }

        .form-select {
          width:100%; padding:12px 16px; border-radius:12px;
          border:1.5px solid ${C.border}; background:${C.surface};
          font-family:'Barlow',sans-serif; font-size:13px; color:${C.text};
          appearance:none; cursor:pointer;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23A8927A'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 14px center;
          transition:border-color .18s;
        }
        .form-select:focus { outline:none; border-color:${C.accent}; background:${C.bgCard}; }

        .region-dot { transition:all .22s; cursor:pointer; }
        .region-dot:hover { transform:scale(1.18); }

        @keyframes cin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .cin{animation:cin .32s ease both;}
        @keyframes tickIn{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}} .tick-in{animation:tickIn .3s cubic-bezier(.34,1.56,.64,1) forwards;}

        @media(max-width:768px){ .pg-grid{grid-template-columns:1fr!important} .chips-wrap{flex-wrap:wrap!important} .stats-row{grid-template-columns:repeat(2,1fr)!important} .become-grid{grid-template-columns:1fr!important;gap:32px!important} .form-row{grid-template-columns:1fr!important} }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div
        style={{
          background:
            theme === 'dark'
              ? `linear-gradient(180deg, ${C.navBg} 0%, #1C1408 65%, ${C.bg} 100%)`
              : '#FFFFFF',
          paddingTop: 64,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '52px 40px 48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 28,
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: theme === 'dark' ? 'rgba(255,220,140,0.28)' : '#7a8aaf',
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
            <span
              style={{
                color: theme === 'dark' ? 'rgba(255,220,140,0.18)' : '#9ba5bf',
                fontSize: 10,
              }}
            >
              ›
            </span>
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: C.accent,
              }}
            >
              Partners
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 32,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: '0.48em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 14,
                }}
              >
                Global Network
              </p>
              <h1
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3rem,7vw,5.5rem)',
                  color: theme === 'dark' ? '#fff' : '#1a1f3a',
                  textTransform: 'uppercase',
                  lineHeight: 0.88,
                }}
              >
                Our
                <br />
                <span style={{ color: C.accent }}>Partners</span>
              </h1>
            </div>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: theme === 'dark' ? 'rgba(255,220,150,0.38)' : '#6b7a9e',
                maxWidth: 360,
                lineHeight: 1.85,
              }}
            >
              A trusted network of retailers, distributors, hospitality groups,
              and industrial buyers across 5 regions and 40+ countries.
            </p>
          </div>
          <div
            className="stats-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 0,
              marginTop: 40,
              borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,220,140,0.07)' : '#d8e0ed'}`,
              paddingTop: 28,
            }}
          >
            {[
              { v: `${PARTNERS.length}`, l: 'Active partners' },
              { v: '5', l: 'Regions covered' },
              { v: '40+', l: 'Countries' },
              { v: '4', l: 'Partnership types' },
            ].map(({ v, l }, i) => (
              <div
                key={l}
                style={{
                  paddingRight: 24,
                  borderRight:
                    i < 3
                      ? `1px solid ${theme === 'dark' ? 'rgba(255,220,140,0.07)' : '#d8e0ed'}`
                      : 'none',
                  paddingLeft: i > 0 ? 24 : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: 32,
                    color: theme === 'dark' ? '#fff' : '#1a1f3a',
                    lineHeight: 1,
                  }}
                >
                  {v}
                </p>
                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color:
                      theme === 'dark' ? 'rgba(255,220,140,0.25)' : '#7a8aaf',
                    marginTop: 4,
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px 80px' }}>
        {/* ── WORLD REGIONS ── */}
        <Reveal>
          <section style={{ marginBottom: 64 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.text,
                  textTransform: 'uppercase',
                }}
              >
                Where We Operate
              </h2>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                padding: '32px 32px 28px',
                overflow: 'hidden',
                transition: 'background 0.3s ease',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 32,
                  alignItems: 'center',
                }}
                className="pg-grid"
              >
                <div
                  style={{
                    position: 'relative',
                    height: 220,
                    background: `linear-gradient(135deg, ${C.surface} 0%, ${C.bg} 100%)`,
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  {[20, 40, 60, 80].map((y) => (
                    <div
                      key={y}
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: `${y}%`,
                        height: 1,
                        background: C.border,
                      }}
                    />
                  ))}
                  {[20, 40, 60, 80].map((x) => (
                    <div
                      key={x}
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${x}%`,
                        width: 1,
                        background: C.border,
                      }}
                    />
                  ))}
                  {REGION_DATA.map((r) => (
                    <div
                      key={r.name}
                      className="region-dot"
                      onClick={() =>
                        setActiveRegion(
                          r.name === activeRegion ? 'All Regions' : r.name
                        )
                      }
                      style={{
                        position: 'absolute',
                        left: r.x,
                        top: r.y,
                        transform: 'translate(-50%,-50%)',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: -6,
                          borderRadius: '50%',
                          border: `1px solid ${r.color}`,
                          opacity: activeRegion === r.name ? 0.6 : 0.2,
                        }}
                      />
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background:
                            activeRegion === r.name ? r.color : C.bgCard,
                          border: `2px solid ${r.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow:
                            activeRegion === r.name
                              ? `0 0 0 4px ${r.color}22`
                              : '0 2px 8px rgba(0,0,0,0.1)',
                          transition: 'all .22s',
                          fontSize: 14,
                        }}
                      >
                        <span>{r.icon}</span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: C.navBg,
                          color: '#fff',
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 8,
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: 99,
                          whiteSpace: 'nowrap',
                          opacity: activeRegion === r.name ? 1 : 0,
                          transition: 'opacity .2s',
                          pointerEvents: 'none',
                        }}
                      >
                        {r.name}
                      </div>
                    </div>
                  ))}
                  <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 9,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: C.textMuted,
                      }}
                    >
                      Click a region to filter
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    minWidth: 220,
                  }}
                >
                  {REGION_DATA.map((r) => {
                    const isActive = activeRegion === r.name
                    return (
                      <div
                        key={r.name}
                        onClick={() =>
                          setActiveRegion(isActive ? 'All Regions' : r.name)
                        }
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          padding: '10px 14px',
                          borderRadius: 12,
                          background: isActive ? C.accentLight : C.surface,
                          border: `1px solid ${isActive ? C.borderHov : C.border}`,
                          cursor: 'pointer',
                          transition: 'all .18s',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: r.color,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: 11,
                              fontWeight: 600,
                              color: isActive ? C.accent : C.textMid,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {r.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontWeight: 900,
                            fontSize: 16,
                            color: isActive ? C.accent : C.text,
                          }}
                        >
                          {r.count}
                        </span>
                      </div>
                    )
                  })}
                  {activeRegion !== 'All Regions' && (
                    <button
                      onClick={() => setActiveRegion('All Regions')}
                      style={{
                        marginTop: 4,
                        padding: '8px 0',
                        background: 'none',
                        border: 'none',
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: C.accent,
                        cursor: 'pointer',
                      }}
                    >
                      Clear ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── FILTER + GRID ── */}
        <section style={{ marginBottom: 72 }}>
          <div
            style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: '14px 20px',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              transition: 'background 0.3s ease',
            }}
            className="chips-wrap"
          >
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: C.textMuted,
                whiteSpace: 'nowrap',
              }}
            >
              Type:
            </span>
            {PARTNER_TYPES.map((t) => (
              <button
                key={t}
                className={`chip ${activeType === t ? 'on' : ''}`}
                onClick={() => setActiveType(t)}
              >
                {t}
              </button>
            ))}
            <div
              style={{
                width: 1,
                height: 20,
                background: C.border,
                margin: '0 2px',
              }}
            />
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: C.textMuted,
                whiteSpace: 'nowrap',
              }}
            >
              Region:
            </span>
            {REGIONS.map((r) => (
              <button
                key={r}
                className={`chip sm ${activeRegion === r ? 'on' : ''}`}
                onClick={() => setActiveRegion(r)}
              >
                {r === 'All Regions' ? 'All' : r}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 11,
                color: C.textMuted,
              }}
            >
              <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
              partners
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>🤝</p>
              <p
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.text,
                  textTransform: 'uppercase',
                }}
              >
                No partners found
              </p>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  marginTop: 6,
                }}
              >
                Try adjusting the filters above.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 18,
              }}
              className="pg-grid"
            >
              {filtered.map((partner, i) => {
                const ts = getTypeStyle(partner.type, C)
                return (
                  <div
                    key={partner.id}
                    className="cin"
                    style={{ animationDelay: `${i * 40}ms`, height: '100%' }}
                  >
                    <div
                      className="partner-card"
                      onClick={() => setOpenPartner(partner)}
                    >
                      <div
                        style={{
                          background: partner.color,
                          height: 88,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 24px',
                          gap: 14,
                          position: 'relative',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <div
                          aria-hidden
                          style={{
                            position: 'absolute',
                            right: -8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontWeight: 900,
                            fontSize: 110,
                            color: 'rgba(255,255,255,0.06)',
                            lineHeight: 1,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          }}
                        >
                          {partner.initial}
                        </div>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: 'rgba(255,255,255,0.16)',
                            border: '1px solid rgba(255,255,255,0.22)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontWeight: 900,
                            fontSize: 14,
                            color: '#fff',
                            letterSpacing: '0.04em',
                            flexShrink: 0,
                          }}
                        >
                          {partner.initial}
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Barlow Condensed',sans-serif",
                              fontWeight: 900,
                              fontSize: 17,
                              color: '#fff',
                              textTransform: 'uppercase',
                              lineHeight: 1,
                              letterSpacing: '0.02em',
                            }}
                          >
                            {partner.name}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: 10,
                              color: 'rgba(255,255,255,0.55)',
                              marginTop: 2,
                            }}
                          >
                            {partner.flag} {partner.country}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '18px 22px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                          flexGrow: 1,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              ...ts,
                              fontSize: 8,
                              fontWeight: 700,
                              fontFamily: "'Barlow',sans-serif",
                              letterSpacing: '0.25em',
                              textTransform: 'uppercase',
                              padding: '3px 9px',
                              borderRadius: 99,
                            }}
                          >
                            {partner.type}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: 9,
                              color: C.textMuted,
                            }}
                          >
                            Since {partner.since}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 12,
                            color: C.textMid,
                            lineHeight: 1.72,
                            fontWeight: 300,
                            flexGrow: 1,
                          }}
                        >
                          {partner.description.slice(0, 90)}…
                        </p>
                        <div
                          style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}
                        >
                          {partner.products.map((prod) => (
                            <span
                              key={prod}
                              style={{
                                background: C.accentLight,
                                color: C.accent,
                                border: `1px solid #F0CC9A`,
                                fontSize: 8,
                                fontWeight: 700,
                                fontFamily: "'Barlow',sans-serif",
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                padding: '2px 8px',
                                borderRadius: 99,
                              }}
                            >
                              {prod}
                            </span>
                          ))}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 10,
                            borderTop: `1px solid ${C.border}`,
                            marginTop: 'auto',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: 9,
                              letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                              color: C.textMuted,
                            }}
                          >
                            {partner.region}
                          </span>
                          <span className="pc-arrow">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* ── PARTNER TYPES ── */}
        <Reveal>
          <section style={{ marginBottom: 72 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.text,
                  textTransform: 'uppercase',
                }}
              >
                Partnership Types
              </h2>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 14,
              }}
            >
              {[
                {
                  type: 'Retail',
                  icon: '🛒',
                  title: 'Retail Partners',
                  body: 'Supermarkets, grocery chains, and specialty food stores that stock Asort products on their shelves and carry our branded range.',
                },
                {
                  type: 'Distributor',
                  icon: '🚛',
                  title: 'Distributors',
                  body: "Regional wholesale distributors managing Asort's logistics, warehousing, and supply chain across multiple markets and retail touchpoints.",
                },
                {
                  type: 'Hospitality',
                  icon: '🏨',
                  title: 'Hospitality',
                  body: 'Hotels, restaurant groups, and catering operations that use Asort products as core kitchen ingredients — from hotel chains to Michelin-starred kitchens.',
                },
                {
                  type: 'Industrial',
                  icon: '🏭',
                  title: 'Industrial',
                  body: 'Food manufacturers and processing companies that use Asort bulk grains and legumes as raw ingredients in their product lines.',
                },
              ].map((item, i) => {
                const ts = getTypeStyle(item.type, C)
                return (
                  <Reveal key={item.type} delay={i * 70}>
                    <div
                      style={{
                        background: C.bgCard,
                        border: `1px solid ${C.border}`,
                        borderRadius: 18,
                        padding: '24px 22px',
                        height: '100%',
                        transition: 'background 0.3s ease',
                      }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 14 }}>
                        {item.icon}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          color: C.text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: 8,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 12,
                          color: C.textMid,
                          lineHeight: 1.75,
                          fontWeight: 300,
                        }}
                      >
                        {item.body}
                      </p>
                      <div style={{ marginTop: 14 }}>
                        <span
                          style={{
                            ...ts,
                            fontSize: 8,
                            fontWeight: 700,
                            fontFamily: "'Barlow',sans-serif",
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            padding: '3px 9px',
                            borderRadius: 99,
                          }}
                        >
                          {PARTNERS.filter((p) => p.type === item.type).length}{' '}
                          partners
                        </span>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        </Reveal>

        {/* ── BECOME A PARTNER ── */}
        <Reveal>
          <section>
            <div
              style={{
                background: C.navBg,
                borderRadius: 24,
                overflow: 'hidden',
              }}
            >
              <div
                className="become-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 0,
                }}
              >
                <div
                  style={{
                    padding: '52px 48px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '-10%',
                      width: 400,
                      height: 400,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(196,120,48,0.10) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.45em',
                        textTransform: 'uppercase',
                        color: C.accent,
                        marginBottom: 16,
                      }}
                    >
                      Join Our Network
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(2.2rem,4vw,3.5rem)',
                        color: '#fff',
                        textTransform: 'uppercase',
                        lineHeight: 0.95,
                        marginBottom: 20,
                      }}
                    >
                      Become an
                      <br />
                      <span style={{ color: C.accent }}>Asort Partner</span>
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: 'rgba(245,236,216,0.42)',
                        lineHeight: 1.85,
                        marginBottom: 32,
                      }}
                    >
                      Whether you're a regional distributor, a retail chain, a
                      hotel group, or a food manufacturer — we'd love to explore
                      how we can work together.
                    </p>
                    {[
                      'Direct access to premium-grade product range',
                      'Flexible bulk and retail pack size options',
                      'Dedicated account manager from day one',
                      'Co-marketing and shelf display support',
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: C.accent,
                            marginTop: 5,
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 12,
                            color: 'rgba(245,236,216,0.50)',
                            lineHeight: 1.6,
                            fontWeight: 300,
                          }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    padding: '52px 48px',
                    background: 'rgba(255,255,255,0.025)',
                    borderLeft: `1px solid ${C.darkBorder}`,
                  }}
                >
                  {formSent ? (
                    <div
                      className="tick-in"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        gap: 16,
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: 'rgba(46,122,62,0.15)',
                          border: '1px solid rgba(46,122,62,0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 28,
                        }}
                      >
                        ✓
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontWeight: 900,
                          fontSize: 28,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}
                      >
                        Request Received
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 13,
                          color: 'rgba(245,236,216,0.40)',
                          lineHeight: 1.75,
                          fontWeight: 300,
                          maxWidth: 280,
                        }}
                      >
                        Our partnerships team will be in touch within 2 business
                        days to discuss next steps.
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontWeight: 900,
                          fontSize: 22,
                          color: '#fff',
                          textTransform: 'uppercase',
                          marginBottom: 4,
                        }}
                      >
                        Partnership Enquiry
                      </h3>
                      <div
                        className="form-row"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 12,
                        }}
                      >
                        <div>
                          <label
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: 9,
                              fontWeight: 600,
                              letterSpacing: '0.3em',
                              textTransform: 'uppercase',
                              color: 'rgba(245,236,216,0.35)',
                              display: 'block',
                              marginBottom: 6,
                            }}
                          >
                            Company *
                          </label>
                          <input
                            className="form-input"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: 9,
                              fontWeight: 600,
                              letterSpacing: '0.3em',
                              textTransform: 'uppercase',
                              color: 'rgba(245,236,216,0.35)',
                              display: 'block',
                              marginBottom: 6,
                            }}
                          >
                            Contact Name
                          </label>
                          <input
                            className="form-input"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: 'rgba(245,236,216,0.35)',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          Email Address *
                        </label>
                        <input
                          className="form-input"
                          type="email"
                          placeholder="company@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: 'rgba(245,236,216,0.35)',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          Partnership Type
                        </label>
                        <select
                          className="form-select"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option value="">Select type…</option>
                          <option>Retail</option>
                          <option>Distributor</option>
                          <option>Hospitality</option>
                          <option>Industrial</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: 'rgba(245,236,216,0.35)',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          Message
                        </label>
                        <textarea
                          className="form-input"
                          placeholder="Tell us about your business and what you're looking for…"
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          style={{ resize: 'vertical' }}
                        />
                      </div>
                      <button
                        onClick={handleSubmit}
                        style={{
                          padding: '14px 0',
                          borderRadius: 12,
                          background: C.accent,
                          border: 'none',
                          color: '#fff',
                          fontFamily: "'Barlow',sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'opacity .15s',
                          boxShadow: '0 8px 28px rgba(196,120,48,0.28)',
                          marginTop: 4,
                        }}
                      >
                        Submit Partnership Enquiry →
                      </button>
                      <p
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 9,
                          color: 'rgba(245,236,216,0.22)',
                          textAlign: 'center',
                          letterSpacing: '0.12em',
                        }}
                      >
                        We respond to all enquiries within 2 business days.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
      {openPartner && (
        <PartnerModal
          partner={openPartner}
          onClose={() => setOpenPartner(null)}
          C={C}
        />
      )}
    </div>
  )
}
