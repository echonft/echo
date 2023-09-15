import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function updateOffer(id: string, offer: Partial<Omit<FirestoreOffer, 'id'>>): Promise<WriteResult> {
  const documentSnapshot = await getOfferSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid offer id')
  }
  return cleanAndUpdateDocumentRef(documentSnapshot.ref, offer, offerDataConverter)
}
