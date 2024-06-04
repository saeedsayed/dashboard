import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState({
    registerErr: false,
    loginErr: false,
  });

  const handleRegister = async (email, password, displayName) => {
    setAuthLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setAuthLoading(true);
      await updateProfile(res.user, { displayName });
    } catch {
      setAuthError((p) => ({ ...p, registerErr: true }));
      setAuthLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setAuthError((p) => ({ ...p, loginErr: true }));
      setAuthLoading(false);
    }
  };
  const handleLogout = async (_) => {
    setAuthLoading(true);
    await signOut(auth);
  };

  const handleResetPassword = async (email) => {
    setAuthLoading(true);
    await sendPasswordResetEmail(auth, email);
    setAuthLoading(false);
  };

  //   change current user state
  useEffect(() => {
    const updateLogState = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
    });
    return () => {
      updateLogState();
    };
  }, []);

  useEffect(
    (_) => {
      if (authError.registerErr || authError.loginErr) {
        setTimeout(() => {
          setAuthError((p) => ({ registerErr: false, loginErr: false }));
        }, 3000);
      }
    },
    [authError]
  );

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        authLoading,
        authError,
        handleRegister,
        handleLogin,
        handleLogout,
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (_) => useContext(AuthContext);
