'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useHomeColor } from '@/components/HomeColorContext'
import { useLanguage } from '@/components/LanguageContext'
import base from '@/src/lib/basePath'

// ─── Swiper Imports ──────────────────────────────────────────────────────────
import { Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Keyboard } from 'swiper/modules'

// ─── Swiper Styles ───────────────────────────────────────────────────────────
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

// ─── Individual Product Image Size & Scale Config ────────────────────────────
export const PRODUCT_SIZES: Record<
  string,
  { heightDesktop: string; heightMobile: string; scale: number; name: string }
> = {
  blue: {
    name: 'Shakar',
    heightDesktop: '390px',
    heightMobile: '280px',
    scale: 0.85,
  },
  beige: {
    name: 'Guruch',
    heightDesktop: '380px',
    heightMobile: '280px',
    scale: 0.85,
  },
  green: {
    name: 'Mosh',
    heightDesktop: '395px',
    heightMobile: '280px',
    scale: 0.95,
  },
  brown: {
    name: 'Grechka',
    heightDesktop: '400px',
    heightMobile: '290px',
    scale: 0.85,
  },
}

export const IMAGE_CONFIG: { thumbScales: Record<string, number> } = {
  thumbScales: {
    blue: 1.0,
    beige: 1.0,
    green: 1.0,
    brown: 1.0,
  },
}

export const AUTO_ROTATE_SPEED_MS = 5000

