import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { deleteOfferUpdate } from '@test-utils/offer-update/delete-offer-update'
import { findOfferUpdateById } from '@test-utils/offer-update/find-offer-update-by-id'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { isNil } from 'ramda'

describe('CRUD - offer-update - addOfferStateUpdate', () => {
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  let offerUpdateId: string | undefined
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOfferThreads()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    offerUpdateId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdateId)) {
      try {
        await deleteOfferUpdate(offerUpdateId)
        offerUpdateId = undefined
      } catch (e) {
        logger.error(`Error deleting offer update: ${errorMessage(e)}`)
      }
    }
  })
  it('throws if trying to add a state update for an offer that does not exist', async () => {
    await expect(addOfferStateUpdate('not-found')).rejects.toBeDefined()
  })
  it('throws if trying to add a state update that already exists', async () => {
    const { id } = await addOfferStateUpdate(offerId)
    offerUpdateId = id
    await expect(addOfferStateUpdate(offerId)).rejects.toBeDefined()
  })
  it('add an offer state update', async () => {
    const { id } = await addOfferStateUpdate(offerId)
    offerUpdateId = id
    const newDocument = (await findOfferUpdateById(id))!
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.offerId).toStrictEqual(offerId)
    expect(newDocument.update.kind).toStrictEqual('state')
    expect(newDocument.update.args).toStrictEqual({ state: getOfferMockById(offerId).state })
    expectDateNumberIsNow(newDocument.postedAt)
  })
})
