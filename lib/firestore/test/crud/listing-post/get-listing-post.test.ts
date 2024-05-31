import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing-post - getListingPost', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await getListingPost('not-found', 'not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const listingId = listingMockId()
    const guildId = '1'
    const document = await getListingPost(listingId, guildId)
    expect(document!.listingId).toStrictEqual(listingId)
    expect(document!.guild.id).toStrictEqual('1')
    expect(document!.guild.channelId).toStrictEqual('1')
  })
})
