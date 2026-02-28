"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    symbol: "◈",
    title: "Uncompromising Quality",
    body: "Every batch is tested across 12 quality checkpoints before it ever leaves our facility. We reject what others accept.",
  },
  {
    symbol: "◉",
    title: "Farm-Direct Sourcing",
    body: "We work directly with partner farms — no middlemen. Full traceability from the field to your shelf.",
  },
  {
    symbol: "◬",
    title: "Sustainable Practice",
    body: "80% recyclable packaging, water-conscious processing, and fair-wage farm partnerships. Good business, done right.",
  },
  {
    symbol: "◍",
    title: "Global, Local Heart",
    body: "Operating in 40+ countries while staying true to the communities that grow our ingredients.",
  },
];

const TIMELINE = [
  { year: "2015", title: "The Idea",           body: "Founded in a small warehouse with one product: premium long-grain rice. The vision was simple — bring transparency to bulk food." },
  { year: "2017", title: "First Export",        body: "Asort crosses borders for the first time, shipping to three Central Asian markets. Quality speaks without translation." },
  { year: "2019", title: "Full Range Launch",   body: "Sugar, buckwheat, and red split lentils join the family. The Asort colour-coded packaging system is born." },
  { year: "2021", title: "ISO Certification",   body: "Awarded international food safety certification across all product lines. A promise turned into a paper trail." },
  { year: "2023", title: "40 Countries",        body: "Asort reaches distribution partners in over forty countries. From corner stores to national retail chains." },
  { year: "2025", title: "What's Next",         body: "Expanding into superfoods and specialty grains. The journey from farm to table keeps getting shorter." },
];

const TEAM = [
  { name: "Alibek Dzhaksybekov", role: "Founder & CEO",   initial: "A" },
  { name: "Zarina Muratova",     role: "Head of Quality", initial: "Z" },
  { name: "Timur Seitkali",      role: "Supply Chain",    initial: "T" },
  { name: "Asel Nurlanovna",     role: "Brand Director",  initial: "A" },
];

// ─────────────────────────────────────────────
// COLOUR TOKENS  (warm wheat / harvest palette)
// ─────────────────────────────────────────────
const C = {
  bg:        "#13100A",   // very dark warm brown — not cold navy
  bgCard:    "#1C1710",   // card surface
  bgHover:   "#241F14",
  rule:      "rgba(255,220,140,0.09)",
  accent:    "#E8A838",   // warm amber / harvest gold
  accentSoft:"#F5C96A",   // lighter amber for headings
  accentGlow:"rgba(232,168,56,0.12)",
  text:      "rgba(255,240,200,0.85)",   // warm off-white
  textMuted: "rgba(255,220,150,0.38)",
  textDim:   "rgba(255,220,150,0.20)",
  border:    "rgba(255,200,100,0.10)",
  borderHov: "rgba(255,200,100,0.22)",
};

