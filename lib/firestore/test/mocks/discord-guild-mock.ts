import { DiscordGuild } from '../../src/types/model/converted/discord-guild'
import { nftCollectionMock } from './nft-collection-mock'

export const discordGuildMock: { [key: string]: DiscordGuild } = {
  ncUnbpFfVCofV9bD7ctn: {
    id: 'ncUnbpFfVCofV9bD7ctn',
    discordId: '100',
    channelId: '100',
    name: 'pxMythics',
    collectionsIds: [nftCollectionMock['37dBlwJYahEAKeL0rNP8']!.id]
  },
  xA40abnyBq6qQHSYmtHj: {
    id: 'xA40abnyBq6qQHSYmtHj',
    discordId: '1',
    channelId: '1',
    name: 'Spiral Frequencies',
    collectionsIds: [nftCollectionMock['1aomCtnoesD7WVll6Yi1']!.id]
  }
}
