import { offerChangeHandler } from '@echo/bot/handlers/offer-change-handler'
import { listenToOffers as firebaseListenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { Client } from 'discord.js'

export function listenToOffers(client: Client) {
  firebaseListenToOffers((offers, changes) => offerChangeHandler(client, offers, changes))
}
