import { getNftById } from './nft'
import { getCollectionById } from './nft-collection'
import { Listing } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import dayjs from 'dayjs'

const listings: { [key: string]: Listing } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    createdAt: dayjs.unix(1676984897),
    creator: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycage#0890',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    expired: false,
    expiresAt: dayjs.unix(2324074781),
    items: [
      { amount: 1, nft: getNftById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftById('iRZFKEujarikVjpiFAkE') }
    ],
    state: 'OPEN',
    targets: [
      {
        collection: getCollectionById('Rc8pLQXxgyQGIRL0fr13'),
        amount: 3
      }
    ]
  }
}

export const getListingById = (id: string) => listings[id]!
export const getAllListings = () => Object.values(listings) as NonEmptyArray<Listing>
