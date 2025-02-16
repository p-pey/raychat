import Icon from "../../../components/icon";

export default function ChatControl() {
  return (
    <footer className="h-10.5 w-full">
      <form className="flex items-center w-full">
        <button
          type="submit"
          className="bg-gray-200 p-2 rounded-full w-10.5 h-10.5 flex items-center justify-center"
        >
          <Icon name="send" />
        </button>
        <div className="flex items-center justify-between p-2 rounded-xl shadow mx-auto">
          <button type="button">
            <Icon name="attach" />
          </button>
          <input
            className="h- border-0 outline-0"
            placeholder="اینجا بنویسید ..."
          />
          <button type="button">
            <Icon name="voice" />
          </button>
        </div>
      </form>
    </footer>
  );
}
