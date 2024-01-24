import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'

export async function getOfferSnapshotById(id: string) {
  const documentSnapshot = await getOffersCollectionReference().doc(id).get()
  if (!documentSnapshot.exists) {
    return undefined
  }
  return documentSnapshot
}
