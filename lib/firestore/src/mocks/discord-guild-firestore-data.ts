import { FirestoreDiscordGuildData } from '../types/model/data/discord-guild/firestore-discord-guild-data'
import { contractFirestoreData } from './contract-firestore-data'

export const discordGuildFirestoreData: { [key: string]: FirestoreDiscordGuildData } = {
  ncUnbpFfVCofV9bD7ctn: {
    refPath: 'guilds/ncUnbpFfVCofV9bD7ctn',
    id: 'ncUnbpFfVCofV9bD7ctn',
    discordId: '100',
    channelId: '100',
    name: 'pxMythics',
    contracts: [contractFirestoreData['37dBlwJYahEAKeL0rNP8']!]
  },
  xA40abnyBq6qQHSYmtHj: {
    refPath: 'guilds/xA40abnyBq6qQHSYmtHj',
    id: 'xA40abnyBq6qQHSYmtHj',
    discordId: '1',
    channelId: '1',
    name: 'Spiral Frequencies',
    contracts: [contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!]
  }
}
