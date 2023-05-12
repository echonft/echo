/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SwapResponse } from '../../types/model/responses/swap-response'
import { mapSwapToResponse } from '../map-swap-to-response'
import { requestsForOffer } from '@echo/firebase-admin'
import { Swap } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('mappers - mapSwapToResponse', () => {
  const mockSwap = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!.swaps![0]!
  const expectedResult = {
    id: 'hS6KtAJ03bSolumoHvDJ',
    // @ts-ignore
    state: 'PENDING_APPROVALS',
    offer: {
      id: 'LyCfl6Eg7JKuD7XJ6IPi',
      // @ts-ignore
      state: 'OPEN',
      discordGuild: {
        id: 'xA40abnyBq6qQHSYmtHj',
        discordId: '1',
        channelId: '1',
        name: 'Echo Test',
        contracts: [
          {
            id: '37dBlwJYahEAKeL0rNP8',
            tokenType: 'ERC721',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            chainId: 1,
            name: 'BoredApeYachtClub',
            symbol: 'BAYC'
          }
        ]
      },
      threadId: '1231',
      sender: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordBanner: undefined,
        discordUsername: 'johnnycage#0890',
        discordGuilds: [
          {
            id: 'xA40abnyBq6qQHSYmtHj',
            discordId: '1',
            channelId: '1',
            name: 'Echo Test',
            contracts: [
              {
                id: '37dBlwJYahEAKeL0rNP8',
                tokenType: 'ERC721',
                address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                chainId: 1,
                name: 'BoredApeYachtClub',
                symbol: 'BAYC'
              }
            ]
          }
        ],
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        wallets: [
          { address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 },
          { address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9', chainId: 1 },
          { address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 1 }
        ]
      },
      senderItems: [
        {
          contract: {
            id: '37dBlwJYahEAKeL0rNP8',
            tokenType: 'ERC721',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            chainId: 1,
            name: 'BoredApeYachtClub',
            symbol: 'BAYC'
          },
          tokenId: '1',
          balance: undefined
        }
      ],
      receiver: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordBanner: undefined,
        discordUsername: 'johnnycage#0890',
        discordGuilds: [
          {
            id: 'xA40abnyBq6qQHSYmtHj',
            discordId: '1',
            channelId: '1',
            name: 'Echo Test',
            contracts: [
              {
                id: '37dBlwJYahEAKeL0rNP8',
                tokenType: 'ERC721',
                address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                chainId: 1,
                name: 'BoredApeYachtClub',
                symbol: 'BAYC'
              }
            ]
          }
        ],
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        wallets: [
          { address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 },
          { address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9', chainId: 1 },
          { address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 1 }
        ]
      },
      receiverItems: [
        {
          contract: {
            id: '37dBlwJYahEAKeL0rNP8',
            tokenType: 'ERC721',
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            chainId: 1,
            name: 'BoredApeYachtClub',
            symbol: 'BAYC'
          },
          tokenId: '16',
          balance: 2
        }
      ],
      expiresAt: 1676984897,
      postedAt: undefined,
      createdAt: 1676984897,
      activities: [{ date: 1676984897, toState: 'OPEN', fromState: undefined }]
    },
    expiresAt: 1676984897,
    createdAt: 1676984897,
    activities: [{ date: 1676984897, toState: 'PENDING_APPROVALS', fromState: undefined }]
  }
  it('valid data passes', () => {
    expect(mapSwapToResponse(mockSwap)).toStrictEqual(expectedResult)
  })
  it('invalid data passes', () => {
    // @ts-ignore
    const swap: Swap = omit(['id'], mockSwap)
    // @ts-ignore
    const result: SwapResponse = omit(['id'], expectedResult)
    expect(mapSwapToResponse(swap)).toStrictEqual(result)
  })
  it('invalid data throws', () => {
    // @ts-ignore
    let swap: Swap = omit(['createdAt'], mockSwap)
    try {
      mapSwapToResponse(swap)
      expect(false).toBeTruthy()
    } catch (e) {
      expect(e).toBeDefined()
    }
    // @ts-ignore
    swap = omit(['offer'], mockSwap)
    try {
      mapSwapToResponse(swap)
      expect(false).toBeTruthy()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
