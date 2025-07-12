export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Answer {
  id: string;
  authorId: string;
  content: string;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  authorId: string;
  tags: string[];
  votes: number;
  answers: Answer[];
  createdAt: string;
}

export interface Notification {
  id: string;
  text: string;
  read: boolean;
  createdAt: string;
}
