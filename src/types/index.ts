
export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  info: string;
}

export interface Message {
  id: string;
  content: any;
  read: boolean;
  date: Date;
  type: string;
}