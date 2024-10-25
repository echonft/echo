import { mapOfferItemToContractOfferItem } from '@echo/web3/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOfferItemToContractOfferItem', () => {
  it('should correctly map Nft to ContractOfferItem', () => {
    // const item = erc721NftToItem(nftMockSpiral1 as Erc721Nft)
    const expectedOutput: ContractOfferItem = {
      tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
      tokenId: 1
    }
    const result = mapOfferItemToContractOfferItem(item)
    expect(result).toEqual(expectedOutput) // Check if result is the same as the expected output
  })
})
