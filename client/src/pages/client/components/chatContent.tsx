import { useEffect, useState } from "react";
import { SocketSubscriber } from "../useClient";
import ChatMapper from "./chat.mapper";
import Dialog from "./dialog";
export type dialog = {
  clientId: string;
  id: string;
  isFromAgent: boolean;
  text: string;
  timestamp: string;
};

export default function ChatContent() {
  const [dialogs, setDialogs] = useState<dialog[] | null>(null);
  useEffect(() => {
    const unsubscribe = SocketSubscriber.subscribe("message", (response) => {
      const data = response as dialog;
      const modifyDialog: dialog = { ...data, timestamp: ChatMapper.convertDate(data.timestamp) }
      setDialogs((prev) =>
        ChatMapper.mapChatToSortArray([...prev ?? [], modifyDialog])
      );
    });
    const messagesUnsubscribe = SocketSubscriber.subscribe(
      "messages",
      (response) => {
        const data = response as { clientId: string, messages: dialog[], unread: number };
        console.log(data);
        setDialogs(ChatMapper.mapChatTimeStampToPersianDate(ChatMapper.mapChatToSortArray(data.messages)));
      }
    );
    return () => {
      unsubscribe();
      messagesUnsubscribe();
    };
  }, []);
  return (
    <main className="flex flex-col gap-2 max-h-full overflow-auto">
      { dialogs === null ? <h1 className="mx-auto font-medium">... درحال دریافت  </h1> : dialogs.length === 0 ? <h1 className="font-medium text-center m-auto"> اولین پیام را ارسال کنید </h1> : dialogs.map((dialog) => {
        return (
          <Dialog key={dialog.id} date={ dialog.timestamp } isPrimary={!dialog.isFromAgent}>
            {dialog.text}
          </Dialog>
        );
      }) }
      
    </main>
  );
}
