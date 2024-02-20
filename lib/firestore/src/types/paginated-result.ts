export interface PaginatedResult<T> {
  result: T[]
  page: number
  hasNext?: boolean
}
