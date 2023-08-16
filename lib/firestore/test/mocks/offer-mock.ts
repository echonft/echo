import { Offer } from '../../src/types/model/converted/offer'
import { discordGuildMock } from './discord-guild-mock'
import { nftMock } from './nft-mock'
import { userMock } from './user-mock'
import dayjs from 'dayjs'

export const offerMock: { [key: string]: Offer } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    activities: [{ date: dayjs.unix(1676984897), fromState: undefined, toState: 'OPEN' }],
    createdAt: dayjs.unix(1676984897),
    discordGuildId: discordGuildMock['xA40abnyBq6qQHSYmtHj']!.discordId,
    expiresAt: dayjs.unix(1676984897),
    postedAt: undefined,
    receiverId: userMock['oE6yUEQBPn7PZ89yMjKn']!.id,
    receiverDiscordAvatar: userMock['oE6yUEQBPn7PZ89yMjKn']!.discordAvatar,
    receiverDiscordId: userMock['oE6yUEQBPn7PZ89yMjKn']!.discordId,
    receiverDiscordUsername: userMock['oE6yUEQBPn7PZ89yMjKn']!.discordUsername,
    receiverItemsIds: [nftMock['8hHFadIrrooORfTOLkBg']!.id],
    receiverItemsDetails: [
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
    senderId: userMock['6rECUMhevHfxABZ1VNOm']!.id,
    senderDiscordAvatar: userMock['6rECUMhevHfxABZ1VNOm']!.discordAvatar,
    senderDiscordId: userMock['6rECUMhevHfxABZ1VNOm']!.discordId,
    senderDiscordUsername: userMock['6rECUMhevHfxABZ1VNOm']!.discordUsername,
    senderItemIds: [nftMock['QFjMRNChUAHNswkRADXh']!.id],
    senderItemsDetails: [
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
      }
    ],
    state: 'OPEN',
    threadId: '1231'
  }
}
