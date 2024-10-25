import { expireOffer } from '@echo/firestore/crud/offer/expire-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import * as updateReferenceModule from '@echo/firestore/helpers/crud/reference/update-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer-mock'
import type { Listing } from '@echo/model/types/listing'
import { resetOffer } from '@echo/test/firestore/crud/offer/reset-offer'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { futureDate } from '@echo/utils/helpers/future-date'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('CRUD - offer - expireOffer', () => {
  type SpiedFn = typeof updateReferenceModule.updateReference<Listing, ListingDocumentData>
  let updateReferenceSpy: jest.MockedFunction<SpiedFn>
  const slug = offerMockToJohnnycageSlug()

  beforeEach(() => {
    updateReferenceSpy = jest.spyOn(updateReferenceModule, 'updateReference') as jest.MockedFunction<SpiedFn>
    updateReferenceSpy.mockClear()
  })
  afterEach(async () => {
    updateReferenceSpy.mockRestore()
    // reset the offer to its original state
    await resetOffer(slug)
  })

  it('throws if the offer is not found', async () => {
    await expect(expireOffer('not-found')).rejects.toEqual(Error(OfferError.NotFound))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('throws if the offer is locked', async () => {
    await updateOffer(slug, {
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expect(expireOffer(slug)).rejects.toEqual(Error(OfferError.Locked))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('does not update the offer if it is already expired', async () => {
    await updateOffer(slug, {
      state: OfferState.Expired,
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expireOffer(slug)
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('expire offer', async () => {
    await updateOffer(slug, { state: OfferState.Open, expiresAt: futureDate() })
    await expireOffer(slug)
    const offer = await getOffer(slug)
    expect(offer?.state).toEqual(OfferState.Expired)
  })
})
