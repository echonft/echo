import { getAllOffers } from '../mocks/model/offer'
import { Offer } from '@echo/ui-model'
import { isNil } from 'ramda'

export const findOfferById = (offerId: string): Offer => {
  const offer = getAllOffers().find((offer) => offer.id === offerId)
  if (isNil(offer)) {
    throw Error(`No collection with slug ${offerId}`)
  }
  return offer
}
