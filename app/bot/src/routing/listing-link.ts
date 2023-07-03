import { collectionListingsLink } from './collection-listings-link'
import { FirestoreRequestForOfferData } from '@echo/firestore'

export function listingLink(listing: FirestoreRequestForOfferData): string {
  return `${collectionListingsLink(listing.discordGuild.discordId)}/${listing.id}`
}
