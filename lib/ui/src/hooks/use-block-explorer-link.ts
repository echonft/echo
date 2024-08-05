import type { Wallet } from '@echo/model/types/wallet'
import { blockExplorerLinkFromChain } from '@echo/web3/helpers/block-explorer-link-from-chain'

export function useBlockExplorerLink(wallet: Wallet) {
  return blockExplorerLinkFromChain(wallet)
}
