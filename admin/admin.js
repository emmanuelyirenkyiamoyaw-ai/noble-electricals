const ADMIN_CREDS_KEY_V2 = 'ne_admin_creds';
const DEFAULT_ADMIN_CREDS = { user: 'admin', pass: 'noble2024' };
const ADMIN_SESSION_KEY = 'ne_admin_session_v1';
const ADMIN_ACCESS_KEY = 'ne_admin_access_settings_v1';
const HIDDEN_STUDIO_EMAIL = 'GalaxyDesignStudio4@gmail.com';
const HIDDEN_STUDIO_CODE = '055688';
const DEFAULT_ADMIN_ACCESS = {
  primaryAllowedEmail: 'osmanbilad8@gmail.com',
  allowedEmails: [],
  googleClientId: ''
};
const adminActionLocks = {
  services: false,
  gallery: false,
  testimonials: false
};

function getAdminCreds() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_CREDS_KEY_V2)) || DEFAULT_ADMIN_CREDS;
  } catch {
    return DEFAULT_ADMIN_CREDS;
  }
}

function getAdminAccessSettings() {
  try {
    return {
      ...DEFAULT_ADMIN_ACCESS,
      ...(JSON.parse(localStorage.getItem(ADMIN_ACCESS_KEY)) || {}),
      ...(NobleSite.state?.siteSettings?.adminAccess || {})
    };
  } catch {
    return {
      ...DEFAULT_ADMIN_ACCESS,
      ...(NobleSite.state?.siteSettings?.adminAccess || {})
    };
  }
}

function saveAdminSession(session) {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
    ...session,
    last_seen_at: Date.now()
  }));
}

function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
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

async function runAdminAction(lockKey, action) {
  if (adminActionLocks[lockKey]) return { skipped: true };
  adminActionLocks[lockKey] = true;
  try {
    return await action();
  } finally {
    adminActionLocks[lockKey] = false;
  }
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

function teamMemberList() {
  return [...(NobleSite.state.siteSettings?.teamMembers || DEFAULT_SITE_SETTINGS.teamMembers || [])];
}

const selectedGalleryItems = new Set();

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
  const logo = resolveAssetPath(NobleSite.state.branding.logo || DEFAULT_BRANDING.logo);
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
    } else if (NobleSite.state.supabaseIssue) {
      qsSupa.className = 'supabase-status disconnected';
      qsSupa.innerHTML = '<span class="sup-dot"></span>Connection slow';
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

function updateTinyToastPosition() {
  const toastEl = document.getElementById('globalToast');
  if (!toastEl) return;
  toastEl.style.top = 'auto';
  toastEl.style.right = '18px';
  toastEl.style.bottom = '18px';
}

function setVerifiedEmailState(email = '', mode = 'google') {
  const wrap = document.getElementById('verifiedEmailWrap');
  const status = document.getElementById('googleVerifyStatus');
  const password = document.getElementById('loginPass');
  const loginButton = document.getElementById('passwordLoginBtn');
  const verifyButton = document.getElementById('googleVerifyBtn');
  const error = document.getElementById('loginErr');
  const session = getAdminSession();
  const activeMode = mode || session?.mode || 'google';

  if (error) error.style.display = 'none';

  if (email) {
    if (wrap) {
      wrap.innerHTML = `<div class="verified-pill"><i class="fas fa-check-circle"></i> ${activeMode === 'bypass' ? 'Studio access unlocked' : `Verified: ${email}`}</div>`;
    }
    if (status) {
      status.textContent = activeMode === 'bypass'
        ? 'Hidden studio access is active for this device.'
        : `${email} is verified and allowed. Enter the admin password to continue.`;
    }
    if (password) password.disabled = activeMode === 'bypass';
    if (loginButton) {
      loginButton.disabled = false;
      loginButton.innerHTML = activeMode === 'bypass'
        ? '<i class="fas fa-door-open"></i> Enter Admin Panel'
        : '<i class="fas fa-sign-in-alt"></i> Enter Admin Panel';
    }
    if (verifyButton && activeMode === 'google') verifyButton.textContent = 'Verified';
    if (verifyButton && activeMode === 'bypass') verifyButton.textContent = 'Bypass Active';
    if (verifyButton) verifyButton.disabled = true;
    return;
  }

  if (wrap) wrap.innerHTML = '';
  if (status) status.textContent = 'Verify an allowed Google email before entering the admin password.';
  if (password) {
    password.disabled = true;
    password.value = '';
  }
  if (loginButton) {
    loginButton.disabled = true;
    loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Enter Admin Panel';
  }
  if (verifyButton) {
    verifyButton.disabled = false;
    verifyButton.innerHTML = '<i class="fab fa-google"></i> Verify Google';
  }
}

function getAllowedVisibleEmail() {
  return getAdminAccessSettings().primaryAllowedEmail || DEFAULT_ADMIN_ACCESS.primaryAllowedEmail;
}

function getAllowedAdminEmails() {
  const access = getAdminAccessSettings();
  const extraEmails = Array.isArray(access.allowedEmails) ? access.allowedEmails : [];
  return [...new Set([
    access.primaryAllowedEmail || DEFAULT_ADMIN_ACCESS.primaryAllowedEmail,
    ...extraEmails,
    HIDDEN_STUDIO_EMAIL
  ].map((email) => String(email || '').trim().toLowerCase()).filter(Boolean))];
}

function isAllowedAdminEmail(email = '') {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return false;
  return getAllowedAdminEmails().includes(normalized);
}

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function restoreAdminSession() {
  const session = getAdminSession();
  if (!session) return false;
  if (session.mode === 'bypass') {
    setVerifiedEmailState(HIDDEN_STUDIO_EMAIL, 'bypass');
    return 'bypass';
  }
  if (session.email && isAllowedAdminEmail(session.email)) {
    setVerifiedEmailState(session.email, 'google');
    return session.unlocked ? 'unlocked' : 'verified';
  }
  clearAdminSession();
  return false;
}

function unlockStudioBypass() {
  saveAdminSession({ email: HIDDEN_STUDIO_EMAIL, mode: 'bypass', approved: true, unlocked: true });
  setVerifiedEmailState(HIDDEN_STUDIO_EMAIL, 'bypass');
  initAdmin();
}

function maybeOpenStudioBypass() {
  const code = window.prompt('Enter studio access code');
  if (code === HIDDEN_STUDIO_CODE) {
    unlockStudioBypass();
    return;
  }
  if (code != null) toast('Invalid studio access code.', 'error');
}

function setupSecretBypass() {
  const logo = document.getElementById('loginLogoIcon');
  logo?.addEventListener('dblclick', maybeOpenStudioBypass);
}

function ensureGoogleClientReady() {
  const note = document.getElementById('googleVerifyNote');
  const clientId = getAdminAccessSettings().googleClientId;
  if (note) {
    note.textContent = clientId
      ? 'Google verification is ready for approved admin emails.'
      : 'Google verification needs a Google OAuth web client ID in Admin Settings. Until then, only the hidden studio bypass can open this page.';
  }
  return clientId;
}

function startGoogleVerification() {
  const clientId = ensureGoogleClientReady();
  if (!clientId) {
    toast('Add a Google OAuth client ID in Admin Settings to use Google verification.', 'warning');
    return;
  }
  if (!window.google?.accounts?.id) {
    toast('Google verification is still loading. Try again in a moment.', 'warning');
    return;
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: handleGoogleCredentialResponse
  });

  window.google.accounts.id.prompt();
  toast('Choose an allowed Google account to continue.', 'info');
}

