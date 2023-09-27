import { getAllNftCollectionDiscordGuilds } from '@echo/firestore/crud/nft-collection-discord-guild/get-all-nft-collection-discord-guilds'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import { getAllNftCollectionDiscordGuildMocks } from '@echo/firestore-mocks/nft-collection-discord-guild/get-all-nft-collection-discord-guild-mocks'
import { getNftCollectionDiscordGuildMockById } from '@echo/firestore-mocks/nft-collection-discord-guild/get-nft-collection-discord-guild-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNftCollectionDiscordGuilds() {
  const nftCollectionDiscordGuildMocks = getAllNftCollectionDiscordGuildMocks()
  const nftCollectionDiscordGuilds = await getAllNftCollectionDiscordGuilds()
  expect(nftCollectionDiscordGuilds.length).toEqual(nftCollectionDiscordGuildMocks.length)
  forEach((nftCollectionDiscordGuild: FirestoreNftCollectionDiscordGuild) => {
    expect(nftCollectionDiscordGuild).toStrictEqual(getNftCollectionDiscordGuildMockById(nftCollectionDiscordGuild.id))
  }, nftCollectionDiscordGuilds)
}
