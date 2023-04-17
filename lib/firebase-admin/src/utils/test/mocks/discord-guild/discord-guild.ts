import { contracts } from '../contract/contract'
import { DiscordGuild } from '@echo/model'

export const discordGuilds: { [key: string]: DiscordGuild } = {
  xA40abnyBq6qQHSYmtHj: {
    id: 'xA40abnyBq6qQHSYmtHj',
    discordId: '1',
    channelId: '1',
    name: 'Echo Test',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    contracts: [contracts['37dBlwJYahEAKeL0rNP8']!]
  }
}
