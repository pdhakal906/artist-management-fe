export const session = {
  set: (key: string, value: string): void => {
    sessionStorage.setItem(key, value);
  },

  get: (key: string): string | null => {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    return item;
  },

  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  },

  clear: (): void => {
    sessionStorage.clear();
  },
};
