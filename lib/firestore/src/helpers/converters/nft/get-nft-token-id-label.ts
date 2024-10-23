import type { Collection } from '@echo/model/types/collection/collection'

export function getNftTokenIdLabel(
  data: Record<'tokenId', number> & Record<'collection', Pick<Collection, 'totalSupply'>>
): string {
  return `#${data.tokenId.toString(10).padStart(Math.ceil(Math.log10(data.collection.totalSupply)), '0')}`
}
