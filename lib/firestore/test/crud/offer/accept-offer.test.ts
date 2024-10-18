import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import type { UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { OfferState } from '@echo/model/constants/offer-state'
import { getOfferMockBySlug } from '@echo/model/mocks/offer/get-offer-mock-by-slug'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import { futureDate } from '@echo/utils/helpers/future-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - acceptOffer', () => {
  let createdStateUpdateId: Nullable<string>
  const slug = offerMockToJohnnycageSlug()
  const args: Omit<UpdateOfferStateArgs, 'state'> = {
    slug
  }
  beforeEach(() => {
    createdStateUpdateId = undefined
  })
  afterEach(async () => {
    // reset the offer to its original state
    await updateOffer(slug, getOfferMockBySlug(slug))
    if (!isNil(createdStateUpdateId)) {
      await deleteOfferUpdate(createdStateUpdateId)
    }
  })

  it('throws if the offer is not found', async () => {
    await expect(pipe(assoc('slug', 'not-found'), acceptOffer)(args)).rejects.toBeDefined()
  })
  it('accept offer', async () => {
    await updateOffer(slug, { state: OfferState.Open, expiresAt: futureDate() })
    await acceptOffer(args)
    const offerSnapshot = (await getOfferSnapshot(slug))!
    const updatedOffer = offerSnapshot.data()
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId: offerSnapshot.id,
      state: OfferState.Accepted
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    expect(updatedOffer.state).toEqual(OfferState.Accepted)
    expect(stateUpdateSnapshot).toBeDefined()
  })
})
