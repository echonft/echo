import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'

export async function deleteOfferThreadCloseRequest(id: string) {
  const reference = getOfferThreadsCloseRequestsCollectionReference().doc(id)
  return await reference.delete()
}
