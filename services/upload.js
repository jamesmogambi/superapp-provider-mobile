import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const RAW_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

const getFileType = (uri) => {
  const ext = uri.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  return "unknown";
};

export const uploadFileToCloudinary = async (uri) => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME and EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
  }

  const fileType = getFileType(uri);
  if (fileType === "unknown") {
    throw new Error("Unsupported file type. Please select an image or PDF.");
  }

  const isImage = fileType === "image";
  const uploadUrl = isImage ? IMAGE_UPLOAD_URL : RAW_UPLOAD_URL;
  const mimeType = isImage ? "image/jpeg" : "application/pdf";
  const fileName = uri.split("/").pop() || `upload.${isImage ? "jpg" : "pdf"}`;

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: mimeType,
      name: fileName,
    });
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", isImage ? "superapp/work_images" : "superapp/documents");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploadUrl);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            fileType,
          });
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        reject(new Error(`Cloudinary upload failed: ${xhr.status} ${xhr.responseText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during Cloudinary upload"));
    xhr.send(formData);
  });
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
