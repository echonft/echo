import type { ResponseWithPaging } from '@echo/alchemy/types/response/response-with-paging'

export interface PagingResult<T> extends ResponseWithPaging {
  data: T[]
}
