import type { HexString } from '@echo/utils/types/hex-string'

export interface GetNftsForOwnerRequest {
  owner: HexString
  contractAddresses: HexString[] // max 45
}
