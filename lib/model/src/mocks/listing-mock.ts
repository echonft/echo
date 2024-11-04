import { ListingState } from '@echo/model/constants/listing-state'
import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMockSpiral1, nftMockSpiral2 } from '@echo/model/mocks/nft-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { type Listing } from '@echo/model/types/listing'

export const listingMock: Listing = {
  creator: userMockJohnny,
  expiresAt: 2324074781,
  items: [
    {
      token: {
        contract: nftMockSpiral1.collection.contract,
        collection: {
          name: nftMockSpiral1.collection.name,
          slug: nftMockSpiral1.collection.slug,
          totalSupply: nftMockSpiral1.collection.totalSupply
        },
        name: nftMockSpiral1.name,
        pictureUrl: nftMockSpiral1.pictureUrl,
        tokenId: nftMockSpiral1.tokenId,
        type: TokenType.Erc721
      }
    },
    {
      token: {
        contract: nftMockSpiral2.collection.contract,
        collection: {
          name: nftMockSpiral2.collection.name,
          slug: nftMockSpiral2.collection.slug,
          totalSupply: nftMockSpiral2.collection.totalSupply
        },
        name: nftMockSpiral2.name,
        pictureUrl: nftMockSpiral2.pictureUrl,
        tokenId: nftMockSpiral2.tokenId,
        type: TokenType.Erc721
      }
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
