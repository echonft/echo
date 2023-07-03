import { RequestForOffer } from '../types/request-for-offer'
import { RequestForOfferState } from '../types/request-for-offer-state'
import { contracts } from './contract'
import { discordGuilds } from './discord-guild'
import { nfts } from './nft'
import { offers } from './offer'
import { swaps } from './swap'
import { users } from './user'
import dayjs from 'dayjs'

export const requestsForOffer: { [key: string]: RequestForOffer } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: RequestForOfferState.EXPIRED,
    sender: users['oE6yUEQBPn7PZ89yMjKn']!,
    items: [nfts['QFjMRNChUAHNswkRADXh']!, nfts['8hHFadIrrooORfTOLkBg']!],
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    target: [contracts['37dBlwJYahEAKeL0rNP8']!],
    activities: [
      {
        date: dayjs.unix(1676984897),
        fromState: undefined,
        toState: RequestForOfferState.CREATED
      },
      {
        date: dayjs.unix(1676900000),
        toState: RequestForOfferState.EXPIRED,
        fromState: RequestForOfferState.CREATED
      }
    ],
    offers: [offers['LyCfl6Eg7JKuD7XJ6IPi']!],
    swaps: [swaps['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: dayjs.unix(1676984897),
    postedAt: undefined,
    createdAt: dayjs.unix(1676984897)
  }
}
