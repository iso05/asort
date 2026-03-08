'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '../../../components/ThemeContext'

// ═══════════════════════════════════════════
// TOKENS
// ═══════════════════════════════════════════
const LIGHT_C = {
  bg: '#FFFFFF',
  bgDeep: '#F8FBFF',
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
  tagBg: '#E8F1FF',
  tagText: '#2c5aa0',
  tagBorder: '#B5D0F1',
  green: '#3a6f3a',
  greenBg: '#E8F5EC',
  greenBorder: '#A8D4B4',
  navBg: '#FFFFFF',
  navBorder: 'rgba(100,150,200,0.10)',
  blue: '#2563EB',
  blueBg: '#E8F1FF',
  blueBorder: '#B5D0F1',
}
const DARK_C = {
  bg: '#0F1729',
  bgDeep: '#0A0F1A',
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
  tagBg: 'rgba(100,200,255,0.12)',
  tagText: '#85D8FF',
  tagBorder: 'rgba(100,200,255,0.30)',
  green: '#3A9A50',
  greenBg: 'rgba(46,122,62,0.15)',
  greenBorder: 'rgba(58,154,80,0.35)',
  navBg: '#0F1729',
  navBorder: 'rgba(100,200,255,0.08)',
  blue: '#64C8FF',
  blueBg: 'rgba(100,200,255,0.12)',
  blueBorder: 'rgba(100,200,255,0.30)',
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'News', href: '/news' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
]

