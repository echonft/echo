import { type Collection } from '@echo/model/types/collection'
import { toLower } from 'ramda'

export const collectionMock: Record<string, Collection> = {
  Rc8pLQXxgyQGIRL0fr13: {
    id: 'Rc8pLQXxgyQGIRL0fr13',
    bannerUrl:
      'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ',
    contracts: [
      {
        address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
        chain: 'ethereum'
      }
    ],
    description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
    discordUrl: 'https://discord.gg/pxmythics',
    name: 'pxMythics Genesis',
    slug: 'pxmythics-genesis',
    profilePictureUrl:
      'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ',
    totalSupply: 1077,
    verified: true
  },
  '1aomCtnoesD7WVll6Yi1': {
    id: '1aomCtnoesD7WVll6Yi1',
    bannerUrl:
      'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF',
    contracts: [
      {
        address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
        chain: 'ethereum'
      }
    ],
    description: 'A Genetic Chain Project.',
    discordUrl: 'https://discord.gg/genetic-chain',
    name: 'Spiral Frequencies',
    slug: 'spiral-frequencies',
    profilePictureUrl:
      'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8',
    totalSupply: 6315,
    verified: false
  }
}
