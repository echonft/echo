import type { Nft } from '@echo/model/types/nft'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { mapOfferItemToContractOfferItem } from '@echo/web3-dom/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItem } from '@echo/web3-dom/types/contract-offer-item'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOfferItemToContractOfferItem', () => {
  // create a mock Nft object
  const item: Nft = getNftMockById('8hHFadIrrooORfTOLkBg')

  it('should correctly map Nft to ContractOfferItem', () => {
    const expectedOutput: ContractOfferItem = {
      tokenAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
      tokenId: 1
    }

    const result = mapOfferItemToContractOfferItem(item)

    expect(result).toEqual(expectedOutput) // Check if result is the same as the expected output
  })
})
