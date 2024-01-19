import { OFFER_FILTER_AS_RECEIVER, OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assoc, either, filter, find, forEach, pathEq, propEq } from 'ramda'

describe('CRUD - offer - getOffersForUser', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns the offers for the user (as a receiver or a sender)', async () => {
    const username = 'johnnycagewins'
    const userOfferMocks = filter(
      either(pathEq(username, ['sender', 'username']), pathEq(username, ['receiver', 'username'])),
      getAllOfferMocks()
    )
    const offers = await getOffersForUser(username)
    expect(offers.length).toBe(userOfferMocks.length)
    forEach((offer: Offer) => {
      const offerMock = find(propEq(offer.id, 'id'), userOfferMocks)
      expect(offer).toStrictEqual(offerMock)
    }, offers)
  })

  describe('CRUD - offer - getOffersForUser - as receiver', () => {
    const id = 'LyCfl6Eg7JKuD7XJ6IPi'
    const username = 'johnnycagewins'
    const mock = getOfferMockById(id)
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_RECEIVER }

    it('returns an empty array if no offers are found', async () => {
      const offers = await getOffersForUser('not-found', filters)
      expect(offers).toEqual([])
    })

    it('returns the offers for the receiver', async () => {
      const offers = await getOffersForUser(username, filters)
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      let offers = await getOffersForUser(username, assoc('state', [OFFER_STATE_OPEN, OFFER_STATE_CANCELLED], filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('state', [OFFER_STATE_CANCELLED], filters))
      expect(offers.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      let offers = await getOffersForUser(
        username,
        assoc('notState', [OFFER_STATE_REJECTED, OFFER_STATE_CANCELLED], filters)
      )
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('notState', [OFFER_STATE_OPEN, OFFER_STATE_ACCEPTED], filters))
      expect(offers.length).toBe(0)
    })
  })

  describe('CRUD - offer - getOffersForUser - as sender', () => {
    const id = 'LyCfl6Eg7JKuD7XJ6IPi'
    const username = 'crewnft_'
    const mock = getOfferMockById(id)
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_SENDER }

    it('returns an empty array if no offers are found', async () => {
      const offers = await getOffersForUser('not-found', filters)
      expect(offers).toEqual([])
    })

    it('returns the offers for the sender', async () => {
      const offers = await getOffersForUser(username, filters)
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      let offers = await getOffersForUser(username, assoc('state', [OFFER_STATE_OPEN, OFFER_STATE_CANCELLED], filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('state', [OFFER_STATE_CANCELLED], filters))
      expect(offers.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      let offers = await getOffersForUser(
        username,
        assoc('notState', [OFFER_STATE_REJECTED, OFFER_STATE_CANCELLED], filters)
      )
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('notState', [OFFER_STATE_OPEN, OFFER_STATE_ACCEPTED], filters))
      expect(offers.length).toBe(0)
    })
  })
})
