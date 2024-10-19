import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { expireOffer } from '@echo/firestore/crud/offer/expire-offer'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import type { UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import * as updateReferenceModule from '@echo/firestore/helpers/crud/reference/update-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { resetOffer } from '@echo/firestore/utils/offer/reset-offer'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import type { Listing } from '@echo/model/types/listing/listing'
import { futureDate } from '@echo/utils/helpers/future-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - expireOffer', () => {
  type SpiedFn = typeof updateReferenceModule.updateReference<Listing, ListingDocumentData>
  let createdStateUpdateId: Nullable<string>
  let updateReferenceSpy: jest.MockedFunction<SpiedFn>
  const slug = offerMockToJohnnycageSlug()
  const args: Omit<UpdateOfferStateArgs, 'state'> = {
    slug
  }

  beforeEach(() => {
    createdStateUpdateId = undefined
    updateReferenceSpy = jest.spyOn(updateReferenceModule, 'updateReference') as jest.MockedFunction<SpiedFn>
    updateReferenceSpy.mockClear()
  })
  afterEach(async () => {
    updateReferenceSpy.mockRestore()
    // reset the offer to its original state
    await resetOffer(slug)
    if (!isNil(createdStateUpdateId)) {
      await deleteOfferUpdate(createdStateUpdateId)
    }
  })

  it('throws if the offer is not found', async () => {
    await expect(pipe(assoc('slug', 'not-found'), expireOffer)(args)).rejects.toEqual(Error(OfferError.NotFound))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('throws if the offer is locked', async () => {
    await updateOffer(slug, {
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expect(expireOffer(args)).rejects.toEqual(Error(OfferError.Locked))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('does not update the offer if it is already expired', async () => {
    await updateOffer(slug, {
      state: OfferState.Expired,
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expireOffer(args)
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('expire offer', async () => {
    await updateOffer(slug, { state: OfferState.Open, expiresAt: futureDate() })
    await expireOffer(args)
    const offerSnapshot = (await getOfferSnapshot(slug))!
    const updatedOffer = offerSnapshot.data()
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId: offerSnapshot.id,
      state: OfferState.Expired
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    expect(updatedOffer.state).toEqual(OfferState.Expired)
    expect(stateUpdateSnapshot).toBeDefined()
  })
})
