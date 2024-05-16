import type { Contract } from '@echo/model/types/collection'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import type { HexString } from '@echo/utils/types/hex-string'
import { modify, toLower } from 'ramda'

export function mapContractResponse(response: ContractResponse): Contract {
  return modify('address', toLower<HexString>, response)
}
