/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from '@jest/globals'

// jest.mock('@echo/firestore')

// FIXME
describe('utils - handler - createOffer', () => {
  // const mockedAddOffer = jest.mocked(addOffer).mockImplementation(mockAddOffer)
  // const mockedUserIsInGuild = jest.mocked(userIsInGuild).mockReturnValue(true)
  // jest.mocked(updateRequestForOfferOffers).mockImplementation(mockUpdateRequestForOfferOffers)
  // jest.mocked(findNftsByIds).mockImplementation(mockFindNftsByIds)
  // const mockOffer = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
  // const mockUser = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  // const mockUserNoWallet = userFirestoreData['9tPlFOv1XkR3ng7KI46B']!
  // const mockSenderItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map((nft) => nft.id)
  // const mockReceiverItems = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  // const discordGuild = discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']!
  //
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })
  //
  // it('if receiver has no wallets, returns 401', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUserNoWallet, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(401)
  //   expect(res._getJSONData()).toEqual({ error: 'Users do not have wallets' })
  // })
  // it('if sender has no wallets, returns 401', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, mockSenderItems, mockUserNoWallet, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(401)
  //   expect(res._getJSONData()).toEqual({ error: 'Users do not have wallets' })
  // })
  // it('if user is not in guild, return 401', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   mockedUserIsInGuild.mockReturnValueOnce(false)
  //   await createOffer(
  //     { ...mockUser, discordGuilds: [] },
  //     mockSenderItems,
  //     mockUser,
  //     mockReceiverItems,
  //     discordGuild,
  //     res
  //   )
  //   expect(res.statusCode).toBe(401)
  //   expect(res._getJSONData()).toEqual({ error: 'User is not in Discord Guild' })
  // })
  // it('if sender items is invalid, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, [''], mockUser, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  // })
  // it('if sender items is rejects, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, ['reject'], mockUser, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  // })
  // it('if receiver items is invalid, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, mockSenderItems, mockUser, [''], discordGuild, res)
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  // })
  // it('if receiver items is rejects, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, mockSenderItems, mockUser, ['reject'], discordGuild, res)
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not find NFTs' })
  // })
  // it('if walletsOwnTokens rejects, returns 401', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(
  //     { ...mockUser, wallets: [{ address: 'reject', chainId: 1 }] },
  //     mockSenderItems,
  //     mockUser,
  //     mockReceiverItems,
  //     discordGuild,
  //     res
  //   )
  //   expect(res.statusCode).toBe(401)
  //   expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs' })
  // })
  // it('if walletsOwnTokens fails, returns 401', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(
  //     { ...mockUser, wallets: [{ address: 'error', chainId: 1 }] },
  //     mockSenderItems,
  //     mockUser,
  //     mockReceiverItems,
  //     discordGuild,
  //     res
  //   )
  //   expect(res.statusCode).toBe(401)
  //   expect(res._getJSONData()).toEqual({ error: 'Users do not own all the NFTs' })
  // })
  // it('if addOffer fails, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   mockedAddOffer.mockRejectedValueOnce(Error('test'))
  //   await createOffer(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  // })
  // it('if addOffer rejects, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   mockedAddOffer.mockRejectedValueOnce(Error('test'))
  //   await createOffer(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  // })
  // it('if updateRequestForOfferOffers reject, returns 500', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res, 'reject')
  //   expect(res.statusCode).toBe(500)
  //   expect(res._getJSONData()).toEqual({ error: 'Could not create offer' })
  // })
  // it('if addOffer success (with request for offer), returns 200 with object', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res, 'jUzMtPGKM62mMhEcmbN4')
  //   expect(res.statusCode).toBe(200)
  //   expect(res._getJSONData()).toEqual(mockOffer)
  // })
  // it('if addOffer success (without request for offer), returns 200 with object', async () => {
  //   const { res } = mockRequestResponse<CreateOfferRequest, never, FirestoreOfferData>('GET')
  //   await createOffer(mockUser, mockSenderItems, mockUser, mockReceiverItems, discordGuild, res)
  //   expect(res.statusCode).toBe(200)
  //   expect(res._getJSONData()).toEqual(mockOffer)
  // })
  it('TODO', () => {
    expect(true).toBeTruthy()
  })
})
