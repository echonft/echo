import type { Contract } from '@echo/model/types/contract'
import type { OfferItem } from '@echo/model/types/offer-item'
import { getContractOwnerOfForTokenType } from '@echo/ui/helpers/contract/get-contract-owner-of-for-token-type'
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
    expect(getContractOwnerOfForTokenType(offerItem.nft.tokenType)).toStrictEqual('ownerOf')
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
    expect(() => getContractOwnerOfForTokenType(offerItem.nft.tokenType)).toThrow()

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
    expect(() => getContractOwnerOfForTokenType(offerItem.nft.tokenType)).toThrow()
  })
})
