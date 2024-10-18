import { contractOfferToBaseOffer } from '@echo/backend/mappers/contract-offer-to-base-offer'
import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getCollectionMock } from '@echo/model/mocks/collection/get-collection-mock'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import { Chain } from '@echo/utils/constants/chain'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/collection/get-collection-by-address')
jest.mock('@echo/firestore/crud/nft/get-nft-by-index')

describe('mappers - contractOfferToBaseOffer', () => {
  jest.mocked(getCollectionByAddress).mockResolvedValue(getCollectionMock())
  jest.mocked(getNftByIndex).mockResolvedValue(getNftMock())

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
          bannerColor: '#d11bd9',
          username: 'johnnycagewins'
        },
        username: 'johnnycagewins',
        wallet: {
          address: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
          chain: Chain.Ethereum
        }
      },
      receiverItems: [getNftMock()],
      sender: {
        discord: {
          avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
          bannerColor: '#d11bd9',
          username: 'johnnycagewins'
        },
        username: 'johnnycagewins',
        wallet: {
          address: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
          chain: Chain.Ethereum
        }
      },
      senderItems: [getNftMock()]
    }
    const result = await contractOfferToBaseOffer(contractOffer)
    expect(result).toStrictEqual(expected)
  })
})
