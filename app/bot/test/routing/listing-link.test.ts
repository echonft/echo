import { listingLink } from '../../src/routing/listing-link'
import { getListingItemsGuild } from '@echo/firestore/helpers/listing/get-listing-items-guild'
import { getListingMockById } from '@echo/firestore-mocks/get-listing-mock-by-id'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - listingLink', () => {
  const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  test('returns link with listing', () => {
    expect(listingLink(listing.id, getListingItemsGuild(listing).discordId)).toEqual(
      `https://echonft.xyz/collection/${getListingItemsGuild(listing).discordId}/listings/${listing.id}`
    )
  })
})
