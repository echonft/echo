import { listingChangeHandler } from '../handlers/listing-change-handler'
import { listenToRequestForOffers } from '@echo/firestore'
import { Client } from 'discord.js'

export function listenToListings(client: Client) {
  listenToRequestForOffers(async (listing, change) => await listingChangeHandler(client, listing, change))
}
