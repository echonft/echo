import { getContractOwnerOfForOfferItem } from '@echo/ui/helpers/contract/get-contract-owner-of-for-offer-item'
import { Contract } from '@echo/ui/types/model/contract'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { describe, expect, it } from '@jest/globals'
import { getAddress } from 'viem'

describe('helpers - contract - getContractFunctionNameForOfferItem', () => {
  it('returns ownerOf for ERC721', () => {
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
        },
        tokenType: 'ERC721'
      }
    } as OfferItem
    expect(getContractOwnerOfForOfferItem(offerItem)).toStrictEqual('ownerOf')
  })

  it('throws for non ERC721', () => {
    let contract: Contract = {
      name: 'Test',
      symbol: 'TEST',
      tokenType: 'ERC1155',
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }
    let offerItem = {
      nft: {
        collection: {
          contract: contract
        },
        tokenType: 'ERC1155'
      }
    } as OfferItem
    expect(() => getContractOwnerOfForOfferItem(offerItem)).toThrow()

    contract = {
      name: 'Test',
      symbol: 'TEST',
      tokenType: 'ERC20',
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }
    offerItem = {
      nft: {
        collection: {
          contract: contract
        },
        tokenType: 'ERC20'
      }
    } as unknown as OfferItem
    expect(() => getContractOwnerOfForOfferItem(offerItem)).toThrow()
  })
})
