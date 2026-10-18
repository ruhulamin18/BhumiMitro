/**
 * Safe client-side storage persistence utility for BhumiMitro.
 * Versioned storage key, SSR safe, handles malformed JSON and storage unavailability.
 */

const STORAGE_VERSION = 'v1';
const PREFIX = `bhumimitro_${STORAGE_VERSION}`;

export const STORAGE_KEYS = {
  RECENT_SEARCHES: `${PREFIX}_recent_searches`,
  SAVED_REPORTS: `${PREFIX}_saved_reports`,
  USER_NOTES: `${PREFIX}_user_notes`,
  AUDIT_LOGS: `${PREFIX}_audit_logs`,
};

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[BhumiMitro LocalStorage] Failed to read key: ${key}`, error);
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[BhumiMitro LocalStorage] Failed to write key: ${key}`, error);
    return false;
  }
}

export function removeFromStorage(key: string): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[BhumiMitro LocalStorage] Failed to remove key: ${key}`, error);
    return false;
  }
}

export function resetAllStorageToDemoData(): void {
  if (!isBrowser()) return;
  try {
    Object.values(STORAGE_KEYS).forEach((k) => {
      window.localStorage.removeItem(k);
    });
    console.info('[BhumiMitro LocalStorage] All user local demo storage reset to default seed state.');
  } catch (error) {
    console.warn('[BhumiMitro LocalStorage] Reset failed', error);
  }
}
