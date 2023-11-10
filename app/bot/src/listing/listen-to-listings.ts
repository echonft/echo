import { guardAsyncFn } from '@echo/bot/errors/guard-async-fn'
import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { listenToListings as firebaseListenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { Client } from 'discord.js'

export function listenToListings(client: Client) {
  firebaseListenToListings((listing, changes) => guardAsyncFn(listingChangeHandler, void 0)(client, listing, changes))
}
