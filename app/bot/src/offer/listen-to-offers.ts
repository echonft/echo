import { guardAsyncFn } from '@echo/bot/errors/guard-async-fn'
import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { listenToOffers as firebaseListenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { Client } from 'discord.js'

export function listenToOffers(client: Client) {
  firebaseListenToOffers((offers, changes) => guardAsyncFn(offerChangeHandler, void 0)(client, offers, changes))
}
