import { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { getAllNftCollectionDiscordGuildMocks } from '@echo/firestore-mocks/nft-collection-discord-guild/get-all-nft-collection-discord-guild-mocks'
import { filter, propEq } from 'ramda'

export function getNftCollectionDiscordGuildMocksByCollectionId(collectionId: string) {
  const mocks = getAllNftCollectionDiscordGuildMocks()
  return filter(propEq(collectionId, 'collectionId'), mocks) as CollectionDiscordGuild[]
}
