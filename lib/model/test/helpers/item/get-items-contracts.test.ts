import { getItemsContracts } from '@echo/model/helpers/item/get-items-contracts'
import type { Contract } from '@echo/model/types/contract'
import type { Item } from '@echo/model/types/item'
import { describe, expect, it } from '@jest/globals'
import { getAddress } from 'viem'

describe('helpers - item - getItemsContracts', () => {
  it('returns the contract if there is only 1 contract', () => {
    const contract: Contract = {
      name: 'Test',
      symbol: 'TEST',
      tokenType: 'ERC721',
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }
    const item = {
      nft: {
        collection: {
          contract: contract
        }
      }
    } as Item
    const contracts = getItemsContracts([item])
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
    const item = {
      nft: {
        collection: {
          contract: contract
        }
      }
    } as Item
    const contracts = getItemsContracts([item, item, item])
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
    const item1 = {
      nft: {
        collection: {
          contract: contract1
        }
      }
    } as Item
    const item2 = {
      nft: {
        collection: {
          contract: contract2
        }
      }
    } as Item
    const contracts = getItemsContracts([item1, item2, item1, item2])
    expect(contracts.length).toStrictEqual(2)
    expect(contracts[0]).toStrictEqual(contract1)
    expect(contracts[1]).toStrictEqual(contract2)
  })
})
