import { OfferDocumentData } from '../../src/types/model/document-data/offer-document-data'
import { discordGuildReferenceMock } from './discord-guild-reference-mock'
import { nftDocumentDataMock } from './nft-document-data-mock'
import { nftReferenceMock } from './nft-reference-mock'
import { userDocumentDataMock } from './user-document-data-mock'
import { userReferenceMock } from './user-reference-mock'

export const offerDocumentDataMock: { [key: string]: OfferDocumentData } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    activities: [{ date: 1676984897, toState: 'OPEN' }],
    createdAt: 1676984897,
    discordGuild: discordGuildReferenceMock['xA40abnyBq6qQHSYmtHj']!,
    expiresAt: 1676984897,
    receiver: userReferenceMock['oE6yUEQBPn7PZ89yMjKn']!,
    receiverDiscordAvatar: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.discordAvatar,
    receiverDiscordId: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.discordId,
    receiverDiscordUsername: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.discordUsername,
    receiverItems: [nftReferenceMock['8hHFadIrrooORfTOLkBg']!],
    receiverItemsDetails: [
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
    sender: userReferenceMock['6rECUMhevHfxABZ1VNOm']!,
    senderDiscordAvatar: userDocumentDataMock['6rECUMhevHfxABZ1VNOm']!.discordAvatar,
    senderDiscordId: userDocumentDataMock['6rECUMhevHfxABZ1VNOm']!.discordId,
    senderDiscordUsername: userDocumentDataMock['6rECUMhevHfxABZ1VNOm']!.discordUsername,
    senderItems: [nftReferenceMock['QFjMRNChUAHNswkRADXh']!],
    senderItemsDetails: [
      {
        amount: 1,
        collectionName: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.collectionName,
        name: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.name,
        openSeaUrl: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.openSeaUrl,
        ownerWallet: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.ownerWallet,
        pictureUrl: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.pictureUrl,
        thumbnailUrl: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.thumbnailUrl,
        tokenId: nftDocumentDataMock['QFjMRNChUAHNswkRADXh']!.tokenId
      }
    ],
    state: 'OPEN',
    threadId: '1231'
  }
}
