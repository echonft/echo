import { contracts } from '../contract/contract'
import { discordGuilds } from '../discord-guild/discord-guild'
import { offers } from '../offer/offer'
import { swaps } from '../swap/swap'
import { users } from '../user/user'
import { RequestForOffer, RequestForOfferState } from '@echo/model'
import { unix } from 'dayjs'

export const requestsForOffer: { [key: string]: RequestForOffer } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: RequestForOfferState.CREATED,
    sender: users['oE6yUEQBPn7PZ89yMjKn']!,
    items: [
      {
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigInt('1'),
        balance: undefined
      },
      {
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigInt('10'),
        balance: 1
      }
    ],
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    target: [contracts['37dBlwJYahEAKeL0rNP8']!],
    activities: [
      {
        date: unix(1676984897),
        toState: RequestForOfferState.CREATED,
        fromState: undefined
      },
      {
        date: unix(1676900000),
        toState: RequestForOfferState.EXPIRED,
        fromState: RequestForOfferState.CREATED
      }
    ],
    offers: [offers['LyCfl6Eg7JKuD7XJ6IPi']!],
    swaps: [swaps['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: unix(1676984897),
    postedAt: undefined,
    createdAt: unix(1676984897)
  }
}
