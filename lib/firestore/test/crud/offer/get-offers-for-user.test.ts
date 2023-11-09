import { OFFER_FILTER_AS_RECEIVER, OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type Offer } from '@echo/model/types/offer'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, either, filter, find, forEach, pathEq, pipe, propEq } from 'ramda'

describe('CRUD - offer - getOffersForUser', () => {
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: number

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(async () => {
    const offer = (await findOfferById(id))!
    initialExpiresAt = offer.expiresAt
  })
  afterEach(async () => {
    await unchecked_updateOffer(id, { expiresAt: initialExpiresAt })
  })

  async function setExpired(offer: Offer) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0).unix()
    await unchecked_updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(offer)
  }

  async function setNotExpired(offer: Offer) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0).unix()
    await unchecked_updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(offer)
  }

  it('returns the offers for the user (as a receiver or a sender)', async () => {
    const username = 'johnnycagewins'
    const userOfferMocks = filter(
      either(pathEq(username, ['sender', 'username']), pathEq(username, ['receiver', 'username'])),
      getAllOfferMocks()
    )
    const offers = await getOffersForUser(username, { includeExpired: true })
    expect(offers.length).toBe(userOfferMocks.length)
    forEach((offer: Offer) => {
      const offerMock = find(propEq(offer.id, 'id'), userOfferMocks)
      expect(offer).toStrictEqual(offerMock)
    }, offers)
  })

  describe('CRUD - offer - getOffersForUser - as receiver', () => {
    const id = 'LyCfl6Eg7JKuD7XJ6IPi'
    let initialExpiresAt: number
    const username = 'johnnycagewins'
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_RECEIVER }

    beforeEach(async () => {
      const offer = (await findOfferById(id))!
      initialExpiresAt = offer.expiresAt
    })
    afterEach(async () => {
      await unchecked_updateOffer(id, { expiresAt: initialExpiresAt })
    })

    it('returns an empty array if no offers are found', async () => {
      const offers = await getOffersForUser('not-found', filters)
      expect(offers).toEqual([])
    })

    it('returns the offers for the receiver', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      const offers = await getOffersForUser(username, filters)
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let offers = await getOffersForUser(username, assoc('state', ['OPEN', 'CANCELLED'], filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('state', ['CANCELLED'], filters))
      expect(offers.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let offers = await getOffersForUser(username, assoc('notState', ['REJECTED', 'CANCELLED'], filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('notState', ['OPEN', 'ACCEPTED'], filters))
      expect(offers.length).toBe(0)
    })

    it('includeExpired filter', async () => {
      const mock = await setExpired(getOfferMockById(id))
      let offers = await getOffersForUser(username, assoc('includeExpired', true, filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('includeExpired', false, filters))
      expect(offers.length).toBe(0)
      offers = await getOffersForUser(username, filters)
      expect(offers.length).toBe(0)
    })
  })

  describe('CRUD - offer - getOffersForUser - as sender', () => {
    const id = 'LyCfl6Eg7JKuD7XJ6IPi'
    let initialExpiresAt: number
    const username = 'crewnft_'
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_SENDER }

    beforeEach(async () => {
      const offer = (await findOfferById(id))!
      initialExpiresAt = offer.expiresAt
    })
    afterEach(async () => {
      await unchecked_updateOffer(id, { expiresAt: initialExpiresAt })
    })

    it('returns an empty array if no offers are found', async () => {
      const offers = await getOffersForUser('not-found', filters)
      expect(offers).toEqual([])
    })

    it('returns the offers for the sender', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      const offers = await getOffersForUser(username, filters)
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let offers = await getOffersForUser(username, assoc('state', ['OPEN', 'CANCELLED'], filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('state', ['CANCELLED'], filters))
      expect(offers.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let offers = await getOffersForUser(username, assoc('notState', ['REJECTED', 'CANCELLED'], filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('notState', ['OPEN', 'ACCEPTED'], filters))
      expect(offers.length).toBe(0)
    })

    it('includeExpired filter', async () => {
      const mock = await setExpired(getOfferMockById(id))
      let offers = await getOffersForUser(username, assoc('includeExpired', true, filters))
      expect(offers.length).toBe(1)
      expect(offers[0]).toStrictEqual(mock)
      offers = await getOffersForUser(username, assoc('includeExpired', false, filters))
      expect(offers.length).toBe(0)
      offers = await getOffersForUser(username, filters)
      expect(offers.length).toBe(0)
    })
  })
})
