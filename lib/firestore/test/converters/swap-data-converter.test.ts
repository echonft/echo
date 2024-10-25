import { swapDataConverter } from '@echo/firestore/converters/swap-data-converter'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc, toLower } from 'ramda'

describe('converters - swapDataConverter', () => {
  const document = swapMock
  const documentData: SwapDocumentData = {
    offerId: 'offer-id',
    receiver: userMockJohnny,
    receiverItems: [
      {
        token: {
          contract: {
            address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
            chain: Chain.Ethereum
          },
          collection: {
            name: 'Spiral Frequencies',
            slug: 'spiral-frequencies',
            totalSupply: 6315
          },
          name: 'Spiral Frequencies #1',
          pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
          tokenId: 1,
          type: TokenType.Erc721
        }
      }
    ],
    receiverItemCollections: ['spiral-frequencies'],
    receiverItemIndexes: ['spiral-frequencies.1'],
    sender: userMockCrew,
    senderItems: [
      {
        token: {
          contract: {
            address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
            chain: Chain.Ethereum
          },
          collection: {
            name: 'pxMythics Genesis',
            slug: 'pxmythics-genesis',
            totalSupply: 1077
          },
          name: 'Creative Demigod #3',
          pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
          tokenId: 3,
          type: TokenType.Erc721
        }
      }
    ],
    senderItemCollections: ['pxmythics-genesis'],
    senderItemIndexes: ['pxmythics-genesis.3'],
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
