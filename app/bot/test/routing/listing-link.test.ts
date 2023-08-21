import { listingLink } from '../../src/routing/listing-link'
import { getListingGuild, listingMock } from '@echo/firestore'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - listingLink', () => {
  const listing = listingMock['jUzMtPGKM62mMhEcmbN4']!
  test('returns link with listing', () => {
    expect(listingLink(listing.id, getListingGuild(listing).discordId)).toEqual(
      `https://echonft.xyz/collection/${getListingGuild(listing).discordId}/listings/${listing.id}`
    )
  })
})
