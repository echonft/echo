import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { postOffer } from '../../../src/crud/offer/post-offer'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - offer - postOffer', () => {
  let initialPostedAt: Dayjs
  let initialThreadId: string | undefined
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialPostedAt = offer!.postedAt!
    initialThreadId = offer!.threadId
  })
  afterEach(async () => {
    await updateOffer(id, { postedAt: initialPostedAt, threadId: initialThreadId })
  })

  it('postOffer', async () => {
    const threadId = 'newThreadId'
    await postOffer(id, threadId)
    const postedOffer = await findOfferById(id)
    expect(postedOffer!.postedAt?.isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(postedOffer!.postedAt?.isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
    expect(postedOffer!.threadId).toEqual(threadId)
  })
})
