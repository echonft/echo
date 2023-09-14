import { listingChangeHandler } from '@echo/bot/handlers/listing-change-handler'
import { listenToListings as firebaseListenToListings } from '@echo/firestore/listeners/listen-to-listings'
import { Client } from 'discord.js'

export function listenToListings(client: Client) {
  firebaseListenToListings((listing, changes) => listingChangeHandler(client, listing, changes))
}
