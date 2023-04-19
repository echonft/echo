import { createListingLink } from '../create-listing-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('@echo/api', () => ({
  __esModule: true,
  getServerConfig: () => ({
    url: 'https://echonft.xyz'
  })
}))
describe('Routing - createListingLink', () => {
  test('returns link for collection listing creation', () => {
    expect(createListingLink('1')).toEqual('https://echonft.xyz/collection/1/listings/create')
  })
})
