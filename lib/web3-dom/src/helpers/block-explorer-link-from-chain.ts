import { Chain } from '@echo/model/constants/chain'
import { ChainError } from '@echo/model/constants/errors/chain-error'
import type { Address } from '@echo/model/types/address'

interface UseBlockExplorerLinkArgs {
  address: Address
  chain: Chain
}

export function blockExplorerLinkFromChain({ address, chain }: UseBlockExplorerLinkArgs): string {
  switch (chain) {
    case Chain.Ethereum:
      return `https://etherscan.io/address/${address}`
    case Chain.Blast:
      return `https://blastscan.io/address/${address}`
    case Chain.Sepolia:
      return `https://sepolia.etherscan.io/address/${address}`
    case Chain.BlastSepolia:
      return `https://sepolia.blastscan.io/address/${address}`
    case Chain.Sei:
      return `https://seitrace.com/address/${address}`
    default:
      throw Error(ChainError.Unsupported)
  }
}
