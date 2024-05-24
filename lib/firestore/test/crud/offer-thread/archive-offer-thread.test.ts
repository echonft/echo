import { archiveOfferThread } from '@echo/firestore/crud/offer-thread/archive-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getOfferThreadMock } from '@echo/firestore-mocks/offer-thread/get-offer-thread-mock'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { unchecked_updateOfferThread } from '@echo/firestore-test/offer-thread/unchecked_update-offer-thread'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - offer-thread - addOfferThread', () => {
  const offerThread = getOfferThreadMock()
  beforeAll(async () => {
    await assertOfferThreads()
  })
  afterAll(async () => {
    await unchecked_updateOfferThread(offerThread)
    await assertOfferThreads()
  })
  it('throws if the offer thread does not exist', async () => {
    await expect(archiveOfferThread('not-found')).rejects.toBeDefined()
  })
  it('archive the offer thread', async () => {
    const { offerId } = offerThread
    await archiveOfferThread(offerId)
    const updatedDocument = (await getOfferThread(offerId))!
    expect(omit(['state'], updatedDocument)).toStrictEqual(omit(['state'], offerThread))
    expect(updatedDocument.state).toStrictEqual('ARCHIVED')
  })
})
