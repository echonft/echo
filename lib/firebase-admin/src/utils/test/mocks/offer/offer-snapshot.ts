import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { contractReferences } from '../contract/contract-reference'
import { discordGuildReferences } from '../discord-guild/discord-guild-reference'
import { userReferences } from '../user/user-reference'
import { FirestoreOffer } from '@echo/firestore'

export const offerSnapshots: { [key: string]: FirestoreSnapshot<FirestoreOffer> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    ref: {
      path: 'offers/LyCfl6Eg7JKuD7XJ6IPi'
    },
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    exists: true,
    data: () => ({
      state: 'OPEN',
      discordGuild: discordGuildReferences['xA40abnyBq6qQHSYmtHj']!,
      threadId: '1231',
      sender: userReferences['oE6yUEQBPn7PZ89yMjKn']!,
      senderItems: [
        {
          contract: contractReferences['37dBlwJYahEAKeL0rNP8']!,
          tokenId: '0x0000000000000000000000000000000000000000000000000000000000000001',
          balance: undefined
        }
      ],
      receiver: userReferences['oE6yUEQBPn7PZ89yMjKn']!,
      receiverItems: [
        {
          contract: contractReferences['37dBlwJYahEAKeL0rNP8']!,
          tokenId: '0x0000000000000000000000000000000000000000000000000000000000000010',
          balance: 2
        }
      ],
      postedAt: undefined,
      expiresAt: 1676984897,
      createdAt: 1676984897,
      activities: [{ date: 1676984897, toState: 'OPEN' }]
    })
  } as unknown as FirestoreSnapshot<FirestoreOffer>
}
