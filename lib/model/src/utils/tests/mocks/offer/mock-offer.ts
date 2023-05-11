import { Offer } from '../../../../types/offer'
import { OfferState } from '../../../../types/offer-state'
import { mockContract } from '../contract/mock-contract'
import { mockDiscordGuild } from '../discord-guild/mock-discord-guild'
import { mockUser } from '../user/mock-user'
import dayjs from 'dayjs'

export const mockOffer: Offer = {
  id: 'LyCfl6Eg7JKuD7XJ6IPi',
  state: OfferState.OPEN,
  discordGuild: mockDiscordGuild,
  threadId: '1231',
  sender: mockUser,
  senderItems: [
    {
      contract: mockContract,
      tokenId: BigInt('0x0000000000000000000000000000000000000000000000000000000000000001'),
      balance: undefined
    }
  ],
  receiver: mockUser,
  receiverItems: [
    {
      contract: mockContract,
      tokenId: BigInt('0x0000000000000000000000000000000000000000000000000000000000000010'),
      balance: 2
    }
  ],
  postedAt: undefined,
  expiresAt: dayjs.unix(1676984897),
  createdAt: dayjs.unix(1676984897),
  activities: [
    {
      date: dayjs.unix(1676984897),
      fromState: undefined,
      toState: OfferState.OPEN
    }
  ]
}
