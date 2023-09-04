import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '@echo/firestore-types'
import { map } from 'ramda'

export const findNftsByIds = async (ids: string[]) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFTS)
    .where('id', 'in', ids)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Nft[]
  }

  return map((snapshot) => snapshot.data(), querySnapshot.docs)
}
