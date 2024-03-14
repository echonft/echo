import { addSwapPost } from '@echo/firestore/crud/swap-post/add-swap-post'
import type { SwapPostDiscordGuild } from '@echo/firestore/types/model/swap-post/swap-post'
import { assertSwapPosts } from '@echo/firestore-test/swap-post/assert-swap-posts'
import { deleteSwapPost } from '@echo/firestore-test/swap-post/delete-swap-post'
import { findSwapPostById } from '@echo/firestore-test/swap-post/find-swap-post-by-id'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - swap-post - addSwapPost', () => {
  const guild: SwapPostDiscordGuild = { discordId: 'discordId', channelId: 'channelId' }
  beforeAll(async () => {
    await assertSwapPosts()
  })
  afterAll(async () => {
    await assertSwapPosts()
  })
  it('throws if trying to add a post for a listing that does not exist', async () => {
    await expect(addSwapPost('not-found', guild)).rejects.toBeDefined()
  })
  it('add a swap post', async () => {
    const swapId = '2ipuV3drjQlzEgkUkW7q'
    const { id } = await addSwapPost(swapId, guild)
    const newDocument = (await findSwapPostById(id))!
    await deleteSwapPost(id)
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.swapId).toStrictEqual(swapId)
    expect(newDocument.guild).toStrictEqual(guild)
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
