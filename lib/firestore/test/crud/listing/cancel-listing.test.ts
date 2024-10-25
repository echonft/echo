import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import * as updateReferenceModule from '@echo/firestore/helpers/crud/reference/update-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import { resetListing } from '@echo/test/firestore/crud/listing/reset-listing'
import { updateListing } from '@echo/test/firestore/crud/listing/update-listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

type SpiedFn = typeof updateReferenceModule.updateReference<Listing, ListingDocumentData>
describe('CRUD - listing - cancelListing', () => {
  let slug: Nullable<Slug>
  let updateReferenceSpy: jest.MockedFunction<SpiedFn>

  beforeEach(() => {
    slug = undefined
    updateReferenceSpy = jest.spyOn(updateReferenceModule, 'updateReference') as jest.MockedFunction<SpiedFn>
    updateReferenceSpy.mockClear()
  })
  afterEach(async () => {
    if (!isNil(slug)) {
      await resetListing()
    }
    updateReferenceSpy.mockRestore()
  })

  it('throws if the listing is not found', async () => {
    await expect(cancelListing('not-found')).rejects.toEqual(Error(ListingError.NotFound))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('throws if the listing is locked', async () => {
    slug = listingMock.slug
    await updateListing(slug, {
      locked: true
    })
    updateReferenceSpy.mockClear()
    await expect(cancelListing(slug)).rejects.toEqual(Error(ListingError.Locked))
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('does not update the listing if it is already cancelled', async () => {
    slug = listingMock.slug
    await updateListing(slug, {
      state: ListingState.Cancelled,
      locked: true
    })
    updateReferenceSpy.mockClear()
    await cancelListing(slug)
    expect(updateReferenceSpy).not.toHaveBeenCalled()
  })
  it('cancel listing', async () => {
    slug = listingMock.slug
    await updateListing(slug, {
      state: ListingState.Open,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    updateReferenceSpy.mockClear()
    await cancelListing(slug)
    expect(updateReferenceSpy).toHaveBeenCalledTimes(1)
    const updatedListing = await getListing(slug)
    expect(updatedListing?.state).toEqual(ListingState.Cancelled)
    expect(updatedListing?.locked).toBeTruthy()
  })
})
