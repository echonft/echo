import { getListingsWithNfts } from '../../../src/crud/listing/get-listings-with-nfts'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { listingMock } from '../../mocks/listing-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsWithNfts', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('returns an empty array if no listings NFTs have any of the passed ids', async () => {
    const listings = await getListingsWithNfts(['not', 'found'])
    expect(listings).toEqual([])
  })

  it('returns the listings when an id is found', async () => {
    const listings = await getListingsWithNfts(['8hHFadIrrooORfTOLkBg'])
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })

  it('returns the listings when any of the passed ids are found', async () => {
    const listings = await getListingsWithNfts(['not', 'QFjMRNChUAHNswkRADXh', 'found'])
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })
})
