import { SwapDocumentData } from '../../src/types/model/swap-document-data'
import { offerDocumentDataMock } from './offer-document-data-mock'

export const swapDocumentDataMock: { [key: string]: SwapDocumentData } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    createdAt: 1676984897,
    expiresAt: 1676984897,
    postedAt: 1676984897,
    offer: offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    state: 'PENDING_APPROVALS'
  }
}
