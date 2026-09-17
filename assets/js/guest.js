/**
 * GUEST PORTAL JAVASCRIPT LOGIC - MULTI-PAGE SUITE
 * Phục vụ đồng bộ: index.html (Landing), search.html (Tra cứu), schedule.html (Lịch & Học bổng), news.html (Tin tức)
 */

const ICONS = {
  bookmark: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  bookmarkFilled: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" style="fill:currentColor"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  compare: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24"><path d="m16 3 5 5-5 5"/><path d="M4 20v-7a4 4 0 0 1 4-4h13"/><path d="m8 21-5-5 5-5"/><path d="M20 4v7a4 4 0 0 1-4 4H3"/></svg>`,
  arrowRight: `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  pin: `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  trash: `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  check: `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  close: `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  search: `<svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
};

const GuestState = {
  activeRegion: 'all',
  activeCategory: 'all',
  activeArticleCategory: 'all',
  newsSearchKeyword: '',
  activeScheduleFilter: 'all',
  scheduleSearchKeyword: '',
  universitySearchKeyword: '',
  selectedSchoolId: null,
  comparisonList: [],
  wishlist: [],
  aspirations: [],
  currentArticleForDetail: null,
  currentScheduleItemForDetail: null
};

document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  initAutocompleteSearch();
  initQuickFilters();
  initScoreCalculator();
  renderUniversities();
  renderArticles();
  renderScheduleCards();
  renderScholarships();
  renderTimeline();
  updateWishlistUI();
  updateComparisonDock();
  handleUrlParams();
});

/* ==========================================================================
   1. LOCAL STORAGE & WISHLIST
   ========================================================================== */
function initLocalStorage() {
  try {
    const saved = localStorage.getItem('admissions_mockup_wishlist');
    if (saved) GuestState.wishlist = JSON.parse(saved);
  } catch (e) {
    GuestState.wishlist = [];
  }

  try {
    const savedAspirations = localStorage.getItem('admissions_mockup_aspirations');
    if (savedAspirations) GuestState.aspirations = JSON.parse(savedAspirations);
  } catch (e) {
    GuestState.aspirations = [];
  }
}

function saveWishlist() {
  localStorage.setItem('admissions_mockup_wishlist', JSON.stringify(GuestState.wishlist));
  updateWishlistUI();
}

function toggleWishlist(item) {
  const idx = GuestState.wishlist.findIndex(w => w.id === item.id);
  if (idx > -1) {
    GuestState.wishlist.splice(idx, 1);
    showToast(`Đã bỏ lưu "${item.name}"`);
  } else {
    GuestState.wishlist.push(item);
    showToast(`Đã lưu "${item.name}" vào Tủ hồ sơ cá nhân`);
  }
  saveWishlist();
  renderUniversities();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistCountBadge');
  if (badge) badge.textContent = GuestState.wishlist.length;

  const listEl = document.getElementById('wishlistModalItems');
  if (listEl) {
    if (GuestState.wishlist.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; color: var(--text-tertiary);">
          <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Tủ hồ sơ đang trống</div>
          <p style="font-size: 0.82rem;">Lưu các trường hoặc ngành bạn quan tâm bằng nút bookmark để xem lại tại đây.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = GuestState.wishlist.map(item => `
      <div class="match-item-card" style="margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${item.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-tertiary);">${item.code || item.sub || ''}</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-mini-svg" onclick="addToCompare('${item.schoolId || item.id}')">
            ${ICONS.compare} So sánh
          </button>
          <button class="btn-mini-svg" style="color: var(--status-crimson);" onclick="removeFromWishlist('${item.id}')">
            ${ICONS.trash}
          </button>
        </div>
      </div>
    `).join('');
  }
}

function removeFromWishlist(id) {
  GuestState.wishlist = GuestState.wishlist.filter(w => w.id !== id);
  saveWishlist();
}

function openWishlistModal() {
  updateWishlistUI();
  openModal('wishlistModal');
}

/* ==========================================================================
   2. SMART SEARCH & AUTOCOMPLETE
   ========================================================================== */
function initAutocompleteSearch() {
  const input = document.getElementById('smartSearchInput');
  const dropdown = document.getElementById('autocompleteDropdown');
  const searchBtn = document.getElementById('smartSearchBtn');

  if (!input || !dropdown) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    
    // Live filter directory as user types
    GuestState.universitySearchKeyword = val;
    const dirInput = document.getElementById('dirSearchInput');
    if (dirInput && dirInput.value !== e.target.value) {
      dirInput.value = e.target.value;
    }
    renderUniversities();

    if (!val) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    const matchedSchools = MOCK_DATA.universities.filter(u => 
      u.name.toLowerCase().includes(val) || 
      u.code.toLowerCase().includes(val) || 
      (u.shortName && u.shortName.toLowerCase().includes(val))
    );

    const matchedMajors = [];
    (MOCK_DATA.majorCatalog || []).forEach(m => {
      if (m.name.toLowerCase().includes(val) || m.code.toLowerCase().includes(val)) {
        matchedMajors.push(m);
      }
    });

    if (matchedSchools.length === 0 && matchedMajors.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-tertiary); font-size: 0.85rem;">
          Không tìm thấy kết quả gợi ý cho "${e.target.value}"
        </div>
      `;
      dropdown.classList.add('active');
      return;
    }

    let html = '';
    if (matchedSchools.length > 0) {
      html += `<div class="ac-group-header">Trường đại học (${matchedSchools.length})</div>`;
      matchedSchools.slice(0, 5).forEach(s => {
        html += `
          <div class="ac-row" onclick="handleSelectSchool('${s.id}')">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="uni-code-tag">${s.code}</span>
              <div>
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${s.name}</div>
                <div style="font-size: 0.76rem; color: var(--text-tertiary);">${s.city} • Học phí: ${s.tuitionRange || s.tuition + ' tr/năm'}</div>
              </div>
            </div>
            <span style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600; display: flex; align-items: center; gap: 4px;">
              Xem trường ${ICONS.arrowRight}
            </span>
          </div>
        `;
      });
    }

    if (matchedMajors.length > 0) {
      html += `<div class="ac-group-header">Ngành đào tạo (${matchedMajors.length})</div>`;
      matchedMajors.slice(0, 4).forEach(m => {
        html += `
          <div class="ac-row" onclick="handleSelectMajor('${m.id}')">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="uni-code-tag">${m.code}</span>
              <div>
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${m.name}</div>
                <div style="font-size: 0.76rem; color: var(--text-tertiary);">${m.jobDemand || 'Nhu cầu nhân lực cao'}</div>
              </div>
            </div>
            <span style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600; display: flex; align-items: center; gap: 4px;">
              Lọc ngành ${ICONS.arrowRight}
            </span>
          </div>
        `;
      });
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  const performSearch = () => {
    const val = input.value.trim();
    dropdown.classList.remove('active');
    const isSearchPage = window.location.pathname.includes('search.html');
    if (!isSearchPage) {
      window.location.href = `search.html?q=${encodeURIComponent(val)}`;
    } else {
      GuestState.universitySearchKeyword = val;
      const dirInput = document.getElementById('dirSearchInput');
      if (dirInput) dirInput.value = val;
      renderUniversities();
      document.getElementById('schoolsSection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
}

function handleSelectSchool(schoolId) {
  const isSearchPage = window.location.pathname.includes('search.html');
  if (!isSearchPage) {
    window.location.href = `search.html?school=${schoolId}`;
  } else {
    document.getElementById('autocompleteDropdown')?.classList.remove('active');
    const school = MOCK_DATA.universities.find(u => u.id === schoolId);
    if (school) {
      GuestState.universitySearchKeyword = school.code;
      const input = document.getElementById('smartSearchInput');
      if (input) input.value = school.name;
      const dirInput = document.getElementById('dirSearchInput');
      if (dirInput) dirInput.value = school.name;
      renderUniversities();
      document.getElementById('schoolsSection')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => openSchoolDetailModal(schoolId), 350);
    }
  }
}

function handleSelectMajor(majorId) {
  const isSearchPage = window.location.pathname.includes('search.html');
  if (!isSearchPage) {
    window.location.href = `search.html?major=${majorId}`;
  } else {
    document.getElementById('autocompleteDropdown')?.classList.remove('active');
    const major = (MOCK_DATA.majorCatalog || []).find(m => m.id === majorId);
    if (major) {
      GuestState.universitySearchKeyword = major.name;
      const input = document.getElementById('smartSearchInput');
      if (input) input.value = major.name;
      const dirInput = document.getElementById('dirSearchInput');
      if (dirInput) dirInput.value = major.name;
      renderUniversities();
      document.getElementById('schoolsSection')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function onDirectorySearch(val) {
  GuestState.universitySearchKeyword = (val || '').trim().toLowerCase();
  const mainInput = document.getElementById('smartSearchInput');
  if (mainInput && mainInput.value !== val) {
    mainInput.value = val;
  }
  renderUniversities();
}

function resetSearchKeyword() {
  GuestState.universitySearchKeyword = '';
  const mainInput = document.getElementById('smartSearchInput');
  if (mainInput) mainInput.value = '';
  const dirInput = document.getElementById('dirSearchInput');
  if (dirInput) dirInput.value = '';
  renderUniversities();
}

function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  const schoolId = params.get('school');
  const majorId = params.get('major');

  if (q) {
    const input = document.getElementById('smartSearchInput');
    if (input) input.value = q;
    const dirInput = document.getElementById('dirSearchInput');
    if (dirInput) dirInput.value = q;
    GuestState.universitySearchKeyword = q.toLowerCase();
    renderUniversities();
    document.getElementById('schoolsSection')?.scrollIntoView({ behavior: 'smooth' });
  }

  if (schoolId) {
    setTimeout(() => { openSchoolDetailModal(schoolId); }, 300);
  }

  if (majorId) {
    const input = document.getElementById('smartSearchInput');
    if (input) {
      input.value = majorId;
      GuestState.universitySearchKeyword = majorId.toLowerCase();
      renderUniversities();
      setTimeout(() => { document.getElementById('schoolsSection')?.scrollIntoView({ behavior: 'smooth' }); }, 300);
    }
  }
}

/* ==========================================================================
   3. QUICK FILTERS
   ========================================================================== */
function initQuickFilters() {
  const regionContainer = document.getElementById('regionChips');
  const catContainer = document.getElementById('categoryChips');

  if (regionContainer) {
    regionContainer.innerHTML = MOCK_DATA.regions.map(r => `
      <button class="pill-item ${GuestState.activeRegion === r.id ? 'active' : ''}" 
              onclick="setFilter('region', '${r.id}')">${r.name}</button>
    `).join('');
  }

  if (catContainer) {
    catContainer.innerHTML = MOCK_DATA.categories.map(c => `
      <button class="pill-item ${GuestState.activeCategory === c.id ? 'active' : ''}" 
              onclick="setFilter('category', '${c.id}')">${c.name}</button>
    `).join('');
  }
}

function setFilter(type, value) {
  if (type === 'region') GuestState.activeRegion = value;
  if (type === 'category') GuestState.activeCategory = value;
  initQuickFilters();
  renderUniversities();
}

/* ==========================================================================
   4. SMART RECOMMENDATION MATRIX & ASPIRATIONS DRAFTER
   ========================================================================== */
function initScoreCalculator() {
  const btn = document.getElementById('btnCalculateRecommendations') || document.getElementById('btnCalculateScores');
  if (btn) {
    btn.addEventListener('click', calculateAdmissionsRecommendations);
  }

  const tbody = document.getElementById('recommendationTableBody');
  if (tbody) {
    calculateAdmissionsRecommendations();
    renderAspirationsList();
  }
}

function calculateAdmissionsRecommendations() {
  const groupSelect = document.getElementById('scoreGroupSelect');
  const scoreInput = document.getElementById('userScoreInput');
  const regionSelect = document.getElementById('recFilterRegion');
  const chanceSelect = document.getElementById('recFilterChance');
  const sortSelect = document.getElementById('recSortBy');
  const tbody = document.getElementById('recommendationTableBody');
  const totalScoreEl = document.getElementById('displayTotalScore');
  const summaryCountEl = document.getElementById('recResultsCount');

  if (!tbody || !window.MOCK_DATA) return;

  const selectedGroup = groupSelect ? groupSelect.value : 'A00';
  const totalScore = parseFloat(scoreInput ? scoreInput.value : 27.5) || 0;
  const selectedRegion = regionSelect ? regionSelect.value : 'all';
  const selectedChance = chanceSelect ? chanceSelect.value : 'all';
  const sortBy = sortSelect ? sortSelect.value : 'diff_desc';

  if (totalScoreEl) {
    totalScoreEl.textContent = `${totalScore.toFixed(2)} đ`;
  }

  let matchedMajors = [];

  (MOCK_DATA.universities || []).forEach(u => {
    if (selectedRegion !== 'all' && u.region !== selectedRegion) return;

    (u.majors || []).forEach(m => {
      const hasGroup = (selectedGroup === 'all') || (m.subjectGroups && m.subjectGroups.includes(selectedGroup));
      if (!hasGroup) return;

      const benchmark = m.benchmarks['2024'] || 25.0;
      const diff = parseFloat((totalScore - benchmark).toFixed(2));

      let chance = 'risk';
      let chanceLabel = 'Thử thách';
      if (diff >= 0.75) {
        chance = 'safe';
        chanceLabel = 'Khả năng cao';
      } else if (diff >= -0.5) {
        chance = 'reach';
        chanceLabel = 'Cạnh tranh';
      }

      if (selectedChance !== 'all' && selectedChance !== chance) return;

      matchedMajors.push({
        schoolId: u.id,
        schoolName: u.name,
        schoolShort: u.shortName || u.name,
        schoolCode: u.code,
        schoolRegion: u.region,
        schoolCity: u.city,
        gradient: u.gradient,
        monogram: u.monogram || u.code,
        majorCode: m.code,
        majorName: m.name,
        subjectGroups: m.subjectGroups,
        benchmark: benchmark,
        benchmarks: m.benchmarks,
        diff: diff,
        chance: chance,
        chanceLabel: chanceLabel
      });
    });
  });

  // Sort
  if (sortBy === 'diff_desc') {
    matchedMajors.sort((a, b) => b.diff - a.diff);
  } else if (sortBy === 'diff_asc') {
    matchedMajors.sort((a, b) => a.diff - b.diff);
  } else if (sortBy === 'benchmark_desc') {
    matchedMajors.sort((a, b) => b.benchmark - a.benchmark);
  } else if (sortBy === 'school') {
    matchedMajors.sort((a, b) => a.schoolCode.localeCompare(b.schoolCode));
  }

  if (summaryCountEl) {
    summaryCountEl.textContent = `(Tìm thấy ${matchedMajors.length} ngành)`;
  }

  if (matchedMajors.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 48px 16px; color: var(--text-tertiary);">
          Không tìm thấy ngành học nào khớp với tổ hợp môn và mức điểm đã chọn. Hãy thử chọn tổ hợp khác hoặc nới lỏng bộ lọc!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = matchedMajors.map(item => {
    const isAspirated = (GuestState.aspirations || []).some(a => a.schoolCode === item.schoolCode && a.majorCode === item.majorCode);
    const aspIndex = (GuestState.aspirations || []).findIndex(a => a.schoolCode === item.schoolCode && a.majorCode === item.majorCode);
    const diffFormatted = item.diff > 0 ? `+${item.diff.toFixed(2)} đ` : (item.diff === 0 ? `0.00 đ` : `${item.diff.toFixed(2)} đ`);
    const diffClass = item.diff >= 0.75 ? 'safe' : (item.diff >= -0.5 ? 'reach' : 'risk');

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="monogram-badge" style="background: ${item.gradient}; width: 34px; height: 34px; font-size: 0.76rem; border-radius: 8px; flex-shrink: 0;">${item.monogram}</div>
            <div>
              <div style="font-weight: 800; color: var(--text-primary); font-size: 0.88rem;">${item.schoolCode}</div>
              <div style="font-size: 0.75rem; color: var(--text-tertiary); max-width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.schoolName}">${item.schoolShort}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--text-primary); font-size: 0.88rem;">${item.majorName}</div>
          <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
            <span class="uni-code-tag" style="font-size: 0.68rem; padding: 1px 5px;">${item.majorCode}</span>
            <span style="font-size: 0.72rem; color: var(--text-tertiary);">Tổ hợp: ${(item.subjectGroups || []).join(', ')}</span>
          </div>
        </td>
        <td style="text-align: center;">
          <span style="font-size: 1.05rem; font-weight: 800; color: var(--accent-primary);">${item.benchmark.toFixed(2)}</span>
          ${item.benchmarks && item.benchmarks['2023'] ? `
            <div style="font-size: 0.7rem; color: var(--text-tertiary); margin-top: 1px;">
              2023: ${item.benchmarks['2023']}
            </div>
          ` : ''}
        </td>
        <td style="text-align: center;">
          <span class="diff-badge ${diffClass}">${diffFormatted}</span>
        </td>
        <td style="text-align: center;">
          <span class="zone-badge-pill ${item.chance}">${item.chanceLabel}</span>
        </td>
        <td style="text-align: right;">
          <div style="display: inline-flex; align-items: center; gap: 6px;">
            ${isAspirated ? `
              <button class="btn-uni-profile added" disabled style="padding: 5px 9px; font-size: 0.76rem; background: #ecfdf5; color: var(--status-emerald); border-color: rgba(16, 185, 129, 0.3); cursor: default;">
                ✓ NV ${aspIndex + 1}
              </button>
            ` : `
              <button class="btn-uni-profile" style="padding: 5px 9px; font-size: 0.76rem;" onclick="addAspiration('${item.schoolCode}', '${item.majorCode}')">
                + Chọn NV
              </button>
            `}
            <button class="btn-mini-svg" title="Xem chi tiết trường" onclick="openSchoolDetailModal('${item.schoolId}')">
              ${ICONS.arrowRight}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAspirationsList() {
  const container = document.getElementById('aspirationsListContainer');
  const badge = document.getElementById('aspirationsCountBadge');
  if (!container) return;

  const list = GuestState.aspirations || [];
  if (badge) {
    badge.textContent = `${list.length} / 10 NV`;
    badge.className = `zone-badge-pill ${list.length > 0 ? 'safe' : 'reach'}`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="aspirations-empty-box">
        <svg class="svg-icon" width="32" height="32" viewBox="0 0 24 24" style="color: var(--text-tertiary); margin-bottom: 8px;">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
        </svg>
        <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 4px;">Chưa chọn nguyện vọng nào</div>
        <p style="font-size: 0.78rem; color: var(--text-tertiary); margin: 0; line-height: 1.4;">
          Bấm nút <strong>"+ Chọn NV"</strong> ở bảng gợi ý bên trái để thêm nguyện vọng vào phiếu dự kiến.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((item, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === list.length - 1;
    const diffFormatted = item.diff > 0 ? `+${item.diff.toFixed(2)}` : (item.diff === 0 ? `0.00` : `${item.diff.toFixed(2)}`);
    const diffClass = item.diff >= 0.75 ? 'safe' : (item.diff >= -0.5 ? 'reach' : 'risk');

    return `
      <div class="aspiration-item">
        <div class="asp-rank-badge">NV ${idx + 1}</div>
        <div class="asp-main-info">
          <div class="asp-title-row">
            <span class="asp-school-code">${item.schoolCode}</span>
            <span class="asp-major-name">${item.majorName}</span>
          </div>
          <div class="asp-meta-row">
            <span>Điểm chuẩn: <strong>${item.benchmark}</strong></span>
            <span>•</span>
            <span class="diff-badge ${diffClass}" style="padding: 1px 6px; font-size: 0.7rem;">${diffFormatted} đ</span>
          </div>
        </div>
        <div class="asp-actions">
          <button class="asp-move-btn" title="Đẩy lên ưu tiên cao hơn" ${isFirst ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : `onclick="moveAspiration(${idx}, -1)"`}>
            <svg class="svg-icon" width="12" height="12" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button class="asp-move-btn" title="Hạ xuống ưu tiên thấp hơn" ${isLast ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : `onclick="moveAspiration(${idx}, 1)"`}>
            <svg class="svg-icon" width="12" height="12" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button class="asp-remove-btn" title="Xóa nguyện vọng" onclick="removeAspiration(${idx})">
            <svg class="svg-icon" width="12" height="12" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function addAspiration(schoolCode, majorCode) {
  if (!GuestState.aspirations) GuestState.aspirations = [];

  if (GuestState.aspirations.length >= 10) {
    showToast('Bạn chỉ có thể chọn tối đa 10 nguyện vọng dự kiến!');
    return;
  }

  const exists = GuestState.aspirations.some(a => a.schoolCode === schoolCode && a.majorCode === majorCode);
  if (exists) {
    showToast('Nguyện vọng này đã có trong danh sách!');
    return;
  }

  let schoolFound = null;
  let majorFound = null;
  for (const u of (MOCK_DATA.universities || [])) {
    if (u.code === schoolCode) {
      const m = (u.majors || []).find(x => x.code === majorCode);
      if (m) {
        schoolFound = u;
        majorFound = m;
        break;
      }
    }
  }

  if (!schoolFound || !majorFound) return;

  const totalScore = parseFloat(document.getElementById('userScoreInput')?.value || 27.5) || 0;
  const benchmark = majorFound.benchmarks['2024'] || 25.0;
  const diff = parseFloat((totalScore - benchmark).toFixed(2));

  GuestState.aspirations.push({
    schoolCode: schoolFound.code,
    schoolName: schoolFound.name,
    schoolId: schoolFound.id,
    majorCode: majorFound.code,
    majorName: majorFound.name,
    benchmark: benchmark,
    diff: diff
  });

  saveAspirations();
  renderAspirationsList();
  calculateAdmissionsRecommendations();
  showToast(`Đã thêm NV ${GuestState.aspirations.length}: ${schoolCode} - ${majorFound.name}`);
}

function removeAspiration(index) {
  if (index < 0 || index >= GuestState.aspirations.length) return;
  GuestState.aspirations.splice(index, 1);
  saveAspirations();
  renderAspirationsList();
  calculateAdmissionsRecommendations();
  showToast('Đã xóa nguyện vọng khỏi danh sách');
}

function moveAspiration(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= GuestState.aspirations.length) return;

  const temp = GuestState.aspirations[index];
  GuestState.aspirations[index] = GuestState.aspirations[targetIndex];
  GuestState.aspirations[targetIndex] = temp;

  saveAspirations();
  renderAspirationsList();
  calculateAdmissionsRecommendations();
}

function clearAspirationsList() {
  if (!GuestState.aspirations || GuestState.aspirations.length === 0) return;
  if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách nguyện vọng đã lập?')) return;

  GuestState.aspirations = [];
  saveAspirations();
  renderAspirationsList();
  calculateAdmissionsRecommendations();
  showToast('Đã làm trống phiếu nguyện vọng dự kiến');
}

function saveAspirations() {
  try {
    localStorage.setItem('admissions_mockup_aspirations', JSON.stringify(GuestState.aspirations));
  } catch (e) {
    console.error(e);
  }
}

function saveAspirationsToWishlist() {
  if (!GuestState.aspirations || GuestState.aspirations.length === 0) {
    showToast('Phiếu nguyện vọng đang trống!');
    return;
  }

  GuestState.aspirations.forEach((item, idx) => {
    const exists = GuestState.wishlist.some(w => w.id === `asp_${item.schoolCode}_${item.majorCode}`);
    if (!exists) {
      GuestState.wishlist.push({
        id: `asp_${item.schoolCode}_${item.majorCode}`,
        name: `[NV${idx + 1}] ${item.schoolCode} - ${item.majorName}`,
        code: item.majorCode,
        monogram: item.schoolCode,
        tuition: 0
      });
    }
  });

  saveWishlist();
  showToast(`Đã lưu ${GuestState.aspirations.length} nguyện vọng vào Tủ hồ sơ cá nhân!`);
}

/* ==========================================================================
   5. BENTO UNIVERSITY CARDS
   ========================================================================== */
function renderUniversities() {
  const grid = document.getElementById('universitiesGrid');
  if (!grid || !window.MOCK_DATA) return;

  const kw = (GuestState.universitySearchKeyword || '').toLowerCase().trim();
  const countBadge = document.getElementById('uniCountBadge');

  const filtered = MOCK_DATA.universities.filter(u => {
    const matchRegion = GuestState.activeRegion === 'all' || u.region === GuestState.activeRegion;
    const matchCategory = GuestState.activeCategory === 'all' || u.category === GuestState.activeCategory;
    const matchKw = !kw || 
      u.name.toLowerCase().includes(kw) || 
      u.code.toLowerCase().includes(kw) || 
      (u.shortName && u.shortName.toLowerCase().includes(kw)) ||
      (u.city && u.city.toLowerCase().includes(kw)) ||
      (u.majors && u.majors.some(m => m.name.toLowerCase().includes(kw) || m.code.toLowerCase().includes(kw)));
    return matchRegion && matchCategory && matchKw;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} trường`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: #ffffff; border: 1px solid var(--border-glass); border-radius: 12px; color: var(--text-tertiary);">
        <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
          Không tìm thấy cơ sở đào tạo nào phù hợp
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
          Không có kết quả khớp với từ khóa "${kw}". Vui lòng thử tìm với từ khóa khác hoặc bấm nút bên dưới.
        </p>
        <button class="btn-uni-profile" onclick="resetSearchKeyword()" style="margin: 0 auto; display: inline-flex;">
          Xóa từ khóa tìm kiếm
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(u => {
    const isBookmarked = GuestState.wishlist.some(w => w.id === u.id);
    const isCompared = GuestState.comparisonList.some(c => c.id === u.id);

    return `
      <div class="bento-card uni-bento-card">
        <div>
          <div class="uni-top-info">
            <div class="monogram-badge" style="background: ${u.gradient};">
              ${u.monogram || u.code}
            </div>
            <div style="flex: 1;">
              <span class="uni-code-tag">${u.code} • ${u.shortName}</span>
              <h3 class="uni-name-title">${u.name}</h3>
              <div class="uni-meta-text">
                ${ICONS.pin} ${u.city} • Đánh giá ${u.rating}/5.0
              </div>
            </div>
            <button class="btn-mini-svg ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="toggleWishlist({ id: '${u.id}', name: '${u.name}', code: '${u.code}', schoolId: '${u.id}' })">
              ${isBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark}
            </button>
          </div>
          <p class="uni-desc-text">${u.description}</p>
          <div class="uni-stats-strip">
            <div class="stat-field-item">
              <span class="stat-field-label">Học phí trung bình</span>
              <span class="stat-field-val">${u.tuitionRange}</span>
            </div>
            <div class="stat-field-item">
              <span class="stat-field-label">Quy mô đào tạo</span>
              <span class="stat-field-val">${u.majorsCount} ngành</span>
            </div>
          </div>
        </div>
        <div class="uni-footer-actions">
          <button class="btn-uni-profile" onclick="openSchoolDetailModal('${u.id}')">
            Xem Profile & Điểm chuẩn ${ICONS.arrowRight}
          </button>
          <button class="btn-uni-compare ${isCompared ? 'active' : ''}" onclick="addToCompare('${u.id}')">
            ${isCompared ? ICONS.check + ' Đã chọn' : ICONS.compare + ' So sánh'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openSchoolDetailModal(schoolId) {
  const school = MOCK_DATA.universities.find(u => u.id === schoolId);
  if (!school) return;

  GuestState.selectedSchoolId = schoolId;

  const titleEl = document.getElementById('detailSchoolTitle');
  if (titleEl) titleEl.textContent = `${school.name} (${school.code})`;

  const logoBox = document.getElementById('detailSchoolLogo');
  if (logoBox) {
    logoBox.textContent = school.monogram || school.code;
    logoBox.style.background = school.gradient;
  }
  
  const locEl = document.getElementById('detailSchoolLocation');
  if (locEl) locEl.textContent = `Cơ sở: ${school.campuses.join(', ')}`;

  const tuitionEl = document.getElementById('detailSchoolTuition');
  if (tuitionEl) tuitionEl.textContent = school.tuitionRange;

  const descEl = document.getElementById('detailSchoolDesc');
  if (descEl) descEl.textContent = school.description;

  const planEl = document.getElementById('detailSchoolPlan');
  if (planEl) planEl.textContent = school.planHighlights;

  const tbody = document.getElementById('detailBenchmarksTbody');
  if (tbody) {
    tbody.innerHTML = school.majors.map(m => `
      <tr>
        <td><strong>${m.code}</strong></td>
        <td>
          <div style="font-weight: 600; color: var(--text-primary);">${m.name}</div>
          <div style="font-size: 0.76rem; color: var(--text-tertiary);">Tổ hợp: ${m.subjectGroups.join(', ')}</div>
        </td>
        <td><span style="font-size: 0.78rem; color: var(--text-secondary);">${m.methods.join(', ')}</span></td>
        <td style="color: var(--text-secondary); font-weight: 600;">${m.benchmarks['2022'] || '-'}</td>
        <td style="color: var(--text-secondary); font-weight: 600;">${m.benchmarks['2023'] || '-'}</td>
        <td style="font-weight: 800; color: var(--accent-primary); font-size: 0.95rem;">${m.benchmarks['2024'] || '-'}</td>
        <td style="font-weight: 700; color: var(--status-emerald);">${m.benchmarks['2025'] || '-'}</td>
        <td style="font-size: 0.76rem; color: var(--text-tertiary);">${m.subCriteria || 'Không'}</td>
      </tr>
    `).join('');
  }

  openModal('schoolDetailModal');
}

/* ==========================================================================
   7. BENTO COMPARISON ENGINE
   ========================================================================== */
function addToCompare(schoolId) {
  const school = MOCK_DATA.universities.find(u => u.id === schoolId);
  if (!school) return;

  const exists = GuestState.comparisonList.some(c => c.id === school.id);
  if (exists) {
    GuestState.comparisonList = GuestState.comparisonList.filter(c => c.id !== school.id);
    showToast(`Đã bỏ "${school.shortName}" khỏi bảng so sánh`);
  } else {
    if (GuestState.comparisonList.length >= 4) {
      alert('Chỉ có thể chọn tối đa 4 cơ sở để đối chiếu song song.');
      return;
    }
    GuestState.comparisonList.push(school);
    showToast(`Đã thêm "${school.shortName}" vào bảng so sánh`);
  }

  updateComparisonDock();
  renderUniversities();
}

function removeFromCompare(schoolId) {
  GuestState.comparisonList = GuestState.comparisonList.filter(c => c.id !== schoolId);
  updateComparisonDock();
  renderUniversities();
  renderComparisonTable();
}

function updateComparisonDock() {
  const dock = document.getElementById('comparisonDock');
  const slotsContainer = document.getElementById('dockSlots');
  const countSpan = document.getElementById('dockCount');

  if (!dock) return;

  if (GuestState.comparisonList.length > 0) {
    dock.classList.add('active');
  } else {
    dock.classList.remove('active');
  }

  if (countSpan) countSpan.textContent = `(${GuestState.comparisonList.length}/4)`;

  if (slotsContainer) {
    slotsContainer.innerHTML = GuestState.comparisonList.map(s => `
      <div class="dock-chip">
        <span>${s.code}</span>
        <button style="background:transparent; border:none; color:var(--text-tertiary); cursor:pointer;" onclick="removeFromCompare('${s.id}')">
          ${ICONS.close}
        </button>
      </div>
    `).join('');
  }
}

function openComparisonModal() {
  if (GuestState.comparisonList.length < 2) {
    alert('Vui lòng chọn ít nhất 2 trường để đưa lên bàn cân so sánh!');
    return;
  }
  renderComparisonTable();
  openModal('comparisonModal');
}

function renderComparisonTable() {
  const container = document.getElementById('comparisonTableContainer');
  if (!container) return;

  const items = GuestState.comparisonList;

  let headerHtml = '<tr><th>Chỉ số đối chiếu</th>';
  items.forEach(s => {
    headerHtml += `
      <th style="min-width: 220px; text-align: center;">
        <div class="monogram-badge" style="background: ${s.gradient}; margin: 0 auto 8px;">${s.monogram || s.code}</div>
        <div style="font-size: 1rem; font-weight: 800; color: var(--text-primary);">${s.name}</div>
        <div style="color: var(--accent-primary); font-size: 0.8rem; font-weight: 600;">Mã: ${s.code}</div>
        <button class="btn-mini-svg" style="color: var(--status-crimson); margin: 6px auto 0;" onclick="removeFromCompare('${s.id}')">
          ${ICONS.trash} Xóa
        </button>
      </th>
    `;
  });
  headerHtml += '</tr>';

  let bodyHtml = `
    <tr>
      <th>Địa điểm & Cơ sở</th>
      ${items.map(s => `<td><strong>${s.city}</strong><br><span style="font-size:0.78rem; color:var(--text-tertiary);">${s.campuses[0]}</span></td>`).join('')}
    </tr>
    <tr>
      <th>Mức học phí</th>
      ${items.map(s => `<td style="font-weight: 700; color: var(--status-amber);">${s.tuitionRange}</td>`).join('')}
    </tr>
    <tr>
      <th>Quy mô tuyển sinh</th>
      ${items.map(s => `<td><strong>${s.majorsCount}</strong> ngành</td>`).join('')}
    </tr>
    <tr>
      <th>Điểm chuẩn cao nhất (2024)</th>
      ${items.map(s => {
        const maxScore = Math.max(...s.majors.map(m => m.benchmarks['2024'] || 0));
        return `<td style="font-weight: 800; color: var(--accent-primary); font-size: 1.05rem;">${maxScore} đ</td>`;
      }).join('')}
    </tr>
    <tr>
      <th>Đề án xét tuyển</th>
      ${items.map(s => `<td><span style="font-size:0.82rem; color:var(--text-secondary);">${s.planHighlights}</span></td>`).join('')}
    </tr>
  `;

  container.innerHTML = `
    <table class="bento-table">
      <thead>${headerHtml}</thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  `;
}

/* ==========================================================================
   8. TIMELINE & SCHOLARSHIPS (schedule.html)
   ========================================================================== */
function renderScheduleCards() {
  const container = document.getElementById('scheduleGrid');
  if (!container || !window.MOCK_DATA) return;

  const kw = (GuestState.scheduleSearchKeyword || '').toLowerCase().trim();
  const filter = GuestState.activeScheduleFilter || 'all';

  let items = [];

  // 1. Mốc tuyển sinh
  if (filter === 'all' || filter === 'timeline') {
    (MOCK_DATA.timelineEvents || []).forEach(e => {
      items.push({
        itemType: 'timeline',
        id: e.id,
        categoryTag: 'Lộ trình Bộ GD&ĐT',
        title: e.title,
        subtitle: e.authority || 'Bộ Giáo dục & Đào tạo',
        dateText: e.month,
        summary: e.details,
        statusText: e.status === 'done' ? 'Đã xong' : (e.status === 'active' ? 'Đang mở' : 'Sắp diễn ra'),
        statusClass: e.status === 'done' ? 'safe' : (e.status === 'active' ? 'target' : 'reach'),
        amount: null,
        raw: e
      });
    });
  }

  // 2. Học bổng
  if (filter === 'all' || filter === 'scholarship_full' || filter === 'scholarship_corp') {
    (MOCK_DATA.scholarships || []).forEach(s => {
      const isFull = (s.category === 'Toàn phần');
      if (filter === 'scholarship_full' && !isFull) return;
      if (filter === 'scholarship_corp' && isFull) return;

      items.push({
        itemType: 'scholarship',
        id: s.id,
        categoryTag: `Học bổng • ${s.category || 'Doanh nghiệp'}`,
        title: s.title,
        subtitle: s.sponsor,
        dateText: `Hạn: ${s.deadline}`,
        summary: `Đối tượng: ${s.target}`,
        statusText: s.status,
        statusClass: s.status === 'Đang mở đơn' ? 'safe' : 'reach',
        amount: s.amount,
        raw: s
      });
    });
  }

  // Search filter
  if (kw) {
    items = items.filter(i => 
      i.title.toLowerCase().includes(kw) ||
      i.summary.toLowerCase().includes(kw) ||
      i.subtitle.toLowerCase().includes(kw) ||
      i.dateText.toLowerCase().includes(kw)
    );
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border: 1px solid var(--border-glass); border-radius: 12px; color: var(--text-tertiary);">
        Không tìm thấy mốc thời gian hoặc học bổng nào phù hợp với từ khóa "${kw}".
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="bento-card clickable-bento-card" onclick="openScheduleDetailModal('${item.itemType}', '${item.id}')" style="display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px;">
          <span class="uni-code-tag">${item.categoryTag}</span>
          <span class="zone-badge-pill ${item.statusClass}">${item.statusText}</span>
        </div>

        <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-primary); text-transform: uppercase; margin-bottom: 4px;">
          ${item.dateText}
        </div>

        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; line-height: 1.4;">
          ${item.title}
        </h4>

        <div style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 10px;">
          ${item.subtitle}
        </div>

        ${item.amount ? `
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--status-amber); margin: 6px 0 10px;">
            ${item.amount}
          </div>
        ` : ''}

        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
          ${item.summary}
        </p>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-glass); padding-top: 12px; font-size: 0.82rem;">
        <span style="color: var(--text-tertiary); font-weight: 500;">
          ${item.itemType === 'timeline' ? 'Xem quy trình chi tiết' : 'Xem điều kiện nộp đơn'}
        </span>
        <span style="color: var(--accent-primary); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
          Chi tiết ${ICONS.arrowRight}
        </span>
      </div>
    </div>
  `).join('');
}

function filterSchedule(filterType) {
  GuestState.activeScheduleFilter = filterType;
  document.querySelectorAll('.schedule-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === filterType) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderScheduleCards();
}

function onScheduleSearch(kw) {
  GuestState.scheduleSearchKeyword = kw;
  renderScheduleCards();
}

function openScheduleDetailModal(type, id) {
  const catEl = document.getElementById('sdModalCategory');
  const titleEl = document.getElementById('sdModalTitle');
  const authEl = document.getElementById('sdModalAuthority');
  const dateEl = document.getElementById('sdModalDate');
  const statusEl = document.getElementById('sdModalStatusBadge');
  const contentEl = document.getElementById('sdModalContent');
  const footerNoteEl = document.getElementById('sdModalFooterNote');
  const actionBtn = document.getElementById('sdModalActionBtn');

  if (type === 'timeline') {
    const item = (MOCK_DATA.timelineEvents || []).find(e => e.id === id);
    if (!item) return;

    GuestState.currentScheduleItemForDetail = { type: 'timeline', item };

    if (catEl) catEl.textContent = 'Mốc Lộ Trình Tuyển Sinh';
    if (titleEl) titleEl.textContent = item.title;
    if (authEl) authEl.textContent = item.authority || 'Bộ Giáo dục và Đào tạo';
    if (dateEl) dateEl.textContent = item.month;
    if (statusEl) {
      statusEl.textContent = item.status === 'done' ? 'Đã hoàn thành' : (item.status === 'active' ? 'Đang mở' : 'Sắp diễn ra');
      statusEl.className = `zone-badge-pill ${item.status === 'done' ? 'safe' : (item.status === 'active' ? 'target' : 'reach')}`;
    }
    if (footerNoteEl) footerNoteEl.textContent = 'Dữ liệu chuẩn hóa theo quy chế tuyển sinh chính thức.';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>Lưu vào tủ hồ sơ</span>`;
    }

    if (contentEl) {
      contentEl.innerHTML = `
        <p class="lead-text">${item.details}</p>

        <h3>1. Quy trình & Các bước thực hiện</h3>
        <ul>
          ${(item.procedures || ['Theo dõi hướng dẫn chi tiết từ hội đồng tuyển sinh.']).map(p => `<li>${p}</li>`).join('')}
        </ul>

        <h3>2. Hồ sơ & Giấy tờ bắt buộc</h3>
        <ul>
          ${(item.mandatoryDocs || ['Căn cước công dân gắn chip', 'Minh chứng theo quy định']).map(d => `<li>${d}</li>`).join('')}
        </ul>

        <div class="content-callout-box">
          <div class="callout-title">Lưu ý quan trọng dành cho thí sinh:</div>
          <p>${item.note || 'Thí sinh cần kiểm tra kỹ thông tin cá nhân và thời hạn nộp để không bỏ lỡ cơ hội trúng tuyển.'}</p>
        </div>
      `;
    }
  } else {
    const sch = (MOCK_DATA.scholarships || []).find(s => s.id === id);
    if (!sch) return;

    GuestState.currentScheduleItemForDetail = { type: 'scholarship', item: sch };

    if (catEl) catEl.textContent = `Quỹ Học Bổng • ${sch.category || 'Doanh nghiệp'}`;
    if (titleEl) titleEl.textContent = sch.title;
    if (authEl) authEl.textContent = sch.sponsor;
    if (dateEl) dateEl.textContent = `Hạn nộp: ${sch.deadline}`;
    if (statusEl) {
      statusEl.textContent = sch.status;
      statusEl.className = `zone-badge-pill ${sch.status === 'Đang mở đơn' ? 'safe' : 'reach'}`;
    }
    if (footerNoteEl) footerNoteEl.textContent = `Chỉ tiêu xét cấp: ${sch.quota || 'Toàn quốc'}.`;
    if (actionBtn) {
      actionBtn.innerHTML = `<span>Nộp hồ sơ trực tuyến</span>`;
    }

    if (contentEl) {
      contentEl.innerHTML = `
        <div class="content-callout-box amber" style="margin-top: 0;">
          <div class="callout-title">Giá trị gói học bổng:</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--status-amber); margin: 4px 0 6px;">
            ${sch.amount}
          </div>
          <p style="font-size: 0.84rem; color: var(--text-secondary);">
            Chỉ tiêu: <strong>${sch.quota || '50 suất'}</strong> • Hạn cuối nộp hồ sơ: <strong>${sch.deadline}</strong>
          </p>
        </div>

        <h3>1. Quyền lợi và hỗ trợ tài chính</h3>
        <ul>
          ${(sch.benefits || ['Hỗ trợ 100% học phí và trợ cấp học tập.']).map(b => `<li>${b}</li>`).join('')}
        </ul>

        <h3>2. Tiêu chuẩn & Điều kiện ứng tuyển</h3>
        <ul>
          ${(sch.requirements || ['Tốt nghiệp THPT loại Giỏi', 'Đạt điểm chuẩn tuyển sinh']).map(r => `<li>${r}</li>`).join('')}
        </ul>

        <h3>3. Hồ sơ ứng tuyển bao gồm</h3>
        <ul>
          ${(sch.dossier || ['Đơn đăng ký học bổng trực tuyến', 'Bản sao học bạ THPT']).map(d => `<li>${d}</li>`).join('')}
        </ul>

        <div class="content-callout-box">
          <div class="callout-title">Phương thức nộp hồ sơ:</div>
          <p>Thí sinh chuẩn bị đầy đủ bản scan các giấy tờ trên và bấm nút "Nộp hồ sơ trực tuyến" bên dưới để hoàn tất đăng ký.</p>
        </div>
      `;
    }
  }

  openModal('scheduleDetailModal');
}

function onScheduleDetailAction() {
  if (!GuestState.currentScheduleItemForDetail) return;
  const { type, item } = GuestState.currentScheduleItemForDetail;

  if (type === 'timeline') {
    toggleWishlist({
      id: 'evt_' + (item.id || Date.now()),
      name: item.title,
      code: item.month,
      monogram: 'MỐC',
      tuition: 0
    });
    closeModal('scheduleDetailModal');
  } else {
    showToast(`Đã mở cổng nộp hồ sơ cho học bổng "${item.title}"!`);
    closeModal('scheduleDetailModal');
  }
}

function renderTimeline() {
  const container = document.getElementById('admissionsTimeline');
  if (!container || !MOCK_DATA.timelineEvents) return;

  container.innerHTML = MOCK_DATA.timelineEvents.map(e => `
    <div class="timeline-node ${e.status}">
      <div class="timeline-marker"></div>
      <div style="font-size: 0.74rem; font-weight: 700; color: var(--accent-primary); text-transform: uppercase;">${e.month}</div>
      <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 2px 0 4px;">${e.title}</div>
      <div style="font-size: 0.82rem; color: var(--text-secondary);">${e.details}</div>
    </div>
  `).join('');
}

function renderScholarships() {
  const container = document.getElementById('scholarshipsGrid');
  if (!container || !MOCK_DATA.scholarships) return;

  container.innerHTML = MOCK_DATA.scholarships.map(s => `
    <div class="bento-card" style="margin-bottom: 14px; border-left: 3px solid var(--status-amber); background: #ffffff;">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
        <span class="zone-badge-pill reach">${s.status}</span>
        <span style="font-size: 0.72rem; color: var(--text-tertiary);">Hạn: ${s.deadline}</span>
      </div>
      <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 8px 0 4px;">${s.title}</h4>
      <div style="font-size: 0.8rem; color: var(--text-tertiary);">${s.sponsor}</div>
      <div style="font-size: 1.15rem; font-weight: 800; color: var(--status-amber); margin: 8px 0;">${s.amount}</div>
      <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">
        Yêu cầu: ${s.target}
      </div>
      <button class="btn-uni-profile" style="width: 100%;" onclick="openScheduleDetailModal('scholarship', '${s.id}')">
        Xem chi tiết học bổng ${ICONS.arrowRight}
      </button>
    </div>
  `).join('');
}

/* ==========================================================================
   9. ARTICLES (news.html)
   ========================================================================== */
function renderArticles() {
  const container = document.getElementById('articlesGrid');
  if (!container || !MOCK_DATA.articles) return;

  const kw = (GuestState.newsSearchKeyword || '').toLowerCase().trim();

  let filtered = MOCK_DATA.articles.filter(a => {
    if (GuestState.activeArticleCategory === 'all') return true;
    return a.category === GuestState.activeArticleCategory;
  });

  if (kw) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      a.summary.toLowerCase().includes(kw) ||
      a.category.toLowerCase().includes(kw) ||
      a.author.toLowerCase().includes(kw)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border: 1px solid var(--border-glass); border-radius: 12px; color: var(--text-tertiary);">
        Không tìm thấy bài viết hoặc quy chế nào phù hợp với từ khóa "${kw}".
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(a => `
    <div class="bento-card clickable-bento-card" onclick="openNewsDetailModal('${a.id}')" style="display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span class="uni-code-tag">${a.category}</span>
          <span style="font-size: 0.72rem; color: var(--text-tertiary);">${a.date}</span>
        </div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; line-height: 1.4;">${a.title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">${a.summary}</p>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: var(--text-tertiary); border-top: 1px solid var(--border-glass); padding-top: 10px;">
        <span>${a.author}</span>
        <span style="color: var(--accent-primary); font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
          Đọc chi tiết ${ICONS.arrowRight}
        </span>
      </div>
    </div>
  `).join('');
}

function filterNews(cat) {
  GuestState.activeArticleCategory = cat;
  document.querySelectorAll('.news-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderArticles();
}

function onNewsSearch(kw) {
  GuestState.newsSearchKeyword = kw;
  renderArticles();
}

function openNewsDetailModal(artId) {
  const art = (MOCK_DATA.articles || []).find(a => a.id === artId);
  if (!art) return;

  GuestState.currentArticleForDetail = art;

  const catEl = document.getElementById('ndModalCategory');
  const titleEl = document.getElementById('ndModalTitle');
  const authEl = document.getElementById('ndModalAuthor');
  const dateEl = document.getElementById('ndModalDate');
  const readTimeEl = document.getElementById('ndModalReadTime');
  const docEl = document.getElementById('ndModalOfficialDoc');
  const contentEl = document.getElementById('ndModalContent');

  if (catEl) catEl.textContent = art.category;
  if (titleEl) titleEl.textContent = art.title;
  if (authEl) authEl.textContent = art.author;
  if (dateEl) dateEl.textContent = `Ngày đăng: ${art.date}`;
  if (readTimeEl) readTimeEl.textContent = `Thời gian đọc: ${art.readTime || '4 phút'}`;
  if (docEl) docEl.textContent = art.officialDoc || 'Văn bản chính thức Bộ GD&ĐT';
  if (contentEl) {
    contentEl.innerHTML = art.fullContent || `
      <p class="lead-text">${art.summary}</p>
      <p>Nội dung chi tiết đang được cập nhật từ hệ sinh thái thông tin tuyển sinh chính thức.</p>
    `;
  }

  openModal('newsDetailModal');
}

function bookmarkCurrentArticle() {
  if (!GuestState.currentArticleForDetail) return;
  const art = GuestState.currentArticleForDetail;
  toggleWishlist({
    id: 'art_' + art.id,
    name: art.title,
    code: art.category,
    monogram: 'TIN',
    tuition: 0
  });
  closeModal('newsDetailModal');
}

/* ==========================================================================
   10. MODAL & TOAST HELPERS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showToast(message) {
  let toast = document.getElementById('guestToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'guestToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 10px 18px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      z-index: 99999;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.25s ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
  }, 2400);
}
