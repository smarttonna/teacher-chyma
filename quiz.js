/**
 * ============================================================================
 * TEACHER CHYMA - QUIZ LMS MODULE (quiz.js)
 * Student Name Entry + Level-Based Quiz + Teacher Submissions Dashboard
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

function initQuizPage() {
  renderFirebaseStatusNotice();
  setupStudentNameFlow();
  setupTeacherAuth();
  setupTeacherAdminPanels();
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
          <strong>Local Mode Active:</strong> Quizzes and student scores are saved locally in browser storage. 
          To enable live cloud sync across all devices, paste your free Firebase credentials in <code>firebase-config.js</code>.
        </div>
      </div>
    `;
  } else {
    box.innerHTML = `
      <div class="qna-alert qna-alert-success">
        <i class="fas fa-cloud-check"></i>
        <div><strong>Firebase Cloud Sync Active:</strong> Student trial results sync live with Cloud Firestore!</div>
      </div>
    `;
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

  // Prompt student for name if not set
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
      const val = document.getElementById("teacherPasscode").value;
      if (QuizService.verifyTeacher(val)) {
        alert("Welcome Teacher Chyma! Admin Dashboard unlocked.");
        if (loginModal.close) loginModal.close();
        else loginModal.style.display = "none";
        loginForm.reset();
        updateTeacherUI();
        refreshTeacherSubmissionsTable();
      } else {
        alert("Invalid passcode. Enter 'chyma2026' or teacher email.");
      }
    });
  }

  const logoutBtn = document.getElementById("teacherLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      QuizService.logout();
      alert("Logged out of Teacher Dashboard.");
      updateTeacherUI();
    });
  }
}

function updateTeacherUI() {
  const isLoggedIn = QuizService.isLoggedIn();
  const adminView = document.getElementById("teacherLoggedInView");

  if (isLoggedIn) {
    if (adminView) adminView.style.display = "block";
    refreshTeacherSubmissionsTable();
    refreshTeacherQuestionBank();
  } else {
    if (adminView) adminView.style.display = "none";
  }
}

// ----------------------------------------------------------------------------
// 3. TEACHER DASHBOARD PANELS (Submissions, Creator, Question Bank)
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

  const submissions = await QuizService.getSubmissions();
  if (submissions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
          No student quiz trials recorded yet.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = submissions.map(sub => {
    const pct = sub.percentage || Math.round((sub.score / sub.totalQuestions) * 100);
    const badgeClass = pct >= 80 ? 'qna-badge-solved' : (pct >= 60 ? 'qna-badge-open' : 'category-calculus');
    
    return `
      <tr>
        <td><strong>${escapeHTML(sub.studentName)}</strong></td>
        <td><span class="qna-category-pill category-${sub.level}">${getLevelLabel(sub.level)}</span></td>
        <td><strong>${sub.score} / ${sub.totalQuestions}</strong></td>
        <td><span class="qna-badge ${badgeClass}">${pct}%</span></td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${formatDate(sub.submittedAt)}</td>
      </tr>
    `;
  }).join("");
}

// Render Question Bank Directory
async function refreshTeacherQuestionBank(filter = "all") {
  const container = document.getElementById("adminQuestionBankList");
  if (!container) return;

  const quizzes = await QuizService.getQuizzes(filter);
  const countBadge = document.getElementById("adminQuestionCount");
  if (countBadge) countBadge.textContent = `${quizzes.length} Questions`;

  if (quizzes.length === 0) {
    container.innerHTML = `<div class="qna-empty-state"><p>No questions found for this level.</p></div>`;
    return;
  }

  container.innerHTML = quizzes.map(q => `
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
      const q = quizzes.find(item => item.id === id);
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
// 4. STUDENT QUIZ ENGINE & AUTOMATIC RESULT RECORDING
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

  // Record submission in Firebase / LocalStorage
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

  // Refresh teacher dashboard table if visible
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
