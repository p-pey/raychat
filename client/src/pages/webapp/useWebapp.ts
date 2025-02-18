import { useEffect, useState } from "react";
import Subscribe from "../../utils/subscriber";
import SocketProxy from "./proxy/socket.proxy";
import { dialog, userConversation } from "../../types/types";
import { UsersMapper } from "./users.mapper";

export const SocketSubscriber = new Subscribe();

export default function useWebapp() {
  const [selectedUser, setSelectedUser] = useState<userConversation | null>(
    null
  );
  const [users, setUsers] = useState<userConversation[] | null>(null);
  const handleSelectUser = (user: userConversation) => {
    setSelectedUser(user);
  };

  const handleNewAgentMessage = (message: dialog) => {
    setUsers((prev) => {
      const prevUsers = prev ?? [];
      return prevUsers.map((user) => {
        if (user.clientId !== message.clientId) return user;
        const updateUser = {
          ...user,
          messages: [...user.messages, message],
        };
        setSelectedUser((prev) =>
          prev ? (prev.clientId === user.clientId ? updateUser : null) : null
        );
        return updateUser;
      });
    });
  };

  useEffect(() => {
    SocketProxy.register();
    SocketSubscriber.publish("connect", true);
    SocketProxy.onConversations((response) => {
      setUsers(
        UsersMapper.mapConversationsToUser(
          response.clients,
          response.conversations
        )
      );
    });

    SocketProxy.onConversations((response) => {
      setUsers(
        UsersMapper.mapConversationsToUser(
          response.clients,
          response.conversations
        )
      );
    });
    SocketProxy.onClientNewMessage((response) => {
      setUsers((prev) => {
        const prevUsers = prev ?? [];
        return prevUsers.map((user) => {
          if (user.clientId !== response.message.clientId) return user;
          const updateUser = {
            ...user,
            messages: [...user.messages, response.message],
          };
          setSelectedUser((prev) =>
            prev ? (prev.clientId === user.clientId ? updateUser : prev) : prev
          );
          return updateUser;
        });
      });
    });
    SocketProxy.onDisconnect(() => {
      SocketSubscriber.publish("connect", false);
    });
  }, []);
  return {
    users,
    selectedUser,
    handleSelectUser,
    handleNewAgentMessage,
  };
}
