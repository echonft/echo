import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { mapOfferToOfferSignature } from '@echo/web3-dom/mappers/map-offer-to-offer-signature'
import type { ExecuteSwapArgs } from '@echo/web3-dom/types/execute-swap-args'
import { hexToSignature } from 'viem'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function executeSwap(args: ExecuteSwapArgs) {
  const { chainId, signature, signerSignature, offer } = args
  const { r, s, v } = hexToSignature(signature)
  const { r: rSigner, s: sSigner, v: vSigner } = hexToSignature(signerSignature)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'executeTrade',
    address: ECHO_ADDRESS,
    chainId,
    args: [
      v as unknown as number,
      r,
      s,
      vSigner as unknown as number,
      rSigner,
      sSigner,
      mapOfferToOfferSignature(offer) as never
    ]
  })
  return await writeContract(wagmiConfig, request)
}
