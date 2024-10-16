import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { postEscrowMessage } from '@echo/bot/offer/post-escrow-message'
import { OfferUpdateKind } from '@echo/firestore/constants/offer-update-kind'
import { getOfferUpdatesByOfferId } from '@echo/firestore/crud/offer-update/get-offer-updates-by-offer-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import type { OfferUpdateDocumentData } from '@echo/firestore/types/model/offer-update-document-data'
import { OFFER_STATE_EXPIRED, OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import type { AnyThreadChannel } from 'discord.js'
import { assoc, assocPath } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/offer-update/get-offer-updates-by-offer-id')
jest.mock('@echo/bot/helpers/send-to-thread')

describe('offer - postEscrowMessageIfNeeded', () => {
  const offer: Offer = getOfferMockById(offerMockFromJohnnycageId())
  const offerThread = {
    offerId: offerMockFromJohnnycageId(),
    guild: { threadId: 'test' }
  } as unknown as OfferThreadDocumentData
  const thread = {} as unknown as AnyThreadChannel
  const offerUpdate: OfferUpdateDocumentData = {
    offerId: offerMockFromJohnnycageId(),
    update: {
      kind: OfferUpdateKind.State,
      args: {
        state: 'OPEN',
        trigger: {
          by: 'system'
        }
      }
    }
  }

  beforeAll(async () => {
    jest.mocked(getOfferUpdatesByOfferId).mockImplementation(() => Promise.resolve([offerUpdate]))
    jest.mocked(sendToThread).mockResolvedValue(undefined)
    jest
      .mocked(getUserByUsername)
      .mockImplementation((username) => Promise.resolve(getUserDocumentDataMockByUsername(username)))
    await initializeTranslations()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  it('if no escrow message are to be posted, sendToThread is not called', async () => {
    const openOffer = { ...offer, state: 'OPEN' } as Offer
    await postEscrowMessage({ offerThread, thread, offer: openOffer })
    expect(sendToThread).not.toHaveBeenCalled()

    const acceptedOffer = { ...offer, state: 'ACCEPTED' } as Offer
    await postEscrowMessage({ offerThread, thread, offer: acceptedOffer })
    expect(sendToThread).not.toHaveBeenCalled()

    const cancelledOffer = { ...offer, state: 'CANCELLED' } as Offer
    await postEscrowMessage({ offerThread, thread, offer: cancelledOffer })
    expect(sendToThread).not.toHaveBeenCalled()

    await postEscrowMessage({ offerThread, thread, offer })
    expect(sendToThread).not.toHaveBeenCalled()
  })

  it('if one user is in escrow and offer is rejected, sendToThread is called once and getUserDiscordId once', async () => {
    const rejectedOffer = assoc('state', OFFER_STATE_REJECTED, offer)
    await postEscrowMessage({ offerThread, thread, offer: rejectedOffer })
    expect(sendToThread).toHaveBeenCalledTimes(1)
    expect(getUserByUsername).toHaveBeenCalledTimes(1)
  })

  it('if one user is in escrow and offer is expired, sendToThread is called once and getUserDiscordId once', async () => {
    const expiredOffer = assoc('state', OFFER_STATE_EXPIRED, offer)
    await postEscrowMessage({ offerThread, thread, offer: expiredOffer })
    expect(sendToThread).toHaveBeenCalledTimes(1)
    expect(getUserByUsername).toHaveBeenCalledTimes(1)
  })

  it('if both users are in escrow and offer is expired, sendToThread is called once and getUserDiscordId twice', async () => {
    const expiredOffer = assoc('state', OFFER_STATE_EXPIRED, offer)
    jest
      .mocked(getOfferUpdatesByOfferId)
      .mockResolvedValueOnce([offerUpdate, assocPath(['update', 'args', 'state'], 'ACCEPTED', offerUpdate)])
    await postEscrowMessage({ offerThread, thread, offer: expiredOffer })
    expect(sendToThread).toHaveBeenCalledTimes(1)
    expect(getUserByUsername).toHaveBeenCalledTimes(2)
  })

  it('if both users are in escrow and offer is rejected, sendToThread is called once and getUserDiscordId twice', async () => {
    const rejectedOffer = assoc('state', OFFER_STATE_REJECTED, offer)
    jest
      .mocked(getOfferUpdatesByOfferId)
      .mockResolvedValueOnce([offerUpdate, assocPath(['update', 'args', 'state'], 'ACCEPTED', offerUpdate)])
    await postEscrowMessage({ offerThread, thread, offer: rejectedOffer })
    expect(sendToThread).toHaveBeenCalledTimes(1)
    expect(getUserByUsername).toHaveBeenCalledTimes(2)
  })
})
