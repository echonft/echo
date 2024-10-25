import type { Chain } from '@echo/model/constants/chain'
import { chains } from '@echo/web3/constants/chains'
import { prop } from 'ramda'
import { createWalletClient, custom, type WalletClient } from 'viem'

export function getWalletClient(chain: Chain): WalletClient {
  return createWalletClient({
    chain: prop(chain, chains),
    transport: custom(window.ethereum)
  })
}
