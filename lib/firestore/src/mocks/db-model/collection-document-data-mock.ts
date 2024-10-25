import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { toLower } from 'ramda'

export function collectionDocumentDataMock(): Record<string, CollectionDocumentData> {
  return {
    Rc8pLQXxgyQGIRL0fr13: {
      contract: {
        address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
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
    },
    AaomCtnoesD7WVll6Yi1: {
      contract: {
        address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
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
  }
}

export function collectionMockPxId() {
  return 'Rc8pLQXxgyQGIRL0fr13'
}

export function collectionMockSpiralId() {
  return 'AaomCtnoesD7WVll6Yi1'
}
