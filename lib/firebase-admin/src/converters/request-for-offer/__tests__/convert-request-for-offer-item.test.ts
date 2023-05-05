/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contractData } from '../../../utils/test/mocks/contract/contract-data'
import { contractReferences, invalidContractReference } from '../../../utils/test/mocks/contract/contract-reference'
import { firestoreRequestForOfferItems } from '../../../utils/test/mocks/request-for-offer/firestore-request-for-offer-item'
import { requestsForOfferData } from '../../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { convertRequestForOfferItem } from '../convert-request-for-offer-item'
import { describe, expect, test } from '@jest/globals'

describe('converters - request-for-offer - convertRequestForOfferItem', () => {
  test('valid data returns proper object', async () => {
    const items = firestoreRequestForOfferItems
    const itemsData = requestsForOfferData['jUzMtPGKM62mMhEcmbN4']!.items
    let result = await Promise.all(items.map(convertRequestForOfferItem))
    expect(result).toHaveLength(items.length)
    result.map((item, index) => expect(item).toStrictEqual(itemsData[index]))

    // Undefined values passes
    const itemData = {
      contract: contractData['37dBlwJYahEAKeL0rNP8']!,
      tokenId: undefined,
      balance: undefined
    }
    // @ts-ignore
    result = await convertRequestForOfferItem({ contract: contractReferences['37dBlwJYahEAKeL0rNP8']! })
    expect(result).toStrictEqual(itemData)
    // TODO Should this pass?
    // @ts-ignore
    result = await convertRequestForOfferItem({})
    expect(result).toStrictEqual({
      contract: undefined,
      tokenId: undefined,
      balance: undefined
    })
  })
  test('invalid contract throws', async () => {
    try {
      // @ts-ignore
      await convertRequestForOfferItem({ contract: invalidContractReference })
      // Test that is errors
      expect(false).toBeTruthy()
    } catch (e) {
      expect((e as Error).message).toBe('Document does not exist. Path: contracts/test ID: test')
    }
  })
})
