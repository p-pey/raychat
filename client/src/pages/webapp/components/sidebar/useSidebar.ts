import { userConversation } from "../../../../types/types";

export function useSidebar({
  onSelectUser,
}: {
  onSelectUser: (user: userConversation) => void;
}) {
  const handleSelectUser = (user: userConversation) => {
    onSelectUser(user);
  };

  return { handleSelectUser };
}
