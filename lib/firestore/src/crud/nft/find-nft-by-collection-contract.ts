import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export async function findNftByCollectionContract(
  collectionContractAddress: string,
  collectionContractChainId: number,
  tokenId: number
) {
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

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<Nft>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot.data()
}
