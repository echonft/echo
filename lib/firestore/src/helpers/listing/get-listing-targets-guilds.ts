import { getCollectionDiscordGuildsByCollectionId } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection-id'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { type Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, flatten, map, path, pipe, prop, uniq } from 'ramda'

export function getListingTargetsGuilds(listing: Listing): Promise<CollectionDiscordGuild[]> {
  return pipe<
    [Listing],
    ListingTarget[],
    Promise<CollectionDiscordGuild[]>[],
    Promise<CollectionDiscordGuild[][]>,
    Promise<CollectionDiscordGuild[]>
  >(
    prop('targets'),
    map(pipe(path(['collection', 'id']) as (obj: ListingTarget) => string, getCollectionDiscordGuildsByCollectionId)),
    promiseAll,
    andThen(pipe(flatten, uniq))
  )(listing)
}
