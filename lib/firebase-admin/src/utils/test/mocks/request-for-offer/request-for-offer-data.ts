import { contractData } from '../contract/contract-data'
import { discordGuildData } from '../discord-guild/discord-guild-data'
import { offerData } from '../offer/offer-data'
import { swapData } from '../swap/swap-data'
import { userData } from '../user/user-data'
import { FirestoreRequestForOfferActivityData, FirestoreRequestForOfferData } from '@echo/firestore'

export const requestForOfferActivityData: { [key: string]: FirestoreRequestForOfferActivityData } = {
  ff4BhlyTq6SpziB0HbFk: {
    id: 'ff4BhlyTq6SpziB0HbFk',
    date: 1676984897,
    toState: 'CREATED'
  }
}

export const requestForOfferData: { [key: string]: FirestoreRequestForOfferData } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: 'CREATED',
    sender: Object.assign({}, userData['oE6yUEQBPn7PZ89yMjKn']!, {
      wallets: {
        path: 'users/oE6yUEQBPn7PZ89yMjKn/wallets',
        data: undefined
      }
    }),
    items: [
      {
        contract: contractData['37dBlwJYahEAKeL0rNP8']!,
        tokenId: '0x0000000000000000000000000000000000000000000000000000000000000001',
        balance: undefined
      }
    ],
    discordGuild: discordGuildData['xA40abnyBq6qQHSYmtHj']!,
    target: [contractData['37dBlwJYahEAKeL0rNP8']!],
    activities: {
      path: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4/activities',
      data: Object.values(requestForOfferActivityData)
    },
    offers: [
      Object.assign({}, offerData['LyCfl6Eg7JKuD7XJ6IPi']!, {
        activities: {
          path: 'offers/LyCfl6Eg7JKuD7XJ6IPi/activities',
          data: undefined
        }
      })
    ],
    swaps: [
      Object.assign({}, swapData['hS6KtAJ03bSolumoHvDJ']!, {
        activities: {
          path: 'swaps/hS6KtAJ03bSolumoHvDJ/activities',
          data: undefined
        }
      })
    ],
    expiresAt: 1676984897,
    postedAt: undefined,
    createdAt: 1676984897
  }
}
