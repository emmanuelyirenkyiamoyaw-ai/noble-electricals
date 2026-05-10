const ADMIN_CREDS_KEY_V2 = 'ne_admin_creds';
const DEFAULT_ADMIN_CREDS = { user: 'admin', pass: 'noble2024' };

function getAdminCreds() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_CREDS_KEY_V2)) || DEFAULT_ADMIN_CREDS;
  } catch {
    return DEFAULT_ADMIN_CREDS;
  }
}

function toast(message, type = 'success') {
  showToast(message, type);
}

function readValue(id) {
  return document.getElementById(id)?.value?.trim?.() || '';
}

function writeValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value ?? '';
}

function serviceList() {
  return [...(NobleSite.state.services || [])].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

function galleryList() {
  return [...(NobleSite.state.gallery || [])];
}

function testimonialList() {
  return [...(NobleSite.state.testimonials || [])];
}

function setSupabaseStatus(message, type = 'info') {
  const el = document.getElementById('supaStatus');
  if (!el) return;
  const colors = {
    success: '#27ae60',
    error: '#e74c3c',
    info: 'var(--text-dim)',
    warning: '#f39c12'
  };
  const icons = {
    success: 'check-circle',
    error: 'times-circle',
    info: 'info-circle',
    warning: 'exclamation-triangle'
  };
  el.innerHTML = `<span style="color:${colors[type] || colors.info};font-size:.8rem"><i class="fas fa-${icons[type] || icons.info}"></i> ${message}</span>`;
}

function loadAdminLogos() {
  const logo = NobleSite.state.branding.logo;
  ['loginLogoIcon', 'sidebarLogoIcon'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = logo
      ? `<img src="${logo}" alt="Logo" style="width:100%;height:100%;object-fit:cover;">`
      : '<i class="fas fa-bolt"></i>';
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  if (!sidebar || !main) return;

  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('mobile-open');
    return;
  }

  sidebar.classList.toggle('hidden');
  main.classList.toggle('full');
}

const panelNamesV2 = {
  dashboard: 'Dashboard',
  hero: 'Hero Section',
  about: 'About Section',
  services: 'Services',
  gallery: 'Gallery',
  testimonials: 'Testimonials',
  'contact-info': 'Contact Info',
  submissions: 'Submissions',
  logo: 'Logo & Branding',
  settings: 'Settings'
};

function showPanel(id) {
  document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('active'));
  document.getElementById(`panel-${id}`)?.classList.add('active');
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
  document.querySelector(`.nav-item[onclick*="'${id}'"]`)?.classList.add('active');
  const title = document.getElementById('pageTitle');
  if (title) title.textContent = panelNamesV2[id] || id;

  if (id === 'dashboard') loadDashboard();
  if (id === 'services') renderServicesTable();
  if (id === 'gallery') renderGalleryAdmin();
  if (id === 'testimonials') renderTestiAdmin();
  if (id === 'submissions') loadSubmissions();
  if (window.innerWidth <= 768) document.getElementById('sidebar')?.classList.remove('mobile-open');
}

async function initAdmin() {
  await NobleSite.loadState();
  loadAdminLogos();
  loadHeroFields();
  loadAboutFields();
  loadContactInfoFields();
  loadLogoPreview();
  loadSettingsFields();
  loadDashboard();
  updateSubBadge();
}

function doLogin() {
  const creds = getAdminCreds();
  const user = readValue('loginUser');
  const pass = document.getElementById('loginPass')?.value || '';
  if (user === creds.user && pass === creds.pass) {
    document.getElementById('loginScreen').style.display = 'none';
    initAdmin();
    return;
  }
  document.getElementById('loginErr').style.display = 'block';
  document.getElementById('loginPass').value = '';
}

function signOut() {
  document.getElementById('loginScreen').style.display = 'flex';
  writeValue('loginUser', '');
  writeValue('loginPass', '');
}

