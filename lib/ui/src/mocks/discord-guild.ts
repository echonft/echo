import { DiscordGuild } from '../types/discord-guild'
import { contracts } from './contract'

export const discordGuilds: { [key: string]: DiscordGuild } = {
  ncUnbpFfVCofV9bD7ctn: {
    id: 'ncUnbpFfVCofV9bD7ctn',
    discordId: '100',
    channelId: '100',
    name: 'pxMythics',
    contracts: [contracts['37dBlwJYahEAKeL0rNP8']!]
  },
  xA40abnyBq6qQHSYmtHj: {
    id: 'xA40abnyBq6qQHSYmtHj',
    discordId: '1',
    channelId: '1',
    name: 'Spiral Frequencies',
    contracts: [contracts['hK2XrmnMpCVneRH7Mbo6']!]
  }
}
