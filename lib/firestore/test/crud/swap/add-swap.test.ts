import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import { getSwap } from '@echo/firestore/crud/swap/get-swap'
import { swapDocumentMock } from '@echo/firestore/mocks/swap-document-mock'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc, isNil, omit, pipe } from 'ramda'

describe('CRUD - swap - addSwap', () => {
  const data = pipe(dissoc('slug'), assoc('offerId', offerDocumentMockToJohnnycageId))(swapDocumentMock)
  let swapId: Nullable<string>

  beforeEach(() => {
    swapId = undefined
  })
  afterEach(async () => {
    if (!isNil(swapId)) {
      await deleteSwap(swapId)
    }
  })

  it('throws if offer that does exist', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), addSwap)(data)).rejects.toEqual(Error(OfferError.NotFound))
  })

  it('throws if swap already exists', async () => {
    const { id } = await addSwap(data)
    swapId = id
    await expect(addSwap(data)).rejects.toEqual(Error(SwapError.Exists))
  })

  it('add a swap', async () => {
    // TODO add offer
    const { id, data: swap } = await addSwap(data)
    swapId = id
    const document = await getSwap(swap.slug)
    expect(omit(['slug'], document!)).toStrictEqual(data)
    expect(swap.slug).toBeMsSlug()
  })
})
