import { contractData } from '../contract/contract-data'
import { discordGuildData } from '../discord-guild/discord-guild-data'
import { offerData } from '../offer/offer-data'
import { swapData } from '../swap/swap-data'
import { userData } from '../user/user-data'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'

export const requestsForOfferData: { [key: string]: FirestoreRequestForOfferData } = {
  jUzMtPGKM62mMhEcmbN4: {
    refPath: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4',
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: 'EXPIRED',
    sender: userData['oE6yUEQBPn7PZ89yMjKn']!,
    items: [
      {
        contract: contractData['37dBlwJYahEAKeL0rNP8']!,
        tokenId: '1',
        balance: undefined
      },
      {
        contract: contractData['37dBlwJYahEAKeL0rNP8']!,
        tokenId: '10',
        balance: 1
      }
    ],
    discordGuild: discordGuildData['xA40abnyBq6qQHSYmtHj']!,
    target: [contractData['37dBlwJYahEAKeL0rNP8']!],
    activities: [
      {
        date: 1676984897,
        toState: 'CREATED'
      },
      {
        date: 1676900000,
        toState: RequestForOfferState.EXPIRED,
        fromState: RequestForOfferState.CREATED
      }
    ],
    offers: [offerData['LyCfl6Eg7JKuD7XJ6IPi']!],
    swaps: [swapData['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: 1676984897,
    postedAt: undefined,
    createdAt: 1676984897
  }
}
