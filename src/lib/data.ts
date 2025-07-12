import type { User, Question, Answer, Notification } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice', avatarUrl: 'https://placehold.co/40x40/7952B3/FFFFFF.png' },
  { id: 'user-2', name: 'Bob', avatarUrl: 'https://placehold.co/40x40/3F51B5/FFFFFF.png' },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://placehold.co/40x40/E8EAF6/000000.png' },
];

export const answers: Answer[] = [
  {
    id: 'ans-1',
    authorId: 'user-2',
    content: "You can use `useEffect` hook in React to perform side effects in function components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.",
    votes: 15,
    isAccepted: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ans-2',
    authorId: 'user-3',
    content: "To add to Bob's answer, make sure you add a dependency array to `useEffect` to control when it runs. An empty array `[]` means it only runs on mount.",
    votes: 8,
    isAccepted: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ans-3',
    authorId: 'user-1',
    content: "The best way to manage global state in a Next.js app is using React's Context API for simpler cases or a state management library like Redux or Zustand for more complex applications. Context is built-in and doesn't require extra libraries.",
    votes: 22,
    isAccepted: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

export const questions: Question[] = [
  {
    id: 'q-1',
    title: 'How to fetch data in React?',
    description: 'I am new to React and I want to know the best way to fetch data from an API. I have seen examples using `useEffect` and `fetch`. Is this the recommended approach? What about handling loading and error states?',
    authorId: 'user-1',
    tags: ['react', 'data-fetching', 'hooks', 'javascript'],
    votes: 25,
    answers: [answers[0], answers[1]],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'q-2',
    title: 'What is the best way to manage global state in a Next.js app?',
    description: 'My Next.js application is growing and prop drilling is becoming an issue. I need a way to manage global state that is accessible from multiple components. What are the pros and cons of different solutions like Context API, Redux, Zustand, etc.?',
    authorId: 'user-2',
    tags: ['nextjs', 'react', 'state-management'],
    votes: 42,
    answers: [answers[2]],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'q-3',
    title: 'How to implement authentication with JWT in a Node.js API?',
    description: 'I am building a REST API with Node.js and Express and I want to secure it using JSON Web Tokens (JWT). What is the standard flow for logging in a user, creating a token, and validating it on subsequent requests? Are there any libraries that can simplify this process?',
    authorId: 'user-3',
    tags: ['nodejs', 'jwt', 'authentication', 'api'],
    votes: 18,
    answers: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const notifications: Notification[] = [
    {
        id: 'notif-1',
        text: 'Alice answered your question "How to fetch data in React?"',
        read: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-2',
        text: '@Charlie mentioned you in a comment.',
        read: false,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-3',
        text: 'Your answer to "What is the best way to manage global state..." was upvoted.',
        read: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
];
