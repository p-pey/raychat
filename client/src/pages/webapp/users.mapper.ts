import { dialog, user, userConversation } from "../../types/types";

export class UsersMapper {
  static mapConversationsToUser(
    clients: user[],
    conversations: { clientId: string; unread: number; messages: dialog[] }[]
  ): userConversation[] {
    return clients.map((item) => {
      const findClientConversation = conversations.find(
        (conversation) => conversation.clientId === item.id
      ) ?? { clientId: item.id, messages: [], unread: 0 };
      return {
        ...item,
        ...findClientConversation,
      };
    });
  }
}
