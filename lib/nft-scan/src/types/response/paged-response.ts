export interface PagedResponse<T> {
  total: number
  next: string | null
  content: T[]
}
