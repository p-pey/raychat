import { useEffect } from "react";
import SocketProxy from "./proxy/socket.proxy";
import Subscribe from "./utils/subscriber";
export const SocketSubscriber = new Subscribe();
const Socket = SocketProxy.connect();

export default function useClient() {
       useEffect(() => {
              SocketProxy.register();
              SocketProxy.getMessages((response) => {
                     console.log("##############");
                     SocketSubscriber.publish("messages", response);
              });
              console.log("**************");
              SocketSubscriber.publish("connect", true);
              Socket.on("message", (response) => {
                     SocketSubscriber.publish("message", response);
              });
              Socket.on("disconnect", () => {
                     SocketSubscriber.publish("connect", false);
              });
       }, []);
}