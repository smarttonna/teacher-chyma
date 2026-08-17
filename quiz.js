/**
 * ============================================================================
 * TEACHER CHYMA - ADVANCED QUIZ LMS & ADMIN SYSTEM (quiz.js)
 * Anti-Cheating Shuffling (Questions & Options) + Level Prompt Modal
 * ============================================================================
 */

import { QuizService, isFirebaseConfigured } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  initQuizPage();
});

let currentStudentLevel = "sss";
let studentQuestions = [];
let currentQuestionIndex = 0;
let userScore = 0;
let currentDetailedAnswers = [];
let cachedSubmissions = [];
let cachedQuestions = [];
let cachedStudents = [];

// Generic Fisher-Yates Shuffle Utility
function shuffleArray(arr) {
  const cloned = [...arr];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function initQuizPage() {
  renderFirebaseStatusNotice();
  setupPasswordToggle();
  setupStudentNameFlow();
  setupStudentLevelModal();
  setupTeacherAuth();
  setupTeacherAdminPanels();
  setupMobileSidebarDrawer();
  setupLiveMcqPreview();
  setupStudentLevelSelector();

  // Load Quiz with dynamic shuffling
  loadStudentQuiz(currentStudentLevel);
}

function renderFirebaseStatusNotice() {
  const box = document.getElementById("firebaseNoticeBox");
  if (!box) return;
  box.innerHTML = "";
}

// ----------------------------------------------------------------------------
// PASSWORD EYE TOGGLE
// ----------------------------------------------------------------------------
function setupPasswordToggle() {
  const toggleBtn = document.getElementById("togglePasscodeBtn");
  const passcodeField = document.getElementById("teacherPasscode");
  const toggleIcon = document.getElementById("togglePasscodeIcon");

  if (toggleBtn && passcodeField && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passcodeField.type === "password";
      passcodeField.type = isPassword ? "text" : "password";
      toggleIcon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
    });
  }
}

// ----------------------------------------------------------------------------
// MOBILE SIDEBAR OFF-CANVAS DRAWER
// ----------------------------------------------------------------------------
function setupMobileSidebarDrawer() {
  const openBtn = document.getElementById("openAdminSidebarBtn");
  const closeBtn = document.getElementById("closeAdminSidebarBtn");
  const sidebar = document.getElementById("adminSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  if (!sidebar) return;

  function openDrawer() {
    sidebar.classList.add("mobile-open");
    if (backdrop) backdrop.classList.add("show");
  }

  function closeDrawer() {
    sidebar.classList.remove("mobile-open");
    if (backdrop) backdrop.classList.remove("show");
  }

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  const navBtns = sidebar.querySelectorAll(".sidebar-nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        closeDrawer();
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 1. STUDENT NAME & LEVEL SELECTION PROMPT FLOWS
// ----------------------------------------------------------------------------
function getStudentName() {
  return localStorage.getItem("chyma_student_name") || "";
}

function setStudentName(name) {
  localStorage.setItem("chyma_student_name", name.trim());
  updateStudentHeaderUI();
}

function updateStudentHeaderUI() {
  const name = getStudentName() || "Guest Student";
  const nameEl = document.getElementById("displayStudentName");
  const avatarEl = document.getElementById("studentAvatarIcon");
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
}

function setupStudentNameFlow() {
  const nameModal = document.getElementById("studentNameModal");
  const nameForm = document.getElementById("studentNameForm");
  const changeNameBtn = document.getElementById("changeStudentNameBtn");

  updateStudentHeaderUI();

  if (!getStudentName() && nameModal) {
    setTimeout(() => {
      if (nameModal.showModal) nameModal.showModal();
      else nameModal.style.display = "block";
    }, 400);
  }

  if (changeNameBtn && nameModal) {
    changeNameBtn.addEventListener("click", () => {
      const inputEl = document.getElementById("inputStudentName");
      if (inputEl) inputEl.value = getStudentName();
      if (nameModal.showModal) nameModal.showModal();
      else nameModal.style.display = "block";
    });
  }

  if (nameForm) {
    nameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = document.getElementById("inputStudentName").value.trim();
      if (val) {
        setStudentName(val);
        if (nameModal.close) nameModal.close();
        else nameModal.style.display = "none";
      }
    });
  }
}

// STUDENT LEVEL SELECTION PROMPT MODAL
function setupStudentLevelModal() {
  const levelModal = document.getElementById("studentLevelModal");
  const openBtn = document.getElementById("openLevelModalBtn");

  if (!levelModal) return;

  // Prompt automatically if level has not been explicitly chosen this session
  const sessionChosen = sessionStorage.getItem("chyma_level_chosen");
  if (!sessionChosen) {
    setTimeout(() => {
      if (levelModal.showModal) levelModal.showModal();
      else levelModal.style.display = "block";
    }, 200);
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (levelModal.showModal) levelModal.showModal();
      else levelModal.style.display = "block";
    });
  }

  const selectBtns = levelModal.querySelectorAll(".modal-level-select-btn");
  selectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const level = btn.dataset.level || "sss";
      sessionStorage.setItem("chyma_level_chosen", level);
      currentStudentLevel = level;

      // Update level tab UI
      const levelBtns = document.querySelectorAll(".student-level-btn");
      levelBtns.forEach(b => {
        if (b.dataset.level === level) b.classList.add("active");
        else b.classList.remove("active");
      });

      if (levelModal.close) levelModal.close();
      else levelModal.style.display = "none";

      loadStudentQuiz(level);
    });
  });
}

