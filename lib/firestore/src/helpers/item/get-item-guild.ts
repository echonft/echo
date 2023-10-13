import { getCollectionDiscordGuildsByCollectionId } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection-id'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { OfferItem } from '@echo/model/types/offer-item'
import { andThen, head, path, pipe, prop } from 'ramda'

export function getItemGuild(item: OfferItem | ListingItem): Promise<CollectionDiscordGuild> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    path(['nft', 'collection', 'id']),
    getCollectionDiscordGuildsByCollectionId,
    andThen(pipe(head<CollectionDiscordGuild, CollectionDiscordGuild>, prop('guild')))
  )(item)
}
