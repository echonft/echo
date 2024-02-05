import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface AcceptOfferArgs {
  offerId: string
  signature: Nullable<HexString>
}
