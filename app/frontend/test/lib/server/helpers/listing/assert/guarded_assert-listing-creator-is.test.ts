import { guarded_assertListingCreatorIs } from '@echo/frontend/lib/helpers/listing/assert/guarded_assert-listing-creator-is'
import { LISTING_STATE_OPEN } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'

describe('helpers - listing - assert - assertListingCreatorIs', () => {
  it('throws if listing creator does not have the passed username', () => {
    expect(() => guarded_assertListingCreatorIs({ state: LISTING_STATE_OPEN } as Listing, 'username')).toThrow()
    expect(() => guarded_assertListingCreatorIs({ creator: {} } as Listing, 'username')).toThrow()
    expect(() =>
      guarded_assertListingCreatorIs({ creator: { username: 'not-the-same' } } as Listing, 'username')
    ).toThrow()
  })

  it('does not throw if listing creator has the passed username', () => {
    expect(() =>
      guarded_assertListingCreatorIs({ creator: { username: 'username' } } as Listing, 'username')
    ).not.toThrow()
  })
})
