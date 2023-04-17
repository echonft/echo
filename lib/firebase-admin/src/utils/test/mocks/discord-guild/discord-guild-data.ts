import { contractData } from '../contract/contract-data'
import { FirestoreDiscordGuildData } from '@echo/firestore'

export const discordGuildData: { [key: string]: FirestoreDiscordGuildData } = {
  xA40abnyBq6qQHSYmtHj: {
    refPath: 'guilds/xA40abnyBq6qQHSYmtHj',
    id: 'xA40abnyBq6qQHSYmtHj',
    discordId: '1',
    channelId: '1',
    name: 'Echo Test',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    contracts: [contractData['37dBlwJYahEAKeL0rNP8']!]
  }
}
