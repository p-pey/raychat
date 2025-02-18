import Main from "./components/main/main";
import Sidebar from "./components/sidebar/sidebar";

export default function Webapp() {
  return (
    <div className="w-full h-full grid grid-cols-[1fr, 400px] grid-rows-1">
      <Sidebar />
      <Main />
    </div>
  );
}
