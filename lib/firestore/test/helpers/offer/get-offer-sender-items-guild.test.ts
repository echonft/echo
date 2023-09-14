import { getOfferSenderItemsGuild } from '@echo/firestore/helpers/offer/get-offer-sender-items-guild'
import { getOfferMockById } from '@echo/firestore-mocks/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferSenderItemsGuild', () => {
  it('Returns the guild associated with the sender items', () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(getOfferSenderItemsGuild(offer)).toStrictEqual({
      discordId: '100',
      channelId: '100'
    })
  })
})
