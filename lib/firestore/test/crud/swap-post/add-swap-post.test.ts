import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import { deleteSwapPost } from '@echo/firestore/crud/swap-post/delete-swap-post'
import { getSwapPostById } from '@echo/firestore/crud/swap-post/get-swap-post-by-id'
import { swapMockId } from '@echo/firestore/mocks/swap/swap-mock'
import type { SwapPostDiscordGuild } from '@echo/firestore/types/model/swap-post/swap-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

describe('CRUD - swap-post - addSwapPost', () => {
  const guild: SwapPostDiscordGuild = { id: 'discordId', channelId: 'channelId' }
  let createdSwapPostId: Nullable<string>
  beforeEach(() => {
    createdSwapPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdSwapPostId)) {
      await deleteSwapPost(createdSwapPostId)
    }
  })
  it('add a swap post', async () => {
    const swapId = swapMockId
    const { id } = await addSwapPost({ swapId: swapId(), guild })
    createdSwapPostId = id
    const newDocument = (await getSwapPostById(id))!
    expect(newDocument.swapId).toStrictEqual(swapId())
    expect(newDocument.guild).toStrictEqual(guild)
    expect(dayjs.unix(newDocument.postedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newDocument.postedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
