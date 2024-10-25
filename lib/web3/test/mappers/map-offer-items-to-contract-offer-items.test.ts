// map-offer-items-to-contract-offer-items.test.ts
import type { Item } from '@echo/model/types/item'
import { mapOfferItemsToContractOfferItems } from '@echo/web3/mappers/map-offer-items-to-contract-offer-items'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { describe, expect, it } from '@jest/globals'
import { type NonEmptyArray } from 'ramda'

describe('mappers - mapOfferItemsToContractOfferItems', () => {
  // const item = pipe(nftMockSpiralJohnnyId, getNftMockById as () => Erc721Nft, erc721NftToItem)()
  // const item2 = pipe(nftMockPxJohnnyId, getNftMockById as () => Erc721Nft, erc721NftToItem)()
  const singleItem: NonEmptyArray<Item> = [item]
  const multipleItems: NonEmptyArray<Item> = [item, item2]
  it('single item should map properly', () => {
    const output: ContractOfferItems = mapOfferItemsToContractOfferItems(singleItem)
    const expectedOutput: ContractOfferItems = {
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          tokenId: 1
        }
      ]
    }
    expect(output).toEqual(expectedOutput)
  })
  it('multiple items should map properly', () => {
    const output: ContractOfferItems = mapOfferItemsToContractOfferItems(multipleItems)
    const expectedOutput: ContractOfferItems = {
      chainId: 1,
      items: [
        {
          tokenAddress: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          tokenId: 1
        },
        {
          tokenAddress: '0x12c63bbd266db84e117356e664f3604055166cec',
          tokenId: 1
        }
      ]
    }
    expect(output).toEqual(expectedOutput)
  })
})
