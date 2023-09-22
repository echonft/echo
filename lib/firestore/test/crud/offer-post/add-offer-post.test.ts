import { addOfferPost } from '@echo/firestore/crud/offer-post/add-offer-post'
import { deleteOfferPost } from '@echo/firestore/crud/offer-post/delete-offer-post'
import { findOfferPostById } from '@echo/firestore/crud/offer-post/find-offer-post-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertOfferPosts } from '@test-utils/offer-post/assert-offer-posts'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer-post - addOfferPost', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferPosts()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a post for an offer that does not exist', async () => {
    await expect(addOfferPost('not-found', '1', '1')).rejects.toBeDefined()
  })
  it('add an offer post', async () => {
    const { id } = await addOfferPost('LyCfl6Eg7JKuD7XJ6IPi', 'discordId', 'threadId')
    const newDocument = await findOfferPostById(id)
    await deleteOfferPost(id)
    expect(newDocument!.id).toStrictEqual(id)
    expect(newDocument!.offerId).toStrictEqual('LyCfl6Eg7JKuD7XJ6IPi')
    expect(newDocument!.guild.discordId).toStrictEqual('discordId')
    expect(newDocument!.guild.threadId).toStrictEqual('threadId')
    expectDateIsNow(newDocument!.postedAt)
  })
})
