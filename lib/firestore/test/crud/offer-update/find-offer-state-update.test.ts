import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { findOfferUpdateById } from '@echo/firestore/crud/offer-update/find-offer-update-by-id'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { unchecked_addOfferStateUpdate } from '@echo/firestore-test/offer-update/unchecked_add-offer-state-update'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update - findOfferStateUpdate', () => {
  const args: AddOfferStateUpdateArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    args: {
      state: 'REJECTED',
      trigger: {
        by: 'johnnycagewins'
      }
    }
  }
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
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    let offerUpdate = await findOfferStateUpdate(args.offerId, 'ACCEPTED')
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(args.offerId, 'OPEN')
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(args.offerId, 'CANCELLED')
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(args.offerId, 'COMPLETED')
    expect(offerUpdate).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    const newDocument = (await findOfferUpdateById(id))!
    const foundDocument = await findOfferStateUpdate(args.offerId, 'REJECTED')
    expect(foundDocument).toStrictEqual(newDocument)
  })
})
