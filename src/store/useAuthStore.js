import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {
        id: null,
        email: null,
        name: null,
        role: null, // 'customer' | 'store-owner' | 'admin'
        storeId: null,
        permissions: []
      },
      token: null,

      login: (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        set({ 
          isAuthenticated: true, 
          user: userData,
          token: token 
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ 
          isAuthenticated: false, 
          user: {
            id: null,
            email: null,
            name: null,
            role: null,
            storeId: null,
            permissions: []
          },
          token: null
        });
      },

      setUser: (userData) => {
        set({ user: userData });
      },

      hasRole: (role) => {
        return (state) => state.user.role === role;
      },

      hasPermission: (permission) => {
        return (state) => state.user.permissions.includes(permission);
      },

      isAdmin: () => {
        return (state) => state.user.role === 'admin';
      },

      isStoreOwner: () => {
        return (state) => state.user.role === 'store-owner';
      },

      isCustomer: () => {
        return (state) => state.user.role === 'customer';
      }
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
