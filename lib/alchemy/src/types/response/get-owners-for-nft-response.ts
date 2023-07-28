import { ResponseWithPaging } from './response-with-paging'

export interface GetOwnersForNftResponse extends ResponseWithPaging {
  owners: string[]
}
