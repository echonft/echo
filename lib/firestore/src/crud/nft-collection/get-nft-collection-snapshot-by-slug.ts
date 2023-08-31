import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { firestore } from '../../services/firestore'
import { NftCollection } from '../../types/model/nft-collection'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getNftCollectionSnapshotBySlug = async (slug: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('slug', '==', slug)
    .withConverter(nftCollectionDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<NftCollection>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
