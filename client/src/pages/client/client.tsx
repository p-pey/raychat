import { useEffect } from "react";
import ChatContent from "./components/chatContent";
import ChatControl from "./components/chatControl";
import ChatInfo from "./components/chatInfo";
import SocketProxy from "./proxy/socket.proxy";
import Subscribe from "./utils/subscriber";

export const SocketSubscriber = new Subscribe();
 const Socket = SocketProxy.connect();
 SocketProxy.register();
 SocketProxy.getMessages()

 export default function Client() {
   useEffect(()=> {
    SocketSubscriber.publish("connect", true);
    Socket.on("disconnect", ()=> {
      SocketSubscriber.publish("connect", false);
    });
    Socket.on("message", (response)=> {
      SocketSubscriber.publish("message", response);
    });
    Socket.on("get-client-conversations", (response)=> {
      SocketSubscriber.publish("messages", response);
    })
  }, [])
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full lg:w-[366px] lg:h-[528px]">
        <div className="flex flex-col justify-between rounded-xl h-full w-full">
          <ChatInfo />
          <div className="p-2 flex flex-col gap-4 max-h-full scroll">
            <ChatContent />
            <ChatControl />
          </div>
        </div>
      </div>
    </div>
  );
}
