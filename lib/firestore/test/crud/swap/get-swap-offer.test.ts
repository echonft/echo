import { getSwapOffer } from '@echo/firestore/crud/swap/get-swap-offer'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { swapMock } from '@echo/model/mocks/swap/swap-mock'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - swap - getSwap', () => {
  const data = pipe(swapMock, assoc('offerId', offerMockToJohnnycageId()))()
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
    expect(document).toStrictEqual(getOfferMockById(offerMockToJohnnycageId()))
  })
})
