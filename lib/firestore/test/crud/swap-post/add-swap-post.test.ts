import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { swapDocumentMock } from '@echo/firestore/mocks/swap-document-mock'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { addSwapPost as testAddSwapPost } from '@echo/test/firestore/crud/swap-post/add-swap-post'
import { deleteSwapPost } from '@echo/test/firestore/crud/swap-post/delete-swap-post'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/mocks'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - swap-post - addSwapPost', () => {
  const swapData = assoc('offerId', offerDocumentMockToJohnnycageId, swapDocumentMock)
  const swapPostData = { guild: { id: 'discordId', channelId: 'channelId' } }
  let swapId: Nullable<string>
  let swapPostId: Nullable<string>
  beforeEach(() => {
    swapId = undefined
    swapPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(swapId)) {
      await deleteSwap(swapId)
    }
    if (!isNil(swapPostId)) {
      await deleteSwapPost(swapPostId)
    }
  })

  it('throws if the swap does not exist', async () => {
    await expect(addSwapPost(assoc('swapId', 'not-found', swapPostData))).rejects.toEqual(Error(SwapError.NotFound))
  })

  it('throws if the swap post already exists', async () => {
    swapId = await addSwap(swapData)
    swapPostId = await pipe(assoc('swapId', swapId), testAddSwapPost)(swapPostData)
    await expect(pipe(assoc('swapId', swapId), addSwapPost)(swapPostData)).rejects.toEqual(Error(SwapError.PostExists))
  })

  it('add a swap post', async () => {
    swapId = await addSwap(swapData)
    const { id } = await pipe(assoc('swapId', swapId), addSwapPost)(swapPostData)
    swapPostId = id
    const document = await getSwapPost({ swapId, guildId: swapPostData.guild.id })
    expect(document).toStrictEqual(assoc('swapId', swapId, swapPostData))
  })
})
