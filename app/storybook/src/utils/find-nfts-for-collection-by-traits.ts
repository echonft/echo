import { getAllNfts } from '../mocks/model/nft'
import { mapNftTraitsToNftAttributes, Nft, NftTraits } from '@echo/ui-model'
import { intersects, isNilOrEmpty } from '@echo/utils'
import { isEmpty, isNil } from 'ramda'

export const findNftsForCollectionByTraits = (collectionSlug: string, traits?: NftTraits): Nft[] => {
  const collectionNfts = getAllNfts().filter((nft) => nft.collection.slug === collectionSlug)
  if (isNil(collectionNfts)) {
    throw Error(`No NFTs found for nft-collection with slug ${collectionSlug}`)
  }
  if (isNilOrEmpty(traits)) {
    return collectionNfts
  }
  const attributes = mapNftTraitsToNftAttributes(traits)
  if (isEmpty(attributes)) {
    return collectionNfts
  }
  const filteredNfts = collectionNfts.filter((nft) => intersects(nft.attributes)(attributes))
  if (isNil(filteredNfts)) {
    throw Error(`No NFTs found for nft-collection with slug ${collectionSlug} with the selected trait filters`)
  }
  return filteredNfts
}
