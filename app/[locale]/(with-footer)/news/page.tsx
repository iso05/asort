'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'
import { useLanguage } from '@/components/LanguageContext'
import { useParams } from 'next/navigation'

// ─── THEME ──────────────────────────────────────────────────────────────────
const LIGHT: Record<string, string> = {
  bg: '#FDFBF7', bgCard: '#FFFFFF', surface: '#F7F3ED', border: '#E6E1D8',
  line: 'rgba(0,0,0,0.07)', accent: '#2D5F3E', accentDeep: '#1D3F27',
  accentPale: 'rgba(45,95,62,0.06)', gold: '#C29F68', goldPale: 'rgba(194,159,104,0.10)',
  text: '#1A1F1C', textMid: '#4A5550', textMuted: '#8A9390',
}
const DARK: Record<string, string> = {
  bg: '#070E17', bgCard: '#0D1623', surface: '#101C2C', border: 'rgba(91,184,212,0.14)',
  line: 'rgba(255,255,255,0.06)', accent: '#5BB8D4', accentDeep: '#3A8FAE',
  accentPale: 'rgba(91,184,212,0.08)', gold: '#D4A04A', goldPale: 'rgba(212,160,74,0.10)',
  text: '#E4F0F5', textMid: '#7AB4C8', textMuted: '#4A7A90',
}

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const TX = {
  uz: {
    newsCenter: 'Asort Yangiliklar Markazi',
    heroTitle: 'Kompaniya',
    heroTitleItalic: 'Yangiliklari',
    heroSub: 'Asort oziq-ovqat kompaniyasining yangi mahsulotlari, hamkorliklar, sertifikatlar va muhim yutuqlari.',
    totalNews: 'Jami yangiliklar',
    newProducts: 'Yangi mahsulotlar',
    partnerships: 'Hamkorliklar',
    countries: 'Mamnun mijozlar',
    latest: 'Eng so\'nggi',
    archive: 'Arxiv',
    readMore: 'To\'liq o\'qish',
    allFilter: 'Barchasi',
    newsCount: (n: number) => `${n} ta yangilik`,
    noNews: 'Ushbu turkumda hozircha yangiliklar yo\'q.',
    showAll: 'Barchasini ko\'rsatish →',
    ctaLabel: 'Ulgurji savdo va tarqatish',
    ctaTitle: 'Mahsulotlarimiz sizni qiziqtirdimi?',
    ctaTitleItalic: 'Keling, gaplashamiz.',
    ctaContact: 'Bog\'lanish',
    ctaProducts: 'Mahsulotlarni ko\'rish',
    modalContact: 'Bog\'lanish',
    modalProducts: 'Mahsulotlar',
    categories: { 'new-product': 'Yangi mahsulot', company: 'Kompaniya', expansion: 'Kengayish', award: 'Mukofot', partnership: 'Hamkorlik' },
  },
  ru: {
    newsCenter: 'Центр новостей Asort',
    heroTitle: 'Новости',
    heroTitleItalic: 'компании',
    heroSub: 'Новые продукты, партнёрства, сертификаты и важные достижения компании Asort.',
    totalNews: 'Всего новостей',
    newProducts: 'Новые продукты',
    partnerships: 'Партнёрства',
    countries: 'Довольных клиентов',
    latest: 'Последние',
    archive: 'Архив',
    readMore: 'Читать полностью',
    allFilter: 'Все',
    newsCount: (n: number) => `${n} новостей`,
    noNews: 'В этой категории пока нет новостей.',
    showAll: 'Показать все →',
    ctaLabel: 'Оптовая торговля и дистрибуция',
    ctaTitle: 'Вас заинтересовала наша продукция?',
    ctaTitleItalic: 'Давайте поговорим.',
    ctaContact: 'Связаться',
    ctaProducts: 'Посмотреть продукты',
    modalContact: 'Связаться',
    modalProducts: 'Продукты',
    categories: { 'new-product': 'Новый продукт', company: 'Компания', expansion: 'Расширение', award: 'Награда', partnership: 'Партнёрство' },
  },
  en: {
    newsCenter: 'Asort News Centre',
    heroTitle: 'Company',
    heroTitleItalic: 'News',
    heroSub: 'New products, partnerships, certifications and key milestones from Asort Food Company.',
    totalNews: 'Total articles',
    newProducts: 'New products',
    partnerships: 'Partnerships',
    countries: 'Happy clients',
    latest: 'Latest',
    archive: 'Archive',
    readMore: 'Read more',
    allFilter: 'All',
    newsCount: (n: number) => `${n} articles`,
    noNews: 'No news in this category yet.',
    showAll: 'Show all →',
    ctaLabel: 'Wholesale & distribution',
    ctaTitle: 'Interested in our products?',
    ctaTitleItalic: "Let's talk.",
    ctaContact: 'Get in touch',
    ctaProducts: 'View products',
    modalContact: 'Get in touch',
    modalProducts: 'Products',
    categories: { 'new-product': 'New product', company: 'Company', expansion: 'Expansion', award: 'Award', partnership: 'Partnership' },
  },
}

