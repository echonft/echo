import { getOfferGuild } from '../../src/helpers/get-offer-guild'
import { offerLink } from '../../src/routing/offer-link'
import { offerMock } from '@echo/firestore'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - offerLink', () => {
  const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
  test('returns link with offer', () => {
    expect(offerLink(offer)).toEqual(
      `https://echonft.xyz/collection/${getOfferGuild(offer).discordId}/offers/${offer.id}`
    )
  })
})
