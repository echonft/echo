import { Offer } from '../../types/model/offer'
import { OfferState } from '../../types/model/offer-state'
import { getListingsForOfferId } from './get-listings-for-offer-id'
import { updateListing } from './update-listing'
import { always, map, modify, propEq, when } from 'ramda'

export const updateListingsWithOfferNewState = async (offerId: string, state: OfferState) => {
  const listings = await getListingsForOfferId(offerId)
  for (const listing of listings) {
    const { id, offers } = listing
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updatedOffers: Offer[] = map(when(propEq(offerId, 'id'), modify('state', always(state))), offers)
    await updateListing(id, { offers: updatedOffers })
  }
}
