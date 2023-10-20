import { type Listing } from '@echo/model/types/listing'
import { assertListingCreatorIs } from '@server/helpers/listing/assert/assert-listing-creator-is'

describe('helpers - listing - assert - assertListingCreatorIs', () => {
  it('throws if listing creator does not have the passed username', () => {
    expect(() => assertListingCreatorIs({ state: 'OPEN' } as Listing, 'username')).toThrow()
    expect(() => assertListingCreatorIs({ creator: {} } as Listing, 'username')).toThrow()
    expect(() => assertListingCreatorIs({ creator: { username: 'not-the-same' } } as Listing, 'username')).toThrow()
  })

  it('does not throw if listing creator has the passed username', () => {
    expect(() => assertListingCreatorIs({ creator: { username: 'username' } } as Listing, 'username')).not.toThrow()
  })
})
