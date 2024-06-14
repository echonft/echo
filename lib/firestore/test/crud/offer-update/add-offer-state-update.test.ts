import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import {
  addOfferStateUpdate,
  type AddOfferStateUpdateArgs
} from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferUpdateById } from '@echo/firestore/crud/offer-update/get-offer-update-by-id'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer-update - addOfferStateUpdate', () => {
  const args: AddOfferStateUpdateArgs = {
    offerId: offerMockToJohnnycageId(),
    args: {
      state: OFFER_STATE_REJECTED,
      trigger: {
        by: userMockJohnnyUsername()
      }
    }
  }
  let offerUpdateId: Nullable<string>

  beforeEach(() => {
    offerUpdateId = undefined
  })
  afterEach(async () => {
    if (!isNil(offerUpdateId)) {
      await deleteOfferUpdate(offerUpdateId)
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
    const newDocument = (await getOfferUpdateById(id))!
    expect(newDocument.offerId).toStrictEqual(args.offerId)
    expect(newDocument.update.kind).toStrictEqual(OFFER_UPDATE_KIND_STATE)
    expect(newDocument.update.args).toStrictEqual(args.args)
    expect(dayjs.unix(newDocument.createdAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newDocument.createdAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
