import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import {
  addOfferStateUpdate,
  type AddOfferStateUpdateArgs
} from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { findOfferUpdateById } from '@echo/firestore/crud/offer-update/find-offer-update-by-id'
import { assertOfferThreads } from '@echo/firestore-test/offer-thread/assert-offer-threads'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer-update - addOfferStateUpdate', () => {
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
  it('throws if trying to add a state update for an offer that does not exist', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), addOfferStateUpdate)(args)).rejects.toBeDefined()
  })
  it('throws if trying to add a state update that already exists', async () => {
    const { id } = await addOfferStateUpdate(args)
    offerUpdateId = id
    await expect(addOfferStateUpdate(args)).rejects.toBeDefined()
  })
  it('add an offer state update', async () => {
    const { id } = await addOfferStateUpdate(args)
    offerUpdateId = id
    const newDocument = (await findOfferUpdateById(id))!
    expect(newDocument.id).toStrictEqual(id)
    expect(newDocument.offerId).toStrictEqual(args.offerId)
    expect(newDocument.update.kind).toStrictEqual(OFFER_UPDATE_KIND_STATE)
    expect(newDocument.update.args).toStrictEqual(args.args)
    expectDateNumberIsNow(newDocument.createdAt)
  })
})
