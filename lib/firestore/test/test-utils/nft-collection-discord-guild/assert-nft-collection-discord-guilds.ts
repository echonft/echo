import { getAllNftCollectionDiscordGuilds } from '@echo/firestore/crud/nft-collection-discord-guild/get-all-nft-collection-discord-guilds'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { getAllNftCollectionDiscordGuildMocks } from '@echo/firestore-mocks/nft-collection-discord-guild/get-all-nft-collection-discord-guild-mocks'
import { getNftCollectionDiscordGuildMockById } from '@echo/firestore-mocks/nft-collection-discord-guild/get-nft-collection-discord-guild-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertNftCollectionDiscordGuilds() {
  const nftCollectionDiscordGuildMocks = getAllNftCollectionDiscordGuildMocks()
  const nftCollectionDiscordGuilds = await getAllNftCollectionDiscordGuilds()
  expect(nftCollectionDiscordGuilds.length).toEqual(nftCollectionDiscordGuildMocks.length)
  forEach((nftCollectionDiscordGuild: CollectionDiscordGuild) => {
    expect(nftCollectionDiscordGuild).toStrictEqual(getNftCollectionDiscordGuildMockById(nftCollectionDiscordGuild.id))
  }, nftCollectionDiscordGuilds)
}
