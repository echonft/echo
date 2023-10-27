import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'

export async function findOfferThreadCloseRequestById(id: string) {
  const documentSnapshot = await getOfferThreadsCloseRequestsCollectionReference().doc(id).get()
  return documentSnapshot?.data()
}
