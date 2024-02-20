import { type ArgsWithPaging } from '@echo/alchemy/types/request/args-with-paging'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetNftsForOwnerRequest extends ArgsWithPaging {
  owner: HexString
  contractAddresses: HexString[] // max 45
}
