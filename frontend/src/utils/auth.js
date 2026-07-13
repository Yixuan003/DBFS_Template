const STORAGE_KEY = "dbfs_user";

export function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return !!localStorage.getItem(STORAGE_KEY);
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}