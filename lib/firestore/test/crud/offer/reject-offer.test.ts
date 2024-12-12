import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import * as updateReferenceModule from '@echo/firestore/helpers/reference/update-reference'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { resetOffer } from '@echo/test/firestore/crud/offer/reset-offer'
import { updateOffer } from '@echo/test/firestore/crud/offer/update-offer'
import { futureTimestamp } from '@echo/utils/helpers/future-timestamp'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('CRUD - offer - rejectOffer', () => {
  type SpiedFn = typeof updateReferenceModule.updateReference<OfferDocument>
  let updateReferenceSpy: jest.MockedFunction<SpiedFn>
  const slug = offerMockToJohnnycage.slug

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
    await expect(rejectOffer('not-found')).rejects.toEqual(Error(OfferError.NotFound))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('throws if the offer is locked', async () => {
    await updateOffer(slug, {
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expect(rejectOffer(slug)).rejects.toEqual(Error(OfferError.Locked))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('does not update the offer if it is already rejected', async () => {
    await updateOffer(slug, {
      state: OfferState.Rejected,
      locked: true
    })
    updateReferenceSpy.mockClear()
    await rejectOffer(slug)
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('reject offer', async () => {
    await updateOffer(slug, { state: OfferState.Open, expiresAt: futureTimestamp() })
    await rejectOffer(slug)
    const offer = await getOffer(slug)
    expect(offer?.state).toEqual(OfferState.Rejected)
  })
})