// ----------------------------------------------------------------------------
// 2. TEACHER AUTHENTICATION & DASHBOARD
// ----------------------------------------------------------------------------
function setupTeacherAuth() {
  const loginBtn = document.getElementById("openTeacherLoginBtn");
  const loginModal = document.getElementById("teacherLoginModal");
  const closeLoginBtn = document.getElementById("closeTeacherLoginBtn");
  const loginForm = document.getElementById("teacherLoginForm");

  if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
      if (loginModal.showModal) loginModal.showModal();
      else loginModal.style.display = "block";
    });
  }

  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener("click", () => {
      if (loginModal.close) loginModal.close();
      else loginModal.style.display = "none";
    });
  }

  updateTeacherUI();

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }

      const input = document.getElementById("teacherPasscode");
      const val = input ? input.value : "";

      if (QuizService.verifyTeacher(val)) {
        if (loginModal) {
          try {
            if (loginModal.close) loginModal.close();
            else loginModal.style.display = "none";
          } catch(err) {}
        }
        loginForm.reset();
        updateTeacherUI(true);
      } else {
        alert("Invalid passcode or email. Please check your credentials.");
      }
    });
  }

  const logoutBtn = document.getElementById("teacherLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      QuizService.logout();
      updateTeacherUI(false);
    });
  }
}

