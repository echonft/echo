import { type ResponseWithPaging } from '@echo/alchemy/types/response/response-with-paging'

export interface AlchemyPagingResult<T> extends ResponseWithPaging {
  data: T[]
}
