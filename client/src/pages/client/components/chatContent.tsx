import { useEffect, useState } from "react";
import Dialog from "./dialog";
import { SocketSubscriber } from "../client";
import ChatMapper from "./chat.mapper";
export type dialog = {
  clientId: string;
  id: string;
  isFromAgent: boolean;
  text: string;
  timestamp: string;
}


export default function ChatContent() {
  const [ dialogs, setDialogs ] = useState<dialog[]>([]);
  useEffect(()=> {
    const unsubscribe = SocketSubscriber.subscribe("message", (data)=> {
      setDialogs(prev => ChatMapper.mapChatToSortArray([...prev, data as dialog]));
    });
    const messagesUnsubscribe = SocketSubscriber.subscribe("messages", (data) => {
      setDialogs(ChatMapper.mapChatToSortArray(data as dialog[]));
    })
    return ()=> {
      unsubscribe();
      messagesUnsubscribe()
    }
  }, []);
  return (
    <main className="flex flex-col gap-2 max-h-full overflow-auto">
      {
        dialogs.map(dialog => {
          return (
            <Dialog key={dialog.id} isPrimary={!dialog.isFromAgent}>
             { dialog.text }
          </Dialog>
          )
        })
      }
    
    </main>
  );
}
