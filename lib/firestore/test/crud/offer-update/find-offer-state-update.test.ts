import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { findOfferUpdateById } from '@echo/firestore/crud/offer-update/find-offer-update-by-id'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { unchecked_addOfferStateUpdate } from '@echo/firestore-test/offer-update/unchecked_add-offer-state-update'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update - findOfferStateUpdate', () => {
  const args: AddOfferStateUpdateArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    args: {
      state: OFFER_STATE_REJECTED,
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
    let offerUpdate = await findOfferStateUpdate(args.offerId, OFFER_STATE_ACCEPTED)
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(args.offerId, OFFER_STATE_OPEN)
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(args.offerId, OFFER_STATE_CANCELLED)
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await findOfferStateUpdate(args.offerId, OFFER_STATE_COMPLETED)
    expect(offerUpdate).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    const newDocument = (await findOfferUpdateById(id))!
    const foundDocument = await findOfferStateUpdate(args.offerId, OFFER_STATE_REJECTED)
    expect(foundDocument).toStrictEqual(newDocument)
  })
})
