import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'
import { blockExplorerLinkFromChain } from '@echo/web3/helpers/block-explorer-link-from-chain'

interface UseBlockExplorerLinkArgs {
  address: Address
  chain: Chain
}

export function useBlockExplorerLink(args: UseBlockExplorerLinkArgs) {
  return blockExplorerLinkFromChain(args)
}
