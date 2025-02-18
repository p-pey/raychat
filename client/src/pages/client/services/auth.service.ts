import { v4 } from "uuid";
import { Storage, StorageService } from "./storage.service";

export type user = {
  name: string;
  id: string;
  role: "agent" | "user";
};

export default class AuthService {
  private _storage: Storage;
  constructor() {
    this._storage = new StorageService();
  }
  private generateUserId() {
    return v4();
  }

  setUser(user: user) {
    this._storage.setItem(
      "user",
      JSON.stringify({ ...user, id: this.generateUserId() })
    );
  }
  getUser(): user | undefined {
    const user = this._storage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined
    }

  }
}
