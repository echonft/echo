import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferStateUpdate } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { getOfferUpdateById } from '@echo/firestore/crud/offer-update/get-offer-update-by-id'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { unchecked_addOfferStateUpdate } from '@echo/firestore-test/offer-update/unchecked_add-offer-state-update'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update - getOfferStateUpdate', () => {
  const offerId = OFFER_MOCK_TO_JOHNNYCAGE_ID
  const args: AddOfferStateUpdateArgs = {
    offerId,
    args: {
      state: OFFER_STATE_REJECTED,
      trigger: {
        by: USER_MOCK_JOHNNY_USERNAME
      }
    }
  }
  let offerUpdateId: Nullable<string>

  beforeEach(() => {
    offerUpdateId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdateId)) {
      try {
        await deleteOfferUpdate(offerUpdateId)
        offerUpdateId = undefined
      } catch (e) {
        pinoLogger.error(`Error deleting offer update with id ${offerUpdateId}: ${errorMessage(e)}`)
      }
    }
  })
  it('returns undefined if no document is found', async () => {
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    let offerUpdate = await getOfferStateUpdate({ offerId, state: OFFER_STATE_ACCEPTED })
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await getOfferStateUpdate({ offerId, state: OFFER_STATE_OPEN })
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await getOfferStateUpdate({ offerId, state: OFFER_STATE_CANCELLED })
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await getOfferStateUpdate({ offerId, state: OFFER_STATE_COMPLETED })
    expect(offerUpdate).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    const newDocument = (await getOfferUpdateById(id))!
    const foundDocument = await getOfferStateUpdate({ offerId, state: OFFER_STATE_REJECTED })
    expect(foundDocument).toStrictEqual(newDocument)
  })
})
