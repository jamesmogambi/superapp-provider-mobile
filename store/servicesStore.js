import { create } from "zustand";
import { getProviderServices } from "../services/service";

export const useServicesStore = create((set, get) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async () => {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const data = await getProviderServices();
      set({ services: data, loading: false });
    } catch (err) {
      set({ error: err?.message || "Failed to load services", loading: false });
    }
  },

  getServicesByCategory: (category) =>
    get().services.filter((s) => s.category === category),

  addServices: (newServices) =>
    set((state) => {
      const existingIds = new Set(state.services.map((s) => s.id));
      const merged = [...state.services];
      for (const s of newServices) {
        if (!existingIds.has(s.id)) merged.push(s);
      }
      return { services: merged };
    }),
}));
