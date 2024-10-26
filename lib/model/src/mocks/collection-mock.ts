import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { type Collection, type CollectionWithCounts } from '@echo/model/types/collection'
import type { NftCollection } from '@echo/model/types/nft'

export const collectionMockPx: Collection = {
  contract: {
    address: '0x12c63bbd266db84e117356e664f3604055166cec',
    chain: Chain.Ethereum
  },
  description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
  discordUrl: 'https://discord.gg/pxmythics',
  name: 'pxMythics Genesis',
  slug: 'pxmythics-genesis',
  profilePictureUrl:
    'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ',
  totalSupply: 1077,
  type: TokenType.Erc721,
  verified: true
}

export const nftCollectionMockPx: NftCollection = {
  contract: {
    address: '0x12c63bbd266db84e117356e664f3604055166cec',
    chain: Chain.Ethereum
  },
  name: 'pxMythics Genesis',
  slug: 'pxmythics-genesis',
  totalSupply: 1077
}

export const collectionMockSpiral: Collection = {
  contract: {
    address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
    chain: Chain.Ethereum
  },
  description: 'A Genetic Chain Project.',
  discordUrl: 'https://discord.gg/genetic-chain',
  name: 'Spiral Frequencies',
  slug: 'spiral-frequencies',
  profilePictureUrl:
    'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8',
  totalSupply: 6315,
  type: TokenType.Erc721,
  verified: false
}

export const nftCollectionMockSpiral: NftCollection = {
  contract: {
    address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
    chain: Chain.Ethereum
  },
  name: 'Spiral Frequencies',
  slug: 'spiral-frequencies',
  totalSupply: 6315
}

export const collectionWithCountsMock: CollectionWithCounts = {
  ...collectionMockSpiral,
  listingsCount: 57,
  swapsCount: 35,
  nftsCount: 220,
  offersCount: 108
}
export const collectionMocks: Collection[] = [collectionMockPx, collectionMockSpiral]
