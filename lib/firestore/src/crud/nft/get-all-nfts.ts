import { CollectionName } from '../../constants/collection-name'
import { nftDataConverter } from '../../converters/nft-data-converter'
import { firestore } from '../../services/firestore'
import { Nft } from '@echo/firestore-types'
import { invoker, map } from 'ramda'

export async function getAllNfts() {
  const querySnapshot = await firestore().collection(CollectionName.NFTS).withConverter(nftDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as Nft[]
}
