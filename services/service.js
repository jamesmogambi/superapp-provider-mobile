import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";

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

export const addUserServices = async (userId, selectedServices) => {
  if (!userId || !selectedServices.length) return [];
  try {
    const created = [];
    for (const service of selectedServices) {
      const docRef = await addDoc(collection(db, "services"), {
        category: "provider-service",
        name: service.name,
        status: "Pending",
        iconImage: service.iconImage || "",
        iconPublicId: service.iconPublicId || "",
        counties: service.counties || [],
        countyNames: service.countyNames || [],
        createdBy: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      created.push({ id: docRef.id, ...docRef.data() });
    }
    return created;
  } catch (err) {
    console.error("Failed to add services", err);
    throw err;
  }
};
