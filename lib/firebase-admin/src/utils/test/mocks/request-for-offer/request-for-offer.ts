import { contracts } from '../contract/contract'
import { discordGuilds } from '../discord-guild/discord-guild'
import { offers } from '../offer/offer'
import { swaps } from '../swap/swap'
import { users } from '../user/user'
import { RequestForOffer, RequestForOfferState } from '@echo/model'
import dayjs from 'dayjs'

export const requestsForOffer: { [key: string]: RequestForOffer } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: RequestForOfferState.CREATED,
    sender: users['oE6yUEQBPn7PZ89yMjKn']!,
    items: [
      {
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigInt('0x0000000000000000000000000000000000000000000000000000000000000001'),
        balance: undefined
      }
    ],
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    target: [contracts['37dBlwJYahEAKeL0rNP8']!],
    activities: [
      {
        date: dayjs(1676984897),
        toState: RequestForOfferState.CREATED,
        fromState: undefined
      }
    ],
    offers: [offers['LyCfl6Eg7JKuD7XJ6IPi']!],
    swaps: [swaps['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: dayjs(1676984897),
    postedAt: undefined,
    createdAt: dayjs(1676984897)
  }
}
