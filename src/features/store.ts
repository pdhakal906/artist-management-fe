import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { session } from "./sessionStorage";
import { isTokenExpired } from "./utils";

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isLoading: true,

  // Initialize from localStorage
  initializeAuth: async () => {
    const token = session.get("token");

    if (token) {
      const decoded = jwtDecode(token);
      if (isTokenExpired(decoded)) {
        session.clear();
        set({ token: null, user: null });
      } else {
        set({ token, user: decoded });
      }
    }
    set({ isLoading: false });
  },

  // Set token and decode user
  setLogin: async (token) => {
    // localStorage.setItem("token", token);
    session.set("token", token);
    try {
      const decoded = jwtDecode(token);
      set({ token, user: decoded });
    } catch (err) {
      session.clear();
      set({ token: null, user: null });
    }
    set({ isLoading: false });
  },

  // Clear token and user info
  setLogout: async () => {
    // localStorage.removeItem("token");
    session.clear();
    set({ token: null, user: null, isLoading: false });
  },
}));

export default useAuthStore;
