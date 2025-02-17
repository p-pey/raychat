import AuthService, { user } from "../services/auth.service";
import SocketService from "../services/socket.service";

export default class SocketProxy {
  private static _socketInstance = new SocketService();
  private static _auth = new AuthService();

  static connect() {
    return this._socketInstance.connect();
  }

  static reconnect() {
    this._socketInstance.connect();
  }

  static register() {
    const user = this._auth.getUser() as user;
    if (!user) {
      this._socketInstance.disconnect();
      throw new Error("User Not Found!");
    }
    this._socketInstance.emit("register-user", {
      clientId: user.id,
      name: user.name,
    });
  }

  static sendMessage(text: string) {
    const user = this._auth.getUser() as user;
    if (!user) {
      this._socketInstance.disconnect();
      throw new Error("User Not Found!");
    }
    this._socketInstance.emit("user-message", {
      clientId: user.id,
      text,
    });
  }

  static getMessages() {
    const user = this._auth.getUser() as user;
    if (!user) {
      this._socketInstance.disconnect();
      throw new Error("User Not Found!");
    }
    this._socketInstance.emit("get-client-conversations", {
      clientId: user.id,
    });
  }

  static disconnect() {
    return this._socketInstance.disconnect();
  }
}
