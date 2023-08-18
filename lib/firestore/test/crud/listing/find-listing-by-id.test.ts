import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { listingMock } from '../../mocks/listing-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - findListingById', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the listing is not found', async () => {
    try {
      await findListingById('not-found')
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the listing with the given id', async () => {
    const listing = await findListingById('jUzMtPGKM62mMhEcmbN4')
    expect(listing).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })
})
