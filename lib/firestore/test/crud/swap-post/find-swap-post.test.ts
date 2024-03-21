import { findSwapPost } from '@echo/firestore/crud/swap-post/find-swap-post'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - swap-post - findSwapPost', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await findSwapPost('not-found', 'not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const swapId = '2ipuV3drjQlzEgkUkW7q'
    const guildId = '1'
    const document = await findSwapPost(swapId, guildId)
    expect(document!.id).toStrictEqual('Y5nkR8DaI2YQDTXXBVZe')
    expect(document!.swapId).toStrictEqual(swapId)
    expect(document!.guild.discordId).toStrictEqual('1')
    expect(document!.guild.channelId).toStrictEqual('1')
  })
})
