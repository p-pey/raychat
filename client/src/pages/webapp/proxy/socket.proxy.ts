import AuthService from "../../../services/auth.service";
import { authUser, dialog, user, userConversation } from "../../../types/types";
import SocketService from "../services/socket.service";

export default class SocketProxy {
  private static _socketInstance = new SocketService().connect();
  private static _auth = new AuthService();

  static reconnect() {
    this._socketInstance.connect();
  }

  static register() {
    const user = this._auth.getUser() as authUser;
    if (!user) {
      throw new Error("Agent Not Found!");
    }
    this._socketInstance.emit("register-agent");
  }

  static sendMessage(
    text: string,
    clientId: string,
    callback: (response: dialog) => void
  ) {
    this._socketInstance.emit(
      "agent-message",
      {
        clientId,
        text,
      },
      callback
    );
  }

  static onConversations(
    callback: (response: {
      conversations: userConversation[];
      clients: user[];
    }) => void
  ) {
    this._socketInstance.on("existing-conversations", (response) => {
      callback(response);
    });
  }

  static onClientNewMessage(
    callback: (args: {
      message: dialog;
      conversations: userConversation[];
    }) => void
  ) {
    this._socketInstance.on("new-user-message", (response) => {
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
