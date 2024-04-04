import type { WithPagingResult } from '@echo/helius/types/response/base/with-paging-result'
import type { HeliusResponse } from '@echo/helius/types/response/helius-response'

interface Item {
  interface: string
  id: string
  authorities: string[]
  creators: string[]
  mutable: boolean
  burnt: boolean
  inscription: Inscription
}

interface Inscription {
  contentType: string
  encoding: string
  validationHash: string
  inscriptionDataAccount: string
  authority: string
}

export type GetNftsForCollectionResponse = HeliusResponse<{ items: Item[] } & WithPagingResult>
