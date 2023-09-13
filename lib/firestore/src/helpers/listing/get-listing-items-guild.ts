import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { head, path, pipe, prop } from 'ramda'

export function getListingItemsGuild(listing: Partial<FirestoreListing>): FirestoreNftCollectionDiscordGuild {
  if (propIsNil('items', listing)) {
    throw Error('no items in the listing')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('items'), head, path(['nft', 'collection', 'discordGuild']))(listing)
}
