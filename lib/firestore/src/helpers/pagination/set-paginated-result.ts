import { PAGE_SIZE } from '@echo/firestore/constants/page-size'
import type { PaginatedResult } from '@echo/firestore/types/paginated-result'

export function setPaginatedResult<T>(page: number, data: T[]): PaginatedResult<T> {
  return {
    result: data,
    page,
    hasNext: data.length === PAGE_SIZE
  }
}
