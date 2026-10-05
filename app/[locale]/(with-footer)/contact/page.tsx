'use client'

/**
 * CONTACT PAGE — Asort Food Company
 *
 * EMAIL SETUP (EmailJS — free, no backend needed):
 * ─────────────────────────────────────────────────
 * Target Recipient: info@asort.com
 *
 * 1. Install:   npm install @emailjs/browser
 * 2. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
 * 3. Create a Service (Gmail / Outlook / etc.) → copy Service ID
 * 4. Create an Email Template with recipient info@asort.com and variables:
 *      {{to_email}}   {{from_name}}  {{company}}  {{from_email}}  {{phone}}
 *      {{subject}}    {{message}}
 * 5. Copy your Public Key from Account → API Keys
 * 6. Set environment variables NEXT_PUBLIC_EMAILJS_SERVICE_ID, etc. or fill below:
 */

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeContext'
import { useLanguage } from '@/components/LanguageContext'
import emailjs from '@emailjs/browser'

const TARGET_EMAIL = 'info@asort.uz'
const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_uzaz5t4'
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_481x88c'
const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '9SNmKDOE7_0UQqRKv'

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS — exact Asort palette
// ─────────────────────────────────────────────────────────────────────────────
const DARK = {
  bg: '#070E17',
  bgCard: '#0D1623',
  border: 'rgba(91,184,212,0.14)',
  borderFocus: '#5BB8D4',
  line: 'rgba(91,184,212,0.07)',
  accent: '#5BB8D4',
  accentDeep: '#3A8FAE',
  accentPale: 'rgba(91,184,212,0.08)',
  accentGlow: 'rgba(91,184,212,0.18)',
  text: '#E4F0F5',
  textMid: '#7AB4C8',
  textMuted: '#4A7A90',
  surface: 'rgba(91,184,212,0.06)',
  green: '#4DC98A',
  greenBg: 'rgba(46,160,100,0.12)',
  greenBorder: 'rgba(46,160,100,0.28)',
  error: '#F87171',
  errorBg: 'rgba(220,38,38,0.10)',
  errorBorder: 'rgba(220,38,38,0.28)',
}

