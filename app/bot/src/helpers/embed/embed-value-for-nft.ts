import { Nft } from '@echo/firestore-types'

export function embedValueForNft(nft: Partial<Nft>): string {
  return `${nft.collection!.name} #${nft.tokenId}`
}
