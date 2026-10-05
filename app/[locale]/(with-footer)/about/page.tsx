'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/ThemeContext'
import { useLanguage } from '@/components/LanguageContext'
import base from '@/src/lib/basePath'
import { FiShield, FiMap, FiGlobe } from 'react-icons/fi'
import { GiLeafSkeleton } from 'react-icons/gi'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ── Translations ─────────────────────────────────────────────────────────────
const T = {
  uz: {
    locationTag: 'Toshkent, O\'zbekiston',
    heroLine1: 'Daladan',
    heroLine2: 'Dasturxongacha',
    heroLead: 'Asort bir muhim g\'oya asosida yaratilgan: yuqori sifatli oziq-ovqat mahsulotlari shaffof, ishonchli va barcha bizneslar uchun mavjud bo\'lishi kerak. 2015-yildan buyon biz dunyoning eng yaxshi fermer xo\'jaliklarini 1000 dan ortiq mamnun mijozlar va distribyutorlar bilan bog\'lab kelmoqdamiz.',
    statsLabel: ['Mamnun mijozlar', 'Distributsiya sohasida tajriba', 'Mahsulotlar'],
    missionEyebrow: 'Bizning vazifamiz',
    missionTitle: 'Nima uchun Asort mavjud',
    missionBody: 'Jahon bozorida oziq-ovqat mahsulotlari ko\'pincha shaffof bo\'lmagan ta\'minot zanjirlari, noaniq standartlar va iste\'molchi bilan bog\'liq bo\'lmagan narxlar orqali sotiladi. Asort boshqacha yo\'l tutadi. Bizning jamoamiz manba — fermadan tortib — oxirigacha kuzatadi, har bir mahsulotni o\'z talablari asosida sertifikatlaydi va narxlarni adolatli belgilaydi.',
    valuesEyebrow: 'Bizning qadriyatlarimiz',
    valuesTitle: 'Biz nima uchun kurashib kelmoqdamiz',
    values: [
      {
        title: 'Murosasiz sifat',
        body: 'Har bir mahsulot partiyasi ishlab chiqarishdan chiqishidan oldin 12 bosqichli sifat nazoratidan o\'tadi. Boshqalar qabul qiladigan narsani biz rad etamiz.',
        num: '12', numLabel: 'Nazorat bosqichi',
      },
      {
        title: 'To\'g\'ridan-to\'g\'ri fermerlardan',
        body: 'Biz mahsulotlarni to\'g\'ridan-to\'g\'ri hamkor fermer xo\'jaliklaridan olamiz — vositachilarsiz. Daladan tortib sizning dasturxoningizgacha to\'liq kuzatuv mavjud.',
        num: '100%', numLabel: 'To\'g\'ridan-to\'g\'ri',
      },
      {
        title: 'Barqaror ishlab chiqarish',
        body: '80% qayta ishlanadigan qadoqlash, suvni tejovchi ishlab chiqarish jarayoni va fermerlar bilan adolatli hamkorlik. To\'g\'ri yo\'l bilan qurilgan biznes.',
        num: '80%', numLabel: 'Qayta ishlanadi',
      },
      {
        title: 'Keng mijozlar tarmog\'i',
        body: '1000 dan ortiq mamnun mijozlar va distribyutorlar bilan faoliyat yuritamiz va ularning ishonchini qadrlaymiz.',
        num: '1000+', numLabel: 'Mamnun mijozlar',
      },
    ],
    timelineEyebrow: 'Bizning sayohatimiz',
    timelineTitle: 'Asort tarixidan lavhalar',
    timeline: [
      { year: '2015', title: 'G\'oyaning boshlanishi', body: 'Kompaniya kichik omborda faqat bitta mahsulot — yuqori sifatli uzun donli guruch bilan tashkil etildi. Maqsad oddiy edi: ommaviy oziq-ovqat mahsulotlarida ochiqlik va ishonchlilikni ta\'minlash.' },
      { year: '2017', title: 'Birinchi eksport', body: 'Asort ilk bor xalqaro bozorga chiqib, Markaziy Osiyodagi uchta davlatga mahsulot yetkazib berdi. Sifat esa hech qanday tarjimaga muhtoj emas.' },
      { year: '2019', title: 'Mahsulotlar qatori kengaydi', body: 'Shakar, grechka va qizil yasmiq mahsulotlar qatoriga qo\'shildi. Aynan shu yili Asort\'ning ranglar bilan ajratilgan qadoqlash tizimi yaratildi.' },
      { year: '2021', title: 'ISO sertifikati', body: 'Barcha mahsulotlar uchun xalqaro oziq-ovqat xavfsizligi bo\'yicha ISO sertifikati qo\'lga kiritildi. Va\'da amalda tasdiqlandi.' },
      { year: '2023', title: '1000+ mamnun mijozlar', body: 'Asort mahsulotlari 1000 dan ortiq mamnun mijozlar va hamkorlarga yetib bordi — kichik do\'konlardan tortib yirik milliy savdo tarmoqlarigacha.' },
      { year: '2025', title: 'Kelajak sari', body: 'Superfood va maxsus don mahsulotlari yo\'nalishiga kengayish rejalashtirilmoqda. Daladan dasturxongacha bo\'lgan yo\'l yanada qisqarmoqda.' },
    ],
    certsEyebrow: 'Sertifikatlar va standartlar',
    certsTitle: 'Sifat qog\'ozda emas — ishda',
    certs: [
      { code: 'Davlat standarti', desc: 'O\'zbekiston sifat talablari asosida ishlab chiqarilgan' },
      { code: 'Gigiyena nazorati', desc: 'Sanitariya va oziq-ovqat xavfsizligi talablariga mos' },
      { code: 'Halol sertifikat', desc: 'Halol ishlab chiqarish qoidalariga muvofiq' },
      { code: 'Ekologik ishlab chiqarish', desc: 'Tabiatga zarar yetkazmaydigan jarayonlar' },
    ],
    ctaEyebrow: 'Ulgurji savdo va tarqatish',
    ctaTitle: 'Asort bilan ishlashga tayyormisiz?',
    ctaTitleItalic: 'Keling, gaplashamiz.',
    ctaBody: 'Doimiy ravishda yetkazib beruvchilarni kengaytirib boramiz. Bizning hamkorlar tarmog\'imizga qo\'shiling.',
    ctaContact: 'Bog\'lanish',
    ctaProducts: 'Mahsulotlarni ko\'rish',
    stats: [
      { value: '1000+', label: 'Mamnun mijozlar' },
      { value: '7', label: 'Distributsiya sohasida 7 yillik tajriba' },
      { value: '10+', label: 'Mahsulotlar' },
    ],
  },
  ru: {
    locationTag: 'Ташкент, Узбекистан',
    heroLine1: 'С поля —',
    heroLine2: 'на стол',
    heroLead: 'Asort создан на основе одной важной идеи: качественные продукты питания должны быть прозрачными, надёжными и доступными для любого бизнеса. С 2015 года мы связываем лучшие фермерские хозяйства мира с более чем 1000 довольными клиентами и дистрибьюторами.',
    statsLabel: ['Довольных клиентов', 'Опыт в дистрибуции', 'Продуктов'],
    missionEyebrow: 'Наша миссия',
    missionTitle: 'Зачем существует Asort',
    missionBody: 'На мировом рынке продукты питания часто продаются через непрозрачные цепочки поставок, размытые стандарты и цены, не связанные с потребителем. Asort идёт другим путём. Наша команда отслеживает происхождение — от фермы до конечного получателя, сертифицирует каждый продукт по собственным стандартам и устанавливает справедливые цены.',
    valuesEyebrow: 'Наши ценности',
    valuesTitle: 'За что мы боремся',
    values: [
      {
        title: 'Бескомпромиссное качество',
        body: 'Каждая партия продукции проходит 12-этапный контроль качества до выхода с производства. Мы отвергаем то, что другие принимают.',
        num: '12', numLabel: 'Этапов контроля',
      },
      {
        title: 'Напрямую от фермеров',
        body: 'Мы закупаем продукцию напрямую у партнёрских фермерских хозяйств — без посредников. Полная прослеживаемость от поля до вашего стола.',
        num: '100%', numLabel: 'Прямые поставки',
      },
      {
        title: 'Устойчивое производство',
        body: '80% перерабатываемая упаковка, водосберегающие производственные процессы и справедливое сотрудничество с фермерами. Бизнес, построенный правильным путём.',
        num: '80%', numLabel: 'Перерабатывается',
      },
      {
        title: 'Широкая сеть клиентов',
        body: 'Мы работаем с более чем 1000 довольных клиентов и дистрибьюторов, дорожа доверием каждого из них.',
        num: '1000+', numLabel: 'Довольных клиентов',
      },
    ],
    timelineEyebrow: 'Наш путь',
    timelineTitle: 'История Asort',
    timeline: [
      { year: '2015', title: 'Зарождение идеи', body: 'Компания была основана на небольшом складе с единственным продуктом — высококачественным длиннозёрным рисом. Цель была простой: обеспечить прозрачность и надёжность в производстве массовых продуктов питания.' },
      { year: '2017', title: 'Первый экспорт', body: 'Asort впервые вышел на международный рынок, поставив продукцию в три страны Центральной Азии. Качество не требует перевода.' },
      { year: '2019', title: 'Расширение ассортимента', body: 'К продуктовой линейке добавились сахар, гречка и красная чечевица. В том же году была создана цветовая система упаковки Asort.' },
      { year: '2021', title: 'ISO-сертификация', body: 'Была получена международная сертификация ISO по безопасности пищевых продуктов для всей продуктовой линейки. Обещание подтверждено на практике.' },
      { year: '2023', title: '1000+ довольных клиентов', body: 'Продукция Asort достигла более 1000 довольных клиентов и партнёров — от небольших магазинов до крупных национальных торговых сетей.' },
      { year: '2025', title: 'В будущее', body: 'Планируется расширение в направлении суперфудов и специальных зерновых продуктов. Путь от поля до стола становится всё короче.' },
    ],
    certsEyebrow: 'Сертификаты и стандарты',
    certsTitle: 'Качество — не на бумаге, а в деле',
    certs: [
      { code: 'Государственный стандарт', desc: 'Произведено в соответствии с требованиями к качеству Узбекистана' },
      { code: 'Санитарный контроль', desc: 'Соответствует санитарным и пищевым стандартам безопасности' },
      { code: 'Халяль-сертификат', desc: 'Произведено в соответствии с нормами халяльного производства' },
      { code: 'Экологичное производство', desc: 'Процессы, не наносящие вреда окружающей среде' },
    ],
    ctaEyebrow: 'Оптовая торговля и дистрибуция',
    ctaTitle: 'Готовы работать с Asort?',
    ctaTitleItalic: 'Давайте поговорим.',
    ctaBody: 'Мы постоянно расширяем сеть поставщиков. Присоединяйтесь к нашей партнёрской сети.',
    ctaContact: 'Связаться',
    ctaProducts: 'Посмотреть продукты',
    stats: [
      { value: '1000+', label: 'Довольных клиентов' },
      { value: '7', label: '7 лет опыта в сфере дистрибуции' },
      { value: '10+', label: 'Продуктов' },
    ],
  },
  en: {
    locationTag: 'Tashkent, Uzbekistan',
    heroLine1: 'Farm',
    heroLine2: 'to Table',
    heroLead: 'Asort was built on one important idea: high-quality food products should be transparent, reliable, and accessible to any business. Since 2015 we have been connecting the world\'s best farms with more than 1000 happy clients and distributors.',
    statsLabel: ['Happy clients', 'Distribution experience', 'Products'],
    missionEyebrow: 'Our mission',
    missionTitle: 'Why Asort exists',
    missionBody: 'In the global food market, products are often sold through opaque supply chains, vague standards, and consumer-disconnected pricing. Asort takes a different approach. Our team traces origin — from the farm all the way to delivery — certifies each product against its own standards, and prices things fairly.',
    valuesEyebrow: 'Our values',
    valuesTitle: 'What we stand for',
    values: [
      {
        title: 'Uncompromising quality',
        body: 'Every product batch passes a 12-stage quality check before leaving production. We reject what others accept.',
        num: '12', numLabel: 'Quality stages',
      },
      {
        title: 'Direct from farmers',
        body: 'We source products directly from partner farms — no middlemen. Full traceability from field to your table.',
        num: '100%', numLabel: 'Direct sourcing',
      },
      {
        title: 'Sustainable production',
        body: '80% recyclable packaging, water-saving production processes, and fair cooperation with farmers. A business built the right way.',
        num: '80%', numLabel: 'Recyclable',
      },
      {
        title: 'Broad client network',
        body: 'We work with more than 1000 happy clients and partner distributors, valuing every partnership.',
        num: '1000+', numLabel: 'Happy clients',
      },
    ],
    timelineEyebrow: 'Our journey',
    timelineTitle: 'The Asort story',
    timeline: [
      { year: '2015', title: 'The idea begins', body: 'The company was founded in a small warehouse with a single product — high-quality long-grain rice. The goal was simple: bring transparency and reliability to mass food products.' },
      { year: '2017', title: 'First export', body: 'Asort entered the international market for the first time, delivering to three countries in Central Asia. Quality needs no translation.' },
      { year: '2019', title: 'Range expanded', body: 'Sugar, buckwheat and red lentils joined the product line. That same year Asort\'s colour-coded packaging system was created.' },
      { year: '2021', title: 'ISO certification', body: 'International ISO food-safety certification was obtained for the full product range. A promise proved in practice.' },
      { year: '2023', title: '1000+ happy clients', body: 'Asort products reached more than 1000 happy clients and partners — from small shops to large national retail chains.' },
      { year: '2025', title: 'Looking ahead', body: 'Expansion into superfoods and speciality grains is planned. The journey from field to table keeps getting shorter.' },
    ],
    certsEyebrow: 'Certifications & standards',
    certsTitle: 'Quality in practice, not just on paper',
    certs: [
      { code: 'State Standard', desc: 'Produced in compliance with Uzbekistan quality requirements' },
      { code: 'Hygiene control', desc: 'Compliant with sanitary and food-safety standards' },
      { code: 'Halal certified', desc: 'Produced in accordance with halal production rules' },
      { code: 'Eco-production', desc: 'Processes that do not harm the environment' },
    ],
    ctaEyebrow: 'Wholesale & distribution',
    ctaTitle: 'Ready to work with Asort?',
    ctaTitleItalic: 'Let\'s talk.',
    ctaBody: 'We are constantly expanding our supplier network. Join our partner network.',
    ctaContact: 'Get in touch',
    ctaProducts: 'View products',
    stats: [
      { value: '1000+', label: 'Happy clients' },
      { value: '7', label: '7 years of experience in distribution' },
      { value: '10+', label: 'Products' },
    ],
  },
}

