/**
 * EZEIGBO CHIDIMMA MARY - MATHEMATICS EDUCATOR WEBSITE
 * JavaScript Interactivity, Interactive Tabs & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initInteractiveTabs();
  initQuizGame();
  initPlanEstimator();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Light / Dark Theme Switcher
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('dimma_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dimma_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = toggleBtn.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
      } else {
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Generic Interactive Tabs Switcher
   -------------------------------------------------------------------------- */
function initInteractiveTabs() {
  // Bind all tab bars with data-tab-group
  const tabGroups = document.querySelectorAll('[data-tab-group]');
  tabGroups.forEach(group => {
    const groupName = group.dataset.tabGroup;
    const tabBtns = group.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll(`[data-tab-content="${groupName}"]`);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tabTarget;

        // Toggle button active
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle content active
        tabContents.forEach(content => {
          if (content.id === targetTab) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  });

  // EdTech Card Switcher
  const edtechCards = document.querySelectorAll('.edtech-btn-card');
  const edtechPreviews = document.querySelectorAll('.edtech-preview-item');
  if (edtechCards.length > 0) {
    edtechCards.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.dataset.edtechTarget;
        edtechCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        edtechPreviews.forEach(prev => {
          if (prev.id === target) prev.style.display = 'block';
          else prev.style.display = 'none';
        });
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. Interactive Quick Math Challenge Widget
   -------------------------------------------------------------------------- */
const QUIZ_DATA = {
  primary: [
    {
      question: "What is 15 + (4 × 3)?",
      options: ["57", "27", "32", "24"],
      correct: 1,
      explanation: "Following BODMAS: Multiply first (4 × 3 = 12), then add (15 + 12 = 27)."
    },
    {
      question: "Rectangle length = 8cm, width = 5cm. What is its perimeter?",
      options: ["40 cm", "26 cm", "13 cm", "30 cm"],
      correct: 1,
      explanation: "Perimeter = 2 × (8 + 5) = 26 cm."
    },
    {
      question: "Convert 3/5 into a decimal.",
      options: ["0.35", "0.6", "0.5", "0.75"],
      correct: 1,
      explanation: "3 divided by 5 equals 0.6."
    }
  ],
  secondary: [
    {
      question: "Solve for x: 3x - 7 = 14",
      options: ["x = 5", "x = 7", "x = 6", "x = 8"],
      correct: 1,
      explanation: "Add 7: 3x = 21. Divide by 3: x = 7."
    },
    {
      question: "Find area of a circle with radius 7cm (π = 22/7).",
      options: ["154 cm²", "44 cm²", "88 cm²", "308 cm²"],
      correct: 0,
      explanation: "Area = πr² = (22/7) × 7 × 7 = 154 cm²."
    },
    {
      question: "Find slope passing through (2, 3) and (4, 11).",
      options: ["2", "4", "3", "8"],
      correct: 1,
      explanation: "Slope m = (11 - 3)/(4 - 2) = 8/2 = 4."
    }
  ],
  examprep: [
    {
      question: "If log₁₀(x) = 3, what is x?",
      options: ["30", "100", "1000", "300"],
      correct: 2,
      explanation: "By definition, 10³ = x, so x = 1000."
    },
    {
      question: "In right triangle, hyp = 13 cm, adj = 12 cm. What is cos(θ)?",
      options: ["5/13", "12/13", "5/12", "12/5"],
      correct: 1,
      explanation: "cos(θ) = Adjacent / Hypotenuse = 12/13."
    },
    {
      question: "Evaluate quadratic discriminant for 2x² - 4x + 2 = 0.",
      options: ["0", "16", "-8", "32"],
      correct: 0,
      explanation: "Δ = b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0."
    }
  ]
};

let currentLevel = 'secondary';
let currentQuestionIndex = 0;
let userScore = 0;

function initQuizGame() {
  const levelBtns = document.querySelectorAll('.quiz-level-btn');
  levelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      levelBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentLevel = e.target.dataset.level;
      resetQuiz();
    });
  });

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.addEventListener('click', loadNextQuestion);

  const restartBtn = document.getElementById('quizRestartBtn');
  if (restartBtn) restartBtn.addEventListener('click', resetQuiz);

  renderQuestion();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  document.getElementById('quizPlayView').style.display = 'block';
  document.getElementById('quizResultView').style.display = 'none';
  renderQuestion();
}

function renderQuestion() {
  const questions = QUIZ_DATA[currentLevel];
  const q = questions[currentQuestionIndex];

  const progressFill = document.getElementById('quizProgressFill');
  const progressText = document.getElementById('quizCounter');
  if (progressFill) {
    const pct = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${pct}%`;
  }
  if (progressText) {
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  }

  const qText = document.getElementById('quizQuestionText');
  if (qText) qText.innerText = q.question;

  const optionsGrid = document.getElementById('quizOptionsGrid');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('quizNextBtn');

  if (feedbackBox) {
    feedbackBox.className = 'quiz-feedback';
    feedbackBox.style.display = 'none';
  }
  if (nextBtn) nextBtn.style.display = 'none';

  if (optionsGrid) {
    optionsGrid.innerHTML = '';
    q.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${optText}</span> <i class="far fa-circle"></i>`;
      btn.addEventListener('click', () => handleOptionClick(index, q.correct, q.explanation));
      optionsGrid.appendChild(btn);
    });
  }
}