// ─── Product Data ─────────────────────────────────────────────────────────────
const getProducts = (lang: 'uz' | 'ru' | 'en') => [
  {
    id: 'blue',
    name: lang === 'ru' ? 'САХАР' : lang === 'en' ? 'SUGAR' : 'SHAKAR',
    subtitle:
      lang === 'ru'
        ? 'РОССИЙСКИЙ САХАР'
        : lang === 'en'
        ? 'RUSSIAN SUGAR'
        : 'ROSSIYA SHAKARI',
    weight: lang === 'ru' ? '900 ГР' : lang === 'en' ? '900 G' : '900 GR',
    origin:
      lang === 'ru' ? 'ВЫСШИЙ СОРТ' : lang === 'en' ? 'PREMIUM GRADE' : 'OLIY NAV',
    color:
      lang === 'ru'
        ? 'СИНИЙ / БЕЛЫЙ'
        : lang === 'en'
        ? 'BLUE / WHITE'
        : "KO'K / OQ",
    bg: '#3B7FBF',
    accent: '#2D6FBF',
    text: '#93C5FD',
    image: 'product-shakar-900.webp',
    description:
      lang === 'ru'
        ? 'Российский сахар высочайшего качества. Натуральный, чистый и высокосладкий — идеально подходит для любых сладостей, выпечки и горячих напитков.'
        : lang === 'en'
        ? 'Highest quality Russian sugar. Natural, pure and highly sweet — the perfect choice for all types of desserts, baking, and hot drinks.'
        : "Eng yuqori sifatli Rossiya shakari. Tabiiy, toza va shirinligi yuqori darajada bo'lib, har qanday shirinliklar hamda ichimliklar uchun mukammal tanlovdir.",
    packageBg:
      'linear-gradient(135deg, #1e4d8c 0%, #2d6fbf 50%, #1a3a5c 100%)',
    sizes: ['0.9'],
  },
  {
    id: 'beige',
    name: lang === 'ru' ? 'РИС' : lang === 'en' ? 'RICE' : 'GURUCH',
    subtitle:
      lang === 'ru' ? 'СОРТ АЛАНГА' : lang === 'en' ? 'ALANGA GRADE' : 'ALANGA NAV',
    weight: lang === 'ru' ? '1 КГ' : lang === 'en' ? '1 KG' : '1 KG',
    origin:
      lang === 'ru' ? 'ПРЕМИУМ' : lang === 'en' ? 'PREMIUM' : 'PREMIUM',
    color:
      lang === 'ru'
        ? 'КРЕМОВЫЙ / БЕЛЫЙ'
        : lang === 'en'
        ? 'CREAM / WHITE'
        : 'KREM / OQ',
    bg: '#8C7B65',
    accent: '#5E5043',
    text: '#FAF6F0',
    image: 'product-alanga-1kg.webp',
    description:
      lang === 'ru'
        ? 'Отборный узбекский рис сорта Аланга. Зерна среднего размера получаются мягкими и нежными — идеально подходят для каш, супов и повседневного плова.'
        : lang === 'en'
        ? "Selected Uzbek rice of the Alanga variety. Medium-sized grains turn out soft and tender — ideal for daily meals, soups, and traditional dishes."
        : "Alanga navli saralangan o'zbek guruchi. O'rtacha kattalikdagi donlari yumshoq va to'yimli bo'lib, shavla, mastava va kundalik palovlar uchun juda mos keladi.",
    packageBg:
      'linear-gradient(135deg, #5E5043 0%, #8C7B65 50%, #3D332A 100%)',
    sizes: ['1.0'],
  },
  {
    id: 'green',
    name: lang === 'ru' ? 'МОШ' : lang === 'en' ? 'MUNG BEAN' : 'MOSH',
    subtitle:
      lang === 'ru'
        ? 'ОТБОРНЫЙ МОШ'
        : lang === 'en'
        ? 'SELECTED MUNG BEAN'
        : 'SARALANGAN MOSH',
    weight: lang === 'ru' ? '900 ГР' : lang === 'en' ? '900 G' : '900 GR',
    origin:
      lang === 'ru' ? 'ВЫСШИЙ СОРТ' : lang === 'en' ? 'PREMIUM GRADE' : 'OLIY NAV',
    color:
      lang === 'ru'
        ? 'ЗЕЛЁНЫЙ / БЕЛЫЙ'
        : lang === 'en'
        ? 'GREEN / WHITE'
        : 'YASHIL / OQ',
    bg: '#1A5C35',
    accent: '#0D3D20',
    text: '#6EE7B7',
    image: 'product-mosh-900.png',
    description:
      lang === 'ru'
        ? 'Отборный узбекский маш высочайшего качества. Богат белком, клетчаткой и витаминами группы B. Идеален для машкичири, супов и здорового питания.'
        : lang === 'en'
        ? 'Selected premium Uzbek mung beans. Rich in protein, fibre and B vitamins — perfect for traditional mashkichiri, soups and a healthy diet.'
        : "Eng yuqori sifatli saralangan o'zbek moshi. Oqsil, kletchatka va B vitaminlariga boy bo'lib, mashkichiri, sho'rva va sog'lom ovqatlanish uchun mukammal tanlovdir.",
    packageBg:
      'linear-gradient(135deg, #042010 0%, #0C4820 50%, #1A5C35 100%)',
    sizes: ['0.9'],
  },
  {
    id: 'brown',
    name: lang === 'ru' ? 'ГРЕЧКА' : lang === 'en' ? 'BUCKWHEAT' : 'GRECHKA',
    subtitle:
      lang === 'ru'
        ? 'ОТБОРНАЯ ГРЕЧКА'
        : lang === 'en'
        ? 'PREMIUM BUCKWHEAT'
        : 'SARALANGAN GRECHKA',
    weight: lang === 'ru' ? '900 ГР' : lang === 'en' ? '900 G' : '900 GR',
    origin:
      lang === 'ru' ? 'ВЫСШИЙ СОРТ' : lang === 'en' ? 'PREMIUM GRADE' : 'OLIY NAV',
    color:
      lang === 'ru'
        ? 'КОРИЧНЕВЫЙ / БЕЛЫЙ'
        : lang === 'en'
        ? 'BROWN / WHITE'
        : 'JIGARRANG / OQ',
    bg: '#7A4822',
    accent: '#4D2A12',
    text: '#FED7AA',
    image: 'product-grechka-900.webp',
    description:
      lang === 'ru'
        ? 'Отборная обжаренная гречка высшего сорта. Натуральная, питательная и легкая в приготовлении.'
        : lang === 'en'
        ? 'Selected roasted premium buckwheat. Natural, nutritious and easy to cook.'
        : "Oliy navli saralangan qovurilgan grechka. Tabiiy, to'yimli va tez pishadigan.",
    packageBg:
      'linear-gradient(135deg, #3D1C06 0%, #7A4822 50%, #9A5A2B 100%)',
    sizes: ['0.9'],
  },
]

