import { collectionOffersLink } from './collection-offers-link'
import { Offer } from '@echo/firestore'

export function offerLink(offer: Offer): string {
  return `${collectionOffersLink(offer.senderItems[0]!.collection.discordGuild.discordId)}/${offer.id}`
}
