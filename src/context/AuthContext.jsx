import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(() => {
    return localStorage.getItem('chyma_user_role') || 'guest';
  });
  const [loading, setLoading] = useState(true);

  // Monitor Firebase Auth state changes
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch role from Firestore user profile if available
        try {
          if (db) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const uRole = userDoc.data().role || 'admin';
              setRole(uRole);
              localStorage.setItem('chyma_user_role', uRole);
            } else {
              setRole('admin');
              localStorage.setItem('chyma_user_role', 'admin');
            }
          }
        } catch (err) {
          console.warn("Could not fetch user role profile:", err);
          setRole('admin');
        }
      } else {
        const localTeacherLoggedIn = localStorage.getItem('chyma_teacher_logged_in') === 'true';
        const localSalesLoggedIn = localStorage.getItem('chyma_sales_logged_in') === 'true';
        if (localTeacherLoggedIn) {
          setRole('admin');
        } else if (localSalesLoggedIn) {
          setRole('sales');
        } else {
          setRole('guest');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Passcode & Email Login method
  const loginWithPasscode = async (passcodeOrEmail, password) => {
    const input = (passcodeOrEmail || '').trim().toLowerCase();

    // Direct passcode check
    if (input === 'chyma2026' || input === 'teacherchyma@gmail.com') {
      localStorage.setItem('chyma_teacher_logged_in', 'true');
      localStorage.removeItem('chyma_sales_logged_in');
      localStorage.setItem('chyma_user_role', 'admin');
      setRole('admin');
      return { success: true, role: 'admin' };
    }

    if (input === 'sales2026' || input === 'sales@teacherchyma.com') {
      localStorage.setItem('chyma_sales_logged_in', 'true');
      localStorage.removeItem('chyma_teacher_logged_in');
      localStorage.setItem('chyma_user_role', 'sales');
      setRole('sales');
      return { success: true, role: 'sales' };
    }

    // Firebase Auth attempt if password is provided
    if (auth && password) {
      try {
        const res = await signInWithEmailAndPassword(auth, passcodeOrEmail, password);
        return { success: true, user: res.user };
      } catch (err) {
        throw new Error(err.message || "Invalid login credentials.");
      }
    }

    throw new Error("Invalid login credentials or unauthorized passcode.");
  };

  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn("Sign out notice:", err);
      }
    }
    localStorage.removeItem('chyma_teacher_logged_in');
    localStorage.removeItem('chyma_sales_logged_in');
    localStorage.setItem('chyma_user_role', 'guest');
    setRole('guest');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    role,
    isAdmin: role === 'admin',
    isSales: role === 'sales' || role === 'admin',
    isLoggedIn: role === 'admin' || role === 'sales',
    loading,
    loginWithPasscode,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
