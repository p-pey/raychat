import { dialog, userConversation } from "../../../../types/types";
import ChatControl from "./components/chatControl";
import Dialog from "./components/dialog";

interface MainProps {
    selectedUser: userConversation | null;
    handleNewAgentMessage: (response: dialog)=> void;
}

export default function Main(props: MainProps) {
    return (
        <main className="bg-gray-100 p-5 gap-5 flex flex-col justify-between max-h-full">
            <div className="flex flex-col gap-5 overflow-auto max-h-[88vh]">
            {
                props.selectedUser?.messages.map(message => {
                    return (
                        <Dialog key={message.id} isAgent={message.isFromAgent}>
                            { message.text }
                        </Dialog>
                    )
                })
            }
            </div>
           { !!props.selectedUser?.clientId && <ChatControl handleNewAgentMessage={props.handleNewAgentMessage} clientId={props.selectedUser?.clientId} /> }
        </main>
    )
}

