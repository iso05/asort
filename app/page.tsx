'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/uz')
  }, [router])

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7' }} />
  )
}
