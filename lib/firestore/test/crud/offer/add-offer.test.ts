import { addOfferArrayIndexers } from '@echo/firestore/array-indexers/offer/add-offer-array-indexers'
import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { Expiration } from '@echo/model/constants/expiration'
import { OfferState } from '@echo/model/constants/offer-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { baseOfferMockToJohnnycage, offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { resetListing } from '@echo/test/firestore/crud/listing/reset-listing'
import { deleteOffer } from '@echo/test/firestore/crud/offer/delete-offer'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pick, pipe } from 'ramda'

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
  })

  it('add an offer', async () => {
    const expiresAt = expirationToDateNumber(Expiration.OneDay)
    const args: Pick<
      OfferDocument,
      'expiresAt' | 'idContract' | 'receiver' | 'receiverItems' | 'sender' | 'senderItems'
    > = {
      ...baseOfferMockToJohnnycage,
      idContract: '0xaddoffertest',
      expiresAt
    }
    const createdOffer = await addOffer(args)
    createdOfferId = createdOffer.id
    const document: Offer = (await getOfferById(createdOfferId))!
    expect(document.state).toBe(OfferState.Open)
    expect(document.locked).toBe(false)
    const expected = pipe<
      [
        Omit<
          OfferDocument,
          | 'receiverItemCollections'
          | 'receiverItemIndexes'
          | 'senderItemCollections'
          | 'senderItemIndexes'
          | 'slug'
          | 'locked'
          | 'state'
        >
      ],
      Omit<
        OfferDocument,
        | 'receiverItemCollections'
        | 'receiverItemIndexes'
        | 'senderItemCollections'
        | 'senderItemIndexes'
        | 'locked'
        | 'state'
      >,
      Omit<
        OfferDocument,
        'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes' | 'state'
      >,
      Omit<
        OfferDocument,
        'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
      >,
      OfferDocument
    >(
      assoc('slug', document.slug),
      assoc('locked', document.locked),
      assoc('state', document.state),
      addOfferArrayIndexers
    )(args)
    expect(document).toStrictEqual(expected)
  })
})
