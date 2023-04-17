import { contractData } from '../contract/contract-data'
import { discordGuildData } from '../discord-guild/discord-guild-data'
import { userData } from '../user/user-data'
import { FirestoreOfferData } from '@echo/firestore'

export const offerData: { [key: string]: FirestoreOfferData } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    refPath: 'offers/LyCfl6Eg7JKuD7XJ6IPi',
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    state: 'OPEN',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    discordGuild: discordGuildData['xA40abnyBq6qQHSYmtHj']!,
    threadId: '1231',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sender: userData['oE6yUEQBPn7PZ89yMjKn']!,
    senderItems: [
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contract: contractData['37dBlwJYahEAKeL0rNP8']!,
        tokenId: '0x0000000000000000000000000000000000000000000000000000000000000001',
        balance: undefined
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    receiver: userData['oE6yUEQBPn7PZ89yMjKn']!,
    receiverItems: [
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contract: contractData['37dBlwJYahEAKeL0rNP8']!,
        tokenId: '0x0000000000000000000000000000000000000000000000000000000000000010',
        balance: 2
      }
    ],
    postedAt: undefined,
    expiresAt: 1676984897,
    createdAt: 1676984897,
    activities: [{ date: 1676984897, toState: 'OPEN' }]
  }
}
