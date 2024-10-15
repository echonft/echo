import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import {
  collectionMockPxId,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'

export function listingDocumentDataMock(): Record<string, ListingDocumentData> {
  return {
    jUzMtPGKM62mMhEcmbN4: {
      creator: getUserMockByUsername(userMockJohnnyUsername()),
      expiresAt: 2324074781,
      items: {
        erc20: [],
        erc721: [
          {
            token: {
              contract: collectionMockSpiralContract(),
              animationUrl: 'https://animation.url/',
              collection: {
                name: 'Spiral Frequencies',
                slug: collectionMockSpiralSlug(),
                totalSupply: 6315
              },
              name: 'Spiral Frequencies #1',
              metadataUrl: 'https://metadata.url/',
              pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
              tokenId: 1,
              type: 'erc721'
            },
            quantity: 1
          },
          {
            token: {
              contract: collectionMockSpiralContract(),
              animationUrl: 'https://animation.url/',
              collection: {
                name: 'Spiral Frequencies',
                slug: collectionMockSpiralSlug(),
                totalSupply: 6315
              },
              name: 'Spiral Frequencies #2',
              metadataUrl: 'https://metadata.url/',
              pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
              tokenId: 2,
              type: 'erc721'
            },
            quantity: 1
          }
        ],
        erc1155: []
      },
      itemCollections: [collectionMockSpiralSlug()],
      itemIndexes: [
        {
          collection: {
            slug: collectionMockSpiralSlug()
          },
          tokenId: 1
        },
        {
          collection: {
            slug: collectionMockSpiralSlug()
          },
          tokenId: 2
        }
      ],
      slug: listingMockSlug(),
      state: LISTING_STATE_OFFERS_PENDING,
      target: {
        collection: getCollectionMockById(collectionMockPxId()),
        quantity: 3
      }
    }
  }
}
