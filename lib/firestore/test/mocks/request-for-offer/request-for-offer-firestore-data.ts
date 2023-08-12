import { FirestoreRequestForOfferData } from '../../../src/types/model/data/request-for-offer/firestore-request-for-offer-data'
import { contractFirestoreData } from '../contract/contract-firestore-data'
import { discordGuildFirestoreData } from '../discord-guild/discord-guild-firestore-data'
import { nftFirestoreData } from '../nft/nft-firestore-data'
import { offerFirestoreData } from '../offer/offer-firestore-data'
import { swapFirestoreData } from '../swap/swap-firestore-data'
import { userFirestoreData } from '../user/user-firestore-data'

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
        toState: 'EXPIRED',
        fromState: 'CREATED'
      }
    ],
    offers: [offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!],
    swaps: [swapFirestoreData['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: 1676984897,
    createdAt: 1676984897
  }
}
