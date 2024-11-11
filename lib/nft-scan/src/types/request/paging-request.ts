export interface PagingRequest {
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
