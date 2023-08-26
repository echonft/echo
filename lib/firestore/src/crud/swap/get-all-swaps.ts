import { CollectionName } from '../../constants/collection-name'
import { swapDataConverter } from '../../converters/swap-data-converter'
import { firestore } from '../../services/firestore'
import { Swap } from '../../types/model/swap'
import { invoker, map } from 'ramda'

export const getAllSwaps = async () => {
  const querySnapshot = await firestore().collection(CollectionName.SWAPS).withConverter(swapDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as Swap[]
}
