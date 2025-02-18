import classNames from "classnames";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Icon from "../../../components/icon";
import SocketProxy from "../proxy/socket.proxy";
import { SocketSubscriber } from "../useClient";

export default function ChatControl() {
  const [disable, setDisable] = useState(false);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (disable) return;
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content")?.toString() ?? "";
    SocketProxy.sendMessage(content);
    contentInputRef.current!.value = "";
  };

  useEffect(() => {
    const unsubscribe = SocketSubscriber.subscribe("connect", (isConnected) => {
      setDisable(!isConnected as boolean);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <footer className="h-10.5 w-full">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-between w-full"
      >
        <button
          type="submit"
          className={classNames(
            "bg-gray-200 p-2 rounded-full w-10.5 h-10.5 flex items-center justify-center",
            { ["opacity-50 cursor-not-allowed"]: disable }
          )}
        >
          <Icon name="send" />
        </button>
        <div className="flex grow gap-2 items-center justify-between p-2 rounded-xl shadow mx-auto">
          <button type="button">
            <Icon name="attach" />
          </button>
          <input
            ref={contentInputRef}
            name="content"
            required
            className="h- border-0 outline-0 grow "
            placeholder="اینجا بنویسید"
          />
          <button type="button">
            <Icon name="voice" />
          </button>
        </div>
      </form>
    </footer>
  );
}
