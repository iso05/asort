'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/components/LanguageContext'

// ═══════════════════════════════════════════════════════════════════
// THEME TOKENS
// ═══════════════════════════════════════════════════════════════════
const LIGHT_C = {
  bg: '#FDFBF7',
  bgDeep: '#FAF6EE',
  bgCard: '#FFFFFF',
  bgCardHov: '#FAF6EE',
  surface: '#F2EFE6',
  border: '#E6E1D8',
  borderFocus: '#2D5F3E',
  accent: '#2D5F3E',
  accentDeep: '#1D3F27',
  accentLight: 'rgba(45, 95, 62, 0.08)',
  text: '#1E2520',
  textMid: '#505A53',
  textMuted: '#869389',
  tagBg: 'rgba(45, 95, 62, 0.05)',
  tagText: '#2D5F3E',
  tagBorder: 'rgba(45, 95, 62, 0.15)',
  green: '#2D5F3E',
  greenBg: 'rgba(45, 95, 62, 0.08)',
  greenBorder: 'rgba(45, 95, 62, 0.20)',
  navBg: '#FFFFFF',
  navBorder: '#E6E1D8',
  heroBorder: '#E6E1D8',
}

const DARK_C = {
  bg: '#070E17',
  bgDeep: '#050A12',
  bgCard: '#0D1623',
  bgCardHov: '#111E2E',
  surface: '#101C2C',
  border: 'rgba(91,184,212,0.15)',
  borderFocus: '#5BB8D4',
  accent: '#5BB8D4',
  accentDeep: '#3A8FAE',
  accentLight: 'rgba(91,184,212,0.08)',
  text: '#E4F0F5',
  textMid: '#7AB4C8',
  textMuted: '#4A7A90',
  tagBg: 'rgba(91,184,212,0.08)',
  tagText: '#5BB8D4',
  tagBorder: 'rgba(91,184,212,0.22)',
  green: '#2EA06A',
  greenBg: 'rgba(46,160,106,0.10)',
  greenBorder: 'rgba(46,160,106,0.28)',
  navBg: '#0D1623',
  navBorder: 'rgba(91,184,212,0.08)',
  heroBorder: 'rgba(91,184,212,0.10)',
}

type Language = 'uz' | 'ru' | 'en'

// ═══════════════════════════════════════════════════════════════════
// PRODUCT DATA TYPE & MULTILINGUAL FACTORY
// ═══════════════════════════════════════════════════════════════════
type Product = {
  id: number
  name: string
  subtitle: string
  category: string
  tags: string[]
  weights: string[]
  grade: string
  origin: string
  description: string
  facts: { label: string; value: string }[]
  pkgAccent: string
  pkgBg: string
  pkgLabel: string
  inStock: boolean
  isNew: boolean
  isBestseller: boolean
  hsCode: string
  moq: string
  loading: string
  certs: string[]
  isUpcoming?: boolean
  nutrition?: { calories: string; carbs: string; protein: string; fat: string }
}

