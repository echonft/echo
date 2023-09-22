import { nftCollectionDiscordGuildMock } from '@echo/firestore-mocks/nft-collection-discord-guild/nft-collection-discord-guild-mock'

export function getNftCollectionDiscordGuildMockById(id: string) {
  return nftCollectionDiscordGuildMock[id]!
}
