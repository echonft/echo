import { getListingItemsGuilds } from '@echo/firestore/helpers/listing/get-listing-items-guilds'
import { getListingTargetsGuilds } from '@echo/firestore/helpers/listing/get-listing-targets-guilds'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Listing } from '@echo/model/types/listing'
import { promiseAllSpread } from '@echo/utils/fp/promise-all-spread'
import { andThen, converge, flatten, pipe, uniq } from 'ramda'

export function getListingGuilds(listing: Listing): Promise<CollectionDiscordGuild[]> {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge(promiseAllSpread, [getListingItemsGuilds, getListingTargetsGuilds]),
    andThen(pipe(flatten, uniq))
  )(listing) as Promise<CollectionDiscordGuild[]>
}
