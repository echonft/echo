import type { Chain } from '@echo/model/constants/chain'
import { supportedChains } from '@echo/model/helpers/chain/supported-chains'
import type { Address } from '@echo/model/types/address'
import { blockExplorerLinkFromChain } from '@echo/web3/helpers/block-explorer-link-from-chain'
import { head, isNil, type NonEmptyArray, pipe } from 'ramda'

interface UseBlockExplorerLinkArgs {
  address: Address
  chain?: Chain
}

export function useBlockExplorerLink({ address, chain }: UseBlockExplorerLinkArgs) {
  if (isNil(chain)) {
    return blockExplorerLinkFromChain({
      address,
      chain: pipe<[], NonEmptyArray<Chain>, Chain>(supportedChains, head<Chain>)()
    })
  }
  return blockExplorerLinkFromChain({ address, chain })
}
