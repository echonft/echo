import { buildOffer } from '../../../src/builders/offer/build-offer'
import { offers } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

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
  // FIXME Not working
  // it('proper prototype returns an offer', async () => {
  //   const offer = await buildOffer(prototype)
  //   expect(offer).toEqual(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi'])
  // })
  it('invalid discord guild will throw', async () => {
    try {
      await buildOffer({ ...prototype, discordGuildId: '123213' })
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBe('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found')
    }
  })
})
