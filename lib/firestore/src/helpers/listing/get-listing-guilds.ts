import { getListingItemsGuilds } from '@echo/firestore/helpers/listing/get-listing-items-guilds'
import { getListingTargetsGuilds } from '@echo/firestore/helpers/listing/get-listing-targets-guilds'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Listing } from '@echo/model/types/listing'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, flatten, juxt, pipe, uniq } from 'ramda'

// FIXME might be needed if we support collection guilds
// noinspection JSUnusedGlobalSymbols
export function getListingGuilds(listing: Listing): Promise<CollectionDiscordGuild[]> {
  return pipe(juxt([getListingItemsGuilds, getListingTargetsGuilds]), promiseAll, andThen(pipe(flatten, uniq)))(listing)
}
