import { DEFAULT_EXPIRATION_TIME } from '../../../src/constants/default-expiration-time'
import { addSwap } from '../../../src/crud/swap/add-swap'
import { deleteSwap } from '../../../src/crud/swap/delete-swap'
import { findSwapById } from '../../../src/crud/swap/find-swap-by-id'
import { getSwapMockById } from '../../mocks/get-swap-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('CRUD - swap - addSwap', () => {
  let id: string
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  afterEach(async () => {
    try {
      await deleteSwap(id)
      // remove swap from listings
      // TODO
    } catch (_err) {
      // swap was never created, test must have failed
    }
  })

  it('addSwap', async () => {
    const { offer } = getSwapMockById('hS6KtAJ03bSolumoHvDJ')
    id = await addSwap(offer.id)
    const newSwap = await findSwapById(id)
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    expect(newSwap!.createdAt?.isAfter(now.subtract(1, 'minute'))).toBeTruthy()
    expect(newSwap!.createdAt?.isBefore(now.add(1, 'minute'))).toBeTruthy()
    expect(newSwap!.expiresAt?.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newSwap!.expiresAt?.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newSwap!.offer).toStrictEqual(offer)
    expect(newSwap!.postedAt).toBeUndefined()
    expect(newSwap!.state).toBe('PENDING_APPROVALS')
    // check if swap has been added to tied listings
    // TODO
  })
})