// ═══════════════════════════════════════════
// NEWS DATA
// ═══════════════════════════════════════════
type NewsItem = {
  id: number
  category: 'New Product' | 'Company' | 'Expansion' | 'Award' | 'Partnership'
  date: string
  title: string
  summary: string
  body: string[]
  image: string // emoji-based illustration color
  imageEmoji: string
  isLatest?: boolean
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: 'New Product',
    date: 'March 1, 2025',
    title: 'Introducing Asort Chickpeas — Our Newest Premium Legume',
    summary:
      "After 18 months of sourcing and quality testing across 12 farms, we're proud to launch Whole Dried Chickpeas in 1 kg, 5 kg, and 25 kg formats. Available now.",
    body: [
      'Asort is proud to announce the official launch of Whole Dried Chickpeas — the fifth product in our premium food range and the second legume to carry the Asort label.',
      'Sourced exclusively from certified organic farms in the Fergana Valley of Uzbekistan, these chickpeas are hand-sorted for size uniformity, delivering an exceptional cooking yield and consistent texture whether used in hummus, curries, or dry-roasted snacks.',
      'The launch follows 18 months of research and development, during which our quality team tested over 40 batches from 12 different farms before selecting the current supply partner.',
      'Chickpeas are available in 1 kg, 5 kg, and 25 kg formats and are shipping to all distribution partners immediately. Visit our Products page to request a quote.',
    ],
    image: 'linear-gradient(135deg,#78350f,#d97706)',
    imageEmoji: '🟡',
    isLatest: true,
  },
  {
    id: 2,
    category: 'New Product',
    date: 'February 18, 2025',
    title: 'Cold-Pressed Sunflower Oil Now Available in 1L and 5L',
    summary:
      'Our first oil product — first cold-press sunflower oil from Ukrainian farms — is now part of the Asort range. High in Vitamin E, zero additives, shelf-stable for 18 months.',
    body: [
      'Asort has expanded into oils with the launch of Cold-Pressed Sunflower Oil — our first non-grain product and the result of two years of supplier evaluation.',
      'The oil is produced using a single cold-press extraction method that retains natural Vitamin E (41mg per 100ml) and antioxidants, without any refining, bleaching, or deodorising.',
      'It carries an acidity level below 0.5% — significantly better than industry average — and a clean, neutral flavour that works across dressings, dips, and low-heat cooking.',
      'Available in 1L and 5L formats. Suitable for retail, food service, and hospitality distribution. Contact our sales team to add it to your order.',
    ],
    image: 'linear-gradient(135deg,#854d0e,#ca8a04)',
    imageEmoji: '🫙',
    isLatest: true,
  },
  {
    id: 3,
    category: 'Partnership',
    date: 'February 12, 2025',
    title: 'Asort Signs Distribution Deal with FreshMart Group — 320+ Stores',
    summary:
      "The full Asort product range will roll out across FreshMart Group's 320+ retail locations starting Q1 2025, our biggest retail partnership to date.",
    body: [
      "Asort has signed a landmark distribution agreement with FreshMart Group, one of the region's largest supermarket chains with over 320 locations across seven countries.",
      'The agreement covers the full Asort product range and includes dedicated shelf space, branded display units, and a joint promotional calendar for all product launches through 2025.',
      'Products began appearing on FreshMart shelves in February 2025, with a phased rollout completing across all store formats by the end of Q1.',
      "This is Asort's most significant retail partnership to date and is expected to triple the company's consumer-facing distribution reach within 18 months.",
    ],
    image: 'linear-gradient(135deg,#1e3a5f,#2d6fbf)',
    imageEmoji: '🤝',
    isLatest: false,
  },
  {
    id: 4,
    category: 'Award',
    date: 'January 28, 2025',
    title: 'Crystal White Sugar Awarded Gold Standard Certification',
    summary:
      'Our flagship sugar line has received the international Gold Standard mark for superior purity (99.9%) and verified sustainable sourcing across our full supply chain.',
    body: [
      "Asort's Crystal White Sugar has been awarded the Gold Standard Certification by the International Food Quality Institute — one of the most rigorous independent assessments in the global food industry.",
      'The certification process involved 14 months of supply chain auditing, laboratory analysis across multiple production batches, and on-site farm inspections in Uzbekistan.',
      'Asort is now one of fewer than 30 food companies in Central Asia to hold this designation. It recognises our 99.9% sucrose purity rating, twice-refined production process, and fair-wage farm partnerships.',
      'This certification is displayed on all Crystal White Sugar packaging immediately.',
    ],
    image: 'linear-gradient(135deg,#1e4d8c,#2d6fbf)',
    imageEmoji: '🏆',
    isLatest: false,
  },
  {
    id: 5,
    category: 'Expansion',
    date: 'January 14, 2025',
    title: 'Asort Rice Selected by 18 Hotel Groups Across the UAE and Qatar',
    summary:
      'Our Long Grain Rice has been chosen as the house rice for 18 luxury hotel groups in the Gulf region, covering 4,200+ guest rooms and multiple Michelin-starred restaurants.',
    body: [
      'Asort Long Grain Rice has been selected as the house rice for 18 luxury hotel groups across the UAE and Qatar, following a competitive tender process that evaluated more than 30 suppliers.',
      'The hotels collectively represent over 4,200 guest rooms. Selection criteria included consistency of grain length, starch content, cooking performance, and packaging integrity during transit.',
      "The Gulf region is now Asort's third-largest export market by volume. The company plans to expand its hospitality-focused sales programme to Saudi Arabia and Kuwait in 2025.",
      'This win confirms the hospitality sector as a key growth channel alongside our retail and wholesale operations.',
    ],
    image: 'linear-gradient(135deg,#14532d,#16a34a)',
    imageEmoji: '🌾',
    isLatest: false,
  },
  {
    id: 6,
    category: 'Company',
    date: 'December 18, 2024',
    title: 'Asort Now Ships to 40 Countries Across Four Continents',
    summary:
      "We've reached a major milestone: Asort products are now distributed to 40 countries worldwide, completing our footprint across Central Asia, Europe, the Middle East, and South Asia.",
    body: [
      'Asort has reached 40 countries of active distribution — a milestone that represents a decade of consistent, quality-first growth.',
      'The milestone was completed in November 2024 when Asort began regular shipments to a retail partner in Portugal, completing a continental footprint spanning Central Asia, Eastern Europe, the Middle East, South Asia, and Western Europe.',
      'The company plans to reach 60 countries by 2027, with West African and Southeast Asian markets as primary targets for the next phase of international expansion.',
      'Thank you to every partner, distributor, and customer who has been part of this journey.',
    ],
    image: 'linear-gradient(135deg,#1a1a1a,#404040)',
    imageEmoji: '🌍',
    isLatest: false,
  },
  {
    id: 7,
    category: 'Company',
    date: 'November 20, 2024',
    title: 'New Packaging Line: 80% Recyclable Across All Products',
    summary:
      "Asort's new eco-packaging programme launches across all product lines, cutting plastic use by 60% using a plant-based moisture barrier while maintaining full shelf life standards.",
    body: [
      'Asort is rolling out a new packaging programme that makes 80% of all product packaging recyclable — covering the full range from sugar to lentils.',
      'The new materials use a multi-layer kraft paper laminate with a plant-based moisture barrier, replacing conventional LDPE inner layers and cutting total plastic content by 60%.',
      'Full shelf life standards are maintained across all SKUs. The rollout completes across all products and markets by end of Q1 2025.',
      'Eco-packaging is now a mandatory requirement for all new products launching under the Asort brand.',
    ],
    image: 'linear-gradient(135deg,#14532d,#15803d)',
    imageEmoji: '♻️',
    isLatest: false,
  },
  {
    id: 8,
    category: 'New Product',
    date: 'October 10, 2024',
    title: 'Pearl Barley Joins the Asort Grain Range',
    summary:
      'Polished whole pearl barley — high in beta-glucan fibre and heart-healthy nutrients — is now available in 1 kg and 5 kg formats from certified Kazakh farms.',
    body: [
      'Asort has added Polished Pearl Barley to its grain range, sourced from certified farms in Kazakhstan and available in 1 kg and 5 kg formats.',
      'Pearl barley contains 4g of beta-glucan fibre per 100g — a clinically recognised amount for supporting heart health and maintaining stable blood sugar levels.',
      'The grain is polished to remove the outer hull while retaining maximum nutritional value, delivering a mild, nutty flavour and satisfying chew in soups, stews, and side dishes.',
      'Contact our sales team to add pearl barley to your wholesale or retail order.',
    ],
    image: 'linear-gradient(135deg,#4a1d96,#7c3aed)',
    imageEmoji: '🟣',
    isLatest: false,
  },
]

