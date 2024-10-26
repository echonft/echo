import { addOfferArrayIndexers } from '@echo/firestore/array-indexers/offer/add-offer-array-indexers'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { Expiration } from '@echo/model/constants/expiration'
import { OfferState } from '@echo/model/constants/offer-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { baseOfferMockToJohnnycage, offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Offer } from '@echo/model/types/offer'
import { resetListing } from '@echo/test/firestore/crud/listing/reset-listing'
import { deleteOffer } from '@echo/test/firestore/crud/offer/delete-offer'
import { offerDocumentMocks } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, omit, pick } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  let createdOfferId: Nullable<string>
  beforeEach(() => {
    createdOfferId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferId)) {
      await deleteOffer(createdOfferId)
      await resetListing()
    }
  })

  it('throws if the offer is a duplicate', async () => {
    const offerMock = offerMockToJohnnycage
    const baseOffer = pick(
      ['expiresAt', 'receiver', 'receiverItems', 'receiverItems', 'sender', 'senderItems'],
      offerMock
    )
    await expect(addOffer({ ...baseOffer, idContract: offerMock.idContract })).rejects.toEqual(Error(OfferError.Exists))
    const offers = await getAllOffers()
    expect(offers).toEqualList(offerDocumentMocks)
  })

  it('add an offer', async () => {
    const expiresAt = expirationToDateNumber(Expiration.OneDay)
    const args: BaseOffer & Pick<Offer, 'idContract'> = {
      ...baseOfferMockToJohnnycage,
      idContract: '0xaddoffertest',
      expiresAt
    }
    const createdOffer = await addOffer(args)
    createdOfferId = createdOffer.id
    const document: Offer = (await getOfferById(createdOfferId))!
    expect(omit(['slug', 'locked', 'state'], document)).toStrictEqual(addOfferArrayIndexers(args))
    expect(document.state).toBe(OfferState.Open)
    expect(document.locked).toBe(false)
  })
})
