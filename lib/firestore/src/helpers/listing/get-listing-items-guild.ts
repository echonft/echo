import { Listing } from '../../types/model/listing'
import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { head, path, pipe, prop } from 'ramda'

export function getListingItemsGuild(listing: Listing): NftCollectionDiscordGuild {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('items'), head, path(['nft', 'collection', 'discordGuild']))(listing)
}
