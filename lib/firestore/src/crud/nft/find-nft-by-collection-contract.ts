import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { Nft } from '../../types/model/nft'
import { firestore } from 'firebase-admin'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const findNftByCollectionContract = async (
  collectionContractAddress: string,
  collectionContractChainId: number,
  tokenId: number
) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('tokenId', '==', tokenId)
    .where('collection.contract.address', '==', collectionContractAddress)
    .where('collection.contract.chainId', '==', collectionContractChainId)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Nft>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot.data()
}
