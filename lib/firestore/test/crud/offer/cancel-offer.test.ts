import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import * as updateReferenceModule from '@echo/firestore/helpers/crud/reference/update-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import type { Listing } from '@echo/model/types/listing/listing'
import { resetOffer } from '@echo/test/firestore/crud/offer/reset-offer'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { futureDate } from '@echo/utils/helpers/future-date'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('CRUD - offer - cancelOffer', () => {
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
    await expect(cancelOffer('not-found')).rejects.toEqual(Error(OfferError.NotFound))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('throws if the offer is locked', async () => {
    await updateOffer(slug, {
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expect(cancelOffer(slug)).rejects.toEqual(Error(OfferError.Locked))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('does not update the offer if it is already cancelled', async () => {
    await updateOffer(slug, {
      state: OfferState.Cancelled,
      locked: true
    })
    updateReferenceSpy.mockClear()
    await cancelOffer(slug)
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('cancel offer', async () => {
    await updateOffer(slug, { state: OfferState.Open, expiresAt: futureDate() })
    await cancelOffer(slug)
    const offer = await getOffer(slug)
    expect(offer?.state).toEqual(OfferState.Cancelled)
  })
})
