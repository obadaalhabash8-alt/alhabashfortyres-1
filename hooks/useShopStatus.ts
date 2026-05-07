'use client'

import { useState, useEffect } from 'react'
import type { ShopSchedule } from '@/types'
import { isShopOpen } from '@/lib/shopStatus'

export function useShopStatus(schedule: ShopSchedule[]): boolean {
  const [open, setOpen] = useState(() => isShopOpen(schedule))

  useEffect(() => {
    const tick = () => setOpen(isShopOpen(schedule))
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [schedule])

  return open
}
