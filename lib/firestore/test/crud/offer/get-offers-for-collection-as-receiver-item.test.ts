import { findOfferById, getOfferMockById } from '../../../src'
import { getOffersForCollectionAsReceiverItem } from '../../../src/crud/offer/get-offers-for-collection-as-receiver-item'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Offer } from '@echo/firestore-types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForCollectionAsReceiverItem', () => {
  const collectionId = '1aomCtnoesD7WVll6Yi1'
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: dayjs.Dayjs

  async function setExpired(offer: Offer) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0)
    await updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(offer)
  }

  async function setNotExpired(offer: Offer) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0)
    await updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(offer)
  }

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialExpiresAt = offer!.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no offers are found', async () => {
    const listings = await getOffersForCollectionAsReceiverItem('not-found')
    expect(listings).toEqual([])
  })

  it('returns the offers for the which the collection is included in the receiver items', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    const listings = await getOffersForCollectionAsReceiverItem(collectionId)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let listings = await getOffersForCollectionAsReceiverItem(collectionId, { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollectionAsReceiverItem(collectionId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let listings = await getOffersForCollectionAsReceiverItem(collectionId, { notStates: ['INVALID', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollectionAsReceiverItem(collectionId, { notStates: ['OPEN', 'FULFILLED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getOfferMockById(id))
    let listings = await getOffersForCollectionAsReceiverItem(collectionId, { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollectionAsReceiverItem(collectionId, { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getOffersForCollectionAsReceiverItem(collectionId)
    expect(listings.length).toBe(0)
  })
})
