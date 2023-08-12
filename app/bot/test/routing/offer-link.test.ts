import { offerLink } from '../../src/routing/offer-link'
import { FirestoreOfferData } from '@echo/firestore'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - offerLink', () => {
  const mockOffer: FirestoreOfferData = { id: 'id', discordGuild: { discordId: 'discordId' } } as FirestoreOfferData
  test('returns link with offer', () => {
    expect(offerLink(mockOffer)).toEqual(
      `https://echonft.xyz/collection/${mockOffer.discordGuild.discordId}/offers/${mockOffer.id}`
    )
  })
})
