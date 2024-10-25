import { getSwapOffer } from '@echo/firestore/crud/swap/get-swap-offer'
import { offerMockToJohnnycageId } from '@echo/firestore/mocks/db-model/offer-document-data-mock'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - swap - getSwap', () => {
  const data = assoc('offerId', offerMockToJohnnycageId(), swapMock)
  let swapId: Nullable<string>

  beforeEach(() => {
    swapId = undefined
  })
  afterEach(async () => {
    if (!isNil(swapId)) {
      await deleteSwap(swapId)
    }
  })

  it('throws if the swap does not exist', async () => {
    await expect(getSwapOffer('not-found')).rejects.toEqual(Error(SwapError.NotFound))
  })

  it('returns the offer tied to the swap', async () => {
    swapId = await addSwap(data)
    const document = await getSwapOffer(data.slug)
    expect(document).toStrictEqual(offerMockToJohnnycage)
  })
})
