'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '../../../components/ThemeContext'

// ═══════════════════════════════════════════════════
// THEME TOKENS
// ═══════════════════════════════════════════════════
const LIGHT_C = {
  bg: '#FFFFFF',
  bgDeep: '#F8FBFF',
  bgCard: '#F5F8FF',
  bgCardHov: '#F0F4FA',
  surface: '#E8ECFF',
  border: '#D8E0ED',
  borderFocus: '#2c5aa0',
  accent: '#2c5aa0',
  accentDeep: '#1a3a70',
  accentLight: '#E8F1FF',
  text: '#1a1f3a',
  textMid: '#4a5f8f',
  textMuted: '#7a8aaf',
  tagBg: '#E8F1FF',
  tagText: '#2c5aa0',
  tagBorder: '#B5D0F1',
  green: '#3a6f3a',
  greenBg: '#E8F5EC',
  greenBorder: '#A8D4B4',
  navBg: '#FFFFFF',
  navBorder: 'rgba(100,150,200,0.10)',
}

const DARK_C = {
  bg: '#0F1729',
  bgDeep: '#0A0F1A',
  bgCard: '#1a2a4e',
  bgCardHov: '#1f3458',
  surface: '#232d45',
  border: '#3a4d70',
  borderFocus: '#64C8FF',
  accent: '#64C8FF',
  accentDeep: '#3a9acc',
  accentLight: 'rgba(100,200,255,0.12)',
  text: '#E8F1FF',
  textMid: '#9abadb',
  textMuted: '#6a8abd',
  tagBg: 'rgba(100,200,255,0.12)',
  tagText: '#85D8FF',
  tagBorder: 'rgba(100,200,255,0.30)',
  green: '#3A9A50',
  greenBg: 'rgba(46,122,62,0.15)',
  greenBorder: 'rgba(58,154,80,0.35)',
  navBg: '#0F1729',
  navBorder: 'rgba(100,200,255,0.08)',
}

