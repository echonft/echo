import type { HexString } from '@echo/utils/types/hex-string'

export interface AcceptOfferArgs {
  offerId: string
  signature: HexString | undefined
}