// ─── DATA ────────────────────────────────────────────────────────────────────
type CategoryKey = 'new-product' | 'company' | 'expansion' | 'award' | 'partnership'

type NewsItem = {
  id: number
  categoryKey: CategoryKey
  date: { uz: string; ru: string; en: string }
  title: { uz: string; ru: string; en: string }
  summary: { uz: string; ru: string; en: string }
  body: { uz: string[]; ru: string[]; en: string[] }
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    categoryKey: 'new-product',
    date: { uz: '1-mart, 2025', ru: '1 марта 2025', en: 'March 1, 2025' },
    title: {
      uz: 'Asort no\'xati taqdim etildi — bizning eng yangi premium dukkakli mahsulotimiz',
      ru: 'Представлен горох Asort — наш новейший премиальный бобовый продукт',
      en: 'Asort chickpeas launched — our newest premium legume product',
    },
    summary: {
      uz: '12 ta xo\'jalikda 18 oylik izlanish va sifat nazoratidan so\'ng, biz 1 kg, 5 kg va 25 kg hajmda butun quritilgan no\'xat mahsulotini taqdim etishdan faxrlanamiz.',
      ru: 'После 18 месяцев исследований и контроля качества на 12 хозяйствах, мы рады представить цельный сушёный горох в фасовке 1 кг, 5 кг и 25 кг.',
      en: 'After 18 months of research and quality control across 12 farms, we are proud to present whole dried chickpeas in 1 kg, 5 kg and 25 kg formats.',
    },
    body: {
      uz: [
        'Asort kompaniyasi o\'zining premium mahsulotlar qatoridagi beshinchi va Asort yorlig\'i ostidagi ikkinchi dukkakli mahsulot — butun quritilgan no\'xat rasman sotuvga chiqarilganini e\'lon qilishdan faxrlanadi.',
        'Farg\'ona vodiysidagi sertifikatlangan organik fermer xo\'jaliklaridan olingan ushbu no\'xat o\'lchami bir xilligi bo\'yicha qo\'lda saralanadi.',
        'Mahsulot 18 oylik izlanishlar natijasi bo\'lib, sifat nazorati bo\'limimiz 12 ta turli xo\'jaliklardan olingan 40 dan ortiq partiyani sinovdan o\'tkazdi.',
        '1 kg, 5 kg va 25 kg hajmda mavjud — barcha tarqatish bo\'yicha hamkorlarimizga darhol yetkazib beriladi.',
      ],
      ru: [
        'Asort с гордостью объявляет о выходе пятого продукта в премиальной линейке — цельного сушёного гороха, второго бобового продукта под маркой Asort.',
        'Горох получен с сертифицированных органических ферм в Ферганской долине и сортируется вручную по однородности размера.',
        'Продукт является результатом 18-месячных исследований, в ходе которых отдел контроля качества проверил более 40 партий с 12 разных ферм.',
        'Доступен в фасовке 1 кг, 5 кг и 25 кг — немедленная поставка всем дистрибьюторским партнёрам.',
      ],
      en: [
        'Asort is proud to announce the launch of the fifth product in its premium range — whole dried chickpeas, the second legume product under the Asort label.',
        'Sourced from certified organic farms in the Fergana Valley, the chickpeas are hand-sorted for size uniformity.',
        'The product is the result of 18 months of research during which the quality control team tested over 40 batches from 12 different farms.',
        'Available in 1 kg, 5 kg and 25 kg — immediate delivery to all distribution partners.',
      ],
    },
  },
  {
    id: 2,
    categoryKey: 'new-product',
    date: { uz: '18-fevral, 2025', ru: '18 февраля 2025', en: 'February 18, 2025' },
    title: {
      uz: 'Sovuq presslangan kungaboqar yog\'i endi 1L va 5L hajmlarda',
      ru: 'Масло холодного отжима теперь доступно в объёмах 1 л и 5 л',
      en: 'Cold-pressed sunflower oil now available in 1 L and 5 L',
    },
    summary: {
      uz: 'Bizning birinchi yog\' mahsulotimiz — Ukraina fermer xo\'jaliklaridan sovuq presslangan kungaboqar yog\'i endi Asort qatorida. E vitaminiga boy, qo\'shimchalarsiz, saqlash muddati 18 oy.',
      ru: 'Наш первый масличный продукт — подсолнечное масло холодного отжима с украинских ферм — теперь в линейке Asort. Богато витамином E, без добавок, срок хранения 18 месяцев.',
      en: 'Our first oil product — cold-pressed sunflower oil from Ukrainian farms — is now in the Asort range. Rich in vitamin E, additive-free, 18-month shelf life.',
    },
    body: {
      uz: [
        'Asort sovuq presslangan kungaboqar yog\'ini ishga tushirish orqali yog\'lar segmentiga kirdi. Bu bizning birinchi yog\' mahsulotimiz bo\'lib, yetkazib beruvchini ikki yil davomida baholash natijasidir.',
        'Yog\' tabiiy E vitaminini (100 ml ga 41 mg) saqlab qoladigan sovuq presslash usulida ishlab chiqariladi.',
        'Salatlar hamda past haroratda pishirish uchun juda mos bo\'lgan toza, neytral ta\'mga ega.',
        'Chakana savdo va mehmonxona distribyutorlari uchun 1 litr va 5 litr hajmda mavjud.',
      ],
      ru: [
        'Asort вышел в сегмент масел, запустив масло холодного отжима. Это наш первый масличный продукт, ставший результатом двухлетней оценки поставщика.',
        'Масло производится методом холодного отжима, сохраняющим натуральный витамин E (41 мг на 100 мл) без рафинирования и дезодорирования.',
        'Обладает чистым нейтральным вкусом, идеально подходит для салатов и приготовления при низких температурах.',
        'Доступно в объёмах 1 и 5 литров для розничной торговли и дистрибьюторов HoReCa.',
      ],
      en: [
        'Asort has entered the oils segment by launching cold-pressed sunflower oil. This is our first oil product, the result of a two-year supplier evaluation.',
        'The oil is produced using a single cold-press method that preserves natural vitamin E (41 mg per 100 ml) without refining or deodorising.',
        'It has a clean, neutral flavour, well suited for salads and low-temperature cooking.',
        'Available in 1-litre and 5-litre formats for retail, foodservice, and hotel distributors.',
      ],
    },
  },
  {
    id: 3,
    categoryKey: 'partnership',
    date: { uz: '12-fevral, 2025', ru: '12 февраля 2025', en: 'February 12, 2025' },
    title: {
      uz: 'Asort FreshMart Group bilan distribyutorlik shartnomasini imzoladi — 320 dan ortiq do\'konlar',
      ru: 'Asort подписал дистрибьюторский договор с FreshMart Group — более 320 магазинов',
      en: 'Asort signs distribution agreement with FreshMart Group — 320+ stores',
    },
    summary: {
      uz: 'Barcha Asort mahsulotlari 2025-yilning birinchi choragidan boshlab FreshMart Group\'ning 320 dan ortiq chakana savdo do\'konlarida taqdim etiladi.',
      ru: 'Все продукты Asort будут представлены в более чем 320 розничных магазинах FreshMart Group начиная с первого квартала 2025 года.',
      en: 'All Asort products will be featured in FreshMart Group\'s 320+ retail stores starting Q1 2025 — our largest retail partnership to date.',
    },
    body: {
      uz: [
        'Asort mintaqadagi eng yirik supermarketlar tarmoqlaridan biri bo\'lgan FreshMart Group bilan muhim distribyutorlik shartnomasini imzoladi.',
        'Kelishuv barcha Asort mahsulotlarini qamrab oladi va maxsus peshtaxtalar, brendli ko\'rgazma stendlari va qo\'shma reklama aksiyalarini o\'z ichiga oladi.',
        'Bu Asort\'ning bugungi kungacha bo\'lgan eng yirik chakana hamkorligi bo\'lib, 18 oy ichida kompaniyaning iste\'molchilarga yetib borish qamrovini uch baravar oshirishi kutilmoqda.',
      ],
      ru: [
        'Asort подписал важный дистрибьюторский договор с FreshMart Group — одной из крупнейших сетей супермаркетов в регионе с более чем 320 филиалами в семи странах.',
        'Соглашение охватывает всю продуктовую линейку Asort и включает специальные полки, брендированные дисплеи и совместные рекламные акции.',
        'Это крупнейшее розничное партнёрство Asort на сегодняшний день — ожидается трёхкратный рост охвата потребителей за 18 месяцев.',
      ],
      en: [
        'Asort has signed a significant distribution agreement with FreshMart Group, one of the largest supermarket chains in the region with more than 320 branches in seven countries.',
        'The deal covers the full Asort product range and includes dedicated shelf space, branded display units, and joint promotional campaigns throughout 2025.',
        'This is Asort\'s largest retail partnership to date, expected to triple the company\'s consumer reach within 18 months.',
      ],
    },
  },
  {
    id: 4,
    categoryKey: 'award',
    date: { uz: '28-yanvar, 2025', ru: '28 января 2025', en: 'January 28, 2025' },
    title: {
      uz: 'Crystal White Sugar mahsuloti Oltin Standart sertifikatiga loyiq ko\'rildi',
      ru: 'Crystal White Sugar удостоена сертификата «Золотой стандарт»',
      en: 'Crystal White Sugar awarded the Gold Standard certificate',
    },
    summary: {
      uz: 'Bizning yetakchi shakar mahsulotimiz yuqori tozaligi (99.9%) uchun xalqaro Oltin Standart belgisini oldi.',
      ru: 'Наш ведущий сахарный продукт получил международный знак «Золотой стандарт» за высокую степень чистоты (99,9%).',
      en: 'Our flagship sugar product received the international Gold Standard mark for high purity (99.9%) and verified sustainable sourcing.',
    },
    body: {
      uz: [
        'Asort kompaniyasining Crystal White Sugar mahsuloti Xalqaro Oziq-ovqat Sifati Instituti tomonidan Oltin Standart sertifikati bilan taqdirlandi.',
        'Sertifikatlash 14 oylik ta\'minot zanjiri auditini, turli partiyalar bo\'yicha laboratoriya tahlillarini va joyida tekshirishni o\'z ichiga oldi.',
        'Asort endilikda Markaziy Osiyoda ushbu maqomga ega bo\'lgan 30 tadan kam oziq-ovqat kompaniyalaridan biridir.',
      ],
      ru: [
        'Crystal White Sugar компании Asort была удостоена сертификата «Золотой стандарт» Международного института качества пищевых продуктов.',
        'Сертификация включала 14-месячный аудит цепочки поставок, лабораторный анализ различных партий и инспекцию ферм на месте.',
        'Asort теперь входит в число менее чем 30 продовольственных компаний Центральной Азии, имеющих этот статус.',
      ],
      en: [
        'Asort\'s Crystal White Sugar product was awarded the Gold Standard certificate by the International Food Quality Institute.',
        'The certification involved a 14-month supply chain audit, laboratory analysis of multiple batches, and on-site farm inspections.',
        'Asort is now one of fewer than 30 food companies in Central Asia to hold this status.',
      ],
    },
  },
  {
    id: 5,
    categoryKey: 'expansion',
    date: { uz: '14-yanvar, 2025', ru: '14 января 2025', en: 'January 14, 2025' },
    title: {
      uz: 'Asort guruchi BAA va Qatardagi 18 ta mehmonxona guruhlari tomonidan tanlandi',
      ru: 'Рис Asort выбран 18 гостиничными группами в ОАЭ и Катаре',
      en: 'Asort rice selected by 18 hotel groups in UAE and Qatar',
    },
    summary: {
      uz: 'Bizning uzun donli guruchimiz Fors ko\'rfazi mintaqasidagi 18 ta hashamatli mehmonxona guruhlari uchun asosiy guruch sifatida tanlandi.',
      ru: 'Наш длиннозёрный рис выбран в качестве основного риса для 18 элитных гостиничных групп в регионе Персидского залива.',
      en: 'Our long-grain rice has been selected as the house rice for 18 luxury hotel groups in the Gulf region, covering 4,200+ rooms.',
    },
    body: {
      uz: [
        'Asort uzun donli guruchi 30 dan ortiq yetkazib beruvchilarni baholagan tanlov natijasida BAA va Qatardagi 18 ta hashamatli mehmonxonalar uchun asosiy guruch etib tanlandi.',
        'Fors ko\'rfazi mintaqasi endilikda hajmi bo\'yicha Asort\'ning uchinchi eng yirik eksport bozori hisoblanadi.',
        'Kompaniya 2025-yilda Saudiya Arabistoni va Quveytda mehmonxonalarga yo\'naltirilgan savdo dasturini kengaytirishni rejalashtirmoqda.',
      ],
      ru: [
        'Рис Asort был выбран в качестве основного риса для 18 элитных отелей в ОАЭ и Катаре по результатам тендера с участием более 30 поставщиков.',
        'Регион Персидского залива теперь является третьим по объёму экспортным рынком Asort.',
        'Компания планирует расширить ориентированную на гостиничный бизнес торговую программу в Саудовской Аравии и Кувейте в 2025 году.',
      ],
      en: [
        'Asort long-grain rice was selected as the house rice for 18 luxury hotels in UAE and Qatar following a tender that evaluated over 30 suppliers.',
        'The Gulf region is now Asort\'s third-largest export market by volume.',
        'The company plans to expand its hospitality-focused trading programme to Saudi Arabia and Kuwait in 2025.',
      ],
    },
  },
  {
    id: 6,
    categoryKey: 'company',
    date: { uz: '18-dekabr, 2024', ru: '18 декабря 2024', en: 'December 18, 2024' },
    title: {
      uz: 'Asort endi to\'rtta qit\'adagi 40 ta mamlakatga mahsulot yetkazib beradi',
      ru: 'Asort теперь поставляет продукцию в 40 стран на четырёх континентах',
      en: 'Asort now delivers to 40 countries across four continents',
    },
    summary: {
      uz: 'Asort mahsulotlari endi butun dunyo bo\'ylab 40 ta mamlakatga yetkazib berilmoqda.',
      ru: 'Продукция Asort теперь поставляется в 40 стран по всему миру, включая Центральную Азию, Европу, Ближний Восток и Южную Азию.',
      en: 'Asort products now reach 40 countries worldwide, including Central Asia, Europe, the Middle East, and South Asia.',
    },
    body: {
      uz: [
        'Asort faol distribyutsiya amalga oshiriladigan 40 ta mamlakatga yetib bordi — bu sifatga sodiqlik va barqaror o\'sish o\'n yilligini ifodalovchi muhim ko\'rsatkichdir.',
        'Ushbu maqsadga 2024-yil noyabr oyida Asort Portugaliyadagi chakana savdo hamkoriga muntazam jo\'natmalarni boshlaganida erishildi.',
        'Kompaniya 2027-yilga kelib mamlakatlar sonini 60 taga yetkazishni rejalashtirmoqda.',
      ],
      ru: [
        'Asort вышел на 40 стран с активной дистрибуцией — важный показатель, символизирующий десятилетие преданности качеству и устойчивого роста.',
        'Эта цель была достигнута в ноябре 2024 года, когда Asort начал регулярные поставки розничному партнёру в Португалии.',
        'Компания планирует довести количество стран до 60 к 2027 году.',
      ],
      en: [
        'Asort has reached 40 countries with active distribution — a significant milestone representing a decade of commitment to quality and steady growth.',
        'The milestone was reached in November 2024 when Asort began regular shipments to a retail partner in Portugal.',
        'The company plans to reach 60 countries by 2027.',
      ],
    },
  },
  {
    id: 7,
    categoryKey: 'company',
    date: { uz: '20-noyabr, 2024', ru: '20 ноября 2024', en: 'November 20, 2024' },
    title: {
      uz: 'Yangi qadoqlash liniyasi: barcha mahsulotlar uchun 80% qayta ishlanadi',
      ru: 'Новая линия упаковки: 80% перерабатываемости для всей продукции',
      en: 'New packaging line: 80% recyclable across all products',
    },
    summary: {
      uz: 'Asort\'ning yangi eko-qadoqlash dasturi barcha mahsulot yo\'nalishlarida ishga tushirildi. Plastikdan foydalanishni 60% ga kamaytiradi.',
      ru: 'Новая экологическая программа упаковки Asort запущена по всем продуктовым линейкам. Сокращает использование пластика на 60%.',
      en: 'Asort\'s new eco-packaging programme has launched across all product lines. It reduces plastic use by 60%.',
    },
    body: {
      uz: [
        'Asort barcha mahsulot qadoqlarining 80 foizini qayta ishlanadigan qiladigan yangi dasturni joriy qilmoqda.',
        'Yangi materiallar ko\'p qatlamli kraft qog\'oz laminatidan iborat bo\'lib, o\'simlik asosidagi namlik to\'sig\'iga ega.',
        'Barcha mahsulotlar uchun yaroqlilik muddati standartlari to\'liq saqlab qolinadi.',
      ],
      ru: [
        'Asort внедряет новую программу, которая делает 80% упаковки всей продукции перерабатываемой.',
        'Новые материалы изготовлены из многослойного крафт-бумажного ламината с влагозащитным барьером на растительной основе.',
        'Стандарты срока годности полностью сохраняются для всей продукции.',
      ],
      en: [
        'Asort is rolling out a new programme that makes 80% of all product packaging recyclable.',
        'The new materials consist of multi-layer kraft paper laminate with a plant-based moisture barrier, replacing traditional LDPE inner layers.',
        'Shelf-life standards are fully maintained across all products.',
      ],
    },
  },
  {
    id: 8,
    categoryKey: 'new-product',
    date: { uz: '10-oktabr, 2024', ru: '10 октября 2024', en: 'October 10, 2024' },
    title: {
      uz: 'Arpa yormasi Asort don mahsulotlari qatoriga qo\'shildi',
      ru: 'Перловая крупа пополнила линейку зерновых Asort',
      en: 'Pearl barley joins the Asort grain range',
    },
    summary: {
      uz: 'Qozog\'istonning sertifikatlangan fermer xo\'jaliklaridan keltirilgan, beta-glukan tolasiga boy tozalangan butun arpa yormasi endi 1 kg va 5 kg formatlarda mavjud.',
      ru: 'Очищенная цельная перловая крупа с сертифицированных казахстанских ферм, богатая бета-глюканом, теперь доступна в форматах 1 кг и 5 кг.',
      en: 'Polished whole pearl barley from certified Kazakhstani farms, rich in beta-glucan fibre, is now available in 1 kg and 5 kg formats.',
    },
    body: {
      uz: [
        'Asort o\'zining don mahsulotlari qatoriga tozalangan arpa yormasini qo\'shdi. U Qozog\'istondagi sertifikatlangan xo\'jaliklardan keltiriladi.',
        'Arpa yormasi har 100 grammda 4 g beta-glukan tolasini o\'z ichiga oladi — bu yurak sog\'lig\'ini qo\'llab-quvvatlash uchun klinik jihatdan tasdiqlangan miqdordir.',
      ],
      ru: [
        'Asort добавил перловую крупу в свою линейку зерновых. Она поставляется с сертифицированных хозяйств в Казахстане и продаётся в форматах 1 кг и 5 кг.',
        'Перловая крупа содержит 4 г бета-глюканового волокна на 100 г — клинически подтверждённое количество для поддержки здоровья сердца.',
      ],
      en: [
        'Asort has added pearl barley to its grain range. It is sourced from certified farms in Kazakhstan and launched in 1 kg and 5 kg formats.',
        'Pearl barley contains 4 g of beta-glucan fibre per 100 g — a clinically verified amount for supporting heart health and stable blood sugar.',
      ],
    },
  },
]

