import { contractData } from '../../../utils/test/mocks/contract/contract-data'
import { buildRequestForOfferItem } from '../build-request-for-offer-item'
import { describe, expect, test } from '@jest/globals'

describe('builders - request-for-offer - buildRequestForOfferItem', () => {
  test('invalid contract throws an error', async () => {
    try {
      await buildRequestForOfferItem({
        tokenId: BigInt(0),
        contract: { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 0 }
      })
      // Make sure the test throws
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toBe('buildRequestForOfferItem contract does not exist')
    }

    try {
      await buildRequestForOfferItem({
        tokenId: BigInt(0),
        contract: { address: 'test', chainId: 1 }
      })
      // Make sure the test throws
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toBe('buildRequestForOfferItem contract does not exist')
    }
  })
  test('valid data returns proper object', async () => {
    let requestForOfferItem = await buildRequestForOfferItem({
      tokenId: BigInt(0),
      contract: { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 }
    })
    expect(requestForOfferItem.balance).toBeUndefined()
    expect(requestForOfferItem.tokenId).toBe(BigInt(0))
    expect(requestForOfferItem.contract.path).toBe(contractData['37dBlwJYahEAKeL0rNP8']!.refPath)

    requestForOfferItem = await buildRequestForOfferItem({
      tokenId: BigInt(100),
      balance: 1,
      contract: { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 }
    })
    expect(requestForOfferItem.balance).toBe(1)
    expect(requestForOfferItem.tokenId).toBe(BigInt(100))
    expect(requestForOfferItem.contract.path).toBe(contractData['37dBlwJYahEAKeL0rNP8']!.refPath)
  })
})
