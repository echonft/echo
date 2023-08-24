import { getListingGuild } from '../../../src/helpers/listing/get-listing-guild'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - getListingGuild', () => {
  it('Returns the guild associated with the creator items', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    expect(getListingGuild(listing)).toStrictEqual({
      discordId: '1',
      channelId: '1'
    })
  })
})
