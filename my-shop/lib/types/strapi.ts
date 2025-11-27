export interface StrapiListResponse<T> {
  data: T[];
  meta: unknown;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: unknown;
}

export interface StrapiErrorResponse {
  error: {
    status: number;
    message: string;
    name: string;
    details?: unknown;
  };
}
