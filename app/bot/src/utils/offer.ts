import { getApiUrl } from '@echo/api'
import { Offer } from '@echo/model'

export function linkForOffer(offer: Offer): string {
  return `${getApiUrl()}/${offer.collection.discordId}/${offer.id}`
}
