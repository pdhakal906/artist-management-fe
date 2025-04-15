import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { session } from "./sessionStorage";
import { isTokenExpired } from "./utils";

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isLoading: true,

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

  setLogin: async (token) => {
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

  setLogout: async () => {
    session.clear();
    set({ token: null, user: null, isLoading: false });
  },
}));

export default useAuthStore;