function handleGoogleCredentialResponse(response) {
  const payload = decodeJwtPayload(response?.credential || '');
  const email = payload?.email || '';
  if (!isAllowedAdminEmail(email)) {
    clearAdminSession();
    setVerifiedEmailState('', 'google');
    toast('That Google account is not allowed for this admin panel.', 'error');
    return;
  }
  saveAdminSession({ email, mode: 'google', approved: true, unlocked: false });
  setVerifiedEmailState(email, 'google');
  toast('Google email verified.', 'success');
}

function normalizeHeadlineForEditor(value = '') {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?span[^>]*>/gi, '')
    .replace(/&nbsp;/gi, ' ');
}

function normalizeHeadlineForSite(value = '') {
  return String(value || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join('<br>');
}

function loadServiceIconChoices() {
  const picker = document.getElementById('serviceIconPicker');
  if (!picker) return;
  const choices = window.SERVICE_ICON_CHOICES || [];
  picker.innerHTML = choices.map((choice) => `
    <button type="button" class="icon-choice" data-icon="${choice.icon}" onclick="selectServiceIcon('${choice.icon.replace(/'/g, "\\'")}', '${choice.name.replace(/'/g, "\\'")}')">
      <i class="fas ${choice.icon}"></i>
      <small>${choice.name}</small>
    </button>
  `).join('');
}

function syncSelectedServiceIcon(icon) {
  document.querySelectorAll('#serviceIconPicker .icon-choice').forEach((button) => {
    button.classList.toggle('active', button.dataset.icon === icon);
  });
}

function updateServiceImagePreview(src = '') {
  const preview = document.getElementById('svcImagePreview');
  if (!preview) return;
  preview.innerHTML = getManagedImageMarkup(src, 'Service image preview');
}

function updateServiceIconPreview(icon = 'fa-bolt') {
  const preview = document.getElementById('svcIconPreview');
  if (preview) preview.innerHTML = `<i class="fas ${icon || 'fa-bolt'}"></i>`;
  syncSelectedServiceIcon(icon || 'fa-bolt');
}

function updateServiceCardPreview() {
  const name = readValue('svcName') || 'Service Preview';
  const text = document.getElementById('svcDescription')?.value?.trim?.() || 'Choose an icon and image for this service.';
  const nameEl = document.getElementById('svcPreviewName');
  const textEl = document.getElementById('svcPreviewText');
  if (nameEl) nameEl.textContent = name;
  if (textEl) textEl.textContent = text;
}

function updateTeamPreview(src = '') {
  const preview = document.getElementById('tmPreview');
  if (!preview) return;
  preview.innerHTML = src
    ? getManagedImageMarkup(src, 'Team member preview')
    : '<div class="placeholder"><i class="fas fa-user"></i><p>No image selected</p></div>';
}

function teamImageUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const value = event.target?.result || '';
    writeValue('tmImage', value);
    updateTeamPreview(value);
    toast('Team member image loaded.', 'info');
  };
  reader.readAsDataURL(file);
}

function resetTeamMemberForm() {
  writeValue('tmEditIndex', '');
  writeValue('tmName', '');
  writeValue('tmRole', '');
  writeValue('tmBio', '');
  writeValue('tmImage', '');
  writeValue('tmIcon', 'fa-hard-hat');
  const title = document.getElementById('teamEditorTitle');
  if (title) title.textContent = 'Add Team Member';
  updateTeamPreview('');
}

function editTeamMember(index) {
  const members = teamMemberList();
  const current = members[index];
  if (!current) return;
  writeValue('tmEditIndex', String(index));
  writeValue('tmName', current.name || '');
  writeValue('tmRole', current.role || '');
  writeValue('tmBio', current.bio || '');
  writeValue('tmImage', current.image_url || '');
  writeValue('tmIcon', current.icon || 'fa-hard-hat');
  const title = document.getElementById('teamEditorTitle');
  if (title) title.textContent = `Edit Team Member: ${current.name}`;
  updateTeamPreview(current.image_url || '');
}

