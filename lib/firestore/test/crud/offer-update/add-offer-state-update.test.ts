import { OfferUpdateKind } from '@echo/firestore/constants/offer-update-kind'
import {
  addOfferStateUpdate,
  type AddOfferStateUpdateArgs
} from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferUpdateById } from '@echo/firestore/crud/offer-update/get-offer-update-by-id'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer-update - addOfferStateUpdate', () => {
  const args: AddOfferStateUpdateArgs = {
    offerId: offerMockToJohnnycageId(),
    args: {
      state: OfferState.Rejected
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
    expect(newDocument.update.kind).toStrictEqual(OfferUpdateKind.State)
    expect(newDocument.update.args).toStrictEqual(args.args)
  })
})
