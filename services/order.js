import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const STATUS_MAP = {
  New: "new",
  Accepted: "accepted",
  Processing: "in-process",
  Rejected: "rejected",
  Completed: "completed",
};

export const getProviderOrders = async (userId, status) => {
  if (!userId || !status) return [];
  try {
    const q = query(
      collection(db, "orders"),
      where("providerId", "==", userId),
      where("status", "==", status)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error("Failed to fetch orders", err);
    return [];
  }
};

export const resolveStatusFromTab = (tabName) => STATUS_MAP[tabName] || tabName;

export const updateOrderStatus = async (orderId, newStatus) => {
  if (!orderId || !newStatus) return false;
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("Failed to update order status", err);
    return false;
  }
};
