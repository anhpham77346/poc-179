/**
 * ADMIN DASHBOARD JAVASCRIPT LOGIC - BENTO & ENTERPRISE EDITION
 * Loại bỏ toàn bộ emoji, tích hợp SVG icons, phân quyền RBAC và thao tác chuẩn SaaS
 */

const ADMIN_ICONS = {
  edit: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
  trash: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  lock: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  save: `<svg class="svg-icon" width="13" height="13" viewBox="0 0 24 24"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>`
};

const AdminState = {
  activeSection: 'overview',
  universities: [],
  benchmarks: [],
  articles: [],
  timelineEvents: [],
  scholarships: [],
  selectedSchoolForEdit: null,
  selectedArticleForEdit: null,
  selectedTimelineForEdit: null,
  selectedScholarshipForEdit: null
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.MOCK_DATA) {
    AdminState.universities = JSON.parse(JSON.stringify(MOCK_DATA.universities));
    AdminState.articles = JSON.parse(JSON.stringify(MOCK_DATA.articles));
    AdminState.timelineEvents = JSON.parse(JSON.stringify(MOCK_DATA.timelineEvents || []));
    AdminState.scholarships = JSON.parse(JSON.stringify(MOCK_DATA.scholarships || []));
    buildFlatBenchmarks();
  }

  initNavigation();
  renderOverviewKPIs();
  renderSchoolsTable();
  renderBenchmarksTable();
  renderTimelineAdminTable();
  renderScholarshipsAdminTable();
  renderArticlesTable();
  initWYSIWYG();
});

function buildFlatBenchmarks() {
  AdminState.benchmarks = [];
  AdminState.universities.forEach(u => {
    u.majors.forEach(m => {
      AdminState.benchmarks.push({
        id: `${u.code}-${m.code}`,
        schoolCode: u.code,
        schoolName: u.name,
        majorCode: m.code,
        majorName: m.name,
        subjectGroups: m.subjectGroups.join(', '),
        methods: m.methods.join(', '),
        score2023: m.benchmarks['2023'] || 26.0,
        score2024: m.benchmarks['2024'] || 27.0,
        score2025: m.benchmarks['2025'] || 27.2,
        quota: m.quota || 100,
        subCriteria: m.subCriteria || 'Không'
      });
    });
  });
}

/* ==========================================================================
   1. NAVIGATION
   ========================================================================== */
function initNavigation() {
  const menuLinks = document.querySelectorAll('.nav-item-btn');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      switchSection(targetSection);
    });
  });
}

