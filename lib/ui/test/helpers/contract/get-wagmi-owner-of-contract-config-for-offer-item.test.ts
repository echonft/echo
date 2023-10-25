import { describe, expect, it } from '@jest/globals'

// TODO Does not work with current jest config
describe('helpers - contract - getWagmiOwnerOfContractConfigForOfferItem', () => {
  it('TODO', () => {
    expect(true).toBeTruthy()
  })
  // it('returns the proper config for an ERC721', () => {
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
  //       },
  //       tokenId: 0
  //     }
  //   } as OfferItem
  //   const config = getWagmiOwnerOfContractConfigForOfferItem(offerItem)
  //   expect(config.address).toStrictEqual(contract.address)
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   expect(config.chainId).toStrictEqual(contract.chainId)
  //   expect(config.functionName).toStrictEqual('ownerOf')
  //   expect(config.abi).toStrictEqual(erc721ABI)
  //   expect(config.args).toStrictEqual([offerItem.nft.tokenId])
  // })
})
