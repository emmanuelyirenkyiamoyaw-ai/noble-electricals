# Noble Electricals — Supabase Setup Guide

## 1. Create Your Supabase Project
1. Go to https://supabase.com and sign up (free)
2. Click **New Project**
3. Name it `noble-electricals`
4. Choose a region close to Ghana (e.g., Europe West)
5. Set a strong database password and save it

---

## 2. Run This SQL in the Supabase SQL Editor

Go to your project → **SQL Editor** → **New Query** → paste and run:

```sql
-- ============================================================
-- NOBLE ELECTRICALS — Supabase Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── SITE SETTINGS TABLE ──
create table if not exists site_settings (
  key   text primary key,
  value text,
  updated_at timestamptz default now()
);

-- ── CONTACT FORM SUBMISSIONS ──
create table if not exists submissions (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  phone       text not null,
  email       text,
  service     text,
  property    text,
  message     text not null,
  created_at  timestamptz default now()
);

-- ── SERVICES ──
create table if not exists services (
  id          serial primary key,
  icon        text default 'fa-bolt',
  name        text not null,
  description text,
  status      boolean default true,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ── GALLERY ──
create table if not exists gallery (
  id         serial primary key,
  title      text not null,
  cat        text,
  cat_label  text,
  location   text,
  img_url    text not null,
  created_at timestamptz default now()
);

-- ── TESTIMONIALS ──
create table if not exists testimonials (
  id         serial primary key,
  name       text not null,
  role       text,
  review     text not null,
  stars      int default 5,
  active     boolean default true,
  created_at timestamptz default now()
);

-- ── DEFAULT SERVICES DATA ──
insert into services (icon, name, description, sort_order) values
  ('fa-home',        'House Wiring',            'Complete residential wiring for new builds and renovations.', 1),
  ('fa-solar-panel', 'Solar Installations',     'Expert solar panel setup and integration.', 2),
  ('fa-search',      'Fault Finding & Repairs', 'Fast diagnosis and lasting repairs for any electrical fault.', 3),
  ('fa-lightbulb',   'Lighting & Maintenance',  'Professional lighting design and installation.', 4),
  ('fa-plug',        'Electrical Upgrades',     'Panel upgrades, rewiring and smart home integration.', 5),
  ('fa-building',    'Commercial Electrical',   'Full electrical solutions for offices and industrial facilities.', 6)
on conflict do nothing;

-- ── ROW LEVEL SECURITY (RLS) ──
-- Enable RLS on all tables
alter table site_settings  enable row level security;
alter table submissions    enable row level security;
alter table services       enable row level security;
alter table gallery        enable row level security;
alter table testimonials   enable row level security;

-- Allow public READ on services, gallery, testimonials, site_settings
create policy "Public read site_settings"  on site_settings  for select using (true);
create policy "Public read services"       on services        for select using (true);
create policy "Public read gallery"        on gallery         for select using (true);
create policy "Public read testimonials"   on testimonials    for select using (true);

-- Allow public INSERT on submissions (contact form)
create policy "Public insert submissions"  on submissions     for insert with check (true);

-- Allow anon to do everything (for admin panel using anon key)
-- NOTE: For production, restrict this with proper auth
create policy "Anon all site_settings"    on site_settings  for all using (true) with check (true);
create policy "Anon all services"         on services        for all using (true) with check (true);
create policy "Anon all gallery"          on gallery         for all using (true) with check (true);
create policy "Anon all testimonials"     on testimonials    for all using (true) with check (true);
create policy "Anon read submissions"     on submissions     for select using (true);
create policy "Anon delete submissions"   on submissions     for delete using (true);
```

---

## 3. Get Your API Keys

In your Supabase project:
1. Go to **Settings → API**
2. Copy your **Project URL** (looks like `https://xxxx.supabase.co`)
3. Copy your **anon/public** key (long JWT string)

---

## 4. Connect in Admin Panel

1. Open your site and press **Ctrl + Shift + A** to open Admin
2. Log in with: **admin / noble2024**
3. Go to **Settings**
4. Paste your **Supabase Project URL** and **Anon Key**
5. Click **Connect Supabase** then **Test Connection**

---

## 5. Update js/shared.js

Open `js/shared.js` and replace these two lines at the top:

```javascript
const SUPABASE_URL  = 'YOUR_SUPABASE_URL';   // ← paste your URL here
const SUPABASE_ANON = 'YOUR_SUPABASE_ANON_KEY'; // ← paste your key here
```

---

## 6. File Structure

```
noble-electricals/
├── index.html              ← Home page
├── css/
│   ├── global.css          ← Shared styles
│   └── nav-footer.css      ← Navbar & footer styles
├── js/
│   └── shared.js           ← Shared JS (nav, footer, Supabase, utils)
├── pages/
│   ├── about.html          ← About page
│   ├── services.html       ← Services page
│   ├── gallery.html        ← Gallery page
│   └── contact.html        ← Contact page
└── admin/
    └── index.html          ← Admin panel (Ctrl+Shift+A)
```

---

## 7. Admin Panel Features

| Section | What You Can Manage |
|---|---|
| Dashboard | Overview stats, recent submissions |
| Hero Section | Headline, subtext, background image, CTA buttons |
| About Section | Title, body text, statistics |
| Services | Add, edit, delete, hide/show services |
| Gallery | Add, remove project photos with categories |
| Testimonials | Add, remove client reviews |
| Contact Info | Phone numbers, email, hours, social links |
| Form Submissions | View, read, delete contact form enquiries |
| Logo & Branding | Upload logo, set business name, brand colour |
| Settings | Supabase connection, admin password, feature toggles |

---

## 8. Admin Shortcut

**Ctrl + Shift + A** — Opens admin panel from any page on the site.

Default credentials:
- Username: `admin`
- Password: `noble2024`

Change these immediately in **Settings → Admin Security**.

---

## 9. Hosting Recommendations

- **Netlify** (free, drag-and-drop deploy) — https://netlify.com
- **Vercel** (free) — https://vercel.com
- **GitHub Pages** (free) — https://pages.github.com

Simply drag the entire `noble-electricals` folder to Netlify Drop and your site goes live instantly.