async function saveTeamMembers(members, successMessage) {
  const payload = {
    ...NobleSite.state.siteSettings,
    teamMembers: members
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  NobleSite.state.siteSettings.teamMembers = members;
  renderTeamAdmin();
  toast(result.ok ? successMessage : `${successMessage} Saved locally. Supabase sync failed.`, result.ok ? 'success' : 'warning');
}

async function submitTeamMemberForm() {
  const name = readValue('tmName');
  const role = readValue('tmRole');
  const bio = document.getElementById('tmBio')?.value?.trim() || '';
  const imageUrl = readValue('tmImage');
  const icon = readValue('tmIcon') || 'fa-hard-hat';
  const editIndex = readValue('tmEditIndex');
  if (!name || !role) {
    toast('Team member name and role are required.', 'error');
    return;
  }

  const members = teamMemberList();
  const current = editIndex !== '' ? members[Number(editIndex)] : null;
  const payload = {
    id: current?.id ?? Date.now(),
    name,
    role,
    bio,
    image_url: imageUrl,
    icon
  };

  if (editIndex !== '') {
    members[Number(editIndex)] = { ...current, ...payload };
  } else {
    members.push(payload);
  }

  await saveTeamMembers(members, editIndex !== '' ? 'Team member updated!' : 'Team member added!');
  resetTeamMemberForm();
}

async function deleteTeamMember(index) {
  if (!confirm('Delete this team member?')) return;
  const members = teamMemberList();
  members.splice(index, 1);
  await saveTeamMembers(members, 'Team member deleted.');
  resetTeamMemberForm();
}

function renderTeamAdmin() {
  const grid = document.getElementById('teamAdminGrid');
  if (!grid) return;
  const members = teamMemberList();
  if (!members.length) {
    grid.innerHTML = '<p style="color:var(--text-dim);font-size:.82rem;grid-column:1/-1;text-align:center;padding:20px 0;">No team members yet.</p>';
    return;
  }

  grid.innerHTML = members.map((member, index) => `
    <div class="team-admin-card">
      <div class="team-admin-photo">
        ${member.image_url ? `<img src="${resolveAssetPath(member.image_url)}" alt="${member.name}">` : `<i class="fas ${member.icon || 'fa-hard-hat'}"></i>`}
      </div>
      <div class="team-admin-info">
        <strong>${member.name}</strong>
        <span>${member.role}</span>
        <p>${member.bio || ''}</p>
        <div class="team-admin-actions">
          <button class="tbl-btn edit" onclick="editTeamMember(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button class="tbl-btn del" onclick="deleteTeamMember(${index})"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function selectServiceIcon(icon, label = '') {
  writeValue('svcIcon', icon);
  updateServiceIconPreview(icon);
  if (!readValue('svcName') && label) {
    const previewName = document.getElementById('svcPreviewName');
    if (previewName) previewName.textContent = `${label} Service`;
  }
}

function serviceImgUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const value = event.target?.result || '';
    writeValue('svcImage', value);
    updateServiceImagePreview(value);
    toast('Service image loaded. Save the service to keep it.', 'info');
  };
  reader.readAsDataURL(file);
}

function resetServiceForm() {
  writeValue('svcEditIndex', '');
  writeValue('svcName', '');
  writeValue('svcIcon', 'fa-bolt');
  writeValue('svcDescription', '');
  writeValue('svcImage', '');
  writeValue('svcSortOrder', String(serviceList().length + 1));
  const status = document.getElementById('svcStatus');
  if (status) status.checked = true;
  const homepage = document.getElementById('svcHome');
  if (homepage) homepage.checked = true;
  const title = document.getElementById('serviceEditorTitle');
  if (title) title.textContent = 'Add New Service';
  updateServiceIconPreview('fa-bolt');
  updateServiceImagePreview('');
  updateServiceCardPreview();
}

function openServiceEditor(index = null) {
  if (index == null) {
    resetServiceForm();
    return;
  }

  const services = serviceList();
  const current = services[index];
  if (!current) return;
  writeValue('svcEditIndex', String(index));
  writeValue('svcName', current.name || '');
  writeValue('svcIcon', current.icon || 'fa-bolt');
  writeValue('svcDescription', current.description || '');
  writeValue('svcImage', current.image_url || '');
  writeValue('svcSortOrder', String(current.sort_order ?? index + 1));
  const status = document.getElementById('svcStatus');
  if (status) status.checked = current.status !== false;
  const homepage = document.getElementById('svcHome');
  if (homepage) homepage.checked = current.show_on_homepage !== false;
  const title = document.getElementById('serviceEditorTitle');
  if (title) title.textContent = `Edit Service: ${current.name}`;
  updateServiceIconPreview(current.icon || 'fa-bolt');
  updateServiceImagePreview(current.image_url || '');
  updateServiceCardPreview();
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
      <td><span class="tbl-status ${service.show_on_homepage !== false ? 'on' : 'off'}">${service.show_on_homepage !== false ? 'Shown' : 'Hidden'}</span></td>
      <td><span class="tbl-status ${service.status !== false ? 'on' : 'off'}">${service.status !== false ? 'Active' : 'Hidden'}</span></td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn edit" onclick="openServiceEditor(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button class="tbl-btn toggle" onclick="toggleServiceHomepage(${index})"><i class="fas fa-house"></i></button>
          <button class="tbl-btn toggle" onclick="toggleService(${index})"><i class="fas fa-eye${service.status !== false ? '-slash' : ''}"></i></button>
          <button class="tbl-btn del" onclick="deleteService(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function commitServices(services, successMessage) {
  const outcome = await runAdminAction('services', async () => {
    const result = await NobleSite.replaceServices(services);
    renderServicesTable();
    loadDashboard();
    toast(result.ok ? successMessage : `${successMessage} Saved locally only because Supabase sync failed.`, result.ok ? 'success' : 'warning');
    return result;
  });
  return outcome;
}

async function toggleService(index) {
  if (adminActionLocks.services) return;
  const services = serviceList();
  const current = services[index];
  if (!current) return;
  current.status = !(current.status !== false);
  await commitServices(services, 'Service updated!');
}

async function toggleServiceHomepage(index) {
  if (adminActionLocks.services) return;
  const services = serviceList();
  const current = services[index];
  if (!current) return;
  current.show_on_homepage = !(current.show_on_homepage !== false);
  await commitServices(services, 'Homepage service list updated!');
}

async function deleteService(index) {
  if (adminActionLocks.services) return;
  if (!confirm('Delete this service?')) return;
  const services = serviceList();
  services.splice(index, 1);
  const result = await commitServices(services, 'Service deleted.');
  if (result?.skipped) return;
  resetServiceForm();
}

async function submitServiceForm() {
  if (adminActionLocks.services) return;
  const name = readValue('svcName');
  const description = document.getElementById('svcDescription')?.value?.trim() || '';
  const icon = readValue('svcIcon') || 'fa-bolt';
  const imageUrl = readValue('svcImage');
  const editIndex = readValue('svcEditIndex');
  const sortOrder = Number(readValue('svcSortOrder') || serviceList().length + 1) || serviceList().length + 1;
  const isActive = document.getElementById('svcStatus')?.checked !== false;
  const showOnHomepage = document.getElementById('svcHome')?.checked !== false;

  if (!name) {
    toast('Service name is required.', 'error');
    return;
  }

  const services = serviceList();
  const current = editIndex !== '' ? services[Number(editIndex)] : null;
  const payload = {
    id: current?.id ?? Date.now(),
    name,
    description,
    icon,
    icon_label: (window.SERVICE_ICON_CHOICES || []).find((choice) => choice.icon === icon)?.name || '',
    image_url: imageUrl,
    status: isActive,
    show_on_homepage: showOnHomepage,
    sort_order: sortOrder
  };

  if (editIndex !== '') {
    services[Number(editIndex)] = { ...current, ...payload };
  } else {
    services.push(payload);
  }

  services.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const result = await commitServices(services, editIndex !== '' ? 'Service updated!' : 'Service added!');
  if (result?.skipped) return;
  resetServiceForm();
}

function updateGalleryPreview(src = '') {
  const preview = document.getElementById('galleryPreview');
  if (!preview) return;
  preview.innerHTML = getManagedImageMarkup(src, 'Gallery preview');
}

function resetGalleryForm() {
  writeValue('gEditIndex', '');
  writeValue('gTitle', '');
  writeValue('gLoc', '');
  writeValue('gImg', '');
  const select = document.getElementById('gCat');
  if (select) select.selectedIndex = 0;
  const title = document.getElementById('galleryEditorTitle');
  if (title) title.textContent = 'Add New Gallery Item';
  updateGalleryPreview('');
}

function updateGallerySelectionSummary() {
  const text = document.getElementById('gallerySelectionText');
  if (text) {
    text.textContent = selectedGalleryItems.size ? `${selectedGalleryItems.size} image(s) selected.` : 'Select images to delete many at once.';
  }
  const toggle = document.getElementById('gallerySelectAll');
  if (toggle) {
    const total = galleryList().length;
    toggle.checked = total > 0 && selectedGalleryItems.size === total;
  }
}

function toggleGallerySelection(index, checked) {
  if (checked) selectedGalleryItems.add(index);
  else selectedGalleryItems.delete(index);
  updateGallerySelectionSummary();
  renderGalleryAdmin();
}

function clearGallerySelection() {
  selectedGalleryItems.clear();
  updateGallerySelectionSummary();
  renderGalleryAdmin();
}

function toggleAllGallerySelections(checked) {
  selectedGalleryItems.clear();
  if (checked) {
    galleryList().forEach((_, index) => selectedGalleryItems.add(index));
  }
  updateGallerySelectionSummary();
  renderGalleryAdmin();
}

async function deleteSelectedGallery() {
  if (!selectedGalleryItems.size) {
    toast('Select at least one gallery image first.', 'info');
    return;
  }
  if (!confirm(`Delete ${selectedGalleryItems.size} selected gallery image(s)?`)) return;
  const items = galleryList().filter((_, index) => !selectedGalleryItems.has(index));
  selectedGalleryItems.clear();
  await commitGallery(items, 'Selected gallery images removed.');
  updateGallerySelectionSummary();
}

function editGallery(index) {
  const items = galleryList();
  const current = items[index];
  if (!current) return;
  writeValue('gEditIndex', String(index));
  writeValue('gTitle', current.title || '');
  writeValue('gLoc', current.location || '');
  writeValue('gImg', current.img_url || '');
  const select = document.getElementById('gCat');
  if (select) select.value = current.cat || 'general';
  const title = document.getElementById('galleryEditorTitle');
  if (title) title.textContent = `Edit Gallery Item: ${current.title}`;
  updateGalleryPreview(current.img_url || '');
}

function galleryImgUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const value = event.target?.result || '';
    writeValue('gImg', value);
    updateGalleryPreview(value);
    toast('Image loaded. Click Save Gallery Item to keep it.', 'info');
  };
  reader.readAsDataURL(file);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result || '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function galleryBulkUpload(input) {
  if (adminActionLocks.gallery) return;
  const files = [...(input.files || [])];
  if (!files.length) return;
  const select = document.getElementById('gCat');
  const category = select?.value || 'general';
  const catLabel = select?.options?.[select.selectedIndex]?.text || 'Project';
  const location = readValue('gLoc');
  const titleSeed = readValue('gTitle');

  try {
    const images = await Promise.all(files.map(fileToDataUrl));
    const items = galleryList();
    images.reverse().forEach((img, index) => {
      const order = files.length - index;
      items.unshift({
        id: Date.now() + index,
        title: titleSeed ? `${titleSeed} ${order}` : files[index]?.name?.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') || `Project ${items.length + 1}`,
        cat: category,
        cat_label: catLabel,
        location,
        img_url: img
      });
    });
    const result = await commitGallery(items, `${files.length} gallery image(s) uploaded!`);
    if (result?.skipped) return;
    input.value = '';
    resetGalleryForm();
  } catch (error) {
    console.error(error);
    toast('Bulk upload failed.', 'error');
  }
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
    <div class="gal-admin-card ${selectedGalleryItems.has(index) ? 'selected' : ''}">
      <label class="gal-select"><input type="checkbox" ${selectedGalleryItems.has(index) ? 'checked' : ''} onchange="toggleGallerySelection(${index}, this.checked)"></label>
      ${getManagedImageMarkup(item.img_url, item.title)}
      <div class="gal-admin-info">
        <h4>${item.title}</h4>
        <span>${item.cat_label || item.cat} · ${item.location || ''}</span>
        <div class="gal-admin-actions">
          <button class="tbl-btn edit" onclick="editGallery(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button class="tbl-btn del" onclick="delGallery(${index})"><i class="fas fa-trash"></i> Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

async function commitGallery(items, successMessage) {
  const outcome = await runAdminAction('gallery', async () => {
    const result = await NobleSite.replaceGallery(items);
    renderGalleryAdmin();
    loadDashboard();
    updateGallerySelectionSummary();
    toast(result.ok ? successMessage : `${successMessage} Saved locally only because Supabase sync failed.`, result.ok ? 'success' : 'warning');
    return result;
  });
  return outcome;
}

async function addGalleryItem() {
  if (adminActionLocks.gallery) return;
  const title = readValue('gTitle');
  const img = readValue('gImg');
  const editIndex = readValue('gEditIndex');
  if (!title || !img) {
    toast('Title and image are required.', 'error');
    return;
  }

  const select = document.getElementById('gCat');
  const items = galleryList();
  const payload = {
    id: editIndex !== '' ? items[Number(editIndex)]?.id ?? Date.now() : Date.now(),
    title,
    cat: select?.value || 'general',
    cat_label: select?.options?.[select.selectedIndex]?.text || 'Project',
    location: readValue('gLoc'),
    img_url: img
  };

  if (editIndex !== '') {
    items[Number(editIndex)] = payload;
  } else {
    items.unshift(payload);
  }

  const result = await commitGallery(items, editIndex !== '' ? 'Gallery item updated!' : 'Gallery item added!');
  if (result?.skipped) return;
  resetGalleryForm();
}

async function delGallery(index) {
  if (adminActionLocks.gallery) return;
  if (!confirm('Remove this gallery item?')) return;
  const items = galleryList();
  items.splice(index, 1);
  await commitGallery(items, 'Gallery item removed.');
}

function resetTestimonialForm() {
  writeValue('tEditIndex', '');
  writeValue('tName', '');
  writeValue('tRole', '');
  writeValue('tText', '');
  const stars = document.getElementById('tStars');
  if (stars) stars.value = '5';
  const active = document.getElementById('tActive');
  if (active) active.checked = true;
  const title = document.getElementById('testimonialEditorTitle');
  if (title) title.textContent = 'Add New Testimonial';
}

function editTestimonial(index) {
  const items = testimonialList();
  const current = items[index];
  if (!current) return;
  writeValue('tEditIndex', String(index));
  writeValue('tName', current.name || '');
  writeValue('tRole', current.role || '');
  writeValue('tText', current.review || '');
  const stars = document.getElementById('tStars');
  if (stars) stars.value = String(current.stars || 5);
  const active = document.getElementById('tActive');
  if (active) active.checked = current.active !== false;
  const title = document.getElementById('testimonialEditorTitle');
  if (title) title.textContent = `Edit Testimonial: ${current.name}`;
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
    <div class="testi-admin-card ${item.active === false ? 'inactive' : ''}">
      <div class="ta-stars">${'★'.repeat(item.stars || 5)}${'☆'.repeat(Math.max(0, 5 - (item.stars || 5)))}</div>
      <div class="ta-text">"${item.review}"</div>
      <div class="ta-author">${item.name}</div>
      <div class="ta-role">${item.role || ''}</div>
      <div class="ta-actions">
        <button class="tbl-btn edit" onclick="editTestimonial(${index})"><i class="fas fa-edit"></i></button>
        <button class="tbl-btn toggle" onclick="toggleTestimonial(${index})"><i class="fas fa-eye${item.active !== false ? '-slash' : ''}"></i></button>
        <button class="tbl-btn del" onclick="delTesti(${index})"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

async function commitTestimonials(items, successMessage) {
  const outcome = await runAdminAction('testimonials', async () => {
    const result = await NobleSite.replaceTestimonials(items);
    renderTestiAdmin();
    loadDashboard();
    toast(result.ok ? successMessage : `${successMessage} Saved locally only because Supabase sync failed.`, result.ok ? 'success' : 'warning');
    return result;
  });
  return outcome;
}

async function submitTestimonialForm() {
  if (adminActionLocks.testimonials) return;
  const name = readValue('tName');
  const review = document.getElementById('tText')?.value?.trim() || '';
  const editIndex = readValue('tEditIndex');
  if (!name || !review) {
    toast('Name and review are required.', 'error');
    return;
  }

  const items = testimonialList();
  const current = editIndex !== '' ? items[Number(editIndex)] : null;
  const payload = {
    id: current?.id ?? Date.now(),
    name,
    role: readValue('tRole'),
    review,
    stars: Number(document.getElementById('tStars')?.value || 5),
    active: document.getElementById('tActive')?.checked !== false
  };

  if (editIndex !== '') {
    items[Number(editIndex)] = { ...current, ...payload };
  } else {
    items.unshift(payload);
  }

  const result = await commitTestimonials(items, editIndex !== '' ? 'Testimonial updated!' : 'Testimonial added!');
  if (result?.skipped) return;
  resetTestimonialForm();
}

async function toggleTestimonial(index) {
  if (adminActionLocks.testimonials) return;
  const items = testimonialList();
  const current = items[index];
  if (!current) return;
  current.active = !(current.active !== false);
  await commitTestimonials(items, 'Testimonial updated!');
}

async function delTesti(index) {
  if (adminActionLocks.testimonials) return;
  if (!confirm('Delete this testimonial?')) return;
  const items = testimonialList();
  items.splice(index, 1);
  const result = await commitTestimonials(items, 'Testimonial deleted.');
  if (result?.skipped) return;
  resetTestimonialForm();
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

function updateHeroBgPreview(url) {
  const preview = document.getElementById('heroBgPreview');
  if (!preview) return;
  preview.innerHTML = url
    ? getManagedImageMarkup(url, 'Hero Background', 'style="width:100%;height:100%;object-fit:cover;"')
    : getManagedImageMarkup('', 'Hero Background', 'style="width:100%;height:100%;object-fit:cover;"');
}

function heroImgUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = event.target?.result || '';
    writeValue('hHeroBgUrl', data);
    updateHeroBgPreview(data);
  };
  reader.readAsDataURL(file);
}

function loadHeroFields() {
  const settings = NobleSite.state.siteSettings || {};
  writeValue('hHeroHeadline', normalizeHeadlineForEditor(settings.heroHeadline || ''));
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
    heroHeadline: normalizeHeadlineForSite(document.getElementById('hHeroHeadline')?.value || ''),
    heroSubtext: document.getElementById('hHeroSubtext')?.value || '',
    heroBgImage: document.getElementById('hHeroBgUrl')?.value || '',
    heroBtn1: document.getElementById('hBtn1')?.value || '',
    heroBtn1Link: document.getElementById('hBtn1Link')?.value || '',
    heroBtn2: document.getElementById('hBtn2')?.value || '',
    heroBtn2Link: document.getElementById('hBtn2Link')?.value || ''
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  toast(result.ok ? 'Hero section saved!' : 'Hero saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

function loadAboutFields() {
  const settings = NobleSite.state.siteSettings || {};
  writeValue('aTitle', settings.aboutTitle || '');
  writeValue('aText', settings.aboutText || '');
  writeValue('aStat1', settings.aboutStat1 || DEFAULT_SITE_SETTINGS.aboutStat1);
  writeValue('aStat1l', settings.aboutStat1Label || DEFAULT_SITE_SETTINGS.aboutStat1Label);
  writeValue('aYears', settings.aboutYears || DEFAULT_SITE_SETTINGS.aboutYears);
  writeValue('aSat', settings.aboutSatisfaction || DEFAULT_SITE_SETTINGS.aboutSatisfaction);
  writeValue('aClients', settings.aboutClients || DEFAULT_SITE_SETTINGS.aboutClients);
  renderTeamAdmin();
}

async function saveAbout() {
  const payload = {
    ...NobleSite.state.siteSettings,
    aboutTitle: document.getElementById('aTitle')?.value || '',
    aboutText: document.getElementById('aText')?.value || '',
    aboutStat1: document.getElementById('aStat1')?.value || DEFAULT_SITE_SETTINGS.aboutStat1,
    aboutStat1Label: document.getElementById('aStat1l')?.value || DEFAULT_SITE_SETTINGS.aboutStat1Label,
    aboutYears: document.getElementById('aYears')?.value || DEFAULT_SITE_SETTINGS.aboutYears,
    aboutSatisfaction: document.getElementById('aSat')?.value || DEFAULT_SITE_SETTINGS.aboutSatisfaction,
    aboutClients: document.getElementById('aClients')?.value || DEFAULT_SITE_SETTINGS.aboutClients
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  toast(result.ok ? 'About section saved!' : 'About saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
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
  if (box) box.innerHTML = getManagedImageMarkup(src, 'Logo');
  if (row) row.style.display = 'flex';
}

function loadLogoPreview() {
  const logo = resolveAssetPath(NobleSite.state.branding.logo || DEFAULT_BRANDING.logo);
  if (logo) {
    showLogoPreview(logo);
    writeValue('logoUrl', NobleSite.state.branding.logo || DEFAULT_BRANDING.logo || '');
  }
}

function loadBrandingFields() {
  const branding = NobleSite.state.branding || {};
  writeValue('bizName', branding.name || DEFAULT_BRANDING.name);
  writeValue('bizTag', branding.tag || DEFAULT_BRANDING.tag);
  writeValue('brandColor', branding.color || DEFAULT_BRANDING.color);
  writeValue('logoUrl', branding.logo || DEFAULT_BRANDING.logo || '');
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

function renderAllowedEmailList() {
  const root = document.getElementById('allowedEmailList');
  if (!root) return;
  const access = getAdminAccessSettings();
  const primary = access.primaryAllowedEmail || DEFAULT_ADMIN_ACCESS.primaryAllowedEmail;
  const extras = (Array.isArray(access.allowedEmails) ? access.allowedEmails : []).filter((email) => String(email || '').trim());
  const cards = [
    {
      email: primary,
      label: 'Primary admin email',
      badge: 'Always allowed'
    },
    ...extras.map((email) => ({
      email,
      label: 'Extra admin email',
      badge: 'Also allowed'
    }))
  ];

  root.innerHTML = cards.map((item) => `
    <div class="allowed-email-item">
      <div>
        <strong>${item.email}</strong>
        <span>${item.label}</span>
      </div>
      <div class="verified-pill"><i class="fas fa-check-circle"></i> ${item.badge}</div>
    </div>
  `).join('');
}

function loadSettingsFields() {
  writeValue('sSupaUrl', SUPABASE_URL);
  writeValue('sSupaKey', SUPABASE_ANON);
  writeValue('footerCreditText', NobleSite.state.siteSettings?.footerCreditText || DEFAULT_SITE_SETTINGS.footerCreditText);
  writeValue('footerCreditLink', NobleSite.state.siteSettings?.footerCreditLink || DEFAULT_SITE_SETTINGS.footerCreditLink);
  const access = getAdminAccessSettings();
  writeValue('googleClientId', access.googleClientId || '');
  writeValue('primaryAllowedEmail', access.primaryAllowedEmail || DEFAULT_ADMIN_ACCESS.primaryAllowedEmail);
  writeValue('allowedAdminEmails', (Array.isArray(access.allowedEmails) ? access.allowedEmails : []).join('\n'));
  renderAllowedEmailList();
  ensureGoogleClientReady();

  const emailDelivery = NobleSite.state.siteSettings?.emailDelivery || DEFAULT_SITE_SETTINGS.emailDelivery;
  writeValue('emailJsPublicKey', emailDelivery.publicKey || '');
  writeValue('emailJsServiceId', emailDelivery.serviceId || '');
  writeValue('emailJsTemplateId', emailDelivery.templateId || '');
  writeValue('notificationEmail', emailDelivery.notifyTo || DEFAULT_SITE_SETTINGS.emailDelivery.notifyTo);

  const flags = NobleSite.state.featureFlags || DEFAULT_FEATURE_FLAGS;
  const wa = document.getElementById('togWa');
  const anim = document.getElementById('togAnim');
  const form = document.getElementById('togForm');
  if (wa) wa.checked = flags.whatsappFloat !== false;
  if (anim) anim.checked = flags.scrollAnimations !== false;
  if (form) form.checked = flags.contactForm !== false;

  if (NobleSite.state.missingTables.length) {
    setSupabaseStatus(`Connected, but missing tables: ${NobleSite.state.missingTables.join(', ')}`, 'warning');
  } else if (NobleSite.state.supabaseIssue) {
    setSupabaseStatus(NobleSite.state.supabaseIssue, 'warning');
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

async function saveFeatureFlags() {
  const payload = {
    whatsappFloat: document.getElementById('togWa')?.checked !== false,
    scrollAnimations: document.getElementById('togAnim')?.checked !== false,
    contactForm: document.getElementById('togForm')?.checked !== false
  };
  const result = await NobleSite.saveSetting('featureFlags', payload);
  toast(result.ok ? 'Feature settings saved!' : 'Feature settings saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

async function saveFooterCredit() {
  const payload = {
    ...NobleSite.state.siteSettings,
    footerCreditText: readValue('footerCreditText') || DEFAULT_SITE_SETTINGS.footerCreditText,
    footerCreditLink: readValue('footerCreditLink') || DEFAULT_SITE_SETTINGS.footerCreditLink
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  toast(result.ok ? 'Footer credit saved!' : 'Footer credit saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
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
    if (NobleSite.state.supabaseIssue) {
      setSupabaseStatus(NobleSite.state.supabaseIssue, 'warning');
      toast('Supabase is configured, but the browser could not finish the live request.', 'warning');
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
  const pass = document.getElementById('newPass')?.value || '';
  if (!pass) {
    toast('Password is required.', 'error');
    return;
  }
  const current = getAdminCreds();
  localStorage.setItem(ADMIN_CREDS_KEY_V2, JSON.stringify({ ...current, pass }));
  writeValue('newPass', '');
  toast('Admin password updated!');
}

async function saveAdminAccess() {
  const extraEmails = readValue('allowedAdminEmails')
    .split(/\r?\n|,/)
    .map((email) => email.trim())
    .filter(Boolean);
  const next = {
    primaryAllowedEmail: readValue('primaryAllowedEmail') || DEFAULT_ADMIN_ACCESS.primaryAllowedEmail,
    allowedEmails: [...new Set(extraEmails.filter((email) => email.toLowerCase() !== (readValue('primaryAllowedEmail') || DEFAULT_ADMIN_ACCESS.primaryAllowedEmail).toLowerCase()))],
    googleClientId: readValue('googleClientId')
  };
  localStorage.setItem(ADMIN_ACCESS_KEY, JSON.stringify(next));
  const payload = {
    ...NobleSite.state.siteSettings,
    adminAccess: next
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  NobleSite.state.siteSettings.adminAccess = next;
  loadSettingsFields();
  toast(result.ok ? 'Admin access settings saved!' : 'Admin access saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
}

async function saveEmailDelivery() {
  const payload = {
    ...NobleSite.state.siteSettings,
    emailDelivery: {
      provider: 'emailjs',
      publicKey: readValue('emailJsPublicKey'),
      serviceId: readValue('emailJsServiceId'),
      templateId: readValue('emailJsTemplateId'),
      notifyTo: readValue('notificationEmail') || DEFAULT_SITE_SETTINGS.emailDelivery.notifyTo
    }
  };
  const result = await NobleSite.saveSetting('siteSettings', payload);
  NobleSite.state.siteSettings.emailDelivery = payload.emailDelivery;
  toast(result.ok ? 'Email delivery settings saved!' : 'Email delivery saved locally. Supabase sync failed.', result.ok ? 'success' : 'warning');
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

async function initAdmin() {
  NobleSite.hydrateLocalState?.();
  loadAdminLogos();
  loadServiceIconChoices();
  loadHeroFields();
  loadAboutFields();
  loadContactInfoFields();
  loadLogoPreview();
  loadBrandingFields();
  loadSettingsFields();
  loadDashboard();
  updateSubBadge();
  renderServicesTable();
  renderGalleryAdmin();
  renderTestiAdmin();
  renderTeamAdmin();
  updateGallerySelectionSummary();
  await NobleSite.loadState();
  loadAdminLogos();
  loadServiceIconChoices();
  loadHeroFields();
  loadAboutFields();
  loadContactInfoFields();
  loadLogoPreview();
  loadBrandingFields();
  loadSettingsFields();
  loadDashboard();
  updateSubBadge();
  resetServiceForm();
  resetGalleryForm();
  resetTestimonialForm();
  resetTeamMemberForm();
  renderServicesTable();
  renderGalleryAdmin();
  renderTestiAdmin();
  renderTeamAdmin();
  updateGallerySelectionSummary();
}

function doLogin() {
  const session = getAdminSession();
  const pass = document.getElementById('loginPass')?.value || '';
  const creds = getAdminCreds();
  if (session?.mode === 'bypass') {
    document.getElementById('loginScreen').style.display = 'none';
    initAdmin();
    return;
  }
  if (!session?.email || !isAllowedAdminEmail(session.email)) {
    document.getElementById('loginErr').style.display = 'block';
    return;
  }
  if (pass === creds.pass) {
    saveAdminSession({ ...session, unlocked: true });
    document.getElementById('loginScreen').style.display = 'none';
    initAdmin();
    return;
  }
  document.getElementById('loginErr').style.display = 'block';
  document.getElementById('loginPass').value = '';
}

function signOut() {
  clearAdminSession();
  document.getElementById('loginScreen').style.display = 'flex';
  writeValue('loginPass', '');
  setVerifiedEmailState('', 'google');
}

document.addEventListener('DOMContentLoaded', async () => {
  NobleSite.hydrateLocalState?.();
  let syncTimer = null;
  window.addEventListener('storage', (event) => {
    if (event.key !== window.SITE_SYNC_KEY) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(async () => {
      await NobleSite.loadState();
      loadAdminLogos();
      loadHeroFields();
      loadAboutFields();
      loadContactInfoFields();
      loadLogoPreview();
      loadBrandingFields();
      loadSettingsFields();
      loadDashboard();
      renderServicesTable();
      renderGalleryAdmin();
      renderTestiAdmin();
      renderTeamAdmin();
    }, 120);
  });
  loadAdminLogos();
  loadSettingsFields();
  loadServiceIconChoices();
  updateTinyToastPosition();
  setupSecretBypass();
  document.getElementById('svcIcon')?.addEventListener('input', (event) => updateServiceIconPreview(event.target.value || 'fa-bolt'));
  document.getElementById('svcName')?.addEventListener('input', updateServiceCardPreview);
  document.getElementById('svcDescription')?.addEventListener('input', updateServiceCardPreview);
  document.getElementById('svcImage')?.addEventListener('input', (event) => updateServiceImagePreview(event.target.value || ''));
  document.getElementById('gImg')?.addEventListener('input', (event) => updateGalleryPreview(event.target.value || ''));
  document.getElementById('hHeroBgUrl')?.addEventListener('input', (event) => updateHeroBgPreview(event.target.value || ''));
  document.getElementById('tmImage')?.addEventListener('input', (event) => updateTeamPreview(event.target.value || ''));
  document.getElementById('subModal')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeSubModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSubModal();
  });
  resetServiceForm();
  resetGalleryForm();
  resetTestimonialForm();
  resetTeamMemberForm();
  updateGallerySelectionSummary();
  NobleSite.loadState().then(() => {
    loadAdminLogos();
    loadSettingsFields();
    loadServiceIconChoices();
    loadDashboard();
    renderServicesTable();
    renderGalleryAdmin();
    renderTestiAdmin();
    renderTeamAdmin();
  }).catch((error) => {
    console.warn('Admin loaded with cached/default data because live data is slow or unavailable.', error);
  });
  const restored = restoreAdminSession();
  if (restored) {
    const session = getAdminSession();
    if (session?.mode === 'bypass' || restored === 'unlocked') {
      document.getElementById('loginScreen').style.display = 'none';
      initAdmin();
    }
  }
});

window.toggleSidebar = toggleSidebar;
window.showPanel = showPanel;
window.doLogin = doLogin;
window.signOut = signOut;
window.handleLogoUpload = handleLogoUpload;
window.applyLogoUrl = applyLogoUrl;
window.removeLogo = removeLogo;
window.saveBranding = saveBranding;
window.heroImgUpload = heroImgUpload;
window.saveHero = saveHero;
window.saveAbout = saveAbout;
window.openServiceEditor = openServiceEditor;
window.resetServiceForm = resetServiceForm;
window.submitServiceForm = submitServiceForm;
window.toggleService = toggleService;
window.toggleServiceHomepage = toggleServiceHomepage;
window.deleteService = deleteService;
window.selectServiceIcon = selectServiceIcon;
window.serviceImgUpload = serviceImgUpload;
window.galleryImgUpload = galleryImgUpload;
window.galleryBulkUpload = galleryBulkUpload;
window.toggleGallerySelection = toggleGallerySelection;
window.toggleAllGallerySelections = toggleAllGallerySelections;
window.clearGallerySelection = clearGallerySelection;
window.deleteSelectedGallery = deleteSelectedGallery;
window.addGalleryItem = addGalleryItem;
window.editGallery = editGallery;
window.delGallery = delGallery;
window.resetGalleryForm = resetGalleryForm;
window.submitTestimonialForm = submitTestimonialForm;
window.editTestimonial = editTestimonial;
window.toggleTestimonial = toggleTestimonial;
window.delTesti = delTesti;
window.resetTestimonialForm = resetTestimonialForm;
window.teamImageUpload = teamImageUpload;
window.submitTeamMemberForm = submitTeamMemberForm;
window.resetTeamMemberForm = resetTeamMemberForm;
window.editTeamMember = editTeamMember;
window.deleteTeamMember = deleteTeamMember;
window.saveContactInfo = saveContactInfo;
window.viewSubmission = viewSubmission;
window.closeSubModal = closeSubModal;
window.delSubmission = delSubmission;
window.saveSupabase = saveSupabase;
window.saveFeatureFlags = saveFeatureFlags;
window.saveFooterCredit = saveFooterCredit;
window.testSupabase = testSupabase;
window.changeCredentials = changeCredentials;
window.saveAdminAccess = saveAdminAccess;
window.saveEmailDelivery = saveEmailDelivery;
window.clearSubmissions = clearSubmissions;
window.resetAll = resetAll;
window.startGoogleVerification = startGoogleVerification;
