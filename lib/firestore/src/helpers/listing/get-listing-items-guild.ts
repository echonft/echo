import { getItemGuild } from '@echo/firestore/helpers/item/get-item-guild'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { NftCollectionDiscordGuildData } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { head, pipe, prop } from 'ramda'

export function getListingItemsGuild(listing: FirestoreListing): Promise<NftCollectionDiscordGuildData> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('items'), head, getItemGuild)(listing)
}
