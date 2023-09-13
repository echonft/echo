import { getListingItemsGuild } from '@echo/firestore/helpers/listing/get-listing-items-guild'
import { getListingMockById } from '@echo/firestore-mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - getListingItemsGuild', () => {
  it('Returns the guild associated with the creator items', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    expect(getListingItemsGuild(listing)).toStrictEqual({
      discordId: '1',
      channelId: '1'
    })
  })
})
