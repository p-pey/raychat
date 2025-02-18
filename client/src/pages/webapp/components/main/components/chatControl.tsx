import { FormEventHandler, useRef } from "react";
import Icon from "../../../../../components/icon";
import SocketProxy from "../../../proxy/socket.proxy";
import { dialog } from "../../../../../types/types";

interface ChatControlProps {
    clientId: string;
    handleNewAgentMessage: (message: dialog)=> void;
}

export default function ChatControl({ clientId, handleNewAgentMessage }: ChatControlProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event)=> {
        event.preventDefault();
        SocketProxy.sendMessage(inputRef.current?.value ?? '', clientId, (response: dialog) => {
            handleNewAgentMessage(response);
        });
        inputRef.current!.value = ''
    }
    return (
        <div className="flex items-center border border-gray-300 rounded-xl mt-auto">
            <form onSubmit={handleFormSubmit} className="p-3 flex items-center justify-between grow font-bold text-sm">
               
                <button type="submit" className="bg-pink-950 rounded-3xl whitespace-nowrap flex items-cener p-2 text-white gap-2">
                    <Icon name="sendWhite" />
                    <span>
                    ارسال پیام
                    </span>
                </button>
                <input ref={inputRef} required placeholder="اینجا بنویسید" className="outline-0 grow" />
            </form>
            <div className="flex items-center justify-center p-3 border-gray-300 border-l">
                <Icon name="bookMark" />
            </div>
        </div>
    )
}