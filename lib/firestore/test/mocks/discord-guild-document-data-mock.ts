import { DiscordGuildDocumentData } from '../../src/types/model/document-data/discord-guild-document-data'
import { nftCollectionReferenceMock } from './nft-collection-reference-mock'

export const discordGuildDocumentDataMock: { [key: string]: DiscordGuildDocumentData } = {
  ncUnbpFfVCofV9bD7ctn: {
    discordId: '100',
    channelId: '100',
    name: 'pxMythics',
    collections: [nftCollectionReferenceMock['37dBlwJYahEAKeL0rNP8']!]
  },
  xA40abnyBq6qQHSYmtHj: {
    discordId: '1',
    channelId: '1',
    name: 'Spiral Frequencies',
    collections: [nftCollectionReferenceMock['1aomCtnoesD7WVll6Yi1']!]
  }
}
