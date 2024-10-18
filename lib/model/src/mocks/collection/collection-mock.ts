import { TokenType } from '@echo/model/constants/token-type'
import { type Collection } from '@echo/model/types/collection/collection'
import type { Slug } from '@echo/model/types/slug'
import type { Wallet } from '@echo/model/types/wallet'
import { Chain } from '@echo/utils/constants/chain'
import { toLower } from 'ramda'

export function collectionMockPxId() {
  return 'Rc8pLQXxgyQGIRL0fr13'
}
export function collectionMockPxSlug(): Slug {
  return 'pxmythics-genesis'
}
export function collectionMockPxContract(): Wallet {
  return {
    address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
    chain: Chain.Ethereum
  }
}
export function collectionMockSpiralId() {
  return '1aomCtnoesD7WVll6Yi1'
}
export function collectionMockSpiralSlug(): Slug {
  return 'spiral-frequencies'
}
export function collectionMockSpiralContract(): Wallet {
  return {
    address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
    chain: Chain.Ethereum
  }
}

export function collectionMock(): Record<string, Collection> {
  return {
    Rc8pLQXxgyQGIRL0fr13: {
      bannerUrl:
        'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ',
      contract: collectionMockPxContract(),
      description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
      discordUrl: 'https://discord.gg/pxmythics',
      name: 'pxMythics Genesis',
      slug: collectionMockPxSlug(),
      profilePictureUrl:
        'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ',
      totalSupply: 1077,
      type: TokenType.Erc721,
      verified: true
    },
    '1aomCtnoesD7WVll6Yi1': {
      bannerUrl:
        'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF',
      contract: collectionMockSpiralContract(),
      description: 'A Genetic Chain Project.',
      discordUrl: 'https://discord.gg/genetic-chain',
      name: 'Spiral Frequencies',
      slug: collectionMockSpiralSlug(),
      profilePictureUrl:
        'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8',
      totalSupply: 6315,
      type: TokenType.Erc721,
      verified: false
    }
  }
}
