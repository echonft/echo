import { getSwapByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc, isNil } from 'ramda'

describe('CRUD - swap - getSwapByOfferId', () => {
  const data = assoc('offerId', 'offer-id', swapMock)
  let swapId: Nullable<string>

  beforeEach(() => {
    swapId = undefined
  })
  afterEach(async () => {
    if (!isNil(swapId)) {
      await deleteSwap(swapId)
    }
  })

  it('returns undefined if the document does not exist', async () => {
    await expect(getSwapByOfferId('not-found')).resolves.toBeUndefined()
  })

  it('returns the document found', async () => {
    swapId = await addSwap(data)
    const document = await getSwapByOfferId(data.offerId)
    expect(document).toStrictEqual(dissoc('offerId', data))
  })
})
