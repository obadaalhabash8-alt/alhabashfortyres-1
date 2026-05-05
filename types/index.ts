export type Language = 'ar' | 'en'

export interface LocalizedString {
  ar: string
  en: string
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
  images: string[]
  coverImage: string
  description: LocalizedString
  sharedServices: LocalizedString[]
  uniqueServices: LocalizedString[]
  founded?: number
  workingHours: LocalizedString
}

export interface Rating {
  id: string
  shop_id: number
  name: string
  rating: number
  comment: string
  created_at: string
}

export interface RatingFormData {
  shop_id: number
  name: string
  rating: number
  comment: string
}

export interface TimelineEvent {
  year: number
  title: LocalizedString
  description: LocalizedString
  image?: string
}