// ─── BREAKPOINT HOOK ─────────────────────────────────────────────────────────
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
    const m = () => { const w = window.innerWidth; setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop') }
    window.addEventListener('resize', m); return () => window.removeEventListener('resize', m)
  }, [])
  return bp
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(14px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>{children}</div>
}

function IconArrow({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
}
function IconClose({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13" /></svg>
}

function CatBadge({ catKey, C, tx }: { catKey: CategoryKey; C: Record<string, string>; tx: typeof TX.uz }) {
  const isAward = catKey === 'award'
  const bg = isAward ? C.goldPale : C.accentPale
  const color = isAward ? C.gold : C.accent
  const bdr = isAward ? C.gold + '40' : C.accent + '30'
  return (
    <span style={{ background: bg, color, border: `1px solid ${bdr}`, fontFamily: "'DM Sans',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 2, flexShrink: 0 }}>
      {tx.categories[catKey]}
    </span>
  )
}

function NewsModal({ item, onClose, C, isDark, isMobile, lang, tx }: { item: NewsItem; onClose: () => void; C: Record<string, string>; isDark: boolean; isMobile: boolean; lang: 'uz' | 'ru' | 'en'; tx: typeof TX.uz }) {
  const locale = useParams()?.locale || 'uz'
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(5,10,18,0.78)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', padding: isMobile ? 0 : 24, animation: 'fadeOv 0.2s ease forwards' }}>
      <style>{`@keyframes fadeOv{from{opacity:0}to{opacity:1}} @keyframes slideMod{from{opacity:0;transform:translateY(18px) scale(0.97)}to{opacity:1;transform:none}} @keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:none}}`}</style>
      <div onClick={e => e.stopPropagation()} style={{ background: C.bgCard, borderRadius: isMobile ? '12px 12px 0 0' : 2, maxWidth: isMobile ? '100%' : 600, width: '100%', maxHeight: isMobile ? '92dvh' : '88vh', overflowY: 'auto', border: isMobile ? 'none' : `1px solid ${C.border}`, boxShadow: '0 40px 120px rgba(0,0,0,0.4)', animation: isMobile ? 'slideUp 0.3s cubic-bezier(.22,.68,0,1.05) forwards' : 'slideMod 0.26s ease forwards' }}>
        {isMobile && <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}><div style={{ width: 34, height: 4, borderRadius: 99, background: C.border }} /></div>}
        <div style={{ padding: isMobile ? '24px 20px 20px' : '36px 40px 28px', borderBottom: `1px solid ${C.border}`, position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: isMobile ? 20 : 28, right: isMobile ? 16 : 36, zIndex: 10, width: 32, height: 32, borderRadius: 2, background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconClose size={14} color={C.textMuted} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <CatBadge catKey={item.categoryKey} C={C} tx={tx} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.textMuted, letterSpacing: '0.08em' }}>{item.date[lang]}</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: isMobile ? '1.65rem' : 'clamp(1.8rem,3.5vw,2.4rem)', color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em', paddingRight: 44 }}>{item.title[lang]}</h2>
        </div>
        <div style={{ padding: isMobile ? '20px 20px 32px' : '28px 40px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: C.textMid, lineHeight: 1.85, fontWeight: 400, borderLeft: `2px solid ${C.accent}`, paddingLeft: 16 }}>{item.summary[lang]}</p>
          <div style={{ height: 1, background: C.line }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {item.body[lang].map((para, i) => <p key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: C.textMid, lineHeight: 1.9, fontWeight: 300 }}>{para}</p>)}
          </div>
          <div style={{ height: 1, background: C.line }} />
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 10 }}>
            <Link href={`/${locale}/contact`} prefetch={false} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 2, background: C.accent, color: '#fff', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none' }}>
              {tx.modalContact} <IconArrow size={12} color="#fff" />
            </Link>
            <Link href={`/${locale}/products`} prefetch={false} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', borderRadius: 2, background: C.surface, color: C.textMid, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', border: `1px solid ${C.border}` }}>
              {tx.modalProducts} <IconArrow size={12} color={C.textMid} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedCard({ item, onOpen, C, isMobile, accent, lang, tx }: { item: NewsItem; onOpen: () => void; C: Record<string, string>; isMobile: boolean; accent: boolean; lang: 'uz' | 'ru' | 'en'; tx: typeof TX.uz }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onOpen} style={{ background: accent ? (hov ? C.accent : C.accentPale) : C.bgCard, border: `1px solid ${hov ? C.accent : C.border}`, borderRadius: 2, padding: isMobile ? '22px 18px' : '32px 32px 28px', cursor: 'pointer', transition: 'border-color 0.2s,box-shadow 0.2s,background 0.2s,transform 0.2s', transform: hov ? 'translateY(-2px)' : 'none', boxShadow: hov ? '0 16px 48px rgba(0,0,0,0.08)' : 'none', display: 'flex', flexDirection: 'column', gap: 16, height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <CatBadge catKey={item.categoryKey} C={C} tx={tx} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: accent && hov ? 'rgba(255,255,255,0.6)' : C.textMuted, letterSpacing: '0.06em' }}>{item.date[lang]}</span>
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: isMobile ? '1.45rem' : '1.7rem', color: accent && hov ? '#fff' : C.text, lineHeight: 1.12, letterSpacing: '-0.015em', flex: 1, transition: 'color 0.2s' }}>{item.title[lang]}</h3>
      {!isMobile && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: accent && hov ? 'rgba(255,255,255,0.75)' : C.textMid, lineHeight: 1.8, fontWeight: 300, transition: 'color 0.2s' }}>{item.summary[lang]}</p>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: `1px solid ${accent && hov ? 'rgba(255,255,255,0.18)' : C.border}`, transition: 'border-color 0.2s' }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase', color: accent && hov ? 'rgba(255,255,255,0.8)' : C.accent, transition: 'color 0.2s' }}>{tx.readMore}</span>
        <span style={{ color: accent && hov ? '#fff' : C.accent, transition: 'all 0.2s', transform: hov ? 'translateX(4px)' : 'none', display: 'flex', alignItems: 'center' }}>
          <IconArrow size={14} color={accent && hov ? '#fff' : C.accent} />
        </span>
      </div>
    </div>
  )
}

