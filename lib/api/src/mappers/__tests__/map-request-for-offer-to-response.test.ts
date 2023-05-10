/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestForOfferResponse } from '../../types'
import { mapRequestForOfferToResponse } from '../map-request-for-offer-to-response'
import { discordGuilds, requestsForOffer } from '@echo/firebase-admin'
import { RequestForOffer, RequestForOfferState } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

function callAndCatchMapper(requestForOffer: RequestForOffer) {
  try {
    mapRequestForOfferToResponse(requestForOffer)
    expect(false).toBeTruthy()
  } catch (e) {
    expect(e).toBeDefined()
  }
}
describe('mappers - mapRequestForOfferToResponse', () => {
  const mockRequestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  const expectedResult: RequestForOfferResponse = {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: RequestForOfferState.EXPIRED,
    sender: mockRequestForOffer.sender,
    items: mockRequestForOffer.items.map((item) => ({ ...item, tokenId: item.tokenId.toString() })),
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    target: mockRequestForOffer.target,
    activities: [
      {
        date: 1676984897,
        toState: RequestForOfferState.CREATED,
        fromState: undefined
      },
      {
        date: 1676900000,
        toState: RequestForOfferState.EXPIRED,
        fromState: RequestForOfferState.CREATED
      }
    ],
    offers: [
      {
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
          discordId: '123456',
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
          discordAvatar: '4b4d6722cb2b98b0b817020257a9c3ec',
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
          discordId: '123456',
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
          discordAvatar: '4b4d6722cb2b98b0b817020257a9c3ec',
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
        createdAt: 1676984897,
        postedAt: undefined,
        activities: [{ date: 1676984897, toState: 'OPEN', fromState: undefined }]
      }
    ],
    swaps: [
      {
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
            discordId: '123456',
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
            discordAvatar: '4b4d6722cb2b98b0b817020257a9c3ec',
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
            discordId: '123456',
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
            discordAvatar: '4b4d6722cb2b98b0b817020257a9c3ec',
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
    ],
    expiresAt: 1676984897,
    postedAt: undefined,
    createdAt: 1676984897
  }
  it('valid data passes', () => {
    expect(mapRequestForOfferToResponse(mockRequestForOffer)).toStrictEqual(expectedResult)
  })
  it('invalid data passes', () => {
    // @ts-ignore
    let requestForOffer: RequestForOffer = omit(['id'], mockRequestForOffer)
    expect(mapRequestForOfferToResponse(requestForOffer)).toStrictEqual(omit(['id'], expectedResult))
    // @ts-ignore
    requestForOffer = omit(['discordGuild'], mockRequestForOffer)
    expect(mapRequestForOfferToResponse(requestForOffer)).toStrictEqual(omit(['discordGuild'], expectedResult))
  })
  it('invalid data throws', () => {
    // @ts-ignore
    let requestForOffer: RequestForOffer = omit(['items'], mockRequestForOffer)
    callAndCatchMapper(requestForOffer)
    // @ts-ignore
    requestForOffer = omit(['expiresAt'], mockRequestForOffer)
    callAndCatchMapper(requestForOffer)
    // @ts-ignore
    requestForOffer = omit(['createdAt'], mockRequestForOffer)
    callAndCatchMapper(requestForOffer)
  })
})
