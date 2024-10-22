import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { Expiration } from '@echo/model/constants/expiration'
import { OfferState } from '@echo/model/constants/offer-state'
import { expirationToDate } from '@echo/model/helpers/expiration-to-date'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import { listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
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
import dayjs from 'dayjs'
import { isNil, type NonEmptyArray, pick, pipe, prop } from 'ramda'

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
    await expect(addOffer({ ...baseOffer, idContract: offerMock.idContract })).rejects.toBeDefined()
    const offers = await getAllOffers()
    expect(eqList(offers, getAllOfferMocks())).toBeTruthy()
  })

  it('add an offer', async () => {
    const expiresAt = expirationToDate(Expiration.OneDay)
    const senderItems: NonEmptyArray<Item> = [
      pipe(nftMockPxCrewId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)()
    ]
    const receiverItems: NonEmptyArray<Item> = [
      pipe(nftMockSpiralJohnnyId, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)(),
      pipe(nftMockSpiralJohnny2Id, getNftMockById, castTo<Erc721Nft>, erc721NftToItem)()
    ]
    const baseOffer: BaseOffer = {
      expiresAt: expiresAt.unix(),
      receiver: pipe(nftMockSpiralJohnnyId, getNftMockById, prop('owner'))(),
      receiverItems,
      sender: pipe(nftMockPxCrewId, getNftMockById, prop('owner'))(),
      senderItems
    }
    const idContract = '0xaddoffertest'
    const createdOffer = await addOffer({ ...baseOffer, idContract })
    createdOfferId = createdOffer.id
    const newOffer: Offer = (await getOfferById(createdOfferId))!
    expect(newOffer.receiver).toStrictEqual(getUserMockByUsername(userMockJohnnyUsername()))
    expect(eqList(newOffer.receiverItems, receiverItems)).toBeTruthy()
    expect(newOffer.sender).toStrictEqual(getUserMockByUsername(userMockCrewUsername()))
    expect(eqList(newOffer.senderItems, senderItems)).toBeTruthy()
    expect(newOffer.state).toBe(OfferState.Open)
    expect(newOffer.idContract).toBe(idContract)
    expect(dayjs.unix(newOffer.expiresAt).isAfter(expiresAt.subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(newOffer.expiresAt).isBefore(expiresAt.add(1, 'minute'))).toBeTruthy()
  })
})
