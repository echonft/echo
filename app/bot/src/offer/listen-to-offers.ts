import { offerChangeHandler } from '@echo/bot/offer/offer-change-handler'
import { listenToOffers as firebaseListenToOffers } from '@echo/firestore/listeners/listen-to-offers'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { Client } from 'discord.js'

export function listenToOffers(client: Client) {
  firebaseListenToOffers((offers, changes) => guardAsyncFn(offerChangeHandler)(client, offers, changes))
}
