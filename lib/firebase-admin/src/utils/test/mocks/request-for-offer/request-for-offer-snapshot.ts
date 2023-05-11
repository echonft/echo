import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { contractReferences } from '../contract/contract-reference'
import { discordGuildReferences } from '../discord-guild/discord-guild-reference'
import { offerReferences } from '../offer/offer-reference'
import { swapReferences } from '../swap/swap-reference'
import { userReferences } from '../user/user-reference'
import { FirestoreRequestForOffer } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'

export const requestForOfferSnapshots: { [key: string]: FirestoreSnapshot<FirestoreRequestForOffer> } = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: {
      path: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4'
    },
    id: 'jUzMtPGKM62mMhEcmbN4',
    exists: true,
    data: () => ({
      id: 'jUzMtPGKM62mMhEcmbN4',
      state: RequestForOfferState.EXPIRED,
      sender: userReferences['oE6yUEQBPn7PZ89yMjKn']!,
      items: [
        {
          contract: contractReferences['37dBlwJYahEAKeL0rNP8']!,
          tokenId: '1',
          balance: undefined
        },
        {
          contract: contractReferences['37dBlwJYahEAKeL0rNP8']!,
          tokenId: '10',
          balance: 1
        }
      ],
      discordGuild: discordGuildReferences['xA40abnyBq6qQHSYmtHj']!,
      target: [contractReferences['37dBlwJYahEAKeL0rNP8']!],
      activities: [
        {
          date: 1676984897,
          toState: RequestForOfferState.CREATED
        },
        {
          date: 1676900000,
          toState: RequestForOfferState.EXPIRED,
          fromState: RequestForOfferState.CREATED
        }
      ],
      offers: [offerReferences['LyCfl6Eg7JKuD7XJ6IPi']!],
      swaps: [swapReferences['hS6KtAJ03bSolumoHvDJ']!],
      expiresAt: 1676984897,
      postedAt: undefined,
      createdAt: 1676984897
    })
  } as unknown as FirestoreSnapshot<FirestoreRequestForOffer>
}
