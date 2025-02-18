import { dialog } from "../components/chatContent";
import AuthService, { user } from "../services/auth.service";
import SocketService from "../services/socket.service";

export default class SocketProxy {
  private static _socketInstance = new SocketService().connect();
  private static _auth = new AuthService();

  static reconnect() {
    this._socketInstance.connect();
  }

  static register() {
    const user = this._auth.getUser() as user;
    if (!user) {
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
      throw new Error("User Not Found!");
    }
    this._socketInstance.emit("user-message", {
      clientId: user.id,
      text,
    });
  }

  static getMessages(
    callback: (response: {
      success: string;
      error?: string;
      data: {
        clientId: string;
        unread: number;
        messages: dialog[];
      };
    }) => void
  ) {
    const user = this._auth.getUser() as user;
    if (!user) {
      throw new Error("User Not Found!");
    }
    this._socketInstance.emit(
      "get-client-conversations",
      {
        clientId: user.id,
      },
      callback
    );
  }

  static onMessage(
    callback: (response: {
      success: string;
      data: {
        clientId: string;
        unread: number;
        messages: dialog[];
      };
    }) => void
  ) {
    this._socketInstance.on("message", (response) => {
      callback(response);
    });
  }

  static onDisconnect(callback: VoidFunction) {
    this._socketInstance.on("disconnect", () => {
      callback();
    });
  }

  static disconnect() {
    console.log("--------------- disconnect");
    return this._socketInstance.disconnect();
  }
}
