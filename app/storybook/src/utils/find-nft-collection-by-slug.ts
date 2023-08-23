import { getAllCollections } from '../mocks/model/nft-collection'
import { NftCollection } from '@echo/ui-model'
import { isNil } from 'ramda'

export const findNftCollectionBySlug = (slug: string): NftCollection => {
  const nftCollection = getAllCollections().find((collection) => collection.slug === slug)
  if (isNil(nftCollection)) {
    throw Error(`No collection with slug ${slug}`)
  }
  return nftCollection
}
