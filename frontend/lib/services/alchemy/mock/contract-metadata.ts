import { NftContract, NftTokenType } from 'alchemy-sdk'

export const mockContractMetadata: { [key: string]: NftContract } = {
  '0x12c63bbd266db84e117356e664f3604055166cec': {
    address: '0x12c63bbd266db84e117356e664f3604055166cec',
    name: 'Mythics Genesis',
    symbol: 'MGEN',
    totalSupply: '1077',
    tokenType: NftTokenType.ERC721,
  },
  '0x2106c00ac7da0a3430ae667879139e832307aeaa': {
    address: '0x2106c00ac7da0a3430ae667879139e832307aeaa',
    name: 'Loopy Donuts',
    symbol: 'DONUT',
    totalSupply: '10000',
    tokenType: NftTokenType.ERC721,
  },
  '0x495f947276749ce646f68ac8c248420045cb7b5e': {
    address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    name: 'OpenSea Shared Storefront',
    symbol: 'OPENSTORE',
    tokenType: NftTokenType.ERC1155,
  },
  '0x6e92a68f85464a47491331945825a5745066b771': {
    address: '0x6e92a68f85464a47491331945825a5745066b771',
    name: 'nerdsJPG',
    symbol: 'NRD',
    totalSupply: '908',
    tokenType: NftTokenType.ERC721,
  },
  '0xce82d65314502ce39472a2442d4a2cbc4cb9f293': {
    address: '0xce82d65314502ce39472a2442d4a2cbc4cb9f293',
    name: 'Animal Society',
    symbol: 'AS',
    totalSupply: '7777',
    tokenType: NftTokenType.ERC721,
  },
}
