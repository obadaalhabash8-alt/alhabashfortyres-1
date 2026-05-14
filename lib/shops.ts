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
      ar: 'استراد درعا القديم، سبينة',
      en: 'Old Daraa Highway, Sbeneh',
    },
    city: {
      ar: 'ريف دمشق',
      en: 'Rural Damascus',
    },
    phones: ['+963959943048', '+963980062144'],
    whatsapps: ['+963959943048', '+963980062144'],
    mapUrl: 'https://maps.google.com/?q=33.467222,36.284194',
    mapEmbed:
      'https://maps.google.com/maps?q=33.467222,36.284194&output=embed',
    coverImage: '/branch1.jpg',
    description: {
      ar: 'الفرع الأصلي والرئيسي لشركة الحبش للإطارات، تأسس عام ١٩٦٧ ليكون الأول في تقديم خدمات الإطارات الاحترافية في المنطقة. نفخر بأكثر من ٥٥ عاماً من الخبرة والثقة، مع فريق متخصص يضم أمهر الفنيين وأحدث المعدات. يتميز الفرع بتغيير الإطارات لجميع أنواع السيارات، ويوفر أحدث تقنيات التلميع الاحترافي إلى جانب الخدمات الأساسية للإطارات. كما يضم مركزاً متكاملاً للعناية بالسيارات يضاهي أعلى المعايير، يشمل الغسيل الخارجي والتنظيف الداخلي الشامل، لتخرج سيارتك بمظهر مميز وأداء موثوق.',
      en: 'The original flagship branch of Al-Habash Tyres, established in 1967 as the first professional tyre service in the area. With over 55 years of expertise and trust, our team of skilled technicians and state-of-the-art equipment ensures top-quality results. The branch specializes in tyre replacement for all vehicle types, and provides the latest professional polishing technologies alongside essential tyre services. It also houses a full-service car care center that meets the highest standards, offering exterior washing and thorough interior cleaning — so your car leaves looking its best and running reliably.',
    },
    sharedServices: [
      { ar: 'تغيير الإطارات', en: 'Tyre change' },
      { ar: 'فحص زوايا العجلات', en: 'Wheel alignment check' },
      { ar: 'دوزان إلكتروني للعجلات', en: 'Electronic wheel balancing' },
      { ar: 'تغيير الزيت', en: 'Oil change' },
      { ar: 'تغيير الفلاتر', en: 'Filter change' },
      { ar: 'تعبئة غاز المكيف', en: 'AC gas refill' },
      { ar: 'فحص كمبيوتر السيارة', en: 'Computer diagnostics' },
      { ar: 'تنظيف البخاخات', en: 'Injector cleaning' },
      { ar: 'ميكانيك دوزان', en: 'Mechanic alignment' },
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
      ar: 'سبينة، استراد درعا القديم',
      en: 'Sbeneh, Old Daraa Highway',
    },
    city: {
      ar: 'ريف دمشق',
      en: 'Rural Damascus',
    },
    phones: ['+963946355611', '+963933336001'],
    whatsapps: ['+963946355611', '+963933336001'],
    mapUrl: 'https://maps.app.goo.gl/ct7gyqp2jVqJA9iU9',
    mapEmbed:
      'https://maps.google.com/maps?q=F739%2BG82+Sbeneh+Syria&output=embed',
    coverImage: '/branch2.jpg',
    description: {
      ar: 'الفرع الثاني مركز متخصص في الصيانة الشاملة للسيارات والإطارات. يتميز بتقديم خدمات متكاملة تبدأ من تغيير الإطارات والدوزان الإلكتروني، وصولاً إلى الصيانة الميكانيكية وفحص الكمبيوتر وتنظيف البخاخات وتغيير الزيت والفلاتر. وجهتك الأولى لكل ما تحتاجه سيارتك تحت سقف واحد، بأيدٍ خبيرة وخدمة تستحقها.',
      en: 'The Second Branch is a specialized center for comprehensive car and tyre maintenance. It stands out for offering complete services — from tyre replacement and electronic wheel balancing, to mechanical repairs, computer diagnostics, injector cleaning, oil and filter changes. Your one-stop destination for everything your car needs, handled by experienced hands.',
    },
    sharedServices: [
      { ar: 'تغيير الإطارات', en: 'Tyre change' },
      { ar: 'فحص زوايا العجلات', en: 'Wheel alignment check' },
      { ar: 'دوزان إلكتروني للعجلات', en: 'Electronic wheel balancing' },
      { ar: 'تغيير الزيت', en: 'Oil change' },
      { ar: 'تغيير الفلاتر', en: 'Filter change' },
      { ar: 'تعبئة غاز المكيف', en: 'AC gas refill' },
      { ar: 'فحص كمبيوتر السيارة', en: 'Computer diagnostics' },
      { ar: 'تنظيف البخاخات', en: 'Injector cleaning' },
      { ar: 'ميكانيك دوزان', en: 'Mechanic alignment' },
    ],
    uniqueServices: [
      { ar: 'خدمة الفرامل والبطاريات', en: 'Brakes & battery service' },
      { ar: 'فحص ضغط الإطارات مجاناً', en: 'Free tyre pressure check' },
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
      ar: 'سبينة، استراد درعا الجديد',
      en: 'Sbeneh, New Daraa Highway',
    },
    city: {
      ar: 'ريف دمشق',
      en: 'Rural Damascus',
    },
    phones: ['+963930106667', '+963943635316'],
    whatsapps: ['+963930106667', '+963943635316'],
    mapUrl: 'https://maps.app.goo.gl/QJpksZhxpXFbiFeo8',
    mapEmbed:
      'https://maps.google.com/maps?q=33.465083,36.277500&output=embed',
    coverImage: '/branch3.jpg',
    description: {
      ar: 'الفرع الثالث هو الخيار الأول بأسعار منافسة لأصحاب المركبات الثقيلة والشركات التجارية. نوفر مخزوناً ضخماً من إطارات الشاحنات والمعدات الزراعية والإطارات الصناعية، إلى جانب تغيير الإطارات لجميع أنواعها، مع فريق متخصص يعمل على مدار الساعة لتلبية احتياجات الأسطول التجاري.',
      en: 'The Third Branch is the first choice at competitive prices for heavy vehicle owners and commercial companies. We stock a massive inventory of truck, agricultural, and industrial tyres, alongside tyre replacement for all vehicle types, with a specialized team operating around the clock to meet every commercial fleet need.',
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
    title: { ar: 'البداية والتأسيس', en: 'The Founding' },
    description: {
      ar: 'بدأت القصة حين أسس رضوان أبو سمير الحبش محلاً صغيراً برؤية طموحة، ليكون انطلاقة لرحلة طويلة من الشغف والإتقان.',
      en: 'The story began when Radwan Abu Samir Al-Habash founded a small shop with an ambitious vision, starting a long journey of passion and excellence.',
    },
    image: '/timeline-1967.jpg',
  },
  {
    year: 1985,
    title: { ar: 'النمو والتوسع', en: 'Growth & Expansion' },
    description: {
      ar: 'توسعت شركتنا من محل واحد لتصبح من الأسماء المعروفة في مجال الإطارات وخدمات السيارات في سوريا.',
      en: 'Our company expanded from a single shop to become a well-known name in the tyres and car services sector in Syria.',
    },
    image: '/timeline-1985.jpg',
  },
  {
    year: 1995,
    title: { ar: 'ترسيخ الثقة', en: 'Solidifying Trust' },
    description: {
      ar: 'تميزنا بالتزام دائم بالجودة، والأمانة، وتقديم أفضل الحلول للعملاء، مما عزز مكانتنا في السوق.',
      en: 'We distinguished ourselves with a constant commitment to quality, honesty, and providing the best solutions to our customers, strengthening our market position.',
    },
    image: '/timeline-1995.jpg',
  },
  {
    year: 2007,
    title: { ar: 'وكالة ميشلان الرسمية', en: 'Official Michelin Dealer' },
    description: {
      ar: 'خطوة مفصلية؛ أصبحت الشركة الوكيل الرسمي لإطارات Michelin في سوريا، لترسخ ثقة العملاء في جميع المحافظات.',
      en: 'A milestone step; the company became the official Michelin tyres dealer in Syria, solidifying customer trust across all governorates.',
    },
    image: '/timeline-2007.png',
  },
  {
    year: 2015,
    title: { ar: 'تكامل الخدمات', en: 'Integrated Services' },
    description: {
      ar: 'توفير إطارات الشحن والسيارات بأنواعها عبر ثلاثة فروع متكاملة ومراكز متخصصة تلبي كافة الاحتياجات.',
      en: 'Providing truck and car tyres of all kinds through three integrated branches and specialized centers that meet all needs.',
    },
    image: '/timeline-2015.jpg',
  },
  {
    year: 2024,
    title: { ar: 'تأدية الأمانة', en: 'Continuing the Legacy' },
    description: {
      ar: 'نخدم اليوم مختلف أنحاء سوريا، ونقدم خدمات متكاملة بأعلى مستويات الأداء، والسلامة، والاحترافية.',
      en: 'Today, we serve all parts of Syria, offering integrated services with the highest levels of performance, safety, and professionalism.',
    },
    image: '/timeline-2024.jpg',
  },
]

export function getShopById(id: number): Shop | undefined {
  return shops.find((s) => s.id === id)
}
