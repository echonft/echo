import { getCollectionDiscordGuildsByCollectionId } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection-id'
import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Item } from '@echo/model/types/item'
import { path, pipe } from 'ramda'

export function getItemGuilds(item: Item): Promise<CollectionDiscordGuild[]> {
  return pipe<[Item], string, Promise<CollectionDiscordGuild[]>>(
    path(['nft', 'collection', 'id']) as (obj: Item) => string,
    getCollectionDiscordGuildsByCollectionId
  )(item)
}
