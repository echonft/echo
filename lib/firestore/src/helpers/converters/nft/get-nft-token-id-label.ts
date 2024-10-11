import type { Collection } from '@echo/model/types/collection'

export function getNftTokenIdLabel(
  data: Record<'tokenId', number> & Record<'collection', Pick<Collection, 'totalSupply'>>
): string {
  return `#${data.tokenId.toString().padStart(Math.ceil(Math.log10(data.collection.totalSupply)), '0')}`
}
