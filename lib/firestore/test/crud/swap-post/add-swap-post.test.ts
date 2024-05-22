import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import type { SwapPostDiscordGuild } from '@echo/firestore/types/model/swap-post/swap-post'
import { assertSwapPosts } from '@echo/firestore-test/swap-post/assert-swap-posts'
import { deleteSwapPost } from '@echo/firestore-test/swap-post/delete-swap-post'
import { getSwapPostById } from '@echo/firestore-test/swap-post/get-swap-post-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - swap-post - addSwapPost', () => {
  const guild: SwapPostDiscordGuild = { id: 'discordId', channelId: 'channelId' }
  let createdSwapPostId: Nullable<string>
  beforeAll(async () => {
    await assertSwapPosts()
  })
  afterAll(async () => {
    await assertSwapPosts()
  })
  beforeEach(() => {
    createdSwapPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdSwapPostId)) {
      try {
        await deleteSwapPost(createdSwapPostId)
      } catch (e) {
        pinoLogger.error(`Error deleting swap post with id ${createdSwapPostId}: ${errorMessage(e)}`)
      }
    }
  })
  it('throws if trying to add a post for a listing that does not exist', async () => {
    await expect(addSwapPost({ swapId: 'not-found', guild })).rejects.toBeDefined()
  })
  it('add a swap post', async () => {
    const swapId = '2ipuV3drjQlzEgkUkW7q'
    const { id } = await addSwapPost({ swapId, guild })
    const newDocument = (await getSwapPostById(id))!
    expect(newDocument.swapId).toStrictEqual(swapId)
    expect(newDocument.guild).toStrictEqual(guild)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
