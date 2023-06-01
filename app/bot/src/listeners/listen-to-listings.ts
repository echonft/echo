import { listingChangeHandler } from '../handlers/listing-change-handler'
import { listenToRequestForOffers } from '@echo/firebase-admin'
import { Client } from 'discord.js'

export function listenToListings(client: Client) {
  listenToRequestForOffers(async (listing, change) => await listingChangeHandler(client, listing, change))
}
