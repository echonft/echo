import { getEchoLink } from '@echo/discord'
import { Offer } from '@echo/model'

export function linkForOffer(offer: Offer): string {
  return `${getEchoLink()}/${offer.collection.discordId}/${offer.id}`
}
