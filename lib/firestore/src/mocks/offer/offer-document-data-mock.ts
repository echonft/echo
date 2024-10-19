import { type OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { OfferState } from '@echo/model/constants/offer-state'
import { TokenType } from '@echo/model/constants/token-type'
import {
  collectionMockPxContract,
  collectionMockPxSlug,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection/collection-mock'
import { offerMockFromJohnnycageSlug, offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'

export function offerDocumentDataMock(): Record<string, OfferDocumentData> {
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
            name: 'Spiral Frequencies #1',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      receiverItemCollections: [collectionMockSpiralSlug()],
      receiverItemIndexes: [`${collectionMockSpiralSlug()}.1`],
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
            name: 'Creative Demigod #3',
            animationUrl: 'https://animation.url/',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
            tokenId: 3,
            type: TokenType.Erc721
          }
        }
      ],
      senderItemCollections: [collectionMockPxSlug()],
      senderItemIndexes: [`${collectionMockPxSlug()}.3`],
      slug: offerMockToJohnnycageSlug(),
      state: OfferState.Open
    },
    ASkFpKoHEHVH0gd69t1G: {
      expiresAt: 2324074781,
      locked: true,
      idContract: '0xaskfpkohehvh0gd69t1g',
      receiver: getUserMockByUsername(userMockCrewUsername()),
      receiverItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockPxSlug(),
              totalSupply: 1077
            },
            name: 'Creative Demigod #3',
            animationUrl: 'https://animation.url/',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
            tokenId: 3,
            type: TokenType.Erc721
          }
        }
      ],
      receiverItemIndexes: [`${collectionMockPxSlug()}.3`],
      receiverItemCollections: [collectionMockPxSlug()],
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
            name: 'Spiral Frequencies #2',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
            tokenId: 2,
            type: TokenType.Erc721
          }
        }
      ],
      senderItemCollections: [collectionMockSpiralSlug()],
      senderItemIndexes: [`${collectionMockSpiralSlug()}.1`, `${collectionMockSpiralSlug()}.2`],
      slug: offerMockFromJohnnycageSlug(),
      state: OfferState.Completed
    }
  }
}
