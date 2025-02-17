type storageKeys = "user";

export interface Storage {
  setItem: (key: storageKeys, value: string) => void;
  getItem: (key: storageKeys) => string | null;
  removeItem: (key: storageKeys) => void;
  clear: () => void;
}

export class StorageService implements Storage {
  private _storage: typeof localStorage;
  constructor() {
    this._storage = localStorage;
  }
  setItem(key: storageKeys, value: string) {
    this._storage.setItem(key, value);
  }
  getItem(key: storageKeys) {
    return this._storage.getItem(key);
  }
  removeItem(key: storageKeys) {
    this._storage.removeItem(key);
  }
  clear(): void {
    this._storage.clear();
  }
}
