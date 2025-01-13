export type ResponseType<T> = {
  status: number;
  data: {
    body: T;
    totalCount?: number;
  };
  error?: string;
  message?: string;
};
