/**
 * ============================================================================
 * TEACHER CHYMA - FIREBASE CONFIGURATION & QUIZ DATA SERVICE
 * ============================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc,
  query, where, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { SAMPLE_200_QUIZZES } from "./questions-data.js";

// Your Actual Live Firebase Credentials (TeacherChyma project)
const firebaseConfig = {
  apiKey: "AIzaSyBdVwnFW3mKYXGjVpQEuLKagIpIjRKY03A",
  authDomain: "teacherchyma-db300.firebaseapp.com",
  projectId: "teacherchyma-db300",
  storageBucket: "teacherchyma-db300.firebasestorage.app",
  messagingSenderId: "1095428841790",
  appId: "1:1095428841790:web:5dbb5ca0cb83e9f812cc6f",
  measurementId: "G-HSKRSKGF8N"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
  firebaseConfig.projectId !== "YOUR_PROJECT_ID"
);

let db = null;
if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase init notice:", err);
  }
}

// Default Seed Submissions
const SEED_SUBMISSIONS = [
  {
    id: "sub_1",
    studentName: "Chinedu Okeke",
    level: "waec",
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    detailedAnswers: [
      { questionText: "Find the roots of 2x² - 5x + 2 = 0", selectedOption: "x = 2 or x = 1/2", correctOption: "x = 2 or x = 1/2", isCorrect: true, explanation: "Factorize: (2x - 1)(x - 2) = 0." },
      { questionText: "Evaluate log₁₀(1000) + log₁₀(0.01)", selectedOption: "1", correctOption: "1", isCorrect: true, explanation: "3 + (-2) = 1." },
      { questionText: "What is 15 + (4 × 3)?", selectedOption: "57", correctOption: "27", isCorrect: false, explanation: "Follow BODMAS: 4 × 3 = 12, then 15 + 12 = 27." }
    ]
  },
  {
    id: "sub_2",
    studentName: "Grace Eze",
    level: "sss",
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    detailedAnswers: [
      { questionText: "Evaluate log₁₀(1000) + log₁₀(0.01)", selectedOption: "1", correctOption: "1", isCorrect: true, explanation: "3 + (-2) = 1." },
      { questionText: "Solve for x: 4x - 7 = 17", selectedOption: "x = 6", correctOption: "x = 6", isCorrect: true, explanation: "4x = 24 -> x = 6." }
    ]
  }
];

// Registered Students Roster
const SEED_STUDENTS = [
  { id: "std_1", name: "Chinedu Okeke", email: "chinedu@student.com", level: "waec", pin: "1234", createdAt: new Date().toISOString() },
  { id: "std_2", name: "Grace Eze", email: "grace@student.com", level: "sss", pin: "5678", createdAt: new Date().toISOString() },
  { id: "std_3", name: "Kenechukwu Nnamdi", email: "kene@student.com", level: "jss", pin: "4321", createdAt: new Date().toISOString() }
];

function getLocalQuizzes() {
  const data = localStorage.getItem("chyma_quiz_items");
  if (!data) {
    localStorage.setItem("chyma_quiz_items", JSON.stringify(SAMPLE_200_QUIZZES));
    return SAMPLE_200_QUIZZES;
  }
  try { return JSON.parse(data); } catch (e) { return SAMPLE_200_QUIZZES; }
}

function saveLocalQuizzes(items) {
  localStorage.setItem("chyma_quiz_items", JSON.stringify(items));
}

function getLocalSubmissions() {
  const data = localStorage.getItem("chyma_student_submissions");
  if (!data) {
    localStorage.setItem("chyma_student_submissions", JSON.stringify(SEED_SUBMISSIONS));
    return SEED_SUBMISSIONS;
  }
  try { return JSON.parse(data); } catch (e) { return SEED_SUBMISSIONS; }
}

function saveLocalSubmissions(items) {
  localStorage.setItem("chyma_student_submissions", JSON.stringify(items));
}

function getLocalStudents() {
  const data = localStorage.getItem("chyma_registered_students");
  if (!data) {
    localStorage.setItem("chyma_registered_students", JSON.stringify(SEED_STUDENTS));
    return SEED_STUDENTS;
  }
  try { return JSON.parse(data); } catch (e) { return SEED_STUDENTS; }
}

function saveLocalStudents(items) {
  localStorage.setItem("chyma_registered_students", JSON.stringify(items));
}

// ----------------------------------------------------------------------------
// EXPORTED SERVICE
// ----------------------------------------------------------------------------
export const QuizService = {
  verifyTeacher(passcode) {
    const input = (passcode || "").trim().toLowerCase();
    const isTeacher = (input === "chyma2026" || input === "teacherchyma@gmail.com");
    if (isTeacher) {
      localStorage.setItem("chyma_teacher_logged_in", "true");
      return true;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem("chyma_teacher_logged_in") === "true";
  },

  logout() {
    localStorage.removeItem("chyma_teacher_logged_in");
  },

  async getQuizzes(level = "all") {
    if (isFirebaseConfigured && db) {
      try {
        const qRef = collection(db, "quizzes");
        const queryRef = level === "all" ? qRef : query(qRef, where("level", "==", level));
        const snapshot = await getDocs(queryRef);
        let list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn("Firestore quiz fetch notice, using local cache:", err);
      }
    }
    const all = getLocalQuizzes();
    return level === "all" ? all : all.filter(item => item.level === level);
  },

  // Seed all 200 MCQs to Firestore or LocalStorage
  async seed200Quizzes() {
    if (isFirebaseConfigured && db) {
      try {
        for (const q of SAMPLE_200_QUIZZES) {
          await addDoc(collection(db, "quizzes"), {
            level: q.level,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation || "",
            createdAt: serverTimestamp()
          });
        }
        return true;
      } catch (err) {
        console.warn("Firestore seeding notice, saving locally:", err);
      }
    }
    saveLocalQuizzes(SAMPLE_200_QUIZZES);
    return true;
  },

  async createQuiz({ level, question, options, correctIndex, explanation }) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, "quizzes"), {
          level,
          question,
          options,
          correctIndex,
          explanation: explanation || "",
          createdAt: serverTimestamp()
        });
        return docRef.id;
      } catch (err) {
        console.warn("Firestore write notice, using local storage:", err);
      }
    }
    const list = getLocalQuizzes();
    const newItem = {
      id: "quiz_" + Date.now(),
      level,
      question,
      options,
      correctIndex,
      explanation: explanation || ""
    };
    list.unshift(newItem);
    saveLocalQuizzes(list);
    return newItem.id;
  },

  async updateQuiz(id, { level, question, options, correctIndex, explanation }) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, "quizzes", id);
        await updateDoc(docRef, {
          level,
          question,
          options,
          correctIndex,
          explanation: explanation || ""
        });
        return true;
      } catch (err) {
        console.warn("Firestore update notice:", err);
      }
    }
    let list = getLocalQuizzes();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        level,
        question,
        options,
        correctIndex,
        explanation: explanation || ""
      };
      saveLocalQuizzes(list);
      return true;
    }
    return false;
  },

  async deleteQuiz(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "quizzes", id));
      } catch (err) {
        console.warn("Firestore delete notice:", err);
      }
    }
    let list = getLocalQuizzes();
    list = list.filter(item => item.id !== id);
    saveLocalQuizzes(list);
  },

  async saveSubmission({ studentName, level, score, totalQuestions, detailedAnswers }) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const submissionData = {
      studentName: studentName || "Anonymous Student",
      level,
      score,
      totalQuestions,
      percentage,
      detailedAnswers: detailedAnswers || [],
      submittedAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, "student_submissions"), {
          ...submissionData,
          createdAt: serverTimestamp()
        });
        return docRef.id;
      } catch (err) {
        console.warn("Firestore submission notice, saving locally:", err);
      }
    }

    const list = getLocalSubmissions();
    const newItem = { id: "sub_" + Date.now(), ...submissionData };
    list.unshift(newItem);
    saveLocalSubmissions(list);
    return newItem.id;
  },

  async getSubmissions() {
    if (isFirebaseConfigured && db) {
      try {
        const qRef = collection(db, "student_submissions");
        const snapshot = await getDocs(qRef);
        let list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (list.length > 0) {
          list.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
          return list;
        }
      } catch (err) {
        console.warn("Firestore submissions fetch notice, using local cache:", err);
      }
    }
    const localList = getLocalSubmissions();
    localList.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
    return localList;
  },

  async saveStudentAccount({ name, email, level, pin }) {
    const studentData = {
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@student.com`,
      level,
      pin: pin || "1234",
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, "registered_students"), {
          ...studentData,
          createdAt: serverTimestamp()
        });
        return docRef.id;
      } catch (err) {
        console.warn("Firestore student register notice, saving locally:", err);
      }
    }

    const list = getLocalStudents();
    const newItem = { id: "std_" + Date.now(), ...studentData };
    list.unshift(newItem);
    saveLocalStudents(list);
    return newItem.id;
  },

  async getStudentAccounts() {
    if (isFirebaseConfigured && db) {
      try {
        const qRef = collection(db, "registered_students");
        const snapshot = await getDocs(qRef);
        let list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (list.length > 0) return list;
      } catch (err) {
        console.warn("Firestore students fetch notice:", err);
      }
    }
    return getLocalStudents();
  },

  async deleteStudentAccount(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "registered_students", id));
      } catch (err) {
        console.warn("Firestore delete student notice:", err);
      }
    }
    let list = getLocalStudents();
    list = list.filter(item => item.id !== id);
    saveLocalStudents(list);
  }
};
