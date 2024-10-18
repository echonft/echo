import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdate } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { getOfferUpdateById } from '@echo/firestore/crud/offer-update/get-offer-update-by-id'
import { unchecked_addOfferStateUpdate } from '@echo/firestore/utils/offer-update/unchecked_add-offer-state-update'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-update - getOfferStateUpdate', () => {
  const offerId = offerMockToJohnnycageId()
  const args: AddOfferStateUpdateArgs = {
    offerId,
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
      offerUpdateId = undefined
    }
  })
  it('returns undefined if no document is found', async () => {
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    let offerUpdate = await getOfferStateUpdate({ offerId, state: OfferState.Accepted })
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await getOfferStateUpdate({ offerId, state: OfferState.Open })
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await getOfferStateUpdate({ offerId, state: OfferState.Cancelled })
    expect(offerUpdate).toBeUndefined()
    offerUpdate = await getOfferStateUpdate({ offerId, state: OfferState.Completed })
    expect(offerUpdate).toBeUndefined()
  })
  it('returns the proper document if found', async () => {
    const { id } = await unchecked_addOfferStateUpdate(args)
    offerUpdateId = id
    const newDocument = (await getOfferUpdateById(id))!
    const foundDocument = await getOfferStateUpdate({ offerId, state: OfferState.Rejected })
    expect(foundDocument).toStrictEqual(newDocument)
  })
})
