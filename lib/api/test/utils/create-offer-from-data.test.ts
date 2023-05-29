import { CreateOfferRequest } from '../../src/types/model/requests/create-offer-request'
import * as walletOwnToken from '../../src/utils/alchemy/wallets-own-tokens'
import { createOfferFromData } from '../../src/utils/handler/create-offer-from-data'
import { mockAddOffer } from '../../src/utils/test/mocks/firebase-admin/add-offer'
import { mockFindNftsById } from '../../src/utils/test/mocks/firebase-admin/find-nfts-by-id'
import { mockUpdateRequestForOfferOffers } from '../../src/utils/test/mocks/firebase-admin/update-request-for-offer-offers'
import { promiseResultError } from '../../src/utils/test/mocks/promise-result-error'
import { promiseResultRejecter } from '../../src/utils/test/mocks/promise-result-rejecter'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { addOffer, findNftsById, updateRequestForOfferOffers } from '@echo/firebase-admin'
import { discordGuildFirestoreData, FirestoreOfferData, offerFirestoreData, userFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firebase-admin')
jest.mock('../../src/utils/alchemy/wallets-own-tokens')
jest.mock('../../src/utils/alchemy/alchemy')

describe('utils - handler - createOfferFromData', () => {
  let mockedWalletsOwnTokens = jest
    .spyOn(walletOwnToken, 'walletsOwnTokens')
    .mockImplementation(() => Promise.resolve(true))
  const mockedAddOffer = jest.mocked(addOffer).mockImplementation(mockAddOffer)
  jest.mocked(updateRequestForOfferOffers).mockImplementation(mockUpdateRequestForOfferOffers)
  jest.mocked(findNftsById).mockImplementation(mockFindNftsById)

  const mockOffer = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
  const mockUser = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const mockUserNoWallet = userFirestoreData['9tPlFOv1XkR3ng7KI46B']!
  const mockSenderItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map((nft) => nft.id)
  const mockReceiverItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  const discordGuild = discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
  beforeEach(() => {
    jest.clearAllMocks()
    // Need to remock the method on `spyOn`
    mockedWalletsOwnTokens = jest
      .spyOn(walletOwnToken, 'walletsOwnTokens')
      .mockImplementation(() => Promise.resolve(true))
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
    mockedWalletsOwnTokens.mockImplementation(() => Promise.reject(''))
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs' })
  })
  it('if walletsOwnTokens fails, returns 401', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    mockedWalletsOwnTokens.mockImplementation(() => Promise.resolve(false))
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs' })
  })
  it('if addOffer fails, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    mockedAddOffer.mockImplementationOnce(promiseResultError)
    await createOfferFromData(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  })
  it('if addOffer rejects, returns 500', async () => {
    const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
    mockedAddOffer.mockImplementationOnce(promiseResultRejecter)
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
