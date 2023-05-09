import { RequestForOffer } from '../../../../types/request-for-offer'
import { RequestForOfferState } from '../../../../types/request-for-offer-state'
import { mockContract } from '../contract/mock-contract'
import { mockDiscordGuild } from '../discord-guild/mock-discord-guild'
import { mockOffer } from '../offer/mock-offer'
import { mockSwap } from '../swap/mock-swap'
import { mockUser } from '../user/mock-user'
import { unix } from 'dayjs'

export const mockRequestForOffer: RequestForOffer = {
  id: 'jUzMtPGKM62mMhEcmbN4',
  state: RequestForOfferState.CREATED,
  sender: mockUser,
  items: [
    {
      contract: mockContract,
      tokenId: BigInt('1'),
      balance: undefined
    },
    {
      contract: mockContract,
      tokenId: BigInt('10'),
      balance: 1
    }
  ],
  discordGuild: mockDiscordGuild,
  target: [mockContract],
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
  offers: [mockOffer],
  swaps: [mockSwap],
  expiresAt: unix(1676984897),
  postedAt: undefined,
  createdAt: unix(1676984897)
}
