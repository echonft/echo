import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { type OfferState } from '@echo/model/types/offer-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - offer - acceptOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const signature =
    '0x4d374b2212ea29483f6aba22a36bd9706fa410aa20e9954e39e407fd8018370a2315258d336fafca5c5a826dd992a91bca81e1d920d4bcc4bceee95b26682c7e1b'

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
    await expect(acceptOffer('not-found', signature)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(acceptOffer(offerId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, signature)).rejects.toBeDefined()
  })
  it('accept offer', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await acceptOffer(offerId, signature)
    const updatedOffer = (await findOfferById(offerId))!
    expect(updatedOffer.state).toEqual('ACCEPTED')
    expect(updatedOffer.signature).toEqual(signature)
    expectDateNumberIsNow(updatedOffer.updatedAt)
  })
})
