import type { Offer } from '@echo/model/types/offer'
import { mapOfferToOfferSignature } from '@echo/ui/mappers/map-offer-to-offer-signature'
import { ECHO_ABI } from '@echo/utils/constants/echo-abi'
import { echoAddress } from '@echo/utils/constants/echo-address'
import { type HexString } from '@echo/utils/types/hex-string'
import { hexToSignature } from 'viem'

// TODO Add value once we turn the fee switch on.
export function getExecuteSwapWagmiConfig(chainId: number, signature: HexString, offer: Offer) {
  const { r, s, v } = hexToSignature(signature)
  return {
    abi: ECHO_ABI,
    functionName: 'executeTrade',
    address: echoAddress,
    chainId,
    args: [v, r, s, mapOfferToOfferSignature(offer)]
  }
}
