import { swapDataConverter } from '@echo/firestore/converters/swap-data-converter'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { TokenType } from '@echo/model/constants/token-type'
import {
  collectionMockPxContract,
  collectionMockPxSlug,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection/collection-mock'
import { swapMock } from '@echo/model/mocks/swap/swap-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc } from 'ramda'

describe('converters - swapDataConverter', () => {
  const document = swapMock()
  const documentData: SwapDocumentData = {
    offerId: 'offer-id',
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
    slug: 'swap-slug',
    transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b'
  }
  const snapshot = {
    id: 'id',
    exists: true,
    data: () => documentData
  } as QueryDocumentSnapshot<SwapDocumentData, SwapDocumentData>

  it('from Firestore conversion', () => {
    expect(swapDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(swapDataConverter.toFirestore(assoc('offerId', documentData.offerId, document))).toStrictEqual(documentData)
  })
})
