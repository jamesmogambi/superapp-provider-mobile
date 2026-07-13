import { create } from "zustand";
import { getProviderServices } from "../services/service";

export const useServicesStore = create((set, get) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProviderServices();
      set({ services: data, loading: false });
    } catch (err) {
      set({ error: err?.message || "Failed to load services", loading: false });
    }
  },
}));
