import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { swapMock } from '@echo/model/mocks/swap/swap-mock'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc, pipe } from 'ramda'

describe('CRUD - offer - getSwapsForUser', () => {
  let swapIds: string[]

  beforeEach(() => {
    swapIds = []
  })
  afterEach(async () => {
    for (const swapId of swapIds) {
      await deleteSwap(swapId)
    }
  })

  function getSwap() {
    return pipe(swapMock, assoc('slug', nowMsSlug()), assoc('offerId', 'offer-id'))()
  }

  it('return an empty array if there are no swaps', async () => {
    await expect(getSwaps()).resolves.toEqual([])
  })

  it('returns the completed offers for which the user is the receiver or the sender', async () => {
    const swap1 = getSwap()
    const swap1Id = await addSwap(swap1)
    swapIds = [swap1Id]
    let documents = await getSwaps()
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', swap1))
    const swap2 = getSwap()
    const swap2Id = await addSwap(swap2)
    swapIds.push(swap2Id)
    documents = await getSwaps()
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', swap2))
    expect(documents[1]).toStrictEqual(dissoc('offerId', swap1))
    const swap3 = getSwap()
    const swap3Id = await addSwap(swap3)
    swapIds.push(swap3Id)
    documents = await getSwaps()
    expect(documents.length).toBe(3)
    expect(documents[0]).toStrictEqual(dissoc('offerId', swap3))
    expect(documents[1]).toStrictEqual(dissoc('offerId', swap2))
    expect(documents[2]).toStrictEqual(dissoc('offerId', swap1))
    expect(swapIds.length).toBe(3)
  })

  it('returns the completed offers for which the user is the receiver or the sender (with limit)', async () => {
    const swap1 = getSwap()
    const swap1Id = await addSwap(swap1)
    swapIds = [swap1Id]
    const swap2 = getSwap()
    const swap2Id = await addSwap(swap2)
    swapIds.push(swap2Id)
    const swap3 = getSwap()
    const swap3Id = await addSwap(swap3)
    swapIds.push(swap3Id)
    const documents = await getSwaps(1)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', swap3))
    expect(swapIds.length).toBe(3)
  })
})
