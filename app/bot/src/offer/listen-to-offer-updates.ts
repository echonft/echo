import { guardAsyncFn } from '@echo/bot/errors/guard'
import { offerUpdateChangeHandler } from '@echo/bot/offer/offer-update-change-handler'
import { listenToOfferUpdates as firebaseListenToOfferUpdates } from '@echo/firestore/listeners/listen-to-offer-updates'
import { Client } from 'discord.js'

export function listenToOfferUpdates(client: Client) {
  firebaseListenToOfferUpdates((offers, changes) =>
    guardAsyncFn(offerUpdateChangeHandler, void 0)(client, offers, changes)
  )
}
