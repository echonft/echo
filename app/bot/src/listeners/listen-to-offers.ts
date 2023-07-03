import { offerChangeHandler } from '../handlers/offer-change-handler'
import { listenToOffers as firebaseListenToOffers } from '@echo/firebase-admin'
import { Client } from 'discord.js'

export function listenToOffers(client: Client) {
  firebaseListenToOffers(async (offer, change) => await offerChangeHandler(client, offer, change))
}
