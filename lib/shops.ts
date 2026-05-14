import type { Shop, TimelineEvent } from '@/types'

export const shops: Shop[] = [
  {
    id: 1,
    name: {
      ar: 'الفرع الأول',
      en: 'First Branch',
    },
    tagline: {
      ar: 'أول محل وأكثره عراقة منذ ١٩٦٧',
      en: 'The original shop, serving since 1967',
    },
    address: {
      ar: 'استراد درعا القديم',
      en: 'Old Daraa Highway',
    },
    city: {
      ar: 'دمشق',
      en: 'Damascus',
    },
    phones: ['+963959943048', '+963980062144'],
    whatsapps: ['+963959943048', '+963980062144'],
    mapUrl: 'https://maps.google.com/?q=33.467222,36.284194',
    mapEmbed:
      'https://maps.google.com/maps?q=33.467222,36.284194&output=embed',
    coverImage: '/branch1.jpg',
    description: {
      ar: 'الفرع الأصلي والرئيسي لشركة الحبش للإطارات، تأسس عام ١٩٦٧ ليكون الأول في تقديم خدمات الإطارات الاحترافية. نفخر بأكثر من ٥٥ عاماً من الخبرة والثقة، مع فريق متخصص يضم أمهر الفنيين وأحدث المعدات.',
      en: 'The original flagship branch of Al-Habash Tyres, established in 1967 as the first professional tyre service in the area. We are proud of over 55 years of expertise and trust, with a specialized team of skilled technicians and state-of-the-art equipment.',
    },
    sharedServices: [
      { ar: 'جميع أنواع الإطارات (سيارات، SUV، بيكاب)', en: 'All types of tyres (cars, SUVs, pickups)' },
      { ar: 'تغيير الزيت وفلتر الهواء', en: 'Oil & air filter change' },
      { ar: 'ضبط زوايا العجلات', en: 'Wheel alignment' },
      { ar: 'توازن العجلات', en: 'Wheel balancing' },
      { ar: 'خدمة الفرامل والبطاريات', en: 'Brakes & battery service' },
      { ar: 'فحص ضغط الإطارات مجاناً', en: 'Free tyre pressure check' },
    ],
    uniqueServices: [
      { ar: 'حماية الطلاء PPF', en: 'PPF Paint Protection Film' },
      { ar: 'تلميع احترافي متعدد المراحل', en: 'Multi-stage Professional Polishing' },
      { ar: 'معالجة السيراميك لحماية الطلاء', en: 'Ceramic Coating Protection' },
      { ar: 'جديد كامل لمظهر السيارة', en: 'Full Car Detailing Restoration' },
    ],
    workingHours: {
      ar: 'يومياً: ٨ص – ٨م',
      en: 'Daily: 8 AM – 8 PM',
    },
    schedule: [
      { days: [0, 1, 2, 3, 4, 5, 6], open: '08:00', close: '20:00' },
    ],
  },
  {
    id: 2,
    name: {
      ar: 'الفرع الثاني',
      en: 'Second Branch',
    },
    tagline: {
      ar: 'خبرة المتخصصين في حماية وصيانة سيارتك',
      en: "Expert care for your vehicle's protection and maintenance",
    },
    address: {
      ar: 'استراد درعا الجديد',
      en: 'New Daraa Highway',
    },
    city: {
      ar: 'دمشق',
      en: 'Damascus',
    },
    phones: ['+963946355611', '+963933336001'],
    whatsapps: ['+963946355611', '+963933336001'],
    mapUrl: 'https://maps.google.com/?q=24.7136,46.6751',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.6751!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzAuNCJF!5e0!3m2!1sen!2ssa!4v1234567891',
    coverImage: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80',
    description: {
      ar: 'فرع الشمال هو وجهتك للخدمات المتقدمة والمتخصصة. نوفر أحدث تقنيات حماية الطلاء وخدمات التلميع الاحترافية، إلى جانب الخدمات الأساسية للإطارات. يضم الفرع مركزاً متكاملاً للعناية بالسيارات يضاهي أعلى المعايير العالمية.',
      en: 'The North Branch is your destination for advanced and specialized services. We offer the latest paint protection technologies and professional detailing, alongside essential tyre services. The branch houses a full-service car care center that meets the highest international standards.',
    },
    sharedServices: [
      { ar: 'جميع أنواع الإطارات (سيارات، SUV، بيكاب)', en: 'All types of tyres (cars, SUVs, pickups)' },
      { ar: 'تغيير الزيت وفلتر الهواء', en: 'Oil & air filter change' },
      { ar: 'ضبط زوايا العجلات', en: 'Wheel alignment' },
      { ar: 'توازن العجلات', en: 'Wheel balancing' },
      { ar: 'خدمة الفرامل والبطاريات', en: 'Brakes & battery service' },
      { ar: 'فحص ضغط الإطارات مجاناً', en: 'Free tyre pressure check' },
    ],
    uniqueServices: [
      { ar: 'طلاء الحماية PPF (Paint Protection Film)', en: 'PPF — Paint Protection Film' },
      { ar: 'الطلاء السيراميكي الاحترافي', en: 'Professional ceramic coating' },
      { ar: 'تلميع وتنظيف السيارة (Detailing)', en: 'Full car detailing & polishing' },
      { ar: 'تظليل الزجاج بأفضل المواد', en: 'Premium window tinting' },
    ],
    workingHours: {
      ar: 'يومياً: ٨ص – ٨م',
      en: 'Daily: 8 AM – 8 PM',
    },
    schedule: [
      { days: [0, 1, 2, 3, 4, 5, 6], open: '08:00', close: '20:00' },
    ],
  },
  {
    id: 3,
    name: {
      ar: 'الفرع الثالث',
      en: 'Third Branch',
    },
    tagline: {
      ar: 'متخصصون في المركبات الثقيلة والأسطول التجاري',
      en: 'Specialists in heavy vehicles and commercial fleets',
    },
    address: {
      ar: 'استراد درعا الجديد',
      en: 'New Daraa Highway',
    },
    city: {
      ar: 'دمشق',
      en: 'Damascus',
    },
    phones: ['+963930106667', '+963943635316'],
    whatsapps: ['+963930106667', '+963943635316'],
    mapUrl: 'https://maps.google.com/?q=24.5600,46.7800',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.0!2d46.7800!3d24.5600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDMzJzM2LjAiTiA0NsKwNDYnNDguMCJF!5e0!3m2!1sen!2ssa!4v1234567892',
    coverImage: '/branch3.jpg',
    description: {
      ar: 'فرع الجنوب هو الخيار الأول لأصحاب المركبات الثقيلة والشركات التجارية. نوفر مخزوناً ضخماً من إطارات الشاحنات والمعدات الزراعية والإطارات الصناعية، مع فريق متخصص يعمل على مدار الساعة لتلبية احتياجات الأسطول التجاري.',
      en: 'The South Branch is the first choice for heavy vehicle owners and commercial companies. We stock a massive inventory of truck, agricultural, and industrial tyres, with a specialized team operating around the clock to meet commercial fleet needs.',
    },
    sharedServices: [
      { ar: 'جميع أنواع الإطارات (سيارات، SUV، بيكاب)', en: 'All types of tyres (cars, SUVs, pickups)' },
      { ar: 'تغيير الزيت وفلتر الهواء', en: 'Oil & air filter change' },
      { ar: 'ضبط زوايا العجلات', en: 'Wheel alignment' },
      { ar: 'توازن العجلات', en: 'Wheel balancing' },
      { ar: 'خدمة الفرامل والبطاريات', en: 'Brakes & battery service' },
      { ar: 'فحص ضغط الإطارات مجاناً', en: 'Free tyre pressure check' },
    ],
    uniqueServices: [
      { ar: 'إطارات الشاحنات والمركبات الثقيلة', en: 'Truck & heavy vehicle tyres' },
      { ar: 'إطارات المعدات الزراعية', en: 'Agricultural equipment tyres' },
      { ar: 'خدمة الأسطول التجاري (عقود سنوية)', en: 'Commercial fleet service (annual contracts)' },
      { ar: 'خدمة الطوارئ ٢٤ ساعة للشاحنات', en: '24-hour emergency truck service' },
    ],
    workingHours: {
      ar: 'يومياً: ٨ص – ٦م',
      en: 'Daily: 8 AM – 6 PM',
    },
    schedule: [
      { days: [0, 1, 2, 3, 4, 5, 6], open: '08:00', close: '18:00' },
    ],
  },
]

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1967,
    title: { ar: 'التأسيس', en: 'The Founding' },
    description: {
      ar: 'تأسس أول محل للحبش للإطارات في قلب المدينة، ليبدأ مسيرة طويلة من الخدمة والثقة.',
      en: 'The first Al-Habash Tyres shop was founded in the heart of the city, beginning a long journey of service and trust.',
    },
    image: '/timeline-1967.jpg',
  },
  {
    year: 1975,
    title: { ar: 'التوسع الأول', en: 'First Expansion' },
    description: {
      ar: 'توسعة المحل الأصلي وإدخال أحدث معدات الإطارات الأوروبية لتحسين جودة الخدمة.',
      en: 'Expansion of the original shop and introduction of the latest European tyre equipment to improve service quality.',
    },
    image: '/timeline-1975.jpg',
  },
  {
    year: 1985,
    title: { ar: 'الفرع الثاني', en: 'Second Branch' },
    description: {
      ar: 'الطلب المتزايد من العملاء أدى إلى افتتاح الفرع الثاني في شمال المدينة، ليصبح الأول في المنطقة.',
      en: 'Growing customer demand led to opening the second branch in the north of the city, becoming the first in the region.',
    },
    image: '/timeline-1985.jpg',
  },
  {
    year: 1995,
    title: { ar: 'مواكبة التكنولوجيا', en: 'Embracing Technology' },
    description: {
      ar: 'دخول عصر التكنولوجيا الحديثة مع أجهزة ضبط الزوايا الإلكترونية وأنظمة التوازن الرقمية.',
      en: 'Entering the modern technology era with electronic alignment systems and digital wheel balancing equipment.',
    },
    image: 'https://images.unsplash.com/photo-1632823471683-12d7c58ed074?w=800&q=80',
  },
  {
    year: 2005,
    title: { ar: 'الفرع الثالث', en: 'Third Branch' },
    description: {
      ar: 'افتتاح فرع الجنوب المتخصص في خدمة المركبات الثقيلة والشركات، ليكتمل المثلث الخدمي.',
      en: 'Opening of the South Branch specializing in heavy vehicles and commercial services, completing the service triangle.',
    },
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
  },
  {
    year: 2015,
    title: { ar: 'خدمات متقدمة', en: 'Advanced Services' },
    description: {
      ar: 'إضافة خدمات حماية الطلاء PPF والطلاء السيراميكي والتلميع الاحترافي في فرع الشمال.',
      en: 'Addition of PPF paint protection, ceramic coating and professional detailing services at the North Branch.',
    },
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
  },
  {
    year: 2024,
    title: { ar: 'الاستمرار بثقة', en: 'Continuing with Confidence' },
    description: {
      ar: 'أكثر من ٥٥ عاماً من الخدمة المتميزة، ونحن نواصل مسيرتنا بنفس الالتزام والإتقان.',
      en: 'Over 55 years of distinguished service, and we continue our journey with the same commitment and excellence.',
    },
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  },
]

export function getShopById(id: number): Shop | undefined {
  return shops.find((s) => s.id === id)
}
