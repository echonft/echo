import { collectionOffersLink } from './collection-offers-link'
import { FirestoreOfferData } from '@echo/firestore'

export function offerLink(offer: FirestoreOfferData): string {
  return `${collectionOffersLink(offer.discordGuild.discordId)}/${offer.id}`
}
