export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface MessageResponse {
  message: string;
}
