import { type AlchemyResponseWithPaging } from '@echo/alchemy/types/response/alchemy-response-with-paging'

export interface AlchemyPagingResult<T> extends AlchemyResponseWithPaging {
  data: T[]
}
