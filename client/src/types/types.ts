export type user = {
  id: string;
  name: string;
  socketId: string;
};

export type dialog = {
  clientId: string;
  id: string;
  isFromAgent: boolean;
  text: string;
  timestamp: string;
};

export type authUser = {
  name: string;
  id: string;
  role: "agent" | "user";
};

export type userConversation = {
  clientId: string;
  id: string;
  messages: {
    id: string;
    text: string;
    clientId: string;
    timestamp: string;
    isFromAgent: boolean;
  }[];
  name: string;
  socketId: string;
  unread: number;
};
