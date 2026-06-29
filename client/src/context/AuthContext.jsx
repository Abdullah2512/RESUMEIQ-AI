import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("resumeiq_token");
    if (!token) {
      setBooting(false);
      return;
    }
    api
      .get("/auth/me")
      .then(({ data }) => setUser(data.user))
      .catch(() => localStorage.removeItem("resumeiq_token"))
      .finally(() => setBooting(false));
  }, []);

  async function login(payload) {
    const { data } = await api.post("/auth/login", payload);
    localStorage.setItem("resumeiq_token", data.token);
    setUser(data.user);
    toast.success("Welcome back");
  }

  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("resumeiq_token", data.token);
    setUser(data.user);
    toast.success("Account created");
  }

  async function googleLogin(credential) {
    const { data } = await api.post("/auth/google", { credential });
    localStorage.setItem("resumeiq_token", data.token);
    setUser(data.user);
    toast.success("Signed in with Google");
  }

  function logout() {
    localStorage.removeItem("resumeiq_token");
    setUser(null);
    toast.success("Signed out");
  }

  async function updateProfile(payload) {
    const { data } = await api.patch("/users/me", payload);
    setUser(data.user);
    toast.success("Profile updated");
  }

  const value = useMemo(
    () => ({ user, booting, login, register, googleLogin, logout, updateProfile }),
    [user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