function loadDashboard() {
  const subs = NobleSite.state.submissions || [];
  const gallery = NobleSite.state.gallery || [];
  const testi = (NobleSite.state.testimonials || []).filter((item) => item.active !== false);
  const services = (NobleSite.state.services || []).filter((item) => item.status !== false);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText('dSubmissions', subs.length);
  setText('dGallery', gallery.length);
  setText('dTestimonials', testi.length);
  setText('dServices', services.length);
  setText('qs-gallery', gallery.length);
  setText('qs-testi', testi.length);

  const qsSupa = document.getElementById('qs-supa');
  if (qsSupa) {
    if (NobleSite.state.supabaseReady && !NobleSite.state.missingTables.length) {
      qsSupa.className = 'supabase-status connected';
      qsSupa.innerHTML = '<span class="sup-dot"></span>Connected';
    } else if (NobleSite.state.missingTables.length) {
      qsSupa.className = 'supabase-status disconnected';
      qsSupa.innerHTML = '<span class="sup-dot"></span>Schema missing';
    } else {
      qsSupa.className = 'supabase-status disconnected';
      qsSupa.innerHTML = '<span class="sup-dot"></span>Local fallback';
    }
  }

  const container = document.getElementById('dashSubmissions');
  if (!container) return;
  if (!subs.length) {
    container.innerHTML = '<p style="color:var(--text-dim);font-size:.82rem;text-align:center;padding:20px 0;">No submissions yet.</p>';
    return;
  }

  container.innerHTML = subs.slice(0, 5).map((item) => `
    <div class="submission-row">
      <div class="sub-avatar"><i class="fas fa-user"></i></div>
      <div class="sub-info">
        <strong>${item.name}</strong>
        <span>${item.phone} · ${item.service || 'General'}</span>
      </div>
      <div class="sub-tag">${new Date(item.created_at).toLocaleDateString()}</div>
    </div>
  `).join('');
}

function handleLogoUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (event) => {
    const data = event.target?.result;
    if (!data) return;
    showLogoPreview(data);
    const result = await NobleSite.saveSetting('logo', data);
    loadAdminLogos();
    toast(result.ok ? 'Logo uploaded successfully!' : 'Logo saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
  };
  reader.readAsDataURL(file);
}

function showLogoPreview(src) {
  const box = document.getElementById('logoPreviewBox');
  const row = document.getElementById('logoPreviewRow');
  if (box) box.innerHTML = `<img src="${src}" alt="Logo">`;
  if (row) row.style.display = 'flex';
}

function loadLogoPreview() {
  const logo = NobleSite.state.branding.logo;
  if (logo) {
    showLogoPreview(logo);
    writeValue('logoUrl', logo);
  }
}

function applyLogoUrl() {
  const url = readValue('logoUrl');
  if (url) showLogoPreview(url);
}

async function removeLogo() {
  NobleSite.state.branding.logo = '';
  LocalStore.del('logo');
  const result = await NobleSite.saveSetting('logo', '');
  const row = document.getElementById('logoPreviewRow');
  const box = document.getElementById('logoPreviewBox');
  if (row) row.style.display = 'none';
  if (box) box.innerHTML = '';
  writeValue('logoUrl', '');
  loadAdminLogos();
  toast(result.ok ? 'Logo removed.' : 'Logo removed locally. Supabase sync failed.', result.ok ? 'info' : 'warning');
}

async function saveBranding() {
  const branding = {
    name: readValue('bizName') || DEFAULT_BRANDING.name,
    tag: readValue('bizTag') || DEFAULT_BRANDING.tag,
    color: readValue('brandColor') || DEFAULT_BRANDING.color,
    logo: readValue('logoUrl') || NobleSite.state.branding.logo || ''
  };

  const results = await Promise.all([
    NobleSite.saveSetting('branding', branding),
    NobleSite.saveSetting('logo', branding.logo || '')
  ]);

  loadAdminLogos();
  toast(results.every((result) => result.ok) ? 'Branding saved!' : 'Branding saved locally. Supabase sync failed.', results.every((result) => result.ok) ? 'success' : 'warning');
}

