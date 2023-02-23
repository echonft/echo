import { contracts } from '../contract/contract'
import { discordGuilds } from '../discord-guild/discord-guild'
import { users } from '../user/user'
import { Offer, OfferState } from '@echo/model'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'

export const offers: { [key: string]: Offer } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    state: OfferState.OPEN,
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    threadId: '1231',
    sender: users['oE6yUEQBPn7PZ89yMjKn']!,
    senderItems: [
      {
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigNumber.from('0x0000000000000000000000000000000000000000000000000000000000000001'),
        balance: undefined
      }
    ],
    receiver: users['oE6yUEQBPn7PZ89yMjKn']!,
    receiverItems: [
      {
        contract: contracts['37dBlwJYahEAKeL0rNP8']!,
        tokenId: BigNumber.from('0x0000000000000000000000000000000000000000000000000000000000000010'),
        balance: 2
      }
    ],
    postedAt: undefined,
    expiresAt: dayjs(1676984897),
    createdAt: dayjs(1676984897),
    activities: [
      {
        date: dayjs(1676984897),
        fromState: undefined,
        toState: OfferState.OPEN
      }
    ]
  }
}
