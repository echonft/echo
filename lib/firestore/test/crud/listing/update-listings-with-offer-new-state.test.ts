import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { updateListingsWithOfferNewState } from '../../../src/crud/listing/update-listings-with-offer-new-state'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { Offer } from '../../../src/types/model/offer'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { find, propEq } from 'ramda'

describe('CRUD - listing - updateListingsWithOfferNewState', () => {
  let initialOffers: Offer[]
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialOffers = listing!.offers
  })
  afterEach(async () => {
    await updateListing(id, { offers: initialOffers })
  })

  it('updateListingsWithOfferNewState', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await updateListingsWithOfferNewState('LyCfl6Eg7JKuD7XJ6IPi', 'CANCELLED')
    const listing = await findListingById(id)
    const { offers } = listing!
    const updatedOffer = find(propEq('LyCfl6Eg7JKuD7XJ6IPi', 'id'), offers)!
    expect(updatedOffer.state).toEqual('CANCELLED')
  })
})
