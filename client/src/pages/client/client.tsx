import ChatContent from "./components/chatContent";
import ChatControl from "./components/chatControl";
import ChatInfo from "./components/chatInfo";
import useClient from "./useClient";

export default function Client() {
  useClient();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full lg:w-[366px] lg:h-[528px]">
        <div className="flex flex-col justify-between rounded-xl overflow-hidden border border-white-250 h-full w-full">
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
