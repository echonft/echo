import { swapDataConverter } from '../../converters/swap-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { Swap } from '../../types/model/swap'
import { getSwapSnapshotById } from './get-swap-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateSwap = async (id: string, offer: Partial<Omit<Swap, 'id'>>): Promise<WriteResult> => {
  const documentSnapshot = await getSwapSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid swap id')
  }
  return cleanAndUpdateDocumentRef(documentSnapshot.ref, offer, swapDataConverter)
}
