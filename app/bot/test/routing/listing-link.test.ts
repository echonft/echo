import { listingLink } from '../../src/routing/listing-link'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - listingLink', () => {
  const mockRequestForOffer: FirestoreRequestForOfferData = {
    id: 'id',
    discordGuild: { discordId: 'discordId' }
  } as FirestoreRequestForOfferData
  test('returns link with listing', () => {
    expect(listingLink(mockRequestForOffer.id, mockRequestForOffer.discordGuild.discordId)).toEqual(
      `https://echonft.xyz/collection/${mockRequestForOffer.discordGuild.discordId}/listings/${mockRequestForOffer.id}`
    )
  })
})
