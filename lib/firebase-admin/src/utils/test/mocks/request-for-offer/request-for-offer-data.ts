import { contractData } from '../contract/contract-data'
import { discordGuildData } from '../discord-guild/discord-guild-data'
import { offerData } from '../offer/offer-data'
import { swapData } from '../swap/swap-data'
import { userData } from '../user/user-data'
import { FirestoreRequestForOfferData } from '@echo/firestore'

export const requestForOfferData: { [key: string]: FirestoreRequestForOfferData } = {
  jUzMtPGKM62mMhEcmbN4: {
    refPath: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4',
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: 'CREATED',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sender: userData['oE6yUEQBPn7PZ89yMjKn']!,
    items: [
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contract: contractData['37dBlwJYahEAKeL0rNP8']!,
        tokenId: '0x0000000000000000000000000000000000000000000000000000000000000001',
        balance: undefined
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    discordGuild: discordGuildData['xA40abnyBq6qQHSYmtHj']!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    target: [contractData['37dBlwJYahEAKeL0rNP8']!],
    activities: [
      {
        date: 1676984897,
        toState: 'CREATED'
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    offers: [offerData['LyCfl6Eg7JKuD7XJ6IPi']!],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    swaps: [swapData['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: 1676984897,
    postedAt: undefined,
    createdAt: 1676984897
  }
}