const CATEGORIES = [
  'All',
  'New Product',
  'Company',
  'Expansion',
  'Award',
  'Partnership',
]

function getCategoryStyle(
  C: typeof LIGHT_C
): Record<string, { bg: string; text: string; border: string }> {
  return {
    'New Product': { bg: C.tagBg, text: C.tagText, border: C.tagBorder },
    Company: { bg: C.surface, text: C.textMid, border: C.border },
    Expansion: { bg: C.greenBg, text: C.green, border: C.greenBorder },
    Award: { bg: '#FFFBEB', text: '#92400E', border: '#FCD34D' },
    Partnership: { bg: C.blueBg, text: C.blue, border: C.blueBorder },
  }
}

// ═══════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════
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
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════════════════════
// NEWS MODAL
// ═══════════════════════════════════════════
function NewsModal({
  item,
  onClose,
  C,
}: {
  item: NewsItem
  onClose: () => void
  C: typeof LIGHT_C
}) {
  const cs = getCategoryStyle(C)[item.category]
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
        background: 'rgba(10,7,3,0.55)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fadeOv .2s ease forwards',
      }}
    >
      <style>{`@keyframes fadeOv{from{opacity:0}to{opacity:1}} @keyframes slideM{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bgCard,
          borderRadius: 24,
          maxWidth: 660,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.22)',
          border: `1px solid ${C.border}`,
          animation: 'slideM .28s cubic-bezier(.22,.68,0,1.1) forwards',
        }}
      >
        {/* Image header */}
        <div
          style={{
            background: item.image,
            borderRadius: '24px 24px 0 0',
            padding: '40px 40px 36px',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            minHeight: 180,
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  ...cs,
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'Barlow',sans-serif",
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: 99,
                }}
              >
                {item.category}
              </span>
              <span
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {item.date}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.6rem,4vw,2.4rem)',
                color: '#fff',
                textTransform: 'uppercase',
                lineHeight: 1.0,
                maxWidth: 440,
              }}
            >
              {item.title}
            </h2>
          </div>
          <div
            style={{
              fontSize: 48,
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
              flexShrink: 0,
            }}
          >
            {item.imageEmoji}
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '32px 40px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Summary highlighted */}
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 14,
              color: C.text,
              fontWeight: 500,
              lineHeight: 1.75,
              borderLeft: `3px solid ${C.accent}`,
              paddingLeft: 16,
            }}
          >
            {item.summary}
          </p>

          <div style={{ height: 1, background: C.border }} />

          {/* Full body */}
          {item.body.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13.5,
                color: C.textMid,
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              {para}
            </p>
          ))}

          <div style={{ height: 1, background: C.border }} />

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/contact"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '13px 0',
                borderRadius: 12,
                background: C.accent,
                color: '#fff',
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(196,120,48,0.25)',
              }}
            >
              Contact Us →
            </Link>
            <Link
              href="/products"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '13px 0',
                borderRadius: 12,
                background: C.surface,
                color: C.textMid,
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: `1.5px solid ${C.border}`,
              }}
            >
              View Products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════
export default function NewsPage() {
  const { theme } = useTheme()
  const C = theme === 'dark' ? DARK_C : LIGHT_C

  const [activeCategory, setActiveCategory] = useState('All')
  const [openItem, setOpenItem] = useState<NewsItem | null>(null)

  const latest = NEWS.filter((n) => n.isLatest).slice(0, 2)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return NEWS
    return NEWS.filter((n) => n.category === activeCategory)
  }, [activeCategory])

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:99px;}

        .cat-chip {
          font-family:'Barlow',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:.18em; text-transform:uppercase;
          padding:7px 16px; border-radius:99px; cursor:pointer;
          border:1.5px solid ${C.border};
          background:${C.bgCard}; color:${C.textMuted};
          transition:all .18s ease; white-space:nowrap;
        }
        .cat-chip:hover { border-color:${C.accent}; color:${C.accent}; background:${C.accentLight}; }
        .cat-chip.on    { background:${C.accent}; border-color:${C.accent}; color:#fff; }

        .news-card {
          background:${C.bgCard};
          border:1.5px solid ${C.border};
          border-radius:20px;
          overflow:hidden;
          cursor:pointer;
          transition:all .22s ease;
          display:flex; flex-direction:column;
          height:100%;
        }
        .news-card:hover {
          border-color:${C.borderHov};
          transform:translateY(-5px);
          box-shadow:0 20px 50px rgba(196,120,48,0.11), 0 4px 16px rgba(0,0,0,0.06);
        }
        .news-card:hover .card-arrow { transform:translateX(4px); color:${C.accent}; }

        .card-arrow { transition:all .2s ease; color:${C.textMuted}; font-size:16px; }

        .latest-card {
          border-radius:20px; overflow:hidden; cursor:pointer;
          border:1.5px solid ${C.border};
          transition:all .22s ease; display:flex; flex-direction:column;
          background:${C.bgCard};
        }
        .latest-card:hover { border-color:${C.borderHov}; transform:translateY(-4px); box-shadow:0 16px 44px rgba(196,120,48,0.12); }

        @keyframes cin { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .cin { animation:cin .32s ease both; }

        @media(max-width:768px){
          .hero-grid { grid-template-columns:1fr !important; }
          .news-grid  { grid-template-columns:1fr !important; }
          .chips-row  { flex-wrap:wrap !important; }
        }
      `}</style>

      {/* ══════════════════════════════════
          HEADER
      ══════════════════════════════════ */}
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
          {/* Breadcrumb */}
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
              News
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
                Latest Updates
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
                News &<br />
                <span style={{ color: C.accent }}>Updates</span>
              </h1>
            </div>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: 'rgba(255,220,150,0.38)',
                maxWidth: 340,
                lineHeight: 1.85,
              }}
            >
              Product launches, company milestones, new partnerships, and
              everything happening at Asort.
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 36,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,220,140,0.07)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { v: `${NEWS.length}`, l: 'Updates' },
              {
                v: `${NEWS.filter((n) => n.category === 'New Product').length}`,
                l: 'Product launches',
              },
              { v: '2025', l: 'Latest update' },
            ].map(({ v, l }) => (
              <div key={l}>
                <p
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: 26,
                    color: '#fff',
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
                    color: 'rgba(255,220,140,0.25)',
                    marginTop: 3,
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
        {/* ══════════════════════════════════
            LATEST — TOP 2 CARDS
        ══════════════════════════════════ */}
        <section style={{ marginBottom: 64 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: C.accent,
              }}
            />
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: C.accent,
              }}
            >
              Just Announced
            </span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div
            className="hero-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          >
            {latest.map((item, i) => {
              const cs = getCategoryStyle(C)[item.category]
              return (
                <div
                  key={item.id}
                  className="latest-card cin"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setOpenItem(item)}
                >
                  {/* Colour top banner */}
                  <div
                    style={{
                      background: item.image,
                      height: 140,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '20px 28px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* faint watermark */}
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        right: -10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontWeight: 900,
                        fontSize: 140,
                        color: 'rgba(255,255,255,0.04)',
                        lineHeight: 1,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    >
                      {item.imageEmoji}
                    </div>
                    <span
                      style={{
                        ...cs,
                        fontSize: 8,
                        fontWeight: 700,
                        fontFamily: "'Barlow',sans-serif",
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        padding: '4px 11px',
                        borderRadius: 99,
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: 44 }}>{item.imageEmoji}</span>
                  </div>

                  {/* Text */}
                  <div
                    style={{
                      padding: '24px 28px 26px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        color: C.textMuted,
                      }}
                    >
                      {item.date}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontWeight: 900,
                        fontSize: 21,
                        color: C.text,
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 12.5,
                        color: C.textMid,
                        lineHeight: 1.75,
                        fontWeight: 300,
                        flexGrow: 1,
                      }}
                    >
                      {item.summary}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 12,
                        borderTop: `1px solid ${C.border}`,
                        marginTop: 'auto',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: '0.28em',
                          textTransform: 'uppercase',
                          color: C.accent,
                        }}
                      >
                        Read More
                      </span>
                      <span className="card-arrow">→</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════
            FILTER + ALL NEWS
        ══════════════════════════════════ */}
        <section>
          {/* Filter bar */}
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
            }}
            className="chips-row"
          >
            <span
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: C.textMuted,
                marginRight: 4,
                whiteSpace: 'nowrap',
              }}
            >
              Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-chip ${activeCategory === cat ? 'on' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
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
              updates
            </span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>📭</p>
              <p
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.text,
                  textTransform: 'uppercase',
                }}
              >
                Nothing here yet
              </p>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  marginTop: 6,
                }}
              >
                More news coming soon.
              </p>
            </div>
          ) : (
            <div
              className="news-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: 18,
              }}
            >
              {filtered.map((item, i) => {
                const cs = getCategoryStyle(C)[item.category]
                return (
                  <div
                    key={item.id}
                    className="cin"
                    style={{ animationDelay: `${i * 35}ms`, height: '100%' }}
                  >
                    <div
                      className="news-card"
                      onClick={() => setOpenItem(item)}
                    >
                      {/* Colour strip top */}
                      <div
                        style={{
                          background: item.image,
                          height: 80,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 22px',
                          flexShrink: 0,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          aria-hidden
                          style={{
                            position: 'absolute',
                            right: -8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: 90,
                            opacity: 0.12,
                            lineHeight: 1,
                            pointerEvents: 'none',
                          }}
                        >
                          {item.imageEmoji}
                        </div>
                        <span
                          style={{
                            ...cs,
                            fontSize: 8,
                            fontWeight: 700,
                            fontFamily: "'Barlow',sans-serif",
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            padding: '3px 10px',
                            borderRadius: 99,
                          }}
                        >
                          {item.category}
                        </span>
                        <span style={{ fontSize: 28 }}>{item.imageEmoji}</span>
                      </div>

                      {/* Content */}
                      <div
                        style={{
                          padding: '20px 22px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                          flexGrow: 1,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 10,
                            color: C.textMuted,
                          }}
                        >
                          {item.date}
                        </p>
                        <h3
                          style={{
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontWeight: 900,
                            fontSize: 19,
                            color: C.text,
                            textTransform: 'uppercase',
                            lineHeight: 1.05,
                          }}
                        >
                          {item.title}
                        </h3>
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
                          {item.summary.slice(0, 100)}…
                        </p>
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
                              fontWeight: 600,
                              letterSpacing: '0.25em',
                              textTransform: 'uppercase',
                              color: C.textMuted,
                            }}
                          >
                            Read more
                          </span>
                          <span className="card-arrow">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════
            BOTTOM CTA BAND
        ══════════════════════════════════ */}
        <Reveal delay={60}>
          <div
            style={{
              marginTop: 72,
              background: C.navBg,
              borderRadius: 22,
              padding: '40px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 8,
                }}
              >
                Stay Updated
              </p>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 30,
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                Interested in our products?
                <br />
                <span style={{ color: C.accent }}>Get in touch.</span>
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 28px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontFamily: "'Barlow',sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                View Products →
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 28px',
                  borderRadius: 12,
                  background: C.accent,
                  color: '#fff',
                  fontFamily: "'Barlow',sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(196,120,48,0.28)',
                }}
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {openItem && (
        <NewsModal item={openItem} onClose={() => setOpenItem(null)} C={C} />
      )}
    </div>
  )
}
