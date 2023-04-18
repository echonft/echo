import { listingLink } from '../listing-ling'
import { Offer } from '@echo/model'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('@echo/api', () => ({
  __esModule: true,
  getServerConfig: () => ({
    url: 'https://echonft.xyz'
  })
}))
describe('Routing - listingLink', () => {
  const mockOffer = { id: '1', discordGuild: { discordId: '2' } } as unknown as Offer
  test('returns link with listing', () => {
    expect(listingLink(mockOffer)).toEqual('https://echonft.xyz/collection/2/listings/1')
  })
})
