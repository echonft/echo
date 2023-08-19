import { getCollectionGuild } from './get-collection-guild'
import { DiscordGuild, Listing } from '@echo/firestore'

export const getListingGuild = (listing: Listing): DiscordGuild => getCollectionGuild(listing.items[0].collection)
