import { Listing } from '../../src/types/model/listing'
import { nftCollectionMock } from './nft-collection-mock'
import { nftMock } from './nft-mock'
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
    expired: false,
    expiresAt: dayjs.unix(2324074781),
    items: [
      { amount: 1, nft: nftMock['8hHFadIrrooORfTOLkBg']! },
      { amount: 1, nft: nftMock['iRZFKEujarikVjpiFAkE']! }
    ],
    offersIds: ['LyCfl6Eg7JKuD7XJ6IPi'],
    state: 'OPEN',
    targets: [
      {
        collection: nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!,
        amount: 3
      }
    ]
  }
}
