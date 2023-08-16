import { buildOffer } from '../../../src/builders/offer/build-offer'
import { offerFirestoreData } from '../../mocks/offer/offer-firestore-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { prop } from 'ramda'

describe('builders - offer - buildOffer', () => {
  const prototype = {
    discordGuildId: '1',
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map(prop('id')),
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map(prop('id'))
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
