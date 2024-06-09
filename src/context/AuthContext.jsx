import { createContext, useContext, useEffect, useState } from "react";
import { auth, useUsersDocRef } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc } from "firebase/firestore";

export const SOCIAL_LINKS_LIST = [
  {
    socialName: "Website",
    baseUrl: "https://",
    userName: null,
  },
  {
    socialName: "Facebook",
    baseUrl: "https://www.facebook.com/",
    userName: null,
  },
  {
    socialName: "XTwitter",
    baseUrl: "https://www.x.com/",
    userName: null,
  },
  {
    socialName: "Instagram",
    baseUrl: "https://www.instagram.com/",
    userName: null,
  },
  {
    socialName: "Linkedin",
    baseUrl: "https://www.linkedin.com/in/",
    userName: null,
  },
  {
    socialName: "Github",
    baseUrl: "https://www.github.com/",
    userName: null,
  },
];

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
      await updateProfile(res.user, {
        displayName,
        photoURL:
          "https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg",
      });

      await setDoc(useUsersDocRef(res.user.email), {
        firstName: res.user.displayName.match(/^(\w+)\s+(\w+)$/)[1],
        lastName: res.user.displayName.match(/^(\w+)\s+(\w+)$/)[2],
        email: res.user.email,
        uid: res.user.uid,
        avatar: res.user.photoURL,
        phoneNumber: res.user.phoneNumber,
        address: null,
        role: "Admin",
        birthday: null,
        aboutMe: null,
        socialLinks: SOCIAL_LINKS_LIST,
      });
    } catch (err) {
      console.log("error", err.message);
      setAuthError((p) => ({ ...p, registerErr: true }));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setAuthError((p) => ({ ...p, loginErr: true }));
    } finally {
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
        }, 5000);
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
