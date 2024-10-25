import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { ListingState } from '@echo/model/constants/listing-state'
import { TokenType } from '@echo/model/constants/token-type'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc } from 'ramda'

describe('converters - listingDataConverter', () => {
  const id = 'listing-id'
  const document = listingMock
  const documentData: ListingDocumentData = {
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
  const snapshot = {
    id,
    exists: true,
    data: () => documentData
  } as unknown as QueryDocumentSnapshot<ListingDocumentData, ListingDocumentData>

  it('from Firestore conversion', () => {
    expect(listingDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    const signature = listingSignature(document)
    expect(listingDataConverter.toFirestore(assoc('signature', signature, document))).toStrictEqual(documentData)
  })
})
