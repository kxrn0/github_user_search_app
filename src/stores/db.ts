import { defineStore } from "pinia";
import { useAsyncState } from "@vueuse/core";
import type { Theme } from "@/types";
import { DEFAULT_THEME } from "@/consts";

function put_primitive(
  db: IDBDatabase,
  storeName: string,
  key: string,
  value: string | number | boolean | symbol | null | undefined,
) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(value, key);

    request.onsuccess = resolve;

    request.onerror = reject;
  });
}

function get<T>(db: IDBDatabase, storeName: string, key: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName);
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);

    request.onerror = () => reject(request.error);
  });
}

const useDb = defineStore("db-store", () => {
  const idx = useAsyncState<IDBDatabase | null>(load_db, null, { immediate: false });
  const DB_NAME = "github-user-search-app-db";
  const DB_VERSION = 1;
  const THEME_STORE_NAME = "theme-store";
  const THEME_KEY = "theme-key";

  function load_db(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (idx.state.value) resolve(idx.state.value);

      const openRequest = indexedDB.open(DB_NAME, DB_VERSION);

      openRequest.onsuccess = () => resolve(openRequest.result);

      openRequest.onerror = () => reject(openRequest.error);

      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;

        if (db.objectStoreNames.contains(THEME_STORE_NAME) === false)
          db.createObjectStore(THEME_STORE_NAME);
      };
    });
  }

  async function get_theme(): Promise<Theme> {
    const db = idx.state.value;

    if (!db) return DEFAULT_THEME;

    const theme = await get<Theme>(db, THEME_STORE_NAME, THEME_KEY);

    return theme || DEFAULT_THEME;
  }

  async function update_theme(theme: Theme) {
    const db = idx.state.value;

    if (!db) return;

    try {
      await put_primitive(db, THEME_STORE_NAME, THEME_KEY, theme);
    } catch (error) {
      console.log("couldn't update theme!");
      console.log(error);
    }
  }

  return {
    idx,
    get_theme,
    update_theme,
    THEME_STORE_NAME,
  };
});

export default useDb;
