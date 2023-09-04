import { Listing, NftCollectionDiscordGuild } from '@echo/firestore-types'
import { head, path, pipe, prop } from 'ramda'

export function getListingItemsGuild(listing: Listing): NftCollectionDiscordGuild {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('items'), head, path(['nft', 'collection', 'discordGuild']))(listing)
}
