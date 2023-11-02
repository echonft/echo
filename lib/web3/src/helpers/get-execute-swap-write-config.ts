import type { Offer } from '@echo/model/types/offer'
import { type HexString } from '@echo/utils/types/hex-string'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { EXECUTE_TRADE } from '@echo/web3/constants/echo-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { mapOfferToOfferSignature } from '@echo/web3/mappers/map-offer-to-offer-signature'
import type { EchoAbi } from '@echo/web3/types/echo-abi'
import type { ExecuteTradeFn } from '@echo/web3/types/echo-function-name-types'
import { hexToSignature } from 'viem'
import type { UsePrepareContractWriteConfig } from 'wagmi'

// TODO Add value once we turn the fee switch on.
export function getExecuteSwapWriteConfig(chainId: number, signature: HexString, offer: Offer) {
  const { r, s, v } = hexToSignature(signature)
  return {
    abi: ECHO_ABI,
    functionName: EXECUTE_TRADE,
    address: getEchoAddress(chainId),
    chainId,
    args: [v as unknown as number, r, s, mapOfferToOfferSignature(offer)]
  } as UsePrepareContractWriteConfig<EchoAbi, ExecuteTradeFn, number>
}
