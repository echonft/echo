import { type OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { Chain } from '@echo/model/constants/chain'
import { OfferState } from '@echo/model/constants/offer-state'
import { TokenType } from '@echo/model/constants/token-type'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { toLower } from 'ramda'

export function offerDocumentDataMock(): Record<string, OfferDocumentData> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      expiresAt: 2324074781,
      locked: false,
      idContract: '0xlycfl6eg7jkud7xj6ipi',
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
      slug: 'lycfl6eg7jkud7xj6ipi',
      state: OfferState.Open
    },
    ASkFpKoHEHVH0gd69t1G: {
      expiresAt: 2324074781,
      locked: true,
      idContract: '0xaskfpkohehvh0gd69t1g',
      receiver: userMockCrew,
      receiverItems: [
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
      receiverItemIndexes: ['pxmythics-genesis.3'],
      receiverItemCollections: ['pxmythics-genesis'],
      sender: userMockJohnny,
      senderItems: [
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
        },
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
            name: 'Spiral Frequencies #2',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
            tokenId: 2,
            type: TokenType.Erc721
          }
        }
      ],
      senderItemCollections: ['spiral-frequencies'],
      senderItemIndexes: ['spiral-frequencies.1', 'spiral-frequencies.2'],
      slug: 'askfpkohehvh0gd69t1g',
      state: OfferState.Accepted
    }
  }
}

export function offerMockToJohnnycageId() {
  return 'LyCfl6Eg7JKuD7XJ6IPi'
}
export function offerMockFromJohnnycageId() {
  return 'ASkFpKoHEHVH0gd69t1G'
}