// ── Theme tokens ─────────────────────────────────────────────────────────────
const DARK_C = {
  bg: '#080F18', bgCard: '#0D1623', bgElevated: '#111E2E',
  accent: '#5BB8D4', accentDeep: '#3A8FAE', accentSoft: '#7ECDE6',
  accentGlow: 'rgba(91,184,212,0.10)', accentGlowStrong: 'rgba(91,184,212,0.20)',
  text: 'rgba(228,240,245,0.94)', textMuted: 'rgba(180,210,222,0.60)',
  textDim: 'rgba(160,196,212,0.34)', border: 'rgba(91,184,212,0.14)',
  heroStart: '#080F18', heroEnd: '#0C1828', grain: 'rgba(91,184,212,0.022)',
}
const LIGHT_C = {
  bg: '#FDFBF7', bgCard: '#FFFFFF', bgElevated: '#FAF6EE',
  accent: '#2D5F3E', accentDeep: '#1D3F27', accentSoft: '#4E8460',
  accentGlow: 'rgba(45,95,62,0.05)', accentGlowStrong: 'rgba(45,95,62,0.10)',
  text: '#1E2520', textMuted: '#505A53', textDim: '#869389',
  border: '#E6E1D8', heroStart: '#FAF6EE', heroEnd: '#F2EFE6',
  grain: 'rgba(45,95,62,0.015)',
}

