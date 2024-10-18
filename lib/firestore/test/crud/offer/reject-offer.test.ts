import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import type { UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { OfferState } from '@echo/model/constants/offer-state'
import { getOfferMockBySlug } from '@echo/model/mocks/offer/get-offer-mock-by-slug'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import { futureDate } from '@echo/utils/helpers/future-date'
import { pastDate } from '@echo/utils/helpers/past-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - rejectOffer', () => {
  const slug = offerMockToJohnnycageSlug()
  let createdStateUpdateId: Nullable<string>
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

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('slug', 'not-found'), rejectOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(slug, { state: OfferState.Expired, expiresAt: pastDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(slug, { state: OfferState.Cancelled, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await updateOffer(slug, { state: OfferState.Accepted, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(slug, { state: OfferState.Rejected, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(slug, { state: OfferState.Completed, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('reject offer if its not expired', async () => {
    await updateOffer(slug, { state: OfferState.Open, expiresAt: futureDate() })
    await rejectOffer(args)
    const offerSnapshot = (await getOfferSnapshot(slug))!
    const updatedOffer = offerSnapshot.data()
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId: offerSnapshot.id,
      state: OfferState.Rejected
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    expect(updatedOffer.state).toEqual(OfferState.Rejected)
    expect(stateUpdateSnapshot).toBeDefined()
  })
})
