import { getItemGuilds } from '@echo/firestore/helpers/item/get-item-guilds'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { type Listing } from '@echo/model/types/listing'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, flatten, map, pipe, prop, uniq } from 'ramda'

export function getListingItemsGuilds(listing: Listing): Promise<CollectionDiscordGuild[]> {
  return pipe(prop('items'), map(getItemGuilds), promiseAll, andThen(pipe(flatten, uniq)))(listing)
}
