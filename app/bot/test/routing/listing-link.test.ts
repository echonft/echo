import { requestsForOffer } from '@echo/model'
import { describe, expect, jest, test } from '@jest/globals'
import { listingLink } from '../../src/routing/listing-link'

jest.mock('../../src/routing/get-base-url')

describe('Routing - listingLink', () => {
  const mockRequestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  test('returns link with listing', () => {
    expect(listingLink(mockRequestForOffer)).toEqual(
      `https://echonft.xyz/collection/${mockRequestForOffer.discordGuild.discordId}/listings/${mockRequestForOffer.id}`
    )
  })
})
