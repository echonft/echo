import { offerDataConverter } from '../../converters/offer-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { getOfferSnapshotById } from './get-offer-snapshot-by-id'
import { Offer } from '@echo/firestore-types'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function updateOffer(id: string, offer: Partial<Omit<Offer, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  return cleanAndUpdateDocumentRef(documentSnapshot.ref, offer, offerDataConverter)
}
