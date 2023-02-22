import { contracts } from '../contract/contract'
import { discordGuilds } from '../discord-guild/discord-guild'
import { offers } from '../offer/offer'
import { swaps } from '../swap/swap'
import { users } from '../user/user'
import { RequestForOffer, RequestForOfferActivity, RequestForOfferState } from '@echo/model'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'

export const requestForOfferActivities: { [key: string]: RequestForOfferActivity } = {
  ff4BhlyTq6SpziB0HbFk: {
    id: 'ff4BhlyTq6SpziB0HbFk',
    date: dayjs(1676984897),
    toState: RequestForOfferState.CREATED,
    fromState: undefined
  }
}

export const requestsForOffer: { [key: string]: RequestForOffer } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: RequestForOfferState.CREATED,
    sender: Object.assign({}, users['oE6yUEQBPn7PZ89yMjKn']!, {
      wallets: undefined
    }),
    items: [
      {
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigNumber.from('0x0000000000000000000000000000000000000000000000000000000000000001'),
        balance: undefined
      }
    ],
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    target: [contracts['37dBlwJYahEAKeL0rNP8']!],
    activities: Object.values(requestForOfferActivities),
    offers: [
      Object.assign({}, offers['LyCfl6Eg7JKuD7XJ6IPi']!, {
        activities: undefined
      })
    ],
    swaps: [
      Object.assign({}, swaps['hS6KtAJ03bSolumoHvDJ']!, {
        activities: undefined
      })
    ],
    expiresAt: dayjs(1676984897),
    postedAt: undefined,
    createdAt: dayjs(1676984897)
  }
}
