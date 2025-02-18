import Main from "./components/main/main";
import Sidebar from "./components/sidebar/sidebar";
import useWebapp from "./useWebapp";

export default function Webapp() {
  const { handleSelectUser, handleNewAgentMessage, selectedUser, users  } = useWebapp();
  return (
    <div className="w-full h-full grid grid-cols-[1fr_minmax(200px,0.3fr)] overflow-hidden">
      <Main handleNewAgentMessage={handleNewAgentMessage} selectedUser={selectedUser} />
      <Sidebar selectedUser={selectedUser} users={users} onUserSelect={handleSelectUser} />
    </div>
  );
}
