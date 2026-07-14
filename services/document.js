import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { uploadImageToCloudinary } from "./upload";

export const uploadDocument = async (userId, docType, name, uri) => {
  if (!userId) return null;
  try {
    const { url, publicId } = await uploadImageToCloudinary(uri);
    const payload = {
      userId,
      docType,
      name,
      url,
      publicId,
      status: "Pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "documents"), payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.error("Failed to upload document", err);
    throw err;
  }
};

export const getUserDocuments = async (userId) => {
  if (!userId) return [];
  try {
    const q = query(collection(db, "documents"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Failed to fetch documents", err);
    return [];
  }
};

export const deleteUserDocument = async (documentId) => {
  if (!documentId) return;
  try {
    await deleteDoc(doc(db, "documents", documentId));
  } catch (err) {
    console.error("Failed to delete document", err);
    throw err;
  }
};
