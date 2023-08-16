import { Swap } from '../../src/types/model/converted/swap'
import { offerMock } from './offer-mock'
import dayjs from 'dayjs'

export const swapMock: { [key: string]: Swap } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    activities: [
      {
        date: dayjs.unix(1676984897),
        fromState: undefined,
        toState: 'PENDING_APPROVALS'
      }
    ],
    createdAt: dayjs.unix(1676984897),
    expiresAt: dayjs.unix(1676984897),
    offerId: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.id,
    receiverDiscordAvatar: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverDiscordAvatar,
    receiverDiscordId: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverDiscordId,
    receiverDiscordUsername: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverDiscordUsername,
    receiverItemsDetails: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItemsDetails,
    senderDiscordAvatar: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderDiscordAvatar,
    senderDiscordId: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderDiscordId,
    senderDiscordUsername: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderDiscordUsername,
    senderItemsDetails: offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderItemsDetails,
    state: 'PENDING_APPROVALS'
  }
}
