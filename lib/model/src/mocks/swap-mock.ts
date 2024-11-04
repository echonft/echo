import { TokenType } from '@echo/model/constants/token-type'
import { nftMockPx3, nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Swap } from '@echo/model/types/swap'

export const swapMock: Swap = {
  receiver: userMockJohnny,
  receiverItems: [
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
    }
  ],
  sender: userMockCrew,
  senderItems: [
    {
      token: {
        contract: nftMockPx3.collection.contract,
        collection: {
          name: nftMockPx3.collection.name,
          slug: nftMockPx3.collection.slug,
          totalSupply: nftMockPx3.collection.totalSupply
        },
        name: nftMockPx3.name,
        pictureUrl: nftMockPx3.pictureUrl,
        tokenId: nftMockPx3.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  slug: 'swap-slug',
  transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b'
}

export const swapMocks: Swap[] = [swapMock]