function updateTeacherUI(shouldScroll = false) {
  const isLoggedIn = QuizService.isLoggedIn();
  const adminView = document.getElementById("teacherLoggedInView");
  const loggedOutView = document.getElementById("teacherLoggedOutView");

  if (isLoggedIn) {
    if (adminView) adminView.style.display = "block";
    if (loggedOutView) loggedOutView.style.display = "none";

    if (shouldScroll && adminView) {
      adminView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    refreshTeacherSubmissionsTable().catch(err => console.warn("Submissions render notice:", err));
    refreshTeacherRosterTable().catch(err => console.warn("Roster render notice:", err));
    refreshTeacherQuestionBank().catch(err => console.warn("Question bank render notice:", err));
  } else {
    if (adminView) adminView.style.display = "none";
    if (loggedOutView) loggedOutView.style.display = "block";
  }
}

// ----------------------------------------------------------------------------
// 3. KPI METRICS CALCULATOR
// ----------------------------------------------------------------------------
function updateKpiMetrics() {
  const kpiTotalAttempts = document.getElementById("kpiTotalAttempts");
  const kpiAvgScore = document.getElementById("kpiAvgScore");
  const kpiTotalQuestions = document.getElementById("kpiTotalQuestions");
  const kpiRegisteredStudents = document.getElementById("kpiRegisteredStudents");

  if (kpiTotalAttempts) kpiTotalAttempts.textContent = cachedSubmissions.length;

  if (kpiAvgScore) {
    if (cachedSubmissions.length === 0) {
      kpiAvgScore.textContent = "0%";
    } else {
      const sumPct = cachedSubmissions.reduce((acc, curr) => acc + (curr.percentage || Math.round((curr.score / curr.totalQuestions) * 100)), 0);
      const avg = Math.round(sumPct / cachedSubmissions.length);
      kpiAvgScore.textContent = `${avg}%`;
    }
  }

  if (kpiTotalQuestions) kpiTotalQuestions.textContent = cachedQuestions.length;
  if (kpiRegisteredStudents) kpiRegisteredStudents.textContent = cachedStudents.length;

  const overviewText = document.getElementById("overviewCountText");
  if (overviewText) overviewText.textContent = `${cachedQuestions.length} active questions`;
}

// ----------------------------------------------------------------------------
// 4. LIVE MCQ STUDENT PREVIEW WIDGET
// ----------------------------------------------------------------------------
function setupLiveMcqPreview() {
  const levelSelect = document.getElementById("mcqLevel");
  const questionInput = document.getElementById("mcqQuestionText");
  const optA = document.getElementById("mcqOptA");
  const optB = document.getElementById("mcqOptB");
  const optC = document.getElementById("mcqOptC");
  const optD = document.getElementById("mcqOptD");
  const explanationInput = document.getElementById("mcqExplanation");

  if (!questionInput) return;

  const previewPill = document.getElementById("previewLevelPill");
  const previewQuestion = document.getElementById("previewQuestionText");
  const previewA = document.getElementById("previewOptA");
  const previewB = document.getElementById("previewOptB");
  const previewC = document.getElementById("previewOptC");
  const previewD = document.getElementById("previewOptD");
  const previewExpl = document.getElementById("previewExplanation");

  function updatePreview() {
    if (levelSelect && previewPill) {
      previewPill.textContent = getLevelLabel(levelSelect.value);
      previewPill.className = `qna-category-pill category-${levelSelect.value}`;
    }

    if (questionInput && previewQuestion) {
      previewQuestion.textContent = questionInput.value.trim() || "Your question text will appear here as you type...";
    }

    if (optA && previewA) previewA.querySelector("span:last-child").textContent = optA.value.trim() || "Option A text";
    if (optB && previewB) previewB.querySelector("span:last-child").textContent = optB.value.trim() || "Option B text";
    if (optC && previewC) previewC.querySelector("span:last-child").textContent = optC.value.trim() || "Option C text";
    if (optD && previewD) previewD.querySelector("span:last-child").textContent = optD.value.trim() || "Option D text";

    const radios = document.querySelectorAll("input[name='correctAnswer']");
    radios.forEach((r, idx) => {
      const targetPill = [previewA, previewB, previewC, previewD][idx];
      if (targetPill) {
        if (r.checked) targetPill.classList.add("opt-correct");
        else targetPill.classList.remove("opt-correct");
      }
    });

    if (explanationInput && previewExpl) {
      const val = explanationInput.value.trim();
      if (val) {
        previewExpl.style.display = "block";
        previewExpl.querySelector("span").textContent = val;
      } else {
        previewExpl.style.display = "none";
      }
    }
  }

  [levelSelect, questionInput, optA, optB, optC, optD, explanationInput].forEach(el => {
    if (el) el.addEventListener("input", updatePreview);
  });

  document.querySelectorAll("input[name='correctAnswer']").forEach(r => {
    r.addEventListener("change", updatePreview);
  });
}

// ----------------------------------------------------------------------------
// 5. TEACHER DASHBOARD PANELS (Overview, Submissions, Roster, Creator, Question Bank)
// ----------------------------------------------------------------------------
function setupTeacherAdminPanels() {
  const tabOverview = document.getElementById("adminTabOverviewBtn");
  const tabSubmissions = document.getElementById("adminTabSubmissionsBtn");
  const tabRoster = document.getElementById("adminTabRosterBtn");
  const tabCreate = document.getElementById("adminTabCreateBtn");
  const tabBank = document.getElementById("adminTabBankBtn");

  const panelOverview = document.getElementById("adminPanelOverview");
  const panelSubmissions = document.getElementById("adminPanelSubmissions");
  const panelRoster = document.getElementById("adminPanelRoster");
  const panelCreate = document.getElementById("adminPanelCreate");
  const panelBank = document.getElementById("adminPanelBank");

  if (tabOverview && tabSubmissions && tabRoster && tabCreate && tabBank) {
    tabOverview.addEventListener("click", () => {
      setActiveAdminTab(tabOverview, panelOverview);
    });

    tabSubmissions.addEventListener("click", () => {
      setActiveAdminTab(tabSubmissions, panelSubmissions);
      refreshTeacherSubmissionsTable();
    });

    tabRoster.addEventListener("click", () => {
      setActiveAdminTab(tabRoster, panelRoster);
      refreshTeacherRosterTable();
    });

    tabCreate.addEventListener("click", () => {
      setActiveAdminTab(tabCreate, panelCreate);
    });

    tabBank.addEventListener("click", () => {
      setActiveAdminTab(tabBank, panelBank);
      refreshTeacherQuestionBank();
    });
  }

  function setActiveAdminTab(activeTab, activePanel) {
    [tabOverview, tabSubmissions, tabRoster, tabCreate, tabBank].forEach(t => t && t.classList.remove("active"));
    [panelOverview, panelSubmissions, panelRoster, panelCreate, panelBank].forEach(p => p && (p.style.display = "none"));

    if (activeTab) activeTab.classList.add("active");
    if (activePanel) activePanel.style.display = "block";
  }

  // Refresh Submissions Button
  const refreshSubBtn = document.getElementById("refreshSubmissionsBtn");
  if (refreshSubBtn) {
    refreshSubBtn.addEventListener("click", () => {
      refreshTeacherSubmissionsTable();
    });
  }

  // Seed 404 DOCX Questions Button
  const seedBtn = document.getElementById("seed200Btn");
  if (seedBtn) {
    seedBtn.addEventListener("click", async () => {
      if (confirm("Delete all existing questions and load 404 questions from DOCX files (Fractions & Factors/LCM/HCF)?")) {
        seedBtn.disabled = true;
        seedBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Uploading 404 DOCX Questions...`;
        try {
          await QuizService.seed200Quizzes();
          alert("🎉 404 DOCX Questions (Fractions & Factors/LCM/HCF) uploaded successfully!");
          refreshTeacherQuestionBank();
          loadStudentQuiz(currentStudentLevel);
        } catch (err) {
          alert("Notice: " + err.message);
        } finally {
          seedBtn.disabled = false;
          seedBtn.innerHTML = `<i class="fas fa-file-word"></i> Load 404 DOCX Questions (Fractions & Factors)`;
        }
      }
    });
  }

  // Select All MCQs Checkbox & Delete Selected Button
  const selectAllCheckbox = document.getElementById("selectAllMcqsCheckbox");
  const deleteSelectedBtn = document.getElementById("deleteSelectedMcqsBtn");

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", () => {
      const visibleCheckboxes = document.querySelectorAll(".mcq-select-checkbox");
      visibleCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
      updateSelectedMcqsCounter();
    });
  }

  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", async () => {
      const checkedBoxes = document.querySelectorAll(".mcq-select-checkbox:checked");
      const selectedIds = Array.from(checkedBoxes).map(cb => cb.dataset.id);

      if (selectedIds.length === 0) return;

      if (confirm(`Are you sure you want to delete ${selectedIds.length} selected questions?`)) {
        deleteSelectedBtn.disabled = true;
        deleteSelectedBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Deleting ${selectedIds.length}...`;

        try {
          await QuizService.deleteMultipleQuizzes(selectedIds);
          alert(`🗑️ ${selectedIds.length} questions deleted successfully!`);
          if (selectAllCheckbox) selectAllCheckbox.checked = false;
          refreshTeacherQuestionBank();
          loadStudentQuiz(currentStudentLevel);
        } catch (err) {
          alert("Notice: " + err.message);
        } finally {
          deleteSelectedBtn.disabled = true;
        }
      }
    });
  }

  // Submissions Search & Level Filter
  const subSearchInput = document.getElementById("submissionSearchInput");
  const subLevelFilter = document.getElementById("submissionLevelFilter");

  if (subSearchInput) subSearchInput.addEventListener("input", filterAndRenderSubmissions);
  if (subLevelFilter) subLevelFilter.addEventListener("change", filterAndRenderSubmissions);

  // Bank Search Input
  const bankSearchInput = document.getElementById("bankSearchInput");
  if (bankSearchInput) bankSearchInput.addEventListener("input", filterAndRenderQuestionBank);

  // Register Student Form submit
  const regStudentForm = document.getElementById("registerStudentForm");
  if (regStudentForm) {
    regStudentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("regStudentName").value.trim();
      const level = document.getElementById("regStudentLevel").value;
      const pin = document.getElementById("regStudentPin").value.trim();
      const email = document.getElementById("regStudentEmail").value.trim();

      const submitBtn = regStudentForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;

      try {
        await QuizService.saveStudentAccount({ name, level, pin, email });
        alert(`🎓 Student account for "${name}" registered successfully!`);
        regStudentForm.reset();
        refreshTeacherRosterTable();
      } catch (err) {
        alert("Failed to register student: " + err.message);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // MCQ Creator Form submit
  const mcqForm = document.getElementById("mcqCreatorForm");
  if (mcqForm) {
    mcqForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const level = document.getElementById("mcqLevel").value;
      const question = document.getElementById("mcqQuestionText").value.trim();
      const optA = document.getElementById("mcqOptA").value.trim();
      const optB = document.getElementById("mcqOptB").value.trim();
      const optC = document.getElementById("mcqOptC").value.trim();
      const optD = document.getElementById("mcqOptD").value.trim();
      const explanation = document.getElementById("mcqExplanation").value.trim();

      const correctRadio = mcqForm.querySelector("input[name='correctAnswer']:checked");
      if (!correctRadio) {
        alert("Please select which Option is the Correct Answer.");
        return;
      }
      const correctIndex = parseInt(correctRadio.value, 10);

      const submitBtn = mcqForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;

      try {
        await QuizService.createQuiz({
          level,
          question,
          options: [optA, optB, optC, optD],
          correctIndex,
          explanation
        });

        alert("🎉 Question added to " + getLevelLabel(level) + " Question Bank!");
        mcqForm.reset();
        refreshTeacherQuestionBank();
        if (currentStudentLevel === level) loadStudentQuiz(currentStudentLevel);
      } catch (err) {
        alert("Failed to save question: " + err.message);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Edit Modal Form Submit Handlers
  const editModal = document.getElementById("editMcqModal");
  const editForm = document.getElementById("editMcqForm");
  const closeEditBtn = document.getElementById("closeEditMcqModalBtn");

  if (closeEditBtn && editModal) {
    closeEditBtn.addEventListener("click", () => {
      if (editModal.close) editModal.close();
      else editModal.style.display = "none";
    });
  }

  if (editForm) {
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("editMcqId").value;
      const level = document.getElementById("editMcqLevel").value;
      const question = document.getElementById("editMcqQuestionText").value.trim();
      const optA = document.getElementById("editMcqOptA").value.trim();
      const optB = document.getElementById("editMcqOptB").value.trim();
      const optC = document.getElementById("editMcqOptC").value.trim();
      const optD = document.getElementById("editMcqOptD").value.trim();
      const explanation = document.getElementById("editMcqExplanation").value.trim();

      const correctRadio = editForm.querySelector("input[name='editCorrectAnswer']:checked");
      if (!correctRadio) {
        alert("Please select which Option is the Correct Answer.");
        return;
      }
      const correctIndex = parseInt(correctRadio.value, 10);

      const submitBtn = editForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;

      try {
        await QuizService.updateQuiz(id, {
          level,
          question,
          options: [optA, optB, optC, optD],
          correctIndex,
          explanation
        });

        alert("✨ Question updated successfully!");
        if (editModal.close) editModal.close();
        else editModal.style.display = "none";

        const currentActiveFilter = document.querySelector(".admin-bank-filter.active")?.dataset.level || "all";
        refreshTeacherQuestionBank(currentActiveFilter);
        loadStudentQuiz(currentStudentLevel);
      } catch (err) {
        alert("Failed to update question: " + err.message);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Close Diagnostics Breakdown Modal handler
  const detailsModal = document.getElementById("submissionDetailsModal");
  const closeDetailsBtn = document.getElementById("closeSubmissionDetailsModalBtn");
  if (closeDetailsBtn && detailsModal) {
    closeDetailsBtn.addEventListener("click", () => {
      if (detailsModal.close) detailsModal.close();
      else detailsModal.style.display = "none";
    });
  }

  // Bank filters
  document.querySelectorAll(".admin-bank-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-bank-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      refreshTeacherQuestionBank(btn.dataset.level || "all");
    });
  });
}

function updateSelectedMcqsCounter() {
  const checkedBoxes = document.querySelectorAll(".mcq-select-checkbox:checked");
  const count = checkedBoxes.length;

  const counterEl = document.getElementById("selectedMcqsCounter");
  const deleteBtn = document.getElementById("deleteSelectedMcqsBtn");
  const countBtnSpan = document.getElementById("deleteBtnCount");

  if (counterEl) counterEl.textContent = `${count} Selected`;
  if (countBtnSpan) countBtnSpan.textContent = count;

  if (deleteBtn) {
    deleteBtn.disabled = (count === 0);
  }
}

// Render Registered Student Roster
async function refreshTeacherRosterTable() {
  const tbody = document.getElementById("studentRosterTableBody");
  if (!tbody) return;

  cachedStudents = await QuizService.getStudentAccounts();
  updateKpiMetrics();

  const countBadge = document.getElementById("studentRosterCount");
  if (countBadge) countBadge.textContent = `${cachedStudents.length} Students`;

  if (cachedStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 24px;">No registered students yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = cachedStudents.map(std => `
    <tr>
      <td>
        <strong>${escapeHTML(std.name)}</strong>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${escapeHTML(std.email || '')}</div>
      </td>
      <td><span class="qna-category-pill category-${std.level}">${getLevelLabel(std.level)}</span></td>
      <td><code>${escapeHTML(std.pin || '1234')}</code></td>
      <td>
        <button class="btn-delete-student btn-delete-mcq" data-id="${std.id}">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".btn-delete-student").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (confirm("Remove this student from roster?")) {
        await QuizService.deleteStudentAccount(btn.dataset.id);
        refreshTeacherRosterTable();
      }
    });
  });
}

