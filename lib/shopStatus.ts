import type { ShopSchedule } from '@/types'

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function isShopOpen(schedule: ShopSchedule[], now: Date = new Date()): boolean {
  const day = now.getDay()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const slot = schedule.find((s) => s.days.includes(day))
  if (!slot) return false

  const open = toMinutes(slot.open)
  const close = toMinutes(slot.close)

  // Handles closing after midnight (e.g. 18:00 → 02:00)
  if (close < open) {
    return currentMinutes >= open || currentMinutes < close
  }

  return currentMinutes >= open && currentMinutes < close
}
