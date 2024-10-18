import type { Chain } from '@echo/utils/constants/chain'
import type { HexString } from '@echo/utils/types/hex-string'

export interface ContractUpdateOfferArgs {
  offerId: Lowercase<HexString>
  chain: Chain
}
