import type { ChainName } from '@echo/utils/types/chain-name'
import type { Chain } from 'viem'
import { blast, blastSepolia, mainnet, sepolia, sei } from 'viem/chains'

export function getViemChainByName(name: ChainName): Chain {
  switch (name) {
    case 'blast':
      return blast
    case 'blast_sepolia':
      return blastSepolia
    case 'ethereum':
      return mainnet
    case 'sepolia':
      return sepolia
    case 'sei':
      return sei
    default:
      throw Error(`chain ${name as string} not supported`)
  }
}
