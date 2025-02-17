import { io, Socket } from "socket.io-client";

export default class SocketService {
  private _socket: Socket;

  constructor() {
    this._socket = io(import.meta.env.VITE_SERVER_SOCKET_URL);
  }

  connect() {
    return this._socket.connect();
  }
  disconnect() {
    return this._socket.disconnect();
  }
  emit(ev: string, ...args: unknown[]) {
    return this._socket.emit(ev, args);
  }
}
