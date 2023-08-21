import { collectionOffersLink } from './collection-offers-link'
import { getOfferGuild, Offer } from '@echo/firestore'

export function offerLink(offer: Offer): string {
  return `${collectionOffersLink(getOfferGuild(offer).discordId)}/${offer.id}`
}
