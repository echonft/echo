import { CollectionName } from '../../config/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { FirestoreNftAttributeData } from '../../types/model/data/nft/firestore-nft-attribute-data'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { getNftCollectionSnapshotBySlug } from '../nft-collection/get-nft-collection-snapshot-by-slug'
import { isNilOrEmpty } from '@echo/utils'

export const findNftsForCollectionByAttributes = async (
  collectionSlug: string,
  attributes?: FirestoreNftAttributeData[]
): Promise<FirestoreNftData[]> => {
  const collectionSnapshot = await getNftCollectionSnapshotBySlug(collectionSlug)
  let query = getCollectionFromPath<FirestoreNft>(CollectionName.NFTS).where('collection', '==', collectionSnapshot.ref)
  if (!isNilOrEmpty(attributes)) {
    query = query.where('attributes', 'array-contains-any', attributes)
  }
  query = query.orderBy('tokenId')
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return []
  }
  const promises = new Array<Promise<FirestoreNftData>>(querySnapshot.size)
  querySnapshot.forEach((doc) => {
    promises.push(convertNft(doc))
  })
  return Promise.all(promises)
}
