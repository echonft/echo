import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { Chain } from '@echo/model/constants/chain'
import { OfferState } from '@echo/model/constants/offer-state'
import { TokenType } from '@echo/model/constants/token-type'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - offerDataConverter', () => {
  const document = offerMockToJohnnycage
  const documentData = {
    expiresAt: 2324074781,
    locked: false,
    idContract: '0xlycfl6eg7jkud7xj6ipi',
    receiver: userMockJohnny,
    receiverItems: [
      {
        token: {
          contract: {
            address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
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
            address: '0x12c63bbd266db84e117356e664f3604055166cec',
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
    slug: 'lycfl6eg7jkud7xj6ipi',
    state: OfferState.Open
  }
  const snapshot = {
    id: 'id',
    exists: true,
    data: () => documentData
  } as unknown as QueryDocumentSnapshot<OfferDocumentData, OfferDocumentData>

  it('from Firestore conversion', () => {
    expect(offerDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(offerDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
