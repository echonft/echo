import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { assertListingCreatorIs } from '@server/helpers/listing/assert-listing-creator-is'

describe('helpers - listing - assertListingCreatorIs', () => {
  it('throws if listing creator does not have the passed username', () => {
    expect(() => assertListingCreatorIs({ state: 'OPEN' } as FirestoreListing, 'username')).toThrow()
    expect(() => assertListingCreatorIs({ creator: {} } as FirestoreListing, 'username')).toThrow()
    expect(() =>
      assertListingCreatorIs({ creator: { username: 'not-the-same' } } as FirestoreListing, 'username')
    ).toThrow()
  })

  it('does not throw if listing creator has the passed username', () => {
    expect(() =>
      assertListingCreatorIs({ creator: { username: 'username' } } as FirestoreListing, 'username')
    ).not.toThrow()
  })
})
