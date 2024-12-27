import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      email: string;
      // 其他用户信息...
    };
  }
} 