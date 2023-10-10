import { getOfferItemsUniqueContracts } from '@echo/ui/helpers/offer/get-offer-items-unique-contracts'
import { Contract } from '@echo/ui/types/model/contract'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { describe, expect, it } from '@jest/globals'
import { getAddress } from 'viem'

describe('helpers - offer - getOfferItemsUniqueContracts', () => {
  it('returns the contract if there is only 1 contract', () => {
    const contract: Contract = {
      name: 'Test',
      symbol: 'TEST',
      tokenType: 'ERC721',
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }
    const offerItem = {
      nft: {
        collection: {
          contract: contract
        }
      }
    } as OfferItem
    const contracts = getOfferItemsUniqueContracts([offerItem])
    expect(contracts.length).toStrictEqual(1)
    expect(contracts[0]).toStrictEqual(contract)
  })

  it('returns 1 contract if all the contract are the same', () => {
    const contract: Contract = {
      name: 'Test',
      symbol: 'TEST',
      tokenType: 'ERC721',
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }
    const offerItem = {
      nft: {
        collection: {
          contract: contract
        }
      }
    } as OfferItem

    const contracts = getOfferItemsUniqueContracts([offerItem, offerItem, offerItem])
    expect(contracts.length).toStrictEqual(1)
    expect(contracts[0]).toStrictEqual(contract)
  })

  it('returns 2 contracts if there are 2 different contracts in the offer items', () => {
    const contract1: Contract = {
      name: 'Test',
      symbol: 'TEST',
      tokenType: 'ERC721',
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }

    const contract2: Contract = {
      name: 'Test2',
      symbol: 'TEST2',
      tokenType: 'ERC721',
      address: getAddress('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09', 1),
      chainId: 1
    }
    const offerItem1 = {
      nft: {
        collection: {
          contract: contract1
        }
      }
    } as OfferItem

    const offerItem2 = {
      nft: {
        collection: {
          contract: contract2
        }
      }
    } as OfferItem

    const contracts = getOfferItemsUniqueContracts([offerItem1, offerItem2, offerItem1, offerItem2])
    expect(contracts.length).toStrictEqual(2)
    expect(contracts[0]).toStrictEqual(contract1)
    expect(contracts[1]).toStrictEqual(contract2)
  })
})
