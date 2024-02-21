import { type Chain, createWalletClient, custom, type Transport, type WalletClient } from 'viem'

export function getWalletClient(chain: Chain): WalletClient<Transport, typeof chain> {
  return createWalletClient({
    chain,
    transport: custom(window.ethereum)
  })
}
