import { buildOffer } from '../../src/builders/offer/build-offer'
import { FirestoreOffer } from '@echo/firestore'
import { offers, OfferState } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

function isOfferProper(offer: FirestoreOffer) {
  expect(offer.sender.id).toEqual('oE6yUEQBPn7PZ89yMjKn')
  expect(offer.discordGuild.id).toEqual('xA40abnyBq6qQHSYmtHj')
  expect(offer.state).toEqual(OfferState.OPEN)
  expect(offer.activities).toHaveLength(1)
  expect(offer.activities[0]?.toState).toEqual(OfferState.OPEN)
  expect(offer.postedAt).toBeUndefined()
  expect(offer.threadId).toBeUndefined()
  expect(offer.senderItems).toStrictEqual(offers['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems)
  expect(offer.receiverItems).toStrictEqual(offers['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems)
}

describe('builders - offer - buildOffer', () => {
  const prototype = {
    discordGuildId: '1',
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: offers['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map((nft) => nft.id),
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: offers['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('proper prototype returns an offer', async () => {
    const result = await buildOffer(prototype)
    isOfferProper(result)
  })
  it('invalid discord guild will throw', async () => {
    try {
      await buildOffer({ ...prototype, discordGuildId: '123213' })
      expect(false).toBeTruthy()
    } catch (error) {
      expect((error as Error).message).toEqual('buildRequestForOffer Discord Guild does not exist')
    }
  })
})
