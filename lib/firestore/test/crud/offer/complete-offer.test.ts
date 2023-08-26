import { completeOffer } from '../../../src/crud/offer/complete-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { OfferState } from '../../../src/types/model/offer-state'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - offer - completeOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: Dayjs
  let initialSwapTransactionId: string | undefined
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  const swapTransactionId = 'swap-transaction-id'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialState = offer!.state
    initialExpiresAt = offer!.expiresAt
    initialSwapTransactionId = offer!.swapTransactionId
  })
  afterEach(async () => {
    await updateOffer(id, {
      state: initialState,
      expiresAt: initialExpiresAt,
      swapTransactionId: initialSwapTransactionId
    })
  })

  it('throws if the offer is undefined', async () => {
    await expect(completeOffer('not-found', swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(id, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(completeOffer(id, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(id, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(completeOffer(id, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(id, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day') })
    await expect(completeOffer(id, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(id, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day') })
    await expect(completeOffer(id, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await updateOffer(id, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(completeOffer(id, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is open', async () => {
    await updateOffer(id, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await expect(completeOffer(id, swapTransactionId)).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    await updateOffer(id, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day') })
    await completeOffer(id, swapTransactionId)
    const updatedOffer = await findOfferById(id)
    expect(updatedOffer!.state).toEqual('COMPLETED')
    expect(updatedOffer!.swapTransactionId).toEqual(swapTransactionId)
  })
})