const getProducts = (lang: Language): Product[] => {
  if (lang === 'ru') {
    return [
      {
        id: 1,
        name: 'Сахар',
        subtitle: 'Белый кристаллический',
        category: 'Сахар и подсластители',
        tags: ['Рафинированный', 'Без добавок', 'Сертифицирован ISO'],
        weights: ['1 кг', '5 кг', '25 кг'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description:
          'Белоснежный кристаллический сахар двойной очистки с отборных плантаций. Идеально растворяется как в домашней кулинарии, так и в промышленном кондитерском производстве.',
        facts: [
          { label: 'Чистота', value: '99.9%' },
          { label: 'Влажность', value: '< 0.04%' },
          { label: 'Срок хранения', value: '36 месяцев' },
        ],
        pkgAccent: '#3A8DC4',
        pkgBg: 'linear-gradient(160deg,#0D2744 0%,#1E5A96 60%,#2D7BCC 100%)',
        pkgLabel: '#93C5FD',
        inStock: true,
        isNew: false,
        isBestseller: true,
        hsCode: '1701.99',
        moq: '20 Тонн (1 FCL)',
        loading: '25 Тонн в 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'HACCP'],
      },
      {
        id: 2,
        name: 'Рис Аланга',
        subtitle: 'Среднезерный',
        category: 'Зерновые продукты',
        tags: ['Мягкий', 'Легкоусвояемый', 'Отборный'],
        weights: ['1 кг', '5 кг', '10 кг', '25 кг'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description:
          'Отборный узбекский рис сорта Аланга. Зерна среднего размера получаются мягкими и нежными — идеально подходит для каш, супов и повседневного плова.',
        facts: [
          { label: 'Битые зерна', value: '< 1%' },
          { label: 'Влажность', value: '< 14%' },
          { label: 'Срок хранения', value: '24 месяца' },
        ],
        pkgAccent: '#8C7B65',
        pkgBg: 'linear-gradient(160deg, #5E5043 0%, #8C7B65 60%, #3D332A 100%)',
        pkgLabel: '#FAF6F0',
        inStock: true,
        isNew: false,
        isBestseller: true,
        hsCode: '1006.30',
        moq: '20 Тонн (1 FCL)',
        loading: '24 Тонны в 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'SGS Тест'],
      },
      {
        id: 9,
        name: 'Рис Лазер',
        subtitle: 'Длиннозерный',
        category: 'Зерновые продукты',
        tags: ['Отборный', 'Длиннозерный', 'Для плова'],
        weights: ['1 кг', '5 кг', '10 кг', '25 кг'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description:
          'Первоклассный узбекский рис сорта Лазер. При варке рассыпается и значительно удлиняется — идеальный выбор для праздничного плова и особых блюд.',
        facts: [
          { label: 'Битые зерна', value: '< 1%' },
          { label: 'Влажность', value: '< 14%' },
          { label: 'Срок хранения', value: '24 месяца' },
        ],
        pkgAccent: '#2E8A50',
        pkgBg: 'linear-gradient(160deg, #165B33 0%, #228B22 60%, #2E8A57 100%)',
        pkgLabel: '#86EFAC',
        inStock: true,
        isNew: false,
        isBestseller: false,
        hsCode: '1006.30',
        moq: '20 Тонн (1 FCL)',
        loading: '24 Тонны в 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'SGS Тест'],
      },
      {
        id: 3,
        name: 'Гречка',
        subtitle: 'Обжаренная ядрица',
        category: 'Зерновые продукты',
        tags: ['Без глютена', 'Богат белком', 'Обжаренный'],
        weights: ['0.9 кг', '4 кг', '20 кг'],
        grade: 'Премиум Сорт A',
        origin: 'Россия',
        description:
          'Отборная обжаренная ядрица с глубоким ореховым вкусом. Богата белковым комплексом и аминокислотами — отличный выбор для здорового рациона.',
        facts: [
          { label: 'Белок', value: '13г/100г' },
          { label: 'Влажность', value: '< 13%' },
          { label: 'Срок хранения', value: '18 месяцев' },
        ],
        pkgAccent: '#5C3E21',
        pkgBg: 'linear-gradient(160deg, #4A3319 0%, #6E4E2C 60%, #8B623B 100%)',
        pkgLabel: '#F5EBE0',
        inStock: true,
        isNew: false,
        isBestseller: false,
        hsCode: '1008.10',
        moq: '20 Тонн (1 FCL)',
        loading: '22 Тонны в 20ft FCL',
        certs: ['ISO 22000', 'HACCP', 'Эко-сертификат'],
      },
      {
        id: 4,
        name: 'Маш',
        subtitle: 'Отборный маш',
        category: 'Бобовые',
        tags: ['Натуральный', 'Богатый белком', 'Витамины B'],
        weights: ['900 г'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description:
          'Отборный узбекский маш высочайшего качества. Богат белком, клетчаткой и витаминами группы B. Идеален для машкичири, супов и здорового питания.',
        facts: [
          { label: 'Белок', value: '24г/100г' },
          { label: 'Влажность', value: '< 12%' },
          { label: 'Срок хранения', value: '24 месяца' },
        ],
        pkgAccent: '#1A7A40',
        pkgBg: 'linear-gradient(160deg,#042010 0%,#0C4820 60%,#187838 100%)',
        pkgLabel: '#6EE7B7',
        inStock: true,
        isNew: true,
        isBestseller: false,
        hsCode: '0713.31',
        moq: '20 Тонн (1 FCL)',
        loading: '24 Тонны в 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'HACCP'],
      },
      {
        id: 5,
        name: 'Красная фасоль',
        subtitle: 'Отборная фасоль',
        category: 'Бобовые',
        tags: ['Богатая железом', 'Клетчатка'],
        weights: ['900 г'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description: 'Отборная красная фасоль, богатая белком, железом и клетчаткой.',
        facts: [],
        pkgAccent: '#8B0000',
        pkgBg: 'linear-gradient(160deg,#300000 0%,#600000 60%,#900000 100%)',
        pkgLabel: '#FCA5A5',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '0713.33',
        moq: '-',
        loading: '-',
        certs: ['Сертифицирован'],
        isUpcoming: true,
      },
      {
        id: 6,
        name: 'Белая фасоль',
        subtitle: 'Нежная фасоль',
        category: 'Бобовые',
        tags: ['Богатая белком', 'Диетический'],
        weights: ['900 г'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description: 'Высокосортная нежная белая фасоль для супов и диетического питания.',
        facts: [],
        pkgAccent: '#707070',
        pkgBg: 'linear-gradient(160deg,#202020 0%,#404040 60%,#606060 100%)',
        pkgLabel: '#E0E0E0',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '0713.33',
        moq: '-',
        loading: '-',
        certs: ['Сертифицирован'],
        isUpcoming: true,
      },
      {
        id: 7,
        name: 'Подсолнечное масло 1Л',
        subtitle: 'Премиум холодный отжим',
        category: 'Растительные масла',
        tags: ['Холодный отжим', 'Витамин E'],
        weights: ['1 Л'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description: '100% натуральное подсолнечное масло холодного отжима высшего качества.',
        facts: [],
        pkgAccent: '#D4AF37',
        pkgBg: 'linear-gradient(160deg,#3E2D00 0%,#7A5800 60%,#B8860B 100%)',
        pkgLabel: '#FDE68A',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '1512.19',
        moq: '-',
        loading: '-',
        certs: ['Сертифицирован'],
        isUpcoming: true,
      },
      {
        id: 8,
        name: 'Подсолнечное масло 2Л',
        subtitle: 'Премиум холодный отжим',
        category: 'Растительные масла',
        tags: ['Экологичный', 'Семейная упаковка'],
        weights: ['2 Л'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description: 'Натуральное подсолнечное масло холодного отжима (2Л семейный формат).',
        facts: [],
        pkgAccent: '#C59B27',
        pkgBg: 'linear-gradient(160deg,#352500 0%,#6A4E00 60%,#9E780A 100%)',
        pkgLabel: '#FEF08A',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '1512.19',
        moq: '-',
        loading: '-',
        certs: ['Сертифицирован'],
        isUpcoming: true,
      },
      {
        id: 10,
        name: 'Подсолнечное масло 5Л',
        subtitle: 'Премиум холодный отжим',
        category: 'Растительные масла',
        tags: ['Экономичный', 'Выгодная упаковка'],
        weights: ['5 Л'],
        grade: 'Премиум Сорт A',
        origin: 'Узбекистан',
        description: 'Натуральное подсолнечное масло холодного отжима (5Л выгодный формат).',
        facts: [],
        pkgAccent: '#A67C1E',
        pkgBg: 'linear-gradient(160deg,#2D1E00 0%,#5B3F00 60%,#875F07 100%)',
        pkgLabel: '#FEF08A',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '1512.19',
        moq: '-',
        loading: '-',
        certs: ['Сертифицирован'],
        isUpcoming: true,
      },
    ]
  }

  if (lang === 'en') {
    return [
      {
        id: 1,
        name: 'Sugar',
        subtitle: 'White Crystalline',
        category: 'Sweeteners',
        tags: ['Refined', 'No Additives', 'ISO Certified'],
        weights: ['1 kg', '5 kg', '25 kg'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description:
          'Double-refined white crystalline sugar sourced from top-quality plantations. Dissolves perfectly for home cooking and industrial confectionery.',
        facts: [
          { label: 'Purity', value: '99.9%' },
          { label: 'Moisture', value: '< 0.04%' },
          { label: 'Shelf Life', value: '36 months' },
        ],
        pkgAccent: '#3A8DC4',
        pkgBg: 'linear-gradient(160deg,#0D2744 0%,#1E5A96 60%,#2D7BCC 100%)',
        pkgLabel: '#93C5FD',
        inStock: true,
        isNew: false,
        isBestseller: true,
        hsCode: '1701.99',
        moq: '20 Tons (1 FCL)',
        loading: '25 Tons per 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'HACCP'],
      },
      {
        id: 2,
        name: 'Alanga Rice',
        subtitle: 'Medium Grain',
        category: 'Cereals & Grains',
        tags: ['Soft', 'Digestible', 'Selected'],
        weights: ['1 kg', '5 kg', '10 kg', '25 kg'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description:
          'Selected Uzbek rice of the Alanga variety. Medium-sized grains cook soft and tender — ideal for daily meals, soups, and traditional plov.',
        facts: [
          { label: 'Broken Grains', value: '< 1%' },
          { label: 'Moisture', value: '< 14%' },
          { label: 'Shelf Life', value: '24 months' },
        ],
        pkgAccent: '#8C7B65',
        pkgBg: 'linear-gradient(160deg, #5E5043 0%, #8C7B65 60%, #3D332A 100%)',
        pkgLabel: '#FAF6F0',
        inStock: true,
        isNew: false,
        isBestseller: true,
        hsCode: '1006.30',
        moq: '20 Tons (1 FCL)',
        loading: '24 Tons per 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'SGS Test'],
      },
      {
        id: 9,
        name: 'Lazer Rice',
        subtitle: 'Long Grain',
        category: 'Cereals & Grains',
        tags: ['Selected', 'Long Grain', 'Ideal for Plov'],
        weights: ['1 kg', '5 kg', '10 kg', '25 kg'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description:
          'Premium Uzbek Lazer rice. Grains stay separate and elongate beautifully during cooking — the top choice for celebratory plov and gourmet dishes.',
        facts: [
          { label: 'Broken Grains', value: '< 1%' },
          { label: 'Moisture', value: '< 14%' },
          { label: 'Shelf Life', value: '24 months' },
        ],
        pkgAccent: '#2E8A50',
        pkgBg: 'linear-gradient(160deg, #165B33 0%, #228B22 60%, #2E8A57 100%)',
        pkgLabel: '#86EFAC',
        inStock: true,
        isNew: false,
        isBestseller: false,
        hsCode: '1006.30',
        moq: '20 Tons (1 FCL)',
        loading: '24 Tons per 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'SGS Test'],
      },
      {
        id: 3,
        name: 'Buckwheat',
        subtitle: 'Roasted Whole Grain',
        category: 'Cereals & Grains',
        tags: ['Gluten-Free', 'High Protein', 'Roasted'],
        weights: ['0.9 kg', '4 kg', '20 kg'],
        grade: 'Premium Grade A',
        origin: 'Russia',
        description:
          'Whole roasted buckwheat with a rich nutty flavor. Rich in essential amino acids, perfect for healthy nutrition.',
        facts: [
          { label: 'Protein', value: '13g/100g' },
          { label: 'Moisture', value: '< 13%' },
          { label: 'Shelf Life', value: '18 months' },
        ],
        pkgAccent: '#5C3E21',
        pkgBg: 'linear-gradient(160deg, #4A3319 0%, #6E4E2C 60%, #8B623B 100%)',
        pkgLabel: '#F5EBE0',
        inStock: true,
        isNew: false,
        isBestseller: false,
        hsCode: '1008.10',
        moq: '20 Tons (1 FCL)',
        loading: '22 Tons per 20ft FCL',
        certs: ['ISO 22000', 'HACCP', 'Eco-Certificate'],
      },
      {
        id: 4,
        name: 'Mung Bean',
        subtitle: 'Selected Mung Beans',
        category: 'Pulses & Legumes',
        tags: ['Natural', 'High Protein', 'B Vitamins'],
        weights: ['900 g'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description:
          'Selected premium Uzbek mung beans. Rich in protein, fibre and B vitamins — perfect for traditional mashkichiri, soups and a healthy diet.',
        facts: [
          { label: 'Protein', value: '24g/100g' },
          { label: 'Moisture', value: '< 12%' },
          { label: 'Shelf Life', value: '24 months' },
        ],
        pkgAccent: '#1A7A40',
        pkgBg: 'linear-gradient(160deg,#042010 0%,#0C4820 60%,#187838 100%)',
        pkgLabel: '#6EE7B7',
        inStock: true,
        isNew: true,
        isBestseller: false,
        hsCode: '0713.31',
        moq: '20 Tons (1 FCL)',
        loading: '24 Tons per 20ft FCL',
        certs: ['ISO 22000', 'HALAL', 'HACCP'],
      },
      {
        id: 5,
        name: 'Red Kidney Beans',
        subtitle: 'Red Beans',
        category: 'Pulses & Legumes',
        tags: ['Iron Rich', 'Fiber'],
        weights: ['900 g'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description: 'Selected red kidney beans rich in proteins, minerals, and dietary fiber.',
        facts: [],
        pkgAccent: '#8B0000',
        pkgBg: 'linear-gradient(160deg,#300000 0%,#600000 60%,#900000 100%)',
        pkgLabel: '#FCA5A5',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '0713.33',
        moq: '-',
        loading: '-',
        certs: ['Certified'],
        isUpcoming: true,
      },
      {
        id: 6,
        name: 'White Kidney Beans',
        subtitle: 'White Beans',
        category: 'Pulses & Legumes',
        tags: ['High Protein', 'Dietary'],
        weights: ['900 g'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description: 'Premium tender white beans, great for soups and healthy cooking.',
        facts: [],
        pkgAccent: '#707070',
        pkgBg: 'linear-gradient(160deg,#202020 0%,#404040 60%,#606060 100%)',
        pkgLabel: '#E0E0E0',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '0713.33',
        moq: '-',
        loading: '-',
        certs: ['Certified'],
        isUpcoming: true,
      },
      {
        id: 7,
        name: 'Sunflower Oil 1L',
        subtitle: 'Premium Cold-Pressed',
        category: 'Vegetable Oils',
        tags: ['Cold-Pressed', 'Vitamin E'],
        weights: ['1 L'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description: '100% pure cold-pressed sunflower seed oil of premium quality.',
        facts: [],
        pkgAccent: '#D4AF37',
        pkgBg: 'linear-gradient(160deg,#3E2D00 0%,#7A5800 60%,#B8860B 100%)',
        pkgLabel: '#FDE68A',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '1512.19',
        moq: '-',
        loading: '-',
        certs: ['Certified'],
        isUpcoming: true,
      },
      {
        id: 8,
        name: 'Sunflower Oil 2L',
        subtitle: 'Premium Cold-Pressed',
        category: 'Vegetable Oils',
        tags: ['Eco-Friendly', 'Family Pack'],
        weights: ['2 L'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description: '100% pure cold-pressed sunflower seed oil (2L family size bottle).',
        facts: [],
        pkgAccent: '#C59B27',
        pkgBg: 'linear-gradient(160deg,#352500 0%,#6A4E00 60%,#9E780A 100%)',
        pkgLabel: '#FEF08A',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '1512.19',
        moq: '-',
        loading: '-',
        certs: ['Certified'],
        isUpcoming: true,
      },
      {
        id: 10,
        name: 'Sunflower Oil 5L',
        subtitle: 'Premium Cold-Pressed',
        category: 'Vegetable Oils',
        tags: ['Bulk Pack', 'Economical'],
        weights: ['5 L'],
        grade: 'Premium Grade A',
        origin: 'Uzbekistan',
        description: '100% pure cold-pressed sunflower seed oil (5L economical bulk pack).',
        facts: [],
        pkgAccent: '#A67C1E',
        pkgBg: 'linear-gradient(160deg,#2D1E00 0%,#5B3F00 60%,#875F07 100%)',
        pkgLabel: '#FEF08A',
        inStock: false,
        isNew: false,
        isBestseller: false,
        hsCode: '1512.19',
        moq: '-',
        loading: '-',
        certs: ['Certified'],
        isUpcoming: true,
      },
    ]
  }

  // Default Uzbek
  return [
    {
      id: 1,
      name: 'Shakar',
      subtitle: 'Oq kristalli',
      category: 'Shirinlashtiruvchilar',
      tags: ['Rafine qilingan', 'Qo‘shimchasiz', 'ISO sertifikatlangan'],
      weights: ['1 kg', '5 kg', '25 kg'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description:
        'Eng sifatli plantatsiyalardan olingan ikki marotaba tozalangan oq kristalli shakar. Uyda pishirishdan tortib sanoat qandolat mahsulotlarigacha har qanday jarayonda mukammal eriydi.',
      facts: [
        { label: 'Tozaligi', value: '99.9%' },
        { label: 'Namlik', value: '< 0.04%' },
        { label: 'Saqlash muddati', value: '36 oy' },
      ],
      pkgAccent: '#3A8DC4',
      pkgBg: 'linear-gradient(160deg,#0D2744 0%,#1E5A96 60%,#2D7BCC 100%)',
      pkgLabel: '#93C5FD',
      inStock: true,
      isNew: false,
      isBestseller: true,
      hsCode: '1701.99',
      moq: '20 Tonna (1 FCL)',
      loading: '20ft FCL ga 25 Tonna',
      certs: ['ISO 22000', 'HALAL', 'HACCP'],
    },
    {
      id: 2,
      name: 'Alanga guruch',
      subtitle: 'Miyona donli',
      category: 'Don mahsulotlari',
      tags: ['Yumshoq', 'Oson hazm bo‘ladigan', 'Saralangan'],
      weights: ['1 kg', '5 kg', '10 kg', '25 kg'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description:
        'Saralangan o‘zbek guruchi Alanga navi. Donlari o‘rtacha kattalikda bo‘lib, pishganda yumshoq va nihoyatda shirin bo‘ladi. Kundalik taomlar, mastava, shavla hamda milliy oshlar uchun mos.',
      facts: [
        { label: 'Singan donlar', value: '< 1%' },
        { label: 'Namlik', value: '< 14%' },
        { label: 'Saqlash muddati', value: '24 oy' },
      ],
      pkgAccent: '#8C7B65',
      pkgBg: 'linear-gradient(160deg, #5E5043 0%, #8C7B65 60%, #3D332A 100%)',
      pkgLabel: '#FAF6F0',
      inStock: true,
      isNew: false,
      isBestseller: true,
      hsCode: '1006.30',
      moq: '20 Tonna (1 FCL)',
      loading: '20ft FCL ga 24 Tonna',
      certs: ['ISO 22000', 'HALAL', 'SGS Test'],
    },
    {
      id: 9,
      name: 'Lazer guruch',
      subtitle: 'Uzun donli',
      category: 'Don mahsulotlari',
      tags: ['Saralangan', 'Uzun donli', 'Palovbop'],
      weights: ['1 kg', '5 kg', '10 kg', '25 kg'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description:
        'Eng sara dalalardan olingan birinchi darajali Lazer guruchi. Pishganda guruch donalari bir-biriga yopishmaydi, nihoyatda uzun bo‘lib pishadi — milliy palovlar va tantanali taomlar uchun eng afzal tanlov.',
      facts: [
        { label: 'Singan donlar', value: '< 1%' },
        { label: 'Namlik', value: '< 14%' },
        { label: 'Saqlash muddati', value: '24 oy' },
      ],
      pkgAccent: '#2E8A50',
      pkgBg: 'linear-gradient(160deg, #165B33 0%, #228B22 60%, #2E8A57 100%)',
      pkgLabel: '#86EFAC',
      inStock: true,
      isNew: false,
      isBestseller: false,
      hsCode: '1006.30',
      moq: '20 Tonna (1 FCL)',
      loading: '20ft FCL ga 24 Tonna',
      certs: ['ISO 22000', 'HALAL', 'SGS Test'],
    },
    {
      id: 3,
      name: 'Grechka',
      subtitle: 'Qovurilgan butun don',
      category: 'Don mahsulotlari',
      tags: ['Glutensiz', 'Oqsilga boy', 'Toshda qovurilgan'],
      weights: ['0.9 kg', '4 kg', '20 kg'],
      grade: 'Premium A daraja',
      origin: 'Rossiya',
      description:
        'Chuqur yong‘oqsimon ta’mga ega toshda qovurilgan butun grechka. To‘liq aminokislotalarga boy bo‘lib, sog‘lom ovqatlanish uchun ajoyib tanlov.',
      facts: [
        { label: 'Oqsil', value: '13g/100g' },
        { label: 'Namlik', value: '< 13%' },
        { label: 'Saqlash muddati', value: '18 oy' },
      ],
      pkgAccent: '#5C3E21',
      pkgBg: 'linear-gradient(160deg, #4A3319 0%, #6E4E2C 60%, #8B623B 100%)',
      pkgLabel: '#F5EBE0',
      inStock: true,
      isNew: false,
      isBestseller: false,
      hsCode: '1008.10',
      moq: '20 Tonna (1 FCL)',
      loading: '20ft FCL ga 22 Tonna',
      certs: ['ISO 22000', 'HACCP', 'Eko-sertifikat'],
    },
    {
      id: 4,
      name: 'Mosh',
      subtitle: 'Saralangan mosh',
      category: 'Dukkaklilar',
      tags: ['Tabiiy', 'Oqsilga boy', 'B vitaminlari'],
      weights: ['900 g'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description:
        'Eng yuqori sifatli saralangan o\'zbek moshi. Oqsil, kletchatka va B vitaminlariga boy bo\'lib, mashkichiri, sho\'rva va sog\'lom ovqatlanish uchun mukammal tanlovdir.',
      facts: [
        { label: 'Oqsil', value: '24g/100g' },
        { label: 'Namlik', value: '< 12%' },
        { label: 'Saqlash muddati', value: '24 oy' },
      ],
      pkgAccent: '#1A7A40',
      pkgBg: 'linear-gradient(160deg,#042010 0%,#0C4820 60%,#187838 100%)',
      pkgLabel: '#6EE7B7',
      inStock: true,
      isNew: true,
      isBestseller: false,
      hsCode: '0713.31',
      moq: '20 Tonna (1 FCL)',
      loading: '20ft FCL ga 24 Tonna',
      certs: ['ISO 22000', 'HALAL', 'HACCP'],
    },
    {
      id: 5,
      name: 'Qizil fasol',
      subtitle: 'Qizil loviya',
      category: 'Dukkaklilar',
      tags: ['Temirga boy', 'Kletchatka'],
      weights: ['900 g'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description: 'Yaqinda sotuvda paydo bo‘ladigan, vitaminlar va oqsilga boy qizil loviya.',
      facts: [],
      pkgAccent: '#8B0000',
      pkgBg: 'linear-gradient(160deg,#300000 0%,#600000 60%,#900000 100%)',
      pkgLabel: '#FCA5A5',
      inStock: false,
      isNew: false,
      isBestseller: false,
      hsCode: '0713.33',
      moq: '-',
      loading: '-',
      certs: ['Sertifikatlangan'],
      isUpcoming: true,
    },
    {
      id: 6,
      name: 'Oq fasol',
      subtitle: 'Oq loviya',
      category: 'Dukkaklilar',
      tags: ['Oqsilga boy', 'Parhezbop'],
      weights: ['900 g'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description: 'Yaqinda sotuvda paydo bo‘ladigan yuqori navli va mayin oq loviya.',
      facts: [],
      pkgAccent: '#707070',
      pkgBg: 'linear-gradient(160deg,#202020 0%,#404040 60%,#606060 100%)',
      pkgLabel: '#E0E0E0',
      inStock: false,
      isNew: false,
      isBestseller: false,
      hsCode: '0713.33',
      moq: '-',
      loading: '-',
      certs: ['Sertifikatlangan'],
      isUpcoming: true,
    },
    {
      id: 7,
      name: 'Kungaboqar yog‘i 1L',
      subtitle: 'Premium sovuq press',
      category: 'Yog‘lar',
      tags: ['Sovuq press', 'E vitaminli'],
      weights: ['1 L'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description: 'Yaqinda sotuvda paydo bo‘ladigan kungaboqar donlaridan sovuq presslangan yog‘.',
      facts: [],
      pkgAccent: '#D4AF37',
      pkgBg: 'linear-gradient(160deg,#3E2D00 0%,#7A5800 60%,#B8860B 100%)',
      pkgLabel: '#FDE68A',
      inStock: false,
      isNew: false,
      isBestseller: false,
      hsCode: '1512.19',
      moq: '-',
      loading: '-',
      certs: ['Sertifikatlangan'],
      isUpcoming: true,
    },
    {
      id: 8,
      name: 'Kungaboqar yog‘i 2L',
      subtitle: 'Premium sovuq press',
      category: 'Yog‘lar',
      tags: ['Ekologik toza', 'Oila uchun'],
      weights: ['2 L'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description: 'Yaqinda sotuvda paydo bo‘ladigan kungaboqar donlaridan sovuq presslangan yog‘ (2L qadoq).',
      facts: [],
      pkgAccent: '#C59B27',
      pkgBg: 'linear-gradient(160deg,#352500 0%,#6A4E00 60%,#9E780A 100%)',
      pkgLabel: '#FEF08A',
      inStock: false,
      isNew: false,
      isBestseller: false,
      hsCode: '1512.19',
      moq: '-',
      loading: '-',
      certs: ['Sertifikatlangan'],
      isUpcoming: true,
    },
    {
      id: 10,
      name: 'Kungaboqar yog‘i 5L',
      subtitle: 'Premium sovuq press',
      category: 'Yog‘lar',
      tags: ['Katta qadoq', 'Tejamkor'],
      weights: ['5 L'],
      grade: 'Premium A daraja',
      origin: 'Oʻzbekiston',
      description: 'Yaqinda sotuvda paydo bo‘ladigan kungaboqar donlaridan sovuq presslangan yog‘ (5L qadoq).',
      facts: [],
      pkgAccent: '#A67C1E',
      pkgBg: 'linear-gradient(160deg,#2D1E00 0%,#5B3F00 60%,#875F07 100%)',
      pkgLabel: '#FEF08A',
      inStock: false,
      isNew: false,
      isBestseller: false,
      hsCode: '1512.19',
      moq: '-',
      loading: '-',
      certs: ['Sertifikatlangan'],
      isUpcoming: true,
    },
  ]
}

const getCategories = (lang: Language) => {
  if (lang === 'ru') {
    return ['Все', 'Зерновые продукты', 'Бобовые', 'Сахар и подсластители', 'Растительные масла']
  }
  if (lang === 'en') {
    return ['All', 'Cereals & Grains', 'Pulses & Legumes', 'Sweeteners', 'Vegetable Oils']
  }
  return ['Barchasi', 'Don mahsulotlari', 'Dukkaklilar', 'Shirinlashtiruvchilar', 'Yog‘lar']
}

const getSortOptions = (lang: Language) => {
  if (lang === 'ru') {
    return [
      { value: 'default', label: 'Рекомендуемые' },
      { value: 'name_asc', label: 'По названию А–Я' },
      { value: 'name_desc', label: 'По названию Я–А' },
    ]
  }
  if (lang === 'en') {
    return [
      { value: 'default', label: 'Recommended' },
      { value: 'name_asc', label: 'Name A–Z' },
      { value: 'name_desc', label: 'Name Z–A' },
    ]
  }
  return [
    { value: 'default', label: 'Tavsiya etilgan' },
    { value: 'name_asc', label: 'Nom bo‘yicha A–Z' },
    { value: 'name_desc', label: 'Nom bo‘yicha Z–A' },
  ]
}

const getUiTranslations = (lang: Language) => {
  if (lang === 'ru') {
    return {
      exportParams: 'Пищевая Ценность (100г)',
      nutritionTitle: 'Пищевая Ценность (100г)',
      caloriesLabel: 'Калорийность',
      proteinLabel: 'Белки',
      carbsLabel: 'Углеводы',
      fatLabel: 'Жиры',
      hsCodeLabel: 'Код ТН ВЭД',
      moqLabel: 'Мин. заказ (MOQ)',
      loadingLabel: 'Объем загрузки',
      certsLabel: 'Сертификаты',
      moreDetails: 'Подробная информация →',
      downloadSpecBtn: '📄 Скачать спецификацию (Excel)',
      searchPlaceholder: 'Поиск…',
      viewGrid: 'Сетка',
      viewList: 'Список',
      badges: {
        bestseller: 'Бестселлер',
        new: 'Новинка',
        out: 'Нет в наличии',
        comingSoon: 'Скоро в продаже',
      },
      card: {
        details: 'Подробнее',
        viewSpecs: 'Смотреть спецификацию',
        inStock: '● В наличии',
        outOfStock: '○ Нет в наличии',
      },
      modal: {
        rfqTitle: 'Запросить коммерческое предложение (RFQ)',
        companyPlaceholder: 'Название компании',
        countryPlaceholder: 'Страна / Город',
        volumePlaceholder: 'Требуемый объем (Тонн / Упаковок)',
        selectPkg: 'Выберите вариант упаковки',
        submitRfq: 'Отправить запрос ✓',
        rfqSuccessTitle: 'Запрос успешно отправлен!',
        rfqSuccessMsg: 'Специалист экспортного отдела свяжется с вами в ближайшее время.',
        specsButton: '📄 Скачать спецификацию (Excel)',
        generalInfo: 'ОБЩАЯ ИНФОРМАЦИЯ',
        logisticsInfo: 'ЛОГИСТИКА И ЭКСПОРТ',
        technicalData: 'ТЕХНИЧЕСКИЕ ПОКАЗАТЕЛИ',
        packagingOptions: 'ВАРИАНТЫ УПАКОВКИ',
        productName: 'Наименование товара',
        categoryLabel: 'Категория',
        originLabel: 'Происхождение',
        gradeLabel: 'Сорт / Класс',
        descLabel: 'Описание',
        hsCodeLabel: 'Код ТН ВЭД',
        moqLabel: 'Минимальный заказ (MOQ)',
        loadingLabel: 'Норма загрузки',
        certsLabel: 'Сертификаты',
        weightsLabel: 'Варианты фасовки',
      },
      wholesale: {
        tag: 'Оптовые поставки',
        title: 'Нужен крупный опт?',
        subtitle: 'Давайте обсудим условия.',
        button: 'Связаться →',
      },
      noResults: {
        title: 'Ничего не найдено',
        desc: 'Попробуйте изменить параметры поиска или выберите другую категорию.',
      },
      tabs: [
        { id: 'all', name: 'Все' },
        { id: 'bestseller', name: 'Бестселлеры' },
        { id: 'instock', name: 'В наличии' },
        { id: 'upcoming', name: 'Скоро в продаже' },
      ],
      stats: {
        products: 'Продуктов',
        categories: 'Категорий',
        inStockCount: 'В наличии',
        points: 'Точек продаж',
      },
    }
  }

  if (lang === 'en') {
    return {
      exportParams: 'Nutritional Value (100g)',
      nutritionTitle: 'Nutritional Value (100g)',
      caloriesLabel: 'Calories (Energy)',
      proteinLabel: 'Protein',
      carbsLabel: 'Carbohydrates',
      fatLabel: 'Fat',
      hsCodeLabel: 'HS Code',
      moqLabel: 'Min. Order (MOQ)',
      loadingLabel: 'Loading Capacity',
      certsLabel: 'Certifications',
      moreDetails: 'More Details (Specs) →',
      downloadSpecBtn: '📄 Download Spec Sheet (Excel)',
      searchPlaceholder: 'Search…',
      viewGrid: 'Grid view',
      viewList: 'List view',
      badges: {
        bestseller: 'Bestseller',
        new: 'New',
        out: 'Out of stock',
        comingSoon: 'Coming Soon',
      },
      card: {
        details: 'Details',
        viewSpecs: 'View specification',
        inStock: '● In Stock',
        outOfStock: '○ Out of stock',
      },
      modal: {
        rfqTitle: 'Request Commercial Quotation (RFQ)',
        companyPlaceholder: 'Company Name',
        countryPlaceholder: 'Country / City',
        volumePlaceholder: 'Required Volume (Tons / Packs)',
        selectPkg: 'Select packaging option',
        submitRfq: 'Submit Quotation Request ✓',
        rfqSuccessTitle: 'Request successfully submitted!',
        rfqSuccessMsg: 'Our export department specialist will contact you shortly.',
        specsButton: '📄 Download Spec Sheet (Excel)',
        generalInfo: 'GENERAL INFORMATION',
        logisticsInfo: 'LOGISTICS & EXPORT',
        technicalData: 'TECHNICAL DATA',
        packagingOptions: 'PACKAGING OPTIONS',
        productName: 'Product Name',
        categoryLabel: 'Category',
        originLabel: 'Origin',
        gradeLabel: 'Grade',
        descLabel: 'Description',
        hsCodeLabel: 'HS Code',
        moqLabel: 'Min. Order Qty (MOQ)',
        loadingLabel: 'Loading Capacity',
        certsLabel: 'Certifications',
        weightsLabel: 'Packaging Options',
      },
      wholesale: {
        tag: 'Wholesale Trade',
        title: 'Need bulk supply?',
        subtitle: 'Let\'s discuss custom terms.',
        button: 'Contact Us →',
      },
      noResults: {
        title: 'No products found',
        desc: 'Try adjusting your search criteria or selecting another category.',
      },
      tabs: [
        { id: 'all', name: 'All' },
        { id: 'bestseller', name: 'Bestsellers' },
        { id: 'instock', name: 'In Stock' },
        { id: 'upcoming', name: 'Coming Soon' },
      ],
      stats: {
        products: 'Products',
        categories: 'Categories',
        inStockCount: 'In Stock',
        points: 'Sales Outlets',
      },
    }
  }

  // Default Uzbek
  return {
    exportParams: 'Oziqlanish va Kaloriya (100g)',
    nutritionTitle: 'Oziqlanish va Kaloriya (100g)',
    caloriesLabel: 'Kaloriya (Energik qiymat)',
    proteinLabel: 'Oqsil (Protein)',
    carbsLabel: 'Uglevodlar',
    fatLabel: 'Yog‘lar',
    hsCodeLabel: 'HS Code',
    moqLabel: 'Min. Buyurtma (MOQ)',
    loadingLabel: 'Yuklash hajmi',
    certsLabel: 'Sertifikatlar',
    moreDetails: 'Batafsil ma\'lumot (Specs) →',
    downloadSpecBtn: '📄 Yuklab olish (Spetsifikatsiya)',
    searchPlaceholder: 'Qidirish…',
    viewGrid: 'Katak ko‘rinishi',
    viewList: 'Ro‘yxat ko‘rinishi',
    badges: {
      bestseller: 'Bestseller',
      new: 'Yangi',
      out: 'Mavjud emas',
      comingSoon: 'Tez kunda',
    },
    card: {
      details: 'Batafsil',
      viewSpecs: 'Spetsifikatsiyani ko‘rish',
      inStock: '● Mavjud',
      outOfStock: '○ Sotuvda yo‘q',
    },
    modal: {
      rfqTitle: 'Tijorat taklifi so‘rash (RFQ)',
      companyPlaceholder: 'Kompaniya nomi',
      countryPlaceholder: 'Davlat / Shahar',
      volumePlaceholder: 'Kerakli miqdor (Tonna / Qadoq)',
      selectPkg: 'Qadoq turini tanlang',
      submitRfq: 'RFQ So‘rovini yuborish ✓',
      rfqSuccessTitle: 'So‘rov muvaffaqiyatli yuborildi!',
      rfqSuccessMsg: 'Tez orada eksport bo‘limi mutaxassisi siz bilan bog‘lanadi.',
      specsButton: '📄 Yuklab olish (Spetsifikatsiya)',
      generalInfo: 'UMUMIY MA\'LUMOTLAR',
      logisticsInfo: 'LOGISTIKA VA EKSPORT',
      technicalData: 'TEXNIK KO‘RSATKICHLAR',
      packagingOptions: 'QADOQLASH VARIANTLARI',
      productName: 'Mahsulot nomi',
      categoryLabel: 'Kategoriya',
      originLabel: 'Kelib chiqishi',
      gradeLabel: 'Daraja',
      descLabel: 'Tavsif',
      hsCodeLabel: 'TIF TN kodi',
      moqLabel: 'Minimal buyurtma (MOQ)',
      loadingLabel: 'Yuklash sig‘imi',
      certsLabel: 'Sertifikatlar',
      weightsLabel: 'Qadoqlash',
    },
    wholesale: {
      tag: 'Ulgurji savdo',
      title: 'Katta hajmda kerakmi?',
      subtitle: 'Keling, muhokama qilamiz.',
      button: 'Bog‘lanish →',
    },
    noResults: {
      title: 'Hech narsa topilmadi',
      desc: 'Qidiruv parametrlarini o‘zgartirib ko‘ring yoki boshqa kategoriyani tanlang.',
    },
    tabs: [
      { id: 'all', name: 'Barchasi' },
      { id: 'bestseller', name: 'Bestsellerlar' },
      { id: 'instock', name: 'Mavjud' },
      { id: 'upcoming', name: 'Yaqinda' },
    ],
    stats: {
      products: 'Mahsulotlar',
      categories: 'Kategoriyalar',
      inStockCount: 'Mavjud mahsulotlar',
      points: 'Savdo nuqtalari',
    },
  }
}

// ═══════════════════════════════════════════════════════════════════
// BREAKPOINT HOOK
// ═══════════════════════════════════════════════════════════════════
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
    function measure() {
      const w = window.innerWidth
      setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return bp
}

// ═══════════════════════════════════════════════════════════════════
// PACKAGE VISUAL
// ═══════════════════════════════════════════════════════════════════
function PkgCard({
  p,
  size = 'md',
}: {
  p: Product
  size?: 'md' | 'lg' | 'xl'
}) {
  const dim = {
    md: { w: 76, h: 104, r: 12, nameFs: 9, labelFs: 6, lineMargin: 12 },
    lg: { w: 96, h: 130, r: 16, nameFs: 11, labelFs: 7, lineMargin: 16 },
    xl: { w: 124, h: 168, r: 20, nameFs: 14, labelFs: 9, lineMargin: 20 },
  }[size]

  return (
    <div
      className="pouch-3d"
      style={{
        background: `linear-gradient(135deg, ${p.pkgAccent} 0%, #1A221E 100%)`,
        borderRadius: `${dim.r}px ${dim.r}px ${dim.r / 2}px ${dim.r / 2}px`,
        width: dim.w,
        height: dim.h,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 8px 10px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 16px 36px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: dim.lineMargin,
          left: 0,
          right: 0,
          height: 1,
          background: 'rgba(255,255,255,0.22)',
          borderTop: '1px dashed rgba(0,0,0,0.20)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: dim.lineMargin,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: dim.lineMargin - 2,
          left: -1,
          width: 3,
          height: 4,
          background: '#070E17',
          borderRadius: '0 2px 2px 0',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: dim.lineMargin - 2,
          right: -1,
          width: 3,
          height: 4,
          background: '#070E17',
          borderRadius: '2px 0 0 2px',
          zIndex: 2,
        }}
      />

      <svg
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.08,
          width: '50%',
          height: '50%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFF"
        strokeWidth="1.5"
      >
        <path d="M12,2 C12,2 9,6 12,11 C15,6 12,2 12,2 Z M12,11 C12,11 8,15 12,21 C16,15 12,11 12,11 Z" />
        <path d="M12,6 C9,8 9,11 12,13 M12,8 C15,10 15,12 12,14" strokeWidth="1" />
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontWeight: 600,
          fontSize: dim.labelFs,
          color: p.pkgLabel,
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          zIndex: 1,
          marginTop: 2,
        }}
      >
        ASORT
      </p>

      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 700,
            fontSize: dim.nameFs + 3,
            color: '#fff',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.15)',
          }}
        >
          {p.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 400,
            fontSize: dim.labelFs - 1,
            color: p.pkgLabel,
            letterSpacing: '0.08em',
            opacity: 0.8,
            textTransform: 'uppercase',
          }}
        >
          {p.subtitle}
        </p>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 3,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            fontSize: dim.labelFs - 1,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {p.grade.split(' ')[0]}
        </p>
      </div>
    </div>
  )
}

const getProductImage = (productId: number) => {
  if (productId === 1) return '/images/product-shakar-900.webp'
  if (productId === 2) return '/images/product-alanga-1kg.webp'
  if (productId === 3) return '/images/product-grechka-900.webp'
  if (productId === 4) return '/images/product-mosh-900.webp'
  if (productId === 9) return '/images/product-lazer-1kg.webp'
  return null
}

function ProductImageOrPkg({
  p,
  size = 'md',
  comingSoonText = 'Tez kunda',
}: {
  p: Product
  size?: 'md' | 'lg' | 'xl'
  comingSoonText?: string
}) {
  const imgPath = getProductImage(p.id)
  const dim = {
    md: { w: 76, h: 104, icon: 20, fs: 9 },
    lg: { w: 96, h: 130, icon: 24, fs: 10 },
    xl: { w: 124, h: 168, icon: 32, fs: 12 },
  }[size]

  let content
  if (imgPath) {
    content = (
      <div
        style={{
          width: dim.w,
          height: dim.h,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={imgPath}
          alt={p.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
          }}
        />
      </div>
    )
  } else {
    content = <PkgCard p={p} size={size} />
  }

  if (p.isUpcoming) {
    return (
      <div style={{ position: 'relative', width: dim.w, height: dim.h, flexShrink: 0 }}>
        {content}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 10, 18, 0.65)',
            borderRadius: 6,
            gap: 6,
            zIndex: 10,
          }}
        >
          <svg
            width={dim.icon}
            height={dim.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            style={{
              color: '#ffffff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: dim.fs,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'rgba(0,0,0,0.7)',
              padding: '2px 8px',
              borderRadius: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            {comingSoonText}
          </span>
        </div>
      </div>
    )
  }

  return content
}

// ═══════════════════════════════════════════════════════════════════
// BADGE
// ═══════════════════════════════════════════════════════════════════
function Badge({
  type,
  C,
  labels,
}: {
  type: 'bestseller' | 'new' | 'out'
  C: typeof LIGHT_C
  labels: { bestseller: string; new: string; out: string }
}) {
  const s = {
    bestseller: { background: C.accent, color: '#fff', border: 'none' },
    new: { background: C.green, color: '#fff', border: 'none' },
    out: {
      background: 'transparent',
      color: C.textMuted,
      border: `1px solid ${C.border}`,
    },
  }[type]
  const label = labels[type]
  return (
    <span
      style={{
        ...s,
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 8,
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        padding: '3px 9px',
        borderRadius: 2,
      }}
    >
      {label}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCT CARD — GRID
// ═══════════════════════════════════════════════════════════════════
function ProductCardGrid({
  p,
  onSelect,
  C,
  isMobile,
  t,
}: {
  p: Product
  onSelect: (p: Product) => void
  C: typeof LIGHT_C
  isMobile: boolean
  t: ReturnType<typeof getUiTranslations>
}) {
  const [hov, setHov] = useState(false)
  const isUp = p.isUpcoming
  return (
    <div
      onMouseEnter={() => !isUp && setHov(true)}
      onMouseLeave={() => !isUp && setHov(false)}
      onClick={() => !isUp && onSelect(p)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        borderRadius: 3,
        padding: isMobile ? '14px 12px 12px' : '28px 24px 22px',
        cursor: isUp ? 'not-allowed' : 'pointer',
        opacity: isUp ? 0.65 : p.inStock ? 1 : 0.72,
        transition: 'border-color 0.20s, box-shadow 0.20s, transform 0.20s',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov
          ? '0 16px 40px rgba(42,126,156,0.10)'
          : '0 1px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 8 : 18,
        position: 'relative',
        height: '100%',
        boxSizing: 'border-box',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 8 : 14,
          right: isMobile ? 8 : 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'flex-end',
          zIndex: 2,
        }}
      >
        {p.isBestseller && <Badge type="bestseller" C={C} labels={t.badges} />}
        {p.isNew && <Badge type="new" C={C} labels={t.badges} />}
        {!p.inStock && <Badge type="out" C={C} labels={t.badges} />}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile ? '4px 0' : '8px 0 4px',
        }}
      >
        <div
          style={{
            transform: hov ? 'scale(1.04) translateY(-2px)' : 'none',
            transition: 'transform 0.28s',
          }}
        >
          <ProductImageOrPkg p={p} size={isMobile ? 'md' : 'lg'} comingSoonText={t.badges.comingSoon} />
        </div>
      </div>

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 7,
            fontWeight: 500,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: C.textMuted,
            marginBottom: 3,
          }}
        >
          {p.category}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 700,
            fontSize: isMobile ? 17 : 22,
            color: C.text,
            lineHeight: 1,
            marginBottom: 2,
            letterSpacing: '-0.01em',
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: isMobile ? 10 : 11,
            color: C.textMuted,
            fontWeight: 300,
          }}
        >
          {p.subtitle}
        </p>
      </div>

      {!isMobile && (
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            color: C.textMid,
            lineHeight: 1.78,
            fontWeight: 300,
            flexGrow: 1,
          }}
        >
          {p.description.slice(0, 90)}…
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {p.tags.slice(0, isMobile ? 2 : p.tags.length).map((tagItem) => (
          <span
            key={tagItem}
            style={{
              background: C.tagBg,
              color: C.tagText,
              border: `1px solid ${C.tagBorder}`,
              fontSize: isMobile ? 7 : 8,
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: isMobile ? '2px 5px' : '3px 8px',
              borderRadius: 2,
            }}
          >
            {tagItem}
          </span>
        ))}
      </div>

      {!isMobile && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {p.weights.map((wt) => (
            <span
              key={wt}
              style={{
                background: C.surface,
                color: C.textMid,
                border: `1px solid ${C.border}`,
                fontSize: 10,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 400,
                padding: '4px 10px',
                borderRadius: 2,
              }}
            >
              {wt}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: isMobile ? 8 : 10,
          borderTop: `1px solid ${C.border}`,
          marginTop: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: isMobile ? 8 : 9,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: hov ? C.accent : C.textMuted,
            transition: 'color 0.2s',
          }}
        >
          {isMobile ? t.card.details : t.card.viewSpecs}
        </span>
        <span
          style={{
            color: hov ? C.accent : C.textMuted,
            fontSize: 14,
            transition: 'all 0.2s',
            transform: hov ? 'translateX(3px)' : 'none',
          }}
        >
          →
        </span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCT CARD — LIST
// ═══════════════════════════════════════════════════════════════════
function ProductCardList({
  p,
  onSelect,
  C,
  isMobile,
  t,
}: {
  p: Product
  onSelect: (p: Product) => void
  C: typeof LIGHT_C
  isMobile: boolean
  t: ReturnType<typeof getUiTranslations>
}) {
  const [hov, setHov] = useState(false)
  const isUp = p.isUpcoming
  return (
    <div
      onMouseEnter={() => !isUp && setHov(true)}
      onMouseLeave={() => !isUp && setHov(false)}
      onClick={() => !isUp && onSelect(p)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        borderRadius: 3,
        padding: isMobile ? '14px' : '20px 26px',
        cursor: isUp ? 'not-allowed' : 'pointer',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        boxShadow: hov
          ? '0 8px 24px rgba(42,126,156,0.09)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 12 : 24,
        opacity: isUp ? 0.65 : p.inStock ? 1 : 0.72,
        boxSizing: 'border-box',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: hov ? 'scale(1.03)' : 'none',
          transition: 'transform 0.22s',
          flexShrink: 0,
        }}
      >
        <ProductImageOrPkg p={p} size="md" comingSoonText={t.badges.comingSoon} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
            flexWrap: 'wrap',
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 700,
              fontSize: isMobile ? 17 : 20,
              color: C.text,
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            {p.name}
          </h3>
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
              color: C.textMuted,
              fontWeight: 300,
            }}
          >
            {p.subtitle}
          </span>
          {p.isBestseller && <Badge type="bestseller" C={C} labels={t.badges} />}
          {p.isNew && <Badge type="new" C={C} labels={t.badges} />}
        </div>
        {!isMobile && (
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              color: C.textMid,
              lineHeight: 1.68,
              fontWeight: 300,
              marginBottom: 8,
            }}
          >
            {p.description.slice(0, 140)}…
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {p.tags.slice(0, isMobile ? 2 : p.tags.length).map((tagItem) => (
            <span
              key={tagItem}
              style={{
                background: C.tagBg,
                color: C.tagText,
                border: `1px solid ${C.tagBorder}`,
                fontSize: 8,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: 2,
              }}
            >
              {tagItem}
            </span>
          ))}
        </div>
        {isMobile && (
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 7 }}
          >
            {p.weights.map((wt) => (
              <span
                key={wt}
                style={{
                  background: C.surface,
                  color: C.textMid,
                  border: `1px solid ${C.border}`,
                  fontSize: 9,
                  fontFamily: "'DM Sans',sans-serif",
                  padding: '3px 8px',
                  borderRadius: 2,
                }}
              >
                {wt}
              </span>
            ))}
          </div>
        )}
      </div>

      {!isMobile && (
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
              justifyContent: 'flex-end',
            }}
          >
            {p.weights.map((wt) => (
              <span
                key={wt}
                style={{
                  background: C.surface,
                  color: C.textMid,
                  border: `1px solid ${C.border}`,
                  fontSize: 9,
                  fontFamily: "'DM Sans',sans-serif",
                  padding: '3px 8px',
                  borderRadius: 2,
                }}
              >
                {wt}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: p.inStock ? C.green : C.textMuted,
            }}
          >
            {p.inStock ? t.card.inStock : t.card.outOfStock}
          </span>
        </div>
      )}

      <span
        style={{
          color: hov ? C.accent : C.border,
          fontSize: 18,
          fontWeight: 300,
          flexShrink: 0,
          transition: 'all 0.18s',
          transform: hov ? 'translateX(3px)' : 'none',
          alignSelf: isMobile ? 'center' : 'auto',
        }}
      >
        →
      </span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════════════════════════
function ProductModal({
  p,
  onClose,
  C,
  isMobile,
  t,
}: {
  p: Product
  onClose: () => void
  C: typeof LIGHT_C
  isMobile: boolean
  t: ReturnType<typeof getUiTranslations>
}) {
  const [rfqSubmitted, setRfqSubmitted] = useState(false)
  const [showRfqForm, setShowRfqForm] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [countryName, setCountryName] = useState('')
  const [desiredVolume, setDesiredVolume] = useState('')
  const [packagingOption, setPackagingOption] = useState(p.weights[0] || '')
  const [startY, setStartY] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const startClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return
    const currentY = e.touches[0].clientY
    const diffY = currentY - startY
    if (diffY > 80) {
      startClose()
      setStartY(null)
    }
  }

  const handleTouchEnd = () => {
    setStartY(null)
  }

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') startClose()
    }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      onClick={startClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(5,10,18,0.72)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : 24,
        animation: isClosing ? 'fadeOut 0.3s ease forwards' : 'fadeOv 0.2s ease forwards',
      }}
    >
      <style>{`
        @keyframes fadeOv   { from{opacity:0} to{opacity:1} }
        @keyframes fadeOut  { from{opacity:1} to{opacity:0} }
        @keyframes slideMod { from{opacity:0;transform:translateY(18px) scale(0.98)} to{opacity:1;transform:none} }
        @keyframes slideOut { from{opacity:1;transform:none} to{opacity:0;transform:translateY(18px) scale(0.98)} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(100%)} }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bgCard,
          borderRadius: isMobile ? '12px 12px 0 0' : 4,
          maxWidth: isMobile ? '100%' : 640,
          width: '100%',
          maxHeight: isMobile ? '92dvh' : '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.36)',
          border: isMobile ? 'none' : `1px solid ${C.border}`,
          animation: isClosing
            ? (isMobile ? 'slideDown 0.3s cubic-bezier(.22,.68,0,1) forwards' : 'slideOut 0.26s ease forwards')
            : (isMobile ? 'slideUp 0.32s cubic-bezier(.22,.68,0,1.05) forwards' : 'slideMod 0.26s cubic-bezier(.22,.68,0,1.08) forwards'),
        }}
      >
        {isMobile && (
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '14px 0 10px',
              background: C.bgCard,
              cursor: 'grab',
            }}
          >
            <div
              style={{
                width: 40,
                height: 5,
                borderRadius: 99,
                background: C.border,
              }}
            />
          </div>
        )}

        <div
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
          style={{
            background: p.pkgBg,
            borderRadius: isMobile ? '8px 8px 0 0' : '4px 4px 0 0',
            padding: isMobile ? '20px 16px 18px' : '40px 40px 36px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            position: 'relative',
            gap: isMobile ? 12 : 24,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }}
          />

          <div style={{ zIndex: 1, flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 8,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                marginBottom: isMobile ? 6 : 10,
              }}
            >
              {p.category} · {p.origin}
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 700,
                fontSize: isMobile ? '1.9rem' : 'clamp(2.4rem,6vw,3.8rem)',
                color: '#fff',
                lineHeight: 0.92,
                marginBottom: isMobile ? 6 : 10,
                letterSpacing: '-0.02em',
              }}
            >
              {p.name}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: isMobile ? 11 : 13,
                fontWeight: 300,
                color: p.pkgLabel,
                opacity: 0.78,
              }}
            >
              {p.subtitle} — {p.grade}
            </p>
          </div>

          <div
            style={{
              transform: 'rotate(3deg)',
              filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.45))',
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <ProductImageOrPkg p={p} size={isMobile ? 'lg' : 'xl'} comingSoonText={t.badges.comingSoon} />
          </div>

          <button
            onClick={startClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              pointerEvents: 'auto',
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: isMobile ? '18px 16px 36px' : '30px 40px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 16 : 24,
          }}
        >
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {p.isBestseller && <Badge type="bestseller" C={C} labels={t.badges} />}
            {p.isNew && <Badge type="new" C={C} labels={t.badges} />}
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: p.inStock ? C.green : C.textMuted,
                border: `1px solid ${p.inStock ? C.greenBorder : C.border}`,
                background: p.inStock ? C.greenBg : 'transparent',
                padding: '3px 9px',
                borderRadius: 2,
              }}
            >
              {p.inStock ? t.card.inStock : t.card.outOfStock}
            </span>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: isMobile ? 13 : 14,
              color: C.textMid,
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {p.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 14 : 20,
              padding: isMobile ? 14 : 20,
              background: C.surface,
              borderRadius: 3,
              border: `1px solid ${C.border}`,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 10,
                }}
              >
                {t.modal.logisticsInfo}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: C.textMuted }}>{t.modal.hsCodeLabel}:</span>
                  <span style={{ fontWeight: 600, color: C.text }}>{p.hsCode}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: C.textMuted }}>{t.modal.moqLabel}:</span>
                  <span style={{ fontWeight: 600, color: C.text }}>{p.moq}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: C.textMuted }}>{t.modal.loadingLabel}:</span>
                  <span style={{ fontWeight: 600, color: C.text }}>{p.loading}</span>
                </div>
              </div>
            </div>

            <div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: C.accent,
                  marginBottom: 10,
                }}
              >
                {t.modal.certsLabel}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.certs.map((c) => (
                  <span
                    key={c}
                    style={{
                      background: 'rgba(194,159,104,0.12)',
                      color: '#C29F68',
                      border: '1px solid rgba(194,159,104,0.25)',
                      fontSize: 9,
                      fontWeight: 600,
                      fontFamily: "'DM Sans',sans-serif",
                      padding: '3px 8px',
                      borderRadius: 2,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {p.facts.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: C.textMuted,
                  marginBottom: 12,
                }}
              >
                {t.modal.technicalData}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(p.facts.length, 3)}, 1fr)`,
                  gap: 10,
                }}
              >
                {p.facts.map((f) => (
                  <div
                    key={f.label}
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      padding: '10px 14px',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontWeight: 700,
                        fontSize: isMobile ? 18 : 22,
                        color: C.accent,
                        lineHeight: 1,
                      }}
                    >
                      {f.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: C.textMuted,
                        marginTop: 4,
                      }}
                    >
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: C.textMuted,
                marginBottom: 10,
              }}
            >
              {t.modal.packagingOptions}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.weights.map((wt) => (
                <span
                  key={wt}
                  style={{
                    background: C.tagBg,
                    color: C.tagText,
                    border: `1px solid ${C.tagBorder}`,
                    fontSize: 9,
                    fontWeight: 500,
                    fontFamily: "'DM Sans',sans-serif",
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: 2,
                  }}
                >
                  {wt}
                </span>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, textAlign: 'left' }}>
            <button
              onClick={() => {
                const excelHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<style>
  table { border-collapse: collapse; }
  td { font-family: 'Segoe UI', sans-serif; font-size: 10pt; color: #1E2520; border: 1px solid #E6E1D8; padding: 7px 12px; }
  .title-cell { font-family: 'Georgia', serif; font-size: 15pt; font-weight: bold; color: #FFFFFF; background-color: #2D5F3E; text-align: center; padding: 12px; }
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
      <td colspan="2" class="title-cell">ASORT PREMIUM EXPORT FOODS</td>
    </tr>
    <tr>
      <td colspan="2" class="subtitle-cell">PRODUCT SPECIFICATION SHEET</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:12px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="section-cell">${t.modal.generalInfo}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.productName}</td>
      <td class="value-cell">${p.name} (${p.subtitle})</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.categoryLabel}</td>
      <td class="value-cell">${p.category}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.originLabel}</td>
      <td class="value-cell">${p.origin}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.gradeLabel}</td>
      <td class="value-cell">${p.grade}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.descLabel}</td>
      <td class="value-cell">${p.description}</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:12px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="section-cell">${t.modal.logisticsInfo}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.hsCodeLabel}</td>
      <td class="value-cell">${p.hsCode}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.moqLabel}</td>
      <td class="value-cell">${p.moq}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.loadingLabel}</td>
      <td class="value-cell">${p.loading}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.certsLabel}</td>
      <td class="value-cell">${p.certs.join(', ')}</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:12px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="section-cell">${t.modal.technicalData}</td>
    </tr>
    ${p.facts.map((f) => `
    <tr>
      <td class="label-cell">${f.label}</td>
      <td class="value-cell">${f.value}</td>
    </tr>
    `).join('')}
    <tr>
      <td colspan="2" style="border:none; height:12px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="section-cell">${t.modal.packagingOptions}</td>
    </tr>
    <tr>
      <td class="label-cell">${t.modal.weightsLabel}</td>
      <td class="value-cell">${p.weights.join(', ')}</td>
    </tr>
    <tr>
      <td colspan="2" style="border:none; height:18px;"></td>
    </tr>
    <tr>
      <td colspan="2" class="footer-cell">Asort LLC · Export Dept: exports@asort.uz · www.asort.uz</td>
    </tr>
  </table>
</body>
</html>`
                const blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `ASORT_datasheet_${p.name.toLowerCase()}.xls`
                link.click()
                URL.revokeObjectURL(url)
              }}
              style={{
                background: 'transparent',
                border: '1px solid #C29F68',
                borderRadius: 2,
                color: '#C29F68',
                padding: '10px 18px',
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(194,159,104,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {t.modal.specsButton}
            </button>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
            {!showRfqForm ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setShowRfqForm(true)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '14px 0',
                    borderRadius: 2,
                    background: C.accent,
                    color: '#fff',
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(45,95,62,0.15)',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.accentDeep
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = C.accent
                  }}
                >
                  ✉ {t.modal.rfqTitle}
                </button>
              </div>
            ) : rfqSubmitted ? (
              <div
                style={{
                  background: C.greenBg,
                  border: `1px solid ${C.greenBorder}`,
                  borderRadius: 2,
                  padding: 20,
                  textAlign: 'center',
                }}
              >
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: C.green, marginBottom: 4 }}>
                  {t.modal.rfqSuccessTitle}
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.textMid }}>
                  {t.modal.rfqSuccessMsg}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setRfqSubmitted(true)
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  background: C.surface,
                  padding: 16,
                  borderRadius: 3,
                  border: `1px solid ${C.border}`,
                }}
              >
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent }}>
                  {t.modal.rfqTitle}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                  <input
                    required
                    type="text"
                    placeholder={t.modal.companyPlaceholder}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      padding: '10px 12px',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12,
                      color: C.text,
                    }}
                  />
                  <input
                    required
                    type="text"
                    placeholder={t.modal.countryPlaceholder}
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      padding: '10px 12px',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12,
                      color: C.text,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                  <input
                    required
                    type="text"
                    placeholder={t.modal.volumePlaceholder}
                    value={desiredVolume}
                    onChange={(e) => setDesiredVolume(e.target.value)}
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      padding: '10px 12px',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12,
                      color: C.text,
                    }}
                  />
                  <select
                    value={packagingOption}
                    onChange={(e) => setPackagingOption(e.target.value)}
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 2,
                      padding: '10px 12px',
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12,
                      color: C.text,
                    }}
                  >
                    {p.weights.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                    <option value="25kg qop">25kg PP qop</option>
                    <option value="Big Bag">1000kg Big Bag</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    background: C.accent,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 2,
                    padding: '12px 0',
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.accentDeep
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = C.accent
                  }}
                >
                  {t.modal.submitRfq}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════
export default function ProductsPage() {
  const params = useParams()
  const { language } = useLanguage()
  const locale = ((params?.locale as Language) || language || 'uz') as Language

  const { theme } = useTheme()
  const C = theme === 'dark' ? DARK_C : LIGHT_C
  const isDark = theme === 'dark'

  const bp = useBreakpoint()
  const ready = bp !== undefined
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const products = useMemo(() => getProducts(locale), [locale])
  const categories = useMemo(() => getCategories(locale), [locale])
  const sortOptions = useMemo(() => getSortOptions(locale), [locale])
  const t = useMemo(() => getUiTranslations(locale), [locale])

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [sort, setSort] = useState('default')
  const [activeTab, setActiveTab] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<Product | null>(null)
  const [showcaseId, setShowcaseId] = useState(2)
  const searchRef = useRef<HTMLInputElement>(null)

  // Reset category selection if language switches and selected category changes name
  useEffect(() => {
    setCategory(categories[0])
  }, [categories])

  const showcaseProduct = useMemo(() => {
    return products.find((p) => p.id === showcaseId) || products[1] || products[0]
  }, [products, showcaseId])

  const filtered = useMemo(() => {
    let list = [...products]
    
    // Tab filter
    if (activeTab === 'bestseller') list = list.filter((p) => p.isBestseller)
    if (activeTab === 'instock') list = list.filter((p) => p.inStock)
    if (activeTab === 'upcoming') list = list.filter((p) => p.isUpcoming)

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((tagItem) => tagItem.toLowerCase().includes(q)) ||
          p.origin.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (category !== categories[0]) {
      list = list.filter((p) => p.category === category)
    }

    // Sort filter
    if (sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'name_desc') list.sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [products, search, category, sort, activeTab, categories])

  const px = isMobile ? '16px' : isTablet ? '24px' : '48px'

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        transition: 'background 0.3s',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
        input::placeholder { color: ${C.textMuted}; }
        input:focus  { outline: none; }
        select:focus { outline: none; }

        .pouch-3d {
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease !important;
        }
        .pouch-3d:hover {
          transform: scale(1.05) rotate(2.5deg) translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.30) !important;
        }

        @keyframes floatBag {
          0% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(3deg); }
        }
        .showroom-bag {
          animation: floatBag 5s ease-in-out infinite;
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.18));
        }

        .chip {
          font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
          letter-spacing:0.18em; text-transform:uppercase;
          padding:7px 14px; border-radius:2px; cursor:pointer;
          border:1px solid ${C.border}; background:${C.bgCard}; color:${C.textMid};
          transition:border-color 0.16s,color 0.16s,background 0.16s;
          white-space:nowrap; flex-shrink:0;
        }
        .chip:hover { border-color:${C.accent}; color:${C.accent}; background:${C.accentLight}; }
        .chip.on    { background:${C.accent}; border-color:${C.accent}; color:#fff; }

        .vbtn {
          width:34px; height:34px; border-radius:2px;
          border:1px solid ${C.border}; background:${C.bgCard};
          color:${C.textMuted}; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.16s; flex-shrink:0;
        }
        .vbtn.on             { background:${C.accent}; border-color:${C.accent}; color:#fff; }
        .vbtn:hover:not(.on) { border-color:${C.accent}; color:${C.accent}; }

        .sort-sel {
          font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
          letter-spacing:0.14em; text-transform:uppercase;
          padding:8px 28px 8px 10px; border-radius:2px;
          border:1px solid ${C.border}; background:${C.bgCard}; color:${C.textMid};
          cursor:pointer; appearance:none; flex-shrink:0;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='5'%3E%3Cpath d='M0 0l4.5 5 4.5-5z' fill='%237BA4B5'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 10px center;
        }

        .chip-scroll { overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; }
        .chip-scroll::-webkit-scrollbar { display:none; }

        @keyframes cardIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        .cin { animation:cardIn 0.28s ease both; }
      `}</style>

      {!ready && <div style={{ minHeight: '100vh' }} />}

      {ready && (
        <>
          <div
            style={{
              background: isDark
                ? 'linear-gradient(180deg,#0D1623 0%,#070E17 100%)'
                : 'linear-gradient(180deg, #FDFBF7 0%, #FAF6EE 100%)',
              borderBottom: `1px solid ${C.heroBorder}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                width: '110%',
                height: '120%',
                opacity: 0.12,
                pointerEvents: 'none',
                zIndex: 0,
              }}
              viewBox="0 0 1440 400"
              fill="none"
              stroke="rgba(45, 95, 62, 0.05)"
              strokeWidth="1.5"
            >
              <path d="M-100,50 C280,80 380,20 780,100 C1180,180 1280,50 1600,80" />
              <path d="M-100,120 C300,160 430,80 830,170 C1230,260 1330,120 1600,170" />
              <path d="M-100,200 C320,240 480,160 880,250 C1280,340 1380,200 1600,250" />
            </svg>

            <div
              style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: `${isMobile ? '90px' : '115px'} ${px} ${isMobile ? '30px' : '40px'}`,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr 1fr',
                  gap: isMobile ? 32 : 40,
                  alignItems: 'center',
                }}
              >
                <div style={{ order: isMobile ? 2 : 1 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 8,
                      fontWeight: 600,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: C.accent,
                      marginBottom: 8,
                    }}
                  >
                    {showcaseProduct.category} · {showcaseProduct.origin}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 700,
                      fontSize: isMobile ? '1.6rem' : '2.1rem',
                      color: C.text,
                      lineHeight: 1.1,
                      marginBottom: 20,
                    }}
                  >
                    {t.nutritionTitle}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px dashed ${C.border}`, paddingBottom: 8 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.textMuted }}>{t.caloriesLabel}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: C.accent }}>
                        {showcaseProduct.id === 1 ? '398 kcal' : showcaseProduct.id === 3 ? '343 kcal' : showcaseProduct.id === 4 ? '347 kcal' : showcaseProduct.id === 9 ? '350 kcal' : '345 kcal'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px dashed ${C.border}`, paddingBottom: 8 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.textMuted }}>{t.proteinLabel}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: C.text }}>
                        {showcaseProduct.id === 1 ? '0 g' : showcaseProduct.id === 3 ? '13 g' : showcaseProduct.id === 4 ? '24 g' : '7 g'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px dashed ${C.border}`, paddingBottom: 8 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.textMuted }}>{t.carbsLabel}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: C.text }}>
                        {showcaseProduct.id === 1 ? '99.9 g' : showcaseProduct.id === 3 ? '64 g' : showcaseProduct.id === 4 ? '62 g' : '78 g'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.textMuted }}>{t.fatLabel}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: C.text }}>
                        {showcaseProduct.id === 1 ? '0 g' : showcaseProduct.id === 3 ? '3.4 g' : showcaseProduct.id === 4 ? '1.2 g' : '0.6 g'}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    order: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: isMobile ? 260 : 320,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 700,
                      fontSize: isMobile ? '80px' : '110px',
                      color: 'rgba(45, 95, 62, 0.035)',
                      letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      zIndex: 0,
                      transform: 'rotate(-4deg)',
                    }}
                  >
                    {showcaseProduct.name.split(' ')[1] || showcaseProduct.name}
                  </div>

                  <div className="showroom-bag" style={{ zIndex: 1, transform: 'scale(1.1)' }}>
                    <ProductImageOrPkg p={showcaseProduct} size={isMobile ? 'lg' : 'xl'} comingSoonText={t.badges.comingSoon} />
                  </div>

                  <div
                    style={{
                      width: 140,
                      height: 12,
                      background: 'radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 80%)',
                      marginTop: 16,
                      borderRadius: '50%',
                      zIndex: 0,
                    }}
                  />
                </div>

                <div style={{ order: 3 }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 700,
                      fontSize: isMobile ? '2.1rem' : '2.6rem',
                      color: C.text,
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {showcaseProduct.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#C29F68',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      marginBottom: 16,
                    }}
                  >
                    {showcaseProduct.grade}
                  </p>

                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12.5,
                      color: C.textMid,
                      lineHeight: 1.8,
                      fontWeight: 300,
                      marginBottom: 20,
                    }}
                  >
                    {showcaseProduct.subtitle}. {showcaseProduct.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button
                      onClick={() => setSelected(showcaseProduct)}
                      style={{
                        background: C.accent,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 2,
                        padding: '12px 0',
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(45,95,62,0.15)',
                        transition: 'all 0.22s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = C.accentDeep
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = C.accent
                      }}
                    >
                      {t.moreDetails}
                    </button>

                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      {(locale === 'ru'
                        ? [
                            { name: 'Сахар', id: 1 },
                            { name: 'Рис', id: 2 },
                            { name: 'Гречка', id: 3 },
                          ]
                        : locale === 'en'
                        ? [
                            { name: 'Sugar', id: 1 },
                            { name: 'Rice', id: 2 },
                            { name: 'Buckwheat', id: 3 },
                          ]
                        : [
                            { name: 'Shakar', id: 1 },
                            { name: 'Guruch', id: 2 },
                            { name: 'Grechka', id: 3 },
                          ]
                      ).map((item) => {
                        const isAct = showcaseId === item.id
                        return (
                          <button
                            key={item.id}
                            onClick={() => setShowcaseId(item.id)}
                            style={{
                              flex: 1,
                              padding: '8px 0',
                              borderRadius: 2,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              border: `1px solid ${isAct ? C.accent : C.border}`,
                              background: isAct
                                ? isDark
                                  ? 'rgba(91,184,212,0.18)'
                                  : 'rgba(45,95,62,0.12)'
                                : C.bgCard,
                              color: isAct ? C.accent : C.textMuted,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {item.name}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 36,
                  paddingTop: 24,
                  borderTop: `1px solid ${C.heroBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {t.tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          background: isActive ? C.accent : 'transparent',
                          color: isActive ? '#fff' : C.textMid,
                          border: `1px solid ${isActive ? C.accent : C.border}`,
                          borderRadius: 2,
                          padding: '6px 14px',
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: isActive ? '#fff' : '#C29F68',
                            display: 'inline-block',
                          }}
                        />
                        {tab.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'sticky',
              top: 64,
              zIndex: 100,
              background: C.bgCard,
              borderBottom: `1px solid ${C.border}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'background 0.3s',
            }}
          >
            <div
              style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: `10px ${px}`,
              }}
            >
              {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 2,
                        padding: '0 10px',
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={C.textMuted}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>

                      <input
                        ref={searchRef}
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          border: 'none',
                          background: 'transparent',
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 13,
                          color: C.text,
                          padding: '10px 0',
                        }}
                      />

                      {search && (
                        <button
                          onClick={() => setSearch('')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: C.textMuted,
                            fontSize: 17,
                            lineHeight: 1,
                            padding: 0,
                            flexShrink: 0,
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <select
                      className="sort-sel"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      style={{ fontSize: 9, padding: '9px 22px 9px 8px' }}
                    >
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>

                    <button
                      className={`vbtn ${view === 'grid' ? 'on' : ''}`}
                      onClick={() => setView('grid')}
                      title={t.viewGrid}
                    >
                      <svg width="12" height="12" viewBox="0 0 13 13" fill="currentColor">
                        <rect x="0" y="0" width="5.5" height="5.5" rx="0.8" />
                        <rect x="7.5" y="0" width="5.5" height="5.5" rx="0.8" />
                        <rect x="0" y="7.5" width="5.5" height="5.5" rx="0.8" />
                        <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="0.8" />
                      </svg>
                    </button>
                    <button
                      className={`vbtn ${view === 'list' ? 'on' : ''}`}
                      onClick={() => setView('list')}
                      title={t.viewList}
                    >
                      <svg width="12" height="12" viewBox="0 0 13 13" fill="currentColor">
                        <rect x="0" y="1" width="13" height="2.5" rx="0.8" />
                        <rect x="0" y="5.25" width="13" height="2.5" rx="0.8" />
                        <rect x="0" y="9.5" width="13" height="2.5" rx="0.8" />
                      </svg>
                    </button>
                  </div>

                  <div className="chip-scroll" style={{ display: 'flex', gap: 5, paddingBottom: 2 }}>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`chip ${category === cat ? 'on' : ''}`}
                        onClick={() => setCategory(cat)}
                        style={{ fontSize: 9, padding: '5px 11px' }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      flex: 1,
                      minWidth: 0,
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`chip ${category === cat ? 'on' : ''}`}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 2,
                        padding: '0 12px',
                        width: isTablet ? 160 : 220,
                        transition: 'width 0.2s',
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={C.textMuted}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginRight: 8, flexShrink: 0 }}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <input
                        ref={searchRef}
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 11,
                          color: C.text,
                          padding: '9px 0',
                        }}
                      />
                      {search && (
                        <button
                          onClick={() => setSearch('')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: C.textMuted,
                            fontSize: 16,
                            lineHeight: 1,
                            padding: 0,
                            marginLeft: 4,
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <select
                      className="sort-sel"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>

                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        className={`vbtn ${view === 'grid' ? 'on' : ''}`}
                        onClick={() => setView('grid')}
                        title={t.viewGrid}
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
                          <rect x="0" y="0" width="5.5" height="5.5" rx="0.8" />
                          <rect x="7.5" y="0" width="5.5" height="5.5" rx="0.8" />
                          <rect x="0" y="7.5" width="5.5" height="5.5" rx="0.8" />
                          <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="0.8" />
                        </svg>
                      </button>
                      <button
                        className={`vbtn ${view === 'list' ? 'on' : ''}`}
                        onClick={() => setView('list')}
                        title={t.viewList}
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
                          <rect x="0" y="1" width="13" height="2.5" rx="0.8" />
                          <rect x="0" y="5.25" width="13" height="2.5" rx="0.8" />
                          <rect x="0" y="9.5" width="13" height="2.5" rx="0.8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: `${isMobile ? '24px' : '40px'} ${px} 80px`,
            }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  background: C.bgCard,
                  borderRadius: 3,
                  border: `1px dashed ${C.border}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 24,
                    color: C.text,
                    marginBottom: 8,
                  }}
                >
                  {t.noResults.title}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 12,
                    color: C.textMuted,
                    marginBottom: 20,
                  }}
                >
                  {t.noResults.desc}
                </p>
                <button
                  className="chip on"
                  onClick={() => {
                    setSearch('')
                    setCategory(categories[0])
                    setActiveTab('all')
                  }}
                >
                  Filtrlarni tozalash ↺
                </button>
              </div>
            ) : view === 'grid' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? 'repeat(2, 1fr)'
                    : isTablet
                    ? 'repeat(3, 1fr)'
                    : 'repeat(4, 1fr)',
                  gap: isMobile ? 12 : 20,
                }}
              >
                {filtered.map((productItem, i) => (
                  <div
                    key={productItem.id}
                    className="cin"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <ProductCardGrid
                      p={productItem}
                      onSelect={(p) => setSelected(p)}
                      C={C}
                      isMobile={isMobile}
                      t={t}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtered.map((productItem, i) => (
                  <div
                    key={productItem.id}
                    className="cin"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <ProductCardList
                      p={productItem}
                      onSelect={(p) => setSelected(p)}
                      C={C}
                      isMobile={isMobile}
                      t={t}
                    />
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <div
                style={{
                  marginTop: 56,
                  padding: isMobile ? '26px 18px' : '44px 52px',
                  background: isDark
                    ? 'linear-gradient(140deg,#0D1623 0%,#070E17 100%)'
                    : 'linear-gradient(140deg,#2D5F3E 0%,#1D3F27 100%)',
                  borderRadius: 4,
                  border: '1px solid rgba(45,95,62,0.15)',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  gap: isMobile ? 20 : 28,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: -32,
                    top: -32,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    border: '1px solid rgba(45,95,62,0.08)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 8,
                      letterSpacing: '0.44em',
                      textTransform: 'uppercase',
                      color: '#C29F68',
                      marginBottom: 10,
                    }}
                  >
                    {t.wholesale.tag}
                  </p>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 700,
                      fontSize: isMobile
                        ? '1.7rem'
                        : 'clamp(1.6rem,3vw,2.4rem)',
                      color: '#fff',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {t.wholesale.title}
                    <br />
                    <span
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 300,
                        color: '#FAF6EE',
                      }}
                    >
                      {t.wholesale.subtitle}
                    </span>
                  </h3>
                </div>

                <Link
                  href={`/${locale}/contact`}
                  prefetch={false}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: isMobile ? '13px 0' : '13px 30px',
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: 'center',
                    borderRadius: 2,
                    background: '#FAF6EE',
                    color: '#2D5F3E',
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: 10,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(45,95,62,0.15)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.wholesale.button}
                </Link>
              </div>
            )}
          </div>

          {selected && (
            <ProductModal
              p={selected}
              onClose={() => setSelected(null)}
              C={C}
              isMobile={isMobile}
              t={t}
            />
          )}
        </>
      )}
    </div>
  )
}
