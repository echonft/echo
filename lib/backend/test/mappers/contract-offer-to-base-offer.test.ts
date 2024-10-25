import { contractOfferToBaseOffer } from '@echo/backend/mappers/contract-offer-to-base-offer'
import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { toLower } from 'ramda'

jest.mock('@echo/firestore/crud/collection/get-collection-by-address')
jest.mock('@echo/firestore/crud/nft/get-nft-by-index')

describe('mappers - contractOfferToBaseOffer', () => {
  jest.mocked(getCollectionByAddress).mockResolvedValue(collectionMockSpiral)
  jest.mocked(getNftByIndex).mockResolvedValue(nftMockSpiral1)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('maps correctly', async () => {
    const contractOffer: ContractOffer = {
      sender: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
      receiver: '0x20f039821de7db6f543c7c07d419800eb9bd01af',
      senderItems: {
        chainId: 168587773,
        items: [
          {
            tokenAddress: '0xd91303f46c3f4883d9d74c703c15948e5e04e110',
            tokenId: 1
          }
        ]
      },
      receiverItems: {
        chainId: 168587773,
        items: [
          {
            tokenAddress: '0xd91303f46c3f4883d9d74c703c15948e5e04e110',
            tokenId: 2
          }
        ]
      },
      expiration: 1720801071,
      state: 0
    }
    const expected: BaseOffer = {
      expiresAt: 1720801071,
      receiver: {
        discord: {
          avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
          username: 'johnnycagewins'
        },
        username: 'johnnycagewins',
        wallet: {
          address: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
          chain: Chain.Ethereum
        }
      },
      receiverItems: [
        {
          token: {
            contract: {
              address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
              chain: Chain.Ethereum
            },
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockSpiralSlug(),
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: {
        discord: {
          avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
          username: 'johnnycagewins'
        },
        username: 'johnnycagewins',
        wallet: {
          address: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
          chain: Chain.Ethereum
        }
      },
      senderItems: [
        {
          token: {
            contract: {
              address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
              chain: Chain.Ethereum
            },
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockSpiralSlug(),
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ]
    }
    const result = await contractOfferToBaseOffer(contractOffer)
    expect(result).toStrictEqual(expected)
  })
})
