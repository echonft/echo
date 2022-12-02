import { Routes } from '@echo/discord'
import { Offer } from '@echo/model'

export function linkForOffer(offer: Offer): string {
  return `${Routes.ECHO}/${offer.collection.discordId}/${offer.id}`
}
