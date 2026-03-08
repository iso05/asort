'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../../components/ThemeContext'

const VALUES = [
  {
    symbol: '◈',
    title: 'Uncompromising Quality',
    body: 'Every batch is tested across 12 quality checkpoints before it ever leaves our facility. We reject what others accept.',
  },
  {
    symbol: '◉',
    title: 'Farm-Direct Sourcing',
    body: 'We work directly with partner farms — no middlemen. Full traceability from the field to your shelf.',
  },
  {
    symbol: '◬',
    title: 'Sustainable Practice',
    body: '80% recyclable packaging, water-conscious processing, and fair-wage farm partnerships. Good business, done right.',
  },
  {
    symbol: '◍',
    title: 'Global, Local Heart',
    body: 'Operating in 40+ countries while staying true to the communities that grow our ingredients.',
  },
]

const TIMELINE = [
  {
    year: '2015',
    title: 'The Idea',
    body: 'Founded in a small warehouse with one product: premium long-grain rice. The vision was simple — bring transparency to bulk food.',
  },
  {
    year: '2017',
    title: 'First Export',
    body: 'Asort crosses borders for the first time, shipping to three Central Asian markets. Quality speaks without translation.',
  },
  {
    year: '2019',
    title: 'Full Range Launch',
    body: 'Sugar, buckwheat, and red split lentils join the family. The Asort colour-coded packaging system is born.',
  },
  {
    year: '2021',
    title: 'ISO Certification',
    body: 'Awarded international food safety certification across all product lines. A promise turned into a paper trail.',
  },
  {
    year: '2023',
    title: '40 Countries',
    body: 'Asort reaches distribution partners in over forty countries. From corner stores to national retail chains.',
  },
  {
    year: '2025',
    title: "What's Next",
    body: 'Expanding into superfoods and specialty grains. The journey from farm to table keeps getting shorter.',
  },
]

const TEAM = [
  { name: 'Alibek Dzhaksybekov', role: 'Founder & CEO', initial: 'A' },
  { name: 'Zarina Muratova', role: 'Head of Quality', initial: 'Z' },
  { name: 'Timur Seitkali', role: 'Supply Chain', initial: 'T' },
  { name: 'Asel Nurlanovna', role: 'Brand Director', initial: 'A' },
]

// ── Theme tokens ────────────────────────────────────────────────────────────
const DARK_C = {
  bg: '#0F1729',
  bgCard: '#1a2a4e',
  bgHover: '#1f3458',
  rule: 'rgba(100,200,255,0.12)',
  accent: '#64C8FF',
  accentSoft: '#85D8FF',
  accentGlow: 'rgba(100,200,255,0.08)',
  text: 'rgba(232,241,255,0.90)',
  textMuted: 'rgba(168,210,255,0.50)',
  textDim: 'rgba(168,210,255,0.28)',
  border: 'rgba(100,200,255,0.15)',
  surface: 'rgba(100,200,255,0.06)',
  navBg: '#0F1729',
}

const LIGHT_C = {
  bg: '#FFFFFF',
  bgCard: '#F8FBFF',
  bgHover: '#F5F8FF',
  rule: '#E0E8F0',
  accent: '#2c5aa0',
  accentSoft: '#2c5aa0',
  accentGlow: 'rgba(44,90,160,0.08)',
  text: '#1a1f3a',
  textMuted: '#6b7a9e',
  textDim: '#9ba5bf',
  border: '#D8E0ED',
  surface: '#F0F4FA',
  navBg: '#FFFFFF',
}

