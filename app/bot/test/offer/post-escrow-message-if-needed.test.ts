import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { postEscrowMessageIfNeeded } from '@echo/bot/offer/post-escrow-message-if-needed'
import { getOfferUpdatesByOfferId } from '@echo/firestore/crud/offer-update/get-offer-updates-by-offer-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import type { Offer } from '@echo/model/types/offer'
import { offerMock, offerMockFromJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import type { AnyThreadChannel } from 'discord.js'
import { assocPath } from 'ramda'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/offer-update/get-offer-updates-by-offer-id')
jest.mock('@echo/bot/helpers/send-to-thread')

describe('offer - postEscrowMessageIfNeeded', () => {
  const offer: Offer = offerMock[offerMockFromJohnnycageId()]!
  const offerThread = { offerId: offerMockFromJohnnycageId(), guild: { threadId: 'test' } } as unknown as OfferThread
  const thread = {} as unknown as AnyThreadChannel<boolean>
  const offerUpdate: OfferUpdate = {
    offerId: offerMockFromJohnnycageId(),
    update: {
      kind: 'state',
      args: {
        state: 'OPEN',
        trigger: {
          by: 'system'
        }
      }
    },
    createdAt: Date.now()
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
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: openOffer })
    expect(sendToThread).not.toBeCalled()

    const acceptedOffer = { ...offer, state: 'ACCEPTED' } as Offer
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: acceptedOffer })
    expect(sendToThread).not.toBeCalled()

    const cancelledOffer = { ...offer, state: 'CANCELLED' } as Offer
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: cancelledOffer })
    expect(sendToThread).not.toBeCalled()

    await postEscrowMessageIfNeeded({ offerThread, thread, offer })
    expect(sendToThread).not.toBeCalled()
  })

  it('if one user is in escrow and offer is rejected, sendToThread is called once and getUserDiscordId once', async () => {
    const rejectedOffer = { ...offer, state: 'REJECTED' } as Offer
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: rejectedOffer })
    expect(sendToThread).toBeCalledTimes(1)
    expect(getUserByUsername).toBeCalledTimes(1)
  })

  it('if one user is in escrow and offer is expired, sendToThread is called once and getUserDiscordId once', async () => {
    const expiredOffer = { ...offer, state: 'EXPIRED' } as Offer
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: expiredOffer })
    expect(sendToThread).toBeCalledTimes(1)
    expect(getUserByUsername).toBeCalledTimes(1)
  })

  it('if both users are in escrow and offer is expired, sendToThread is called once and getUserDiscordId twice', async () => {
    const expiredOffer = { ...offer, state: 'EXPIRED' } as Offer
    jest
      .mocked(getOfferUpdatesByOfferId)
      .mockResolvedValueOnce([offerUpdate, assocPath(['update', 'args', 'state'], 'ACCEPTED', offerUpdate)])
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: expiredOffer })
    expect(sendToThread).toBeCalledTimes(1)
    expect(getUserByUsername).toBeCalledTimes(2)
  })

  it('if both users are in escrow and offer is rejected, sendToThread is called once and getUserDiscordId twice', async () => {
    const rejectedOffer = { ...offer, state: 'REJECTED' } as Offer
    jest
      .mocked(getOfferUpdatesByOfferId)
      .mockResolvedValueOnce([offerUpdate, assocPath(['update', 'args', 'state'], 'ACCEPTED', offerUpdate)])
    await postEscrowMessageIfNeeded({ offerThread, thread, offer: rejectedOffer })
    expect(sendToThread).toBeCalledTimes(1)
    expect(getUserByUsername).toBeCalledTimes(2)
  })
})
