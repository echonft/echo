import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { invalidateOffer } from '../../../src/crud/offer/invalidate-offer'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { OfferState } from '../../../src/types/model/offer-state'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - offer - invalidateOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: Dayjs
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialState = offer!.state
    initialExpiresAt = offer!.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { state: initialState, expiresAt: initialExpiresAt })
  })

  it('throws if the offer is undefined', async () => {
    await expect(invalidateOffer('not-found')).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(id, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(invalidateOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(id, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(id, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(id, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateOffer(id)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await updateOffer(id, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateOffer(id)).rejects.toBeDefined()
  })
  it('invalidate offer', async () => {
    await updateOffer(id, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await invalidateOffer(id)
    const updatedOffer = await findOfferById(id)
    expect(updatedOffer!.state).toEqual('INVALID')
  })
})