// ─── Translations Dictionary ──────────────────────────────────────────────────
const translations = {
  uz: {
    sizeLabel: "O'lcham",
    gradeLabel: "Navi",
    colorLabel: "Qadoq rangi",
    sizeSelectorTitle: "O'lchamlar (kg)",
    productSelectorTitle: "Mahsulotni tanlash",
    detailsBtn: "► Batafsil",
    kg: 'kg',
  },
  ru: {
    sizeLabel: "Размер",
    gradeLabel: "Сорт",
    colorLabel: "Цвет упаковки",
    sizeSelectorTitle: "Размеры (кг)",
    productSelectorTitle: "Выбор продукта",
    detailsBtn: "► Подробнее",
    kg: 'кг',
  },
  en: {
    sizeLabel: "Size",
    gradeLabel: "Grade",
    colorLabel: "Package Color",
    sizeSelectorTitle: "Sizes (kg)",
    productSelectorTitle: "Select Product",
    detailsBtn: "► Details",
    kg: 'kg',
  },
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AsortHomePage() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const swiperRef = useRef<SwiperClass | null>(null)
  const router = useRouter()
  const { setHomeColor } = useHomeColor()
  const { language } = useLanguage()

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const products = useMemo(() => getProducts(language), [language])
  const product = products[active] || products[0]
  const t = translations[language] || translations.uz

  useEffect(() => {
    setHomeColor({ bg: product.bg, accent: product.accent, text: product.text })
  }, [setHomeColor, product.bg, product.accent, product.text])

  const handleThumbClick = (index: number) => {
    setActive(index)
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative select-none"
      style={{
        background: product.bg,
        transition: 'background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        /* Swiper Custom CSS overrides */
        .swiper {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thumb-btn { transition: transform .25s cubic-bezier(0.16, 1, 0.3, 1), outline .25s ease, border .25s ease; border-radius: 10px; overflow: hidden; }
        .thumb-btn:hover { transform: scale(1.08); }
        .thumb-btn.active-thumb { outline: 2px solid rgba(255,255,255,0.85); transform: scale(1.1); }

        @keyframes floatProduct {
          0%, 100% { transform: translateY(0) scale(var(--prod-scale, 1)); }
          50% { transform: translateY(-10px) scale(var(--prod-scale, 1)); }
        }
        @keyframes slideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .bg-glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }

        .main-product-img {
          aspect-ratio: 3 / 4;
          object-fit: contain;
          object-position: center;
          transition: height 0.4s ease, transform 0.4s ease;
          animation: floatProduct 6s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .home-hero-container {
            height: auto !important;
            min-height: calc(100vh - 80px) !important;
            padding: 1.5rem 1.25rem 3rem !important;
            gap: 1.5rem !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .title-mobile-box {
            order: 1 !important;
            text-align: center !important;
            width: 100% !important;
          }
          .main-img-mobile-box {
            order: 2 !important;
            min-height: 240px !important;
            margin: 0.5rem 0 !important;
            width: 100% !important;
          }
          .details-mobile-box {
            order: 3 !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .thumb-row {
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Top 5s slide progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50 overflow-hidden pointer-events-none">
        <div
          key={`bar-${active}`}
          className="h-full bg-white/70"
          style={{ animation: 'slideProgress 5s linear infinite' }}
        />
      </div>

      {/* Background glow */}
      <div
        className="bg-glow"
        style={{
          width: 600,
          height: 600,
          background: product.accent,
          opacity: 0.22,
          top: -100,
          right: 100,
          transition: 'background 0.7s ease',
        }}
      />

      {/* ── SWIPER MAIN CAROUSEL ── */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{
          delay: AUTO_ROTATE_SPEED_MS,
          disableOnInteraction: false,
        }}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setActive(swiper.realIndex)
        }}
        className="w-full h-full"
      >
        {products.map((p) => {
          const sizeConfig = PRODUCT_SIZES[p.id] || { heightDesktop: '440px', heightMobile: '280px', scale: 1.0 }
          return (
            <SwiperSlide key={p.id}>
              <div className="home-hero-container relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 pt-6 pb-10 h-[calc(100vh-100px)] gap-8 overflow-visible lg:overflow-hidden w-full">
                
                {/* MOBILE TOP TITLE */}
                <div className="title-mobile-box block md:hidden mb-2">
                  <h1 className="font-black uppercase text-white leading-none text-5xl mb-2 pt-11">
                    {p.name}
                  </h1>
                  <p className="font-bold uppercase tracking-widest text-sm" style={{ color: p.text }}>
                    {p.subtitle}
                  </p>
                </div>

                {/* DESKTOP LEFT INFO / SPECS */}
                <div className="details-mobile-box flex-1 max-w-xs">
                  <div className="hidden md:block">
                    <h1
                      className="font-black uppercase text-white leading-none mb-2 pt-8"
                      style={{ fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)' }}
                    >
                      {p.name}
                    </h1>
                    <p
                      className="font-bold uppercase tracking-widest mb-2"
                      style={{ color: p.text, fontSize: 16 }}
                    >
                      {p.subtitle}
                    </p>
                  </div>

                  <div
                    className="mt-3 md:mt-5 space-y-1.5"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {[
                      [t.sizeLabel, p.weight],
                      [t.gradeLabel, p.origin],
                      [t.colorLabel, p.color],
                    ].map(([k, v]) => (
                      <p
                        key={k}
                        className="text-white/50 text-xs tracking-wider uppercase font-medium"
                      >
                        <span className="text-white/30 mr-2">{k}</span>
                        {v}
                      </p>
                    ))}
                  </div>

                  {/* Size selector */}
                  <div className="mt-4 md:mt-7">
                    <p
                      className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2 md:mb-3 font-semibold"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {t.sizeSelectorTitle}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {p.sizes.map((s) => (
                        <button
                          key={s}
                          className="w-16 h-10 rounded-lg text-xs font-bold tracking-wide text-white transition-all duration-200 border border-white/40"
                          style={{ background: 'rgba(255,255,255,0.15)' }}
                        >
                          {s} {t.kg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product thumbnails */}
                  <div className="mt-4 md:mt-6">
                    <p
                      className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2 md:mb-3 font-semibold"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {t.productSelectorTitle}
                    </p>
                    <div className="thumb-row flex gap-3">
                      {products.map((item, i) => (
                        <button
                          key={item.id}
                          className={`thumb-btn ${i === active ? 'active-thumb' : ''}`}
                          onClick={() => handleThumbClick(i)}
                          title={item.name}
                          style={{
                            width: 54,
                            height: 54,
                            padding: 2,
                            borderRadius: 10,
                            overflow: 'hidden',
                            border:
                              i === active
                                ? `2px solid ${item.text}`
                                : '2px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.06)',
                            transition: 'transform 0.2s, border 0.2s',
                            cursor: 'pointer',
                          }}
                        >
                          <img
                            src={`${base}/images/${item.image}`}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              transform: `scale(${IMAGE_CONFIG.thumbScales[item.id] ?? 1.0})`,
                            }}
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CENTER — large product image */}
                <div
                  className="main-img-mobile-box relative flex-1 flex flex-col items-center justify-center gap-8"
                  style={{ minHeight: 320 }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                    style={{ overflow: 'hidden' }}
                  >
                    <span
                      className="font-black text-white uppercase"
                      style={{
                        fontSize: 'clamp(120px, 20vw, 280px)',
                        lineHeight: 1,
                        opacity: 0.08,
                        letterSpacing: '-0.02em',
                        transform: 'translateY(10px)',
                      }}
                    >
                      ASORT
                    </span>
                  </div>

                  <img
                    className="main-product-img"
                    src={`${base}/images/${p.image}`}
                    alt={p.name}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      height: isMobile ? sizeConfig.heightMobile : sizeConfig.heightDesktop,
                      maxHeight: isMobile ? '65vh' : '95vh',
                      ['--prod-scale' as string]: sizeConfig.scale,
                      filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.4))',
                    }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>

                {/* RIGHT — description + navigation buttons */}
                <div className="flex-1 max-w-xs text-right hidden md:flex flex-col items-end gap-6 z-20">
                  <p
                    className="text-white/50 text-xs leading-relaxed text-right"
                    style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                  >
                    {p.description}
                  </p>
                  <button
                    onClick={() => router.push(`/${language}/about`)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[11px] tracking-[0.3em] uppercase cursor-pointer"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    <span>{t.detailsBtn}</span>
                  </button>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all text-sm cursor-pointer"
                      title="Previous"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all text-sm cursor-pointer"
                      title="Next"
                    >
                      →
                    </button>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
