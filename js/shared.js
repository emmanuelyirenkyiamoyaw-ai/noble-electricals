/* ============================================================
   Noble Electricals - Shared Components, Data, and Utilities
   ============================================================ */

const SUPABASE_URL = 'https://aukkmeakwofvgzzvqxej.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1a2ttZWFrd29mdmd6enZxeGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDIxNzksImV4cCI6MjA5Mzk3ODE3OX0.00fa_JLFxEcmWbBMsSp0qvhPb1iYcdiHyO_GEEfOY7g';

const IS_SUBPAGE = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/admin/');
const ROOT = IS_SUBPAGE ? '../' : '';

const DEFAULT_FIXED_IMAGES = {
  homeAboutMain: 'logo.png',
  homeAboutAccent: 'logo.png',
  homeWhyImage: 'logo.png',
  aboutStoryMain: 'logo.png',
  aboutStoryAccent: 'logo.png'
};

const SITE_SYNC_KEY = 'ne_sync_signal_v1';

const DEFAULT_SITE_SETTINGS = {
  heroHeadline: 'Powering Homes.<br><span>Building</span><br>Futures.',
  heroSubtext: 'Noble Electricals and Estates Developers delivers reliable electrical solutions and quality estate development services across Accra and surrounding areas.',
  heroBtn1: 'Call Now',
  heroBtn1Link: 'tel:0551897182',
  heroBtn2: 'Get Free Quote',
  heroBtn2Link: `${ROOT}pages/contact.html`,
  aboutTitle: 'Delivering Excellence in Electrical Engineering & Property Development',
  aboutText: 'Noble Electricals and Estates Developers is a professional electrical engineering and property development company committed to delivering reliable electrical solutions and quality estate development services across Accra and surrounding areas.',
  aboutStat1: '500+',
  aboutStat1Label: 'Projects',
  aboutYears: '10+',
  aboutSatisfaction: '98%',
  aboutClients: '200+',
  footerCreditText: 'Created and developed by Galaxy Studio',
  footerCreditLink: 'https://galaxystudio.site',
  siteImages: { ...DEFAULT_FIXED_IMAGES },
  teamMembers: [
    {
      id: 1,
      name: 'Osman Bilad',
      role: 'Founder & Lead Electrician',
      bio: '10+ years of experience in residential, commercial, and industrial electrical installations across Accra.',
      image_url: '',
      icon: 'fa-hard-hat'
    },
    {
      id: 2,
      name: 'Senior Technician',
      role: 'Solar & Renewables Specialist',
      bio: 'Certified solar panel installation expert with hands-on experience in both on-grid and off-grid systems.',
      image_url: '',
      icon: 'fa-hard-hat'
    },
    {
      id: 3,
      name: 'Field Technician',
      role: 'Fault Finding & Repairs',
      bio: 'Specialist in rapid fault diagnosis and precision repairs across residential and commercial properties.',
      image_url: '',
      icon: 'fa-hard-hat'
    }
  ]
};

const DEFAULT_BRANDING = {
  name: 'Noble Electricals and Estates Developers',
  tag: 'Powering Homes. Building Futures.',
  color: '#FFC107',
  logo: 'logo.png'
};

const DEFAULT_CONTACT_INFO = {
  ci1: '055 189 7182',
  ci2: '020 250 6436',
  ciEmail: 'osmanbilad8@gmail.com',
  ciWa: '233551897182',
  ciArea: 'Accra & Surroundings',
  ciHr1: '7:00 AM - 6:00 PM',
  ciHr2: '8:00 AM - 4:00 PM',
  ciHr3: 'Emergency Only',
  ciFb: '',
  ciIg: ''
};

const DEFAULT_FEATURE_FLAGS = {
  whatsappFloat: true,
  scrollAnimations: true,
  contactForm: true
};

const DEFAULT_SERVICES = [
  { id: 1, icon: 'fa-bolt', name: 'Electrical Installations (Residential & Commercial)', description: 'Reliable electrical installations for homes, offices, shops, and commercial properties.', status: true, sort_order: 1, show_on_homepage: true },
  { id: 2, icon: 'fa-screwdriver-wrench', name: 'Electrical Repairs & Maintenance', description: 'Prompt repairs and routine maintenance to keep electrical systems safe and efficient.', status: true, sort_order: 2, show_on_homepage: true },
  { id: 3, icon: 'fa-plug-circle-bolt', name: 'Wiring & Rewiring', description: 'Professional wiring and rewiring services for new buildings, upgrades, and renovations.', status: true, sort_order: 3, show_on_homepage: true },
  { id: 4, icon: 'fa-lightbulb', name: 'Lighting Design & Installation', description: 'Functional and attractive lighting solutions for residential and commercial spaces.', status: true, sort_order: 4, show_on_homepage: true },
  { id: 5, icon: 'fa-shield-halved', name: 'Electrical Safety Inspections', description: 'Detailed inspections to help ensure safety, compliance, and peace of mind.', status: true, sort_order: 5, show_on_homepage: true },
  { id: 6, icon: 'fa-house', name: 'House Wiring', description: 'Safe and neat house wiring carried out with quality workmanship.', status: true, sort_order: 6, show_on_homepage: true },
  { id: 7, icon: 'fa-solar-panel', name: 'Solar Installations', description: 'Solar installation services designed to support dependable power solutions.', status: true, sort_order: 7, show_on_homepage: false },
  { id: 8, icon: 'fa-magnifying-glass', name: 'Fault Finding & Repairs', description: 'Fast fault finding and effective repairs for residential and commercial systems.', status: true, sort_order: 8, show_on_homepage: false },
  { id: 9, icon: 'fa-wrench', name: 'Lighting & Maintenance', description: 'Ongoing lighting support and maintenance services for homes and businesses.', status: true, sort_order: 9, show_on_homepage: false },
  { id: 10, icon: 'fa-map-location-dot', name: 'Land Sale', description: 'Land sale services to support property ownership and development goals.', status: true, sort_order: 10, show_on_homepage: false },
  { id: 11, icon: 'fa-road', name: 'Land Sales & Development', description: 'Land sales and development support for residential and commercial projects.', status: true, sort_order: 11, show_on_homepage: false },
  { id: 12, icon: 'fa-building', name: 'Building & Construction', description: 'Construction support and property development services delivered with professionalism.', status: true, sort_order: 12, show_on_homepage: false },
  { id: 13, icon: 'fa-file-signature', name: 'Land Registration Assistance', description: 'Guidance and assistance with land registration and documentation processes.', status: true, sort_order: 13, show_on_homepage: false },
  { id: 14, icon: 'fa-ruler-combined', name: 'Professional Land Survey', description: 'Professional land survey services to support planning, ownership, and development.', status: true, sort_order: 14, show_on_homepage: false }
];

