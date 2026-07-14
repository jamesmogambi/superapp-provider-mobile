import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const fileFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const name = uri.split("/").pop() || "upload.jpg";
  if (typeof File !== "undefined") {
    return new File([blob], name, { type: blob.type || "image/jpeg" });
  }
  return blob;
};

export const uploadImageToCloudinary = async (uri) => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME and EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
  }
  const file = await fileFromUri(uri);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "superapp/work_images");

  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};

export const saveWorkImage = async (userId, url, publicId) => {
  if (!userId) return null;
  try {
    const payload = {
      userId,
      url,
      publicId,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "work_images"), payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.error("Failed to save work image", err);
    throw err;
  }
};

export const getWorkImages = async (userId) => {
  if (!userId) return [];
  try {
    const q = query(collection(db, "work_images"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Failed to fetch work images", err);
    return [];
  }
};

export const deleteWorkImage = async (imageId) => {
  if (!imageId) return;
  try {
    await deleteDoc(doc(db, "work_images", imageId));
  } catch (err) {
    console.error("Failed to delete work image", err);
    throw err;
  }
};
