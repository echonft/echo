import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { Expiration } from '@echo/model/constants/expiration'
import { ListingState } from '@echo/model/constants/listing-state'
import { expirationToDate } from '@echo/model/helpers/expiration-to-date'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, find, isNil, map, pipe, prop, propEq } from 'ramda'

describe('CRUD - listing - addListing', () => {
  let createdListingId: Nullable<string>
  let createdListingOfferIds: string[]
  beforeEach(() => {
    createdListingId = undefined
    createdListingOfferIds = []
  })
  afterEach(async () => {
    if (!isNil(createdListingId)) {
      await deleteListing(createdListingId)
    }
    for (const createdListingOfferId of createdListingOfferIds) {
      await deleteListingOffer(createdListingOfferId)
    }
  })

  it('add a listing', async () => {
    const { creator, items, target } = getListingMockById(listingMockId())
    const expirationDate = expirationToDate(Expiration.OneDay)
    const newTarget = assoc('amount', 1, target)
    const newDocument = await addListing({ creator, items, target: newTarget, expiration: Expiration.OneDay })
    createdListingId = newDocument.id
    createdListingOfferIds = pipe(
      prop('listingOffers'),
      map<NewDocument<ListingOfferDocumentData>, string>(prop('id'))
    )(newDocument)
    const newListing = (await getListingById(createdListingId))!
    expect(newListing.creator).toStrictEqual(creator)
    expect(newListing.items).toStrictEqual(items)
    expect(newListing.state).toBe(ListingState.OffersPending)
    expect(newListing.target).toStrictEqual(newTarget)
    expect(dayjs.unix(newListing.expiresAt).isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newListing.expiresAt).isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    // check if listing offers have been created
    const listingOffers = await getListingOffersForListing(newListing)
    const createdListingOffers = await getListingOffersByListingId(createdListingId)
    expect(createdListingOffers.length).toEqual(1)
    for (const createdListingOffer of createdListingOffers) {
      expect(createdListingOffer).toStrictEqual(find(propEq(createdListingOffer.offerId, 'offerId'), listingOffers))
    }
  })
})
