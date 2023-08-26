import { Listing } from '../../types/model/listing'
import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { getNftCollectionGuild } from '../nft-collection/get-nft-collection-guild'
import { NonEmptyArray } from '@echo/utils'
import { map, pipe, prop } from 'ramda'

export function getListingTargetsGuilds(listing: Listing): NonEmptyArray<NftCollectionDiscordGuild> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('targets'), map(pipe(prop('collection'), getNftCollectionGuild)))(listing)
}
