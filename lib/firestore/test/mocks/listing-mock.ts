import { Listing } from '../../src/types/model/listing'
import { nftCollectionMock } from './nft-collection-mock'
import { nftMock } from './nft-mock'
import { offerMock } from './offer-mock'
import { swapMock } from './swap-mock'
import dayjs from 'dayjs'

export const listingMock: { [key: string]: Listing } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    createdAt: dayjs.unix(1676984897),
    creator: {
      id: 'user1',
      discordId: '462798252543049728',
      discordUsername: 'johnnycage#0890',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      discordBanner: undefined,
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    expiresAt: dayjs.unix(1676984897),
    items: [
      { amount: 1, ...nftMock['QFjMRNChUAHNswkRADXh']! },
      { amount: 1, ...nftMock['8hHFadIrrooORfTOLkBg']! }
    ],
    offers: [offerMock['LyCfl6Eg7JKuD7XJ6IPi']!],
    postedAt: dayjs.unix(1676984897),
    state: 'EXPIRED',
    swaps: [swapMock['hS6KtAJ03bSolumoHvDJ']!],
    targets: [
      {
        collection: nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!,
        amount: 3
      }
    ]
  }
}
