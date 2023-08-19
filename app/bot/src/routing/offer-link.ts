import { getOfferGuild } from '../helpers/get-offer-guild'
import { collectionOffersLink } from './collection-offers-link'
import { Offer } from '@echo/firestore'

export function offerLink(offer: Offer): string {
  return `${collectionOffersLink(getOfferGuild(offer).discordId)}/${offer.id}`
}
