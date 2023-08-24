import { getListingsForOfferId } from '../../../src/crud/listing/get-listings-for-offer-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { acceptOffer } from '../../../src/crud/offer/accept-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { Offer } from '../../../src/types/model/offer'
import { OfferState } from '../../../src/types/model/offer-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'
import { filter, map, pick, propEq } from 'ramda'

describe('CRUD - offer - acceptOffer', () => {
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

  it('throws if the offer is expired', async () => {
    try {
      await acceptOffer(id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toEqual('offer expired')
    }
  })

  it('accept offer if its not expired', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await updateOffer(id, { expiresAt: dayjs().add(1, 'day') })
    await acceptOffer(id)
    const updatedOffer = await findOfferById(id)
    expect(updatedOffer!.state).toEqual('ACCEPTED')
    const listings = await getListingsForOfferId(id)
    for (const listing of listings) {
      const offers = filter(propEq(id, 'id'), listing.offers)
      for (const offer of offers) {
        expect(offer.state).toEqual('ACCEPTED')
      }
    }
  })
})
