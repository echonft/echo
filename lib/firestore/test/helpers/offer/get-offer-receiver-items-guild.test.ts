import { getOfferReceiverItemsGuild } from '@echo/firestore/helpers/offer/get-offer-receiver-items-guild'
import { getOfferMockById } from '@echo/firestore-mocks/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferReceiverItemsGuild', () => {
  it('Returns the guild associated with the receiver items', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(getOfferReceiverItemsGuild(offer)).toStrictEqual({
      discordId: '1',
      channelId: '1'
    })
  })
})
