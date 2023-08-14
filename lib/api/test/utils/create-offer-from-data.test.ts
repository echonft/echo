/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createOfferFromData } from '../../src/utils/handler/create-offer-from-data'
import { mockAreNftsOwnedByWallets, MockAreNftsOwnedByWalletsArgs } from '../mocks/alchemy/are-nfts-owned-by-wallets'
import { discordGuildFirestoreData } from '../mocks/discord-guild-firestore-data'
import { mockAddOffer } from '../mocks/firestore/add-offer'
import { mockFindNftsByIds } from '../mocks/firestore/find-nfts-by-ids'
import { mockUpdateRequestForOfferOffers } from '../mocks/firestore/update-request-for-offer-offers'
import { offerFirestoreData } from '../mocks/offer-firestore-data'
import { mockRequestResponse } from '../mocks/request-response'
import { userFirestoreData } from '../mocks/user-firestore-data'
import { CreateOfferRequest } from '@echo/api-public'
import {
  addOffer,
  findNftsByIds,
  FirestoreOfferData,
  updateRequestForOfferOffers,
  userIsInGuild
} from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore')
jest.mock('@echo/alchemy', () => ({
  areNftsOwnedByWallets: (args: MockAreNftsOwnedByWalletsArgs) => mockAreNftsOwnedByWallets(args)
}))

describe('utils - handler - createOfferFromData', () => {
  const mockedAddOffer = jest.mocked(addOffer).mockImplementation(mockAddOffer)
  const mockedUserIsInGuild = jest.mocked(userIsInGuild).mockReturnValue(true)
  jest.mocked(updateRequestForOfferOffers).mockImplementation(mockUpdateRequestForOfferOffers)
  jest.mocked(findNftsByIds).mockImplementation(mockFindNftsByIds)
  const mockOffer = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
  const mockUser = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const mockUserNoWallet = userFirestoreData['9tPlFOv1XkR3ng7KI46B']!
  const mockSenderItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map((nft) => nft.id)
  const mockReceiverItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  const discordGuild = discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if receiver has no wallets, returns 401', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUserNoWallet, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not have wallets' })
  })
  it('if sender has no wallets, returns 401', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, mockSenderItems, mockUserNoWallet, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not have wallets' })
  })
  it('if user is not in guild, return 401', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    mockedUserIsInGuild.mockReturnValueOnce(false)
    await createOfferFromData(
      { ...mockUser, discordGuilds: [] },
      mockSenderItems,
      mockUser,
      mockReceiverItems,
      discordGuild,
      res
    )
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User is not in Discord Guild' })
  })
  it('if sender items is invalid, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, [''], mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  })
  it('if sender items is rejects, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, ['reject'], mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  })
  it('if receiver items is invalid, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, mockSenderItems, mockUser, [''], discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  })
  it('if receiver items is rejects, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, mockSenderItems, mockUser, ['reject'], discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  })
  it('if walletsOwnTokens rejects, returns 401', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(
      { ...mockUser, wallets: [{ address: 'reject', chainId: 1 }] },
      mockSenderItems,
      mockUser,
      mockReceiverItems,
      discordGuild,
      res
    )
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs' })
  })
  it('if walletsOwnTokens fails, returns 401', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(
      { ...mockUser, wallets: [{ address: 'error', chainId: 1 }] },
      mockSenderItems,
      mockUser,
      mockReceiverItems,
      discordGuild,
      res
    )
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs' })
  })
  it('if addOffer fails, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    mockedAddOffer.mockRejectedValueOnce(Error('test'))
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if addOffer rejects, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    mockedAddOffer.mockRejectedValueOnce(Error('test'))
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if updateRequestForOfferOffers reject, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res, 'reject')
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if addOffer success (with request for offer), returns 200 with object', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(
      mockUser,
      mockSenderItems,
      mockUser,
      mockReceiverItems,
      discordGuild,
      res,
      'jUzMtPGKM62mMhEcmbN4'
    )
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(mockOffer)
  })
  it('if addOffer success (without request for offer), returns 200 with object', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(mockOffer)
  })
})
