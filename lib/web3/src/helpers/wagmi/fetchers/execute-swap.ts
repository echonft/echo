import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { echoFunctionNames } from '@echo/web3/constants/echo-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { wagmiConfig } from '@echo/web3/helpers/wagmi/wagmi-config'
import { mapOfferToOfferSignature } from '@echo/web3/mappers/map-offer-to-offer-signature'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import { hexToSignature } from 'viem'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function executeSwap(args: ExecuteSwapArgs) {
  const { chainId, signature, offer } = args
  const { r, s, v } = hexToSignature(signature)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: echoFunctionNames.executeTrade,
    address: getEchoAddress(chainId),
    chainId,
    args: [v as unknown as number, r, s, mapOfferToOfferSignature(offer) as never]
  })
  return await writeContract(wagmiConfig, request)
}
