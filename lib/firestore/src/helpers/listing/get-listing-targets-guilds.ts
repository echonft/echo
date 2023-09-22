import { getNftCollectionDiscordGuildsByNftCollectionId } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guilds-by-nft-collection-id'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { NftCollectionDiscordGuildData } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection-discord-guild'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, head, map, path, pipe, prop } from 'ramda'

export function getListingTargetsGuilds(listing: Partial<FirestoreListing>): Promise<NftCollectionDiscordGuildData[]> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    prop('targets'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(path(['collection', 'id'])),
    getNftCollectionDiscordGuildsByNftCollectionId,
    andThen(pipe(head, prop('guild'))),
    promiseAll
  )(listing)
}
