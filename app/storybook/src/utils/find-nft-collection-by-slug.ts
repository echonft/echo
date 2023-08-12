import { NftCollection, nftCollections } from '@echo/ui'
import { isNil } from 'ramda'

export const findNftCollectionBySlug = (slug: string): NftCollection => {
  const nftCollection = Object.values(nftCollections).find((collection) => collection.slug === slug)
  if (isNil(nftCollection)) {
    throw Error(`No collection with slug ${slug}`)
  }
  return nftCollection
}