// Render Teacher Student Results Table
async function refreshTeacherSubmissionsTable() {
  const tbody = document.getElementById("studentSubmissionsTableBody");
  if (!tbody) return;

  cachedSubmissions = await QuizService.getSubmissions();
  updateKpiMetrics();
  filterAndRenderSubmissions();
}

function filterAndRenderSubmissions() {
  const tbody = document.getElementById("studentSubmissionsTableBody");
  if (!tbody) return;

  const searchQuery = (document.getElementById("submissionSearchInput")?.value || "").toLowerCase().trim();
  const levelFilter = document.getElementById("submissionLevelFilter")?.value || "all";

  let list = cachedSubmissions;

  if (levelFilter !== "all") {
    list = list.filter(s => s.level === levelFilter);
  }

  if (searchQuery) {
    list = list.filter(s => (s.studentName || "").toLowerCase().includes(searchQuery));
  }

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">
          No student trial submissions found matching filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map((sub, index) => {
    const pct = sub.percentage || Math.round((sub.score / sub.totalQuestions) * 100);
    const progressColor = pct >= 80 ? '#10B981' : (pct >= 60 ? '#6366F1' : '#F43F5E');
    const badgeClass = pct >= 80 ? 'qna-badge-solved' : (pct >= 60 ? 'qna-badge-open' : 'category-calculus');
    const firstLetter = (sub.studentName || "S").charAt(0).toUpperCase();

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="qna-avatar" style="width: 32px; height: 32px; font-size: 0.85rem;">${firstLetter}</div>
            <strong>${escapeHTML(sub.studentName)}</strong>
          </div>
        </td>
        <td><span class="qna-category-pill category-${sub.level}">${getLevelLabel(sub.level)}</span></td>
        <td><strong>${sub.score} / ${sub.totalQuestions}</strong></td>
        <td>
          <div class="score-progress-wrapper">
            <div class="score-progress-bar">
              <div class="score-progress-fill" style="width: ${pct}%; background-color: ${progressColor};"></div>
            </div>
            <span class="qna-badge ${badgeClass}" style="font-size: 0.78rem;">${pct}%</span>
          </div>
        </td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${formatDate(sub.submittedAt)}</td>
        <td>
          <button class="btn btn-outline btn-sm btn-view-submission-details" data-index="${index}" style="padding: 4px 10px; font-size: 0.78rem;">
            <i class="fas fa-search-plus"></i> View Breakdown
          </button>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll(".btn-view-submission-details").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index, 10);
      const sub = list[index];
      if (sub) openSubmissionDetailsModal(sub);
    });
  });
}

