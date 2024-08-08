import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import type { UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
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
    await updateOffer(slug, { state: OFFER_STATE_EXPIRED, expiresAt: pastDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(slug, { state: OFFER_STATE_CANCELLED, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await updateOffer(slug, { state: OFFER_STATE_ACCEPTED, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(slug, { state: OFFER_STATE_REJECTED, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(slug, { state: OFFER_STATE_COMPLETED, expiresAt: futureDate() })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('reject offer if its not expired', async () => {
    await updateOffer(slug, { state: OFFER_STATE_OPEN, expiresAt: futureDate() })
    await rejectOffer(args)
    const offerSnapshot = (await getOfferSnapshot(slug))!
    const updatedOffer = offerSnapshot.data()
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId: offerSnapshot.id,
      state: OFFER_STATE_REJECTED
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    expect(updatedOffer.state).toEqual(OFFER_STATE_REJECTED)
    expect(stateUpdateSnapshot).toBeDefined()
  })
})
