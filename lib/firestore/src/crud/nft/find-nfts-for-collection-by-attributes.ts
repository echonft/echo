import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { Nft } from '../../types/model/nft'
import { NftAttribute } from '../../types/model/nft-attribute'
import { isNilOrEmpty } from '@echo/utils'
import { firestore } from 'firebase-admin'
import { invoker, map } from 'ramda'

export const findNftsForCollectionByAttributes = async (collectionSlug: string, attributes?: NftAttribute[]) => {
  let query = firestore().collection(CollectionName.NFTS).where('collection.slug', '==', collectionSlug)
  if (!isNilOrEmpty(attributes)) {
    query = query.where('attributes', 'array-contains-any', attributes)
  }

  const querySnapshot = await query.withConverter(nftDataConverter).get()
  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
