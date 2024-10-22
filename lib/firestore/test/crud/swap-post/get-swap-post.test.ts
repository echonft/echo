import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { addSwapPost } from '@echo/test/firestore/crud/swap-post/add-swap-post'
import { deleteSwapPost } from '@echo/test/firestore/crud/swap-post/delete-swap-post'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - swap-post - getSwapPost', () => {
  const data = { swapId: 'swap-id', guild: { id: 'discordId', channelId: 'channelId' } }
  let swapPostId: Nullable<string>
  beforeEach(() => {
    swapPostId = undefined
  })
  afterEach(async () => {
    if (!isNil(swapPostId)) {
      await deleteSwapPost(swapPostId)
    }
  })

  it('returns undefined if the document does not exist', async () => {
    await expect(getSwapPost({ swapId: 'not-found', guildId: 'not-found' })).resolves.toBeUndefined()
    swapPostId = await addSwapPost(data)
    await expect(getSwapPost({ swapId: data.swapId, guildId: 'not-found' })).resolves.toBeUndefined()
    await expect(getSwapPost({ swapId: 'not-found', guildId: data.guild.id })).resolves.toBeUndefined()
  })
  it('returns the document found', async () => {
    swapPostId = await addSwapPost(data)
    const document = await getSwapPost({ swapId: data.swapId, guildId: data.guild.id })
    expect(document).toStrictEqual(data)
  })
})
