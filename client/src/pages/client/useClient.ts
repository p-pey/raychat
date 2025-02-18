import { useEffect } from "react";
import SocketProxy from "./proxy/socket.proxy";
import Subscribe from "./utils/subscriber";
import { dialog } from "./components/chatContent";
export const SocketSubscriber = new Subscribe();

export default function useClient() {
  const handlePublishMessages = (data: {
    clientId: string;
    unread: number;
    messages: dialog[];
  }) => {
    SocketSubscriber.publish("messages", data);
  };
  useEffect(() => {
    SocketProxy.register();
    SocketSubscriber.publish("connect", true);
    SocketProxy.getMessages((response) => {
      if (response.success) {
        handlePublishMessages(response.data);
      } else {
        window.alert(response.error);
      }
    });
    SocketProxy.onMessage((response) => {
      SocketSubscriber.publish("message", response);
    });
    SocketProxy.onDisconnect(() => {
      SocketSubscriber.publish("connect", false);
    });
  }, []);
}
