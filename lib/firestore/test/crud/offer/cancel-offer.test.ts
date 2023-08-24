import { acceptOffer } from '../../../src'
import { getListingsForOfferId } from '../../../src/crud/listing/get-listings-for-offer-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { cancelOffer } from '../../../src/crud/offer/cancel-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { Offer } from '../../../src/types/model/offer'
import { OfferState } from '../../../src/types/model/offer-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'
import { filter, map, pick, propEq } from 'ramda'

describe('CRUD - offer - cancelOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: Dayjs
  let initialListingsOffers: { id: string; offers: Offer[] }[]
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialState = offer!.state
    initialExpiresAt = offer!.expiresAt
    const listings = await getListingsForOfferId(id)
    initialListingsOffers = map(pick(['id', 'offers']), listings)
  })
  afterEach(async () => {
    await updateOffer(id, { state: initialState, expiresAt: initialExpiresAt })
    for (const { id, offers } of initialListingsOffers) {
      await updateListing(id, { offers })
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(acceptOffer('not-found')).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(id, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(acceptOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(id, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await updateOffer(id, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(id, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await updateOffer(id, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(id)).rejects.toBeDefined()
  })

  it('cancel offer if its not expired', async () => {
    await updateOffer(id, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await cancelOffer(id)
    const updatedOffer = await findOfferById(id)
    expect(updatedOffer!.state).toEqual('CANCELLED')
    const listings = await getListingsForOfferId(id)
    for (const listing of listings) {
      const offers = filter(propEq(id, 'id'), listing.offers)
      for (const offer of offers) {
        expect(offer.state).toEqual('CANCELLED')
      }
    }
  })
})
