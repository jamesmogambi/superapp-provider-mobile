import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getProviderServices = async () => {
  try {
    const q = query(collection(db, "services"), where("category", "==", "provider-service"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Failed to fetch services", err);
    return [];
  }
};

export const getUserServices = async (userId) => {
  if (!userId) return [];
  try {
    const q = query(collection(db, "services"), where("createdBy", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Failed to fetch user services", err);
    return [];
  }
};
