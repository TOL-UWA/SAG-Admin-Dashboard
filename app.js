/* =============================================
   SheCode Africa Admin — Application Logic
   ============================================= */

// ---- DATA GENERATION ----
const COURSES = ['Coding With Scratch', 'Game Development', 'Robotics'];
const COUNTRIES = ['Nigeria', 'Ghana', 'Kenya', 'Uganda', 'Rwanda'];
const AGE_RANGES = ['10-13', '14-17', '18-21'];
const FIRST_NAMES = ['Amara','Zara','Fatima','Nkechi','Chioma','Aisha','Imani','Yewande','Sade','Kemi','Bola','Ngozi','Ada','Temi','Funmi','Ola','Bisi','Dayo','Fola','Tope'];
const LAST_NAMES = ['Okonkwo','Ahmed','Mensah','Kamau','Wanjiku','Ibrahim','Owusu','Adeyemi','Bello','Chukwu','Maina','Eze','Osei','Asante','Diallo','Kofi','Nwosu','Abubakar','Okafor','Dlamini'];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randDate(daysBack = 180) {
  const d = new Date();
  d.setDate(d.getDate() - randInt(0, daysBack));
  return d.toISOString().split('T')[0];
}

// Generate participants (Age 10-21, No Draft, Completed + Currently Enrolled support)
const participants = Array.from({ length: 120 }, (_, i) => {
  const fn = rand(FIRST_NAMES), ln = rand(LAST_NAMES);
  // Status is Active, Completed or Inactive (~12% Inactive, no Draft)
  const statusRoll = Math.random();
  const status = statusRoll < 0.12 ? 'Inactive' : statusRoll < 0.65 ? 'Active' : 'Completed';
  // Age is strictly 10 to 21
  const ageNum = randInt(10, 21);
  const ageRange = ageNum <= 13 ? '10-13' : ageNum <= 17 ? '14-17' : '18-21';
  const under18 = ageNum < 18;

  // Course progression: Student enrolled in a course, and may have completed a prior one
  const currentCourse = rand(COURSES);
  let completedCourse = null;
  let completedCourseDate = null;

  if (status !== 'Completed') {
    // ~45% of active (or inactive) students have previously completed another course and are now enrolled in this one
    if (Math.random() < 0.45) {
      const otherCourses = COURSES.filter(c => c !== currentCourse);
      completedCourse = rand(otherCourses);
      completedCourseDate = randDate(150);
    }
  } else {
    // Completed status: completed this course, ~25% had also completed a prior one
    if (Math.random() < 0.25) {
      const otherCourses = COURSES.filter(c => c !== currentCourse);
      completedCourse = rand(otherCourses);
      completedCourseDate = randDate(240);
    }
  }

  return {
    id: i + 1,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${randInt(1,99)}@email.com`,
    course: currentCourse,
    completedCourse: completedCourse,
    completedCourseDate: completedCourseDate,
    age: ageRange,
    ageNum: ageNum,
    country: rand(COUNTRIES),
    status, // 'Active', 'Completed' or 'Inactive'
    enrolledDate: randDate(120),
    completionDate: status === 'Completed' ? randDate(45) : null,
    completion: status === 'Completed' ? 100 : randInt(15, 95),
    under18,
  };
});

// Consent records — learners under 18 (strictly Active or Inactive account status)
const consentRecords = participants
  .filter(p => p.under18)
  .map((p, idx) => {
    const isPending = idx < 12 || Math.random() < 0.15;
    const consentStatus = isPending ? 'Pending' : 'Approved';
    return {
      ...p,
      guardianEmail: `parent.${p.name.split(' ')[1].toLowerCase()}@email.com`,
      consentStatus: consentStatus,
      consentTimestamp: randDate(45),
      // Account status strictly 'Active' or 'Inactive'
      accountStatus: consentStatus === 'Approved' ? 'Active' : 'Inactive',
    };
  });

// ---- STATE ----
let consentCurrentPage = 1;
const consentPerPage = 8;
let currentConsentFilterState = 'all';
let filteredConsent = [...consentRecords];

let partCurrentPage = 1;
const partPerPage = 10;
let filteredParticipants = [...participants];

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderConsentTable();
  renderParticipantsTable();

  // Close filter popover when clicking outside
  document.addEventListener('click', (e) => {
    const popover = document.getElementById('consentFilterPopover');
    const filterBtn = document.getElementById('consentFilterBtn');
    if (popover && popover.classList.contains('open')) {
      if (!popover.contains(e.target) && !filterBtn.contains(e.target)) {
        popover.classList.remove('open');
      }
    }

    const partPopover = document.getElementById('partFilterPopover');
    const partFilterBtn = document.getElementById('partFilterBtn');
    if (partPopover && partPopover.classList.contains('open')) {
      if (!partPopover.contains(e.target) && !partFilterBtn.contains(e.target)) {
        partPopover.classList.remove('open');
      }
    }
  });
});

// ---- STEM A GIRL TOGGLE MENU ----
function toggleStemMenu(e) {
  if (e) e.stopPropagation();
  const submenu = document.getElementById('stemSubmenu');
  const toggleBtn = document.getElementById('stemToggleBtn');
  if (!submenu || !toggleBtn) return;

  const isHidden = submenu.classList.toggle('hidden');
  toggleBtn.classList.toggle('collapsed', isHidden);
}

// ---- NAVIGATION ----
function navigateTo(page, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.stem-subitem').forEach(n => n.classList.remove('active'));
  const stemParent = document.getElementById('stemNavParent');
  if (stemParent) stemParent.classList.remove('active');

  if (el) {
    el.classList.add('active');
  }

  if (['consent', 'participants', 'courses'].includes(page)) {
    if (stemParent) stemParent.classList.add('active');
    const subItem = document.querySelector(`.stem-subitem[data-page="${page}"]`);
    if (subItem) subItem.classList.add('active');
  } else {
    const mainItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (mainItem) mainItem.classList.add('active');
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
  } else {
    const generic = document.getElementById('page-generic');
    if (generic) {
      generic.classList.add('active');
      const titleEl = document.getElementById('genericPageTitle');
      if (titleEl) {
        titleEl.textContent = page.charAt(0).toUpperCase() + page.slice(1);
      }
    }
  }

  if (window.innerWidth < 900) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ---- FILTER POPOVER (MATCHING IMAGE 1) ----
function toggleFilterPopover(e) {
  if (e) e.stopPropagation();
  const popover = document.getElementById('consentFilterPopover');
  if (!popover) return;
  popover.classList.toggle('open');
}

function toggleSelectMenu(e) {
  if (e) e.stopPropagation();
  const opts = document.getElementById('filterSelectOptions');
  if (!opts) return;
  opts.style.display = opts.style.display === 'none' ? 'flex' : 'none';
}

function selectStateFilter(val, label, el) {
  currentConsentFilterState = val;

  // Update label
  const curLabel = document.getElementById('currentFilterValue');
  if (curLabel) curLabel.textContent = label;

  // Update active option style
  document.querySelectorAll('.filter-select-opt').forEach(opt => opt.classList.remove('active'));
  if (el) el.classList.add('active');

  // Close popover
  const popover = document.getElementById('consentFilterPopover');
  if (popover) popover.classList.remove('open');

  // Trigger filtering
  filterConsentTable();
}

// ---- CONSENT TABLE RENDERING ----
function filterConsentTable() {
  const query = (document.getElementById('consentSearch')?.value || '').toLowerCase().trim();

  filteredConsent = consentRecords.filter(r => {
    if (query) {
      const matchName = r.name.toLowerCase().includes(query);
      const matchEmail = r.guardianEmail.toLowerCase().includes(query);
      const matchUser = r.name.toLowerCase().replace(' ', '_').includes(query);
      if (!matchName && !matchEmail && !matchUser) return false;
    }
    if (currentConsentFilterState !== 'all' && r.consentStatus !== currentConsentFilterState) {
      return false;
    }
    return true;
  });

  consentCurrentPage = 1;
  renderConsentTable();
}

function renderConsentTable() {
  const tbody = document.getElementById('consentTableBody');
  const countEl = document.getElementById('consentCount');
  if (!tbody) return;

  const pendingCount = filteredConsent.filter(r => r.consentStatus === 'Pending').length;
  if (countEl) {
    countEl.textContent = `${pendingCount} pending consent(s)`;
  }

  const totalPages = Math.max(1, Math.ceil(filteredConsent.length / consentPerPage));
  if (consentCurrentPage > totalPages) consentCurrentPage = totalPages;
  const start = (consentCurrentPage - 1) * consentPerPage;
  const pageItems = filteredConsent.slice(start, start + consentPerPage);

  const indicator = document.getElementById('consentPageIndicator');
  if (indicator) indicator.textContent = `Page ${consentCurrentPage} / ${totalPages}`;
  const prevBtn = document.getElementById('consentPrevBtn');
  if (prevBtn) prevBtn.disabled = consentCurrentPage <= 1;
  const nextBtn = document.getElementById('consentNextBtn');
  if (nextBtn) nextBtn.disabled = consentCurrentPage >= totalPages;

  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:36px;color:var(--text-secondary);">No consent records match your query.</td></tr>`;
    return;
  }

  tbody.innerHTML = pageItems.map(r => {
    const consentBadge = r.consentStatus === 'Approved'
      ? '<span class="state-badge state-badge--success">approved</span>'
      : r.consentStatus === 'Pending'
      ? '<span class="state-badge state-badge--pending">pending</span>'
      : '<span class="state-badge state-badge--inactive">deactivated</span>';

    // Account status is strictly 'Active' or 'Inactive'
    const accountBadge = r.accountStatus === 'Active'
      ? '<span class="pill-account pill-account--active">active</span>'
      : '<span class="pill-account pill-account--inactive">inactive</span>';

    return `
      <tr>
        <!-- Name alone without any initials badge or label (Requirement 2) -->
        <td><span class="td-user-name">${r.name}</span></td>
        <td><span class="td-username">${r.name.toLowerCase().replace(' ', '_')}</span></td>
        <td><span class="td-age">${r.ageNum}</span></td>
        <td><span class="td-email">${r.guardianEmail}</span></td>
        <td>${consentBadge}</td>
        <td>${accountBadge}</td>
        <td class="td-date">${formatDate(r.consentTimestamp)}</td>
        <!-- Action section: Eye icon and Pen icon alone (Requirement 3) -->
        <td>
          <div class="action-cell">
            <button class="action-icon-btn" onclick="openDrawer('view', ${r.id})" title="View Details">
              <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5z" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="8" r="2.2" stroke="currentColor" stroke-width="1.4"/></svg>
            </button>
            <button class="action-icon-btn" onclick="openDrawer('edit', ${r.id})" title="Edit / Manage">
              <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5a1.8 1.8 0 012.5 2.5L5.5 13.5l-3.5 1 1-3.5 8.5-8.5z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function prevConsentPage() {
  if (consentCurrentPage > 1) {
    consentCurrentPage--;
    renderConsentTable();
  }
}

function nextConsentPage() {
  const totalPages = Math.ceil(filteredConsent.length / consentPerPage);
  if (consentCurrentPage < totalPages) {
    consentCurrentPage++;
    renderConsentTable();
  }
}

// ---- SIDE SHEET DRAWER (MATCHING IMAGE 4) ----
function openDrawer(mode, id) {
  const r = consentRecords.find(item => item.id === id);
  if (!r) return;

  const backdrop = document.getElementById('drawerBackdrop');
  const drawer = document.getElementById('sideDrawer');
  const tag = document.getElementById('drawerTag');
  const title = document.getElementById('drawerTitle');
  const subtitle = document.getElementById('drawerSubtitle');
  const body = document.getElementById('drawerBody');
  const footer = document.getElementById('drawerFooter');
  if (!drawer || !body) return;

  // Set tag
  if (tag) {
    tag.textContent = r.consentStatus;
    tag.className = 'drawer-tag ' + (
      r.consentStatus === 'Approved' ? 'state-badge--success' :
      r.consentStatus === 'Pending' ? 'state-badge--pending' : 'state-badge--inactive'
    );
  }

  // Set titles
  if (title) title.textContent = r.name;
  if (subtitle) {
    subtitle.textContent = mode === 'edit'
      ? 'Edit consent compliance and account status'
      : 'Guardian consent details and learner records';
  }

  if (mode === 'view') {
    // VIEW MODE
    body.innerHTML = `
      <div class="drawer-card-block">
        <span class="drawer-card-title">Learner Profile</span>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Full Name</span>
          <span class="drawer-field-value">${r.name}</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Username</span>
          <span class="drawer-field-value" style="font-family:monospace;">${r.name.toLowerCase().replace(' ', '_')}</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Age</span>
          <span class="drawer-field-value">${r.ageNum} years old</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Current Course</span>
          <span class="drawer-field-value" style="font-weight:500;">${r.course} (${r.completion}%)</span>
        </div>
        ${r.completedCourse ? `
          <div class="drawer-field-row">
            <span class="drawer-field-label">Prior Completion</span>
            <span class="drawer-field-value" style="color:#15803D;font-weight:500;">
              ✓ Completed: ${r.completedCourse} (${formatDate(r.completedCourseDate)})
            </span>
          </div>
        ` : ''}
      </div>

      <div class="drawer-card-block">
        <span class="drawer-card-title">Guardian Information</span>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Guardian Email</span>
          <span class="drawer-field-value">${r.guardianEmail}</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Submission Date</span>
          <span class="drawer-field-value">${formatDate(r.consentTimestamp)}</span>
        </div>
      </div>

      <div class="drawer-card-block">
        <span class="drawer-card-title">Compliance & Verification</span>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Consent Status</span>
          <span class="drawer-field-value">${r.consentStatus}</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Account Status</span>
          <span class="drawer-field-value" style="font-weight:600;color:${r.accountStatus === 'Active' ? '#16A34A' : '#DC2626'};">${r.accountStatus}</span>
        </div>
      </div>
    `;

    footer.innerHTML = `
      ${r.consentStatus === 'Pending' ? `
        <button class="btn-deactivate" onclick="drawerDeactivateAccount(${r.id})">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          Deactivate Account
        </button>
      ` : ''}
      <button class="btn-filter" onclick="openDrawer('edit', ${r.id})">Edit Status</button>
      <button class="btn-filter" onclick="closeDrawer()">Close</button>
    `;
  } else {
    // EDIT MODE
    body.innerHTML = `
      <div class="drawer-card-block">
        <span class="drawer-card-title">Learner</span>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Name</span>
          <span class="drawer-field-value">${r.name}</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Guardian</span>
          <span class="drawer-field-value">${r.guardianEmail}</span>
        </div>
        <div class="drawer-field-row">
          <span class="drawer-field-label">Current Course</span>
          <span class="drawer-field-value">${r.course}</span>
        </div>
        ${r.completedCourse ? `
          <div class="drawer-field-row">
            <span class="drawer-field-label">Prior Completion</span>
            <span class="drawer-field-value" style="color:#15803D;">✓ Completed: ${r.completedCourse}</span>
          </div>
        ` : ''}
      </div>

      <div class="drawer-card-block" style="background:#FFFFFF;border:1px solid #E5E7EB;">
        <span class="drawer-card-title" style="color:#111317;">Update Status</span>
        <div class="form-group" style="margin-top:6px;">
          <label class="form-label">Consent Status</label>
          <select class="form-input" id="drawerConsentSelect">
            <option value="Approved" ${r.consentStatus === 'Approved' ? 'selected' : ''}>Approved</option>
            <option value="Pending" ${r.consentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Deactivated" ${r.consentStatus === 'Deactivated' ? 'selected' : ''}>Deactivated</option>
          </select>
        </div>
        <div class="form-group" style="margin-top:10px;">
          <label class="form-label">Account Status</label>
          <!-- Strictly Active or Inactive (Requirement 3) -->
          <select class="form-input" id="drawerAccountSelect">
            <option value="Active" ${r.accountStatus === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Inactive" ${r.accountStatus === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
      </div>

      ${r.consentStatus === 'Pending' ? `
        <div class="drawer-card-block" style="background:#FFF1F2;border-color:#FECDD3;">
          <span class="drawer-card-title" style="color:#E11D48;">Admin Action</span>
          <p style="font-size:12.5px;color:#4B5563;margin-top:2px;">
            Learner has pending consent. You can deactivate this account immediately to restrict platform access.
          </p>
          <button class="btn-deactivate" style="margin-top:8px;align-self:flex-start;" onclick="drawerDeactivateAccount(${r.id})">
            Deactivate Account
          </button>
        </div>
      ` : ''}
    `;

    footer.innerHTML = `
      <button class="btn-filter" onclick="openDrawer('view', ${r.id})">Cancel</button>
      <button class="btn-export" onclick="saveDrawerChanges(${r.id})">Save Changes</button>
    `;
  }

  if (backdrop) backdrop.classList.add('open');
  drawer.classList.add('open');
}

function closeDrawer() {
  const backdrop = document.getElementById('drawerBackdrop');
  const drawer = document.getElementById('sideDrawer');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function saveDrawerChanges(id) {
  const r = consentRecords.find(item => item.id === id);
  if (!r) return;

  const cVal = document.getElementById('drawerConsentSelect')?.value;
  const aVal = document.getElementById('drawerAccountSelect')?.value;

  if (cVal) r.consentStatus = cVal;
  if (aVal) r.accountStatus = aVal;

  renderConsentTable();
  closeDrawer();
  showToast(`✅ Record updated for ${r.name}.`);
}

function drawerDeactivateAccount(id) {
  const r = consentRecords.find(item => item.id === id);
  if (r) {
    r.accountStatus = 'Inactive';
    r.consentStatus = 'Deactivated';
    renderConsentTable();
    closeDrawer();
    showToast(`🚫 Account deactivated for ${r.name}.`);
  }
}

// Side drawer for Testimonials
function showDrawerDetails(name, role, text, state, date) {
  const backdrop = document.getElementById('drawerBackdrop');
  const drawer = document.getElementById('sideDrawer');
  const tag = document.getElementById('drawerTag');
  const title = document.getElementById('drawerTitle');
  const subtitle = document.getElementById('drawerSubtitle');
  const body = document.getElementById('drawerBody');
  const footer = document.getElementById('drawerFooter');
  if (!drawer || !body) return;

  if (tag) {
    tag.textContent = state;
    tag.className = 'drawer-tag state-badge--pending';
  }
  if (title) title.textContent = name;
  if (subtitle) subtitle.textContent = `${role} — SheCode Africa Mentorship`;

  body.innerHTML = `
    <div class="drawer-card-block">
      <span class="drawer-card-title">Testimonial Entry</span>
      <div class="drawer-field-row">
        <span class="drawer-field-label">Author</span>
        <span class="drawer-field-value">${name}</span>
      </div>
      <div class="drawer-field-row">
        <span class="drawer-field-label">Role</span>
        <span class="drawer-field-value">${role}</span>
      </div>
      <div class="drawer-field-row">
        <span class="drawer-field-label">State</span>
        <span class="drawer-field-value">${state}</span>
      </div>
      <div class="drawer-field-row">
        <span class="drawer-field-label">Updated</span>
        <span class="drawer-field-value">${date}</span>
      </div>
    </div>

    <div class="drawer-card-block" style="background:#FFFFFF;border:1px solid #E5E7EB;">
      <span class="drawer-card-title" style="color:#111317;">Feedback</span>
      <p style="font-size:13.5px;color:#374151;line-height:1.6;margin-top:6px;">
        "${text}"
      </p>
    </div>
  `;

  footer.innerHTML = `
    <button class="btn-filter" onclick="closeDrawer()">Close</button>
  `;

  if (backdrop) backdrop.classList.add('open');
  drawer.classList.add('open');
}

// ---- PARTICIPANTS TABLE (WITH COUNTRY) ----
function togglePartFilterPopover(e) {
  if (e) e.stopPropagation();
  const popover = document.getElementById('partFilterPopover');
  if (!popover) return;
  popover.classList.toggle('open');
}

// Returns the [from, to] YYYY-MM-DD bounds for the Enrolled filter ('' = unbounded)
function getEnrolledRange(preset) {
  const isoDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    // Local calendar date, so "Today" matches the admin's own clock
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const today = isoDaysAgo(0);

  if (preset === 'today') return [today, today];
  if (preset === '7d') return [isoDaysAgo(6), today];
  if (preset === '30d') return [isoDaysAgo(29), today];
  if (preset === 'quarter') {
    const now = new Date();
    const qMonth = Math.floor(now.getMonth() / 3) * 3 + 1;
    return [`${now.getFullYear()}-${String(qMonth).padStart(2, '0')}-01`, today];
  }
  if (preset === 'custom') {
    return [
      document.getElementById('filterDateFrom')?.value || '',
      document.getElementById('filterDateTo')?.value || '',
    ];
  }
  return ['', ''];
}

function applyFilters() {
  const course = document.getElementById('filterCourse')?.value || '';
  const age = document.getElementById('filterAge')?.value || '';
  const country = document.getElementById('filterCountry')?.value || '';
  const status = document.getElementById('filterStatus')?.value || '';
  const enrolled = document.getElementById('filterEnrolled')?.value || '';
  const search = (document.getElementById('participantSearch')?.value || '').toLowerCase().trim();

  const range = document.getElementById('filterDateRange');
  if (range) range.classList.toggle('open', enrolled === 'custom');
  const [fromDate, toDate] = getEnrolledRange(enrolled);

  filteredParticipants = participants.filter(p => {
    // Matches if student is either enrolled in the course or has completed it
    if (course && p.course !== course && p.completedCourse !== course) return false;
    if (age && p.age !== age) return false;
    if (country && p.country !== country) return false;
    if (status && p.status !== status) return false;
    if (fromDate && p.enrolledDate < fromDate) return false;
    if (toDate && p.enrolledDate > toDate) return false;
    if (search && !p.name.toLowerCase().includes(search) && !p.email.toLowerCase().includes(search)) return false;
    return true;
  });

  partCurrentPage = 1;
  renderParticipantsTable();
}

function clearFilters() {
  ['filterCourse', 'filterAge', 'filterCountry', 'filterStatus', 'filterEnrolled', 'filterDateFrom', 'filterDateTo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const range = document.getElementById('filterDateRange');
  if (range) range.classList.remove('open');
  const search = document.getElementById('participantSearch');
  if (search) search.value = '';
  filteredParticipants = [...participants];
  partCurrentPage = 1;
  renderParticipantsTable();
}

function renderParticipantsTable() {
  const tbody = document.getElementById('participantsTableBody');
  const countEl = document.getElementById('partTotalCount');
  if (!tbody) return;

  if (countEl) {
    countEl.textContent = `${filteredParticipants.length} participant(s)`;
  }

  const totalPages = Math.max(1, Math.ceil(filteredParticipants.length / partPerPage));
  if (partCurrentPage > totalPages) partCurrentPage = totalPages;
  const start = (partCurrentPage - 1) * partPerPage;
  const pageItems = filteredParticipants.slice(start, start + partPerPage);

  const indicator = document.getElementById('partPageIndicator');
  if (indicator) indicator.textContent = `Page ${partCurrentPage} / ${totalPages}`;
  const prevBtn = document.getElementById('partPrevBtn');
  if (prevBtn) prevBtn.disabled = partCurrentPage <= 1;
  const nextBtn = document.getElementById('partNextBtn');
  if (nextBtn) nextBtn.disabled = partCurrentPage >= totalPages;

  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:36px;color:var(--text-secondary);">No participants found.</td></tr>`;
    return;
  }

  tbody.innerHTML = pageItems.map(p => `
    <tr>
      <td><span class="td-user-name">${p.name}</span></td>
      <td><span class="td-email">${p.email}</span></td>
      <!-- Dual course progression matching screenshot exactly -->
      <td>
        <div class="course-cell">
          <div class="course-cell-item">
            <span class="course-cell-title">${p.course}</span>
            ${p.status === 'Completed' && p.completedCourse ? `
              <span class="completed-course-tag">
                <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5l2.5 2.5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Completed
              </span>
            ` : ''}
          </div>
          ${p.completedCourse ? `
            <div class="course-cell-item">
              <span class="course-cell-title">${p.completedCourse}</span>
              <span class="completed-course-tag" title="Completed on ${formatDate(p.completedCourseDate)}">
                <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5l2.5 2.5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Completed
              </span>
            </div>
          ` : ''}
        </div>
      </td>
      <td><span class="td-age">${p.ageNum}</span></td>
      <td><span style="color:var(--text-secondary);">${p.country}</span></td>
      <td><span class="pill-account pill-account--${p.status.toLowerCase()}">${p.status.toLowerCase()}</span></td>
      <td class="td-date">${formatDate(p.enrolledDate)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="height:6px;width:60px;background:#F3F4F6;border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${p.completion}%;background:${p.completion >= 70 ? '#16A34A' : '#C1127A'};border-radius:99px;"></div>
          </div>
          <span style="font-size:12px;font-weight:600;">${p.completion}%</span>
        </div>
      </td>
    </tr>
  `).join('');
}

function prevPartPage() {
  if (partCurrentPage > 1) {
    partCurrentPage--;
    renderParticipantsTable();
  }
}

function nextPartPage() {
  const totalPages = Math.ceil(filteredParticipants.length / partPerPage);
  if (partCurrentPage < totalPages) {
    partCurrentPage++;
    renderParticipantsTable();
  }
}

// ---- CSV EXPORTS ----
function exportConsentCSV() {
  const headers = ['Learner Name', 'Username', 'Age', 'Current Course', 'Prior Completed Course', 'Guardian Email', 'Consent Status', 'Account Status', 'Date Submitted'];
  const rows = filteredConsent.map(r => [
    `"${r.name}"`,
    `"${r.name.toLowerCase().replace(' ', '_')}"`,
    r.ageNum,
    `"${r.course}"`,
    `"${r.completedCourse || 'None'}"`,
    `"${r.guardianEmail}"`,
    r.consentStatus,
    r.accountStatus,
    formatDate(r.consentTimestamp),
  ]);

  downloadCSV([headers.join(','), ...rows.map(row => row.join(','))].join('\n'), 'shecode_consent_records.csv');
  showToast(`📄 Exported ${filteredConsent.length} consent records.`);
}

function exportCSV() {
  const headers = ['Name', 'Email', 'Current Enrolled Course', 'Prior Completed Course', 'Age', 'Country', 'Status', 'Enrolled Date', 'Completion %'];
  const rows = filteredParticipants.map(p => [
    `"${p.name}"`,
    `"${p.email}"`,
    `"${p.course}"`,
    `"${p.completedCourse || 'None'}"`,
    p.ageNum,
    `"${p.country}"`,
    p.status,
    formatDate(p.enrolledDate),
    p.completion + '%',
  ]);

  downloadCSV([headers.join(','), ...rows.map(row => row.join(','))].join('\n'), 'shecode_participants.csv');
  showToast(`📄 Exported ${filteredParticipants.length} participants.`);
}

function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handleLogout() {
  showToast('You have been logged out safely.');
}

// ---- HELPERS ----
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ---- TOAST ----
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}