// ── Fade-in on scroll hook ────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ── Animated section wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;0,800;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .label {
          font-family: 'Barlow', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: ${C.accent};
          display: block;
        }

        .big-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.92;
          color: ${C.text};
        }

        .body-text {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          color: ${C.textMuted};
          line-height: 1.85;
        }

        .rule { height: 1px; background: ${C.rule}; }

        .value-card {
          padding: 28px 24px;
          border-radius: 18px;
          border: 1px solid ${C.border};
          background: ${C.bgCard};
          transition: background 0.25s, transform 0.25s, border-color 0.25s;
          height: 100%;
        }
        .value-card:hover {
          background: ${C.bgHover};
          border-color: ${C.borderHov};
          transform: translateY(-4px);
        }

        .tl-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: ${C.accent};
          border: 2px solid ${C.bg};
          outline: 1px solid ${C.accent};
          flex-shrink: 0;
        }

        .stat-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: ${C.text};
          line-height: 1;
        }

        .team-card {
          border-radius: 20px;
          border: 1px solid ${C.border};
          background: ${C.bgCard};
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s;
        }
        .team-card:hover {
          transform: translateY(-6px);
          border-color: ${C.borderHov};
        }

        @keyframes heroFade {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-anim        { animation: heroFade 0.7s ease forwards; }
        .hero-anim-delay  { animation: heroFade 0.7s ease 0.15s both; }
        .hero-anim-delay2 { animation: heroFade 0.7s ease 0.3s both; }

        /* Subtle warm grain texture */
        .grain::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .tl-row { grid-template-columns: 20px 70px 1fr !important; gap: 0 14px !important; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain" />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "110px 40px 80px",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Warm glow blob */}
        <div style={{
          position: "absolute",
          top: "30%", right: -100,
          width: 600, height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
          filter: "blur(40px)",
        }} />

        {/* Giant background watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%", right: -40,
            transform: "translateY(-50%)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(180px, 28vw, 360px)",
            color: "rgba(232,168,56,0.04)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-0.05em",
          }}
        >
          2025
        </div>

        <div style={{ maxWidth: 760, position: "relative", zIndex: 2 }}>
          <span className="label hero-anim" style={{ marginBottom: 20 }}>About Asort</span>

          <h1
            className="big-heading hero-anim-delay"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", marginBottom: 28 }}
          >
            We feed<br />
            <span style={{ color: C.accentSoft, fontStyle: "italic" }}>the world</span><br />
            with intent.
          </h1>

          <p
            className="body-text hero-anim-delay2"
            style={{ fontSize: 15, maxWidth: 480, lineHeight: 2 }}
          >
            Asort is a premium food distribution company built on a single belief —
            that everyday staples deserve the same rigour as fine ingredients.
            We source, test, and deliver with obsessive care.
          </p>

          <div
            className="hero-anim-delay2"
            style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{ width: 32, height: 1, background: C.textDim }} />
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10, letterSpacing: "0.35em",
              textTransform: "uppercase", color: C.textDim,
            }}>
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section style={{ padding: "72px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1px",
            background: C.border,
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${C.border}`,
          }}>
            {[
              { v: "12+",  l: "Years active" },
              { v: "40+",  l: "Countries" },
              { v: "4",    l: "Core products" },
              { v: "98%",  l: "Satisfaction" },
              { v: "500T", l: "Monthly capacity" },
            ].map(({ v, l }) => (
              <div key={l} style={{
                padding: "36px 28px",
                background: C.bg,
                textAlign: "center",
              }}>
                <p className="stat-num">{v}</p>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 10, letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: C.textDim, marginTop: 7,
                }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="rule" />

      {/* ══════════════════════════════════════
          STORY
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          className="story-grid"
        >
          <Reveal>
            <span className="label" style={{ marginBottom: 16 }}>Our Story</span>
            <h2
              className="big-heading"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: 0 }}
            >
              Started with<br />
              <span style={{ color: C.accent }}>one product.</span><br />
              Built on trust.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="body-text" style={{ fontSize: 14, marginBottom: 20 }}>
              Asort began in 2015 as a response to a simple frustration — bulk food products
              with no traceability, no consistency, and no accountability. We started with
              one grade of long-grain rice and refused to compromise on any detail.
            </p>
            <p className="body-text" style={{ fontSize: 14, marginBottom: 20 }}>
              A decade later we supply retail chains, restaurants, and households across
              four continents. The products changed. The obsession didn't.
            </p>
            <p className="body-text" style={{ fontSize: 14 }}>
              Every package that leaves an Asort facility has passed our 12-point lab
              analysis. Not because we have to. Because our customers deserve to know
              exactly what they're buying.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="rule" />

      {/* ══════════════════════════════════════
          VALUES
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <span className="label" style={{ marginBottom: 14 }}>What We Stand For</span>
          <h2
            className="big-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: 56 }}
          >
            Four values.<br />
            <span style={{ color: C.textDim }}>Zero exceptions.</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="value-card">
                <div style={{ fontSize: 22, color: C.accent, fontWeight: 900, marginBottom: 16 }}>
                  {v.symbol}
                </div>
                <h3 style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600, fontSize: 13,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  color: C.text, marginBottom: 10,
                }}>
                  {v.title}
                </h3>
                <p className="body-text" style={{ fontSize: 12.5, lineHeight: 1.75 }}>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="rule" />

      {/* ══════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <span className="label" style={{ marginBottom: 14 }}>Milestones</span>
          <h2
            className="big-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: 64 }}
          >
            A decade of<br />
            <span style={{ color: C.accent }}>doing it right.</span>
          </h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 4, top: 6, bottom: 6,
            width: 1, background: C.rule,
          }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 70}>
                <div
                  className="tl-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px 120px 1fr",
                    gap: "0 32px",
                    alignItems: "flex-start",
                    paddingBottom: 44,
                  }}
                >
                  <div style={{ paddingTop: 4 }}>
                    <div className="tl-dot" />
                  </div>

                  <p style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: 28,
                    color: i === TIMELINE.length - 1 ? C.accent : C.textDim,
                    lineHeight: 1,
                  }}>
                    {item.year}
                  </p>

                  <div>
                    <h3 style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 600, fontSize: 14,
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      color: C.text, marginBottom: 6,
                    }}>
                      {item.title}
                    </h3>
                    <p className="body-text" style={{ fontSize: 13, lineHeight: 1.75 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <span className="label" style={{ marginBottom: 14 }}>The People</span>
          <h2
            className="big-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: 56 }}
          >
            Built by humans<br />
            <span style={{ color: C.textDim }}>who care deeply.</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <div className="team-card">
                <div style={{
                  height: 160,
                  background: `linear-gradient(135deg, rgba(232,168,56,0.10) 0%, rgba(232,168,56,0.02) 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderBottom: `1px solid ${C.border}`,
                }}>
                  <div style={{
                    width: 64, height: 64,
                    borderRadius: "50%",
                    background: "rgba(232,168,56,0.12)",
                    border: `1px solid rgba(232,168,56,0.30)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 28,
                    color: C.accent,
                  }}>
                    {member.initial}
                  </div>
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 600, fontSize: 13,
                    color: C.text, marginBottom: 4,
                  }}>
                    {member.name}
                  </p>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 10, letterSpacing: "0.3em",
                    textTransform: "uppercase", color: C.textDim,
                  }}>
                    {member.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="rule" />

      {/* ══════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* warm glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${C.accentGlow}, transparent)`,
        }} />
        <Reveal>
          <span className="label" style={{ marginBottom: 16 }}>Ready to work together?</span>
          <h2
            className="big-heading"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", marginBottom: 36 }}
          >
            Let's start<br />
            <span style={{ color: C.accent }}>a conversation.</span>
          </h2>
          <a
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "15px 38px",
              borderRadius: 14,
              background: C.accent,
              color: C.bg,
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700, fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: `0 8px 32px rgba(232,168,56,0.25)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 12px 40px rgba(232,168,56,0.38)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(232,168,56,0.25)`;
            }}
          >
            Contact Us →
          </a>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${C.rule}`,
        padding: "28px 40px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: 16,
          letterSpacing: "0.22em", color: C.text,
        }}>
          ASORT ®
        </span>
        <span style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 10, letterSpacing: "0.3em",
          textTransform: "uppercase", color: C.textDim,
        }}>
          © 2025 Asort · Premium Food Products
        </span>
      </footer>
    </div>
  );
}
