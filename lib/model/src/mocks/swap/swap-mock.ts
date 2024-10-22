import { TokenType } from '@echo/model/constants/token-type'
import {
  collectionMockPxContract,
  collectionMockPxSlug,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection/collection-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Swap } from '@echo/model/types/swap/swap'

export function swapMock(): Swap {
  return {
    receiver: getUserMockByUsername(userMockJohnnyUsername()),
    receiverItems: [
      {
        token: {
          contract: collectionMockSpiralContract(),
          collection: {
            name: 'Spiral Frequencies',
            slug: collectionMockSpiralSlug(),
            totalSupply: 6315
          },
          animationUrl: 'https://animation.url/',
          tokenIdLabel: '#0001',
          name: 'Spiral Frequencies #1',
          metadataUrl: 'https://metadata.url/',
          pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
          tokenId: 1,
          type: TokenType.Erc721
        }
      }
    ],
    sender: getUserMockByUsername(userMockCrewUsername()),
    senderItems: [
      {
        token: {
          contract: collectionMockPxContract(),
          collection: {
            name: 'pxMythics Genesis',
            slug: collectionMockPxSlug(),
            totalSupply: 1077
          },
          tokenIdLabel: '#0003',
          name: 'Creative Demigod #3',
          animationUrl: 'https://animation.url/',
          metadataUrl: 'https://metadata.url/',
          pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
          tokenId: 3,
          type: TokenType.Erc721
        }
      }
    ],
    slug: 'swap-slug',
    transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b'
  }
}
