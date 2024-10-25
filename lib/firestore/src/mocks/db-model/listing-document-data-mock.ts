import { type ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { ListingState } from '@echo/model/constants/listing-state'
import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'

export function listingDocumentDataMock(): Record<string, ListingDocumentData> {
  return {
    jUzMtPGKM62mMhEcmbN4: {
      creator: userMockJohnny,
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
      itemCollections: [collectionMockSpiral.slug],
      itemIndexes: [`${collectionMockSpiral.slug}.1`, `${collectionMockSpiral.slug}.2`],
      locked: false,
      slug: listingMock.slug,
      state: ListingState.Open,
      target: {
        collection: collectionMockPx,
        quantity: 3
      },
      signature: 'a7e5c4e564e9a6c74571dfe9f770c135e20c3a94'
    }
  }
}
export function listingMockId() {
  return 'jUzMtPGKM62mMhEcmbN4'
}
