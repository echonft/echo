import { getListingsForOfferId } from '../../../src/crud/listing/get-listings-for-offer-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { listingMock } from '../../mocks/listing-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsForOfferId', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array there are no listings with the given offer', async () => {
    const listings = await getListingsForOfferId('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings when an id is found', async () => {
    const listings = await getListingsForOfferId('LyCfl6Eg7JKuD7XJ6IPi')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })
})
