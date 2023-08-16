import { SwapDocumentData } from '../../src/types/model/document-data/swap-document-data'
import { offerDocumentDataMock } from './offer-document-data-mock'
import { offerReferenceMock } from './offer-reference-mock'

export const swapDocumentDataMock: { [key: string]: SwapDocumentData } = {
  hS6KtAJ03bSolumoHvDJ: {
    activities: [
      {
        date: 1676984897,
        toState: 'PENDING_APPROVALS'
      }
    ],
    createdAt: 1676984897,
    expiresAt: 1676984897,
    offer: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    receiverDiscordAvatar: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverDiscordAvatar,
    receiverDiscordId: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverDiscordId,
    receiverDiscordUsername: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverDiscordUsername,
    receiverItemsDetails: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItemsDetails,
    senderDiscordAvatar: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderDiscordAvatar,
    senderDiscordId: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderDiscordId,
    senderDiscordUsername: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderDiscordUsername,
    senderItemsDetails: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!.senderItemsDetails,
    state: 'PENDING_APPROVALS'
  }
}
