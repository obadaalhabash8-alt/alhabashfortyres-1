export type Language = 'ar' | 'en'

export interface LocalizedString {
  ar: string
  en: string
}

export interface ShopSchedule {
  days: number[] // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  open: string   // "08:00"
  close: string  // "22:00"
}

export interface Shop {
  id: number
  name: LocalizedString
  tagline: LocalizedString
  address: LocalizedString
  city: LocalizedString
  phone: string
  whatsapp?: string
  mapUrl: string
  mapEmbed: string
  coverImage: string
  description: LocalizedString
  sharedServices: LocalizedString[]
  uniqueServices: LocalizedString[]
  founded?: number
  workingHours: LocalizedString
  schedule: ShopSchedule[]
}

export interface Rating {
  id: string
  shop_id: number
  name: string
  rating: number
  comment: string
  created_at: string
}

export interface TimelineEvent {
  year: number
  title: LocalizedString
  description: LocalizedString
  image?: string
}
