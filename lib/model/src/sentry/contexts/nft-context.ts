import type { Nft } from '@echo/model/types/nft'

export const NFT_CONTEXT_NAME = 'nft' as const
export function nftContext(nft: Partial<Nft>) {
  return {
    [NFT_CONTEXT_NAME]: nft
  }
}
