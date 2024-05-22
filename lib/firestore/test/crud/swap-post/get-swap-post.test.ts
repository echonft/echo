import { getSwapPost } from '@echo/firestore/crud/swap-post/get-swap-post'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - swap-post - getSwapPost', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await getSwapPost({ swapId: 'not-found', guildId: 'not-found' })
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const swapId = '2ipuV3drjQlzEgkUkW7q'
    const guildId = '1'
    const document = await getSwapPost({ swapId, guildId })
    expect(document!.swapId).toStrictEqual(swapId)
    expect(document!.guild.id).toStrictEqual('1')
    expect(document!.guild.channelId).toStrictEqual('1')
  })
})
