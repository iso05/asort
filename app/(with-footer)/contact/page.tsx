'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

// ── Theme tokens ──────────────────────────────────────────────────────────────
const LIGHT_C = {
  bg: '#FFFFFF',
  bgCard: '#F8FBFF',
  bgCardHov: '#F5F8FF',
  surface: '#F0F4FA',
  border: '#D8E0ED',
  borderFocus: '#2c5aa0',
  accent: '#2c5aa0',
  accentDeep: '#1a3a70',
  accentLight: '#E8F1FF',
  accentGlow: 'rgba(44,90,160,0.08)',
  text: '#1a1f3a',
  textMid: '#4a5f8f',
  textMuted: '#7a8aaf',
  textDim: '#9ba5bf',
  green: '#3a6f3a',
  greenBg: '#E8F5EC',
  greenBorder: '#A8D4B4',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  errorBorder: '#FECACA',
  navBg: '#FFFFFF',
  navBorder: 'rgba(100,150,200,0.10)',
}

const DARK_C = {
  bg: '#0F1729',
  bgCard: '#1a2a4e',
  bgCardHov: '#1f3458',
  surface: '#232d45',
  border: '#3a4d70',
  borderFocus: '#64C8FF',
  accent: '#64C8FF',
  accentDeep: '#3a9acc',
  accentLight: 'rgba(100,200,255,0.12)',
  accentGlow: 'rgba(100,200,255,0.08)',
  text: '#E8F1FF',
  textMid: '#9abadb',
  textMuted: '#6a8abd',
  textDim: '#4a6a9d',
  green: '#3A9A50',
  greenBg: 'rgba(58,154,80,0.15)',
  greenBorder: 'rgba(58,154,80,0.35)',
  error: '#F87171',
  errorBg: 'rgba(220,38,38,0.10)',
  errorBorder: 'rgba(220,38,38,0.30)',
  navBg: '#0F1729',
  navBorder: 'rgba(100,200,255,0.08)',
}

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}
type FormErrors = Partial<Record<keyof FormData, string>>
const SUBJECTS = [
  'Product Enquiry',
  'Wholesale / Bulk Order',
  'Partnership / Distribution',
  'Press & Media',
  'Careers',
  'Other',
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

function InfoCard({
  icon,
  label,
  value,
  sub,
  C,
}: {
  icon: string
  label: string
  value: string
  sub?: string
  C: typeof LIGHT_C
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgCard,
        border: `1.5px solid ${hov ? C.borderFocus : C.border}`,
        borderRadius: 16,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        transition: 'border-color .18s, transform .18s',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: C.accentLight,
          border: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: C.textMuted,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.4,
          }}
        >
          {value}
        </p>
        {sub && (
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 11,
              color: C.textMuted,
              marginTop: 2,
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const { theme } = useTheme()
  const C = theme === 'dark' ? DARK_C : LIGHT_C

  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )
  const [focused, setFocused] = useState<string | null>(null)
  const shakeRef = useRef<HTMLDivElement>(null)

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address'
    if (!form.subject) e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20)
      e.message = 'Message is too short (min 20 chars)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const inp = (field: keyof FormData): React.CSSProperties => ({
    width: '100%',
    padding: '13px 16px',
    borderRadius: 12,
    border: `1.5px solid ${errors[field] ? C.error : focused === field ? C.borderFocus : C.border}`,
    background: errors[field]
      ? C.errorBg
      : focused === field
        ? C.bgCard
        : C.surface,
    fontFamily: "'Barlow',sans-serif",
    fontSize: 13,
    color: C.text,
    transition: 'border-color .18s, background .18s',
    outline: 'none',
  })

  const lbl: React.CSSProperties = {
    fontFamily: "'Barlow',sans-serif",
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: C.textMuted,
    display: 'block',
    marginBottom: 7,
  }

  const errMsg = (field: keyof FormData) =>
    errors[field] ? (
      <p
        style={{
          fontFamily: "'Barlow',sans-serif",
          fontSize: 10,
          color: C.error,
          marginTop: 5,
        }}
      >
        ⚠ {errors[field]}
      </p>
    ) : null

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
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:99px}
        input::placeholder,textarea::placeholder{color:${C.textMuted}}
        input:focus,textarea:focus,select:focus{outline:none}
        textarea{resize:vertical}
        select{appearance:none;cursor:pointer;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23A8927A'/%3E%3C/svg%3E");
          background-repeat:no-repeat;background-position:right 14px center;
        }
        @keyframes hf{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .hf0{animation:hf .6s ease forwards} .hf1{animation:hf .6s ease .12s both} .hf2{animation:hf .6s ease .24s both}
        @keyframes successIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
        .sIn{animation:successIn .4s cubic-bezier(.22,.68,0,1.1) forwards}
        @keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin .8s linear infinite}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
        .shake{animation:shake .4s ease}
        @media(max-width:900px){.ct-grid{grid-template-columns:1fr!important}}
        @media(max-width:640px){.form-row{grid-template-columns:1fr!important}.info-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* ── HEADER ── */}
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
            padding: '52px 40px 52px',
          }}
        >
          <div
            className="hf0"
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
              Contact
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
                className="hf0"
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
                Get In Touch
              </p>
              <h1
                className="hf1"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3rem,7vw,5.5rem)',
                  color: theme === 'dark' ? '#fff' : '#1a1f3a',
                  textTransform: 'uppercase',
                  lineHeight: 0.88,
                }}
              >
                Let's Start
                <br />
                <span style={{ color: C.accent }}>A Conversation</span>
              </h1>
            </div>
            <p
              className="hf2"
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: theme === 'dark' ? 'rgba(255,220,150,0.38)' : '#6b7a9e',
                maxWidth: 360,
                lineHeight: 1.85,
              }}
            >
              Whether you're interested in our products, want to become a
              partner, or just have a question — we read every message and reply
              within 2 business days.
            </p>
          </div>
          <div
            className="hf2"
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 40,
              paddingTop: 24,
              borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,220,140,0.07)' : '#d8e0ed'}`,
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: '✉️', label: 'Email', val: 'info@asort.com' },
              { icon: '📞', label: 'Phone', val: '+998 90 123 45 67' },
              { icon: '📍', label: 'Office', val: 'Tashkent, Uzbekistan' },
              { icon: '🕐', label: 'Response', val: 'Within 2 business days' },
            ].map(({ icon, label, val }) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                <div>
                  <p
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color:
                        theme === 'dark' ? 'rgba(255,220,140,0.25)' : '#7a8aaf',
                      marginBottom: 2,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color:
                        theme === 'dark' ? 'rgba(255,220,150,0.65)' : '#4a5f8f',
                    }}
                  >
                    {val}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}
      >
        <div
          className="ct-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* ── FORM ── */}
          <div>
            <div
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                transition: 'background 0.3s ease',
              }}
            >
              <div
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(135deg,#1C1610 0%,#2A1E0E 100%)'
                      : 'linear-gradient(135deg,#F0F4FA 0%,#E8ECFF 100%)',
                  padding: '30px 36px 26px',
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: 26,
                    color: theme === 'dark' ? '#fff' : '#1a1f3a',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    marginBottom: 5,
                  }}
                >
                  Send Us a Message
                </h2>
                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 12,
                    color:
                      theme === 'dark' ? 'rgba(245,236,216,0.35)' : '#7a8aaf',
                    fontWeight: 300,
                  }}
                >
                  All fields marked * are required
                </p>
              </div>

              {status === 'sent' ? (
                <div
                  className="sIn"
                  style={{
                    padding: '64px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: C.greenBg,
                      border: `2px solid ${C.greenBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 30,
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: 30,
                      color: C.text,
                      textTransform: 'uppercase',
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 13,
                      color: C.textMid,
                      lineHeight: 1.75,
                      fontWeight: 300,
                      maxWidth: 360,
                    }}
                  >
                    Thanks,{' '}
                    <strong style={{ color: C.text }}>{form.name}</strong>.
                    We'll reply to{' '}
                    <strong style={{ color: C.accent }}>{form.email}</strong>{' '}
                    within 2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setForm({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      })
                      setStatus('idle')
                      setErrors({})
                    }}
                    style={{
                      marginTop: 8,
                      padding: '12px 32px',
                      borderRadius: 12,
                      background: C.accent,
                      border: 'none',
                      color: '#fff',
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    padding: '34px 36px 38px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                  }}
                >
                  {status === 'error' && (
                    <div
                      ref={shakeRef}
                      className="shake"
                      style={{
                        padding: '13px 16px',
                        borderRadius: 12,
                        background: C.errorBg,
                        border: `1px solid ${C.errorBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <span>⚠️</span>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.error,
                          }}
                        >
                          Failed to send
                        </p>
                        <p
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: 11,
                            color: C.error,
                            opacity: 0.75,
                            marginTop: 1,
                          }}
                        >
                          Check your EmailJS config in the code, then try again.
                        </p>
                      </div>
                    </div>
                  )}
                  <div
                    className="form-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 14,
                    }}
                  >
                    <div>
                      <label style={lbl}>Full Name *</label>
                      <input
                        style={inp('name')}
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value })
                          if (errors.name)
                            setErrors({ ...errors, name: undefined })
                        }}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                      />
                      {errMsg('name')}
                    </div>
                    <div>
                      <label style={lbl}>Company</label>
                      <input
                        style={inp('company')}
                        placeholder="Company (optional)"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                        onFocus={() => setFocused('company')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>
                  <div
                    className="form-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 14,
                    }}
                  >
                    <div>
                      <label style={lbl}>Email Address *</label>
                      <input
                        type="email"
                        style={inp('email')}
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value })
                          if (errors.email)
                            setErrors({ ...errors, email: undefined })
                        }}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                      />
                      {errMsg('email')}
                    </div>
                    <div>
                      <label style={lbl}>Phone</label>
                      <input
                        type="tel"
                        style={inp('phone')}
                        placeholder="+1 (optional)"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Subject *</label>
                    <select
                      style={{ ...inp('subject'), paddingRight: 40 }}
                      value={form.subject}
                      onChange={(e) => {
                        setForm({ ...form, subject: e.target.value })
                        if (errors.subject)
                          setErrors({ ...errors, subject: undefined })
                      }}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Select a subject…</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errMsg('subject')}
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 7,
                      }}
                    >
                      <label style={{ ...lbl, marginBottom: 0 }}>
                        Message *
                      </label>
                      <span
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 9,
                          color: form.message.length > 20 ? C.green : C.textDim,
                        }}
                      >
                        {form.message.length} chars
                      </span>
                    </div>
                    <textarea
                      style={{ ...inp('message'), minHeight: 132 }}
                      placeholder="Tell us what you're looking for, quantities needed, timeline, or any questions…"
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value })
                        if (errors.message)
                          setErrors({ ...errors, message: undefined })
                      }}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                    {errMsg('message')}
                  </div>
                  <button
                    disabled={status === 'sending'}
                    style={{
                      padding: '15px 0',
                      borderRadius: 14,
                      background:
                        status === 'sending' ? C.accentDeep : C.accent,
                      border: 'none',
                      color: '#fff',
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      transition: 'background .15s',
                      boxShadow: '0 10px 32px rgba(196,120,48,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <svg
                          className="spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                  <p
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 9,
                      color: C.textDim,
                      textAlign: 'center',
                      letterSpacing: '0.14em',
                    }}
                  >
                    YOUR DATA IS NEVER SHARED · WE REPLY WITHIN 2 BUSINESS DAYS
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Reveal>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <InfoCard
                  icon="✉️"
                  label="General Enquiries"
                  value="info@asort.com"
                  sub="Products & general questions"
                  C={C}
                />
                <InfoCard
                  icon="📦"
                  label="Sales & Wholesale"
                  value="sales@asort.com"
                  sub="Bulk orders & trade pricing"
                  C={C}
                />
                <InfoCard
                  icon="🤝"
                  label="Partnerships"
                  value="partners@asort.com"
                  sub="Distribution & retail enquiries"
                  C={C}
                />
                <InfoCard
                  icon="📞"
                  label="Phone"
                  value="+998 90 123 45 67"
                  sub="Mon–Fri · 9am–6pm (Tashkent)"
                  C={C}
                />
                <InfoCard
                  icon="📍"
                  label="Head Office"
                  value="Tashkent, Uzbekistan"
                  sub="Mirzo Ulugbek District"
                  C={C}
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div
                style={{
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '22px 22px',
                  transition: 'background 0.3s ease',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: C.textMuted,
                    marginBottom: 16,
                  }}
                >
                  Typical Response Time
                </p>
                {[
                  { label: 'Product Enquiry', time: '< 24h', pct: 85 },
                  { label: 'Wholesale / Bulk', time: '< 12h', pct: 95 },
                  { label: 'Partnership', time: '2 days', pct: 70 },
                  { label: 'Press & Media', time: '3 days', pct: 55 },
                ].map(({ label, time, pct }) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 11,
                          color: C.textMid,
                          fontWeight: 500,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontWeight: 800,
                          fontSize: 13,
                          color: C.accent,
                        }}
                      >
                        {time}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        borderRadius: 99,
                        background: C.surface,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: `linear-gradient(90deg,${C.accent},${C.accentDeep})`,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={130}>
              <div
                style={{
                  background: C.navBg,
                  borderRadius: 16,
                  padding: '20px 22px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: C.accent,
                    marginBottom: 12,
                  }}
                >
                  Follow Asort
                </p>
                {[
                  { icon: '🔗', name: 'LinkedIn', handle: '@AsortFoods' },
                  { icon: '📸', name: 'Instagram', handle: '@asort.foods' },
                  { icon: '🐦', name: 'Twitter', handle: '@AsortFoods' },
                ].map(({ icon, name, handle }) => (
                  <div
                    key={name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,220,140,0.07)',
                      marginBottom: 7,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 9 }}
                    >
                      <span style={{ fontSize: 13 }}>{icon}</span>
                      <span
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: 11,
                          fontWeight: 500,
                          color: 'rgba(245,236,216,0.5)',
                        }}
                      >
                        {name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 10,
                        color: C.accent,
                      }}
                    >
                      {handle}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── FAQ ── */}
        <Reveal delay={60}>
          <section style={{ marginTop: 60 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.text,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Common Questions
              </h2>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: 14,
              }}
            >
              {[
                {
                  q: 'What is the minimum order quantity?',
                  a: 'For wholesale, MOQ is 500 kg per SKU. For retail distribution partners we work on case-pack quantities. Contact sales for your specific market.',
                },
                {
                  q: 'Do you offer product samples?',
                  a: "Yes — we offer sample packs for verified wholesale and retail partners. Select 'Wholesale / Bulk Order' in the form above and mention samples in your message.",
                },
                {
                  q: 'Which countries do you ship to?',
                  a: 'We currently distribute to 40+ countries. Use the contact form to confirm availability for your region and receive a freight quote.',
                },
                {
                  q: 'How long does delivery take?',
                  a: 'CIF delivery times range from 7–21 days depending on destination. Your account manager will confirm lead times when your order is placed.',
                },
              ].map(({ q, a }, i) => (
                <Reveal key={i} delay={i * 55}>
                  <div
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      padding: '20px 22px',
                      height: '100%',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.text,
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {q}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 12,
                        color: C.textMid,
                        lineHeight: 1.75,
                        fontWeight: 300,
                      }}
                    >
                      {a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
