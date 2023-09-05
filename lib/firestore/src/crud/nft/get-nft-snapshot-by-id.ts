import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getNftSnapshotById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('id', '==', id)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<Nft>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
