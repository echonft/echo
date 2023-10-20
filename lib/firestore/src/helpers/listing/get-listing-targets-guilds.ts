import { getCollectionDiscordGuildsByCollectionId } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection-id'
import { type CollectionDiscordGuildData } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { type Listing } from '@echo/model/types/listing'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, head, map, path, pipe, prop } from 'ramda'

export function getListingTargetsGuilds(listing: Listing): Promise<CollectionDiscordGuildData[]> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    prop('targets'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(path(['collection', 'id'])),
    getCollectionDiscordGuildsByCollectionId,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    andThen(pipe(head, prop('guild'))),
    promiseAll
  )(listing)
}