// ═══════════════════════════════════════════════════
// PRODUCT DATA
// ═══════════════════════════════════════════════════
type Product = {
  id: number
  name: string
  subtitle: string
  category: string
  tags: string[]
  weights: string[]
  grade: string
  origin: string
  description: string
  facts: { label: string; value: string }[]
  packageBg: string
  pkgAccent: string
  pkgLight: string
  emoji: string
  inStock: boolean
  isNew: boolean
  isBestseller: boolean
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Sugar',
    subtitle: 'Crystal White',
    category: 'Sweeteners',
    tags: ['Refined', 'Zero additives', 'ISO certified'],
    weights: ['1 kg', '5 kg', '25 kg'],
    grade: 'Premium Grade A',
    origin: 'Uzbekistan',
    description:
      'Twice-refined crystal white sugar from top-tier plantations. Dissolves flawlessly in any application from home baking to industrial confectionery.',
    facts: [
      { label: 'Purity', value: '99.9%' },
      { label: 'Moisture', value: '< 0.04%' },
      { label: 'Shelf life', value: '36 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#1e4d8c 0%,#2d6fbf 55%,#0d2644 100%)',
    pkgAccent: '#2D6FBF',
    pkgLight: '#93C5FD',
    emoji: '🟦',
    inStock: true,
    isNew: false,
    isBestseller: true,
  },
  {
    id: 2,
    name: 'Rice',
    subtitle: 'Long Grain',
    category: 'Grains',
    tags: ['Aromatic', 'Low glycemic', 'Hand-sorted'],
    weights: ['2 kg', '5 kg', '10 kg', '25 kg'],
    grade: 'Premium Grade A',
    origin: 'Kazakhstan',
    description:
      'Slender long-grain rice harvested at peak season from mineral-rich paddies. Cooks fluffy and separate every time — perfect for pilafs, salads and daily meals.',
    facts: [
      { label: 'Broken grains', value: '< 1%' },
      { label: 'Moisture', value: '< 14%' },
      { label: 'Shelf life', value: '24 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#14532d 0%,#16a34a 55%,#071c0e 100%)',
    pkgAccent: '#16A34A',
    pkgLight: '#86EFAC',
    emoji: '🟩',
    inStock: true,
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Buckwheat',
    subtitle: 'Roasted Whole',
    category: 'Grains',
    tags: ['Gluten-free', 'High protein', 'Stone-roasted'],
    weights: ['0.9 kg', '4 kg', '20 kg'],
    grade: 'Premium Grade A',
    origin: 'Russia',
    description:
      'Stone-roasted whole buckwheat with deep nutty notes and a complete amino-acid profile. A powerhouse grain for health-conscious homes and professional kitchens.',
    facts: [
      { label: 'Protein', value: '13g/100g' },
      { label: 'Moisture', value: '< 13%' },
      { label: 'Shelf life', value: '18 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#262626 0%,#525252 55%,#0e0e0e 100%)',
    pkgAccent: '#737373',
    pkgLight: '#E5E5E5',
    emoji: '⬛',
    inStock: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: 'Lentils',
    subtitle: 'Red Split',
    category: 'Legumes',
    tags: ['High protein', 'Quick-cooking', 'Rich in iron'],
    weights: ['1 kg', '5 kg', '25 kg'],
    grade: 'Premium Grade A',
    origin: 'Turkey',
    description:
      'Vivid red split lentils that cook in under 20 minutes. Loaded with plant protein and iron — a staple for soups, dahls and stews across every cuisine.',
    facts: [
      { label: 'Protein', value: '26g/100g' },
      { label: 'Iron', value: '7.5mg/100g' },
      { label: 'Shelf life', value: '24 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#9a3412 0%,#ea580c 55%,#2d0a03 100%)',
    pkgAccent: '#EA580C',
    pkgLight: '#FED7AA',
    emoji: '🟧',
    inStock: true,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 5,
    name: 'Chickpeas',
    subtitle: 'Whole Dried',
    category: 'Legumes',
    tags: ['High fibre', 'Versatile', 'Organic'],
    weights: ['1 kg', '5 kg', '25 kg'],
    grade: 'Premium Grade A',
    origin: 'Uzbekistan',
    description:
      'Creamy, buttery whole dried chickpeas with uniform size and exceptional cooking yield. Essential for hummus, curries, stews and roasted snacks.',
    facts: [
      { label: 'Protein', value: '19g/100g' },
      { label: 'Fibre', value: '17g/100g' },
      { label: 'Shelf life', value: '24 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#78350f 0%,#d97706 55%,#451a03 100%)',
    pkgAccent: '#D97706',
    pkgLight: '#FDE68A',
    emoji: '🟡',
    inStock: true,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 6,
    name: 'Pearl Barley',
    subtitle: 'Polished Whole',
    category: 'Grains',
    tags: ['Beta-glucan', 'Heart-healthy', 'Slow energy'],
    weights: ['1 kg', '5 kg'],
    grade: 'Premium Grade A',
    origin: 'Kazakhstan',
    description:
      'Polished pearl barley with a mild, nutty flavour and satisfying chew. High in beta-glucan fibre that supports heart health and sustained energy release.',
    facts: [
      { label: 'Beta-glucan', value: '4g/100g' },
      { label: 'Fibre', value: '15.6g/100g' },
      { label: 'Shelf life', value: '24 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#4a1d96 0%,#7c3aed 55%,#2e1065 100%)',
    pkgAccent: '#7C3AED',
    pkgLight: '#C4B5FD',
    emoji: '🟣',
    inStock: false,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 7,
    name: 'Green Mung',
    subtitle: 'Whole Beans',
    category: 'Legumes',
    tags: ['Sproutable', 'Detoxifying', 'Asian staple'],
    weights: ['0.5 kg', '1 kg', '5 kg'],
    grade: 'Premium Grade A',
    origin: 'Uzbekistan',
    description:
      'Vibrant green mung beans prized across Asian cuisines. Sprout them raw, cook whole, or split into dal — versatile, nutritious, deeply satisfying.',
    facts: [
      { label: 'Protein', value: '24g/100g' },
      { label: 'Folate', value: '625μg/100g' },
      { label: 'Shelf life', value: '24 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#14532d 0%,#15803d 55%,#052e16 100%)',
    pkgAccent: '#15803D',
    pkgLight: '#6EE7B7',
    emoji: '🟢',
    inStock: true,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 8,
    name: 'Sunflower Oil',
    subtitle: 'Cold Pressed',
    category: 'Oils',
    tags: ['Cold-pressed', 'Unrefined', 'High in Vit E'],
    weights: ['1 L', '5 L'],
    grade: 'Premium Grade A',
    origin: 'Ukraine',
    description:
      'First cold-press sunflower oil with a golden hue and clean taste. Retains natural Vitamin E and antioxidants — ideal for dressings, dips and light cooking.',
    facts: [
      { label: 'Vit E', value: '41mg/100ml' },
      { label: 'Acidity', value: '< 0.5%' },
      { label: 'Shelf life', value: '18 mo' },
    ],
    packageBg: 'linear-gradient(145deg,#854d0e 0%,#ca8a04 55%,#422006 100%)',
    pkgAccent: '#CA8A04',
    pkgLight: '#FEF08A',
    emoji: '🫙',
    inStock: true,
    isNew: true,
    isBestseller: false,
  },
]

const CATEGORIES = ['All', 'Grains', 'Legumes', 'Sweeteners', 'Oils']
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'name_asc', label: 'Name A–Z' },
  { value: 'name_desc', label: 'Name Z–A' },
]

// ═══════════════════════════════════════════════════
// PACKAGE VISUAL
// ═══════════════════════════════════════════════════
function PkgCard({
  p,
  size = 'md',
}: {
  p: Product
  size?: 'md' | 'lg' | 'xl'
}) {
  const dim = {
    md: { w: 80, h: 108, r: 14, fs: 22, label: 9 },
    lg: { w: 100, h: 136, r: 16, fs: 28, label: 10 },
    xl: { w: 130, h: 172, r: 20, fs: 36, label: 11 },
  }[size]
  return (
    <div
      style={{
        background: p.packageBg,
        borderRadius: dim.r,
        width: dim.w,
        height: dim.h,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 8px 10px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: `0 16px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: p.pkgLight,
          borderRadius: `${dim.r}px ${dim.r}px 0 0`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: dim.w * 1.1,
            color: 'rgba(255,255,255,0.05)',
            lineHeight: 1,
          }}
        >
          {p.name[0]}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 900,
          fontSize: dim.label,
          color: p.pkgLight,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          opacity: 0.7,
          zIndex: 1,
        }}
      >
        ASORT
      </p>
      <span style={{ fontSize: dim.fs, zIndex: 1 }}>{p.emoji}</span>
      <p
        style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 900,
          fontSize: dim.label + 1,
          color: p.pkgLight,
          textTransform: 'uppercase',
          zIndex: 1,
          opacity: 0.8,
          letterSpacing: '0.05em',
        }}
      >
        {p.name}
      </p>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: p.pkgAccent,
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PRODUCT CARD — GRID
// ═══════════════════════════════════════════════════
function ProductCardGrid({
  p,
  onSelect,
  C,
}: {
  p: Product
  onSelect: (p: Product) => void
  C: typeof LIGHT_C
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(p)}
      style={{
        background: C.bgCard,
        border: `1.5px solid ${hov ? C.accent : C.border}`,
        borderRadius: 22,
        padding: '24px 22px 20px',
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hov
          ? `0 20px 48px rgba(196,120,48,0.12), 0 4px 16px rgba(0,0,0,0.06)`
          : `0 2px 10px rgba(0,0,0,0.05)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'flex-end',
        }}
      >
        {p.isBestseller && (
          <span
            style={{
              background: C.accent,
              color: '#fff',
              fontSize: 8,
              fontWeight: 700,
              fontFamily: "'Barlow',sans-serif",
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: 99,
            }}
          >
            Bestseller
          </span>
        )}
        {p.isNew && (
          <span
            style={{
              background: C.green,
              color: '#fff',
              fontSize: 8,
              fontWeight: 700,
              fontFamily: "'Barlow',sans-serif",
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: 99,
            }}
          >
            New
          </span>
        )}
        {!p.inStock && (
          <span
            style={{
              background: C.surface,
              color: C.textMuted,
              fontSize: 8,
              fontWeight: 700,
              fontFamily: "'Barlow',sans-serif",
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: 99,
              border: `1px solid ${C.border}`,
            }}
          >
            Sold out
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 6,
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            transform: hov
              ? 'scale(1.05) rotate(-2deg)'
              : 'scale(1) rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <PkgCard p={p} size="lg" />
        </div>
      </div>

      <div>
        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: C.textMuted,
            marginBottom: 5,
          }}
        >
          {p.category}
        </p>
        <h3
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: 24,
            color: C.text,
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: 2,
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 11,
            color: C.textMuted,
          }}
        >
          {p.subtitle}
        </p>
      </div>

      <p
        style={{
          fontFamily: "'Barlow',sans-serif",
          fontSize: 12,
          color: C.textMid,
          lineHeight: 1.75,
          fontWeight: 300,
          flexGrow: 1,
        }}
      >
        {p.description.slice(0, 85)}…
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              background: C.tagBg,
              color: C.tagText,
              border: `1px solid ${C.tagBorder}`,
              fontSize: 8,
              fontWeight: 700,
              fontFamily: "'Barlow',sans-serif",
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: 99,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {p.weights.map((w) => (
          <span
            key={w}
            style={{
              background: C.surface,
              color: C.textMid,
              border: `1px solid ${C.border}`,
              fontSize: 10,
              fontFamily: "'Barlow',sans-serif",
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 8,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: hov ? C.accent : C.textMuted,
            transition: 'color 0.2s',
          }}
        >
          View details
        </span>
        <span
          style={{
            color: hov ? C.accent : C.textMuted,
            fontSize: 16,
            transition: 'all 0.2s',
            transform: hov ? 'translateX(3px)' : 'none',
          }}
        >
          →
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PRODUCT ROW — LIST
// ═══════════════════════════════════════════════════
function ProductCardList({
  p,
  onSelect,
  C,
}: {
  p: Product
  onSelect: (p: Product) => void
  C: typeof LIGHT_C
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(p)}
      style={{
        background: C.bgCard,
        border: `1.5px solid ${hov ? C.accent : C.border}`,
        borderRadius: 18,
        padding: '20px 24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: hov
          ? `0 8px 28px rgba(196,120,48,0.10)`
          : `0 1px 4px rgba(0,0,0,0.04)`,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
      }}
    >
      <div
        style={{
          transform: hov ? 'scale(1.04) rotate(-1deg)' : 'scale(1)',
          transition: 'transform 0.25s ease',
        }}
      >
        <PkgCard p={p} size="md" />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
            flexWrap: 'wrap',
          }}
        >
          <h3
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 900,
              fontSize: 22,
              color: C.text,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            {p.name}
          </h3>
          <span
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 11,
              color: C.textMuted,
            }}
          >
            {p.subtitle}
          </span>
          {p.isBestseller && (
            <span
              style={{
                background: C.accent,
                color: '#fff',
                fontSize: 8,
                fontWeight: 700,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: 99,
              }}
            >
              Bestseller
            </span>
          )}
          {p.isNew && (
            <span
              style={{
                background: C.green,
                color: '#fff',
                fontSize: 8,
                fontWeight: 700,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: 99,
              }}
            >
              New
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 12,
            color: C.textMid,
            lineHeight: 1.65,
            fontWeight: 300,
            marginBottom: 10,
          }}
        >
          {p.description.slice(0, 130)}…
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                background: C.tagBg,
                color: C.tagText,
                border: `1px solid ${C.tagBorder}`,
                fontSize: 8,
                fontWeight: 700,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: 99,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            justifyContent: 'flex-end',
          }}
        >
          {p.weights.map((w) => (
            <span
              key={w}
              style={{
                background: C.surface,
                color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 9,
                fontFamily: "'Barlow',sans-serif",
                padding: '3px 8px',
                borderRadius: 6,
              }}
            >
              {w}
            </span>
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: hov ? C.accent : C.textMuted,
            transition: 'color 0.2s',
          }}
        >
          {p.inStock ? 'Available' : 'Out of stock'}
        </span>
      </div>

      <span
        style={{
          color: hov ? C.accent : C.border,
          fontSize: 20,
          fontWeight: 300,
          flexShrink: 0,
          transition: 'all 0.2s',
          transform: hov ? 'translateX(3px)' : 'none',
        }}
      >
        →
      </span>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════════
function ProductModal({
  p,
  onClose,
  C,
}: {
  p: Product
  onClose: () => void
  C: typeof LIGHT_C
}) {
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
        background: 'rgba(18,10,4,0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fadeOv 0.2s ease forwards',
      }}
    >
      <style>{`
        @keyframes fadeOv    { from{opacity:0} to{opacity:1} }
        @keyframes slideMod  { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bgCard,
          borderRadius: 28,
          maxWidth: 660,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 48px 120px rgba(0,0,0,0.28)',
          border: `1px solid ${C.border}`,
          animation: 'slideMod 0.28s cubic-bezier(.22,.68,0,1.1) forwards',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: p.packageBg,
            borderRadius: '28px 28px 0 0',
            padding: '44px 40px 40px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 9,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 10,
              }}
            >
              {p.category}
            </p>
            <h2
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.8rem,7vw,4.5rem)',
                color: '#fff',
                textTransform: 'uppercase',
                lineHeight: 0.88,
                marginBottom: 8,
              }}
            >
              {p.name}
            </h2>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13,
                color: p.pkgLight,
                opacity: 0.75,
              }}
            >
              {p.subtitle} · {p.grade}
            </p>
          </div>
          <div
            style={{
              transform: 'rotate(4deg)',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            }}
          >
            <PkgCard p={p} size="xl" />
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.14)',
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
            gap: 26,
          }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.isBestseller && (
              <span
                style={{
                  background: C.accent,
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'Barlow',sans-serif",
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: 99,
                }}
              >
                Bestseller
              </span>
            )}
            {p.isNew && (
              <span
                style={{
                  background: C.green,
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'Barlow',sans-serif",
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: 99,
                }}
              >
                New
              </span>
            )}
            <span
              style={{
                background: p.inStock ? C.greenBg : C.surface,
                color: p.inStock ? C.green : C.textMuted,
                border: `1px solid ${p.inStock ? C.greenBorder : C.border}`,
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                borderRadius: 99,
              }}
            >
              {p.inStock ? '● In Stock' : 'Out of Stock'}
            </span>
            <span
              style={{
                background: C.tagBg,
                color: C.tagText,
                border: `1px solid ${C.tagBorder}`,
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                borderRadius: 99,
              }}
            >
              Origin: {p.origin}
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 14,
              color: C.textMid,
              lineHeight: 1.85,
              fontWeight: 300,
            }}
          >
            {p.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 10,
            }}
          >
            {p.facts.map((f) => (
              <div
                key={f.label}
                style={{
                  background: C.surface,
                  borderRadius: 14,
                  padding: '16px 14px',
                  border: `1px solid ${C.border}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: 22,
                    color: C.text,
                    lineHeight: 1,
                  }}
                >
                  {f.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 9,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: C.textMuted,
                    marginTop: 4,
                  }}
                >
                  {f.label}
                </p>
              </div>
            ))}
          </div>

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
              Available Sizes
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.weights.map((w) => (
                <div
                  key={w}
                  style={{
                    background: C.surface,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 10,
                    padding: '9px 18px',
                    fontFamily: "'Barlow',sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: C.text,
                    cursor: 'pointer',
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          </div>

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
              Key Qualities
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: C.tagBg,
                    color: C.tagText,
                    border: `1px solid ${C.tagBorder}`,
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'Barlow',sans-serif",
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: 99,
                  }}
                >
                  {t}
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
                gap: 8,
                padding: '15px 0',
                borderRadius: 14,
                background: C.accent,
                color: '#fff',
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: `0 8px 28px rgba(196,120,48,0.28)`,
              }}
            >
              Request a Quote →
            </Link>
            <button
              onClick={onClose}
              style={{
                padding: '15px 20px',
                borderRadius: 14,
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

// ═══════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════
export default function ProductsPage() {
  const { theme } = useTheme()
  const C = theme === 'dark' ? DARK_C : LIGHT_C

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<Product | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.origin.toLowerCase().includes(q)
      )
    }
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'name_desc') list.sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [search, category, sort])

  const hasFilters = search || category !== 'All'

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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
        input::placeholder { color: ${C.textMuted}; }
        input:focus { outline: none; }
        select:focus { outline: none; }

        .chip {
          font-family:'Barlow',sans-serif; font-size:11px; font-weight:600;
          letter-spacing:0.16em; text-transform:uppercase;
          padding:8px 18px; border-radius:99px; cursor:pointer;
          border:1.5px solid ${C.border};
          background:${C.bgCard}; color:${C.textMid};
          transition:all 0.18s ease; white-space:nowrap;
        }
        .chip:hover { border-color:${C.accent}; color:${C.accent}; background:${C.accentLight}; }
        .chip.on    { background:${C.accent}; border-color:${C.accent}; color:#fff; }

        .vbtn {
          width:38px; height:38px; border-radius:10px;
          border:1.5px solid ${C.border}; background:${C.bgCard};
          color:${C.textMuted}; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.18s;
        }
        .vbtn.on  { background:${C.navBg}; border-color:${C.navBg}; color:#fff; }
        .vbtn:hover:not(.on) { border-color:${C.accent}; color:${C.accent}; }

        .sort-sel {
          font-family:'Barlow',sans-serif; font-size:11px; font-weight:600;
          letter-spacing:0.12em; text-transform:uppercase;
          padding:9px 32px 9px 14px; border-radius:12px;
          border:1.5px solid ${C.border};
          background:${C.bgCard}; color:${C.textMid};
          cursor:pointer; appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23A8927A'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 12px center;
          transition:border-color 0.18s;
        }
        .sort-sel:focus { border-color:${C.accent}; }

        @keyframes cardIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .cin { animation:cardIn 0.3s ease both; }

        @media(max-width:640px) {
          .prod-grid { grid-template-columns:1fr !important; }
          .filter-bar { flex-wrap:wrap !important; }
        }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div
        style={{
          background:
            theme === 'dark'
              ? `linear-gradient(180deg, ${C.navBg} 0%, #1E1609 60%, ${C.bgDeep} 100%)`
              : '#FFFFFF',
          paddingTop: 64,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '56px 40px 52px',
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
                color: theme === 'dark' ? 'rgba(255,220,140,0.3)' : '#7a8aaf',
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
            <span
              style={{
                color: theme === 'dark' ? 'rgba(255,220,140,0.2)' : '#9ba5bf',
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
              Products
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
                Our Range
              </p>
              <h1
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3rem,7vw,5.5rem)',
                  color: theme === 'dark' ? '#fff' : '#1a1f3a',
                  textTransform: 'uppercase',
                  lineHeight: 0.9,
                }}
              >
                Product
                <br />
                <span style={{ color: C.accent }}>Catalogue</span>
              </h1>
            </div>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: theme === 'dark' ? 'rgba(255,220,150,0.4)' : '#6b7a9e',
                maxWidth: 340,
                lineHeight: 1.8,
              }}
            >
              Premium-grade staples sourced directly from certified farms. Every
              product ships in multiple pack sizes — home, restaurant, and
              retail.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 36,
              paddingTop: 28,
              borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,220,140,0.07)' : '#d8e0ed'}`,
              flexWrap: 'wrap',
            }}
          >
            {[
              { v: `${PRODUCTS.length}`, l: 'Products' },
              { v: `${CATEGORIES.length - 1}`, l: 'Categories' },
              {
                v: `${PRODUCTS.filter((p) => p.inStock).length}`,
                l: 'In Stock',
              },
              { v: '40+', l: 'Countries supplied' },
            ].map(({ v, l }) => (
              <div key={l}>
                <p
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: 28,
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
                      theme === 'dark' ? 'rgba(255,220,140,0.28)' : '#7a8aaf',
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

      {/* ── STICKY FILTER BAR ── */}
      <div
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 100,
          background: C.bgCard,
          borderBottom: `1px solid ${C.border}`,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'background 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
            className="filter-bar"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: C.surface,
                border: `1.5px solid ${C.border}`,
                borderRadius: 12,
                padding: '0 14px',
                flex: '0 0 280px',
                minWidth: 200,
                transition: 'border-color 0.2s',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.textMuted}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: C.text,
                  padding: '10px 0',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: C.textMuted,
                    fontSize: 16,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            <div style={{ width: 1, height: 22, background: C.border }} />

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`chip ${category === cat ? 'on' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}

            <div style={{ flex: 1 }} />

            <select
              className="sort-sel"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: 5 }}>
              <button
                className={`vbtn ${view === 'grid' ? 'on' : ''}`}
                onClick={() => setView('grid')}
                title="Grid"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                >
                  <rect x="0" y="0" width="5.5" height="5.5" rx="1.2" />
                  <rect x="7.5" y="0" width="5.5" height="5.5" rx="1.2" />
                  <rect x="0" y="7.5" width="5.5" height="5.5" rx="1.2" />
                  <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1.2" />
                </svg>
              </button>
              <button
                className={`vbtn ${view === 'list' ? 'on' : ''}`}
                onClick={() => setView('list')}
                title="List"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                >
                  <rect x="0" y="0.5" width="13" height="2.5" rx="1.2" />
                  <rect x="0" y="5.25" width="13" height="2.5" rx="1.2" />
                  <rect x="0" y="10" width="13" height="2.5" rx="1.2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CATALOG ── */}
      <div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 40px 80px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 12,
              color: C.textMuted,
            }}
          >
            Showing{' '}
            <strong style={{ color: C.text, fontWeight: 600 }}>
              {filtered.length}
            </strong>{' '}
            of {PRODUCTS.length} products
            {search && (
              <>
                {' '}
                · "<strong style={{ color: C.accent }}>{search}</strong>"
              </>
            )}
            {category !== 'All' && (
              <>
                {' '}
                · <strong style={{ color: C.accent }}>{category}</strong>
              </>
            )}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: C.accent,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Clear ×
            </button>
          )}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🌾</div>
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: 30,
                color: C.text,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Nothing found
            </h3>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13,
                color: C.textMuted,
              }}
            >
              Try different keywords or reset the filters.
            </p>
          </div>
        )}

        {view === 'grid' && filtered.length > 0 && (
          <div
            className="prod-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(255px,1fr))',
              gap: 20,
            }}
          >
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="cin"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <ProductCardGrid p={p} onSelect={setSelected} C={C} />
              </div>
            ))}
          </div>
        )}

        {view === 'list' && filtered.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="cin"
                style={{ animationDelay: `${i * 25}ms` }}
              >
                <ProductCardList p={p} onSelect={setSelected} C={C} />
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div
            style={{
              marginTop: 64,
              padding: '40px 48px',
              background: C.navBg,
              borderRadius: 24,
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
                Bulk & Wholesale
              </p>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 32,
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                Need large quantities?
                <br />
                <span style={{ color: C.accent }}>Let's talk.</span>
              </h3>
            </div>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                borderRadius: 14,
                background: C.accent,
                color: '#fff',
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(196,120,48,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              Contact Us →
            </Link>
          </div>
        )}
      </div>

      {selected && (
        <ProductModal p={selected} onClose={() => setSelected(null)} C={C} />
      )}
    </div>
  )
}
