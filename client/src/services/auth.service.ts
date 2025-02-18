import { v4 } from "uuid";
import { Storage, StorageService } from "./storage.service";
import { authUser } from "../types/types";

export default class AuthService {
  private _storage: Storage;
  constructor() {
    this._storage = new StorageService();
  }
  private generateUserId() {
    return v4();
  }

  setUser(user: authUser) {
    this._storage.setItem(
      "user",
      JSON.stringify({ ...user, id: this.generateUserId() })
    );
  }
  getUser(): authUser | undefined {
    const user = this._storage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined;
    }
  }
}
