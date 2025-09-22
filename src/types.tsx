export type MESSAGE_TYPE = {
  created: string;
  value: string;
  recieved: boolean;
  id: number;
};

export type CHAT_TYPE = {
  name: string;
  id: number;
  profileImg: string;
  messages: Array<MESSAGE_TYPE>;
};