const SERVICE_ICON_CHOICES = [
  { name: 'Bolt', icon: 'fa-bolt' },
  { name: 'Plug', icon: 'fa-plug-circle-bolt' },
  { name: 'Wrench', icon: 'fa-screwdriver-wrench' },
  { name: 'Lightbulb', icon: 'fa-lightbulb' },
  { name: 'Shield', icon: 'fa-shield-halved' },
  { name: 'House', icon: 'fa-house' },
  { name: 'Solar Panel', icon: 'fa-solar-panel' },
  { name: 'Search', icon: 'fa-magnifying-glass' },
  { name: 'Tools', icon: 'fa-tools' },
  { name: 'Cable', icon: 'fa-network-wired' },
  { name: 'Building', icon: 'fa-building' },
  { name: 'Road', icon: 'fa-road' },
  { name: 'Map Pin', icon: 'fa-map-location-dot' },
  { name: 'Document', icon: 'fa-file-signature' },
  { name: 'Ruler', icon: 'fa-ruler-combined' },
  { name: 'Tower', icon: 'fa-broadcast-tower' }
];

const DEFAULT_GALLERY = [
  { id: 1, title: 'Complete House Rewiring', cat: 'wiring', cat_label: 'House Wiring', location: 'East Legon, Accra', img_url: 'logo.png' },
  { id: 2, title: 'Solar Panel Installation', cat: 'solar', cat_label: 'Solar', location: 'Tema, Greater Accra', img_url: 'logo.png' },
  { id: 3, title: 'Commercial Lighting Fit-Out', cat: 'lighting', cat_label: 'Lighting', location: 'Airport Hills, Accra', img_url: 'logo.png' },
  { id: 4, title: 'Office Electrical Fit-Out', cat: 'commercial', cat_label: 'Commercial', location: 'Osu, Accra', img_url: 'logo.png' }
];

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: 'Kwame Asante', role: 'Homeowner, East Legon', review: 'Noble Electricals rewired my entire house perfectly. Neat, professional, and ahead of schedule.', stars: 5, active: true },
  { id: 2, name: 'Abena Mensah', role: 'Business Owner, Osu', review: 'They responded quickly to a major fault in my shop and fixed it completely.', stars: 5, active: true },
  { id: 3, name: 'Kofi Boateng', role: 'Homeowner, Tema', review: 'Installed a complete solar system with great after-service support. Excellent work.', stars: 5, active: true }
];

const SERVICE_META = {
  'Electrical Installations (Residential & Commercial)': {
    slug: 'electrical-installations',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format',
    bullets: ['Residential installations', 'Commercial installations', 'New project setup', 'System expansion works', 'Safe installation practices', 'Quality workmanship']
  },
  'Electrical Repairs & Maintenance': {
    slug: 'electrical-repairs-maintenance',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1621905251918-b7a3b3e24b5c?w=800&q=80&auto=format',
    bullets: ['Electrical fault repairs', 'Routine maintenance visits', 'System performance checks', 'Preventive servicing', 'Safety-focused workmanship', 'Reliable support']
  },
  'Wiring & Rewiring': {
    slug: 'wiring-rewiring',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format',
    bullets: ['New wiring installations', 'Full rewiring projects', 'Renovation support', 'Cable routing and fitting', 'Safe electrical layout', 'Neat finishing']
  },
  'Lighting Design & Installation': {
    slug: 'lighting-design-installation',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80&auto=format',
    bullets: ['Lighting layout planning', 'Indoor lighting installation', 'Outdoor lighting installation', 'Decorative and task lighting', 'Energy-conscious solutions', 'Professional setup']
  },
  'Electrical Safety Inspections': {
    slug: 'electrical-safety-inspections',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800&q=80&auto=format',
    bullets: ['Electrical system checks', 'Safety assessments', 'Risk identification', 'Inspection reporting', 'Property compliance support', 'Customer peace of mind']
  },
  'House Wiring': {
    slug: 'wiring',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format',
    bullets: ['Residential house wiring', 'New build wiring', 'Renovation wiring support', 'Socket and switch fitting', 'Safe cable installations', 'Quality finishing']
  },
  'Solar Installations': {
    slug: 'solar',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&auto=format',
    bullets: ['Solar panel installations', 'Solar power support', 'Residential solar setup', 'Commercial solar setup', 'Reliable energy solutions', 'Professional service delivery']
  },
  'Fault Finding & Repairs': {
    slug: 'faults',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1621905251918-b7a3b3e24b5c?w=800&q=80&auto=format',
    bullets: ['Fault diagnosis', 'Electrical troubleshooting', 'Repair of damaged points', 'Residential repairs', 'Commercial repairs', 'Reliable restoration']
  },
  'Lighting & Maintenance': {
    slug: 'lighting',
    tag: 'Electrical Services',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80&auto=format',
    bullets: ['Lighting maintenance', 'Fixture support', 'Routine servicing', 'Home lighting upkeep', 'Commercial lighting upkeep', 'Reliable maintenance response']
  },
  'Land Sale': {
    slug: 'land-sale',
    tag: 'Estate & Property Development Services',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format',
    bullets: ['Land sale support', 'Property acquisition guidance', 'Site selection assistance', 'Development-ready options', 'Professional handling', 'Client-focused service']
  },
  'Land Sales & Development': {
    slug: 'land-sales-development',
    tag: 'Estate & Property Development Services',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&auto=format',
    bullets: ['Land sales guidance', 'Land development support', 'Residential project support', 'Commercial project support', 'Site preparation coordination', 'Reliable advisory service']
  },
  'Building & Construction': {
    slug: 'building-construction',
    tag: 'Estate & Property Development Services',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format',
    bullets: ['Construction support', 'Building development coordination', 'Project planning support', 'Residential development works', 'Commercial development works', 'Quality-focused delivery']
  },
  'Land Registration Assistance': {
    slug: 'land-registration-assistance',
    tag: 'Estate & Property Development Services',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format',
    bullets: ['Land document guidance', 'Registration process support', 'Ownership paperwork assistance', 'Property documentation help', 'Professional coordination', 'Reliable customer support']
  },
  'Professional Land Survey': {
    slug: 'professional-land-survey',
    tag: 'Estate & Property Development Services',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80&auto=format',
    bullets: ['Land measurement services', 'Boundary identification', 'Site planning support', 'Survey coordination', 'Development preparation', 'Professional reporting']
  }
};

