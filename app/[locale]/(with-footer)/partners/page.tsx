'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeContext'
import { useLanguage } from '@/components/LanguageContext'

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const TX = {
  uz: {
    breadcrumb: "Asort oziq-ovqat kompaniyasi — Hamkorlar",
    heroTitle1: 'Chakana',
    heroTitle2: 'Hamkorlar',
    heroLead: "Asort mahsulotlari O'zbekistonning yetakchi supermarket, gipermarket va ulgurji savdo do'konlari peshtaxtalarida — Toshkentdan tortib Farg'ona vodiysigacha yetkazib beriladi.",
    statPartners: 'Hamkorlar',
    statStores: "Do'konlar",
    statCities: 'Shaharlar',
    featuredTitle: 'Asosiy hamkorlar',
    featuredTag: 'Strategik',
    allPartnersTitle: 'Barcha hamkorlar',
    coverageTitle: 'Qamrov',
    coverageQuote: "\"Poytaxtdan tortib har bir viloyatgacha — Asort mahsulotlari O'zbekistondagi har bir xonadon uchun oson yetarli.\"",
    coverageBody: (pCount: number, sCount: number) => `Bizning chakana savdo tarmog'imiz Toshkent, Samarqand, Namangan, Andijon va boshqa shaharlarni qamrab oladi. ${pCount} ta faol hamkorimiz ${sCount} dan ortiq do'konlarida faoliyat yuritadi. Asort mintaqadagi premium oziq-ovqat brendlari orasida eng keng chakana savdo tarmog'iga ega.`,
    retailPartner: (since: string) => `Chakana hamkor · ${since}-yildan`,
    storeCount: (n: string | number) => `${n}+ do'kon`,
    since: (y: string) => `${y}-yildan`,
    modalRetailSince: (since: string) => `Chakana hamkor · ${since}-yildan`,
    modalStores: (n: number) => `${n}+ do'kon`,
    modalProducts: "Sotilayotgan mahsulotlar",
    modalStatStores: "Do'konlar",
    modalStatSince: 'Yildan beri',
    modalStatProducts: 'Mahsulotlar',
    ctaTag: 'B2B hamkorlik',
    ctaTitle: 'Hamkor bo\'ling',
    ctaTitleItalic: 'Biz bilan ishlang',
    ctaBody: "O'zingiz uchun qulay sharoitda Asort mahsulotlari bilan tarmog'ingizni kengaytiring. Hoziroq bog'laning.",
    ctaBtn: "Bog'lanish →",
    ctaProducts: 'Mahsulotlar',
    routeTabDist: 'Distribyutsiya yo\'li',
    routeTabMap: 'Qamrov xaritasi',
    countLabel: 'ta hamkor',
    categories: { 'Barchasi': 'Barchasi', 'Supermarket': 'Supermarket', 'Gipermarket': 'Gipermarket', 'Ulgurji savdo': 'Ulgurji savdo', "Kichik do'kon": "Kichik do'kon" },
    partnerDescriptions: [
      "O'zbekistondagi eng yirik supermarketlar tarmog'i. Asort mahsulotlari Toshkentdan Samarqandgacha bo'lgan barcha filiallarda maxsus premium javonlarni egallaydi.",
      "Katta hajmdagi va qadoqlangan oziq-ovqat bo'limlariga ega premium supermarket formati. Asort guruch va shakari quruq mahsulotlar bo'limida eng ko'p sotiladigan tovarlardir.",
      "Restoranlar, kafelar va kichik chakana sotuvchilarga xizmat ko'rsatuvchi ulgurji savdo klubi. Asort'ning og'ir vaznli don mahsulotlari Makro quruq oziq-ovqat toifasining asosini tashkil etadi.",
      "Turar-joy dahalarida kuchli mavqega ega bo'lgan o'rta formatdagi mahalla supermarketlari tarmog'i. Kundalik ehtiyoj uchun mo'ljallangan Asort mahsulotlarining asosiy qismini taqdim etadi.",
      "Samarqand va Buxoro viloyatlaridagi yetakchi oziq-ovqat tarmog'i. Asort barcha hududlarda premium don mahsulotlari uchun eng afzal ko'rilgan brenddir.",
      "Farg'ona vodiysidagi tez rivojlanayotgan do'konlar tarmog'i. Barcha filiallarda Asort'ning 1 kg chakana qadoqdagi mahsulotlarini sotadi.",
      "O'rta va yuqori darajadagi iste'molchilarga mo'ljallangan yangi formatdagi gipermarket. Maxsus oziq-ovqat bo'limida Asort premium qadoqlari taqdim etilgan.",
      "Andijon viloyatidagi mintaqaviy bozor yetakchisi. Asort shakari va guruchi sotuvlar boshlangandan buyon o'z toifasida 1-o'rinni egallab kelmoqda.",
    ],
  },
  ru: {
    breadcrumb: 'Asort Food Company — Партнёры',
    heroTitle1: 'Розничные',
    heroTitle2: 'Партнёры',
    heroLead: 'Продукция Asort представлена на полках ведущих супермаркетов, гипермаркетов и оптовых магазинов Узбекистана — от Ташкента до Ферганской долины.',
    statPartners: 'Партнёры',
    statStores: 'Магазины',
    statCities: 'Города',
    featuredTitle: 'Ключевые партнёры',
    featuredTag: 'Стратегические',
    allPartnersTitle: 'Все партнёры',
    coverageTitle: 'Охват',
    coverageQuote: '"От столицы до каждого региона — продукция Asort легко доступна для каждой семьи в Узбекистане."',
    coverageBody: (pCount: number, sCount: number) => `Наша розничная сеть охватывает Ташкент, Самарканд, Наманган, Андижан и другие города. ${pCount} активных партнёров работают в более чем ${sCount} магазинах. Asort имеет самую широкую розничную сеть среди премиальных продовольственных брендов региона.`,
    retailPartner: (since: string) => `Розничный партнёр · с ${since} г.`,
    storeCount: (n: string | number) => `${n}+ магазинов`,
    since: (y: string) => `с ${y} г.`,
    modalRetailSince: (since: string) => `Розничный партнёр · с ${since} г.`,
    modalStores: (n: number) => `${n}+ магазинов`,
    modalProducts: 'Реализуемые продукты',
    modalStatStores: 'Магазины',
    modalStatSince: 'Год начала',
    modalStatProducts: 'Продуктов',
    ctaTag: 'B2B партнёрство',
    ctaTitle: 'Станьте партнёром',
    ctaTitleItalic: 'Работайте с нами',
    ctaBody: 'Расширяйте ассортимент с продукцией Asort на выгодных условиях. Свяжитесь с нами прямо сейчас.',
    ctaBtn: 'Связаться →',
    ctaProducts: 'Продукты',
    routeTabDist: 'Маршрут дистрибуции',
    routeTabMap: 'Карта охвата',
    countLabel: 'партнеров',
    categories: { 'Barchasi': 'Все', 'Supermarket': 'Супермаркет', 'Gipermarket': 'Гипермаркет', 'Ulgurji savdo': 'Оптовая торговля', "Kichik do'kon": 'Малый магазин' },
    partnerDescriptions: [
      'Крупнейшая сеть супермаркетов в Узбекистане. Продукция Asort занимает специальные премиальные полки во всех филиалах от Ташкента до Самарканда.',
      'Премиальный формат супермаркета с большими отделами фасованных продуктов. Рис и сахар Asort являются самыми продаваемыми товарами в отделе сухих продуктов.',
      'Оптовый торговый клуб для ресторанов, кафе и небольших розничных продавцов. Тяжеловесные зерновые продукты Asort составляют основу категории сухих продуктов Makro.',
      'Сеть супермаркетов среднего формата с сильными позициями в жилых кварталах. Представляет основную часть продуктов Asort для повседневных нужд.',
      'Ведущая продовольственная сеть Самарканда и Бухарской области. Asort — предпочтительный бренд для премиальных зерновых продуктов во всех регионах.',
      'Быстроразвивающаяся сеть магазинов в Ферганской долине. Реализует продукты Asort в фасовке 1 кг во всех филиалах.',
      'Гипермаркет нового формата для потребителей среднего и высокого класса. В специализированном отделе продуктов питания представлена премиальная упаковка Asort.',
      'Региональный лидер рынка Андижанской области. Сахар и рис Asort занимают 1-е место в своей категории с момента начала продаж.',
    ],
  },
  en: {
    breadcrumb: 'Asort Food Company — Partners',
    heroTitle1: 'Retail',
    heroTitle2: 'Partners',
    heroLead: "Asort products sit on the shelves of Uzbekistan's leading supermarkets, hypermarkets and wholesale stores — from Tashkent to the Fergana Valley.",
    statPartners: 'Partners',
    statStores: 'Stores',
    statCities: 'Cities',
    featuredTitle: 'Key partners',
    featuredTag: 'Strategic',
    allPartnersTitle: 'All partners',
    coverageTitle: 'Coverage',
    coverageQuote: '"From the capital to every region — Asort products are easily accessible to every household in Uzbekistan."',
    coverageBody: (pCount: number, sCount: number) => `Our retail network covers Tashkent, Samarkand, Namangan, Andijan and other cities. ${pCount} active partners operate in over ${sCount} stores. Asort has the widest retail network among premium food brands in the region.`,
    retailPartner: (since: string) => `Retail partner · since ${since}`,
    storeCount: (n: string | number) => `${n}+ stores`,
    since: (y: string) => `since ${y}`,
    modalRetailSince: (since: string) => `Retail partner · since ${since}`,
    modalStores: (n: number) => `${n}+ stores`,
    modalProducts: 'Products carried',
    modalStatStores: 'Stores',
    modalStatSince: 'Partner since',
    modalStatProducts: 'Products',
    ctaTag: 'B2B partnership',
    ctaTitle: 'Become a partner',
    ctaTitleItalic: 'Work with us',
    ctaBody: 'Expand your range with Asort products on favourable terms. Get in touch today.',
    ctaBtn: 'Get in touch →',
    ctaProducts: 'Products',
    routeTabDist: 'Distribution route',
    routeTabMap: 'Coverage map',
    countLabel: 'partners',
    categories: { 'Barchasi': 'All', 'Supermarket': 'Supermarket', 'Gipermarket': 'Hypermarket', 'Ulgurji savdo': 'Wholesale', "Kichik do'kon": 'Small store' },
    partnerDescriptions: [
      "Uzbekistan's largest supermarket chain. Asort products occupy dedicated premium shelves in all branches from Tashkent to Samarkand.",
      'Premium supermarket format with large bulk and packaged food sections. Asort rice and sugar are the top-selling items in the dry goods section.',
      'Wholesale trading club serving restaurants, cafes and small retailers. Asort heavy-weight grain products form the backbone of the Makro dry goods category.',
      'Mid-format neighbourhood supermarket chain with a strong presence in residential districts. Carries the core range of everyday Asort products.',
      'Leading food chain in Samarkand and Bukhara regions. Asort is the preferred brand for premium grain products across all regions.',
      'Fast-growing store chain in the Fergana Valley. Sells Asort products in 1 kg retail packs across all branches.',
      'New-format hypermarket for mid-to-upper-range consumers. Asort premium packs are featured in a dedicated food section.',
      'Regional market leader in Andijan region. Asort sugar and rice have held the No. 1 position in their category since launch.',
    ],
  },
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const DARK = {
  bg: '#070E17',
  bgCard: '#0D1623',
  bgCardHover: '#111E2E',
  border: 'rgba(91,184,212,0.13)',
  borderHover: 'rgba(91,184,212,0.32)',
  accent: '#5BB8D4',
  accentDeep: '#3A8FAE',
  accentPale: 'rgba(91,184,212,0.07)',
  accentGlow: 'rgba(91,184,212,0.18)',
  text: '#E4F0F5',
  textMid: '#7AB4C8',
  textMuted: '#4A7A90',
  line: 'rgba(91,184,212,0.08)',
  surface: 'rgba(91,184,212,0.06)',
}
const LIGHT = {
  bg: '#FDFBF7',
  bgCard: '#FFFFFF',
  bgCardHover: '#FAF6EE',
  border: '#E6E1D8',
  borderHover: '#2D5F3E',
  accent: '#2D5F3E',
  accentDeep: '#1D3F27',
  accentPale: 'rgba(45, 95, 62, 0.05)',
  accentGlow: 'rgba(45, 95, 62, 0.12)',
  text: '#1E2520',
  textMid: '#505A53',
  textMuted: '#869389',
  line: 'rgba(230, 225, 216, 0.6)',
  surface: '#F2EFE6',
}

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const IconCart = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

const IconBuilding = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="15" y1="16" x2="9" y2="16" />
    <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01" />
  </svg>
)

