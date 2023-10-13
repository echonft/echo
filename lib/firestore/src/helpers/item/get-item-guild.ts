import { getNftCollectionDiscordGuildsByNftCollectionId } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guilds-by-nft-collection-id'
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
    getNftCollectionDiscordGuildsByNftCollectionId,
    andThen(pipe(head<CollectionDiscordGuild, CollectionDiscordGuild>, prop('guild')))
  )(item)
}
