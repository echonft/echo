import { assertListing } from '@echo/frontend/lib/helpers/listing/assert/assert-listing'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'

describe('helpers - listing - assert - assertListing', () => {
  it('throws if listing is undefined', () => {
    expect(() => assertListing(undefined)).toThrow()
  })
  it('does not throw if listing is defined', () => {
    expect(() => assertListing(getListingMock())).not.toThrow()
  })
})
