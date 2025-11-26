export interface StrapiListResponse<T> {
  data: T[];
  meta: unknown;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: unknown;
}
