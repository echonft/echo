import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { Expiration } from '@echo/model/constants/expiration'
import { OfferState } from '@echo/model/constants/offer-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import { listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Item } from '@echo/model/types/item/item'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import type { Offer } from '@echo/model/types/offer/offer'
import { resetListing } from '@echo/test/firestore/crud/listing/reset-listing'
import { deleteOffer } from '@echo/test/firestore/crud/offer/delete-offer'
import { castTo } from '@echo/utils/fp/cast-to'
import { eqList } from '@echo/utils/fp/eq-list'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, type NonEmptyArray, omit, pick, pipe, prop } from 'ramda'

describe('CRUD - offer - addOffer', () => {
  let createdOfferId: Nullable<string>
  beforeEach(() => {
    createdOfferId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferId)) {
      await deleteOffer(createdOfferId)
      await resetListing(listingMockSlug())
    }
  })

  it('throws if the offer is a duplicate', async () => {
    const offerMock = getOfferMockById(offerMockToJohnnycageId())
    const baseOffer = pick(
      ['expiresAt', 'receiver', 'receiverItems', 'receiverItems', 'sender', 'senderItems'],
      offerMock
    )
    await expect(addOffer({ ...baseOffer, idContract: offerMock.idContract })).rejects.toEqual(Error(OfferError.Exists))
    const offers = await getAllOffers()
    expect(eqList(offers, getAllOfferMocks())).toBeTruthy()
  })

  it('add an offer', async () => {
    const expiresAt = expirationToDateNumber(Expiration.OneDay)
    const args: BaseOffer & Pick<Offer, 'idContract'> = {
      idContract: '0xaddoffertest',
      expiresAt,
      receiver: pipe(nftMockSpiralJohnnyId, getNftMockById, prop('owner'))(),
      receiverItems: [
        pipe(nftMockSpiralJohnnyId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)(),
        pipe(nftMockSpiralJohnny2Id, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)()
      ] as NonEmptyArray<Item>,
      sender: pipe(nftMockPxCrewId, getNftMockById, prop('owner'))(),
      senderItems: [pipe(nftMockPxCrewId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)()] as NonEmptyArray<Item>
    }
    const createdOffer = await addOffer(args)
    createdOfferId = createdOffer.id
    const document: Offer = (await getOfferById(createdOfferId))!
    expect(omit(['slug', 'locked', 'state'], document)).toStrictEqual(args)
    expect(document.state).toBe(OfferState.Open)
    expect(document.locked).toBe(false)
  })
})
