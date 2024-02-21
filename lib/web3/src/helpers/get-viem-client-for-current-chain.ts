import { getChain } from '@echo/web3/helpers/get-chain'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { type PublicClient } from 'viem'

export function getViemClientForCurrentChain(): PublicClient {
  return getViemClient(getChain())
}
