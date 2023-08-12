import { contractFirestoreData } from './contract-firestore-data'
import { discordGuildFirestoreData } from './discord-guild-firestore-data'
import { nftFirestoreData } from './nft-firestore-data'
import { offerFirestoreData } from './offer-firestore-data'
import { swapFirestoreData } from './swap-firestore-data'
import { userFirestoreData } from './user-firestore-data'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { RequestForOfferState } from '../../../ui-model'

export const requestForOfferFirestoreData: { [key: string]: FirestoreRequestForOfferData } = {
  jUzMtPGKM62mMhEcmbN4: {
    refPath: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4',
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: 'EXPIRED',
    sender: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    items: [nftFirestoreData['QFjMRNChUAHNswkRADXh']!, nftFirestoreData['8hHFadIrrooORfTOLkBg']!],
    discordGuild: discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!,
    target: [contractFirestoreData['37dBlwJYahEAKeL0rNP8']!],
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
    offers: [offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!],
    swaps: [swapFirestoreData['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: 1676984897,
    createdAt: 1676984897
  }
}
