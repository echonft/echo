import { getListingTargetsGuilds } from '../../../src/helpers/listing/get-listing-targets-guilds'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - getListingTargetsGuilds', () => {
  it('Returns the guild associated with the listing targets', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const guilds = getListingTargetsGuilds(listing)
    expect(guilds.length).toEqual(1)
    expect(guilds[0]).toStrictEqual({
      discordId: '100',
      channelId: '100'
    })
  })
})
