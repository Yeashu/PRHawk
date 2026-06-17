import { useState, useEffect } from "react";

/**
 * useState that mirrors its value into localStorage so it survives a refresh.
 *
 * @param {string} key                localStorage key to read/write.
 * @param {*} defaultValue            value used when nothing is stored yet.
 * @param {{ json?: boolean }} options json:true (de)serializes objects/arrays.
 *                                     When false (default) the value is stored
 *                                     as a raw string, matching how the rest of
 *                                     the app already reads these keys.
 */
export default function usePersistentState(key, defaultValue, { json = false } = {}) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    if (!json) return stored;
    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, json ? JSON.stringify(value) : value);
  }, [key, value, json]);

  return [value, setValue];
}
