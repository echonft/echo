import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '../../types/model/nft'
import { invoker, map } from 'ramda'

export const getNftsForCollection = async (collectionId: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('collection.id', '==', collectionId)
    // do not return the collection for this query - we already have it
    .select(
      'id',
      'attributes',
      'balance',
      'blurUrl',
      'name',
      'openSeaUrl',
      'owner',
      'pictureUrl',
      'thumbnailUrl',
      'tokenId',
      'tokenType'
    )
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