function handleOptionClick(selectedIndex, correctIndex, explanation) {
  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('quizNextBtn');

  optionBtns.forEach(btn => btn.style.pointerEvents = 'none');

  if (selectedIndex === correctIndex) {
    userScore++;
    optionBtns[selectedIndex].classList.add('correct');
    optionBtns[selectedIndex].querySelector('i').className = 'fas fa-check-circle';

    if (feedbackBox) {
      feedbackBox.className = 'quiz-feedback show';
      feedbackBox.style.backgroundColor = 'var(--accent-emerald-light)';
      feedbackBox.style.color = '#065F46';
      feedbackBox.innerHTML = `<strong><i class="fas fa-check-circle"></i> Correct!</strong> ${explanation}`;
    }
  } else {
    optionBtns[selectedIndex].classList.add('wrong');
    optionBtns[selectedIndex].querySelector('i').className = 'fas fa-times-circle';
    optionBtns[correctIndex].classList.add('correct');
    optionBtns[correctIndex].querySelector('i').className = 'fas fa-check-circle';

    if (feedbackBox) {
      feedbackBox.className = 'quiz-feedback show';
      feedbackBox.style.backgroundColor = 'var(--accent-coral-light)';
      feedbackBox.style.color = '#991B1B';
      feedbackBox.innerHTML = `<strong><i class="fas fa-info-circle"></i> Review:</strong> ${explanation}`;
    }
  }

  if (nextBtn) nextBtn.style.display = 'inline-flex';
}

function loadNextQuestion() {
  const questions = QUIZ_DATA[currentLevel];
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) renderQuestion();
  else showQuizResults();
}

function showQuizResults() {
  const questions = QUIZ_DATA[currentLevel];
  document.getElementById('quizPlayView').style.display = 'none';
  const resultView = document.getElementById('quizResultView');
  resultView.style.display = 'block';

  const scoreText = document.getElementById('resultScoreText');
  const scoreMsg = document.getElementById('resultMsg');

  if (scoreText) scoreText.innerText = `${userScore}/${questions.length}`;
  if (scoreMsg) {
    if (userScore === questions.length) scoreMsg.innerText = "🌟 Perfect Score! You're mathematically sharp. Teacher Chyma can help you excel even further!";
    else scoreMsg.innerText = "👍 Great effort! Teacher Chyma specializes in breaking down tough concepts into simple steps.";
  }
}

/* --------------------------------------------------------------------------
   5. Interactive Fee & Plan Estimator
   -------------------------------------------------------------------------- */
function initPlanEstimator() {
  const modeInputs = document.querySelectorAll('input[name="estMode"]');
  const levelInputs = document.querySelectorAll('input[name="estLevel"]');
  const freqInputs = document.querySelectorAll('input[name="estFreq"]');

  function calculateEstimate() {
    let mode = 'online';
    let level = 'secondary';
    let freq = 2;

    modeInputs.forEach(i => { if (i.checked) mode = i.value; });
    levelInputs.forEach(i => { if (i.checked) level = i.value; });
    freqInputs.forEach(i => { if (i.checked) freq = parseInt(i.value); });

    const totalSessionsMonth = freq * 4;
    let baseRateSession = 5500;

    if (level === 'primary') baseRateSession = 4000;
    else if (level === 'examprep') baseRateSession = 7500;

    if (mode === 'offline') baseRateSession += 1500;

    const estimatedMonthly = totalSessionsMonth * baseRateSession;

    document.getElementById('estSessionCount').innerText = `${totalSessionsMonth} Sessions/Month`;
    document.getElementById('estMonthlyPrice').innerText = `₦${estimatedMonthly.toLocaleString()}`;

    let levelLabel = 'Secondary Math';
    if (level === 'primary') levelLabel = 'Primary Math';
    if (level === 'examprep') levelLabel = 'Exam Prep (WAEC/IGCSE/SAT)';

    let modeLabel = mode === 'online' ? 'Online' : 'In-Person (Anambra)';
    document.getElementById('estDetailsSummary').innerText = `${modeLabel} • ${levelLabel} • ${freq}x weekly`;

    const whatsappBtn = document.getElementById('estWhatsappBtn');
    if (whatsappBtn) {
      const msg = encodeURIComponent(`Hello Teacher Chyma! I'd like to inquire about tutoring:\n- Mode: ${modeLabel}\n- Level: ${levelLabel}\n- Schedule: ${freq}x weekly (${totalSessionsMonth} sessions/month)\n- Estimated Tuition: ₦${estimatedMonthly.toLocaleString()}/month.\nCan we schedule a consultation?`);
      whatsappBtn.href = `https://wa.me/2349127245516?text=${msg}`;
    }
  }

  [...modeInputs, ...levelInputs, ...freqInputs].forEach(input => {
    input.addEventListener('change', calculateEstimate);
  });

  calculateEstimate();
}

/* --------------------------------------------------------------------------
   6. Contact Form WhatsApp Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = document.getElementById('formStudentName').value;
    const parentName = document.getElementById('formParentName').value;
    const gradeLevel = document.getElementById('formGradeLevel').value;
    const learningMode = document.getElementById('formMode').value;
    const learningGoals = document.getElementById('formGoal').value;
    const userMessage = document.getElementById('formMessage').value;

    const formattedMsg = encodeURIComponent(
      `Hello Teacher Chyma,\n\nI want to schedule a Maths Tutoring Consultation:\n` +
      `📌 Student: ${studentName}\n` +
      `👤 Parent: ${parentName || 'N/A'}\n` +
      `📚 Class: ${gradeLevel}\n` +
      `💻 Mode: ${learningMode}\n` +
      `🎯 Goal: ${learningGoals}\n` +
      `💬 Note: ${userMessage || 'N/A'}`
    );

    window.open(`https://wa.me/2349127245516?text=${formattedMsg}`, '_blank');
  });
}
