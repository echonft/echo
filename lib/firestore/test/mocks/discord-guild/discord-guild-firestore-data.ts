import { FirestoreDiscordGuildData } from '../../../src/types/model/data/discord-guild/firestore-discord-guild-data'
import { contractFirestoreData } from '../contract/contract-firestore-data'

export const discordGuildFirestoreData: { [key: string]: FirestoreDiscordGuildData } = {
  Y8GBFtPZKElp44z0k10D: {
    refPath: 'guilds/Y8GBFtPZKElp44z0k10D',
    id: 'Y8GBFtPZKElp44z0k10D',
    discordId: '1002691062374088794',
    channelId: '1032728052209295450',
    name: 'Echo',
    contracts: [contractFirestoreData['37dBlwJYahEAKeL0rNP8']!]
  },
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
