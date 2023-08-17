import { SwapDocumentData } from '../../src/types/model/swap-document-data'
import { offerDocumentDataMock } from './offer-document-data-mock'

export const swapDocumentDataMock: { [key: string]: SwapDocumentData } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    activities: [
      {
        date: 1676984897,
        fromState: undefined,
        toState: 'PENDING_APPROVALS'
      }
    ],
    createdAt: 1676984897,
    expiresAt: 1676984897,
    offer: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    state: 'PENDING_APPROVALS'
  }
}
