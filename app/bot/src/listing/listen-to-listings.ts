import { listingChangeHandler } from '@echo/bot/listing/listing-change-handler'
import { listenToListings as firebaseListenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { Client } from 'discord.js'

export function listenToListings(client: Client) {
  firebaseListenToListings((listing, changes) => guardAsyncFn(listingChangeHandler)(client, listing, changes))
}