function NewsRow({ item, onOpen, C, isMobile, isLast, lang, tx }: { item: NewsItem; onOpen: () => void; C: Record<string, string>; isMobile: boolean; isLast: boolean; lang: 'uz' | 'ru' | 'en'; tx: typeof TX.uz }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onOpen} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr auto' : '120px 1fr auto', alignItems: 'center', gap: isMobile ? 12 : 24, borderBottom: isLast ? 'none' : `1px solid ${C.line}`, cursor: 'pointer', background: hov ? C.accentPale : 'transparent', transition: 'background 0.18s', borderRadius: 2, margin: '0 -8px', padding: isMobile ? '16px 8px' : '18px 8px' }}>
      {!isMobile && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.textMuted, letterSpacing: '0.06em', flexShrink: 0 }}>{item.date[lang]}</span>}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isMobile ? 4 : 5, flexWrap: 'wrap' }}>
          <CatBadge catKey={item.categoryKey} C={C} tx={tx} />
          {isMobile && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: C.textMuted }}>{item.date[lang]}</span>}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: isMobile ? '1.1rem' : '1.15rem', color: hov ? C.accent : C.text, lineHeight: 1.2, letterSpacing: '-0.01em', transition: 'color 0.18s' }}>{item.title[lang]}</p>
      </div>
      <div style={{ transition: 'transform 0.18s', transform: hov ? 'translateX(4px)' : 'none', flexShrink: 0 }}>
        <IconArrow size={14} color={hov ? C.accent : C.border} />
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const params = useParams()
  const locale = (params?.locale || 'uz') as 'uz' | 'ru' | 'en'
  const { theme } = useTheme()
  const { language } = useLanguage()
  const lang = language as 'uz' | 'ru' | 'en'
  const tx = TX[lang] || TX.uz
  const C = theme === 'dark' ? DARK : LIGHT
  const isDark = theme === 'dark'

  const bp = useBreakpoint()
  const ready = bp !== undefined
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const CATEGORY_KEYS: CategoryKey[] = ['new-product', 'company', 'expansion', 'award', 'partnership']

  const [activeCategory, setActiveCategory] = useState<'all' | CategoryKey>('all')
  const [openItem, setOpenItem] = useState<NewsItem | null>(null)

  const featured = NEWS.slice(0, 2)
  const archive = useMemo(() => {
    const rest = NEWS.slice(2)
    if (activeCategory === 'all') return rest
    return rest.filter(n => n.categoryKey === activeCategory)
  }, [activeCategory])

  const px = isMobile ? '16px' : isTablet ? '28px' : '56px'

  return (
    <div style={{ background: C.bg, minHeight: '100vh', transition: 'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:99px; }
        .nf-chip { font-family:'DM Sans',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; padding:6px 14px; border-radius:2px; cursor:pointer; border:1px solid ${C.border}; background:transparent; color:${C.textMuted}; transition:border-color 0.15s,color 0.15s,background 0.15s; white-space:nowrap; flex-shrink:0; }
        .nf-chip:hover { border-color:${C.accent}; color:${C.accent}; }
        .nf-chip.active { background:${C.accent}; border-color:${C.accent}; color:#fff; }
        .chip-scroll { overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; }
        .chip-scroll::-webkit-scrollbar { display:none; }
      `}</style>

      {!ready && <div style={{ minHeight: '100vh' }} />}

      {ready && (
        <>
          {/* HERO */}
          <div style={{ background: isDark ? '#070E17' : '#FDFBF7', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: `${isMobile ? '90px' : '110px'} ${px} 0` }}>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: isMobile ? 24 : 36 }}>
                  <div style={{ flex: 1, height: 1, background: C.border }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: '0.52em', textTransform: 'uppercase', color: C.accent, whiteSpace: 'nowrap' }}>{tx.newsCenter}</span>
                  <div style={{ flex: 1, height: 1, background: C.border }} />
                </div>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 28 }}>
                  <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: isMobile ? 'clamp(2.8rem,11vw,3.8rem)' : 'clamp(4rem,7vw,7rem)', color: C.text, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                    {tx.heroTitle}{' '}<em style={{ fontStyle: 'italic', color: C.accent, fontWeight: 300 }}>{tx.heroTitleItalic}</em>
                  </h1>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: isMobile ? 13 : 15, color: C.textMid, lineHeight: 1.85, maxWidth: 460, margin: isMobile ? '14px auto 0' : '20px auto 0' }}>{tx.heroSub}</p>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', marginTop: isMobile ? 28 : 40 }}>
                  {[
                    { v: `${NEWS.length}`, l: tx.totalNews },
                    { v: `${NEWS.filter(n => n.categoryKey === 'new-product').length}`, l: tx.newProducts },
                    { v: `${NEWS.filter(n => n.categoryKey === 'partnership').length}`, l: tx.partnerships },
                    { v: '1000+', l: tx.countries },
                  ].map(({ v, l }, i) => (
                    <div key={l} style={{ padding: isMobile ? '16px 0' : '20px 0', textAlign: 'center', borderLeft: i > 0 ? `1px solid ${C.border}` : 'none', borderBottom: `1px solid ${C.border}`, borderTop: isMobile && i >= 2 ? `1px solid ${C.border}` : 'none' }}>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: isMobile ? 26 : 32, color: C.text, lineHeight: 1, marginBottom: 5 }}>{v}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.textMuted }}>{l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: `${isMobile ? '40px' : '64px'} ${px} 80px` }}>
            {/* FEATURED */}
            <Reveal>
              <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: isMobile ? 20 : 28 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.38em', textTransform: 'uppercase', color: C.accent }}>{tx.latest}</span>
                  <div style={{ flex: 1, height: 1, background: C.border }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 16 }}>
                  {featured.map((item, i) => (
                    <FeaturedCard key={item.id} item={item} onOpen={() => setOpenItem(item)} C={C} isMobile={isMobile} accent={i === 0} lang={lang} tx={tx} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ARCHIVE */}
            <Reveal delay={60}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.38em', textTransform: 'uppercase', color: C.textMuted }}>{tx.archive}</span>
                  <div style={{ flex: 1, height: 1, background: C.border }} />
                </div>
                <div className="chip-scroll" style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 28 }}>
                  <button className={`nf-chip ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>{tx.allFilter}</button>
                  {CATEGORY_KEYS.map(cat => (
                    <button key={cat} className={`nf-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{tx.categories[cat]}</button>
                  ))}
                  <span style={{ marginLeft: 'auto', fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.textMuted, flexShrink: 0, paddingLeft: 8 }}>{tx.newsCount(archive.length)}</span>
                </div>
                {archive.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '52px 0', borderTop: `1px solid ${C.border}` }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 20, color: C.textMuted, marginBottom: 10 }}>{tx.noNews}</p>
                    <button onClick={() => setActiveCategory('all')} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.accent, background: 'none', border: 'none', cursor: 'pointer' }}>{tx.showAll}</button>
                  </div>
                ) : (
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    {archive.map((item, i) => (
                      <NewsRow key={item.id} item={item} onOpen={() => setOpenItem(item)} C={C} isMobile={isMobile} isLast={i === archive.length - 1} lang={lang} tx={tx} />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={100}>
              <div style={{ marginTop: isMobile ? 52 : 80, padding: isMobile ? '28px 20px' : '48px 56px', background: isDark ? 'linear-gradient(140deg,#0D1623 0%,#070E17 100%)' : 'linear-gradient(140deg,#2D5F3E 0%,#1D3F27 100%)', borderRadius: 2, border: '1px solid rgba(45,95,62,0.18)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 22 : 40, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -40, bottom: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: '0.44em', textTransform: 'uppercase', color: '#C29F68', marginBottom: 12 }}>{tx.ctaLabel}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: isMobile ? '1.65rem' : 'clamp(1.65rem,3vw,2.4rem)', color: '#FDFBF7', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
                    {tx.ctaTitle}{' '}<span style={{ fontStyle: 'italic', fontWeight: 300 }}>{tx.ctaTitleItalic}</span>
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 10, position: 'relative', zIndex: 1, width: isMobile ? '100%' : 'auto' }}>
                  <Link href={`/${locale}/products`} prefetch={false} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', borderRadius: 2, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#E4F0F5', fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.20em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    {tx.ctaProducts} <IconArrow size={12} color="#E4F0F5" />
                  </Link>
                  <Link href={`/${locale}/contact`} prefetch={false} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', borderRadius: 2, background: '#FDFBF7', color: '#2D5F3E', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.20em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 6px 24px rgba(45,95,62,0.18)', whiteSpace: 'nowrap' }}>
                    {tx.ctaContact} <IconArrow size={12} color="#2D5F3E" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {openItem && <NewsModal item={openItem} onClose={() => setOpenItem(null)} C={C} isDark={isDark} isMobile={isMobile} lang={lang} tx={tx} />}
        </>
      )}
    </div>
  )
}
