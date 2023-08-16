import { RequestForOfferDocumentData } from '../../src/types/model/document-data/request-for-offer-document-data'
import { discordGuildReferenceMock } from './discord-guild-reference-mock'
import { nftCollectionDocumentDataMock } from './nft-collection-document-data-mock'
import { nftCollectionReferenceMock } from './nft-collection-reference-mock'
import { nftDocumentDataMock } from './nft-document-data-mock'
import { nftReferenceMock } from './nft-reference-mock'
import { offerReferenceMock } from './offer-reference-mock'
import { swapReferenceMock } from './swap-reference-mock'
import { userDocumentDataMock } from './user-document-data-mock'
import { userReferenceMock } from './user-reference-mock'

export const requestForOfferDocumentDataMock: { [key: string]: RequestForOfferDocumentData } = {
  jUzMtPGKM62mMhEcmbN4: {
    activities: [
      {
        date: 1676984897,
        toState: 'CREATED'
      },
      {
        date: 1676900000,
        toState: 'EXPIRED',
        fromState: 'CREATED'
      }
    ],
    createdAt: 1676984897,
    creator: userReferenceMock['oE6yUEQBPn7PZ89yMjKn']!,
    creatorDiscordAvatar: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.discordAvatar,
    creatorDiscordId: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.discordId,
    creatorDiscordUsername: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.discordUsername,
    discordGuild: discordGuildReferenceMock['xA40abnyBq6qQHSYmtHj']!,
    expiresAt: 1676984897,
    items: [nftReferenceMock['QFjMRNChUAHNswkRADXh']!, nftReferenceMock['8hHFadIrrooORfTOLkBg']!],
    itemsDetails: [
      {
        amount: 1,
        collectionName: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.collectionName,
        name: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.name,
        openSeaUrl: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.openSeaUrl,
        ownerWallet: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.ownerWallet,
        pictureUrl: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.pictureUrl,
        thumbnailUrl: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.thumbnailUrl,
        tokenId: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.tokenId
      },
      {
        amount: 1,
        blurUrl: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.blurUrl,
        collectionName: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.collectionName,
        name: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.name,
        openSeaUrl: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.openSeaUrl,
        ownerWallet: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.ownerWallet,
        pictureUrl: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.pictureUrl,
        thumbnailUrl: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.thumbnailUrl,
        tokenId: nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!.tokenId
      }
    ],
    offers: [offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!],
    state: 'EXPIRED',
    swaps: [swapReferenceMock['hS6KtAJ03bSolumoHvDJ']!],
    target: [
      {
        collection: nftCollectionReferenceMock['Rc8pLQXxgyQGIRL0fr13']!,
        collectionBannerUrl: nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!.bannerUrl,
        collectionProfilePictureUrl: nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!.profilePictureUrl,
        count: 3
      }
    ]
  }
}
