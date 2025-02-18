import { dialog } from "./chatContent";

export default class ChatMapper {
  static mapChatToSortArray(chats: dialog[]) {
    return chats.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });
  }
  static mapChatTimeStampToPersianDate(chats: dialog[]) {
    return chats.map((dialog) => {
      return {
        ...dialog,
        timestamp: ChatMapper.convertDate(dialog.timestamp),
      };
    });
  }
  static convertDate(dateString: string) {
    const date = new Date(dateString);

    const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let formattedTime = timeFormatter.format(date);

    const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    formattedTime = formattedTime.replace(
      /\d/g,
      (digit: string) => persianNumerals[parseInt(digit)]
    );
    return formattedTime;
  }
}
