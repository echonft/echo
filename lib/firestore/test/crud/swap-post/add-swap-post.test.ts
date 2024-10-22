import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { swapMockId } from '@echo/firestore/mocks/swap/swap-mock'
import { SwapError } from '@echo/model/constants/errors/swap-error'
import { deleteSwapPost } from '@echo/test/firestore/crud/swap-post/delete-swap-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - swap-post - addSwapPost', () => {
  const data = { swapId: swapMockId(), guild: { id: 'discordId', channelId: 'channelId' } }
  let swapPostId: Nullable<string>
  beforeEach(() => {
    swapPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(swapPostId)) {
      await deleteSwapPost(swapPostId)
    }
  })

  it('throws if the swap does not exist', async () => {
    await expect(addSwapPost(assoc('swapId', 'not-found', data))).rejects.toEqual(Error(SwapError.NotFound))
  })

  it('throws if the swap post already exists', async () => {
    const { id } = await addSwapPost(data)
    swapPostId = id
    await expect(addSwapPost(data)).rejects.toEqual(Error(SwapError.PostExists))
  })

  it('add a swap post', async () => {
    const { id } = await addSwapPost(data)
    swapPostId = id
    const document = await getSwapPost({ swapId: data.swapId, guildId: data.guild.id })
    expect(document).toStrictEqual(data)
  })
})
