import { getItemGuild } from '@echo/firestore/helpers/item/get-item-guild'
import { type CollectionDiscordGuildData } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { type Listing } from '@echo/model/types/listing'
import { head, pipe, prop } from 'ramda'

export function getListingItemsGuild(listing: Listing): Promise<CollectionDiscordGuildData> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('items'), head, getItemGuild)(listing)
}
