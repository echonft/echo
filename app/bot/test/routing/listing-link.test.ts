import { listingLink } from '../../src/routing/listing-link'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - listingLink', () => {
  const mockRequestForOffer = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
  test('returns link with listing', () => {
    expect(listingLink(mockRequestForOffer)).toEqual(
      `https://echonft.xyz/collection/${mockRequestForOffer.discordGuild.discordId}/listings/${mockRequestForOffer.id}`
    )
  })
})
