import type { Contract } from '@echo/model/types/collection'
import type { CollectionContractResponse } from '@echo/opensea/types/response/collection-contract-response'
import type { HexString } from '@echo/utils/types/hex-string'
import { modify, toLower } from 'ramda'

export function mapCollectionContractResponse(response: CollectionContractResponse): Contract {
  return modify('address', toLower<HexString>, response)
}
