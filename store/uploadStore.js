import { create } from "zustand";
import { uploadFileToCloudinary, saveWorkImage, getWorkImages, deleteWorkImage } from "../services/upload";

export const useUploadStore = create((set, get) => ({
  images: [],
  uploading: false,
  error: null,

  loadImages: async (userId) => {
    if (!userId) return;
    try {
      const data = await getWorkImages(userId);
      set({ images: data });
    } catch (err) {
      set({ error: err?.message || "Failed to load images" });
    }
  },

  addImage: async (userId, uri) => {
    if (!userId) {
      set({ error: "You must be signed in to upload images" });
      return;
    }
    set({ uploading: true, error: null });
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const tempImage = { id: tempId, url: uri, publicId: null, uploading: true };
    set((state) => ({ images: [...state.images, tempImage] }));

    try {
      const { url, publicId } = await uploadFileToCloudinary(uri);
      const saved = await saveWorkImage(userId, url, publicId);
      const finalImage = { id: saved.id, url: saved.url, publicId: saved.publicId, uploading: false };
      set((state) => ({
        images: state.images.map((img) => (img.id === tempId ? finalImage : img)),
        uploading: false,
      }));
    } catch (err) {
      set((state) => ({
        images: state.images.filter((img) => img.id !== tempId),
        uploading: false,
        error: err?.message || "Failed to upload image",
      }));
      throw err;
    }
  },

  removeImage: async (imageId) => {
    const image = get().images.find((img) => img.id === imageId);
    if (!image) return;

    set((state) => ({
      images: state.images.filter((img) => img.id !== imageId),
      error: null,
    }));

    if (image.publicId) {
      try {
        await deleteWorkImage(imageId);
      } catch (err) {
        set({ error: err?.message || "Failed to delete image" });
      }
    }
  },

  clearImages: () => set({ images: [], error: null }),
}));
