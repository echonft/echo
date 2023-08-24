import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { NftCollection } from '../../types/model/nft-collection'
import { firestore } from 'firebase-admin'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getNftCollectionSnapshotByContractAddress = async (address: string, chainId: number) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('contract.address', '==', address)
    .where('contract.chainId', '==', chainId)
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
