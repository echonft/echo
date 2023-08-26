import { offerDataConverter } from '../../converters/offer-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { Offer } from '../../types/model/offer'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateOffer = async (id: string, offer: Partial<Omit<Offer, 'id'>>): Promise<WriteResult> => {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  return cleanAndUpdateDocumentRef(documentSnapshot.ref, offer, offerDataConverter)
}
