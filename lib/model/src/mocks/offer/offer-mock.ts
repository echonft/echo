import { OfferState } from '@echo/model/constants/offer-state'
import { TokenType } from '@echo/model/constants/token-type'
import {
  collectionMockPxContract,
  collectionMockPxSlug,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection/collection-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { type Offer } from '@echo/model/types/offer/offer'
import { toLower } from 'ramda'

export function offerMockToJohnnycageId() {
  return 'LyCfl6Eg7JKuD7XJ6IPi'
}
export function offerMockToJohnnycageSlug(): Lowercase<string> {
  return toLower(offerMockToJohnnycageId())
}
export function offerMockFromJohnnycageId() {
  return 'ASkFpKoHEHVH0gd69t1G'
}
export function offerMockFromJohnnycageSlug(): Lowercase<string> {
  return toLower(offerMockFromJohnnycageId())
}

export function offerMock(): Record<string, Offer> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      expiresAt: 2324074781,
      locked: false,
      idContract: '0xlycfl6eg7jkud7xj6ipi',
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
      slug: offerMockToJohnnycageSlug(),
      state: OfferState.Open
    },
    ASkFpKoHEHVH0gd69t1G: {
      expiresAt: 2324074781,
      idContract: '0xaskfpkohehvh0gd69t1g',
      receiver: getUserMockByUsername(userMockCrewUsername()),
      locked: true,
      receiverItems: [
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
      sender: getUserMockByUsername(userMockJohnnyUsername()),
      senderItems: [
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
        },
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockSpiralSlug(),
              totalSupply: 6315
            },
            animationUrl: 'https://animation.url/',
            tokenIdLabel: '#0002',
            name: 'Spiral Frequencies #2',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
            tokenId: 2,
            type: TokenType.Erc721
          }
        }
      ],
      slug: offerMockFromJohnnycageSlug(),
      state: OfferState.Accepted
    }
  }
}
