import ChatContent from "./components/chatContent";
import ChatControl from "./components/chatControl";
import ChatInfo from "./components/chatInfo";

export default function Client() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full lg:w-[366px] lg:h-[528px]">
        <div className="flex flex-col justify-between rounded-xl h-full w-full">
          <ChatInfo />
          <div className="p-2">
            <ChatContent />
            <ChatControl />
          </div>
        </div>
      </div>
    </div>
  );
}
