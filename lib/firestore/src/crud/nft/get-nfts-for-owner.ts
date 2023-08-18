/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { Nft } from '../../types/model/nft'
import { firestore } from 'firebase-admin'
import { invoker, map } from 'ramda'

export const getNftsForOwner = async (userId: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('owner.id', '==', userId)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