// ── Responsive hook ───────────────────────────────────────────────────────────
function useWidth() {
  const [w, setW] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.innerWidth
    return 1200
  })
  useEffect(() => {
    const update = () => setW(window.innerWidth)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return w
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.06 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

// ── CountUp ───────────────────────────────────────────────────────────────────
function CountUp({ end, duration = 1200 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const target = parseInt(end) || 0
  const suffix = end.replace(/[0-9]/g, '')
  useEffect(() => {
    let startTs: number | null = null; let af: number
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) af = window.requestAnimationFrame(step)
    }
    af = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(af)
  }, [target, duration])
  return <span>{count}{suffix}</span>
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const params = useParams()
  const locale = (params?.locale || 'uz') as string
  const C = theme === 'dark' ? DARK_C : LIGHT_C
  const isDark = theme === 'dark'
  const w = useWidth()
  const t = T[language as keyof typeof T] || T.uz

  const isMobile = w < 640
  const isTablet = w < 900
  const px = isMobile ? '20px' : isTablet ? '32px' : '48px'
  const sectionMb = isMobile ? 64 : 104

  const valueIcons = [FiShield, FiMap, GiLeafSkeleton, FiGlobe]

  return (
    <div style={{ background: C.bg, minHeight: '100vh', transition: 'background 0.3s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
        ::selection { background: ${C.accent}33; color: ${C.text}; }
        a { text-decoration: none; }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        @keyframes shimmerLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .hero-float-img {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .val-card {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
          border-radius: 4px !important;
          position: relative;
          overflow: hidden;
        }
        .val-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, ${C.accent}, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .val-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: ${C.accent} !important;
          box-shadow: 0 24px 48px ${isDark ? 'rgba(91,184,212,0.12)' : 'rgba(45,95,62,0.10)'} !important;
        }
        .val-card:hover::after {
          opacity: 1;
        }
        .val-card:hover .val-icon-box {
          transform: scale(1.12) rotate(6deg);
          background: ${C.accentGlowStrong} !important;
          border-color: ${C.accent} !important;
        }

        .cert-card {
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
          border-radius: 4px !important;
        }
        .cert-card:hover {
          transform: translateY(-6px);
          border-color: ${C.accent} !important;
          box-shadow: 0 16px 36px ${isDark ? 'rgba(91,184,212,0.10)' : 'rgba(45,95,62,0.08)'} !important;
        }
        .cert-card:hover .quality-seal {
          transform: rotate(20deg) scale(1.12);
          border-color: ${C.accent} !important;
          background: ${C.accentGlowStrong} !important;
        }

        .timeline-box {
          transition: all 0.35s ease !important;
        }
        .timeline-box:hover {
          background: ${C.accentGlow} !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ background: `linear-gradient(160deg, ${C.heroStart} 0%, ${C.heroEnd} 100%)`, paddingTop: isMobile ? 100 : 130, paddingBottom: 0, position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease' }}>
        <svg style={{ position: 'absolute', top: '5%', left: '-2%', width: '104%', height: '90%', opacity: 0.22, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1440 800" fill="none" stroke="rgba(45,95,62,0.045)" strokeWidth="1.5">
          <path d="M-100,80 C280,120 380,30 780,150 C1180,270 1280,80 1600,120" />
          <path d="M-100,180 C300,230 430,130 830,250 C1230,370 1330,190 1600,250" />
          <path d="M-100,280 C320,340 480,240 880,350 C1280,460 1380,300 1600,380" />
          <path d="M-100,380 C340,450 530,350 930,450 C1330,550 1430,410 1600,510" />
          <path d="M-100,480 C360,560 580,460 980,550 C1380,640 1480,520 1600,640" />
        </svg>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${C.accent}66, ${C.accent}AA, ${C.accent}66, transparent)` }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${px} ${isMobile ? 56 : 80}px`, position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 26, height: 1, background: C.accent, flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: isMobile ? 9 : 10, letterSpacing: '0.46em', textTransform: 'uppercase', color: C.accent }}>{t.locationTag}</span>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '2.1rem' : isTablet ? '4.8rem' : '5.4rem', color: C.text, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 6 }}>{t.heroLine1}</h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', fontSize: isMobile ? '2.1rem' : isTablet ? '4.8rem' : '5.4rem', color: C.accent, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: isMobile ? 18 : 36 }}>{t.heroLine2}</h1>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 13 : 15, color: C.textMuted, lineHeight: isMobile ? 1.65 : 1.9, maxWidth: 480, marginBottom: isMobile ? 24 : 48 }}>{t.heroLead}</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 1, background: C.border, border: `1px solid ${C.border}` }}>
              {t.stats.map(({ value, label }) => (
                <div key={label} style={{ background: C.bg, padding: isMobile ? '12px 10px' : '20px 24px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 26 : 36, color: C.text, lineHeight: 1 }}>
                    <CountUp end={value} />
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 8 : 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.textDim, marginTop: 4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && !isTablet && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
              <img className="hero-float-img" src={`${base}/images/hero-product.webp`} alt="Asort products" style={{ maxHeight: 340, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.22))', position: 'relative', zIndex: 1 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
          )}
        </div>
      </div>

      {/* ── MISSION ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 56 : 88}px ${px}`, marginBottom: sectionMb }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: 'italic', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>{t.missionEyebrow}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18, marginBottom: isMobile ? 20 : 48, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.45rem' : 'clamp(1.55rem,2.8vw,2.2rem)', color: C.text, whiteSpace: isMobile ? 'normal' : 'nowrap', lineHeight: 1.1, letterSpacing: '-0.01em', flexShrink: 0 }}>{t.missionTitle}</h2>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}55, transparent)`, minWidth: isMobile ? 40 : 'auto' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 13 : 15, color: C.textMuted, lineHeight: isMobile ? 1.7 : 1.95 }}>{t.missionBody}</p>
            </div>
            <div style={{ background: isDark ? 'rgba(91,184,212,0.04)' : 'rgba(45,95,62,0.03)', border: `1px solid ${C.border}`, padding: isMobile ? '20px 18px' : 48 }}>
              {[['2015', language === 'ru' ? 'Год основания' : language === 'en' ? 'Founded' : 'Tashkil etilgan'], ['1000+', language === 'ru' ? 'Довольных клиентов' : language === 'en' ? 'Happy clients' : 'Mamnun mijozlar'], ['100%', language === 'ru' ? 'Прямая прослеживаемость' : language === 'en' ? 'Direct traceability' : 'To\'g\'ridan-to\'g\'ri kuzatuv']].map(([v, l]) => (
                <div key={v} style={{ paddingBottom: isMobile ? 18 : 28, marginBottom: isMobile ? 18 : 28, borderBottom: `1px solid ${C.border}` }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 32 : 48, color: C.accent, lineHeight: 1 }}>{v}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 9 : 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.textMuted, marginTop: 4 }}>{l}</p>
                </div>
              ))}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.textDim }}>ASORT EST. 2015</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── VALUES ── */}
      <div style={{ background: isDark ? C.bgCard : C.bgElevated, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: sectionMb }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 56 : 88}px ${px}` }}>
          <Reveal>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: 'italic', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>{t.valuesEyebrow}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18, marginBottom: isMobile ? 20 : 48, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.45rem' : 'clamp(1.55rem,2.8vw,2.2rem)', color: C.text, whiteSpace: isMobile ? 'normal' : 'nowrap', lineHeight: 1.1, letterSpacing: '-0.01em', flexShrink: 0 }}>{t.valuesTitle}</h2>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}55, transparent)`, minWidth: isMobile ? 40 : 'auto' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 14 : 20 }}>
            {/* Card 1 */}
            {(() => {
              const val = t.values[0]
              const Icon = valueIcons[0]
              return (
                <Reveal style={{ gridRow: isMobile ? 'auto' : '1 / 3' }}>
                  <div className="val-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: isMobile ? '20px 18px' : '40px 36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="val-icon-box" style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: 2, background: C.accentGlow, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 16 : 24, transition: 'all 0.3s ease' }}>
                        <Icon size={isMobile ? 16 : 20} color={C.accent} />
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.2rem' : '1.8rem', color: C.text, marginBottom: isMobile ? 8 : 14, lineHeight: 1.2 }}>{val.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 12.5 : 14, color: C.textMuted, lineHeight: isMobile ? 1.65 : 1.85, marginBottom: isMobile ? 20 : 32 }}>{val.body}</p>
                    </div>
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: isMobile ? 14 : 20, display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 26 : 36, color: C.accent, lineHeight: 1 }}>{val.num}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.textDim }}>{val.numLabel}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })()}

            {/* Card 2 */}
            {(() => {
              const val = t.values[1]
              const Icon = valueIcons[1]
              return (
                <Reveal delay={80}>
                  <div className="val-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: isMobile ? '18px 16px' : '28px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="val-icon-box" style={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40, borderRadius: 2, background: C.accentGlow, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 12 : 16, transition: 'all 0.3s ease' }}>
                        <Icon size={16} color={C.accent} />
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.1rem' : '1.25rem', color: C.text, marginBottom: 6, lineHeight: 1.2 }}>{val.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 12 : 13, color: C.textMuted, lineHeight: isMobile ? 1.6 : 1.78, marginBottom: isMobile ? 14 : 20 }}>{val.body}</p>
                    </div>
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: isMobile ? 10 : 14, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 22 : 26, color: C.accent, lineHeight: 1 }}>{val.num}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.textDim }}>{val.numLabel}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })()}

            {/* Card 3 */}
            {(() => {
              const val = t.values[2]
              const Icon = valueIcons[2]
              return (
                <Reveal delay={160}>
                  <div className="val-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: isMobile ? '18px 16px' : '28px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="val-icon-box" style={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40, borderRadius: 2, background: C.accentGlow, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 12 : 16, transition: 'all 0.3s ease' }}>
                        <Icon size={16} color={C.accent} />
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.1rem' : '1.25rem', color: C.text, marginBottom: 6, lineHeight: 1.2 }}>{val.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 12 : 13, color: C.textMuted, lineHeight: isMobile ? 1.6 : 1.78, marginBottom: isMobile ? 14 : 20 }}>{val.body}</p>
                    </div>
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: isMobile ? 10 : 14, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 22 : 26, color: C.accent, lineHeight: 1 }}>{val.num}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.textDim }}>{val.numLabel}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })()}

            {/* Card 4 */}
            {(() => {
              const val = t.values[3]
              const Icon = valueIcons[3]
              return (
                <Reveal delay={240} style={{ gridColumn: isMobile ? 'auto' : '1 / 3' }}>
                  <div className="val-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: isMobile ? '18px 16px' : '28px 32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 16 : 24 }}>
                    <div style={{ flex: 1 }}>
                      <div className="val-icon-box" style={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40, borderRadius: 2, background: C.accentGlow, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 10 : 14, transition: 'all 0.3s ease' }}>
                        <Icon size={16} color={C.accent} />
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.15rem' : '1.35rem', color: C.text, marginBottom: 6, lineHeight: 1.2 }}>{val.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 12 : 13, color: C.textMuted, lineHeight: isMobile ? 1.6 : 1.75 }}>{val.body}</p>
                    </div>
                    <div style={{ borderLeft: isMobile ? 'none' : `1px solid ${C.border}`, borderTop: isMobile ? `1px solid ${C.border}` : 'none', paddingLeft: isMobile ? 0 : 28, paddingTop: isMobile ? 10 : 0, display: 'flex', gap: 8, alignItems: 'baseline', flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 24 : 32, color: C.accent, lineHeight: 1 }}>{val.num}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.textDim }}>{val.numLabel}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })()}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${px}`, marginBottom: sectionMb }}>
        <Reveal>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: 'italic', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>{t.timelineEyebrow}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18, marginBottom: isMobile ? 20 : 48, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.45rem' : 'clamp(1.55rem,2.8vw,2.2rem)', color: C.text, whiteSpace: isMobile ? 'normal' : 'nowrap', lineHeight: 1.1, letterSpacing: '-0.01em', flexShrink: 0 }}>{t.timelineTitle}</h2>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}55, transparent)`, minWidth: isMobile ? 40 : 'auto' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
          </div>
        </Reveal>
        <div style={{ position: 'relative', padding: isMobile ? '0 0 0 28px' : '40px 0' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: isMobile ? 10 : '50%',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              width: 2,
              background: `linear-gradient(to bottom, ${C.accent}, ${C.border} 80%, transparent)`,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 48 }}>
            {t.timeline.map((item, i) => {
              const isEven = i % 2 === 0
              return (
                <Reveal key={item.year} delay={i * 80}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : isEven ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: isMobile ? -23 : '50%',
                        transform: isMobile ? 'translateY(4px)' : 'translateX(-50%)',
                        zIndex: 2,
                        width: isMobile ? 16 : 20,
                        height: isMobile ? 16 : 20,
                        borderRadius: '50%',
                        background: C.bgCard,
                        border: `2px solid ${C.accent}`,
                        boxShadow: `0 0 0 3px ${C.accentGlowStrong}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ width: isMobile ? 5 : 6, height: isMobile ? 5 : 6, borderRadius: '50%', background: C.accent }} />
                    </div>

                    {/* Timeline Card */}
                    <div
                      className="val-card"
                      style={{
                        width: isMobile ? '100%' : 'calc(50% - 40px)',
                        marginRight: isMobile ? 0 : isEven ? 'calc(50% + 40px)' : 0,
                        marginLeft: isMobile ? 0 : !isEven ? 'calc(50% + 40px)' : 0,
                        background: C.bgCard,
                        border: `1px solid ${C.border}`,
                        padding: isMobile ? '16px 16px' : '28px 32px',
                        borderRadius: 4,
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 22 : 32, color: C.accent, lineHeight: 1 }}>{item.year}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.textDim }}>MILESTONE</span>
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.05rem' : '1.25rem', color: C.text, marginBottom: 6, lineHeight: 1.25 }}>{item.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 12 : 13, color: C.textMuted, lineHeight: isMobile ? 1.6 : 1.8 }}>{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CERTS ── */}
      <div style={{ background: isDark ? C.bgCard : C.bgElevated, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: sectionMb }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 56 : 88}px ${px}` }}>
          <Reveal>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: 'italic', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>{t.certsEyebrow}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18, marginBottom: isMobile ? 20 : 48, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.45rem' : 'clamp(1.55rem,2.8vw,2.2rem)', color: C.text, whiteSpace: isMobile ? 'normal' : 'nowrap', lineHeight: 1.1, letterSpacing: '-0.01em', flexShrink: 0 }}>{t.certsTitle}</h2>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}55, transparent)`, minWidth: isMobile ? 40 : 'auto' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 12 : 16 }}>
            {t.certs.map((cert, i) => (
              <Reveal key={cert.code} delay={i * 80}>
                <div className="cert-card" style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: isMobile ? '16px 12px' : '32px 24px', textAlign: 'center' }}>
                  <div className="quality-seal" style={{ width: isMobile ? 36 : 48, height: isMobile ? 36 : 48, borderRadius: '50%', background: C.accentGlow, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', transition: 'all 0.3s ease' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? 16 : 20, color: C.accent }}>✓</span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '0.85rem' : '1rem', color: C.text, marginBottom: 6, lineHeight: 1.3 }}>{cert.code}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 10.5 : 12, color: C.textMuted, lineHeight: 1.6 }}>{cert.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${px} ${isMobile ? 64 : 104}px` }}>
        <Reveal>
          <div style={{ background: isDark ? 'linear-gradient(140deg,#0D1623 0%,#070E17 100%)' : 'linear-gradient(140deg,#2D5F3E 0%,#1D3F27 100%)', padding: isMobile ? '32px 24px' : '56px 64px', border: `1px solid rgba(45,95,62,0.25)`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 28 : 48, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -40, bottom: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.44em', textTransform: 'uppercase', color: '#C29F68', marginBottom: 12 }}>{t.ctaEyebrow}</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem,3vw,2.6rem)', color: '#FDFBF7', lineHeight: 1.08, letterSpacing: '-0.02em' }}>{t.ctaTitle}{' '}<span style={{ fontStyle: 'italic', fontWeight: 300 }}>{t.ctaTitleItalic}</span></h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(253,251,247,0.65)', marginTop: 10, maxWidth: 420 }}>{t.ctaBody}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 10, position: 'relative', zIndex: 1, width: isMobile ? '100%' : 'auto' }}>
              <Link href={`/${locale}/contact`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 28px', background: '#FDFBF7', color: '#2D5F3E', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.ctaContact} →</Link>
              <Link href={`/${locale}/products`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 28px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#E4F0F5', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.20em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.ctaProducts} →</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
