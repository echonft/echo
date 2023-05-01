import { contractReferences } from '../contract/contract-reference'
import { discordGuildReferences } from '../discord-guild/discord-guild-reference'
import { offerReferences } from '../offer/offer-reference'
import { swapReferences } from '../swap/swap-reference'
import { userReferences } from '../user/user-reference'
import { firestoreRequestForOfferActivities } from './firestore-request-for-offer-activity'
import { firestoreRequestForOfferItems } from './firestore-request-for-offer-item'
import { FirestoreRequestForOffer } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'

export const firestoreRequestsForOffer: { [key: string]: FirestoreRequestForOffer } = {
  jUzMtPGKM62mMhEcmbN4: {
    state: RequestForOfferState.CREATED,
    sender: userReferences['oE6yUEQBPn7PZ89yMjKn']!,
    items: firestoreRequestForOfferItems,
    discordGuild: discordGuildReferences['xA40abnyBq6qQHSYmtHj']!,
    target: contractReferences['37dBlwJYahEAKeL0rNP8']!,
    activities: firestoreRequestForOfferActivities,
    offers: [offerReferences['LyCfl6Eg7JKuD7XJ6IPi']],
    swaps: [swapReferences['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: 1676984897,
    postedAt: undefined,
    createdAt: 1676984897
  } as unknown as FirestoreRequestForOffer
}
