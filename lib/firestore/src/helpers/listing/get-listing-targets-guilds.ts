import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { forEach, isNil, map, path } from 'ramda'

export function getListingTargetsGuilds(
  listing: Partial<FirestoreListing>
): NonEmptyArray<FirestoreNftCollectionDiscordGuild> {
  if (isNil(listing.targets)) {
    throw Error('no targets in the listing')
  }
  const { targets } = listing
  forEach((target: FirestoreListingTarget) => {
    if (propIsNil('collection', target) || pathIsNil(['collection', 'discordGuild'], target)) {
      throw Error('not every targets have a collection with a discord guild')
    }
  }, targets)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return map(path(['collection', 'discordGuild']), targets)
}
