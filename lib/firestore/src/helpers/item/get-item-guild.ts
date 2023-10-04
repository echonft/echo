import { getNftCollectionDiscordGuildsByNftCollectionId } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guilds-by-nft-collection-id'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { andThen, head, path, pipe, prop } from 'ramda'

export function getItemGuild(
  item: FirestoreOfferItem | FirestoreListingItem
): Promise<FirestoreNftCollectionDiscordGuild> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    path(['nft', 'collection', 'id']),
    getNftCollectionDiscordGuildsByNftCollectionId,
    andThen(pipe(head<FirestoreNftCollectionDiscordGuild, FirestoreNftCollectionDiscordGuild>, prop('guild')))
  )(item)
}
