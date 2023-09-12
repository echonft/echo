import { Listing, NftCollectionDiscordGuild } from '@echo/firestore-types'
import propIsNil from '@echo/utils/prop-is-nil'
import { head, path, pipe, prop } from 'ramda'

export function getListingItemsGuild(listing: Partial<Listing>): NftCollectionDiscordGuild {
  if (propIsNil('items', listing)) {
    throw Error('no items in the listing')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('items'), head, path(['nft', 'collection', 'discordGuild']))(listing)
}