const IconBox = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const IconBolt = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconOffice = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m-18 1v13m18-13v13M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
  </svg>
)

const IconPin = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconTruck = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

// ─── DATA ─────────────────────────────────────────────────────────────────────
type Category = 'Supermarket' | 'Gipermarket' | 'Ulgurji savdo' | 'Kichik do‘kon'

type Partner = {
  id: number
  name: string
  category: Category
  city: string
  stores: number
  since: string
  description: string
  products: string[]
  color: string
  colorDark: string
  logo: string
  featured: boolean
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: 'Korzinka',
    category: 'Supermarket',
    city: 'Toshkent',
    stores: 80,
    since: '2022',
    logo: 'K',
    color: '#E8A020',
    colorDark: '#C8880A',
    featured: true,
    description:
      'O‘zbekistondagi eng yirik supermarketlar tarmog‘i. Asort mahsulotlari Toshkentdan Samarqandgacha bo‘lgan barcha filiallarda maxsus premium javonlarni egallaydi.',
    products: ['Shakar', 'Guruch', 'Grechka', 'Yasmiq'],
  },
  {
    id: 2,
    name: 'Havas',
    category: 'Gipermarket',
    city: 'Toshkent',
    stores: 12,
    since: '2023',
    logo: 'H',
    color: '#2E8B57',
    colorDark: '#1A6B3A',
    featured: true,
    description:
      'Katta hajmdagi va qadoqlangan oziq-ovqat bo‘limlariga ega premium supermarket formati. Asort guruch va shakari quruq mahsulotlar bo‘limida eng ko‘p sotiladigan tovarlardir.',
    products: ['Guruch', 'Shakar', 'No‘xat'],
  },
  {
    id: 3,
    name: 'Makro',
    category: 'Ulgurji savdo',
    city: 'Toshkent',
    stores: 6,
    since: '2022',
    logo: 'M',
    color: '#C0392B',
    colorDark: '#9B2219',
    featured: true,
    description:
      'Restoranlar, kafelar va kichik chakana sotuvchilarga xizmat ko‘rsatuvchi ulgurji savdo klubi. Asort’ning og‘ir vaznli don mahsulotlari Makro quruq oziq-ovqat toifasining asosini tashkil etadi.',
    products: ['Guruch', 'Grechka', 'Yasmiq', 'Shakar'],
  },
  {
    id: 4,
    name: 'Superstore',
    category: 'Supermarket',
    city: 'Toshkent',
    stores: 24,
    since: '2023',
    logo: 'S',
    color: '#5B6EAE',
    colorDark: '#3D4F8E',
    featured: false,
    description:
      'Turar-joy dahalarida kuchli mavqega ega bo‘lgan o‘rta formatdagi mahalla supermarketlari tarmog‘i. Kundalik ehtiyoj uchun mo‘ljallangan Asort mahsulotlarining asosiy qismini taqdim etadi.',
    products: ['Shakar', 'Guruch', 'Yasmiq'],
  },
  {
    id: 5,
    name: 'Ravshan Market',
    category: 'Supermarket',
    city: 'Samarqand',
    stores: 18,
    since: '2023',
    logo: 'R',
    color: '#9B59B6',
    colorDark: '#7D3E9E',
    featured: false,
    description:
      'Samarqand va Buxoro viloyatlaridagi yetakchi oziq-ovqat tarmog‘i. Asort barcha hududlarda premium don mahsulotlari uchun eng afzal ko‘rilgan brenddir.',
    products: ['Guruch', 'Shakar', 'Grechka'],
  },
  {
    id: 6,
    name: 'Baraka',
    category: 'Kichik do‘kon',
    city: 'Namangan',
    stores: 35,
    since: '2024',
    logo: 'B',
    color: '#16A085',
    colorDark: '#0D7A65',
    featured: false,
    description:
      'Farg‘ona vodiysidagi tez rivojlanayotgan do‘konlar tarmog‘i. Barcha filiallarda Asort’ning 1 kg chakana qadoqdagi mahsulotlarini sotadi.',
    products: ['Shakar', 'Guruch', 'Yasmiq'],
  },
  {
    id: 7,
    name: 'Grand Mart',
    category: 'Gipermarket',
    city: 'Toshkent',
    stores: 4,
    since: '2024',
    logo: 'G',
    color: '#2980B9',
    colorDark: '#1A608E',
    featured: false,
    description:
      'O‘rta va yuqori darajadagi iste’molchilarga mo‘ljallangan yangi formatdagi gipermarket. Maxsus oziq-ovqat bo‘limida Asort premium qadoqlari taqdim etilgan.',
    products: ['Grechka', 'No‘xat', 'Yasmiq'],
  },
  {
    id: 8,
    name: 'Anhor Market',
    category: 'Supermarket',
    city: 'Andijon',
    stores: 22,
    since: '2024',
    logo: 'A',
    color: '#D35400',
    colorDark: '#A84300',
    featured: false,
    description:
      'Andijon viloyatidagi mintaqaviy bozor yetakchisi. Asort shakari va guruchi sotuvlar boshlangandan buyon o‘z toifasida 1-o‘rinni egallab kelmoqda.',
    products: ['Shakar', 'Guruch'],
  },
]

