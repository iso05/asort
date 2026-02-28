'use client'

import { useState } from 'react'

// ─── Product Data ────────────────────────────────────────────────────────────
const products = [
  {
    id: 'blue',
    name: 'SUGAR',
    subtitle: 'CRYSTAL WHITE',
    weight: '1 KG / 5 KG',
    origin: 'PREMIUM GRADE',
    color: 'BLUE / WHITE',
    bg: '#1A3A5C',
    accent: '#2D6FBF',
    text: '#93C5FD',
    emoji: '🟦',
    description:
      'The finest refined sugar sourced from top-tier plantations. Crisp, pure, and perfect for every recipe. Our quality is unmatched — taste the difference.',
    packageBg: 'linear-gradient(135deg, #1e4d8c 0%, #2d6fbf 50%, #1a3a5c 100%)',
  },
  {
    id: 'green',
    name: 'RICE',
    subtitle: 'LONG GRAIN',
    weight: '2 KG / 10 KG',
    origin: 'PREMIUM GRADE',
    color: 'GREEN / IVORY',
    bg: '#1A3D1A',
    accent: '#2E7D2E',
    text: '#86EFAC',
    emoji: '🟩',
    description:
      'Long grain rice grown in lush, mineral-rich paddies. Every grain cooks to fluffy perfection. Aromatic, nourishing, and consistently exceptional.',
    packageBg: 'linear-gradient(135deg, #22543d 0%, #2e7d2e 50%, #1a3d1a 100%)',
  },
  {
    id: 'black',
    name: 'BUCKWHEAT',
    subtitle: 'ROASTED WHOLE',
    weight: '0.9 KG / 4 KG',
    origin: 'PREMIUM GRADE',
    color: 'BLACK / GOLD',
    bg: '#111111',
    accent: '#3D3D3D',
    text: '#D1D5DB',
    emoji: '⬛',
    description:
      'Roasted whole buckwheat with a rich, nutty depth. High in protein and packed with essential minerals. The cornerstone of a wholesome kitchen.',
    packageBg: 'linear-gradient(135deg, #1f1f1f 0%, #3d3d3d 50%, #111111 100%)',
  },
  {
    id: 'orange',
    name: 'LENTILS',
    subtitle: 'RED SPLIT',
    weight: '1 KG / 5 KG',
    origin: 'PREMIUM GRADE',
    color: 'ORANGE / RUST',
    bg: '#7C2D12',
    accent: '#C2410C',
    text: '#FED7AA',
    emoji: '🟧',
    description:
      'Vibrant red split lentils harvested from sun-drenched fields. Quick-cooking and loaded with plant protein. Bold flavor meets everyday convenience.',
    packageBg: 'linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #7c2d12 100%)',
  },
]

const NAV_LINKS = ['Home', 'About', 'Products', 'News', 'Partners', 'Contact']

