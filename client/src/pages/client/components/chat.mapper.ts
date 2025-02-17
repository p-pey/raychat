import { dialog } from "./chatContent";

export default class ChatMapper {
  static mapChatToSortArray(chats: dialog[]) {
    return chats.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });
  }
}
