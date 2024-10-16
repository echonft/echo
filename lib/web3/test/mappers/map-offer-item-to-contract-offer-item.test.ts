import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft/nft'
import { mapOfferItemToContractOfferItem } from '@echo/web3/mappers/map-offer-item-to-contract-offer-item'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mappers - mapOfferItemToContractOfferItem', () => {
  it('should correctly map Nft to ContractOfferItem', () => {
    const item: Nft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    const expectedOutput: ContractOfferItem = {
      tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
      tokenId: 1
    }
    const result = mapOfferItemToContractOfferItem(item)
    expect(result).toEqual(expectedOutput) // Check if result is the same as the expected output
  })
})
