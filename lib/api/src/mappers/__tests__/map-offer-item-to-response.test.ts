/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OfferItemResponse } from '../../types/model/responses/offer-item-response'
import { mapOfferItemToResponse } from '../map-offer-item-to-response'
import { offers } from '@echo/firebase-admin'
import { OfferItem } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { omit, pick } from 'ramda'

describe('mappers - mapOfferItemToResponse', () => {
  const senderItem = offers['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems[0]!
  const receiverItem = offers['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems[0]!
  it('correct data returns the request', () => {
    let offerItem = senderItem
    let expectedResult: OfferItemResponse = { ...offerItem, tokenId: offerItem.tokenId.toString() }
    expect(mapOfferItemToResponse(offerItem)).toStrictEqual(expectedResult)
    offerItem = { ...senderItem, balance: 10 }
    expectedResult = { ...offerItem, tokenId: offerItem.tokenId.toString(), balance: 10 }
    expect(mapOfferItemToResponse(offerItem)).toStrictEqual(expectedResult)
    offerItem = receiverItem
    expectedResult = { ...offerItem, tokenId: offerItem.tokenId.toString() }
    expect(mapOfferItemToResponse(offerItem)).toStrictEqual(expectedResult)
  })

  it('invalid data passes', () => {
    // @ts-ignore
    let offerItem: OfferItem = pick(['tokenId'], senderItem)
    // @ts-ignore
    let expectedResult: OfferItemResponse = { tokenId: offerItem.tokenId.toString() }
    expect(mapOfferItemToResponse(offerItem)).toStrictEqual(expectedResult)
    offerItem = {
      ...senderItem,
      // @ts-ignore
      contract: {
        address: senderItem.contract.address
      }
    }
    expectedResult = {
      ...offerItem,
      // @ts-ignore
      contract: { address: senderItem.contract.address },
      tokenId: offerItem.tokenId.toString()
    }
    expect(mapOfferItemToResponse(offerItem)).toStrictEqual(expectedResult)
  })
  it('invalid data throws', () => {
    // @ts-ignore
    const offerItem: OfferItem = omit(['tokenId'], senderItem)
    try {
      mapOfferItemToResponse(offerItem)
      expect(false).toBeTruthy()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
