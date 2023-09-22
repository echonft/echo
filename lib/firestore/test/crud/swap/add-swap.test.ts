import { addSwap } from '@echo/firestore/crud/swaps/add-swap'
import { deleteSwap } from '@echo/firestore/crud/swaps/delete-swap'
import { findSwapById } from '@echo/firestore/crud/swaps/find-swap-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - swap - addSwap', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertSwaps()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a swap for an offer that does not exist', async () => {
    await expect(addSwap('not-found', '0xnew')).rejects.toBeDefined()
  })
  it('throws if trying to add a swap for an offer that already has a swap', async () => {
    await expect(addSwap('ASkFpKoHEHVH0gd69t1G', '0x100')).rejects.toBeDefined()
  })
  it('add a swap', async () => {
    const { id } = await addSwap('LyCfl6Eg7JKuD7XJ6IPi', '0xnew')
    const newSwap = await findSwapById(id)
    await deleteSwap(id)
    expect(newSwap!.id).toStrictEqual(id)
    expect(newSwap!.offerId).toStrictEqual('LyCfl6Eg7JKuD7XJ6IPi')
    expect(newSwap!.txId).toStrictEqual('0xnew')
    expectDateIsNow(newSwap!.date)
  })
})
