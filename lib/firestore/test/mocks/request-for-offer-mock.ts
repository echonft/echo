import { RequestForOffer } from '../../src/types/model/converted/request-for-offer'
import { discordGuildMock } from './discord-guild-mock'
import { nftCollectionMock } from './nft-collection-mock'
import { nftMock } from './nft-mock'
import { offerMock } from './offer-mock'
import { swapMock } from './swap-mock'
import { userMock } from './user-mock'
import dayjs from 'dayjs'

export const requestForOfferMock: { [key: string]: RequestForOffer } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    activities: [
      {
        date: dayjs.unix(1676984897),
        fromState: undefined,
        toState: 'CREATED'
      },
      {
        date: dayjs.unix(1676900000),
        toState: 'EXPIRED',
        fromState: 'CREATED'
      }
    ],
    createdAt: dayjs.unix(1676984897),
    creatorId: userMock['oE6yUEQBPn7PZ89yMjKn']!.id,
    creatorDiscordAvatar: userMock['oE6yUEQBPn7PZ89yMjKn']!.discordAvatar,
    creatorDiscordId: userMock['oE6yUEQBPn7PZ89yMjKn']!.discordId,
    creatorDiscordUsername: userMock['oE6yUEQBPn7PZ89yMjKn']!.discordUsername,
    discordGuildId: discordGuildMock['xA40abnyBq6qQHSYmtHj']!.id,
    expiresAt: dayjs.unix(1676984897),
    itemsIds: [nftMock['QFjMRNChUAHNswkRADXh']!.id, nftMock['8hHFadIrrooORfTOLkBg']!.id],
    itemsDetails: [
      {
        amount: 1,
        blurUrl: undefined,
        collectionName: nftMock['QFjMRNChUAHNswkRADXh']!.collectionName,
        name: nftMock['QFjMRNChUAHNswkRADXh']!.name,
        openSeaUrl: nftMock['QFjMRNChUAHNswkRADXh']!.openSeaUrl,
        ownerWallet: nftMock['QFjMRNChUAHNswkRADXh']!.ownerWallet,
        pictureUrl: nftMock['QFjMRNChUAHNswkRADXh']!.pictureUrl,
        thumbnailUrl: nftMock['QFjMRNChUAHNswkRADXh']!.thumbnailUrl,
        tokenId: nftMock['QFjMRNChUAHNswkRADXh']!.tokenId
      },
      {
        amount: 1,
        blurUrl: nftMock['8hHFadIrrooORfTOLkBg']!.blurUrl,
        collectionName: nftMock['8hHFadIrrooORfTOLkBg']!.collectionName,
        name: nftMock['8hHFadIrrooORfTOLkBg']!.name,
        openSeaUrl: nftMock['8hHFadIrrooORfTOLkBg']!.openSeaUrl,
        ownerWallet: nftMock['8hHFadIrrooORfTOLkBg']!.ownerWallet,
        pictureUrl: nftMock['8hHFadIrrooORfTOLkBg']!.pictureUrl,
        thumbnailUrl: nftMock['8hHFadIrrooORfTOLkBg']!.thumbnailUrl,
        tokenId: nftMock['8hHFadIrrooORfTOLkBg']!.tokenId
      }
    ],
    offersIds: [offerMock['LyCfl6Eg7JKuD7XJ6IPi']!.id],
    postedAt: undefined,
    state: 'EXPIRED',
    swapsIds: [swapMock['hS6KtAJ03bSolumoHvDJ']!.id],
    target: [
      {
        collection: nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!,
        collectionBannerUrl: nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!.bannerUrl,
        collectionProfilePictureUrl: nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!.profilePictureUrl,
        count: 3
      }
    ]
  }
}
