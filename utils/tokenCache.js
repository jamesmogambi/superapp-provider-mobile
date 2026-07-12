import * as SecureStore from "expo-secure-store";

// Clerk token cache backed by the device secure store (Keychain / Keystore).
// Clerk uses this to persist the session so the user stays signed in between
// app launches.
export const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      // If reading fails (e.g. corrupted item), clear it so auth can recover.
      await SecureStore.deleteItemAsync(key).catch(() => {});
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
