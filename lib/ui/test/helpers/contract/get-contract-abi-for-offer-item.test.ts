import { describe, expect, it } from '@jest/globals'

// TODO Does not work with current jest config
describe('helpers - contract - getContractAbiForOfferItem', () => {
  it('TODO', () => {
    expect(true).toBeTruthy()
  })
  // it('returns the proper abi for an ERC721', () => {
  //   const contract: Contract = {
  //     name: 'Test',
  //     symbol: 'TEST',
  //     tokenType: 'ERC721',
  //     address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
  //     chainId: 1
  //   }
  //   const offerItem = {
  //     nft: {
  //       collection: {
  //         contract: contract
  //       }
  //     }
  //   } as OfferItem
  //   const abi = getContractAbiForOfferItem(offerItem)
  //   expect(abi).toStrictEqual(erc721ABI)
  // })
  // it('throws for non ERC721', () => {
  //   let contract: Contract = {
  //     name: 'Test',
  //     symbol: 'TEST',
  //     tokenType: 'ERC1155',
  //     address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
  //     chainId: 1
  //   }
  //   let offerItem = {
  //     nft: {
  //       collection: {
  //         contract: contract
  //       }
  //     }
  //   } as OfferItem
  //   expect(() => getContractAbiForOfferItem(offerItem)).toThrow()
  //
  //   contract = {
  //     name: 'Test',
  //     symbol: 'TEST',
  //     tokenType: 'ERC20',
  //     address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
  //     chainId: 1
  //   }
  //   offerItem = {
  //     nft: {
  //       collection: {
  //         contract: contract
  //       }
  //     }
  //   } as OfferItem
  //   expect(() => getContractAbiForOfferItem(offerItem)).toThrow()
  // })
})
