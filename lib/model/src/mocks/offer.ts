import { Offer } from '../types/offer'
import { OfferState } from '../types/offer-state'
import { discordGuilds } from './discord-guild'
import { nfts } from './nft'
import { users } from './user'
import dayjs from 'dayjs'

export const offers: { [key: string]: Offer } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    state: OfferState.OPEN,
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    threadId: '1231',
    sender: users['oE6yUEQBPn7PZ89yMjKn']!,
    senderItems: [nfts['QFjMRNChUAHNswkRADXh']!],
    receiver: users['oE6yUEQBPn7PZ89yMjKn']!,
    receiverItems: [nfts['8hHFadIrrooORfTOLkBg']!],
    postedAt: undefined,
    expiresAt: dayjs.unix(1676984897),
    createdAt: dayjs.unix(1676984897),
    activities: [{ date: dayjs.unix(1676984897), fromState: undefined, toState: OfferState.OPEN }]
  }
}
