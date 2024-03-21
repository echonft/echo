import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ExecuteSwapArgs } from '@echo/web3-dom/types/execute-swap-args'
import { hexToSignature } from 'viem'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function executeSwap(args: ExecuteSwapArgs) {
  const { chainId, signature, offerSignature } = args
  const { r, s, v } = hexToSignature(signature)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'executeTrade',
    address: ECHO_ADDRESS,
    chainId,
    args: [
      28,
      '0x93a4f67a0500dbb84baa2c5a6f1fe5aa5f4af2e85f3ab7c3d5e1ed617df1940f',
      '0x56f1173d169c75726cf7d25b8bb2b495c3219d9fcf7f9e777a1cd0fea76efce1',
      {
        signature:
          '0x8779de463fad54b47b0868cc97539db81a8805b0df6a5848d0249bd45e9987d8597e8de3677fdd890ea26c3aa63bb1f0a7dfbeb283a56abcc57722b362c2d3091b'
      }
    ]
  })
  return await writeContract(wagmiConfig, request)
}
