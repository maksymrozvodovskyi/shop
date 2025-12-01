export type StrapiListResponseType<T> = {
  data: T[];
  meta: unknown;
};

export type StrapiSingleResponseType<T> = {
  data: T;
  meta: unknown;
};

export type StrapiErrorResponseType = {
  error: {
    status: number;
    message: string;
    name: string;
    details?: unknown;
  };
};
