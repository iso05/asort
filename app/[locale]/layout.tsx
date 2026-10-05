import { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asort.uz'

const BRAND_KEYWORDS = [
  'asort',
  'asortuz',
  'asort.uz',
  'asort-uz',
  'asort uz',
  'Asort',
  'ASORT',
  'Asort uz',
  'Asort-uz',
  'Asort.uz',
  'ASORTUZ',
  'ASORT UZ',
  'ASORT.UZ',
]

export async function generateStaticParams() {
  return [
    { locale: 'uz' },
    { locale: 'ru' },
    { locale: 'en' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'ru') {
    return {
      title: 'Сахар, Рис, Маш, Гречка, Фасоль | Asort — asort.uz | +998 99 010 04 90',
      description:
        'Отборные продукты питания из Узбекистана и Центральной Азии: сахар, рис (Аланга, Лазер), маш, гречка и фасоль. Оптовые и розничные поставки. Телефон: +998 99 010 04 90.',
      keywords: [
        ...BRAND_KEYWORDS,
        'сахар',
        'рис',
        'фасоль',
        'маш',
        'гречка',
        'продукты питания',
        'сахар оптом',
        'рис аланга',
        'рис лазер',
        'бобовые',
        'цена сахара',
        'цена риса',
        'фасоль оптом',
        'маш оптом',
        'ташкент продукты',
        'узбекистан экспортер',
        '+998 99 010 04 90',
        '+998990100490',
        '990100490',
      ],
      alternates: {
        canonical: `${BASE_URL}/ru`,
        languages: {
          'uz-UZ': `${BASE_URL}/uz`,
          'ru-RU': `${BASE_URL}/ru`,
          'en-US': `${BASE_URL}/en`,
        },
      },
      openGraph: {
        title: 'Сахар, Рис, Маш, Гречка, Фасоль | Asort — asort.uz',
        description:
          'Отборные продукты питания: сахар, рис, маш, гречка и фасоль. Заказ по телефону: +998 99 010 04 90.',
        url: `${BASE_URL}/ru`,
        locale: 'ru_RU',
        siteName: 'Asort',
        type: 'website',
      },
    }
  }

  if (locale === 'en') {
    return {
      title: 'Sugar, Rice, Mung Beans, Buckwheat, Beans | Asort — asort.uz | +998 99 010 04 90',
      description:
        'Selected food products from Uzbekistan and Central Asia: sugar, rice (Alanga, Lazer), mung beans, buckwheat, and beans. Wholesale and retail supply. Phone: +998 99 010 04 90.',
      keywords: [
        ...BRAND_KEYWORDS,
        'sugar',
        'rice',
        'beans',
        'mung beans',
        'buckwheat',
        'food products',
        'sugar wholesale',
        'alanga rice',
        'lazer rice',
        'legumes',
        'sugar price',
        'rice price',
        'beans wholesale',
        'mung bean exporter',
        'uzbekistan food exporter',
        '+998 99 010 04 90',
        '+998990100490',
        '990100490',
      ],
      alternates: {
        canonical: `${BASE_URL}/en`,
        languages: {
          'uz-UZ': `${BASE_URL}/uz`,
          'ru-RU': `${BASE_URL}/ru`,
          'en-US': `${BASE_URL}/en`,
        },
      },
      openGraph: {
        title: 'Sugar, Rice, Mung Beans, Buckwheat, Beans | Asort — asort.uz',
        description:
          'Quality food products: sugar, rice, mung beans, buckwheat, and beans. Contact: +998 99 010 04 90.',
        url: `${BASE_URL}/en`,
        locale: 'en_US',
        siteName: 'Asort',
        type: 'website',
      },
    }
  }

  // Default: uz
  return {
    title: 'Shakar, Guruch, Mosh, Grechka, Fasol | Asort — asort.uz | +998 99 010 04 90',
    description:
      'O‘zbekiston va Markaziy Osiyo bo‘yicha sifatli shakar, guruch (Alanga, Lazer), mosh, grechka va fasol oziq-ovqat mahsulotlari. Ulgurji va chakana savdo. Telefon: +998 99 010 04 90.',
    keywords: [
      ...BRAND_KEYWORDS,
      'shakar',
      'guruch',
      'fasol',
      'mosh',
      'grechka',
      'oziq-ovqat',
      'shakar ulgurji',
      'guruch alanga',
      'guruch lazer',
      'dukkaklilar',
      'shakar narxi',
      'guruch narxi',
      'fasol narxi',
      'mosh narxi',
      'asort oziq ovqat',
      'asort optom',
      '+998 99 010 04 90',
      '+998990100490',
      '990100490',
    ],
    alternates: {
      canonical: `${BASE_URL}/uz`,
      languages: {
        'uz-UZ': `${BASE_URL}/uz`,
        'ru-RU': `${BASE_URL}/ru`,
        'en-US': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: 'Shakar, Guruch, Mosh, Grechka, Fasol | Asort — asort.uz',
      description:
        'O‘zbekiston va Markaziy Osiyoning eng sara oziq-ovqat mahsulotlari: shakar, guruch, mosh, grechka va fasol. Bog‘lanish: +998 99 010 04 90.',
      url: `${BASE_URL}/uz`,
      locale: 'uz_UZ',
      siteName: 'Asort',
      type: 'website',
    },
  }
}

export default function LocalizedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
