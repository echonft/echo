import { CollectionName } from '../../config/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { mapNft } from '../../mappers/nft/map-nft'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { getDocsFromQuery } from '../../utils/query/get-docs-from-query'
import { getNftCollectionSnapshotBySlug } from '../nft-collection/get-nft-collection-snapshot-by-slug'
import { mapNftTraitsToNftAttributes, Nft, NftTraits } from '@echo/model'
import { isNilOrEmpty, promiseAll } from '@echo/utils'
import { query, where } from 'firebase/firestore'
import { andThen, map, pipe } from 'ramda'

export const findNftsForCollectionByTraits = async (collectionSlug: string, traits?: NftTraits): Promise<Nft[]> => {
  const collectionSnapshot = await getNftCollectionSnapshotBySlug(collectionSlug)
  const nftsRef = getCollectionFromPath<FirestoreNft>(CollectionName.NFTS)
  const constraints = [where('collection', '==', collectionSnapshot.ref)]
  if (!isNilOrEmpty(traits)) {
    const attributes = mapNftTraitsToNftAttributes(traits)
    constraints.push(where('attributes', 'array-contains-any', attributes))
  }
  return await pipe(andThen(pipe(map(convertNft), map(mapNft), promiseAll)))(
    getDocsFromQuery(query(nftsRef, ...constraints))
  )
}
