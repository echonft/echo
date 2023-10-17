import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - offer - rejectOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOffers()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const offer = (await findOfferById(offerId))!
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
    initialUpdatedAt = offer.updatedAt
  })
  afterEach(async () => {
    await uncheckedUpdateOffer(offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
  })

  it('throws if the offer is undefined', async () => {
    await expect(rejectOffer('not-found')).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(rejectOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(rejectOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(rejectOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(rejectOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(rejectOffer(offerId)).rejects.toBeDefined()
  })
  it('reject offer if its not expired', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await rejectOffer(offerId)
    const updatedOffer = (await findOfferById(offerId))!
    expect(updatedOffer.state).toEqual('REJECTED')
    expectDateNumberIsNow(updatedOffer.updatedAt)
  })
})
