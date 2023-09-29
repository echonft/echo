import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - offer - acceptOffer', () => {
  let initialState: FirestoreOfferState
  let initialExpiresAt: dayjs.Dayjs
  let initialUpdatedAt: dayjs.Dayjs
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
    await updateOffer(offerId, { state: initialState, expiresAt: initialExpiresAt, updatedAt: initialUpdatedAt })
  })

  it('throws if the offer is undefined', async () => {
    await expect(acceptOffer('not-found')).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(acceptOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await updateOffer(offerId, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await updateOffer(offerId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day') })
    await expect(acceptOffer(offerId)).rejects.toBeDefined()
  })
  it('accept offer', async () => {
    await updateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await acceptOffer(offerId)
    const updatedOffer = (await findOfferById(offerId))!
    expect(updatedOffer.state).toEqual('ACCEPTED')
    expectDateIsNow(updatedOffer.updatedAt)
  })
})
