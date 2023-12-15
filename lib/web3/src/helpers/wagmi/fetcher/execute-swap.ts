import type { Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { echoFunctionNames } from '@echo/web3/constants/echo-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { mapOfferToOfferSignature } from '@echo/web3/mappers/map-offer-to-offer-signature'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { hexToSignature } from 'viem'

// TODO Add value once we turn the fee switch on
export interface ExecuteSwapArgs {
  chainId: number
  signature: HexString
  offer: Offer
}
export async function executeSwap(args: ExecuteSwapArgs) {
  const { chainId, signature, offer } = args
  const { r, s, v } = hexToSignature(signature)
  const config = await prepareWriteContract({
    abi: ECHO_ABI,
    functionName: echoFunctionNames.executeTrade,
    address: getEchoAddress(chainId),
    chainId,
    args: [v as unknown as number, r, s, mapOfferToOfferSignature(offer)]
  })
  const { hash } = await writeContract(config)
  return hash
}
