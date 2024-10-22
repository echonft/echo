import { describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/offer-update/get-offer-updates-by-offer-id')
jest.mock('@echo/bot/helpers/send-to-thread')

// FIXME
describe('offer - postEscrowMessage', () => {
  it('FIXME', () => {
    expect(true).toBeTruthy()
  })
  // const offer: Offer = getOfferMockById(offerMockFromJohnnycageId())
  // const offerThread = {
  //   offerId: offerMockFromJohnnycageId(),
  //   guild: { threadId: 'test' }
  // } as unknown as OfferThreadDocumentData
  // const thread = {} as unknown as AnyThreadChannel
  // const offerUpdate: OfferUpdateDocumentData = {
  //   offerId: offerMockFromJohnnycageId(),
  //   update: {
  //     kind: OfferUpdateKind.State,
  //     args: {
  //       state: 'OPEN',
  //       trigger: {
  //         by: 'system'
  //       }
  //     }
  //   }
  // }
  //
  // beforeAll(async () => {
  //   jest.mocked(getOfferUpdatesByOfferId).mockImplementation(() => Promise.resolve([offerUpdate]))
  //   jest.mocked(sendToThread).mockResolvedValue(undefined)
  //   jest
  //     .mocked(getUserByUsername)
  //     .mockImplementation((username) => Promise.resolve(getUserDocumentDataMockByUsername(username)))
  //   await initializeTranslations()
  // })
  //
  // afterEach(() => {
  //   jest.clearAllMocks()
  // })
  //
  // it('if no escrow message are to be posted, sendToThread is not called', async () => {
  //   const openOffer = { ...offer, state: 'OPEN' } as Offer
  //   await postEscrowMessage({ offerThread, thread, offer: openOffer })
  //   expect(sendToThread).not.toHaveBeenCalled()
  //
  //   const acceptedOffer = { ...offer, state: 'ACCEPTED' } as Offer
  //   await postEscrowMessage({ offerThread, thread, offer: acceptedOffer })
  //   expect(sendToThread).not.toHaveBeenCalled()
  //
  //   const cancelledOffer = { ...offer, state: 'CANCELLED' } as Offer
  //   await postEscrowMessage({ offerThread, thread, offer: cancelledOffer })
  //   expect(sendToThread).not.toHaveBeenCalled()
  //
  //   await postEscrowMessage({ offerThread, thread, offer })
  //   expect(sendToThread).not.toHaveBeenCalled()
  // })
  //
  // it('if one user is in escrow and offer is rejected, sendToThread is called once and getUserDiscordId once', async () => {
  //   const rejectedOffer = assoc('state', OfferState.Rejected, offer)
  //   await postEscrowMessage({ offerThread, thread, offer: rejectedOffer })
  //   expect(sendToThread).toHaveBeenCalledTimes(1)
  //   expect(getUserByUsername).toHaveBeenCalledTimes(1)
  // })
  //
  // it('if one user is in escrow and offer is expired, sendToThread is called once and getUserDiscordId once', async () => {
  //   const expiredOffer = assoc('state', OfferState.Expired, offer)
  //   await postEscrowMessage({ offerThread, thread, offer: expiredOffer })
  //   expect(sendToThread).toHaveBeenCalledTimes(1)
  //   expect(getUserByUsername).toHaveBeenCalledTimes(1)
  // })
  //
  // it('if both users are in escrow and offer is expired, sendToThread is called once and getUserDiscordId twice', async () => {
  //   const expiredOffer = assoc('state', OfferState.Expired, offer)
  //   jest
  //     .mocked(getOfferUpdatesByOfferId)
  //     .mockResolvedValueOnce([offerUpdate, assocPath(['update', 'args', 'state'], 'ACCEPTED', offerUpdate)])
  //   await postEscrowMessage({ offerThread, thread, offer: expiredOffer })
  //   expect(sendToThread).toHaveBeenCalledTimes(1)
  //   expect(getUserByUsername).toHaveBeenCalledTimes(2)
  // })
  //
  // it('if both users are in escrow and offer is rejected, sendToThread is called once and getUserDiscordId twice', async () => {
  //   const rejectedOffer = assoc('state', OfferState.Rejected, offer)
  //   jest
  //     .mocked(getOfferUpdatesByOfferId)
  //     .mockResolvedValueOnce([offerUpdate, assocPath(['update', 'args', 'state'], 'ACCEPTED', offerUpdate)])
  //   await postEscrowMessage({ offerThread, thread, offer: rejectedOffer })
  //   expect(sendToThread).toHaveBeenCalledTimes(1)
  //   expect(getUserByUsername).toHaveBeenCalledTimes(2)
  // })
})
