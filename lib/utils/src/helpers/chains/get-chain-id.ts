import { Chain } from '@echo/utils/constants/chain'

export function getChainId(name: Chain): number {
  switch (name) {
    case Chain.Blast:
      return 81457
    case Chain.BlastSepolia:
      return 168587773
    case Chain.Ethereum:
      return 1
    case Chain.Sepolia:
      return 11155111
    case Chain.Sei:
      return 1329
    default:
      throw Error(`chain not supported: ${name as string}`)
  }
}
