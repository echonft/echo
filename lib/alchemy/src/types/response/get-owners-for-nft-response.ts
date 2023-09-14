import { AlchemyResponseWithPaging } from '@echo/alchemy/types/response/alchemy-response-with-paging'

export interface GetOwnersForNftResponse extends AlchemyResponseWithPaging {
  owners: string[]
}
