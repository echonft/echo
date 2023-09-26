import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { nftCollectionDiscordGuildMock } from '@echo/firestore-mocks/nft-collection-discord-guild/nft-collection-discord-guild-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftCollectionDiscordGuildMocks() {
  return Object.values(nftCollectionDiscordGuildMock) as NonEmptyArray<FirestoreNftCollectionDiscordGuild>
}
