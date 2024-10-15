import type { ChainName } from '@echo/utils/types/chain-name'

export function getChain(id: number): ChainName {
  switch (id) {
    case 81457:
      return 'blast'
    case 168587773:
      return 'blast_sepolia'
    case 1:
      return 'ethereum'
    case 11155111:
      return 'sepolia'
    case 1329:
      return 'sei'
    default:
      throw Error(`chain id not supported: ${id}`)
  }
}
