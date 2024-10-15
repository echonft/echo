import type { ChainName } from '@echo/utils/types/chain-name'

export function getChainId(name: ChainName): number {
  switch (name) {
    case 'blast':
      return 81457
    case 'blast_sepolia':
      return 168587773
    case 'ethereum':
      return 1
    case 'sepolia':
      return 11155111
    case 'sei':
      return 1329
    default:
      throw Error(`chain not supported: ${name as string}`)
  }
}
