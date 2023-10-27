import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOfferThreads } from '@test-utils/offer-thread/assert-offer-threads'
import { deleteOfferUpdate } from '@test-utils/offer-update/delete-offer-update'
import { findOfferUpdateById } from '@test-utils/offer-update/find-offer-update-by-id'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { isNil } from 'ramda'

describe('CRUD - offer-update - findOfferStateUpdate', () => {
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
        logger.error(`Error deleting offer update with id ${offerUpdateId}: ${errorMessage(e)}`)
      }
    }
  })
  it('returns undefined if no document is found', async () => {
    const { id } = await addOfferStateUpdate(offerId)
    offerUpdateId = id
    let offerUpdate = await findOfferStateUpdate(offerId, 'ACCEPTED')
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(offerId, 'REJECTED')
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(offerId, 'CANCELLED')
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(offerId, 'COMPLETED')
    expect(offerUpdate).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const { id } = await addOfferStateUpdate(offerId)
    offerUpdateId = id
    const newDocument = (await findOfferUpdateById(id))!
    const foundDocument = await findOfferStateUpdate(offerId, 'OPEN')
    expect(foundDocument).toStrictEqual(newDocument)
  })
})
