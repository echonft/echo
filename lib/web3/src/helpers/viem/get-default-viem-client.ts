import { getChain } from '@echo/web3/helpers/get-chain'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { type PublicClient, type WebSocketTransport } from 'viem'

export function getDefaultViemClient(): PublicClient<WebSocketTransport> {
  return getViemClient(getChain())
}
