export const PRIVACY_NOTICE_KEY = 'soa-privacy-notice';
export const PRIVACY_NOTICE_VERSION = 1;
const RETENTION_MS = 183 * 86400000;

export function hasSavedPrivacyNotice(storage: Storage, now = Date.now()) {
  try {
    const raw = storage.getItem(PRIVACY_NOTICE_KEY);
    if (!raw) return false;
    const value = JSON.parse(raw);
    const valid =
      value?.version === PRIVACY_NOTICE_VERSION &&
      typeof value.acknowledgedAt === 'number' &&
      Number.isFinite(value.acknowledgedAt) &&
      value.acknowledgedAt <= now &&
      now - value.acknowledgedAt < RETENTION_MS;
    if (!valid) storage.removeItem(PRIVACY_NOTICE_KEY);
    return valid;
  } catch {
    return false;
  }
}

export function savePrivacyNotice() {
  try {
    localStorage.setItem(
      PRIVACY_NOTICE_KEY,
      JSON.stringify({ version: PRIVACY_NOTICE_VERSION, acknowledgedAt: Date.now() }),
    );
  } catch {
    // The notice can still be dismissed for this visit when storage is unavailable.
  }
}
