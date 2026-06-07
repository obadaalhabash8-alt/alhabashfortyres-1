import type { Shop, TimelineEvent } from '@/types'

export const shops: Shop[] = [
  {
    id: 1,
    name: {
      ar: 'مركز الاوتستراد درعا القديم',
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
      ar: 'اتستراد درعا الجديد مفرق بور سعيد',
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
    phones: ['+963930106667', '+963943635316'],
    whatsapps: ['+963930106667', '+963943635316'],
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
      ar: 'استراد درعا الجديد مدخل داريا',
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
    phones: ['+963946355611', '+963933336001'],
    whatsapps: ['+963946355611', '+963933336001'],
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
    title: { ar: 'التأسيس والانطلاق الأولي', en: 'Founding & First Launch' },
    description: {
      ar: 'بدأت شركة إطارات الحباش مسيرتها المهنية كمؤسسة تجارية طموحة بافتتاح أول منشأة رئيسية لها على الطريق السريع الدولي الاستراتيجي الذي يربط دمشق بالمملكة الأردنية الهاشمية، مما مكنها من الاستفادة مباشرة من حركة النقل العابرة للحدود ذات الحجم الكبير وخدمات لوجستيات الشحن البري.',
      en: 'Al-Habash Tyres launched its professional journey as an ambitious commercial enterprise by opening its first main facility on the strategic international highway linking Damascus to the Hashemite Kingdom of Jordan, enabling it to directly benefit from high-volume cross-border transport and land freight logistics.',
    },
    image: '/timeline-1967.jpg',
  },
  {
    year: 1970,
    title: { ar: 'التوسع في تجارة التجزئة المحلية', en: 'Local Retail Expansion' },
    description: {
      ar: 'مدفوعة بالنمو السريع للأعمال، نفذت الشركة مرحلة التوسع المحلية الأولى من خلال إنشاء فرع ثانٍ في وسط دمشق، مصمم لتلبية الطلب الحضري المتزايد على إطارات السيارات الخاصة والمركبات التجارية الخفيفة.',
      en: 'Driven by rapid business growth, the company executed its first domestic expansion by establishing a second branch in central Damascus, designed to meet the growing urban demand for private car tyres and light commercial vehicles.',
    },
  },
  {
    year: 1973,
    title: { ar: 'الدخول في المشتريات العامة والمناقصات السيادية', en: 'Entry into Public Procurement' },
    description: {
      ar: 'اندمجت شركة الحباش بقوة في المشتريات العامة، وحصلت على عقود توريد استراتيجية طويلة الأجل وشاركت في المناقصات الحكومية الكبرى للهيئات الوطنية للنقل والموانئ البحرية وأساطيل النقل العام خلال فترة من الاستقرار الاقتصادي والسياسي الوطني.',
      en: 'Al-Habash strongly integrated into public procurement, securing long-term strategic supply contracts and participating in major government tenders for national transport authorities, seaports, and public transit fleets during a period of national economic and political stability.',
    },
  },
  {
    year: 1995,
    yearLabel: '1995 – 2006',
    title: { ar: 'حقبة الشراكة مع بريدجستون', en: 'The Bridgestone Partnership Era' },
    description: {
      ar: 'أقامت الشركة تحالفاً قوياً مع بريدجستون (اليابان)، وتطورت بسرعة لتصبح القوة التوزيعية المهيمنة داخل سوريا. حققت شركة الحباش حجم مبيعات غير مسبوق في جميع أنحاء البلاد، لا سيما في قطاعي الشاحنات الثقيلة والحافلات ذات الإطارات الراديالية (TBR) وقطاعات التعدين والهندسة ذات الأحمال العالية خارج الطرق المعبدة (OTR).',
      en: 'The company forged a powerful alliance with Bridgestone (Japan), rapidly evolving to become the dominant distribution force within Syria. Al-Habash achieved unprecedented sales volumes across the country, particularly in heavy truck and bus radial tyre (TBR) sectors and high-load off-road (OTR) mining and engineering segments.',
    },
    image: '/timeline-1995.jpg',
  },
  {
    year: 2009,
    yearLabel: '2009 – 2018',
    title: { ar: 'الاندماج مع مجموعة ميشلان', en: 'Integration with Michelin Group' },
    description: {
      ar: 'أقامت الشركة اتصالاً مؤسسياً مباشراً مع مجموعة ميشلان في فرنسا ودبي، وبلغ ذلك ذروته بإبرام اتفاقية توزيع رسمية. حققت العلامة التجارية اختراقاً سريعاً للسوق وموقعاً متميزاً قبل أن يتم تعليق العمليات بشكل إلزامي في عام 2011 بسبب اندلاع الصراع المحلي والعقوبات التجارية الدولية.',
      en: 'The company established direct institutional contact with Michelin Group in France and Dubai, culminating in a formal distribution agreement. The brand achieved rapid market penetration and a distinguished position before operations were mandatorily suspended in 2011 due to the outbreak of domestic conflict and international trade sanctions.',
    },
  },
  {
    year: 2011,
    title: { ar: 'الشراكة المستقلة مع BFGoodrich', en: 'Independent BFGoodrich Partnership' },
    description: {
      ar: 'نجحت شركة الحباش في إقامة وترسيخ شراكة تجارية مباشرة وطويلة الأمد مع الشركة المصنعة الأمريكية BFGoodrich كعلامة تجارية مستقلة وقوية في السوق السورية. شكّل هذا التحالف الاستراتيجي ركيزة أساسية لنجاح الشركة، حيث استجاب لمتطلبات السوق الصعبة بجودة وهندسة أمريكية موثوقة باستمرار حتى عام 2011.',
      en: 'Al-Habash successfully established and consolidated a direct, long-term commercial partnership with the American manufacturer BFGoodrich as an independent and powerful brand in the Syrian market. This strategic alliance was a cornerstone of the company\'s success, consistently meeting demanding market requirements with reliable American quality and engineering until 2011.',
    },
  },
  {
    year: 2015,
    title: { ar: 'المرونة التشغيلية وإدارة الأزمات', en: 'Operational Resilience & Crisis Management' },
    description: {
      ar: 'استجابة للتغيرات الجيوسياسية المعقدة، نقلت الشركة عملياتها الإدارية مؤقتًا إلى مرسين، تركيا. أظهرت شركة الحباش مرونة استثنائية من خلال إدارة سلاسل التوريد المعقدة لتوجيه شحنات ميشلان عبر ميناء إسكندرون إلى شمال سوريا. حافظ هذا الممر النشط على استمرارية السوق لمدة عام ونصف قبل أن يتوقف بسبب تغير الأطر التنظيمية الدولية.',
      en: 'In response to complex geopolitical changes, the company temporarily relocated its administrative operations to Mersin, Turkey. Al-Habash demonstrated exceptional resilience by managing complex supply chains to route Michelin shipments through the port of Iskenderun into northern Syria. This active corridor maintained market continuity for a year and a half before halting due to shifting international regulatory frameworks.',
    },
    image: '/timeline-2015.jpg',
  },
  {
    year: 2025,
    yearLabel: '2025 – 2026',
    title: { ar: 'التوحيد الكامل واستعادة السيادة', en: 'Full Consolidation & Sovereignty Restored' },
    description: {
      ar: 'في أعقاب الاستقرار على الصعيد الوطني، والانتعاش الاقتصادي، وسن إصلاحات تنظيمية جديدة تسمح بالاستيراد المباشر لجميع أنواع المركبات الخاصة والسيارات التجارية والصناعية، اتخذت الإدارة التنفيذية القرار الاستراتيجي النهائي بإعادة جميع القوى العاملة الفنية والمقر الإداري وقاعدة الأصول بالكامل إلى دمشق.',
      en: 'Following national stabilization, economic recovery, and the enactment of new regulatory reforms permitting direct import of all private, commercial, and industrial vehicles, executive management made the definitive strategic decision to return all technical workforce, administrative headquarters, and the full asset base to Damascus.',
    },
  },
  {
    year: 2026,
    title: { ar: 'الوضع الحالي', en: 'Current Status' },
    description: {
      ar: 'اليوم، تمتلك شركة إطارات الحباش بنية تحتية هائلة ترتكز على مركز لوجستي مركزي ضخم ومرافق تخزين حديثة. تعمل الشركة بجاهزية هيكلية كاملة وبدعم من فريق خبير يضم أكثر من 120 متخصصاً (بما في ذلك المديرين التنفيذيين وكبار الفنيين المعتمدين دولياً في ألمانيا وتركيا)، وتقوم بإعادة فتح جميع مراكز التوزيع التاريخية في جميع محافظات سوريا بشكل نشط، مما يعزز إرثها باعتبارها الرائد المطلق والموثوق به في مجال حلول الإطارات الفاخرة.',
      en: 'Today, Al-Habash Tyres possesses a vast infrastructure anchored by a massive central logistics hub and modern storage facilities. Operating with full structural readiness and supported by an expert team of over 120 specialists — including executive directors and senior internationally certified technicians trained in Germany and Turkey — the company is actively reopening all its historic distribution centers across all Syrian governorates, reinforcing its legacy as the absolute and trusted leader in premium tyre solutions.',
    },
  },
]

export function getShopById(id: number): Shop | undefined {
  return shops.find((s) => s.id === id)
}
