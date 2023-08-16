import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreOffer } from '../../types/model/collections/offer/firestore-offer'
import { FirestoreRequestForOffer } from '../../types/model/collections/request-for-offer/firestore-request-for-offer'
import { isNil } from 'ramda'

export const updateRequestForOfferOffers = (requestForOfferId: string, offerId: string) => {
  const requestForOfferRef = getDocRefFromPath<FirestoreRequestForOffer>(
    CollectionName.REQUESTS_FOR_OFFER,
    requestForOfferId
  )
  const offerRef = getDocRefFromPath<FirestoreOffer>(CollectionName.OFFERS, offerId)
  if (isNil(requestForOfferRef)) {
    return Promise.reject('Request for offer not found')
  }
  if (isNil(offerRef)) {
    return Promise.reject('Offer not found')
  }
  return requestForOfferRef.get().then((snapshot) => {
    const requestForOffer = snapshot.data() as FirestoreRequestForOffer
    // Only change the state from created to offer received, otherwise it should stay the same
    // TODO Should we actually add checks to avoid updating an invalid request for offer? In theory it shouldn't happen
    const newState: string = requestForOffer.state === 'CREATED' ? 'OFFER_RECEIVED' : requestForOffer.state
    // Can force unwrap as we checked before if it's nil or empty
    return requestForOfferRef.update({
      state: newState,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      offers: (requestForOffer.offers ?? []).concat(offerRef)
    })
  })
}
