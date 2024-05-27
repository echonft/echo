// map-offer-items-to-contract-offer-items.test.ts
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { mapOfferItemsToContractOfferItems } from '@echo/web3-dom/mappers/map-offer-items-to-contract-offer-items'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOfferItemsToContractOfferItems', () => {
  const singleItem = [getNftMockById('8hHFadIrrooORfTOLkBg')]
  const multipleItems = [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('QFjMRNChUAHNswkRADXh')]
  it('single item should map properly', () => {
    const output: ContractOfferItems = mapOfferItemsToContractOfferItems(singleItem)

    // Assuming mapOfferItemToContractOfferItem maps NFT item to ContractOfferItem in an appropriate way.
    const expectedOutput: ContractOfferItems = {
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
          tokenId: 1
        }
      ]
    }

    expect(output).toEqual(expectedOutput)
  })
  it('multiple items should map properly', () => {
    const output: ContractOfferItems = mapOfferItemsToContractOfferItems(multipleItems)

    // Assuming mapOfferItemToContractOfferItem maps NFT item to ContractOfferItem in an appropriate way.
    const expectedOutput: ContractOfferItems = {
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
          tokenId: 1
        },
        {
          tokenAddress: '0x12c63bbD266dB84e117356e664f3604055166CEc',
          tokenId: 1
        }
      ]
    }

    expect(output).toEqual(expectedOutput)
  })
})
