import { linkForListing } from '../listing'
import { Offer } from '@echo/model'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('@echo/api', () => ({
  getApiUrl: () => 'https://echonft.xyz'
}))

describe('listing util - linkForListing', () => {
  const mockOffer = { id: '1', discordGuild: { discordId: '2' } } as unknown as Offer
  test('returns link with listing', () => {
    expect(linkForListing(mockOffer)).toEqual('https://echonft.xyz/2/1')
  })
})