function switchSection(sectionId) {
  AdminState.activeSection = sectionId;

  document.querySelectorAll('.nav-item-btn').forEach(link => {
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.admin-view-panel').forEach(sec => {
    if (sec.id === `section_${sectionId}`) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  const titles = {
    overview: 'Tổng quan hệ thống',
    schools: 'Quản lý Trường & Ngành',
    benchmarks: 'Quản lý Điểm chuẩn',
    admissions_scholarships: 'Quản lý Tuyển sinh & Học bổng',
    news_cms: 'Quản lý Tin tức & Quy chế'
  };
  const titleEl = document.getElementById('currentPageTitle');
  if (titleEl && titles[sectionId]) {
    titleEl.textContent = titles[sectionId];
  }
}

/* ==========================================================================
   2. AUTHENTICATION (SINGLE ADMIN ROLE)
   ========================================================================== */
function loginAdmin() {
  const overlay = document.getElementById('adminLoginOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
  showToastAlert('Đăng nhập thành công với quyền Quản trị viên hệ thống.');
}

function logoutAdmin() {
  const overlay = document.getElementById('adminLoginOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
  showToastAlert('Đã khóa phiên làm việc quản trị.');
}

/* ==========================================================================
   3. OVERVIEW & KPIS
   ========================================================================== */
function renderOverviewKPIs() {
  const totalSchools = AdminState.universities.length;
  let totalMajors = 0;
  AdminState.universities.forEach(u => totalMajors += u.majors.length);
  const totalEventsScholarships = AdminState.timelineEvents.length + AdminState.scholarships.length;
  const totalArticles = AdminState.articles.length;

  const elSchools = document.getElementById('kpiTotalSchools');
  const elMajors = document.getElementById('kpiTotalMajors');
  const elEventsSch = document.getElementById('kpiTotalEventsScholarships');
  const elArticles = document.getElementById('kpiTotalArticles');

  if (elSchools) elSchools.textContent = totalSchools;
  if (elMajors) elMajors.textContent = totalMajors;
  if (elEventsSch) elEventsSch.textContent = totalEventsScholarships;
  if (elArticles) elArticles.textContent = totalArticles;
}

/* ==========================================================================
   4. CRUD TRƯỜNG & NGÀNH
   ========================================================================== */
function renderSchoolsTable() {
  const tbody = document.getElementById('schoolsTableBody');
  if (!tbody) return;

  tbody.innerHTML = AdminState.universities.map(u => {
    const isLocked = u.status === 'inactive';
    return `
      <tr>
        <td><span class="uni-code-tag">${u.code}</span></td>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="monogram-badge" style="background: ${u.gradient || '#1e293b'}; width: 32px; height: 32px; font-size: 0.75rem;">
              ${u.monogram || u.code}
            </div>
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">${u.name}</div>
              <div style="font-size: 0.76rem; color: var(--text-tertiary);">${u.shortName} • ${u.campuses[0]}</div>
            </div>
          </div>
        </td>
        <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${u.region.toUpperCase()}</span></td>
        <td><strong>${u.majors.length}</strong> ngành</td>
        <td style="color: var(--status-amber); font-weight: 600;">${u.tuition} tr/năm</td>
        <td>
          <span class="status-pill-badge ${isLocked ? 'inactive' : 'active'}">
            <span class="glow-dot ${isLocked ? 'amber' : 'emerald'}" style="width: 6px; height: 6px;"></span>
            ${isLocked ? 'Đã ẩn' : 'Hoạt động'}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="table-action-btn" onclick="openEditSchoolModal('${u.id}')">
              ${ADMIN_ICONS.edit} Sửa
            </button>
            <button class="table-action-btn" onclick="toggleSchoolStatus('${u.id}')">
              ${isLocked ? ADMIN_ICONS.unlock + ' Hiện' : ADMIN_ICONS.lock + ' Ẩn'}
            </button>
            <button class="table-action-btn danger" onclick="deleteSchool('${u.id}')">
              ${ADMIN_ICONS.trash}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleSchoolStatus(schoolId) {
  const school = AdminState.universities.find(u => u.id === schoolId);
  if (school) {
    school.status = school.status === 'inactive' ? 'active' : 'inactive';
    renderSchoolsTable();
    showToastAlert(`Đã ${school.status === 'inactive' ? 'khóa ẩn' : 'kích hoạt'} trường ${school.shortName}`);
  }
}

function deleteSchool(schoolId) {
  if (confirm('Xác nhận xóa cơ sở đào tạo này khỏi hệ thống?')) {
    AdminState.universities = AdminState.universities.filter(u => u.id !== schoolId);
    renderSchoolsTable();
    renderOverviewKPIs();
    showToastAlert('Đã xóa thành công');
  }
}

function openAddSchoolModal() {
  AdminState.selectedSchoolForEdit = null;
  document.getElementById('schoolModalTitle').textContent = 'Thêm Cơ Sở Đào Tạo Mới';
  document.getElementById('formSchoolCode').value = '';
  document.getElementById('formSchoolName').value = '';
  document.getElementById('formSchoolShort').value = '';
  document.getElementById('formSchoolCity').value = 'Hà Nội';
  document.getElementById('formSchoolTuition').value = 25;
  document.getElementById('formSchoolDesc').value = '';
  openAdminModal('schoolFormModal');
}

function openEditSchoolModal(schoolId) {
  const school = AdminState.universities.find(u => u.id === schoolId);
  if (!school) return;

  AdminState.selectedSchoolForEdit = school;
  document.getElementById('schoolModalTitle').textContent = `Chỉnh sửa: ${school.shortName}`;
  document.getElementById('formSchoolCode').value = school.code;
  document.getElementById('formSchoolName').value = school.name;
  document.getElementById('formSchoolShort').value = school.shortName;
  document.getElementById('formSchoolCity').value = school.city;
  document.getElementById('formSchoolTuition').value = school.tuition;
  document.getElementById('formSchoolDesc').value = school.description;
  openAdminModal('schoolFormModal');
}

function saveSchoolForm() {
  const code = document.getElementById('formSchoolCode').value.trim();
  const name = document.getElementById('formSchoolName').value.trim();
  const shortName = document.getElementById('formSchoolShort').value.trim();
  const city = document.getElementById('formSchoolCity').value.trim();
  const tuition = parseInt(document.getElementById('formSchoolTuition').value) || 25;
  const desc = document.getElementById('formSchoolDesc').value.trim();

  if (!code || !name) {
    alert('Vui lòng nhập đầy đủ Mã trường và Tên trường.');
    return;
  }

  if (AdminState.selectedSchoolForEdit) {
    AdminState.selectedSchoolForEdit.code = code;
    AdminState.selectedSchoolForEdit.name = name;
    AdminState.selectedSchoolForEdit.shortName = shortName;
    AdminState.selectedSchoolForEdit.city = city;
    AdminState.selectedSchoolForEdit.tuition = tuition;
    AdminState.selectedSchoolForEdit.description = desc;
    showToastAlert(`Đã cập nhật thông tin trường ${code}`);
  } else {
    const newSchool = {
      id: 'school_' + Date.now(),
      code: code,
      name: name,
      shortName: shortName || code,
      monogram: code.slice(0, 3),
      gradient: 'linear-gradient(135deg, #2563eb, #1e40af)',
      city: city,
      region: 'north',
      category: 'tech',
      tuition: tuition,
      tuitionRange: `${tuition} - ${tuition + 15} triệu/năm`,
      campuses: [city],
      description: desc || 'Thông tin giới thiệu cơ sở đào tạo.',
      rating: 4.8,
      status: 'active',
      majorsCount: 1,
      majors: [
        {
          code: code + '01',
          name: 'Chuyên ngành thử nghiệm',
          subjectGroups: ['A00', 'A01'],
          methods: ['Điểm thi THPT'],
          quota: 100,
          benchmarks: { '2023': 25.0, '2024': 25.5, '2025': 26.0 },
          subCriteria: 'Không'
        }
      ]
    };
    AdminState.universities.unshift(newSchool);
    showToastAlert(`Đã thêm mới trường ${code}`);
  }

  closeAdminModal('schoolFormModal');
  renderSchoolsTable();
  renderOverviewKPIs();
}

/* ==========================================================================
   5. QUẢN LÝ ĐIỂM CHUẨN
   ========================================================================== */
function renderBenchmarksTable() {
  const tbody = document.getElementById('benchmarksTableBody');
  if (!tbody) return;

  const schoolFilter = document.getElementById('filterBenchmarkSchool')?.value || 'all';

  const filtered = AdminState.benchmarks.filter(b => {
    if (schoolFilter !== 'all' && b.schoolCode !== schoolFilter) return false;
    return true;
  });

  tbody.innerHTML = filtered.map(b => `
    <tr>
      <td><span class="uni-code-tag">${b.schoolCode}</span></td>
      <td>
        <div style="font-weight: 600; color: var(--text-primary); font-size: 0.9rem;">${b.majorName}</div>
        <div style="font-size: 0.76rem; color: var(--text-tertiary);">${b.majorCode} • Khối: ${b.subjectGroups}</div>
      </td>
      <td><span style="font-size: 0.78rem; color: var(--text-secondary);">${b.methods}</span></td>
      <td><input type="number" step="0.05" class="field-input" style="width: 72px; padding: 4px 6px;" value="${b.score2023}" id="b_2023_${b.id}"></td>
      <td><input type="number" step="0.05" class="field-input" style="width: 72px; padding: 4px 6px;" value="${b.score2024}" id="b_2024_${b.id}"></td>
      <td><input type="number" step="0.05" class="field-input" style="width: 72px; padding: 4px 6px; font-weight: 700; color: var(--accent-primary-hover);" value="${b.score2025}" id="b_2025_${b.id}"></td>
      <td><input type="text" class="field-input" style="width: 130px; padding: 4px 6px; font-size: 0.78rem;" value="${b.subCriteria}" id="b_sub_${b.id}"></td>
      <td>
        <button class="table-action-btn primary" onclick="saveSingleBenchmark('${b.id}')">
          ${ADMIN_ICONS.save} Lưu
        </button>
      </td>
    </tr>
  `).join('');
}

function saveSingleBenchmark(benchId) {
  const item = AdminState.benchmarks.find(b => b.id === benchId);
  if (!item) return;

  item.score2023 = parseFloat(document.getElementById(`b_2023_${benchId}`).value) || item.score2023;
  item.score2024 = parseFloat(document.getElementById(`b_2024_${benchId}`).value) || item.score2024;
  item.score2025 = parseFloat(document.getElementById(`b_2025_${benchId}`).value) || item.score2025;
  item.subCriteria = document.getElementById(`b_sub_${benchId}`).value;

  showToastAlert(`Đã cập nhật điểm ngành ${item.majorCode} (${item.schoolCode})`);
}

function saveAllBenchmarks() {
  AdminState.benchmarks.forEach(b => {
    const el = document.getElementById(`b_2025_${b.id}`);
    if (el) b.score2025 = parseFloat(el.value) || b.score2025;
  });
  showToastAlert('Đã lưu toàn bộ thay đổi điểm chuẩn vào hệ thống.');
}

/* ==========================================================================
   6. ADMISSIONS TIMELINE & SCHOLARSHIPS MANAGEMENT
   ========================================================================== */
function renderTimelineAdminTable() {
  const tbody = document.getElementById('timelineTableBody');
  if (!tbody) return;

  tbody.innerHTML = AdminState.timelineEvents.map(e => `
    <tr>
      <td><span class="uni-code-tag">${e.id || 'EVT'}</span></td>
      <td><strong style="color: var(--accent-primary);">${e.month}</strong></td>
      <td>
        <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">${e.title}</div>
        <div style="font-size: 0.76rem; color: var(--text-tertiary);">${e.details}</div>
      </td>
      <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${e.authority || 'Bộ GD&ĐT'}</span></td>
      <td>
        <span class="status-pill-badge ${e.status === 'done' ? 'active' : (e.status === 'active' ? 'active' : 'draft')}">
          <span class="glow-dot ${e.status === 'done' ? 'emerald' : (e.status === 'active' ? 'amber' : 'amber')}" style="width: 6px; height: 6px;"></span>
          ${e.status === 'done' ? 'Đã xong' : (e.status === 'active' ? 'Đang mở' : 'Sắp tới')}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="table-action-btn" onclick="openEditTimelineEventModal('${e.id}')">
            ${ADMIN_ICONS.edit} Sửa
          </button>
          <button class="table-action-btn danger" onclick="deleteTimelineEvent('${e.id}')">
            ${ADMIN_ICONS.trash}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddTimelineEventModal() {
  AdminState.selectedTimelineForEdit = null;
  document.getElementById('timelineModalTitle').textContent = 'Thêm Mốc Tuyển Sinh Mới';
  document.getElementById('timelineFormMonth').value = '';
  document.getElementById('timelineFormTitle').value = '';
  document.getElementById('timelineFormAuthority').value = 'Bộ Giáo dục và Đào tạo';
  document.getElementById('timelineFormStatus').value = 'upcoming';
  document.getElementById('timelineFormDetails').value = '';
  openAdminModal('timelineModal');
}

function openEditTimelineEventModal(eventId) {
  const item = AdminState.timelineEvents.find(e => e.id === eventId);
  if (!item) return;

  AdminState.selectedTimelineForEdit = item;
  document.getElementById('timelineModalTitle').textContent = 'Chỉnh Sửa Mốc Tuyển Sinh';
  document.getElementById('timelineFormMonth').value = item.month;
  document.getElementById('timelineFormTitle').value = item.title;
  document.getElementById('timelineFormAuthority').value = item.authority || 'Bộ GD&ĐT';
  document.getElementById('timelineFormStatus').value = item.status;
  document.getElementById('timelineFormDetails').value = item.details;
  openAdminModal('timelineModal');
}

function saveTimelineEvent() {
  const month = document.getElementById('timelineFormMonth').value.trim();
  const title = document.getElementById('timelineFormTitle').value.trim();
  const authority = document.getElementById('timelineFormAuthority').value.trim();
  const status = document.getElementById('timelineFormStatus').value;
  const details = document.getElementById('timelineFormDetails').value.trim();

  if (!month || !title) {
    alert('Vui lòng nhập thời gian và tiêu đề mốc sự kiện.');
    return;
  }

  if (AdminState.selectedTimelineForEdit) {
    AdminState.selectedTimelineForEdit.month = month;
    AdminState.selectedTimelineForEdit.title = title;
    AdminState.selectedTimelineForEdit.authority = authority;
    AdminState.selectedTimelineForEdit.status = status;
    AdminState.selectedTimelineForEdit.details = details;
    showToastAlert('Đã cập nhật mốc sự kiện tuyển sinh.');
  } else {
    const newEvent = {
      id: 'time_' + Date.now(),
      month: month,
      title: title,
      authority: authority,
      status: status,
      details: details,
      mandatoryDocs: ['Căn cước công dân gắn chip', 'Hồ sơ theo quy chế thi'],
      procedures: ['Theo dõi hướng dẫn chính thức trên cổng thông tin.']
    };
    AdminState.timelineEvents.push(newEvent);
    showToastAlert('Đã thêm mốc sự kiện tuyển sinh mới.');
  }

  closeAdminModal('timelineModal');
  renderTimelineAdminTable();
  renderOverviewKPIs();
}

function deleteTimelineEvent(eventId) {
  if (confirm('Xác nhận xóa mốc sự kiện này?')) {
    AdminState.timelineEvents = AdminState.timelineEvents.filter(e => e.id !== eventId);
    renderTimelineAdminTable();
    renderOverviewKPIs();
    showToastAlert('Đã xóa mốc sự kiện.');
  }
}

/* Scholarships Admin CRUD */
function renderScholarshipsAdminTable() {
  const tbody = document.getElementById('scholarshipsTableBody');
  if (!tbody) return;

  tbody.innerHTML = AdminState.scholarships.map(s => `
    <tr>
      <td><span class="uni-code-tag">${s.id || 'SCH'}</span></td>
      <td>
        <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">${s.title}</div>
        <div style="font-size: 0.76rem; color: var(--text-tertiary);">${s.target}</div>
      </td>
      <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${s.sponsor}</span></td>
      <td><strong style="color: var(--status-amber);">${s.amount}</strong></td>
      <td><span style="font-size: 0.8rem; color: var(--text-tertiary);">${s.deadline}</span></td>
      <td>
        <span class="status-pill-badge ${s.status === 'Đang mở đơn' ? 'active' : 'draft'}">
          <span class="glow-dot ${s.status === 'Đang mở đơn' ? 'emerald' : 'amber'}" style="width: 6px; height: 6px;"></span>
          ${s.status}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="table-action-btn" onclick="openEditScholarshipModal('${s.id}')">
            ${ADMIN_ICONS.edit} Sửa
          </button>
          <button class="table-action-btn danger" onclick="deleteScholarship('${s.id}')">
            ${ADMIN_ICONS.trash}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddScholarshipModal() {
  AdminState.selectedScholarshipForEdit = null;
  document.getElementById('scholarshipModalTitle').textContent = 'Thêm Gói Học Bổng Mới';
  document.getElementById('schFormTitle').value = '';
  document.getElementById('schFormSponsor').value = '';
  document.getElementById('schFormAmount').value = '';
  document.getElementById('schFormDeadline').value = '30/06/2026';
  document.getElementById('schFormStatus').value = 'Đang mở đơn';
  document.getElementById('schFormTarget').value = '';
  openAdminModal('scholarshipModal');
}

function openEditScholarshipModal(schId) {
  const item = AdminState.scholarships.find(s => s.id === schId);
  if (!item) return;

  AdminState.selectedScholarshipForEdit = item;
  document.getElementById('scholarshipModalTitle').textContent = 'Chỉnh Sửa Gói Học Bổng';
  document.getElementById('schFormTitle').value = item.title;
  document.getElementById('schFormSponsor').value = item.sponsor;
  document.getElementById('schFormAmount').value = item.amount;
  document.getElementById('schFormDeadline').value = item.deadline;
  document.getElementById('schFormStatus').value = item.status;
  document.getElementById('schFormTarget').value = item.target;
  openAdminModal('scholarshipModal');
}

function saveScholarship() {
  const title = document.getElementById('schFormTitle').value.trim();
  const sponsor = document.getElementById('schFormSponsor').value.trim();
  const amount = document.getElementById('schFormAmount').value.trim();
  const deadline = document.getElementById('schFormDeadline').value.trim();
  const status = document.getElementById('schFormStatus').value;
  const target = document.getElementById('schFormTarget').value.trim();

  if (!title || !amount) {
    alert('Vui lòng nhập tên gói học bổng và trị giá tài trợ.');
    return;
  }

  if (AdminState.selectedScholarshipForEdit) {
    AdminState.selectedScholarshipForEdit.title = title;
    AdminState.selectedScholarshipForEdit.sponsor = sponsor;
    AdminState.selectedScholarshipForEdit.amount = amount;
    AdminState.selectedScholarshipForEdit.deadline = deadline;
    AdminState.selectedScholarshipForEdit.status = status;
    AdminState.selectedScholarshipForEdit.target = target;
    showToastAlert('Đã cập nhật gói học bổng.');
  } else {
    const newSch = {
      id: 'sch_' + Date.now(),
      title: title,
      sponsor: sponsor || 'Quỹ Tài trợ Giáo dục',
      amount: amount,
      quota: '50 suất',
      deadline: deadline || '30/06/2026',
      status: status,
      target: target || 'Tân sinh viên đạt thành tích xuất sắc',
      benefits: ['Hỗ trợ học phí và chi phí học tập.'],
      requirements: ['Tốt nghiệp THPT loại Khá/Giỏi.'],
      dossier: ['Đơn đăng ký xét học bổng.']
    };
    AdminState.scholarships.push(newSch);
    showToastAlert('Đã thêm gói học bổng mới.');
  }

  closeAdminModal('scholarshipModal');
  renderScholarshipsAdminTable();
  renderOverviewKPIs();
}

function deleteScholarship(schId) {
  if (confirm('Xác nhận xóa gói học bổng này?')) {
    AdminState.scholarships = AdminState.scholarships.filter(s => s.id !== schId);
    renderScholarshipsAdminTable();
    renderOverviewKPIs();
    showToastAlert('Đã xóa gói học bổng.');
  }
}

/* ==========================================================================
   7. CMS & WYSIWYG (NEWS & CIRCULARS)
   ========================================================================== */
function initWYSIWYG() {
  document.querySelectorAll('.wysiwyg-actions-strip .editor-btn-tool').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const command = btn.getAttribute('data-command');
      const arg = btn.getAttribute('data-arg') || null;

      if (command === 'createLink') {
        const url = prompt('Nhập URL liên kết:', 'https://');
        if (url) document.execCommand(command, false, url);
      } else if (command === 'insertImage') {
        const imgUrl = prompt('Nhập URL hình ảnh:', 'https://picsum.photos/600/300');
        if (imgUrl) document.execCommand(command, false, imgUrl);
      } else {
        document.execCommand(command, false, arg);
      }
    });
  });
}

function renderArticlesTable(articlesList) {
  const tbody = document.getElementById('cmsTableBody');
  if (!tbody) return;

  const list = articlesList || AdminState.articles;

  tbody.innerHTML = list.map(a => `
    <tr>
      <td><span class="uni-code-tag">${a.id}</span></td>
      <td>
        <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">${a.title}</div>
        <div style="font-size: 0.76rem; color: var(--text-tertiary);">${a.summary}</div>
      </td>
      <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${a.category}</span></td>
      <td><span style="font-size: 0.8rem; color: var(--text-tertiary);">${a.date}</span></td>
      <td>
        <span class="status-pill-badge ${a.status === 'published' ? 'active' : 'draft'}">
          <span class="glow-dot ${a.status === 'published' ? 'emerald' : 'amber'}" style="width: 6px; height: 6px;"></span>
          ${a.status === 'published' ? 'Xuất bản' : 'Bản nháp'}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="table-action-btn" onclick="openEditArticleModal('${a.id}')">
            ${ADMIN_ICONS.edit} Sửa
          </button>
          <button class="table-action-btn" onclick="toggleArticleStatus('${a.id}')">
            ${a.status === 'published' ? 'Gỡ bài' : 'Xuất bản'}
          </button>
          <button class="table-action-btn danger" onclick="deleteArticle('${a.id}')">
            ${ADMIN_ICONS.trash}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function searchAdminArticles(keyword) {
  const kw = keyword.toLowerCase().trim();
  if (!kw) {
    renderArticlesTable(AdminState.articles);
    return;
  }
  const filtered = AdminState.articles.filter(a => 
    a.title.toLowerCase().includes(kw) || 
    a.category.toLowerCase().includes(kw) ||
    a.summary.toLowerCase().includes(kw)
  );
  renderArticlesTable(filtered);
}

function toggleArticleStatus(artId) {
  const art = AdminState.articles.find(a => a.id === artId);
  if (art) {
    art.status = art.status === 'published' ? 'unpublished' : 'published';
    renderArticlesTable();
    showToastAlert(`Bài viết đã chuyển sang trạng thái: ${art.status.toUpperCase()}`);
  }
}

function deleteArticle(artId) {
  if (confirm('Xác nhận xóa bài viết này?')) {
    AdminState.articles = AdminState.articles.filter(a => a.id !== artId);
    renderArticlesTable();
    renderOverviewKPIs();
    showToastAlert('Đã xóa bài viết.');
  }
}

function openAddArticleModal() {
  AdminState.selectedArticleForEdit = null;
  document.getElementById('cmsModalTitle').textContent = 'Soạn thảo bài viết mới';
  document.getElementById('cmsArticleTitle').value = '';
  document.getElementById('cmsArticleCat').value = 'Thông tư - Quy chế';
  document.getElementById('cmsArticleStatus').value = 'published';
  document.getElementById('cmsEditorBody').innerHTML = '<p>Nhập nội dung bài viết...</p>';
  openAdminModal('cmsEditorModal');
}

function openEditArticleModal(artId) {
  const art = AdminState.articles.find(a => a.id === artId);
  if (!art) return;

  AdminState.selectedArticleForEdit = art;
  document.getElementById('cmsModalTitle').textContent = 'Chỉnh sửa bài viết';
  document.getElementById('cmsArticleTitle').value = art.title;
  document.getElementById('cmsArticleCat').value = art.category;
  document.getElementById('cmsArticleStatus').value = art.status;
  document.getElementById('cmsEditorBody').innerHTML = art.fullContent || `<h3>${art.title}</h3><p>${art.summary}</p>`;
  openAdminModal('cmsEditorModal');
}

function saveArticleCMS() {
  const title = document.getElementById('cmsArticleTitle').value.trim();
  const cat = document.getElementById('cmsArticleCat').value;
  const status = document.getElementById('cmsArticleStatus').value;
  const bodyHtml = document.getElementById('cmsEditorBody').innerHTML;

  if (!title) {
    alert('Vui lòng nhập tiêu đề bài viết.');
    return;
  }

  if (AdminState.selectedArticleForEdit) {
    AdminState.selectedArticleForEdit.title = title;
    AdminState.selectedArticleForEdit.category = cat;
    AdminState.selectedArticleForEdit.status = status;
    AdminState.selectedArticleForEdit.fullContent = bodyHtml;
    showToastAlert('Đã cập nhật bài viết thành công.');
  } else {
    const newArt = {
      id: 'art_' + Date.now(),
      title: title,
      category: cat,
      date: new Date().toLocaleDateString('vi-VN'),
      author: 'Ban Quản trị',
      status: status,
      summary: bodyHtml.replace(/<[^>]*>?/gm, '').slice(0, 120) + '...',
      readTime: '3 phút',
      fullContent: bodyHtml
    };
    AdminState.articles.unshift(newArt);
    showToastAlert('Đã xuất bản bài viết mới.');
  }

  closeAdminModal('cmsEditorModal');
  renderArticlesTable();
  renderOverviewKPIs();
}

/* ==========================================================================
   HELPERS & MODALS
   ========================================================================== */
function openAdminModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.style.display = 'flex';
}

function closeAdminModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.style.display = 'none';
}

function showToastAlert(msg) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(13, 18, 31, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(16px);
      color: #fff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 99999;
      transition: all 0.2s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.display = 'block';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 200);
  }, 2800);
}
