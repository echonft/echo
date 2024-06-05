import type { ChainName } from '@echo/utils/types/chain-name'

export function getBaseUrl(chain: ChainName) {
  switch (chain) {
    case 'blast':
      return 'https://blastapi.nftscan.com/api/v2'
    case 'ethereum':
      return 'https://restapi.nftscan.com/api/v2'
    default:
      throw new Error(`Unsupported chain for NFT Scan API: ${chain}`)
  }
}
