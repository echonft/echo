import { deleteListingOffer } from '@echo/firestore/crud/listing-offer/delete-listing-offer'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { assertListingIsNotADuplicate } from '@echo/firestore/helpers/listing/assert-listing-is-not-a-duplicate'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, pick, pipe } from 'ramda'

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

  it('assertListingIsNotADuplicate', async () => {
    await expect(
      pipe(getListingMockById, pick(['items', 'target']), assertListingIsNotADuplicate)(listingMockId())
    ).rejects.toBeDefined()
  })
  // FIXME
  // it('throws if the listing is a duplicate', async () => {
  //   const { items, target, creator } = getListingMockById(listingMockId())
  //   await expect(addListing({ items, target, expiration: ONE_DAY })).rejects.toBeDefined()
  //   const listings = await getAllListings()
  //   expect(eqListContent(listings, getAllListingMocks())).toBeTruthy()
  // })
  // FIXME
  // it('add a listing', async () => {
  //   const { creator, items, target } = getListingMockById(listingMockId())
  //   const expirationDate = expirationToDate(ONE_DAY)
  //   const newTarget = assoc('amount', 1, target)
  //   const newDocument = await addListing({ items, target: newTarget, expiration: ONE_DAY })
  //   createdListingId = newDocument.id
  //   createdListingOfferIds = pipe(
  //     prop('listingOffers'),
  //     map<NewDocument<ListingOfferDocumentData>, string>(prop('id'))
  //   )(newDocument)
  //   const newListing = (await getListingById(createdListingId))!
  //   expect(newListing.creator).toStrictEqual(creator)
  //   expect(newListing.items).toStrictEqual(items)
  //   expect(newListing.state).toBe(LISTING_STATE_OFFERS_PENDING)
  //   expect(newListing.target).toStrictEqual(newTarget)
  //   expect(dayjs.unix(newListing.expiresAt).isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
  //   expect(dayjs.unix(newListing.expiresAt).isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
  //   // check if listing offers have been created
  //   const listingOffers = await getListingOffersForListing(newListing)
  //   const createdListingOffers = await getListingOffersByListingId(createdListingId)
  //   expect(createdListingOffers.length).toEqual(1)
  //   for (const createdListingOffer of createdListingOffers) {
  //     expect(createdListingOffer).toStrictEqual(find(propEq(createdListingOffer.offerId, 'offerId'), listingOffers))
  //   }
  // })
})
