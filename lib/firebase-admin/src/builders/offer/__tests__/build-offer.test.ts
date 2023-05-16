import { FirestoreOfferPrototype } from '../../../types/prototypes/offer/firestore-offer-prototype'
import { buildOffer } from '../build-offer'
import { FirestoreOffer } from '@echo/firestore'
import { mockOffer, OfferState } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

function isOfferProper(offer: FirestoreOffer) {
  expect(offer.sender.id).toEqual('oE6yUEQBPn7PZ89yMjKn')
  expect(offer.discordGuild.id).toEqual('xA40abnyBq6qQHSYmtHj')
  expect(offer.state).toEqual(OfferState.OPEN)
  expect(offer.activities).toHaveLength(1)
  expect(offer.activities[0]?.toState).toEqual(OfferState.OPEN)
  expect(offer.postedAt).toBeUndefined()
  expect(offer.threadId).toBeUndefined()
  expect(offer.senderItems).toHaveLength(1)
  expect(offer.senderItems[0]?.tokenId?.toString()).toEqual(mockOffer.senderItems[0]?.tokenId.toString())
  expect(offer.senderItems[0]?.contract.id).toEqual('37dBlwJYahEAKeL0rNP8')
  expect(offer.receiverItems).toHaveLength(1)
  expect(offer.receiverItems[0]?.tokenId?.toString()).toEqual(mockOffer.receiverItems[0]?.tokenId.toString())
  expect(offer.receiverItems[0]?.contract.id).toEqual('37dBlwJYahEAKeL0rNP8')
}

describe('builders - offer - buildOffer', () => {
  const prototype = {
    discordGuildId: '1',
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: mockOffer.senderItems,
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: mockOffer.receiverItems
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('proper prototype returns an offer', async () => {
    const result = await buildOffer(prototype as unknown as FirestoreOfferPrototype)
    isOfferProper(result)
  })
  it('invalid discord guild will throw', async () => {
    try {
      await buildOffer({ ...prototype, discordGuildId: '123213' } as unknown as FirestoreOfferPrototype)
      expect(false).toBeTruthy()
    } catch (error) {
      expect((error as Error).message).toEqual('buildRequestForOffer Discord Guild does not exist')
    }
  })
})