// ── Scroll reveal ────────────────────────────────────────────────────────────
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
        transform: v ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function AboutPage() {
  const { theme } = useTheme()
  const C = theme === 'dark' ? DARK_C : LIGHT_C
  const isDark = theme === 'dark'

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        transition: 'background 0.3s ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
        @media(max-width:768px){ .about-hero-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:640px){ .values-grid{ grid-template-columns:1fr !important; } .team-grid{ grid-template-columns:repeat(2,1fr) !important; } }
      `}</style>

      {/* ── HERO ── */}
      <div
        style={{
          background: isDark
            ? `linear-gradient(160deg, #0D0904 0%, #1A1409 40%, #13100A 100%)`
            : `linear-gradient(160deg, #FFFFFF 0%, #F8FBFF 40%, #FFFFFF 100%)`,
          paddingTop: 64,
          paddingBottom: 0,
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s ease',
        }}
      >
        {/* grain texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(100,150,200,0.03) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '60px 40px 80px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            className="about-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: '0.55em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 20,
                }}
              >
                Our Story
              </p>
              <h1
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3.2rem,7vw,5.8rem)',
                  color: isDark ? C.accentSoft : '#1a1f3a',
                  textTransform: 'uppercase',
                  lineHeight: 0.88,
                  marginBottom: 28,
                }}
              >
                From Field
                <br />
                <span style={{ color: C.accent }}>To Table.</span>
              </h1>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: 14,
                  color: isDark ? C.textMuted : '#6b7a9e',
                  lineHeight: 1.85,
                  maxWidth: 400,
                }}
              >
                Asort was built on a single conviction: premium food should be
                traceable, honest, and within reach for businesses of every
                size. Since 2015, we've connected the world's best farms to the
                shelves of 40+ countries.
              </p>
              <div style={{ display: 'flex', gap: 28, marginTop: 36 }}>
                {[
                  ['40+', 'Countries'],
                  ['10', 'Years'],
                  ['7', 'Products'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: 34,
                        color: isDark ? '#fff' : '#1a1f3a',
                        lineHeight: 1,
                      }}
                    >
                      {v}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 9,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: isDark ? C.textDim : '#7a8aaf',
                        marginTop: 3,
                      }}
                    >
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract geometric right side */}
            <div style={{ position: 'relative', height: 320 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    border: `1px solid ${C.accent}22`,
                    position: 'absolute',
                  }}
                />
                <div
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    border: `1px solid ${C.accent}44`,
                    position: 'absolute',
                  }}
                />
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${C.accent}33 0%, transparent 70%)`,
                    position: 'absolute',
                  }}
                />
                <span style={{ fontSize: 64, position: 'absolute' }}>🌾</span>
              </div>
              {/* Floating tags */}
              {[
                { txt: 'ISO 22000', top: '8%', left: '0%' },
                { txt: '40+ Countries', top: '70%', left: '60%' },
                { txt: 'Gold Standard', top: '15%', left: '62%' },
              ].map(({ txt, top, left }) => (
                <div
                  key={txt}
                  style={{
                    position: 'absolute',
                    top,
                    left,
                    background: isDark
                      ? 'rgba(232,168,56,0.08)'
                      : 'rgba(100,150,200,0.08)',
                    border: `1px solid ${C.accent}44`,
                    borderRadius: 99,
                    padding: '6px 14px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: C.accent,
                    }}
                  >
                    {txt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fade to page bg */}
        <div
          style={{
            height: 60,
            background: `linear-gradient(to bottom, transparent, ${C.bg})`,
          }}
        />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px 80px' }}>
        {/* ── VALUES ── */}
        <Reveal>
          <section style={{ marginBottom: 80 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 40,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 32,
                  color: C.text,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                What We Stand For
              </h2>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div
              className="values-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
              }}
            >
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 20,
                      padding: '32px 30px',
                      transition: 'border-color 0.2s, background 0.3s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: 28,
                        color: C.accent,
                        display: 'block',
                        marginBottom: 14,
                      }}
                    >
                      {v.symbol}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: 22,
                        color: C.text,
                        textTransform: 'uppercase',
                        marginBottom: 10,
                        lineHeight: 1,
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: C.textMuted,
                        lineHeight: 1.82,
                      }}
                    >
                      {v.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── TIMELINE ── */}
        <Reveal>
          <section style={{ marginBottom: 80 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 40,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 32,
                  color: C.text,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Our Journey
              </h2>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div style={{ position: 'relative', paddingLeft: 48 }}>
              {/* Spine */}
              <div
                style={{
                  position: 'absolute',
                  left: 14,
                  top: 10,
                  bottom: 10,
                  width: 1,
                  background: `linear-gradient(to bottom, ${C.accent}, ${C.border})`,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {TIMELINE.map((item, i) => (
                  <Reveal key={item.year} delay={i * 70}>
                    <div style={{ position: 'relative', paddingBottom: 36 }}>
                      {/* Dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: -41,
                          top: 4,
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background:
                            i === TIMELINE.length - 1 ? C.accent : C.bgCard,
                          border: `2px solid ${C.accent}`,
                          boxShadow:
                            i === TIMELINE.length - 1
                              ? `0 0 0 4px ${C.accentGlow}`
                              : 'none',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 14,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 900,
                            fontSize: 18,
                            color: C.accent,
                            minWidth: 44,
                          }}
                        >
                          {item.year}
                        </span>
                        <h3
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 900,
                            fontSize: 20,
                            color: C.text,
                            textTransform: 'uppercase',
                            lineHeight: 1,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontWeight: 300,
                          fontSize: 13,
                          color: C.textMuted,
                          lineHeight: 1.8,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── TEAM ── */}
        <Reveal>
          <section style={{ marginBottom: 80 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 40,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 32,
                  color: C.text,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                The Team
              </h2>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div
              className="team-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
              }}
            >
              {TEAM.map((member, i) => (
                <Reveal key={member.name} delay={i * 80}>
                  <div
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 20,
                      padding: '28px 22px',
                      textAlign: 'center',
                      transition: 'background 0.3s',
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: `radial-gradient(135deg, ${C.accent}, ${C.accentGlow})`,
                        border: `2px solid ${C.accent}55`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900,
                          fontSize: 22,
                          color: '#fff',
                        }}
                      >
                        {member.initial}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: 17,
                        color: C.text,
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                        marginBottom: 6,
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: C.textMuted,
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── BOTTOM CTA ── */}
        <Reveal>
          <div
            style={{
              background: C.navBg,
              borderRadius: 24,
              padding: '44px 48px',
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
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.42em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 10,
                }}
              >
                Work With Us
              </p>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 32,
                  color: '#fff',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                Ready to partner
                <br />
                <span style={{ color: C.accent }}>with Asort?</span>
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 26px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                View Products →
              </a>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 26px',
                  borderRadius: 12,
                  background: C.accent,
                  color: '#fff',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(196,120,48,0.28)',
                }}
              >
                Contact Us →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
