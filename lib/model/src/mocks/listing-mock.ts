import { ListingState } from '@echo/model/constants/listing-state'
import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { userWithWalletMockJohnny } from '@echo/model/mocks/user-mock'
import { type Listing } from '@echo/model/types/listing'

export const listingMock: Listing = {
  creator: userWithWalletMockJohnny,
  expiresAt: 2324074781,
  items: [
    {
      token: {
        contract: collectionMockSpiral.contract,
        collection: {
          name: 'Spiral Frequencies',
          slug: collectionMockSpiral.slug,
          totalSupply: 6315
        },
        name: 'Spiral Frequencies #1',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        tokenId: 1,
        type: TokenType.Erc721
      },
      quantity: 1
    },
    {
      token: {
        contract: collectionMockSpiral.contract,
        collection: {
          name: 'Spiral Frequencies',
          slug: collectionMockSpiral.slug,
          totalSupply: 6315
        },
        name: 'Spiral Frequencies #2',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
        tokenId: 2,
        type: TokenType.Erc721
      },
      quantity: 1
    }
  ],
  locked: false,
  slug: 'juzmtpgkm62mmhecmbn4',
  state: ListingState.Open,
  target: {
    collection: collectionMockPx,
    quantity: 3
  }
}
