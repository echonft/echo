import { getCollectionDiscordGuildsByCollection } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Item } from '@echo/model/types/item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { path, pipe } from 'ramda'

export function getItemGuilds(item: Item): Promise<CollectionDiscordGuild[]> {
  return pipe<[Item], string, Promise<CollectionDiscordGuild[]>>(
    nonNullableReturn(path(['nft', 'collection', 'slug'])),
    getCollectionDiscordGuildsByCollection
  )(item)
}
