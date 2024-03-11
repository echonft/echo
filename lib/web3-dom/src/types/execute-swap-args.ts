import type { Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'

// TODO Add value once we turn the fee switch on
export interface ExecuteSwapArgs {
  chainId: number
  signature: HexString
  signerSignature: HexString
  offer: Offer
}
