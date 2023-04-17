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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sender: users['oE6yUEQBPn7PZ89yMjKn']!,
    items: [
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigInt('0x0000000000000000000000000000000000000000000000000000000000000001'),
        balance: undefined
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    target: [contracts['37dBlwJYahEAKeL0rNP8']!],
    activities: [
      {
        date: dayjs(1676984897),
        toState: RequestForOfferState.CREATED,
        fromState: undefined
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    offers: [offers['LyCfl6Eg7JKuD7XJ6IPi']!],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    swaps: [swaps['hS6KtAJ03bSolumoHvDJ']!],
    expiresAt: dayjs(1676984897),
    postedAt: undefined,
    createdAt: dayjs(1676984897)
  }
}
