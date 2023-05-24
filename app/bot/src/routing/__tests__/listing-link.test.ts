import { listingLink } from '../listing-link'
import { requestsForOffer } from '@echo/model'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../get-base-url', () => ({
  getBaseUrl: () => 'https://echonft.xyz'
}))

describe('Routing - listingLink', () => {
  const mockRequestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  test('returns link with listing', () => {
    expect(listingLink(mockRequestForOffer)).toEqual(
      `https://echonft.xyz/collection/${mockRequestForOffer.discordGuild.discordId}/listings/${mockRequestForOffer.id}`
    )
  })
})
