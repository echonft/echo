import { Listing, ListingTarget, NftCollectionDiscordGuild } from '@echo/firestore-types'
import pathIsNil from '@echo/utils/path-is-nil'
import propIsNil from '@echo/utils/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types'
import { forEach, isNil, map, path } from 'ramda'

export function getListingTargetsGuilds(listing: Partial<Listing>): NonEmptyArray<NftCollectionDiscordGuild> {
  if (isNil(listing.targets)) {
    throw Error('no targets in the listing')
  }
  const { targets } = listing
  forEach((target: ListingTarget) => {
    if (propIsNil('collection', target) || pathIsNil(['collection', 'discordGuild'], target)) {
      throw Error('not every targets have a collection with a discord guild')
    }
  }, targets)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return map(path(['collection', 'discordGuild']), targets)
}