function updateHeroBgPreview(url) {
  const preview = document.getElementById('heroBgPreview');
  if (!preview) return;
  preview.innerHTML = url
    ? `<img src="${url}" alt="Hero Background" style="width:100%;height:100%;object-fit:cover;">`
    : '<div class="placeholder"><i class="fas fa-image"></i><p>No image selected</p></div>';
}

function heroImgUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target?.result;
    writeValue('hHeroBgUrl', data);
    updateHeroBgPreview(data);
  };
  reader.readAsDataURL(file);
}

function loadHeroFields() {
  const settings = NobleSite.state.siteSettings || {};
  writeValue('hHeroHeadline', settings.heroHeadline || '');
  writeValue('hHeroSubtext', settings.heroSubtext || '');
  writeValue('hHeroBgUrl', settings.heroBgImage || '');
  writeValue('hBtn1', settings.heroBtn1 || '');
  writeValue('hBtn1Link', settings.heroBtn1Link || '');
  writeValue('hBtn2', settings.heroBtn2 || '');
  writeValue('hBtn2Link', settings.heroBtn2Link || '');
  updateHeroBgPreview(settings.heroBgImage || '');
}

async function saveHero() {
  const payload = {
    ...NobleSite.state.siteSettings,
    heroHeadline: document.getElementById('hHeroHeadline').value,
    heroSubtext: document.getElementById('hHeroSubtext').value,
    heroBgImage: document.getElementById('hHeroBgUrl').value,
    heroBtn1: document.getElementById('hBtn1').value,
    heroBtn1Link: document.getElementById('hBtn1Link').value,
    heroBtn2: document.getElementById('hBtn2').value,
    heroBtn2Link: document.getElementById('hBtn2Link').value
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  toast(result.ok ? 'Hero section saved!' : 'Hero saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

function loadAboutFields() {
  const settings = NobleSite.state.siteSettings || {};
  writeValue('aTitle', settings.aboutTitle || '');
  writeValue('aText', settings.aboutText || '');
}

async function saveAbout() {
  const payload = {
    ...NobleSite.state.siteSettings,
    aboutTitle: document.getElementById('aTitle').value,
    aboutText: document.getElementById('aText').value
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  toast(result.ok ? 'About section saved!' : 'About saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

function getServices() {
  return serviceList();
}

function renderServicesTable() {
  const body = document.getElementById('servicesTbody');
  if (!body) return;
  const services = serviceList();
  body.innerHTML = services.map((service, index) => `
    <tr>
      <td><div class="tbl-icon"><i class="fas ${service.icon || 'fa-bolt'}"></i></div></td>
      <td style="font-weight:600">${service.name}</td>
      <td style="color:rgba(255,255,255,.5);max-width:260px;font-size:.78rem">${service.description || ''}</td>
      <td><span class="tbl-status ${service.status !== false ? 'on' : 'off'}">${service.status !== false ? 'Active' : 'Hidden'}</span></td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn edit" onclick="editService(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button class="tbl-btn toggle" onclick="toggleService(${index})"><i class="fas fa-eye${service.status !== false ? '-slash' : ''}"></i></button>
          <button class="tbl-btn del" onclick="deleteService(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function commitServices(services, successMessage) {
  const result = await NobleSite.replaceServices(services);
  renderServicesTable();
  loadDashboard();
  toast(result.ok ? successMessage : `${successMessage} Saved locally only because Supabase sync failed.`, result.ok ? 'success' : 'warning');
}

async function toggleService(index) {
  const services = serviceList();
  services[index].status = !(services[index].status !== false);
  await commitServices(services, 'Service updated!');
}

async function deleteService(index) {
  if (!confirm('Delete this service?')) return;
  const services = serviceList();
  services.splice(index, 1);
  await commitServices(services, 'Service deleted.');
}

async function editService(index) {
  const services = serviceList();
  const current = services[index];
  const name = prompt('Service Name:', current.name);
  if (!name) return;
  const description = prompt('Description:', current.description || '');
  if (description == null) return;
  const icon = prompt('FontAwesome icon class (e.g. fa-home):', current.icon || 'fa-bolt') || current.icon || 'fa-bolt';
  services[index] = { ...current, name, description, icon };
  await commitServices(services, 'Service updated!');
}

async function addService() {
  const name = prompt('Service Name:');
  if (!name) return;
  const description = prompt('Short description:');
  if (description == null) return;
  const icon = prompt('FontAwesome icon (e.g. fa-bolt):') || 'fa-bolt';
  const services = serviceList();
  services.push({ id: Date.now(), name, description, icon, status: true, sort_order: services.length + 1 });
  await commitServices(services, 'Service added!');
}

function getGallery() {
  return galleryList();
}

function galleryImgUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    writeValue('gImg', event.target?.result || '');
    toast('Image loaded. Click Add to Gallery to save it.', 'info');
  };
  reader.readAsDataURL(file);
}

function renderGalleryAdmin() {
  const grid = document.getElementById('galleryAdminGrid');
  if (!grid) return;
  const items = galleryList();
  if (!items.length) {
    grid.innerHTML = '<p style="color:var(--text-dim);font-size:.82rem;grid-column:1/-1;text-align:center;padding:20px 0;">No gallery items yet. Add one above.</p>';
    return;
  }

  grid.innerHTML = items.map((item, index) => `
    <div class="gal-admin-card">
      <img src="${item.img_url}" alt="${item.title}" loading="lazy">
      <div class="gal-admin-info">
        <h4>${item.title}</h4>
        <span>${item.cat_label || item.cat} · ${item.location || ''}</span>
        <div class="gal-admin-actions">
          <button class="tbl-btn del" onclick="delGallery(${index})"><i class="fas fa-trash"></i> Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

async function commitGallery(items, successMessage) {
  const result = await NobleSite.replaceGallery(items);
  renderGalleryAdmin();
  loadDashboard();
  toast(result.ok ? successMessage : `${successMessage} Saved locally only because Supabase sync failed.`, result.ok ? 'success' : 'warning');
}

async function addGalleryItem() {
  const title = readValue('gTitle');
  const img = readValue('gImg');
  if (!title || !img) {
    toast('Title and image are required.', 'error');
    return;
  }

  const select = document.getElementById('gCat');
  const items = galleryList();
  items.unshift({
    id: Date.now(),
    title,
    cat: select?.value || 'general',
    cat_label: select?.options?.[select.selectedIndex]?.text || 'Project',
    location: readValue('gLoc'),
    img_url: img
  });

  await commitGallery(items, 'Gallery item added!');
  ['gTitle', 'gImg', 'gLoc'].forEach((id) => writeValue(id, ''));
}

async function delGallery(index) {
  if (!confirm('Remove this gallery item?')) return;
  const items = galleryList();
  items.splice(index, 1);
  await commitGallery(items, 'Gallery item removed.');
}

function getTestimonials() {
  return testimonialList();
}

function renderTestiAdmin() {
  const grid = document.getElementById('testiAdminGrid');
  if (!grid) return;
  const items = testimonialList();
  if (!items.length) {
    grid.innerHTML = '<p style="color:var(--text-dim);font-size:.82rem;text-align:center;padding:20px 0;grid-column:1/-1;">No testimonials yet.</p>';
    return;
  }

  grid.innerHTML = items.map((item, index) => `
    <div class="testi-admin-card">
      <div class="ta-stars">${'★'.repeat(item.stars || 5)}${'☆'.repeat(Math.max(0, 5 - (item.stars || 5)))}</div>
      <div class="ta-text">"${item.review}"</div>
      <div class="ta-author">${item.name}</div>
      <div class="ta-role">${item.role || ''}</div>
      <div class="ta-actions">
        <button class="tbl-btn del" onclick="delTesti(${index})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

async function commitTestimonials(items, successMessage) {
  const result = await NobleSite.replaceTestimonials(items);
  renderTestiAdmin();
  loadDashboard();
  toast(result.ok ? successMessage : `${successMessage} Saved locally only because Supabase sync failed.`, result.ok ? 'success' : 'warning');
}

async function addTestimonial() {
  const name = readValue('tName');
  const review = readValue('tText');
  if (!name || !review) {
    toast('Name and review are required.', 'error');
    return;
  }

  const items = testimonialList();
  items.unshift({
    id: Date.now(),
    name,
    role: readValue('tRole'),
    review,
    stars: Number(document.getElementById('tStars')?.value || 5),
    active: true
  });

  await commitTestimonials(items, 'Testimonial added!');
  ['tName', 'tRole', 'tText'].forEach((id) => writeValue(id, ''));
}

async function delTesti(index) {
  if (!confirm('Delete this testimonial?')) return;
  const items = testimonialList();
  items.splice(index, 1);
  await commitTestimonials(items, 'Testimonial deleted.');
}

function loadContactInfoFields() {
  const contact = NobleSite.state.contactInfo || {};
  Object.entries({ ...DEFAULT_CONTACT_INFO, ...contact }).forEach(([id, value]) => writeValue(id, value));
}

async function saveContactInfo() {
  const payload = {};
  ['ci1', 'ci2', 'ciEmail', 'ciWa', 'ciArea', 'ciHr1', 'ciHr2', 'ciHr3', 'ciFb', 'ciIg'].forEach((id) => {
    payload[id] = document.getElementById(id)?.value || '';
  });
  const result = await NobleSite.saveSetting('contactInfo', payload);
  toast(result.ok ? 'Contact info saved!' : 'Contact info saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

function loadSubmissions() {
  const tbody = document.getElementById('submissionsTbody');
  if (!tbody) return;
  const subs = NobleSite.state.submissions || [];
  if (!subs.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No submissions yet.</td></tr>';
    updateSubBadge();
    return;
  }

  tbody.innerHTML = subs.map((item, index) => `
    <tr class="sub-table-row" onclick="viewSubmission(${index})">
      <td style="font-weight:600">${item.name}</td>
      <td>${item.phone}</td>
      <td><span class="sub-tag">${item.service || 'General'}</span></td>
      <td style="color:var(--text-dim);font-size:.78rem">${new Date(item.created_at).toLocaleString()}</td>
      <td><button class="tbl-btn del" onclick="event.stopPropagation();delSubmission('${item.id || index}')"><i class="fas fa-trash"></i></button></td>
    </tr>
  `).join('');
  updateSubBadge();
}

function viewSubmission(index) {
  const item = (NobleSite.state.submissions || [])[index];
  if (!item) return;
  const content = document.getElementById('subModalContent');
  if (!content) return;
  content.innerHTML = `
    <div class="sub-detail-field"><label>Name</label><p>${item.name}</p></div>
    <div class="sub-detail-field"><label>Phone</label><p>${item.phone}</p></div>
    <div class="sub-detail-field"><label>Email</label><p>${item.email || 'Not provided'}</p></div>
    <div class="sub-detail-field"><label>Service</label><p>${item.service || 'Not specified'}</p></div>
    <div class="sub-detail-field"><label>Property Type</label><p>${item.property || 'Not specified'}</p></div>
    <div class="sub-detail-field"><label>Message</label><p style="line-height:1.7;color:rgba(255,255,255,.6)">${item.message}</p></div>
    <div class="sub-detail-field"><label>Submitted</label><p>${new Date(item.created_at).toLocaleString()}</p></div>
    <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap">
      <a href="tel:${String(item.phone).replace(/\s+/g, '')}" class="save-btn" style="font-size:.78rem"><i class="fas fa-phone"></i> Call ${item.name}</a>
      ${item.email ? `<a href="mailto:${item.email}" class="save-btn" style="font-size:.78rem;background:var(--dark2);color:var(--white)"><i class="fas fa-envelope"></i> Email</a>` : ''}
    </div>
  `;
  document.getElementById('subModal')?.classList.add('open');
}

function closeSubModal() {
  document.getElementById('subModal')?.classList.remove('open');
}

async function delSubmission(id) {
  if (!confirm('Delete this submission?')) return;
  const result = await NobleSite.deleteSubmission(id);
  loadSubmissions();
  loadDashboard();
  toast(result.ok ? 'Submission deleted.' : 'Submission deleted locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

function updateSubBadge() {
  const badge = document.getElementById('subBadge');
  if (!badge) return;
  const count = (NobleSite.state.submissions || []).length;
  badge.textContent = count;
  badge.style.display = count ? 'inline' : 'none';
}

function loadSettingsFields() {
  writeValue('sSupaUrl', SUPABASE_URL);
  writeValue('sSupaKey', SUPABASE_ANON);

  if (NobleSite.state.missingTables.length) {
    setSupabaseStatus(`Connected, but missing tables: ${NobleSite.state.missingTables.join(', ')}`, 'warning');
  } else if (NobleSite.state.supabaseReady) {
    setSupabaseStatus('Connected to Supabase and loading live data.', 'success');
  } else {
    setSupabaseStatus('Using local fallback because Supabase data is unavailable.', 'warning');
  }
}

function saveSupabase() {
  loadSettingsFields();
  toast('Project URL and anon key are already wired into the site code.', 'info');
}

async function testSupabase() {
  setSupabaseStatus('Testing connection...', 'info');
  try {
    await NobleSite.loadState();
    if (NobleSite.state.missingTables.length) {
      setSupabaseStatus(`Connection works, but missing tables: ${NobleSite.state.missingTables.join(', ')}`, 'warning');
      toast('Supabase is reachable, but the expected tables have not been created yet.', 'warning');
      return;
    }
    setSupabaseStatus('Connected successfully!', 'success');
    toast('Supabase connected!');
  } catch (error) {
    console.error(error);
    setSupabaseStatus('Connection failed. Check your network or Supabase settings.', 'error');
    toast('Connection failed.', 'error');
  }
}

function changeCredentials() {
  const user = readValue('newUser');
  const pass = document.getElementById('newPass')?.value || '';
  if (!user || !pass) {
    toast('Username and password required.', 'error');
    return;
  }
  localStorage.setItem(ADMIN_CREDS_KEY_V2, JSON.stringify({ user, pass }));
  writeValue('newUser', '');
  writeValue('newPass', '');
  toast('Credentials updated!');
}

async function clearSubmissions() {
  if (!confirm('Delete ALL submissions? This cannot be undone.')) return;
  const result = await NobleSite.clearSubmissions();
  loadSubmissions();
  loadDashboard();
  toast(result.ok ? 'All submissions cleared.' : 'Submissions cleared locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

async function resetAll() {
  if (!confirm('Reset ALL settings? This will clear local logos, settings, and cached content in this browser.')) return;
  ['logo', 'siteSettings', 'gallery', 'testimonials', 'services', 'contactInfo', 'branding', 'submissions'].forEach((key) => LocalStore.del(key));
  await NobleSite.loadState();
  toast('Local cache reset. Reloading...', 'info');
  setTimeout(() => location.reload(), 700);
}

document.addEventListener('DOMContentLoaded', async () => {
  await NobleSite.loadState();
  loadAdminLogos();
  loadSettingsFields();
  document.getElementById('subModal')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeSubModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSubModal();
  });
});
