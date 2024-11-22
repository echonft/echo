import { getSwapOffer } from '@echo/firestore/crud/swap/get-swap-offer'
import { offerDocumentMockToJohnnycage } from '@echo/firestore/mocks/offer-document-mock'
import { swapDocumentMock } from '@echo/firestore/mocks/swap-document-mock'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/mocks'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - swap - getSwap', () => {
  const data = assoc('offerId', offerDocumentMockToJohnnycageId, swapDocumentMock)
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
    expect(document).toStrictEqual(offerDocumentMockToJohnnycage)
  })
})
