import { ListingDocumentData } from '../../src/types/model/listing-document-data'
import { nftCollectionDocumentDataMock } from './nft-collection-document-data-mock'
import { nftDocumentDataMock } from './nft-document-data-mock'
import { offerDocumentDataMock } from './offer-document-data-mock'
import { swapDocumentDataMock } from './swap-document-data-mock'

export const listingDocumentDataMock: { [key: string]: ListingDocumentData } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    activities: [
      {
        date: 1676984897,
        fromState: undefined,
        toState: 'CREATED'
      },
      {
        date: 1676900000,
        toState: 'EXPIRED',
        fromState: 'CREATED'
      }
    ],
    createdAt: 1676984897,
    creator: {
      id: 'user1',
      discordId: '462798252543049728',
      discordUsername: 'johnnycage#0890',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      discordBanner: undefined,
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        addressLowercase: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
        chainId: 1
      }
    },
    expiresAt: 1676984897,
    items: [
      { amount: 1, ...nftDocumentDataMock['QFjMRNChUAHNswkRADXh']! },
      { amount: 1, ...nftDocumentDataMock['8hHFadIrrooORfTOLkBg']! }
    ],
    offers: [offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']!],
    state: 'EXPIRED',
    swaps: [swapDocumentDataMock['hS6KtAJ03bSolumoHvDJ']!],
    targets: [
      {
        collection: nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!,
        amount: 3
      }
    ],
    postedAt: undefined
  }
}