// ─── Package Visual Component ─────────────────────────────────────────────────
function PackageVisual({
  product,
  size = 'large',
}: {
  product: (typeof products)[0]
  size?: 'large' | 'small'
}) {
  const isLarge = size === 'large'
  return (
    <div
      style={{
        background: product.packageBg,
        boxShadow: isLarge
          ? `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)`
          : `0 8px 20px rgba(0,0,0,0.4)`,
      }}
      className={`relative flex flex-col items-center justify-between rounded-2xl overflow-hidden transition-all duration-500 ${
        isLarge ? 'w-56 h-80 md:w-64 md:h-96 px-5 py-6' : 'w-12 h-14 px-1 py-1'
      }`}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
        style={{ background: product.text }}
      />
      {isLarge && (
        <>
          <div className="text-center mt-2 z-10">
            <p className="text-white/40 text-[9px] tracking-[0.3em] font-light uppercase">
              ASORT
            </p>
            <p
              className="font-black text-3xl tracking-tight mt-1 uppercase"
              style={{ color: product.text }}
            >
              {product.name}
            </p>
            <p className="text-white/50 text-[9px] tracking-[0.25em] uppercase mt-0.5">
              {product.subtitle}
            </p>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            style={{ opacity: 0.06 }}
          >
            <span className="text-white font-black text-[140px] leading-none">
              {product.name[0]}
            </span>
          </div>
          <div className="z-10 flex-1 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${product.text}30`,
              }}
            >
              <span className="text-4xl">{product.emoji}</span>
            </div>
          </div>
          <div className="text-center z-10 mb-1">
            <p className="text-white/30 text-[8px] tracking-widest uppercase">
              {product.weight}
            </p>
          </div>
        </>
      )}
      {!isLarge && (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-base">{product.emoji}</span>
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
        style={{ background: product.accent }}
      />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AsortHomePage() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const product = products[active]

  return (
    <div
      className="min-h-screen w-full overflow-hidden transition-colors duration-700 relative"
      style={{
        background: product.bg,
        fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
      }}
    >
      {/* ── FONTS + STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        .nav-link {
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Barlow', sans-serif;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: rgba(255,255,255,1); }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: rgba(255,255,255,1); }
        .nav-link.active::after { width: 100%; }

        .thumb-btn { transition: transform .2s, outline .2s; border-radius: 10px; overflow: hidden; }
        .thumb-btn:hover { transform: scale(1.08); }
        .thumb-btn.active-thumb { outline: 2px solid rgba(255,255,255,0.8); transform: scale(1.1); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: slideDown 0.22s ease forwards; }
        .bg-glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* Background glow */}
      <div
        className="bg-glow"
        style={{
          width: 600,
          height: 600,
          background: product.accent,
          opacity: 0.18,
          top: -100,
          right: 100,
          transition: 'background 0.7s ease',
        }}
      />

      {/* ══════════════════════════════════════
          HERO CONTENT  (unchanged from original)
      ══════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-6 pb-10 min-h-[calc(100vh-100px)] gap-8">
        {/* LEFT — product info */}
        <div
          className="flex-1 max-w-xs"
          key={`left-${active}`}
          style={{ animation: 'fadeUp .45s ease forwards' }}
        >
          <p
            className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            RELEASE DATE
            <br />
            <span className="text-white/50">2025 · ASORT</span>
          </p>
          <h1
            className="font-black uppercase text-white leading-none mb-1"
            style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}
          >
            {product.name}
          </h1>
          <p
            className="font-bold uppercase tracking-widest mb-1"
            style={{ color: product.text, fontSize: 13 }}
          >
            {product.subtitle}
          </p>
          <div
            className="mt-4 space-y-1"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {[
              ['WEIGHT', product.weight],
              ['GRADE', product.origin],
              ['COLOR WAY', product.color],
            ].map(([k, v]) => (
              <p
                key={k}
                className="text-white/40 text-[11px] tracking-wider uppercase"
              >
                <span className="text-white/25 mr-2">{k}</span>
                {v}
              </p>
            ))}
          </div>

          {/* Size selector */}
          <div className="mt-7">
            <p
              className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              SELECT SIZE (KG)
            </p>
            <div className="flex flex-wrap gap-2">
              {['0.5', '1', '2', '5', '10'].map((s) => (
                <button
                  key={s}
                  className="w-10 h-10 rounded-lg text-[11px] font-bold tracking-wide text-white/60 hover:text-white transition-all duration-200 border border-white/15 hover:border-white/40"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Product thumbnails */}
          <div className="mt-6">
            <p
              className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              SELECT PRODUCT
            </p>
            <div className="flex gap-3">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={`thumb-btn ${i === active ? 'active-thumb' : ''}`}
                  onClick={() => setActive(i)}
                  title={p.name}
                >
                  <PackageVisual product={p} size="small" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — package + giant wordmark */}
        <div
          className="relative flex-1 flex items-center justify-center"
          style={{ minHeight: 380 }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            style={{ overflow: 'hidden' }}
          >
            <span
              className="font-black text-white uppercase"
              style={{
                fontSize: 'clamp(120px, 18vw, 220px)',
                lineHeight: 1,
                opacity: 0.06,
                letterSpacing: '-0.02em',
                transform: 'translateY(10px)',
              }}
            >
              ASORT
            </span>
          </div>
          <div
            key={`pkg-${active}`}
            style={{
              animation: 'fadeUp .5s ease forwards',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
            }}
          >
            <PackageVisual product={product} size="large" />
          </div>
        </div>

        {/* RIGHT — description + arrows (no cart, no price) */}
        <div
          className="flex-1 max-w-xs text-right hidden md:flex flex-col items-end gap-6"
          key={`right-${active}`}
          style={{ animation: 'fadeUp .6s ease forwards' }}
        >
          <p
            className="text-white/40 text-xs leading-relaxed text-right"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            {product.description}
          </p>

          <button
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[11px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <span>► LEARN MORE</span>
          </button>

          {/* Arrows */}
          <div className="flex gap-2 mt-4">
            {[
              { icon: '←', dir: -1 },
              { icon: '→', dir: 1 },
            ].map(({ icon, dir }) => (
              <button
                key={icon}
                onClick={() =>
                  setActive(
                    (prev) => (prev + dir + products.length) % products.length
                  )
                }
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all text-sm"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="relative z-10 flex justify-between items-center px-8 md:px-16 pb-6 text-white/20 text-[10px] uppercase tracking-widest"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <span>© 2025 ASORT</span>
        <span>PREMIUM FOOD PRODUCTS</span>
        <span>EST. 2025</span>
      </div>
    </div>
  )
}
