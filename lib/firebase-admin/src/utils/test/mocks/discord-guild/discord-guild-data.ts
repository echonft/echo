import { contractData } from '../contract/contract-data'
import { FirestoreContractData, FirestoreDiscordGuildData } from '@echo/firestore'
import { complement, isNil } from 'ramda'

export const discordGuildData: { [key: string]: FirestoreDiscordGuildData } = {
  xA40abnyBq6qQHSYmtHj: {
    id: 'xA40abnyBq6qQHSYmtHj',
    discordId: '1',
    channelId: '1',
    name: 'Echo',
    contracts: [contractData['37dBlwJYahEAKeL0rNP8']].filter<FirestoreContractData>(complement(isNil))
  }
}
