import { CHAIN_BLAST, CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import type { ChainName } from '@echo/utils/types/chain-name'

export function getBaseUrl(chain: ChainName) {
  switch (chain) {
    case CHAIN_BLAST:
      return 'https://restapi.nftscan.com/api/v2/'
    case CHAIN_ETHEREUM:
      return 'https://blastapi.nftscan.com/api/v2/'
    default:
      throw new Error(`Unsupported chain for NFT Scan API: ${chain}`)
  }
}
