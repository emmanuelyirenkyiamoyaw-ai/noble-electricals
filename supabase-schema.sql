create extension if not exists "uuid-ossp";

create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

create table if not exists submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  service text,
  property text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists services (
  id serial primary key,
  icon text default 'fa-bolt',
  name text not null,
  description text,
  status boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id serial primary key,
  title text not null,
  cat text,
  cat_label text,
  location text,
  img_url text not null,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id serial primary key,
  name text not null,
  role text,
  review text not null,
  stars int default 5,
  active boolean default true,
  created_at timestamptz default now()
);

insert into services (icon, name, description, sort_order)
values
  ('fa-home', 'House Wiring', 'Complete residential wiring for new builds and renovations.', 1),
  ('fa-solar-panel', 'Solar Installations', 'Expert solar panel setup and integration.', 2),
  ('fa-search', 'Fault Finding & Repairs', 'Fast diagnosis and lasting repairs for any electrical fault.', 3),
  ('fa-lightbulb', 'Lighting & Maintenance', 'Professional lighting design and installation.', 4),
  ('fa-plug', 'Electrical Upgrades', 'Panel upgrades, rewiring and smart home integration.', 5),
  ('fa-building', 'Commercial Electrical', 'Full electrical solutions for offices and industrial facilities.', 6)
on conflict do nothing;

alter table site_settings enable row level security;
alter table submissions enable row level security;
alter table services enable row level security;
alter table gallery enable row level security;
alter table testimonials enable row level security;

drop policy if exists "Public read site_settings" on site_settings;
drop policy if exists "Public read services" on services;
drop policy if exists "Public read gallery" on gallery;
drop policy if exists "Public read testimonials" on testimonials;
drop policy if exists "Public insert submissions" on submissions;
drop policy if exists "Anon all site_settings" on site_settings;
drop policy if exists "Anon all services" on services;
drop policy if exists "Anon all gallery" on gallery;
drop policy if exists "Anon all testimonials" on testimonials;
drop policy if exists "Anon read submissions" on submissions;
drop policy if exists "Anon delete submissions" on submissions;

create policy "Public read site_settings" on site_settings for select using (true);
create policy "Public read services" on services for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Public insert submissions" on submissions for insert with check (true);

create policy "Anon all site_settings" on site_settings for all using (true) with check (true);
create policy "Anon all services" on services for all using (true) with check (true);
create policy "Anon all gallery" on gallery for all using (true) with check (true);
create policy "Anon all testimonials" on testimonials for all using (true) with check (true);
create policy "Anon read submissions" on submissions for select using (true);
create policy "Anon delete submissions" on submissions for delete using (true);