const CATEGORIES: (Category | 'Barchasi')[] = [
  'Barchasi',
  'Supermarket',
  'Gipermarket',
  'Ulgurji savdo',
  'Kichik do‘kon',
]

const CAT_COLORS: Record<
  Category,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  Supermarket: {
    bg: 'rgba(45,95,62,0.10)',
    text: '#2D5F3E',
    darkBg: 'rgba(45,95,62,0.12)',
    darkText: '#4E8460',
  },
  Gipermarket: {
    bg: 'rgba(46,139,87,0.10)',
    text: '#1A6B3A',
    darkBg: 'rgba(77,201,138,0.12)',
    darkText: '#4DC98A',
  },
  'Ulgurji savdo': {
    bg: 'rgba(192,57,43,0.10)',
    text: '#9B2219',
    darkBg: 'rgba(220,80,60,0.12)',
    darkText: '#E06050',
  },
  'Kichik do‘kon': {
    bg: 'rgba(22,160,133,0.10)',
    text: '#0D7A65',
    darkBg: 'rgba(40,200,160,0.12)',
    darkText: '#40C8A0',
  },
}

// ── Count Up component ───────────────────────────────────────────────────────
function CountUp({ end, duration = 1200 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const target = parseInt(end) || 0
  const suffix = end.replace(/[0-9]/g, '') // captures + or % etc.
  
  useEffect(() => {
    let startTimestamp: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      }
    }

    animationFrameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [target, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────
type BP = 'mobile' | 'tablet' | 'desktop'
function useBreakpoint(): BP {
  const [bp, setBp] = useState<BP>(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth
      return w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'
    }
    return 'desktop'
  })
  useEffect(() => {
    const m = () => {
      const w = window.innerWidth
      setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [])
  return bp
}

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
      { threshold: 0.04 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'none' : 'translateY(22px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── PARTNER MODAL ────────────────────────────────────────────────────────────
function PartnerModal({
  partner,
  onClose,
  C,
  isDark,
  isMobile,
}: {
  partner: Partner
  onClose: () => void
  C: typeof DARK
  isDark: boolean
  isMobile: boolean
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])
  const { language } = useLanguage()
  const t = TX[language as keyof typeof TX] || TX.uz
  const catCol = CAT_COLORS[partner.category]
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'rgba(2,8,18,0.82)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : 24,
      }}
    >
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:none}} @keyframes slideIn{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:none}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bgCard,
          borderRadius: isMobile ? '16px 16px 0 0' : 2,
          maxWidth: 520,
          width: '100%',
          maxHeight: isMobile ? '92dvh' : '88vh',
          overflowY: 'auto',
          border: `1px solid ${C.border}`,
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          animation: isMobile
            ? 'slideUp 0.3s cubic-bezier(.22,.68,0,1.05) forwards'
            : 'slideIn 0.26s ease forwards',
        }}
      >
        {isMobile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 0 4px',
            }}
          >
            <div
              style={{
                width: 34,
                height: 4,
                borderRadius: 99,
                background: C.border,
              }}
            />
          </div>
        )}
        {/* Modal header */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '24px 20px 20px' : '32px 32px 24px',
            borderBottom: `1px solid ${C.border}`,
            background: isDark
              ? `linear-gradient(140deg, ${partner.colorDark}18 0%, transparent 60%)`
              : `linear-gradient(140deg, ${partner.color}0D 0%, transparent 60%)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 900,
              fontSize: 200,
              lineHeight: 1,
              color: isDark ? `${partner.color}08` : `${partner.color}0A`,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {partner.logo}
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: isMobile ? 16 : 24,
              right: isMobile ? 16 : 24,
              zIndex: 10,
              width: 30,
              height: 30,
              borderRadius: 2,
              background: C.surface,
              border: `1px solid ${C.border}`,
              color: C.textMid,
              fontSize: 18,
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
              gap: 18,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 2,
                background: `${partner.color}18`,
                border: `2px solid ${partner.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 900,
                  fontSize: 28,
                  color: isDark ? partner.color : partner.colorDark,
                }}
              >
                {partner.logo}
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: C.textMuted,
                  marginBottom: 5,
                }}
              >
                {t.modalRetailSince(partner.since)}
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 700,
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                  color: C.text,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: 6,
                }}
              >
                {partner.name}
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 10,
                  color: C.textMid,
                }}
              >
                <IconPin size={11} color={C.accent} /> {partner.city} · {t.modalStores(partner.stores)}
              </p>
            </div>
          </div>
        </div>
        {/* Modal body */}
        <div
          style={{
            padding: isMobile ? '20px 20px 32px' : '26px 32px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <span
            style={{
              background: isDark ? catCol.darkBg : catCol.bg,
              color: isDark ? catCol.darkText : catCol.text,
              border: `1px solid ${isDark ? catCol.darkText : catCol.text}40`,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: 2,
              display: 'inline-block',
              width: 'fit-content',
            }}
          >
            {partner.category}
          </span>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: C.textMid,
              lineHeight: 1.78,
            }}
          >
            {partner.description}
          </p>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 9,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: C.textMuted,
                marginBottom: 10,
              }}
            >
              {t.modalProducts}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {partner.products.map((pr) => (
                <span
                  key={pr}
                  style={{
                    background: C.accentPale,
                    color: C.accent,
                    border: `1px solid ${C.border}`,
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '5px 12px',
                    borderRadius: 2,
                  }}
                >
                  {pr}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 1,
              background: C.border,
              border: `1px solid ${C.border}`,
            }}
          >
            {[
              { label: t.modalStatStores, value: partner.stores + '+' },
              { label: t.modalStatSince, value: partner.since },
              { label: t.modalStatProducts, value: partner.products.length },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: C.bgCard,
                  padding: '14px 10px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: C.accent,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 9,
                    color: C.textMuted,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function PartnersPage() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = TX[language as keyof typeof TX] || TX.uz
  const isDark = theme === 'dark'
  const C = isDark ? DARK : LIGHT
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const [activeCategory, setActiveCategory] = useState<Category | 'Barchasi'>('Barchasi')
  const [openPartner, setOpenPartner] = useState<Partner | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<number>(0)
  const px = isMobile ? '16px' : isTablet ? '28px' : '56px'
  const totalStores = PARTNERS.reduce((s, p) => s + p.stores, 0)
  const filtered =
    activeCategory === 'Barchasi'
      ? PARTNERS
      : PARTNERS.filter((p) => p.category === activeCategory)
  const featured = PARTNERS.filter((p) => p.featured)

  // apply translated descriptions + categories
  const translatedPartners = PARTNERS.map((p, i) => ({
    ...p,
    description: t.partnerDescriptions[i] ?? p.description,
    category: p.category, // category key stays same for filtering
  }))
  const translatedFeatured = translatedPartners.filter((p) => p.featured)
  const translatedFiltered = activeCategory === 'Barchasi'
    ? translatedPartners
    : translatedPartners.filter((p) => p.category === activeCategory)

  if (!bp) return <div style={{ minHeight: '100vh', background: C.bg }} />

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .pc{transition:transform 0.22s ease,box-shadow 0.22s ease,border-color 0.22s ease;cursor:pointer;}
        .pc:hover{transform:translateY(-3px);}
        .fc{transition:all 0.22s ease;cursor:pointer;}
        .fc:hover{transform:translateY(-4px);}
        .chip{transition:all 0.18s ease;cursor:pointer;}
        .cta-btn{transition:opacity 0.2s,transform 0.2s;}
        .cta-btn:hover{opacity:0.88;transform:translateX(2px);}

        .leaf-card {
          border-radius: 24px 4px 24px 4px !important;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease, border-color 0.4s ease !important;
          cursor: pointer;
        }
        .leaf-card:hover {
          transform: translateY(-6px) scale(1.01) rotate(0.5deg) !important;
          box-shadow: 0 20px 40px rgba(45, 95, 62, 0.08) !important;
          border-color: ${C.borderHover} !important;
        }
        .seal-logo {
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        .leaf-card:hover .seal-logo {
          transform: rotate(15deg) scale(1.08) !important;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: isMobile ? 95 : 120,
          paddingBottom: isMobile ? 52 : 80,
          paddingLeft: px,
          paddingRight: px,
          borderBottom: `1px solid ${C.border}`,
          background: 'linear-gradient(180deg, #FDFBF7 0%, #FAF6EE 100%)',
        }}
      >
        {/* Topographic contours backdrop */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.18,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          viewBox="0 0 1440 300"
          fill="none"
          stroke="rgba(45, 95, 62, 0.05)"
          strokeWidth="1.5"
        >
          <path d="M-100,50 C280,80 380,20 780,100 C1180,180 1280,50 1600,80" />
          <path d="M-100,120 C300,160 430,80 830,170 C1230,260 1330,120 1600,170" />
        </svg>

        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'rgba(45, 95, 62, 0.04)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <Reveal>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 9,
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: C.textMuted,
                marginBottom: 28,
              }}
            >
              {t.breadcrumb}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 28,
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 300,
                    fontSize: isMobile
                      ? 'clamp(2.6rem,10vw,3.4rem)'
                      : 'clamp(3.2rem,5vw,5rem)',
                    color: C.text,
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t.heroTitle1}
                  <br />
                  <span style={{ fontStyle: 'italic', color: C.accent }}>
                    {t.heroTitle2}
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 300,
                    fontSize: isMobile ? 15 : 18,
                    color: C.textMid,
                    marginTop: 18,
                    maxWidth: 520,
                    lineHeight: 1.85,
                  }}
                >
                  {t.heroLead}
                </p>
              </div>

              {!isMobile && (
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    flexShrink: 0,
                  }}
                >
                  {[
                    { label: t.statPartners, value: `${PARTNERS.length}` },
                    { label: t.statStores, value: `${totalStores}` },
                    {
                      label: t.statCities,
                      value: `${[...new Set(PARTNERS.map((p) => p.city))].length}`,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: C.bgCard,
                        borderRadius: '16px 2px 16px 2px',
                        border: '1px dashed rgba(194, 159, 104, 0.4)',
                        padding: '16px 24px',
                        textAlign: 'center',
                        minWidth: 120,
                        boxShadow: '0 4px 20px rgba(45, 95, 62, 0.02)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontWeight: 700,
                          fontSize: 28,
                          color: C.accent,
                          lineHeight: 1,
                        }}
                      >
                        <CountUp end={s.value} />
                        {s.label.includes('Stores') && '+'}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 9,
                          color: C.textMuted,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          marginTop: 6,
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {isMobile && (
            <Reveal delay={120}>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: 28,
                }}
              >
                {[
                  { label: t.statPartners, value: `${PARTNERS.length}` },
                  { label: t.statStores, value: `${totalStores}` },
                  {
                    label: t.statCities,
                    value: `${[...new Set(PARTNERS.map((p) => p.city))].length}`,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: C.bgCard,
                      borderRadius: '12px 2px 12px 2px',
                      border: '1px dashed rgba(194, 159, 104, 0.4)',
                      padding: '12px 6px',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontWeight: 700,
                        fontSize: 22,
                        color: C.accent,
                        lineHeight: 1,
                      }}
                    >
                      <CountUp end={s.value} />
                      {s.label.includes('Stores') && '+'}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 8,
                        color: C.textMuted,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginTop: 4,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: `${isMobile ? 48 : 72}px ${px}`,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 60 : 88,
        }}
      >
        {/* FEATURED 3 */}
        <Reveal>
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: isMobile ? 24 : 32,
                paddingBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: isMobile ? '1.5rem' : '1.9rem',
                  color: C.text,
                }}
              >
                {t.featuredTitle}
              </h2>
              <div style={{ flex: 1, height: 1, background: C.line }} />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: C.textMuted,
                }}
              >
                {t.featuredTag}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : isTablet
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr',
                gap: isMobile ? 12 : 16,
              }}
            >
              {translatedFeatured.map((p, idx) => (
                <Reveal key={p.id} delay={idx * 70}>
                  <div
                    className="leaf-card"
                    onClick={() => setOpenPartner(p)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${C.border}`,
                      padding: isMobile ? '24px 20px' : '28px 24px',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Background ghost logo */}
                    <div
                      style={{
                        position: 'absolute',
                        right: -16,
                        bottom: -20,
                        fontFamily: "'Cormorant Garamond',serif",
                        fontWeight: 900,
                        fontSize: 140,
                        lineHeight: 1,
                        color: 'rgba(194, 159, 104, 0.05)',
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    >
                      {p.logo}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                      }}
                    >
                      {/* Circular golden wax-seal logo */}
                      <div
                        className="seal-logo"
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          background: `${p.color}0E`,
                          border: `2px dashed ${p.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `inset 0 0 10px ${p.color}15`,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontWeight: 900,
                            fontSize: 22,
                            color: isDark ? p.color : p.colorDark,
                          }}
                        >
                          {p.logo}
                        </span>
                      </div>
                      <span
                        style={{
                          background: isDark
                            ? CAT_COLORS[p.category].darkBg
                            : CAT_COLORS[p.category].bg,
                          color: isDark
                            ? CAT_COLORS[p.category].darkText
                            : CAT_COLORS[p.category].text,
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 8,
                          fontWeight: 700,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          padding: '3px 10px',
                          borderRadius: 2,
                        }}
                      >
                        {p.category}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontWeight: 700,
                        fontSize: isMobile ? '1.7rem' : '2rem',
                        color: C.text,
                        lineHeight: 1,
                        letterSpacing: '-0.01em',
                        marginBottom: 6,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 10,
                        color: C.textMuted,
                        marginBottom: 14,
                      }}
                    >
                      <IconPin size={11} color={C.accent} /> {p.city} · {t.storeCount(p.stores)} · {t.since(p.since)}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 300,
                        fontSize: 14.5,
                        color: C.textMid,
                        lineHeight: 1.8,
                        marginBottom: 20,
                        flex: 1,
                      }}
                    >
                      {p.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingRight: 36 }}>
                      {p.products.map((pr) => (
                        <span
                          key={pr}
                          style={{
                            background: C.accentPale,
                            color: C.accent,
                            border: `1px solid ${C.border}`,
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 9,
                            fontWeight: 500,
                            padding: '3px 9px',
                            borderRadius: 2,
                          }}
                        >
                          {pr}
                        </span>
                      ))}
                    </div>
                    {/* Circular Action Button */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: isMobile ? 20 : 24,
                        right: isMobile ? 20 : 24,
                        width: 28,
                        height: 28,
                        background: C.accentPale,
                        border: `1px solid ${C.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: C.accent,
                        fontSize: 13,
                        borderRadius: '50%',
                      }}
                    >
                      →
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ALL PARTNERS GRID */}
        <Reveal delay={40}>
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: isMobile ? 20 : 28,
                paddingBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: isMobile ? '1.5rem' : '1.9rem',
                  color: C.text,
                }}
              >
                {t.allPartnersTitle}
              </h2>
              <div style={{ flex: 1, height: 1, background: C.line }} />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: C.textMuted,
                }}
              >
                {filtered.length} {t.countLabel}
              </span>
            </div>

            {/* Filter chips */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                marginBottom: isMobile ? 20 : 28,
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = cat === activeCategory
                return (
                  <button
                    key={cat}
                    className="chip"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: isActive ? C.accent : C.accentPale,
                      color: isActive ? (isDark ? C.bg : '#fff') : C.textMid,
                      border: `1px solid ${isActive ? C.accent : C.border}`,
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '6px 14px',
                      borderRadius: 2,
                      cursor: 'pointer',
                    }}
                  >
                    {t.categories[cat as keyof typeof t.categories] ?? cat}
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : isTablet
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr 1fr',
                gap: isMobile ? 10 : 12,
              }}
            >
              {translatedFiltered.map((p) => {
                const isHov = hovered === p.id
                return (
                  <div
                    key={p.id}
                    className="leaf-card"
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setOpenPartner(p)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${C.border}`,
                      padding: isMobile ? '16px 14px' : '18px 16px',
                      boxShadow: isHov
                        ? '0 12px 30px rgba(45, 95, 62, 0.05)'
                        : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 14,
                      }}
                    >
                      {/* Circular Wax Seal Logo */}
                      <div
                        className="seal-logo"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: `${p.color}0E`,
                          border: `1.5px dashed ${p.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontWeight: 900,
                            fontSize: 18,
                            color: isDark ? p.color : p.colorDark,
                          }}
                        >
                          {p.logo}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 600,
                            fontSize: 15,
                            color: C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {p.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 10.5,
                            color: C.textMuted,
                            marginTop: 2,
                          }}
                        >
                          {p.city} · {t.storeCount(p.stores)}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          background: isDark
                            ? CAT_COLORS[p.category].darkBg
                            : CAT_COLORS[p.category].bg,
                          color: isDark
                            ? CAT_COLORS[p.category].darkText
                            : CAT_COLORS[p.category].text,
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 8,
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: 2,
                        }}
                      >
                        {p.category}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 9,
                          color: C.textMuted,
                        }}
                      >
                        {t.since(p.since)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </Reveal>

        {/* CITY COVERAGE */}
        <Reveal delay={60}>
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: isMobile ? 20 : 32,
                paddingBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: isMobile ? '1.5rem' : '1.9rem',
                  color: C.text,
                }}
              >
                {t.coverageTitle}
              </h2>
              <div style={{ flex: 1, height: 1, background: C.line }} />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 32,
                alignItems: 'start',
              }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    color: C.text,
                    lineHeight: 1.65,
                  }}
                >
                  {t.coverageQuote}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 300,
                    fontSize: 13,
                    color: C.textMid,
                    lineHeight: 1.75,
                  }}
                >
                  Bizning chakana savdo tarmog‘imiz Toshkent, Samarqand, Namangan, Andijon va boshqa shaharlarni qamrab oladi. {PARTNERS.length} ta faol hamkorimiz {totalStores} dan ortiq do‘konlarida faoliyat yuritadi. Asort mintaqadagi premium ozi-ovqat brendlari orasida eng keng chakana savdo tarmog‘iga ega.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 14,
                    flexWrap: 'wrap',
                    marginTop: 4,
                  }}
                >
                  {(
                    [
                      'Supermarket',
                      'Gipermarket',
                      'Ulgurji savdo',
                      'Kichik do‘kon',
                    ] as Category[]
                  ).map((cat) => {
                    const count = PARTNERS.filter(
                      (p) => p.category === cat
                    ).length
                    const col = CAT_COLORS[cat]
                    return (
                      <div
                        key={cat}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 1,
                            background: isDark ? col.darkText : col.text,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 10,
                            color: C.textMid,
                          }}
                        >
                          {count} {cat}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Regional Hubs & Logistics Flow Map */}
              <div
                style={{
                  background: '#FAF6EE',
                  border: '1px solid rgba(194, 159, 104, 0.25)',
                  borderRadius: '24px 4px 24px 4px',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(45, 95, 62, 0.03)',
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#C29F68',
                    marginBottom: 24,
                  }}
                >
                  Tarqatish tarmog'i va Logistika yo'nalishlari
                </p>

                {/* Central Hub Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(45,95,62,0.1)',
                      border: `2px solid ${C.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 0 20px rgba(45,95,62,0.15)',
                    }}
                  >
                    <IconOffice size={28} color={C.accent} />
                    {/* Pulsing radar ring */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        border: `1px solid ${C.accent}`,
                        opacity: 0.3,
                      }}
                    />
                  </div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 18, color: C.text, marginTop: 12 }}>
                    TOSHKENT HUB
                  </h4>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '0.12em', color: C.textMuted, textTransform: 'uppercase' }}>
                    Markaziy Tarqatish Ombori
                  </p>
                </div>

                {/* Interactive Route Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {[
                    { city: 'Samarqand', time: '12 soat', stores: '18+ do\'kon', path: 'M39 Janubiy Yo\'nalish', vehicle: 'Ref-Truck Isuzu FTR (8t)', schedule: 'Har dushanba va payshanba soat 20:00 da yo\'lga chiqadi.', distance: '310 km', temp: '+4°C dan +8°C gacha' },
                    { city: 'Namangan', time: '8 soat', stores: '35+ do\'kon', path: 'A373 Dovon yo\'nalishi', vehicle: 'Konteyner Kamaz Neo (15t)', schedule: 'Har seshanba va shanba soat 19:30 da yo\'lga chiqadi.', distance: '290 km', temp: 'Quruq muhit (max 15% namlik)' },
                    { city: 'Andijon', time: '10 soat', stores: '22+ do\'kon', path: 'A373 Dovon yo\'nalishi', vehicle: 'Ref-Truck MAN TGM (12t)', schedule: 'Har chorshanba va yakshanba soat 21:00 da yo\'lga chiqadi.', distance: '360 km', temp: '+4°C dan +8°C gacha' },
                  ].map((route, rIdx) => {
                    const isSelected = selectedRoute === rIdx
                    return (
                      <div key={route.city} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <button
                          onClick={() => setSelectedRoute(rIdx)}
                          style={{
                            display: 'flex',
                            width: '100%',
                            textAlign: 'left',
                            alignItems: 'center',
                            gap: 12,
                            background: isSelected ? 'rgba(45,95,62,0.04)' : C.bgCard,
                            borderRadius: '12px 2px 12px 2px',
                            border: isSelected ? `2.5px solid ${C.accent}` : `1px solid ${C.border}`,
                            padding: '14px 18px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.22s ease',
                          }}
                        >
                          {/* Left: pin icon */}
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              background: isSelected ? `${C.accent}15` : 'rgba(194, 159, 104, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconPin size={15} color={isSelected ? C.accent : '#C29F68'} />
                          </div>
                          
                          {/* Mid: Routing specs */}
                          <div style={{ flex: 1 }}>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 700, color: C.text }}>
                              {route.city}
                            </p>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.textMuted }}>
                              {route.path} · {route.stores}
                            </p>
                          </div>

                          {/* Right: transit time badge */}
                          <span
                            style={{
                              background: isSelected ? `${C.accent}15` : 'rgba(45,95,62,0.06)',
                              color: C.accent,
                              border: isSelected ? `1.5px solid ${C.accent}` : `1px solid rgba(45,95,62,0.18)`,
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              padding: '4px 10px',
                              borderRadius: 2,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <IconBolt size={12} color={C.accent} />
                            {route.time}
                          </span>
                        </button>

                        {/* Interactive Detailing Sheet */}
                        {isSelected && (
                          <div
                            style={{
                              background: C.bgCard,
                              borderLeft: `3px solid ${C.accent}`,
                              borderRight: `1px solid ${C.border}`,
                              borderBottom: `1px solid ${C.border}`,
                              padding: '16px 20px',
                              borderRadius: '0 0 12px 12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 12,
                              animation: 'slideIn 0.22s ease forwards',
                            }}
                          >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, color: C.textMuted, textTransform: 'uppercase' }}>Transport Turi</span>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 600, color: C.text }}>{route.vehicle}</p>
                              </div>
                              <div>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, color: C.textMuted, textTransform: 'uppercase' }}>Masofa</span>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 600, color: C.text }}>{route.distance}</p>
                              </div>
                            </div>

                            <div style={{ borderTop: `1px dashed ${C.border}`, paddingTop: 10 }}>
                              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, color: C.textMuted, textTransform: 'uppercase' }}>Yuk tashish jadvali</span>
                              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 500, color: C.textMid, lineHeight: 1.5 }}>{route.schedule}</p>
                            </div>

                            <div style={{ borderTop: `1px dashed ${C.border}`, paddingTop: 10 }}>
                              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, color: C.textMuted, textTransform: 'uppercase' }}>Sifat nazorati (Harorat)</span>
                              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, fontWeight: 600, color: '#C29F68' }}>{route.temp}</p>
                            </div>

                            <button
                              onClick={() => {
                                const excelHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<!--[if gte mso 9]>
<xml>
 <x:ExcelWorkbook>
  <x:ExcelWorksheets>
   <x:ExcelWorksheet>
    <x:Name>${route.city} Yo'nalishi</x:Name>
    <x:WorksheetOptions>
     <x:DisplayGridlines/>
    </x:WorksheetOptions>
   </x:ExcelWorksheet>
  </x:ExcelWorkbook>
 </xml>
</[endif]-->
<style>
  table { border-collapse: collapse; }
  td { font-family: 'Segoe UI', sans-serif; font-size: 10pt; color: #1E2520; border: 1px solid #E6E1D8; padding: 7px 12px; }
  .title-cell { font-family: 'Georgia', serif; font-size: 14pt; font-weight: bold; color: #FFFFFF; background-color: #2D5F3E; text-align: center; padding: 12px; }
  .subtitle-cell { font-family: 'Segoe UI', sans-serif; font-size: 9pt; color: #869389; text-align: center; text-transform: uppercase; letter-spacing: 0.15em; padding: 6px; border-bottom: 2px solid #2D5F3E; }
  .section-cell { font-family: 'Segoe UI', sans-serif; font-size: 11pt; font-weight: bold; background-color: #F2EFE6; color: #2D5F3E; border: 1px solid #E6E1D8; padding: 8px 10px; }
  .label-cell { font-weight: bold; background-color: #FDFBF7; width: 220px; }
  .value-cell { text-align: left; }
  .footer-cell { font-size: 9pt; color: #869389; font-style: italic; text-align: center; padding: 10px; border-top: 2px solid #2D5F3E; }
</style>
</head>
<body>
  <table>
    <tr>
      <td colspan="2" class="title-cell">ASORT LOGISTICS TRANSIT SCHEDULER</td>
    </tr>
    <tr>
      <td colspan="2" class="subtitle-cell">LOGISTIKA TRANZIT JADVALI VA REJASI</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:12px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="section-cell">TRANZIT YO'NALISHI / TRANSIT ROUTE</td>
    </tr>
    <tr>
      <td class="label-cell">Markaziy ombor (Central Warehouse)</td>
      <td class="value-cell">Toshkent shahar bosh logistika markazi (Tashkent City Hub)</td>
    </tr>
    <tr>
      <td class="label-cell">Yo'nalish (Transit Route)</td>
      <td class="value-cell">Toshkent &rarr; ${route.city.toUpperCase()} (${route.path})</td>
    </tr>
    <tr>
      <td class="label-cell">Masofa (Distance)</td>
      <td class="value-cell">${route.distance}</td>
    </tr>
    <tr>
      <td class="label-cell">Tranzit vaqti (Transit Duration)</td>
      <td class="value-cell">${route.time}</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:12px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="section-cell">TRANSPORT VOSITASI SAFARBARLIGI / VEHICLE DEPLOYMENT</td>
    </tr>
    <tr>
      <td class="label-cell">Transport vositasi (Vehicle)</td>
      <td class="value-cell">${route.vehicle}</td>
    </tr>
    <tr>
      <td class="label-cell">Jo'nash jadvali (Departure Schedule)</td>
      <td class="value-cell">${route.schedule}</td>
    </tr>
    <tr>
      <td class="label-cell">Harorat nazorati (Temperature Range)</td>
      <td class="value-cell">${route.temp}</td>
    </tr>
    <tr>
      <td class="label-cell">Logistika holati (Logistics Status)</td>
      <td class="value-cell">Faol - Nazorat ostidagi ta'minot zanjiri (Active - Controlled Supply Chain)</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:18px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="footer-cell">Sifat kafolatlangan: Asort MChJ Logistika bo'limi · logistics@asort.uz</td>
    </tr>
  </table>
</body>
</html>`;
                                const blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' })
                                const url = URL.createObjectURL(blob)
                                const link = document.createElement('a')
                                link.href = url
                                link.download = `ASORT_logistics_route_${route.city.toLowerCase()}.xls`
                                link.click()
                                URL.revokeObjectURL(url)
                              }}
                              style={{
                                background: C.accentPale,
                                border: `1px solid ${C.accent}`,
                                borderRadius: 2,
                                color: C.accent,
                                width: '100%',
                                padding: '10px 0',
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.22s ease',
                                marginTop: 4,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = C.accent
                                e.currentTarget.style.color = '#fff'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = C.accentPale
                                e.currentTarget.style.color = C.accent
                              }}
                            >
                              <IconTruck size={14} /> Yuk tashish jadvalini yuklash
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* PARTNER TYPE CARDS */}
        <Reveal delay={40}>
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: isMobile ? 20 : 28,
                paddingBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: isMobile ? '1.5rem' : '1.9rem',
                  color: C.text,
                }}
              >
                Hamkorlik turlari
              </h2>
              <div style={{ flex: 1, height: 1, background: C.line }} />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
                gap: isMobile ? 10 : 14,
              }}
            >
              {(
                [
                  {
                    cat: 'Supermarket' as Category,
                    icon: <IconCart size={20} color={C.accent} />,
                    body: 'Asort mahsulotlarini maxsus premium peshtaxtalarda sotadigan do‘konlar va supermarketlar tarmog‘i.',
                  },
                  {
                    cat: 'Gipermarket' as Category,
                    icon: <IconBuilding size={20} color={C.accent} />,
                    body: 'Katta hajmli va premium bo‘limlarga ega yirik do‘konlar. Quruq oziq-ovqat bo‘limida Asort yetakchi o‘rinda.',
                  },
                  {
                    cat: 'Ulgurji savdo' as Category,
                    icon: <IconBox size={20} color={C.accent} />,
                    body: 'Restoranlar, kichik do‘konlar va umumiy ovqatlanish korxonalariga ulgurji hajmda xizmat ko‘rsatish.',
                  },
                  {
                    cat: 'Kichik do‘kon' as Category,
                    icon: <IconBolt size={20} color={C.accent} />,
                    body: 'Tezkor xarid qilish uchun kundalik Asort mahsulotlarini taqdim etuvchi qulay va tez o‘suvchi mahalla do‘konlari tarmog‘i.',
                  },
                ] as { cat: Category; icon: React.ReactNode; body: string }[]
              ).map((item, idx) => {
                const count = PARTNERS.filter(
                  (p) => p.category === item.cat
                ).length
                const col = CAT_COLORS[item.cat]
                return (
                  <Reveal key={item.cat} delay={idx * 55}>
                    <div
                      style={{
                        background: C.bgCard,
                        border: '1px solid rgba(194, 159, 104, 0.25)',
                        borderRadius: '40px 40px 12px 12px',
                        padding: isMobile ? '24px 16px 20px' : '28px 20px 24px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 8,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(45,95,62,0.04)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.01)'
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: '50%',
                          background: 'rgba(194, 159, 104, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 4,
                        }}
                      >
                        {item.icon}
                      </div>
                      
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontWeight: 700,
                          fontSize: isMobile ? 32 : 38,
                          color: C.accent,
                          lineHeight: 1,
                        }}
                      >
                        {count}
                      </p>
                      
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 600,
                          fontSize: isMobile ? 10 : 11,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: C.text,
                        }}
                      >
                        {item.cat}
                      </p>
                      
                      <span
                        style={{
                          background: isDark ? col.darkBg : col.bg,
                          color: isDark ? col.darkText : col.text,
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 7.5,
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          padding: '2px 10px',
                          borderRadius: 99,
                          display: 'inline-block',
                          width: 'fit-content',
                          marginBottom: 10,
                        }}
                      >
                        {item.cat}
                      </span>
                      
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 300,
                          fontSize: 11,
                          color: C.textMid,
                          lineHeight: 1.65,
                          marginTop: 'auto',
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal delay={40}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderTop: `2px solid ${C.accent}`,
              padding: isMobile ? '32px 20px' : '48px 56px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: 28,
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: -20,
                bottom: -30,
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 900,
                fontSize: 160,
                lineHeight: 1,
                color: isDark
                  ? 'rgba(91,184,212,0.04)'
                  : 'rgba(42,126,156,0.04)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              HAMKOR
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 9,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 10,
                }}
              >
                Chakana hamkorlik
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 700,
                  fontSize: isMobile ? '1.7rem' : '2.2rem',
                  color: C.text,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  marginBottom: 10,
                }}
              >
                Asort mahsulotlarini do‘koningizda soting
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: C.textMid,
                  lineHeight: 1.7,
                  maxWidth: 440,
                }}
              >
                Biz barcha o‘lchamdagi chakana savdo tarmoqlari bilan ishlaymiz — yakka tartibdagi do‘konlardan tortib milliy tarmoqlargacha. Raqobatbardosh narxlar, ishonchli yetkazib berish va maxsus peshtaxta ko‘magi.
              </p>
            </div>
            <a
              href="/contact"
              className="cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: C.accent,
                color: isDark ? C.bg : '#fff',
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                padding: isMobile ? '14px 24px' : '16px 32px',
                borderRadius: 2,
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              Bog‘lanish <span>→</span>
            </a>
          </div>
        </Reveal>
      </div>

      {openPartner && (
        <PartnerModal
          partner={openPartner}
          onClose={() => setOpenPartner(null)}
          C={C}
          isDark={isDark}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}
