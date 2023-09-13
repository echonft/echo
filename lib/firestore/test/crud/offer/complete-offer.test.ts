import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOfferState } from '@echo/firestore/types/model/firestore-offer-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - offer - completeOffer', () => {
  let initialState: FirestoreOfferState
  let initialExpiresAt: dayjs.Dayjs
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