// Open Diagnostics Breakdown Modal (Passed vs Failed Questions)
function openSubmissionDetailsModal(sub) {
  const modal = document.getElementById("submissionDetailsModal");
  if (!modal) return;

  const headerSummary = document.getElementById("modalStudentHeaderSummary");
  const listContainer = document.getElementById("modalQuestionBreakdownList");
  const pct = sub.percentage || Math.round((sub.score / sub.totalQuestions) * 100);

  if (headerSummary) {
    headerSummary.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${escapeHTML(sub.studentName)}</h3>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            Submitted on <strong>${formatDate(sub.submittedAt)}</strong> for <span class="qna-category-pill category-${sub.level}">${getLevelLabel(sub.level)}</span>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">${sub.score} / ${sub.totalQuestions}</div>
          <div style="font-size: 0.9rem; font-weight: 700; color: ${pct >= 80 ? '#10B981' : '#6366F1'};">${pct}% Score</div>
        </div>
      </div>
    `;
  }

  if (listContainer) {
    const answers = sub.detailedAnswers || [];
    if (answers.length === 0) {
      listContainer.innerHTML = `<div class="qna-empty-state"><p>Detailed question responses were not recorded for this trial.</p></div>`;
    } else {
      listContainer.innerHTML = answers.map((ans, i) => `
        <div class="result-breakdown-card ${ans.isCorrect ? 'is-correct' : 'is-wrong'}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">Question ${i + 1}</span>
            <span class="result-status-badge ${ans.isCorrect ? 'status-badge-correct' : 'status-badge-wrong'}">
              <i class="fas ${ans.isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
              ${ans.isCorrect ? 'PASSED / CORRECT' : 'FAILED / INCORRECT'}
            </span>
          </div>

          <h5 style="font-size: 0.98rem; font-weight: 700; color: var(--text-main); margin-bottom: 10px;">${escapeHTML(ans.questionText)}</h5>

          <div class="breakdown-choice-box">
            <div class="breakdown-choice-pill ${ans.isCorrect ? 'choice-user-correct' : 'choice-user-wrong'}">
              <span><strong>Student Selected:</strong> ${escapeHTML(ans.selectedOption)}</span>
              <i class="fas ${ans.isCorrect ? 'fa-check' : 'fa-times'}"></i>
            </div>

            ${!ans.isCorrect ? `
              <div class="breakdown-choice-pill choice-actual-correct">
                <span><strong>Correct Answer:</strong> ${escapeHTML(ans.correctOption)}</span>
                <i class="fas fa-check-circle" style="color: #10B981;"></i>
              </div>
            ` : ''}
          </div>

          ${ans.explanation ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;"><strong>Explanation:</strong> ${escapeHTML(ans.explanation)}</div>` : ''}
        </div>
      `).join("");
    }
  }

  if (modal.showModal) modal.showModal();
  else modal.style.display = "block";
}

// Render Question Bank Directory with Multi-Select Checkboxes
async function refreshTeacherQuestionBank(filter = "all") {
  const container = document.getElementById("adminQuestionBankList");
  if (!container) return;

  cachedQuestions = await QuizService.getQuizzes("all");
  updateKpiMetrics();
  filterAndRenderQuestionBank(filter);
}

function filterAndRenderQuestionBank(activeFilter = "all") {
  const container = document.getElementById("adminQuestionBankList");
  if (!container) return;

  const searchQuery = (document.getElementById("bankSearchInput")?.value || "").toLowerCase().trim();
  const filter = typeof activeFilter === "string" ? activeFilter : (document.querySelector(".admin-bank-filter.active")?.dataset.level || "all");

  let list = cachedQuestions;

  if (filter !== "all") {
    list = list.filter(q => q.level === filter);
  }

  if (searchQuery) {
    list = list.filter(q => (q.question || "").toLowerCase().includes(searchQuery));
  }

  const countBadge = document.getElementById("adminQuestionCount");
  if (countBadge) countBadge.textContent = `${list.length} Questions`;

  const selectAllCb = document.getElementById("selectAllMcqsCheckbox");
  if (selectAllCb) selectAllCb.checked = false;
  updateSelectedMcqsCounter();

  if (list.length === 0) {
    container.innerHTML = `<div class="qna-empty-state"><p>No questions found matching criteria.</p></div>`;
    return;
  }

  container.innerHTML = list.map(q => `
    <div class="admin-mcq-card" data-id="${q.id}">
      <div class="admin-mcq-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" class="mcq-select-checkbox" data-id="${q.id}" />
          <span class="qna-category-pill category-${q.level}">${getLevelLabel(q.level)}</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-edit-mcq" data-id="${q.id}" style="background: rgba(14, 165, 233, 0.1); color: #0EA5E9; border: 1px solid rgba(14, 165, 233, 0.3); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; cursor: pointer;">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn-delete-mcq" data-id="${q.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
      <h4 class="admin-mcq-question">${escapeHTML(q.question)}</h4>
      <div class="admin-mcq-options-grid">
        ${q.options.map((opt, idx) => `
          <div class="admin-opt-pill ${idx === q.correctIndex ? 'opt-correct' : ''}">
            <span class="opt-label">${String.fromCharCode(65 + idx)}:</span>
            <span>${escapeHTML(opt)}</span>
            ${idx === q.correctIndex ? '<i class="fas fa-check-circle" style="color: #10B981;"></i>' : ''}
          </div>
        `).join("")}
      </div>
      ${q.explanation ? `<div class="admin-mcq-explanation"><strong>Explanation:</strong> ${escapeHTML(q.explanation)}</div>` : ''}
    </div>
  `).join("");

  container.querySelectorAll(".mcq-select-checkbox").forEach(cb => {
    cb.addEventListener("change", updateSelectedMcqsCounter);
  });

  const editModal = document.getElementById("editMcqModal");
  container.querySelectorAll(".btn-edit-mcq").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const q = cachedQuestions.find(item => item.id === id);
      if (!q) return;

      document.getElementById("editMcqId").value = q.id;
      document.getElementById("editMcqLevel").value = q.level;
      document.getElementById("editMcqQuestionText").value = q.question;
      document.getElementById("editMcqOptA").value = q.options[0] || "";
      document.getElementById("editMcqOptB").value = q.options[1] || "";
      document.getElementById("editMcqOptC").value = q.options[2] || "";
      document.getElementById("editMcqOptD").value = q.options[3] || "";
      document.getElementById("editMcqExplanation").value = q.explanation || "";

      const radioToSelect = document.querySelector(`input[name='editCorrectAnswer'][value='${q.correctIndex}']`);
      if (radioToSelect) radioToSelect.checked = true;

      if (editModal) {
        if (editModal.showModal) editModal.showModal();
        else editModal.style.display = "block";
      }
    });
  });

  container.querySelectorAll(".btn-delete-mcq").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (confirm("Delete this question?")) {
        await QuizService.deleteQuiz(id);
        refreshTeacherQuestionBank(filter);
        loadStudentQuiz(currentStudentLevel);
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 6. STUDENT QUIZ ENGINE & DYNAMIC RUNTIME SHUFFLING
// ----------------------------------------------------------------------------
function setupStudentLevelSelector() {
  const levelBtns = document.querySelectorAll(".student-level-btn");
  levelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      levelBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentStudentLevel = btn.dataset.level || "sss";
      loadStudentQuiz(currentStudentLevel);
    });
  });

  const restartBtn = document.getElementById("quizRestartBtn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      loadStudentQuiz(currentStudentLevel);
    });
  }
}

async function loadStudentQuiz(level) {
  const activeNameEl = document.getElementById("activeLevelName");
  if (activeNameEl) activeNameEl.textContent = getLevelLabel(level);

  const rawQuestions = await QuizService.getQuizzes(level);
  
  // Anti-Cheating Step 1: Dynamically Shuffle Question Sequence on Every Load / Retake
  studentQuestions = shuffleArray(rawQuestions);

  currentQuestionIndex = 0;
  userScore = 0;
  currentDetailedAnswers = [];

  const playView = document.getElementById("quizPlayView");
  const resultView = document.getElementById("quizResultView");

  if (playView) playView.style.display = "block";
  if (resultView) resultView.style.display = "none";

  renderStudentQuestion();
}

function renderStudentQuestion() {
  const playView = document.getElementById("quizPlayView");
  if (!playView) return;

  if (!studentQuestions || studentQuestions.length === 0) {
    playView.innerHTML = `
      <div class="qna-empty-state" style="padding: 40px 20px;">
        <i class="fas fa-graduation-cap qna-empty-icon"></i>
        <h3>No Questions for ${getLevelLabel(currentStudentLevel)}</h3>
        <p>Teacher Chyma has not added questions for this level yet.</p>
      </div>
    `;
    return;
  }

  const rawQ = studentQuestions[currentQuestionIndex];

  // Anti-Cheating Step 2: Dynamically Permute Answer Options & Track Correct Choice
  const correctText = rawQ.options[rawQ.correctIndex];
  const shuffledOptions = shuffleArray(rawQ.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctText);

  // Active question state for rendering
  const activeQ = {
    ...rawQ,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };

  const progressPct = ((currentQuestionIndex + 1) / studentQuestions.length) * 100;

  playView.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${progressPct}%"></div>
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span class="qna-category-pill category-${currentStudentLevel}">${getLevelLabel(currentStudentLevel)}</span>
      <span style="font-weight: 700; color: var(--primary); font-size: 0.9rem;">
        Question ${currentQuestionIndex + 1} of ${studentQuestions.length}
      </span>
    </div>

    <div class="quiz-question-box">
      <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 20px; line-height: 1.5; color: var(--text-main);">
        ${escapeHTML(activeQ.question)}
      </h3>

      <div class="quiz-options-grid">
        ${activeQ.options.map((opt, idx) => `
          <button class="quiz-option-btn student-opt-btn" data-index="${idx}">
            <span><strong>${String.fromCharCode(65 + idx)}:</strong> ${escapeHTML(opt)}</span>
            <i class="far fa-circle"></i>
          </button>
        `).join("")}
      </div>
    </div>

    <div id="quizFeedbackBox" class="quiz-feedback" style="display: none;"></div>

    <div style="margin-top: 20px; text-align: right;">
      <button class="btn btn-primary" id="studentNextBtn" style="display: none;">
        <span>${currentQuestionIndex + 1 === studentQuestions.length ? 'Submit Quiz & View Results' : 'Next Question'}</span>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;

  const optionBtns = playView.querySelectorAll(".student-opt-btn");
  const feedbackBox = document.getElementById("quizFeedbackBox");
  const nextBtn = document.getElementById("studentNextBtn");

  optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedIndex = parseInt(btn.dataset.index, 10);
      const isCorrect = selectedIndex === activeQ.correctIndex;

      optionBtns.forEach(b => b.style.pointerEvents = "none");

      // Record detailed attempt response with dynamically shuffled choice text
      currentDetailedAnswers.push({
        questionText: activeQ.question,
        selectedOption: activeQ.options[selectedIndex] || "No selection",
        correctOption: activeQ.options[activeQ.correctIndex] || "Unknown",
        isCorrect,
        explanation: activeQ.explanation || ""
      });

      if (isCorrect) {
        userScore++;
        btn.classList.add("correct");
        btn.querySelector("i").className = "fas fa-check-circle";

        feedbackBox.style.display = "block";
        feedbackBox.className = "quiz-feedback show";
        feedbackBox.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
        feedbackBox.style.color = "#065F46";
        feedbackBox.innerHTML = `<strong><i class="fas fa-check-circle"></i> Correct!</strong> ${escapeHTML(activeQ.explanation || '')}`;
      } else {
        btn.classList.add("wrong");
        btn.querySelector("i").className = "fas fa-times-circle";

        const correctBtn = optionBtns[activeQ.correctIndex];
        if (correctBtn) {
          correctBtn.classList.add("correct");
          correctBtn.querySelector("i").className = "fas fa-check-circle";
        }

        feedbackBox.style.display = "block";
        feedbackBox.className = "quiz-feedback show";
        feedbackBox.style.backgroundColor = "rgba(244, 63, 94, 0.12)";
        feedbackBox.style.color = "#991B1B";
        feedbackBox.innerHTML = `<strong><i class="fas fa-info-circle"></i> Incorrect.</strong> Correct answer is <strong>Option ${String.fromCharCode(65 + activeQ.correctIndex)}: ${escapeHTML(activeQ.options[activeQ.correctIndex])}</strong>. ${escapeHTML(activeQ.explanation || '')}`;
      }

      nextBtn.style.display = "inline-flex";
    });
  });

  nextBtn.addEventListener("click", async () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < studentQuestions.length) {
      renderStudentQuestion();
    } else {
      await recordAndShowFinalResults();
    }
  });
}

async function recordAndShowFinalResults() {
  const playView = document.getElementById("quizPlayView");
  const resultView = document.getElementById("quizResultView");

  playView.style.display = "none";
  resultView.style.display = "block";

  const total = studentQuestions.length;
  const percentage = Math.round((userScore / total) * 100);
  const studentName = getStudentName() || "Guest Student";

  await QuizService.saveSubmission({
    studentName,
    level: currentStudentLevel,
    score: userScore,
    totalQuestions: total,
    detailedAnswers: currentDetailedAnswers
  });

  const scoreText = document.getElementById("resultScoreText");
  const scoreMsg = document.getElementById("resultMsg");

  if (scoreText) {
    scoreText.innerHTML = `
      <div style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px;">Trial Results for <strong>${escapeHTML(studentName)}</strong></div>
      <div style="font-size: 2.4rem; font-weight: 800; color: var(--primary);">${userScore} / ${total}</div>
      <div style="font-size: 1.1rem; color: var(--accent-emerald); font-weight: 700;">${percentage}% Final Score</div>
    `;
  }

  if (scoreMsg) {
    if (percentage === 100) {
      scoreMsg.innerHTML = "🎉 <strong>Perfect Score!</strong> Excellent job, " + escapeHTML(studentName) + "! Your score has been submitted to Teacher Chyma.";
    } else if (percentage >= 75) {
      scoreMsg.innerHTML = "👏 <strong>Great Performance!</strong> Well done, " + escapeHTML(studentName) + "! Your trial results are saved.";
    } else {
      scoreMsg.innerHTML = "💪 <strong>Good Try!</strong> Keep practicing, " + escapeHTML(studentName) + ". Teacher Chyma will review your quiz attempt!";
    }
  }

  if (QuizService.isLoggedIn()) {
    refreshTeacherSubmissionsTable();
  }
}

// Helpers
function getLevelLabel(code) {
  const map = {
    primary: "Primary 4 - 6",
    jss: "Junior Secondary",
    sss: "Senior Secondary",
    waec: "WAEC / NECO Prep",
    sat_igcse: "IGCSE / SAT Math"
  };
  return map[code] || "All Levels";
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function formatDate(dateInput) {
  if (!dateInput) return "Recently";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "Recently";
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
