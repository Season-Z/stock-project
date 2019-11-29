let storage;

export default {
  localStorageEnable: true,
  setItem(k, v) {
    try {
      const data = typeof v === 'object' ? JSON.stringify(v) : v;

      localStorage.setItem(k, data);
    } catch (ex) {
      this.localStorageEnable = false;
      storage.k = v;
    }
  },
  getItem(k) {
    try {
      if (this.localStorageEnable) {
        return localStorage.getItem(k);
      }
      return storage.k;
    } catch (ex) {
      return storage.k;
    }
  },
  removeItem(k) {
    try {
      localStorage.removeItem(k);
    } catch (ex) {
      this.localStorageEnable = false;
    }
  }
};
