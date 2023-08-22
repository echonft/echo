import { getOfferReceiverGuild } from '../../../src/helpers/offer/get-offer-receiver-guild'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferSenderGuild', () => {
  it('Returns the guild associated with the sender items', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(getOfferReceiverGuild(offer)).toStrictEqual({
      discordId: '1',
      channelId: '1'
    })
  })
})