const LIGHT = {
  bg: '#FDFBF7',
  bgCard: '#FFFFFF',
  border: '#E6E1D8',
  borderFocus: '#2D5F3E',
  line: 'rgba(230, 225, 216, 0.7)',
  accent: '#2D5F3E',
  accentDeep: '#1D3F27',
  accentPale: 'rgba(45, 95, 62, 0.05)',
  accentGlow: 'rgba(45, 95, 62, 0.12)',
  text: '#1E2520',
  textMid: '#505A53',
  textMuted: '#869389',
  surface: '#F2EFE6',
  green: '#2D5F3E',
  greenBg: 'rgba(45, 95, 62, 0.09)',
  greenBorder: 'rgba(45, 95, 62, 0.20)',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  errorBorder: '#FECACA',
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const T_CONTACT = {
  uz: {
    tagline: 'Aloqaga chiqish',
    heroTitle1: 'Muloqotni',
    heroTitle2: 'boshlaylik',
    heroSubtitle: "Mahsulotlarimizga qiziqasizmi, hamkor bo'lmoqchimisiz yoki shunchaki savolingiz bormi — biz 2 ish kuni ichida javob beramiz.",
    infoEmail: 'Elektron pochta',
    infoPhone: 'Telefon',
    infoOffice: 'Ofis',
    infoResponse: 'Javob berish',
    infoResponseVal: '2 ish kuni ichida',
    formTitle: 'Bizga xabar yuboring',
    formRequired: "* bilan belgilangan maydonlar to'ldirilishi shart",
    labelName: "To'liq ism-sharif *",
    labelCompany: 'Kompaniya',
    labelEmail: 'Elektron pochta manzili *',
    labelPhone: 'Telefon',
    labelSubject: 'Mavzu *',
    labelMessage: 'Xabar *',
    placeholderName: 'Ismingiz',
    placeholderCompany: 'Kompaniya (ixtiyoriy)',
    placeholderPhone: 'Telefon raqamingiz (ixtiyoriy)',
    placeholderSubject: 'Mavzuni tanlang…',
    placeholderMessage: "Nima qidirayotganingizni yozing — hajmi, muddati yoki boshqa savollar…",
    charCount: (n: number) => `${n} ta belgi`,
    subjects: [
      "Mahsulot so'rovi",
      'Ulgurji / Katta buyurtma',
      'Hamkorlik / Distribyutsiya',
      'Matbuot va OAV',
      'Karyera',
      'Boshqa',
    ],
    submitSend: 'Xabarni yuborish →',
    submitSending: 'Yuborilmoqda…',
    submitNote: "Ma'lumotlaringiz sir tutiladi · 2 ish kunida javob beramiz",
    successTitle: 'Xabar yuborildi',
    successMsg: (name: string, email: string) =>
      `Rahmat, ${name}. Biz 2 ish kuni ichida ${email} manziliga javob beramiz.`,
    successBtn: 'Yana bir xabar yuborish',
    errSend: "Yuborib bo'lmadi",
    errSendDetail: "EmailJS konfiguratsiyasini tekshiring va qayta urinib ko'ring.",
    errName: 'Ism kiritilishi shart',
    errEmail: 'Elektron pochta kiritilishi shart',
    errEmailInvalid: "Haqiqiy elektron pochtani kiriting",
    errSubject: 'Mavzuni tanlang',
    errMessage: 'Xabar kiritilishi shart',
    errMessageShort: 'Juda qisqa (kamida 20 ta belgi)',
    contactInfoTitle: "Aloqa ma'lumotlari",
    emailSub: 'Mahsulotlar va barcha savollar uchun',
    phoneSub: "Dush–Jum · 9:00–18:00 (Toshkent)",
    officeSub: "Mirzo Ulug'bek tumani",
    mapTitle: 'Bizning manzilimiz',
    mapOpen: 'Xaritada ochish →',
    faqTitle: "Ko'p beriladigan savollar",
    faqs: [
      {
        q: 'Minimal buyurtma miqdori qancha?',
        a: "Ulgurji savdo uchun har bir mahsulot turidan (SKU) kamida 500 kg. Chakana savdo hamkorlari qadoqlangan qutilar miqdorida ishlashlari mumkin.",
      },
      {
        q: 'Namunalar taqdim etasizmi?',
        a: "Ha — tasdiqlangan ulgurji va chakana savdo hamkorlari uchun. Bu haqda yuqoridagi xabaringizda aytib o'ting.",
      },
      {
        q: 'Qancha mijozlar va mahsulotlar bilan ishlaysiz?',
        a: "1000 dan ortiq mamnun mijozlar hamda distribyutorlar bilan hamkorlik qilamiz. Distributsiya sohasida 7 yillik tajribamiz mavjud bo'lib, 10+ turdagi yuqori sifatli mahsulotlarni taklif etamiz.",
      },
      {
        q: 'Yetkazib berish qancha vaqt oladi?',
        a: 'CIF yetkazib berish: manzilga qarab 7-21 kun. Shaxsiy menejeringiz aniq muddatlarni tasdiqlaydi.',
      },
    ],
  },
  ru: {
    tagline: 'Свяжитесь с нами',
    heroTitle1: 'Начнём',
    heroTitle2: 'диалог',
    heroSubtitle: 'Интересуетесь нашей продукцией, хотите стать партнёром или просто есть вопрос — мы ответим в течение 2 рабочих дней.',
    infoEmail: 'Электронная почта',
    infoPhone: 'Телефон',
    infoOffice: 'Офис',
    infoResponse: 'Время ответа',
    infoResponseVal: 'В течение 2 рабочих дней',
    formTitle: 'Напишите нам',
    formRequired: 'Поля, отмеченные *, обязательны для заполнения',
    labelName: 'Полное имя *',
    labelCompany: 'Компания',
    labelEmail: 'Электронная почта *',
    labelPhone: 'Телефон',
    labelSubject: 'Тема *',
    labelMessage: 'Сообщение *',
    placeholderName: 'Ваше имя',
    placeholderCompany: 'Компания (необязательно)',
    placeholderPhone: 'Ваш телефон (необязательно)',
    placeholderSubject: 'Выберите тему…',
    placeholderMessage: 'Опишите, что вас интересует — объём, сроки или другие вопросы…',
    charCount: (n: number) => `${n} символов`,
    subjects: [
      'Запрос по продукции',
      'Оптовый / крупный заказ',
      'Партнёрство / Дистрибуция',
      'Пресса и СМИ',
      'Карьера',
      'Другое',
    ],
    submitSend: 'Отправить сообщение →',
    submitSending: 'Отправляется…',
    submitNote: 'Ваши данные конфиденциальны · Ответим в течение 2 рабочих дней',
    successTitle: 'Сообщение отправлено',
    successMsg: (name: string, email: string) =>
      `Спасибо, ${name}. Мы ответим на адрес ${email} в течение 2 рабочих дней.`,
    successBtn: 'Отправить ещё одно сообщение',
    errSend: 'Не удалось отправить',
    errSendDetail: 'Проверьте конфигурацию EmailJS и попробуйте снова.',
    errName: 'Имя обязательно',
    errEmail: 'Электронная почта обязательна',
    errEmailInvalid: 'Введите корректный адрес электронной почты',
    errSubject: 'Выберите тему',
    errMessage: 'Сообщение обязательно',
    errMessageShort: 'Слишком короткое (минимум 20 символов)',
    contactInfoTitle: 'Контактная информация',
    emailSub: 'По вопросам продукции и общим запросам',
    phoneSub: 'Пн–Пт · 9:00–18:00 (Ташкент)',
    officeSub: 'Мирзо-Улугбекский район',
    mapTitle: 'Наш адрес',
    mapOpen: 'Открыть на карте →',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Каков минимальный объём заказа?',
        a: 'Для оптовой торговли — не менее 500 кг по каждой позиции (SKU). Розничные партнёры могут работать в единицах упакованных коробок.',
      },
      {
        q: 'Предоставляете ли вы образцы?',
        a: 'Да — для подтверждённых оптовых и розничных партнёров. Упомяните об этом в вашем сообщении выше.',
      },
      {
        q: 'Со сколькими клиентами и продуктами вы работаете?',
        a: 'Мы сотрудничаем с более чем 1000 довольными клиентами и дистрибьюторами. Имеем 7-летний опыт в сфере дистрибуции и предлагаем 10+ видов высококачественной продукции.',
      },
      {
        q: 'Сколько времени занимает доставка?',
        a: 'Доставка CIF: 7–21 день в зависимости от направления. Ваш персональный менеджер подтвердит точные сроки.',
      },
    ],
  },
  en: {
    tagline: 'Get in touch',
    heroTitle1: "Let's start",
    heroTitle2: 'a conversation',
    heroSubtitle: 'Interested in our products, looking to partner up, or just have a question — we reply within 2 business days.',
    infoEmail: 'Email',
    infoPhone: 'Phone',
    infoOffice: 'Office',
    infoResponse: 'Response time',
    infoResponseVal: 'Within 2 business days',
    formTitle: 'Send us a message',
    formRequired: 'Fields marked * are required',
    labelName: 'Full name *',
    labelCompany: 'Company',
    labelEmail: 'Email address *',
    labelPhone: 'Phone',
    labelSubject: 'Subject *',
    labelMessage: 'Message *',
    placeholderName: 'Your name',
    placeholderCompany: 'Company (optional)',
    placeholderPhone: 'Your phone (optional)',
    placeholderSubject: 'Select a subject…',
    placeholderMessage: 'Tell us what you are looking for — volume, timeline, or any other questions…',
    charCount: (n: number) => `${n} characters`,
    subjects: [
      'Product inquiry',
      'Wholesale / Bulk order',
      'Partnership / Distribution',
      'Press & Media',
      'Careers',
      'Other',
    ],
    submitSend: 'Send message →',
    submitSending: 'Sending…',
    submitNote: 'Your information is kept private · We reply within 2 business days',
    successTitle: 'Message sent',
    successMsg: (name: string, email: string) =>
      `Thank you, ${name}. We will reply to ${email} within 2 business days.`,
    successBtn: 'Send another message',
    errSend: 'Failed to send',
    errSendDetail: 'Please check your EmailJS configuration and try again.',
    errName: 'Name is required',
    errEmail: 'Email is required',
    errEmailInvalid: 'Please enter a valid email address',
    errSubject: 'Please select a subject',
    errMessage: 'Message is required',
    errMessageShort: 'Too short (minimum 20 characters)',
    contactInfoTitle: 'Contact information',
    emailSub: 'For product and general enquiries',
    phoneSub: 'Mon–Fri · 9:00–18:00 (Tashkent)',
    officeSub: 'Mirzo Ulugbek district',
    mapTitle: 'Our location',
    mapOpen: 'Open on map →',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'What is the minimum order quantity?',
        a: 'For wholesale trade, a minimum of 500 kg per SKU. Retail partners can work in units of packed cartons.',
      },
      {
        q: 'Do you provide samples?',
        a: 'Yes — for verified wholesale and retail partners. Mention it in your message above.',
      },
      {
        q: 'How many clients and products do you serve?',
        a: 'We serve over 1000 happy clients and distributors. We have 7 years of experience in distribution and offer 10+ premium product lines.',
      },
      {
        q: 'How long does delivery take?',
        a: 'CIF delivery: 7–21 days depending on destination. Your dedicated manager will confirm exact timelines.',
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type FormData = {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}
type Errors = Partial<Record<keyof FormData, string>>

// ─────────────────────────────────────────────────────────────────────────────
// BREAKPOINT
// ─────────────────────────────────────────────────────────────────────────────
type BP = 'mobile' | 'tablet' | 'desktop'
function useBreakpoint(): BP | undefined {
  const [bp, setBp] = useState<BP | undefined>(undefined)
  useEffect(() => {
    const m = () => {
      const w = window.innerWidth
      setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    m()
    window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [])
  return bp
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────────────────────────────────────
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
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'none' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isDark = theme === 'dark'
  const C = isDark ? DARK : LIGHT
  const tx = T_CONTACT[language] || T_CONTACT.uz

  const bp = useBreakpoint()
  const ready = bp !== undefined
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? '16px' : isTablet ? '28px' : '56px'

  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )
  const [focused, setFocused] = useState<string | null>(null)

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = tx.errName
    if (!form.email.trim()) e.email = tx.errEmail
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = tx.errEmailInvalid
    if (!form.subject) e.subject = tx.errSubject
    if (!form.message.trim()) e.message = tx.errMessage
    else if (form.message.trim().length < 20)
      e.message = tx.errMessageShort
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setStatus('sending')
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          to_email: TARGET_EMAIL,
          recipient_email: TARGET_EMAIL,
          from_name: form.name,
          name: form.name,
          user_name: form.name,
          from_email: form.email,
          email: form.email,
          user_email: form.email,
          company: form.company || '—',
          phone: form.phone || '—',
          subject: form.subject,
          message: form.message,
        },
        EJS_KEY
      )
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  // Shared input style factory
  const inp = (field: keyof FormData): React.CSSProperties => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: 2,
    border: `1px solid ${errors[field] ? C.error : focused === field ? C.borderFocus : C.border}`,
    background: errors[field] ? C.errorBg : C.surface,
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 13,
    color: C.text,
    transition: 'border-color 0.15s, background 0.15s',
    outline: 'none',
  })

  const lbl: React.CSSProperties = {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: '0.30em',
    textTransform: 'uppercase' as const,
    color: C.textMuted,
    display: 'block',
    marginBottom: 7,
  }

  const errMsg = (field: keyof FormData) =>
    errors[field] ? (
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 10,
          color: C.error,
          marginTop: 4,
        }}
      >
        {errors[field]}
      </p>
    ) : null

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        transition: 'background 0.3s',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:99px; }
        input::placeholder, textarea::placeholder { color:${C.textMuted}; font-family:'DM Sans',sans-serif; }
        input:focus, textarea:focus, select:focus { outline:none; }
        textarea { resize:vertical; }
        option { background:${C.bgCard}; color:${C.text}; }

        select {
          appearance:none; cursor:pointer;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='5'%3E%3Cpath d='M0 0l4.5 5 4.5-5z' fill='${encodeURIComponent(C.textMuted)}'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 13px center;
        }

        @keyframes spin    { to { transform:rotate(360deg) } }
        @keyframes fadeIn  { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:none} }
        @keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }

        .spin  { animation:spin 0.8s linear infinite; }
        .sIn   { animation:fadeIn 0.35s cubic-bezier(.22,.68,0,1.1) forwards; }
        .shake { animation:shake 0.35s ease; }

        .info-row {
          display:flex; align-items:flex-start; gap:14px;
          padding:14px 0;
          border-bottom:1px solid ${C.line};
        }
        .info-row:last-child { border-bottom:none; }

        .submit-btn {
          width:100%; padding:14px 0;
          border-radius:2px; border:none;
          background:${C.accent}; color:#fff;
          font-family:'DM Sans',sans-serif; font-weight:600;
          font-size:10px; letter-spacing:0.22em; text-transform:uppercase;
          cursor:pointer; transition:opacity 0.15s;
          display:flex; align-items:center; justify-content:center; gap:8px;
          box-shadow: ${isDark ? '0 6px 20px rgba(91,184,212,0.20)' : '0 6px 20px rgba(42,126,156,0.18)'};
        }
        .submit-btn:hover:not(:disabled) { opacity:0.88; }
        .submit-btn:disabled { opacity:0.6; cursor:not-allowed; }
      `}</style>

      {!ready && <div style={{ minHeight: '100vh' }} />}
      {ready && (
        <>
          {/* ── HERO ──────────────────────────────────────────────── */}
          <div
            style={{
              background: isDark
                ? `linear-gradient(170deg, #0B1928 0%, ${DARK.bg} 65%)`
                : `linear-gradient(170deg, #E2EFF5 0%, ${LIGHT.bg} 65%)`,
              borderBottom: `1px solid ${C.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Grid lines */}
            <div
              aria-hidden
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            >
              {[20, 40, 60, 80].map((x) => (
                <div
                  key={x}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${x}%`,
                    width: 1,
                    background: isDark
                      ? 'rgba(91,184,212,0.03)'
                      : 'rgba(42,126,156,0.04)',
                  }}
                />
              ))}
            </div>

            <div
              style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: `${isMobile ? '90px' : '110px'} ${px} ${isMobile ? '36px' : '56px'}`,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 16,
                      paddingTop: '12px',
                    }}
                  >
                    <div
                      style={{ width: 20, height: 1, background: C.accent }}
                    />
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 9,
                        fontWeight: 500,
                        letterSpacing: '0.46em',
                        textTransform: 'uppercase',
                        color: C.accent,
                      }}
                    >
                      {tx.tagline}
                    </p>
                  </div>
                  <h1
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 300,
                      fontSize: isMobile
                        ? '2.8rem'
                        : 'clamp(3.2rem,7vw,5.5rem)',
                      color: C.text,
                      lineHeight: 0.92,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {tx.heroTitle1}
                    <br />
                    <span
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 700,
                        color: C.accent,
                      }}
                    >
                      {tx.heroTitle2}
                    </span>
                  </h1>
                </div>
                {!isMobile && (
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontWeight: 300,
                      fontSize: 13,
                      color: C.textMid,
                      maxWidth: 340,
                      lineHeight: 1.88,
                    }}
                  >
                    {tx.heroSubtitle}
                  </p>
                )}
              </div>

              {/* Quick info strip */}
              <div
                style={{
                  display: 'flex',
                  gap: isMobile ? 16 : 32,
                  marginTop: isMobile ? 28 : 40,
                  paddingTop: isMobile ? 20 : 28,
                  borderTop: `1px solid ${C.border}`,
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { label: tx.infoEmail, val: 'info@asort.uz' },
                  { label: tx.infoPhone, val: '+998 99 010 04 90' },
                  { label: tx.infoOffice, val: "Toshkent, O'zbekiston" },
                  { label: tx.infoResponse, val: tx.infoResponseVal },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 8,
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        color: C.textMuted,
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        color: C.textMid,
                      }}
                    >
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MAIN CONTENT ─────────────────────────────────────── */}
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: `${isMobile ? '36px' : '56px'} ${px} 80px`,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : isTablet
                    ? '1fr'
                    : '1fr 400px',
                gap: isMobile ? 32 : 40,
                alignItems: 'start',
              }}
            >
              {/* ── LEFT: FORM ─────────────────────────────────── */}
              <Reveal>
                <div
                  style={{
                    border: `1px solid ${C.border}`,
                    background: C.bgCard,
                    overflow: 'hidden',
                  }}
                >
                  {/* Form header */}
                  <div
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, #0B1928 0%, ${DARK.bgCard} 100%)`
                        : `linear-gradient(135deg, #E2EFF5 0%, #FFFFFF 100%)`,
                      borderBottom: `1px solid ${C.border}`,
                      borderTop: `3px solid ${C.accent}`,
                      padding: isMobile ? '20px 20px' : '24px 32px',
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontStyle: 'italic',
                        fontWeight: 300,
                        fontSize: isMobile ? '1.6rem' : '2rem',
                        color: C.text,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {tx.formTitle}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 12,
                        color: C.textMuted,
                        fontWeight: 300,
                      }}
                    >
                      {tx.formRequired}
                    </p>
                  </div>

                  {/* Success state */}
                  {status === 'sent' ? (
                    <div
                      className="sIn"
                      style={{
                        padding: isMobile ? '48px 20px' : '64px 48px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          border: `1px solid ${C.greenBorder}`,
                          background: C.greenBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 26,
                            color: C.green,
                          }}
                        >
                          ✓
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontWeight: 600,
                          fontSize: '1.8rem',
                          color: C.text,
                        }}
                      >
                        {tx.successTitle}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 13,
                          color: C.textMid,
                          lineHeight: 1.78,
                          fontWeight: 300,
                          maxWidth: 320,
                        }}
                      >
                        {tx.successMsg(form.name, form.email)}
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
                          marginTop: 4,
                          padding: '11px 28px',
                          borderRadius: 2,
                          background: C.accent,
                          border: 'none',
                          color: '#fff',
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 600,
                          fontSize: 10,
                          letterSpacing: '0.20em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                        }}
                      >
                        {tx.successBtn}
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: isMobile ? '20px 20px 28px' : '28px 32px 36px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                      }}
                    >
                      {/* Error banner */}
                      {status === 'error' && (
                        <div
                          className="shake"
                          style={{
                            padding: '12px 16px',
                            border: `1px solid ${C.errorBorder}`,
                            background: C.errorBg,
                            borderRadius: 2,
                            display: 'flex',
                            gap: 10,
                            alignItems: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              color: C.error,
                              fontSize: 14,
                              lineHeight: 1,
                              marginTop: 1,
                            }}
                          >
                            !
                          </span>
                          <div>
                            <p
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 12,
                                fontWeight: 600,
                                color: C.error,
                              }}
                            >
                              {tx.errSend}
                            </p>
                            <p
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 11,
                                color: C.error,
                                opacity: 0.75,
                                marginTop: 2,
                              }}
                            >
                              {tx.errSendDetail}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Row 1: Name + Company */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                          gap: 14,
                        }}
                      >
                        <div>
                          <label style={lbl}>{tx.labelName}</label>
                          <input
                            style={inp('name')}
                            placeholder={tx.placeholderName}
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
                          <label style={lbl}>{tx.labelCompany}</label>
                          <input
                            style={inp('company')}
                            placeholder={tx.placeholderCompany}
                            value={form.company}
                            onChange={(e) =>
                              setForm({ ...form, company: e.target.value })
                            }
                            onFocus={() => setFocused('company')}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>

                      {/* Row 2: Email + Phone */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                          gap: 14,
                        }}
                      >
                        <div>
                          <label style={lbl}>{tx.labelEmail}</label>
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
                          <label style={lbl}>{tx.labelPhone}</label>
                          <input
                            type="tel"
                            style={inp('phone')}
                            placeholder={tx.placeholderPhone}
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused(null)}
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label style={lbl}>{tx.labelSubject}</label>
                        <select
                          style={{ ...inp('subject'), paddingRight: 36 }}
                          value={form.subject}
                          onChange={(e) => {
                            setForm({ ...form, subject: e.target.value })
                            if (errors.subject)
                                setErrors({ ...errors, subject: undefined })
                          }}
                          onFocus={() => setFocused('subject')}
                          onBlur={() => setFocused(null)}
                        >
                          <option value="">{tx.placeholderSubject}</option>
                          {tx.subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {errMsg('subject')}
                      </div>

                      {/* Message */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 7,
                          }}
                        >
                          <label style={{ ...lbl, marginBottom: 0 }}>
                            {tx.labelMessage}
                          </label>
                          <span
                            style={{
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: 9,
                              color:
                                form.message.length >= 20
                                  ? C.green
                                  : C.textMuted,
                            }}
                          >
                            {tx.charCount(form.message.length)}
                          </span>
                        </div>
                        <textarea
                          style={{ ...inp('message'), minHeight: 120 }}
                          placeholder={tx.placeholderMessage}
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

                      {/* Submit */}
                      <button
                        className="submit-btn"
                        disabled={status === 'sending'}
                        onClick={handleSubmit}
                      >
                        {status === 'sending' ? (
                          <>
                            <svg
                              className="spin"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            >
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                            </svg>
                            {tx.submitSending}
                          </>
                        ) : (
                          tx.submitSend
                        )}
                      </button>

                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 9,
                          color: C.textMuted,
                          textAlign: 'center',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {tx.submitNote}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* ── RIGHT: SIDEBAR ─────────────────────────────── */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? 20 : 24,
                }}
              >
                {/* Contact info */}
                <Reveal delay={60}>
                  <div
                    style={{
                      border: `1px solid ${C.border}`,
                      background: C.bgCard,
                    }}
                  >
                    <div
                      style={{
                        padding: isMobile ? '16px 16px 4px' : '20px 24px 6px',
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 8,
                          letterSpacing: '0.32em',
                          textTransform: 'uppercase',
                          color: C.textMuted,
                        }}
                      >
                        {tx.contactInfoTitle}
                      </p>
                    </div>
                    <div
                      style={{
                        padding: isMobile ? '0 16px 8px' : '0 24px 10px',
                      }}
                    >
                      {[
                        {
                          label: tx.infoEmail,
                          val: 'info@asort.uz',
                          href: 'mailto:info@asort.uz',
                          sub: tx.emailSub,
                        },
                        {
                          label: tx.infoPhone,
                          val: '+998 99 010 04 90',
                          href: 'tel:+998990100490',
                          sub: tx.phoneSub,
                        },
                        {
                          label: 'Telegram',
                          val: '@asortuz',
                          href: 'https://t.me/asortuz',
                          sub: 't.me/asortuz',
                        },
                        {
                          label: 'Instagram',
                          val: '@asort.uz',
                          href: 'https://instagram.com/asort.uz',
                          sub: 'instagram.com/asort.uz',
                        },
                        {
                          label: language === 'ru' ? 'Главный офис' : language === 'en' ? 'Head office' : 'Bosh ofis',
                          val: "Toshkent, O'zbekiston",
                          href: undefined,
                          sub: tx.officeSub,
                        },
                      ].map(({ label, val, href, sub }) => (
                        <div key={label} className="info-row">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 8,
                                letterSpacing: '0.26em',
                                textTransform: 'uppercase',
                                color: C.textMuted,
                                marginBottom: 3,
                              }}
                            >
                              {label}
                            </p>
                            {href ? (
                              <a
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                style={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: C.text,
                                  textDecoration: 'none',
                                  transition: 'color 0.18s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = C.text)}
                              >
                                {val}
                              </a>
                            ) : (
                              <p
                                style={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: C.text,
                                }}
                              >
                                {val}
                              </p>
                            )}
                            {sub && (
                              <p
                                style={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: 11,
                                  color: C.textMuted,
                                  marginTop: 1,
                                }}
                              >
                                {sub}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Map — OpenStreetMap embed, no API key needed */}
                <Reveal delay={100}>
                  <div
                    style={{
                      border: `1px solid ${C.border}`,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: isMobile ? '12px 16px' : '14px 20px',
                        borderBottom: `1px solid ${C.border}`,
                        background: C.bgCard,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 8,
                          letterSpacing: '0.28em',
                          textTransform: 'uppercase',
                          color: C.textMuted,
                        }}
                      >
                        {tx.mapTitle}
                      </p>
                      <a
                        href="https://www.openstreetmap.org/?mlat=41.3111&mlon=69.2797#map=15/41.3111/69.2797"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 9,
                          color: C.accent,
                          textDecoration: 'none',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {tx.mapOpen}
                      </a>
                    </div>
                    <iframe
                      title="Asort Head Office — Tashkent"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=69.2597%2C41.2911%2C69.2997%2C41.3311&layer=mapnik&marker=41.3111%2C69.2797"
                      style={{
                        width: '100%',
                        height: isMobile ? 200 : 260,
                        border: 'none',
                        display: 'block',
                        filter: isDark
                          ? 'invert(0.88) hue-rotate(185deg) brightness(0.9)'
                          : 'none',
                      }}
                      loading="lazy"
                    />
                  </div>
                </Reveal>

                {/* FAQ — compact accordion */}
                <Reveal delay={130}>
                  <div
                    style={{
                      border: `1px solid ${C.border}`,
                      background: C.bgCard,
                    }}
                  >
                    <div
                      style={{
                        padding: isMobile ? '12px 16px' : '14px 20px',
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 8,
                          letterSpacing: '0.32em',
                          textTransform: 'uppercase',
                          color: C.textMuted,
                        }}
                      >
                        {tx.faqTitle}
                      </p>
                    </div>
                    <div
                      style={{ padding: isMobile ? '4px 0 8px' : '4px 0 8px' }}
                    >
                      {tx.faqs.map(({ q, a }, i) => (
                        <FaqRow key={i} q={q} a={a} C={C} isMobile={isMobile} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ ROW — inline accordion
// ─────────────────────────────────────────────────────────────────────────────
function FaqRow({
  q,
  a,
  C,
  isMobile,
}: {
  q: string
  a: string
  C: typeof DARK
  isMobile: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: isMobile ? '12px 16px' : '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: C.text,
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: C.accent,
            fontSize: 14,
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            color: C.textMid,
            lineHeight: 1.72,
            fontWeight: 300,
            padding: isMobile ? '0 16px 14px' : '0 20px 14px',
          }}
        >
          {a}
        </p>
      )}
    </div>
  )
}
