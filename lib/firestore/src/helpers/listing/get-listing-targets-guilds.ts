import { Listing } from '../../types/model/listing'
import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { NonEmptyArray } from '@echo/utils'
import { map, path, pipe, prop } from 'ramda'

export function getListingTargetsGuilds(listing: Listing): NonEmptyArray<NftCollectionDiscordGuild> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('targets'), map(path(['collection', 'discordGuild'])))(listing)
}
