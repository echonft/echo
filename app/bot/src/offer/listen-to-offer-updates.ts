import { offerUpdateChangeHandler } from '@echo/bot/offer/offer-update-change-handler'
import { listenToOfferUpdates as firebaseListenToOfferUpdates } from '@echo/firestore/listeners/listen-to-offer-updates'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { Client } from 'discord.js'

export function listenToOfferUpdates(client: Client) {
  firebaseListenToOfferUpdates((offers, changes) => guardAsyncFn(offerUpdateChangeHandler)(client, offers, changes))
}
