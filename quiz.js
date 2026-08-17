/**
 * ============================================================================
 * TEACHER CHYMA - ADVANCED QUIZ LMS & ADMIN SYSTEM (quiz.js)
 * Student Name Entry + Level-Based Quiz + Teacher Analytics Dashboard
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
let cachedSubmissions = [];
let cachedQuestions = [];

function initQuizPage() {
  renderFirebaseStatusNotice();
  setupPasswordToggle();
  setupStudentNameFlow();
  setupTeacherAuth();
  setupTeacherAdminPanels();
  setupLiveMcqPreview();
  setupStudentLevelSelector();

  // Load Quiz
  loadStudentQuiz(currentStudentLevel);
}

function renderFirebaseStatusNotice() {
  const box = document.getElementById("firebaseNoticeBox");
  if (!box) return;
  if (!isFirebaseConfigured) {
    box.innerHTML = `
      <div class="qna-alert qna-alert-info">
        <i class="fas fa-info-circle"></i>
        <div>
          <strong>Local Storage Active:</strong> Data is saved locally in browser storage. 
          To enable live cloud sync across all devices, paste your free Firebase credentials in <code>firebase-config.js</code>.
        </div>
      </div>
    `;
  } else {
    box.innerHTML = `
      <div class="qna-alert qna-alert-success">
        <i class="fas fa-cloud-check"></i>
        <div><strong>Firebase Cloud Sync Active:</strong> Live connected to Cloud Firestore (teacherchyma-db300)!</div>
      </div>
    `;
  }
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
// 1. STUDENT NAME PROMPT FLOW
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
    refreshTeacherQuestionBank().catch(err => console.warn("Question bank render notice:", err));
  } else {
    if (adminView) adminView.style.display = "none";
    if (loggedOutView) loggedOutView.style.display = "block";
  }
}

// ----------------------------------------------------------------------------
// 3. KPI METRICS CALCULATOR
// ----------------------------------------------------------------------------
function updateKpiMetrics(submissions = [], questions = []) {
  const kpiTotalAttempts = document.getElementById("kpiTotalAttempts");
  const kpiAvgScore = document.getElementById("kpiAvgScore");
  const kpiTotalQuestions = document.getElementById("kpiTotalQuestions");
  const kpiTopLevel = document.getElementById("kpiTopLevel");

  if (kpiTotalAttempts) kpiTotalAttempts.textContent = submissions.length;

  if (kpiAvgScore) {
    if (submissions.length === 0) {
      kpiAvgScore.textContent = "0%";
    } else {
      const sumPct = submissions.reduce((acc, curr) => acc + (curr.percentage || Math.round((curr.score / curr.totalQuestions) * 100)), 0);
      const avg = Math.round(sumPct / submissions.length);
      kpiAvgScore.textContent = `${avg}%`;
    }
  }

  if (kpiTotalQuestions) kpiTotalQuestions.textContent = questions.length;

  if (kpiTopLevel) {
    if (submissions.length === 0) {
      kpiTopLevel.textContent = "SSS";
    } else {
      const counts = {};
      submissions.forEach(s => { counts[s.level] = (counts[s.level] || 0) + 1; });
      let topCode = "sss";
      let maxCount = 0;
      Object.keys(counts).forEach(lvl => {
        if (counts[lvl] > maxCount) {
          maxCount = counts[lvl];
          topCode = lvl;
        }
      });
      kpiTopLevel.textContent = getLevelLabelShort(topCode);
    }
  }
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

    // Radio selection highlight
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
// 5. TEACHER DASHBOARD PANELS (Submissions, Creator, Question Bank)
// ----------------------------------------------------------------------------
function setupTeacherAdminPanels() {
  const tabSubmissions = document.getElementById("adminTabSubmissionsBtn");
  const tabCreate = document.getElementById("adminTabCreateBtn");
  const tabBank = document.getElementById("adminTabBankBtn");

  const panelSubmissions = document.getElementById("adminPanelSubmissions");
  const panelCreate = document.getElementById("adminPanelCreate");
  const panelBank = document.getElementById("adminPanelBank");

  if (tabSubmissions && tabCreate && tabBank) {
    tabSubmissions.addEventListener("click", () => {
      setActiveAdminTab(tabSubmissions, panelSubmissions);
      refreshTeacherSubmissionsTable();
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
    [tabSubmissions, tabCreate, tabBank].forEach(t => t.classList.remove("active"));
    [panelSubmissions, panelCreate, panelBank].forEach(p => p.style.display = "none");

    activeTab.classList.add("active");
    activePanel.style.display = "block";
  }

  // Refresh Submissions Button
  const refreshSubBtn = document.getElementById("refreshSubmissionsBtn");
  if (refreshSubBtn) {
    refreshSubBtn.addEventListener("click", () => {
      refreshTeacherSubmissionsTable();
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

  // Bank filters
  document.querySelectorAll(".admin-bank-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-bank-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      refreshTeacherQuestionBank(btn.dataset.level || "all");
    });
  });
}

// Render Teacher Student Results Table
async function refreshTeacherSubmissionsTable() {
  const tbody = document.getElementById("studentSubmissionsTableBody");
  if (!tbody) return;

  cachedSubmissions = await QuizService.getSubmissions();
  updateKpiMetrics(cachedSubmissions, cachedQuestions);
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
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
          No student trial submissions found matching filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(sub => {
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
      </tr>
    `;
  }).join("");
}

// Render Question Bank Directory
async function refreshTeacherQuestionBank(filter = "all") {
  const container = document.getElementById("adminQuestionBankList");
  if (!container) return;

  cachedQuestions = await QuizService.getQuizzes("all");
  updateKpiMetrics(cachedSubmissions, cachedQuestions);
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

  if (list.length === 0) {
    container.innerHTML = `<div class="qna-empty-state"><p>No questions found matching criteria.</p></div>`;
    return;
  }

  container.innerHTML = list.map(q => `
    <div class="admin-mcq-card" data-id="${q.id}">
      <div class="admin-mcq-header">
        <span class="qna-category-pill category-${q.level}">${getLevelLabel(q.level)}</span>
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

  // Bind Edit Click Listeners
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

  // Bind Delete Click Listeners
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
// 6. STUDENT QUIZ ENGINE & AUTOMATIC RESULT RECORDING
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
  studentQuestions = await QuizService.getQuizzes(level);
  currentQuestionIndex = 0;
  userScore = 0;

  document.getElementById("quizPlayView").style.display = "block";
  document.getElementById("quizResultView").style.display = "none";

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

  const q = studentQuestions[currentQuestionIndex];
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
        ${escapeHTML(q.question)}
      </h3>

      <div class="quiz-options-grid">
        ${q.options.map((opt, idx) => `
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
      const isCorrect = selectedIndex === q.correctIndex;

      optionBtns.forEach(b => b.style.pointerEvents = "none");

      if (isCorrect) {
        userScore++;
        btn.classList.add("correct");
        btn.querySelector("i").className = "fas fa-check-circle";

        feedbackBox.style.display = "block";
        feedbackBox.className = "quiz-feedback show";
        feedbackBox.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
        feedbackBox.style.color = "#065F46";
        feedbackBox.innerHTML = `<strong><i class="fas fa-check-circle"></i> Correct!</strong> ${escapeHTML(q.explanation || '')}`;
      } else {
        btn.classList.add("wrong");
        btn.querySelector("i").className = "fas fa-times-circle";

        const correctBtn = optionBtns[q.correctIndex];
        if (correctBtn) {
          correctBtn.classList.add("correct");
          correctBtn.querySelector("i").className = "fas fa-check-circle";
        }

        feedbackBox.style.display = "block";
        feedbackBox.className = "quiz-feedback show";
        feedbackBox.style.backgroundColor = "rgba(244, 63, 94, 0.12)";
        feedbackBox.style.color = "#991B1B";
        feedbackBox.innerHTML = `<strong><i class="fas fa-info-circle"></i> Incorrect.</strong> Correct answer is <strong>Option ${String.fromCharCode(65 + q.correctIndex)}</strong>. ${escapeHTML(q.explanation || '')}`;
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
    totalQuestions: total
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

function getLevelLabelShort(code) {
  const map = {
    primary: "Primary",
    jss: "JSS",
    sss: "SSS",
    waec: "WAEC",
    sat_igcse: "SAT/IGCSE"
  };
  return map[code] || "SSS";
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
