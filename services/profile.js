import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { uploadFileToCloudinary } from "./upload";

export const PROVIDER_ROLE = "provider-service";

const isRemoteImage = (uri) => !!uri && /^https?:\/\//.test(uri);

const splitName = (fullName = "") => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");
  return { firstName, lastName };
};

export const uploadProfileImage = async (user, uri) => {
  if (!user) throw new Error("You must be signed in to upload a photo");
  if (!uri || isRemoteImage(uri)) return user.imageUrl || null;

  try {
    const result = await uploadFileToCloudinary(uri);
    return result.url;
  } catch (err) {
    console.error("Profile image upload failed:", err);
    throw new Error("Failed to upload profile image. Please try again.");
  }
};

export const saveProviderProfile = async (user, values = {}) => {
  if (!user) throw new Error("You must be signed in to update your profile");

  const imageUrl = await uploadProfileImage(user, values.image);

  const { firstName, lastName } = splitName(values.fullName);
  if (firstName) {
    await user.update({ firstName, lastName });
  }

  const profile = {
    userId: user.id,
    fullName: (values.fullName || "").trim(),
    gender: values.gender || "",
    email: (values.email || "").trim(),
    mobileNumber: (values.mobileNumber || "").trim(),
    landmark: (values.landmark || "").trim(),
    homeLocation: (values.homeLocation || "").trim(),
    serviceRadius: values.serviceRadius || "",
    minOrder: values.minOrder || "",
    imageUrl,
    role: PROVIDER_ROLE,
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, "providers", user.id), profile, { merge: true });

  return profile;
};

export const getProviderProfile = async (userId) => {
  if (!userId) return null;
  const snap = await getDoc(doc(db, "providers", userId));
  if (!snap.exists()) return null;
  return snap.data();
};

export const updateProviderOnlineStatus = async (userId, online) => {
  if (!userId) return;
  await setDoc(
    doc(db, "providers", userId),
    { online, updatedAt: serverTimestamp() },
    { merge: true }
  );
};
