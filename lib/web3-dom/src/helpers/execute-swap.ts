import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ExecuteSwapArgs } from '@echo/web3-dom/types/execute-swap-args'
import { hexToSignature } from 'viem'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function executeSwap(args: ExecuteSwapArgs) {
  const { chainId, signature, offerSignature } = args
  // console.log(`signature ${signature}`)
  // console.log(`offerSignature ${offerSignature}`)
  const { r, s, v } = hexToSignature(signature)
  // console.log(`v ${v}`)
  // console.log(`r ${r}`)
  // console.log(`s ${s}`)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'executeTrade',
    address: ECHO_ADDRESS,
    chainId,
    args: [
      v as unknown as number,
      r,
      s,
      {
        signature: offerSignature
      }
    ]
  })
  return await writeContract(wagmiConfig, request)
}
