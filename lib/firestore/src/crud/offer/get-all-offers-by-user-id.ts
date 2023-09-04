import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { isNil, or } from 'ramda'

export const getAllOffersByUserId = async (userId: string) => {
  const queryReceiverSnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('receiver.id', '==', userId)
    .withConverter(offerDataConverter)
    .get()
  const querySenderSnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('sender.id', '==', userId)
    .withConverter(offerDataConverter)
    .get()

  if (queryReceiverSnapshot.empty && querySenderSnapshot.empty) {
    return undefined
  }

  const receiverDocumentSnapshot = queryReceiverSnapshot.docs
  const senderDocumentSnapshot = querySenderSnapshot.docs
  if (or(isNil(receiverDocumentSnapshot), isNil(senderDocumentSnapshot))) {
    return undefined
  }
  // TODO Add sorting by date and state (rejected should be last)
  return receiverDocumentSnapshot
    .map((snapshot) => snapshot.data())
    .concat(senderDocumentSnapshot.map((snapshot) => snapshot.data()))
}
