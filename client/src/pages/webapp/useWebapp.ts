import { useEffect, useState } from "react";
import { dialog, userConversation } from "../../types/types";
import SocketProxy from "./proxy/socket.proxy";
import { UsersMapper } from "./users.mapper";


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

  }, []);
  return {
    users,
    selectedUser,
    handleSelectUser,
    handleNewAgentMessage,
  };
}