const LocalStore = {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(`ne_${key}`);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(`ne_${key}`, JSON.stringify(value));
    } catch {}
  },
  del(key) {
    try {
      localStorage.removeItem(`ne_${key}`);
    } catch {}
  }
};

function parseSetting(value, fallback = null) {
  if (value == null) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function stringifySetting(value) {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeService(service, index = 0) {
  if (!service) return null;
  return {
    id: service.id ?? Date.now() + index,
    icon: service.icon || 'fa-bolt',
    icon_label: service.icon_label || service.iconLabel || '',
    name: service.name || `Service ${index + 1}`,
    description: service.description ?? service.desc ?? '',
    status: service.status !== false,
    sort_order: Number(service.sort_order ?? service.sortOrder ?? index + 1) || index + 1,
    image_url: service.image_url ?? service.imageUrl ?? service.image ?? '',
    show_on_homepage: service.show_on_homepage ?? service.showOnHomepage ?? index < 6
  };
}

function normalizeTeamMember(member, index = 0) {
  if (!member) return null;
  return {
    id: member.id ?? Date.now() + index,
    name: member.name || `Team Member ${index + 1}`,
    role: member.role || 'Team Member',
    bio: member.bio || member.description || '',
    image_url: member.image_url ?? member.imageUrl ?? member.image ?? '',
    icon: member.icon || 'fa-hard-hat'
  };
}

function dedupeServices(services = []) {
  const seen = new Set();
  return services.filter((service) => {
    const key = slugify(service.name || service.id || '');
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeGalleryItem(item, index = 0) {
  if (!item) return null;
  const imgUrl = item.img_url ?? item.img ?? item.image ?? '';
  return {
    id: item.id ?? Date.now() + index,
    title: item.title || `Project ${index + 1}`,
    cat: item.cat || 'general',
    cat_label: item.cat_label ?? item.catLabel ?? item.cat ?? 'Project',
    location: item.location || '',
    img_url: imgUrl
  };
}

function normalizeTestimonial(item, index = 0) {
  if (!item) return null;
  return {
    id: item.id ?? Date.now() + index,
    name: item.name || `Client ${index + 1}`,
    role: item.role || '',
    review: item.review ?? item.text ?? '',
    stars: Number(item.stars || 5) || 5,
    active: item.active !== false
  };
}

function resolveAssetPath(path) {
  if (!path) return '';
  if (/^(data:|https?:|blob:|file:)/i.test(path)) return path;
  return `${ROOT}${String(path).replace(/^(\.\/|\/)+/, '')}`;
}

function getSiteLogoSrc() {
  return resolveAssetPath(NobleSite?.state?.branding?.logo || DEFAULT_BRANDING.logo);
}

function handleImageFallback(image) {
  if (!image) return;
  const logoSrc = getSiteLogoSrc();
  if (!logoSrc) return;
  image.onerror = null;
  image.src = logoSrc;
}

function getManagedImageMarkup(src, alt, extra = '') {
  const finalSrc = resolveAssetPath(src || NobleSite?.state?.branding?.logo || DEFAULT_BRANDING.logo);
  const extraAttrs = extra ? ` ${extra}` : '';
  return `<img src="${finalSrc}" alt="${alt}" loading="lazy" onerror="handleImageFallback(this)"${extraAttrs}>`;
}

function setManagedImageSource(image, src) {
  if (!image) return;
  image.onerror = () => handleImageFallback(image);
  image.src = resolveAssetPath(src || NobleSite?.state?.branding?.logo || DEFAULT_BRANDING.logo);
}

function broadcastSiteStateChange(reason = 'update') {
  try {
    localStorage.setItem(SITE_SYNC_KEY, JSON.stringify({ reason, at: Date.now() }));
  } catch {}
}

const Supabase = {
  get enabled() {
    return Boolean(SUPABASE_URL && SUPABASE_ANON);
  },

  headers(extra = {}) {
    return {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      ...extra
    };
  },

  async request(path, options = {}) {
    if (!this.enabled) throw new Error('Supabase is not configured.');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      cache: 'no-store',
      ...options,
      headers: this.headers(options.headers || {})
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Supabase request failed with status ${response.status}`);
    }

    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  async select(table, query = '*') {
    return this.request(`${table}?select=${query}`);
  },

  async insert(table, rows) {
    return this.request(table, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(Array.isArray(rows) ? rows : [rows])
    });
  },

  async update(table, matchQuery, payload) {
    return this.request(`${table}?${matchQuery}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(payload)
    });
  },

  async remove(table, matchQuery) {
    return this.request(`${table}?${matchQuery}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=representation' }
    });
  },

  async upsert(table, rows, conflictKey) {
    return this.request(`${table}?on_conflict=${conflictKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(Array.isArray(rows) ? rows : [rows])
    });
  }
};

const NobleSite = {
  state: {
    siteSettings: clone(DEFAULT_SITE_SETTINGS),
    branding: clone(DEFAULT_BRANDING),
    contactInfo: clone(DEFAULT_CONTACT_INFO),
    featureFlags: clone(DEFAULT_FEATURE_FLAGS),
    services: clone(DEFAULT_SERVICES),
    gallery: clone(DEFAULT_GALLERY),
    testimonials: clone(DEFAULT_TESTIMONIALS),
    submissions: [],
    source: 'defaults',
    supabaseReady: false,
    missingTables: []
  },

  get defaultServices() {
    return clone(DEFAULT_SERVICES);
  },

  mergeDefaults() {
    this.state.siteSettings = { ...DEFAULT_SITE_SETTINGS, ...(this.state.siteSettings || {}) };
    this.state.siteSettings.siteImages = { ...DEFAULT_FIXED_IMAGES, ...(this.state.siteSettings.siteImages || {}) };
    this.state.siteSettings.teamMembers = (this.state.siteSettings.teamMembers || DEFAULT_SITE_SETTINGS.teamMembers).map(normalizeTeamMember).filter(Boolean);
    this.state.branding = { ...DEFAULT_BRANDING, ...(this.state.branding || {}) };
    this.state.contactInfo = { ...DEFAULT_CONTACT_INFO, ...(this.state.contactInfo || {}) };
    this.state.featureFlags = { ...DEFAULT_FEATURE_FLAGS, ...(this.state.featureFlags || {}) };
    this.state.services = dedupeServices((this.state.services || []).map(normalizeService).filter(Boolean));
    this.state.gallery = (this.state.gallery || []).map(normalizeGalleryItem).filter(Boolean);
    this.state.testimonials = (this.state.testimonials || []).map(normalizeTestimonial).filter(Boolean);
    if (!this.state.services.length) this.state.services = clone(DEFAULT_SERVICES);
    if (!this.state.gallery.length) this.state.gallery = clone(DEFAULT_GALLERY);
    if (!this.state.testimonials.length) this.state.testimonials = clone(DEFAULT_TESTIMONIALS);
    this.state.submissions = this.state.submissions || [];
  },

  hydrateLocalState() {
    const localState = {
      siteSettings: LocalStore.get('siteSettings', clone(DEFAULT_SITE_SETTINGS)),
      branding: LocalStore.get('branding', clone(DEFAULT_BRANDING)),
      logo: LocalStore.get('logo', ''),
      contactInfo: LocalStore.get('contactInfo', clone(DEFAULT_CONTACT_INFO)),
      featureFlags: LocalStore.get('featureFlags', clone(DEFAULT_FEATURE_FLAGS)),
      services: LocalStore.get('services', clone(DEFAULT_SERVICES)),
      gallery: LocalStore.get('gallery', clone(DEFAULT_GALLERY)),
      testimonials: LocalStore.get('testimonials', clone(DEFAULT_TESTIMONIALS)),
      submissions: LocalStore.get('submissions', [])
    };

    this.state = { ...this.state, ...localState, source: 'local', supabaseReady: false, missingTables: [] };
    if (localState.logo && !this.state.branding.logo) this.state.branding.logo = localState.logo;
    this.mergeDefaults();
    return this.state;
  },

  async loadState() {
    this.hydrateLocalState();

    if (!Supabase.enabled) return this.state;

    const fetchers = await Promise.allSettled([
      Supabase.select('site_settings', 'key,value'),
      Supabase.select('services', '*&order=sort_order.asc.nullslast,id.asc'),
      Supabase.select('gallery', '*&order=created_at.desc.nullslast,id.desc'),
      Supabase.select('testimonials', '*&order=created_at.desc.nullslast,id.desc'),
      Supabase.select('submissions', '*&order=created_at.desc.nullslast')
    ]);

    const missingTables = [];

    if (fetchers[0].status === 'fulfilled') {
      const settingsMap = {};
      for (const row of fetchers[0].value || []) settingsMap[row.key] = parseSetting(row.value);
      this.state.siteSettings = { ...DEFAULT_SITE_SETTINGS, ...(settingsMap.siteSettings || {}), ...extractFlatSettings(settingsMap) };
      this.state.branding = { ...DEFAULT_BRANDING, ...(settingsMap.branding || {}) };
      this.state.contactInfo = { ...DEFAULT_CONTACT_INFO, ...(settingsMap.contactInfo || {}) };
      this.state.featureFlags = { ...DEFAULT_FEATURE_FLAGS, ...(settingsMap.featureFlags || {}) };
      if (settingsMap.logo) this.state.branding.logo = settingsMap.logo;
      this.state.supabaseReady = true;
      this.state.source = 'supabase';
    } else {
      missingTables.push(extractTableName(fetchers[0].reason, 'site_settings'));
    }

    if (fetchers[1].status === 'fulfilled') {
      const services = (fetchers[1].value || []).map((item) => ({
        ...normalizeService(item)
      }));
      this.state.services = services.length ? services : clone(DEFAULT_SERVICES);
      this.state.supabaseReady = true;
      this.state.source = 'supabase';
    } else {
      missingTables.push(extractTableName(fetchers[1].reason, 'services'));
    }

    if (fetchers[2].status === 'fulfilled') {
      const gallery = (fetchers[2].value || []).map((item) => ({
        ...normalizeGalleryItem(item)
      }));
      this.state.gallery = gallery.length ? gallery : clone(DEFAULT_GALLERY);
      this.state.supabaseReady = true;
      this.state.source = 'supabase';
    } else {
      missingTables.push(extractTableName(fetchers[2].reason, 'gallery'));
    }

    if (fetchers[3].status === 'fulfilled') {
      const testimonials = (fetchers[3].value || []).map((item) => ({
        ...normalizeTestimonial(item)
      }));
      this.state.testimonials = testimonials.length ? testimonials : clone(DEFAULT_TESTIMONIALS);
      this.state.supabaseReady = true;
      this.state.source = 'supabase';
    } else {
      missingTables.push(extractTableName(fetchers[3].reason, 'testimonials'));
    }

    if (fetchers[4].status === 'fulfilled') {
      this.state.submissions = fetchers[4].value || [];
      this.state.supabaseReady = true;
      this.state.source = 'supabase';
    } else {
      this.state.submissions = LocalStore.get('submissions', []);
      missingTables.push(extractTableName(fetchers[4].reason, 'submissions'));
    }

    this.state.missingTables = [...new Set(missingTables.filter(Boolean))];
    this.persistState();
    this.mergeDefaults();
    return this.state;
  },

  persistState() {
    LocalStore.set('siteSettings', this.state.siteSettings);
    LocalStore.set('branding', this.state.branding);
    LocalStore.set('logo', this.state.branding.logo || '');
    LocalStore.set('contactInfo', this.state.contactInfo);
    LocalStore.set('featureFlags', this.state.featureFlags);
    LocalStore.set('services', this.state.services);
    LocalStore.set('gallery', this.state.gallery);
    LocalStore.set('testimonials', this.state.testimonials);
    LocalStore.set('submissions', this.state.submissions);
    broadcastSiteStateChange('persist');
  },

  async saveSetting(key, value) {
    if (key === 'siteSettings') this.state.siteSettings = { ...this.state.siteSettings, ...value };
    if (key === 'branding') this.state.branding = { ...this.state.branding, ...value };
    if (key === 'contactInfo') this.state.contactInfo = { ...this.state.contactInfo, ...value };
    if (key === 'featureFlags') this.state.featureFlags = { ...this.state.featureFlags, ...value };
    if (key === 'logo') this.state.branding.logo = value;
    this.persistState();

    try {
      await Supabase.upsert('site_settings', { key, value: stringifySetting(value) }, 'key');
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  },

  async replaceServices(services) {
    this.state.services = services.map((service, index) => normalizeService(service, index)).filter(Boolean);
    this.persistState();

    try {
      const remote = await Supabase.select('services', 'id');
      const ids = (remote || []).map((row) => row.id);
      if (ids.length) await Supabase.remove('services', `id=in.(${ids.join(',')})`);
      if (this.state.services.length) {
        await Supabase.insert('services', this.state.services.map((service) => ({
          icon: service.icon,
          icon_label: service.icon_label || '',
          name: service.name,
          description: service.description,
          status: service.status !== false,
          sort_order: service.sort_order,
          image_url: service.image_url || '',
          show_on_homepage: service.show_on_homepage !== false
        })));
      }
      await this.loadState();
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  },

  async replaceGallery(gallery) {
    this.state.gallery = gallery.map((item, index) => normalizeGalleryItem(item, index)).filter(Boolean);
    this.persistState();

    try {
      const remote = await Supabase.select('gallery', 'id');
      const ids = (remote || []).map((row) => row.id);
      if (ids.length) await Supabase.remove('gallery', `id=in.(${ids.join(',')})`);
      if (this.state.gallery.length) {
        await Supabase.insert('gallery', this.state.gallery.map((item) => ({
          title: item.title,
          cat: item.cat,
          cat_label: item.cat_label,
          location: item.location,
          img_url: item.img_url
        })));
      }
      await this.loadState();
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  },

  async replaceTestimonials(testimonials) {
    this.state.testimonials = testimonials.map((item, index) => normalizeTestimonial(item, index)).filter(Boolean);
    this.persistState();

    try {
      const remote = await Supabase.select('testimonials', 'id');
      const ids = (remote || []).map((row) => row.id);
      if (ids.length) await Supabase.remove('testimonials', `id=in.(${ids.join(',')})`);
      if (this.state.testimonials.length) {
        await Supabase.insert('testimonials', this.state.testimonials.map((item) => ({
          name: item.name,
          role: item.role,
          review: item.review,
          stars: item.stars || 5,
          active: item.active !== false
        })));
      }
      await this.loadState();
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  },

  async createSubmission(submission) {
    const row = {
      id: submission.id || `local-${Date.now()}`,
      ...submission,
      created_at: submission.created_at || new Date().toISOString()
    };
    this.state.submissions = [row, ...(this.state.submissions || [])];
    this.persistState();

    try {
      await Supabase.insert('submissions', row);
      await this.loadState();
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  },

  async deleteSubmission(id) {
    this.state.submissions = (this.state.submissions || []).filter((item) => String(item.id) !== String(id));
    this.persistState();

    try {
      await Supabase.remove('submissions', `id=eq.${encodeURIComponent(id)}`);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  },

  async clearSubmissions() {
    this.state.submissions = [];
    this.persistState();

    try {
      const remote = await Supabase.select('submissions', 'id');
      const ids = (remote || []).map((row) => row.id);
      if (ids.length) await Supabase.remove('submissions', `id=in.(${ids.join(',')})`);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
};

function extractFlatSettings(map) {
  const flat = {};
  for (const key of Object.keys(DEFAULT_SITE_SETTINGS)) {
    if (map[key] != null) flat[key] = map[key];
  }
  return flat;
}

function extractTableName(error, fallback) {
  const text = String(error && error.message ? error.message : error || '');
  const match = text.match(/public\.([a-z_]+)/i);
  return match ? match[1] : fallback;
}

function renderLogo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const logoSrc = getSiteLogoSrc();
  el.innerHTML = `<img src="${logoSrc}" alt="${NobleSite.state.branding.name} logo" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.onerror=null;this.closest('div').innerHTML='<i class=&quot;fas fa-bolt&quot;></i>';">`;
}

function buildNavbar(activePage) {
  const branding = NobleSite.state.branding;
  const contact = NobleSite.state.contactInfo;
  const navLinks = [
    { label: 'Home', path: `${ROOT}index.html`, icon: 'fa-home' },
    { label: 'About', path: `${ROOT}pages/about.html`, icon: 'fa-users' },
    { label: 'Services', path: `${ROOT}pages/services.html`, icon: 'fa-tools' },
    { label: 'Gallery', path: `${ROOT}pages/gallery.html`, icon: 'fa-images' },
    { label: 'Contact', path: `${ROOT}pages/contact.html`, icon: 'fa-envelope' }
  ];

  const desktopLinks = navLinks.map((link) => `<a href="${link.path}" class="${link.label === activePage ? 'active' : ''}">${link.label}</a>`).join('');
  const mobileLinks = navLinks.map((link) => `<a href="${link.path}"><i class="fas ${link.icon}"></i>${link.label}</a>`).join('');

  return `
    <nav id="navbar">
      <a href="${ROOT}index.html" class="nav-logo">
        <div class="nav-logo-icon" id="navLogoIcon"><i class="fas fa-bolt"></i></div>
        <div class="nav-logo-text">
          <div class="brand">${branding.name}</div>
          <div class="slogan">${branding.tag}</div>
        </div>
      </a>
      <div class="nav-links">${desktopLinks}</div>
      <a href="tel:${contact.ci1.replace(/\s+/g, '')}" class="nav-cta"><i class="fas fa-phone"></i> ${contact.ci1}</a>
      <button class="hamburger" id="hamburger" aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-drawer" id="navDrawer">
      ${mobileLinks}
      <a href="tel:${contact.ci1.replace(/\s+/g, '')}" class="drawer-cta"><i class="fas fa-phone"></i>&nbsp;${contact.ci1}</a>
    </div>
  `;
}

function buildFooter() {
  const branding = NobleSite.state.branding;
  const contact = NobleSite.state.contactInfo;
  const siteSettings = NobleSite.state.siteSettings || {};
  const creditText = siteSettings.footerCreditText || DEFAULT_SITE_SETTINGS.footerCreditText;
  const creditLink = siteSettings.footerCreditLink || DEFAULT_SITE_SETTINGS.footerCreditLink;
  return `
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="logo">
                <div class="icon" id="footerLogoIcon"><i class="fas fa-bolt"></i></div>
                <strong>${branding.name}</strong>
              </div>
              <p>Certified and trusted electrical service company providing professional solutions for homes, offices, and commercial buildings across Accra.</p>
              <div class="social-row">
                <a href="${contact.ciFb || '#'}" class="s-btn" target="_blank" rel="noreferrer"><i class="fab fa-facebook-f"></i></a>
                <a href="${contact.ciIg || '#'}" class="s-btn" target="_blank" rel="noreferrer"><i class="fab fa-instagram"></i></a>
                <a href="https://wa.me/${contact.ciWa}" class="s-btn" target="_blank" rel="noreferrer"><i class="fab fa-whatsapp"></i></a>
                <a href="mailto:${contact.ciEmail}" class="s-btn"><i class="fas fa-envelope"></i></a>
              </div>
            </div>
            <div class="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="${ROOT}index.html"><i class="fas fa-chevron-right"></i>Home</a></li>
                <li><a href="${ROOT}pages/about.html"><i class="fas fa-chevron-right"></i>About Us</a></li>
                <li><a href="${ROOT}pages/services.html"><i class="fas fa-chevron-right"></i>Services</a></li>
                <li><a href="${ROOT}pages/gallery.html"><i class="fas fa-chevron-right"></i>Gallery</a></li>
                <li><a href="${ROOT}pages/contact.html"><i class="fas fa-chevron-right"></i>Contact</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5>Services</h5>
              <ul>
                ${NobleSite.state.services.filter((service) => service.status !== false).slice(0, 5).map((service) => `<li><a href="${ROOT}pages/services.html#${getServiceMeta(service).slug}"><i class="fas fa-chevron-right"></i>${service.name}</a></li>`).join('')}
              </ul>
            </div>
            <div class="footer-col">
              <h5>Contact</h5>
              <div class="c-row"><i class="fas fa-phone-alt"></i>${contact.ci1}</div>
              <div class="c-row"><i class="fas fa-phone-alt"></i>${contact.ci2}</div>
              <div class="c-row"><i class="fas fa-envelope"></i>${contact.ciEmail}</div>
              <div class="c-row"><i class="fas fa-map-marker-alt"></i>${contact.ciArea}</div>
              <div class="c-row"><i class="fas fa-clock"></i>Mon-Fri: ${contact.ciHr1}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ${branding.name}. All rights reserved.</p>
          <p class="fy">${branding.tag}</p>
          <p class="fy">${buildFooterCreditHtml(creditText, creditLink)}</p>
        </div>
      </div>
    </footer>
    ${NobleSite.state.featureFlags.whatsappFloat !== false ? `<a href="https://wa.me/${contact.ciWa}" target="_blank" rel="noreferrer" class="wa-float" title="Chat on WhatsApp">
      <i class="fab fa-whatsapp"></i>
    </a>` : ''}
    <div class="toast" id="globalToast"></div>
  `;
}

async function initShared(activePage) {
  const renderDynamicSections = () => {
    renderHomeServices?.('#homeServicesGrid');
    renderHomeTestimonials?.('#homeTestimonialsGrid');
    renderServicesPage?.('#servicesPageSections');
    renderAboutTeam?.('#aboutTeamGrid');
    renderGalleryGrid?.('#galleryGrid');
    renderContactPage?.();
  };

  const renderSharedLayout = () => {
    const navMount = document.getElementById('nav-mount');
    if (navMount) navMount.innerHTML = buildNavbar(activePage);

    const footerMount = document.getElementById('footer-mount');
    if (footerMount) footerMount.innerHTML = buildFooter();

    renderLogo('#navLogoIcon');
    renderLogo('#footerLogoIcon');
    updateFavicons();
    document.documentElement.style.setProperty('--yellow', NobleSite.state.branding.color || DEFAULT_BRANDING.color);
    applySiteSettings();
    syncContactLinks();
  };

  NobleSite.hydrateLocalState?.();
  renderSharedLayout();
  renderDynamicSections();
  await NobleSite.loadState();
  renderSharedLayout();
  renderDynamicSections();

  let syncTimer = null;
  window.addEventListener('storage', (event) => {
    if (event.key !== SITE_SYNC_KEY) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(async () => {
      await NobleSite.loadState();
      renderSharedLayout();
      renderDynamicSections();
    }, 120);
  });

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('navDrawer');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer?.classList.toggle('open');
  });
  drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    drawer?.classList.remove('open');
  }));

  document.addEventListener('click', (event) => {
    if (drawer?.classList.contains('open') && !drawer.contains(event.target) && !hamburger?.contains(event.target)) {
      hamburger?.classList.remove('open');
      drawer?.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === 'A') {
      event.preventDefault();
      window.location.href = ROOT + 'admin/index.html';
    }
  });

  if (NobleSite.state.featureFlags.scrollAnimations !== false) {
    initReveal();
  } else {
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((element) => element.classList.add('in'));
  }
}

function updateFavicons() {
  const logoSrc = getSiteLogoSrc();
  if (!logoSrc) return;
  document.querySelectorAll('link[rel="icon"]').forEach((link) => {
    link.setAttribute('href', logoSrc);
  });
}

function initReveal() {
  if (NobleSite.state?.featureFlags?.scrollAnimations === false) {
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((element) => element.classList.add('in'));
    return;
  }
  const elements = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  elements.forEach((element) => observer.observe(element));
}

function initCounters() {
  const elements = document.querySelectorAll('[data-count]');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.target.dataset.counted) continue;
      entry.target.dataset.counted = '1';
      const target = Number(entry.target.dataset.count || 0);
      const suffix = entry.target.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = window.setInterval(() => {
        current = Math.min(current + step, target);
        entry.target.textContent = `${Math.floor(current)}${suffix}`;
        if (current >= target) window.clearInterval(timer);
      }, 16);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.5 });

  elements.forEach((element) => observer.observe(element));
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('globalToast') || document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  const icons = {
    success: 'check-circle',
    error: 'times-circle',
    warning: 'exclamation-circle',
    info: 'info-circle'
  };

  toast.innerHTML = `<i class="fas fa-${icons[type] || icons.success}" style="color:${toastColor(type)}"></i> ${message}`;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function toastColor(type) {
  if (type === 'error') return '#e74c3c';
  if (type === 'warning') return '#f39c12';
  if (type === 'info') return '#3498db';
  return 'var(--yellow)';
}

function formatFooterCredit(text) {
  const value = String(text || '').trim();
  return value || DEFAULT_SITE_SETTINGS.footerCreditText;
}

function buildFooterCreditHtml(text, link) {
  const creditText = formatFooterCredit(text);
  const match = creditText.match(/galaxy studio/i);
  if (!match) return creditText;
  const start = match.index ?? 0;
  const end = start + match[0].length;
  const prefix = creditText.slice(0, start);
  const studioText = creditText.slice(start, end);
  const suffix = creditText.slice(end);
  const studioMarkup = link
    ? `<a href="${link}" target="_blank" rel="noreferrer" style="color:var(--yellow)">${studioText}</a>`
    : `<span style="color:var(--yellow)">${studioText}</span>`;
  return `${prefix}${studioMarkup}${suffix}`;
}

function applySiteSettings() {
  const data = NobleSite.state.siteSettings;
  const siteImages = { ...DEFAULT_FIXED_IMAGES, ...(data.siteImages || {}) };

  const heroHeadline = document.getElementById('heroHeadline');
  if (heroHeadline && data.heroHeadline) heroHeadline.innerHTML = data.heroHeadline;

  const heroSubtext = document.getElementById('heroSubtext');
  if (heroSubtext && data.heroSubtext) heroSubtext.textContent = data.heroSubtext;

  const heroBg = document.getElementById('heroBg');
  if (heroBg && data.heroBgImage) heroBg.style.backgroundImage = `url('${data.heroBgImage}')`;

  const aboutTitle = document.getElementById('aboutTitle');
  if (aboutTitle && data.aboutTitle) aboutTitle.textContent = data.aboutTitle;

  const aboutText = document.getElementById('aboutText');
  if (aboutText && data.aboutText) aboutText.textContent = data.aboutText;

  const aboutStat1 = document.getElementById('aboutStat1');
  if (aboutStat1) aboutStat1.textContent = data.aboutStat1 || DEFAULT_SITE_SETTINGS.aboutStat1;

  const aboutStat1Label = document.getElementById('aboutStat1Label');
  if (aboutStat1Label) aboutStat1Label.textContent = data.aboutStat1Label || DEFAULT_SITE_SETTINGS.aboutStat1Label;

  const aboutYears = document.getElementById('aboutYears');
  if (aboutYears) aboutYears.textContent = data.aboutYears || DEFAULT_SITE_SETTINGS.aboutYears;

  const aboutSatisfaction = document.getElementById('aboutSatisfaction');
  if (aboutSatisfaction) aboutSatisfaction.textContent = data.aboutSatisfaction || DEFAULT_SITE_SETTINGS.aboutSatisfaction;

  const aboutClients = document.getElementById('aboutClients');
  if (aboutClients) aboutClients.textContent = data.aboutClients || DEFAULT_SITE_SETTINGS.aboutClients;

  [
    ['homeAboutMainImage', siteImages.homeAboutMain],
    ['homeAboutAccentImage', siteImages.homeAboutAccent],
    ['homeWhyImage', siteImages.homeWhyImage],
    ['aboutStoryMainImage', siteImages.aboutStoryMain],
    ['aboutStoryAccentImage', siteImages.aboutStoryAccent]
  ].forEach(([id, src]) => {
    const image = document.getElementById(id);
    if (image) setManagedImageSource(image, src);
  });

  const primaryButton = document.querySelector('.hero-btns .btn-yellow');
  if (primaryButton) {
    primaryButton.innerHTML = `<i class="fas fa-phone"></i> ${data.heroBtn1 || DEFAULT_SITE_SETTINGS.heroBtn1}`;
    primaryButton.href = data.heroBtn1Link || DEFAULT_SITE_SETTINGS.heroBtn1Link;
  }

  const secondaryButton = document.querySelector('.hero-btns .btn-outline-w');
  if (secondaryButton) {
    secondaryButton.innerHTML = `<i class="fas fa-file-alt"></i> ${data.heroBtn2 || DEFAULT_SITE_SETTINGS.heroBtn2}`;
    secondaryButton.href = data.heroBtn2Link || DEFAULT_SITE_SETTINGS.heroBtn2Link;
  }
}

function syncContactLinks() {
  const contact = NobleSite.state.contactInfo;
  const phoneMap = [
    { old: '0551897182', next: contact.ci1 },
    { old: '0202506436', next: contact.ci2 }
  ];

  phoneMap.forEach(({ old, next }) => {
    const normalized = next.replace(/\s+/g, '');
    document.querySelectorAll(`a[href="tel:${old}"]`).forEach((anchor) => {
      anchor.href = `tel:${normalized}`;
      if (/^\s*[\d\s+()-]+\s*$/.test(anchor.textContent)) anchor.textContent = next;
    });
  });

  document.querySelectorAll('a[href="mailto:osmanbilad8@gmail.com"]').forEach((anchor) => {
    anchor.href = `mailto:${contact.ciEmail}`;
    if (anchor.textContent.includes('@')) anchor.textContent = contact.ciEmail;
  });

  document.querySelectorAll('a[href="https://wa.me/233551897182"]').forEach((anchor) => {
    anchor.href = `https://wa.me/${contact.ciWa}`;
  });
}

function getServiceMeta(service) {
  return SERVICE_META[service.name] || {
    slug: slugify(service.name),
    tag: 'Professional Service',
    image: 'https://images.unsplash.com/photo-1621905251918-b7a3b3e24b5c?w=800&q=80&auto=format',
    bullets: ['Professional consultation', 'Safe installation and repairs', 'Code-compliant workmanship', 'Clear communication', 'Quality materials', 'After-service support']
  };
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function renderHomeServices(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  const services = NobleSite.state.services.filter((service) => service.status !== false && service.show_on_homepage !== false);
  root.innerHTML = services.map((service, index) => {
    const meta = getServiceMeta(service);
    return `
      <a href="pages/services.html#${meta.slug}" class="svc-card reveal" style="transition-delay:${(index + 1) * 0.05}s">
        <div class="icon-box"><i class="fas ${service.icon || 'fa-bolt'}"></i></div>
        <h3>${service.name}</h3>
        <p>${service.description || ''}</p>
        <div class="svc-arrow">Learn More <i class="fas fa-arrow-right"></i></div>
      </a>
    `;
  }).join('');
}

function renderHomeTestimonials(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  const testimonials = NobleSite.state.testimonials.filter((item) => item.active !== false).slice(0, 3);
  root.innerHTML = testimonials.map((item, index) => `
    <div class="testi-card reveal" style="transition-delay:${(index + 1) * 0.05}s">
      <div class="stars">${'★'.repeat(item.stars || 5)}${'☆'.repeat(Math.max(0, 5 - (item.stars || 5)))}</div>
      <p>"${item.review}"</p>
      <div class="testi-author">
        <div class="t-avatar"><i class="fas fa-user"></i></div>
        <div><strong>${item.name}</strong><span>${item.role || 'Client'}</span></div>
      </div>
    </div>
  `).join('');
}

function renderServicesPage(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  const services = NobleSite.state.services.filter((service) => service.status !== false);
  root.innerHTML = services.map((service, index) => {
    const meta = getServiceMeta(service);
    const reverse = index % 2 === 1 ? ' reverse' : '';
    const revealImage = index % 2 === 1 ? 'reveal-r' : 'reveal-l';
    const revealText = index % 2 === 1 ? 'reveal-l' : 'reveal-r';

    return `
      <section class="svc-section" id="${meta.slug}">
        <div class="container">
          <div class="svc-layout${reverse}">
            <div class="svc-img ${revealImage}">
              ${getManagedImageMarkup(service.image_url, service.name)}
            </div>
            <div class="svc-content ${revealText}">
              <div class="icon-box"><i class="fas ${service.icon || 'fa-bolt'}"></i></div>
              <div class="tag-line">${meta.tag}</div>
              <h2>${service.name}</h2>
              <div class="divider"></div>
              <p>${service.description || ''}</p>
              <ul class="svc-includes">
                ${meta.bullets.map((bullet) => `<li><i class="fas fa-check"></i>${bullet}</li>`).join('')}
              </ul>
              <a href="contact.html" class="btn btn-yellow"><i class="fas fa-phone"></i> Get Free Quote</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }).join('');
}

function renderAboutTeam(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  const team = (NobleSite.state.siteSettings?.teamMembers || DEFAULT_SITE_SETTINGS.teamMembers).map(normalizeTeamMember).filter(Boolean);
  root.innerHTML = team.map((member, index) => `
    <div class="team-card reveal" style="transition-delay:${(index + 1) * 0.05}s">
      <div class="team-photo">
        ${member.image_url ? getManagedImageMarkup(member.image_url, member.name) : `<i class="fas ${member.icon || 'fa-hard-hat'}"></i>`}
      </div>
      <div class="team-info">
        <h3>${member.name}</h3>
        <div class="role">${member.role}</div>
        <p>${member.bio}</p>
      </div>
    </div>
  `).join('');
}

function renderGalleryGrid(selector, filter = 'all') {
  const root = document.querySelector(selector);
  if (!root) return [];
  const allItems = NobleSite.state.gallery || [];
  const visible = filter === 'all' ? allItems : allItems.filter((item) => item.cat === filter);
  root.innerHTML = visible.map((item, index) => `
    <div class="gal-item reveal" data-idx="${index}" style="transition-delay:${index * 0.06}s">
      ${getManagedImageMarkup(item.img_url, item.title)}
      <div class="gal-overlay">
        <h4>${item.title}</h4>
        <span>${item.cat_label || item.cat} - ${item.location || ''}</span>
      </div>
      <div class="gal-zoom"><i class="fas fa-search-plus"></i></div>
    </div>
  `).join('');
  initReveal();
  return visible;
}

function renderContactPage() {
  const contact = NobleSite.state.contactInfo;

  const phones = document.getElementById('contactPhoneList');
  if (phones) {
    phones.innerHTML = `
      <strong>Phone Numbers</strong>
      <a href="tel:${contact.ci1.replace(/\s+/g, '')}">${contact.ci1}</a>
      <a href="tel:${contact.ci2.replace(/\s+/g, '')}">${contact.ci2}</a>
    `;
  }

  const email = document.getElementById('contactEmailLink');
  if (email) {
    email.href = `mailto:${contact.ciEmail}`;
    email.textContent = contact.ciEmail;
  }

  const whatsapp = document.getElementById('contactWhatsappLink');
  if (whatsapp) whatsapp.href = `https://wa.me/${contact.ciWa}`;

  const area = document.getElementById('contactServiceArea');
  if (area) area.textContent = contact.ciArea;

  const hours = document.getElementById('contactHours');
  if (hours) {
    hours.innerHTML = `
      <h4><i class="fas fa-clock"></i> &nbsp; Business Hours</h4>
      <div class="h-row today"><span>Monday - Friday</span><span>${contact.ciHr1}</span></div>
      <div class="h-row"><span>Saturday</span><span>${contact.ciHr2}</span></div>
      <div class="h-row"><span>Sunday</span><span>${contact.ciHr3}</span></div>
      <div class="h-row"><span>Public Holidays</span><span>${contact.ciHr3}</span></div>
    `;
  }

  const emergencyPhones = document.getElementById('emergencyPhones');
  if (emergencyPhones) {
    emergencyPhones.innerHTML = `
      <a href="tel:${contact.ci1.replace(/\s+/g, '')}" class="ep"><i class="fas fa-phone-alt"></i> ${contact.ci1}</a>
      <a href="tel:${contact.ci2.replace(/\s+/g, '')}" class="ep"><i class="fas fa-phone-alt"></i> ${contact.ci2}</a>
    `;
  }

  const servicesSelect = document.getElementById('fservice');
  if (servicesSelect) {
    const activeServices = NobleSite.state.services.filter((service) => service.status !== false);
    servicesSelect.innerHTML = `
      <option value="">Select a service...</option>
      ${activeServices.map((service) => `<option>${service.name}</option>`).join('')}
      <option>Emergency Callout</option>
      <option>Other</option>
    `;
  }

  const contactForm = document.getElementById('contactForm');
  const successBox = document.getElementById('successBox');
  if (contactForm && NobleSite.state.featureFlags.contactForm === false) {
    contactForm.innerHTML = '<div class="success-box show" style="display:block;padding:20px 0;text-align:left;"><i class="fas fa-info-circle" style="font-size:2rem;color:var(--yellow);margin-bottom:12px;"></i><h4>Contact form is currently unavailable</h4><p>Please call or message Noble Electricals directly using the contact details on this page.</p></div>';
    if (successBox) successBox.classList.remove('show');
  }
}

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON = SUPABASE_ANON;
window.SITE_SYNC_KEY = SITE_SYNC_KEY;
window.LocalStore = LocalStore;
window.NobleSite = NobleSite;
window.initShared = initShared;
window.initReveal = initReveal;
window.initCounters = initCounters;
window.showToast = showToast;
window.applySiteSettings = applySiteSettings;
window.handleImageFallback = handleImageFallback;
window.getSiteLogoSrc = getSiteLogoSrc;
window.renderHomeServices = renderHomeServices;
window.renderHomeTestimonials = renderHomeTestimonials;
window.renderServicesPage = renderServicesPage;
window.renderGalleryGrid = renderGalleryGrid;
window.renderContactPage = renderContactPage;
window.getServiceMeta = getServiceMeta;
window.SERVICE_ICON_CHOICES = SERVICE_ICON_CHOICES;
window.renderAboutTeam = renderAboutTeam;
