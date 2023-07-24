import { ResponseWithPaging } from '../response/response-with-paging'

export interface PagingResult<T> extends ResponseWithPaging {
  data: T[]
}
