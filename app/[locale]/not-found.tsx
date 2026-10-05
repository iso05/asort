'use client'

import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'

export default function NotFound() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bg = isDark ? '#070E17' : '#FDFBF7'
  const text = isDark ? '#E4F0F5' : '#1E2520'
  const textMid = isDark ? '#7AB4C8' : '#505A53'
  const accent = isDark ? '#5BB8D4' : '#2D5F3E'

  return (
    <div
      style={{
        background: bg,
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        transition: 'background 0.3s, color 0.3s',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        .glow-circle {
          position: absolute;
          border-radius: 50%;
          background: ${isDark ? 'rgba(91,184,212,0.03)' : 'rgba(45,95,62,0.03)'};
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .home-btn-nf {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 2px;
          background: ${accent};
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 16px ${isDark ? 'rgba(91,184,212,0.15)' : 'rgba(45,95,62,0.12)'};
        }
        .home-btn-nf:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Decorative Glow Circles */}
      <div className="glow-circle" style={{ width: 400, height: 400, top: '-10%', left: '-10%' }} />
      <div className="glow-circle" style={{ width: 500, height: 500, bottom: '-15%', right: '-10%' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
        {/* Large 404 number */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            color: accent,
            lineHeight: 0.8,
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: text,
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Sahifa topilmadi
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 14.5,
            color: textMid,
            lineHeight: 1.8,
            marginBottom: 32,
          }}
        >
          Kechirasiz, siz qidirayotgan sahifa mavjud emas, o&apos;chirilgan yoki manzili o&apos;zgartirilgan bo&apos;lishi mumkin.
        </p>

        <Link href="/uz" prefetch={false} className="home-btn-nf">
          Bosh sahifaga qaytish →
        </Link>
      </div>
    </div>
  )
}
