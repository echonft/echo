import { NftCollection } from '../../src/types/model/converted/nft-collection'
import { contractMock } from './contract-mock'
import { discordGuildMock } from './discord-guild-mock'

export const nftCollectionMock: { [key: string]: NftCollection } = {
  Rc8pLQXxgyQGIRL0fr13: {
    id: 'Rc8pLQXxgyQGIRL0fr13',
    bannerUrl: new URL(
      'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ?auto=format&dpr=1&w=3840'
    ),
    blurUrl: undefined,
    contractId: contractMock['37dBlwJYahEAKeL0rNP8']!.id,
    description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
    discordGuildId: discordGuildMock['ncUnbpFfVCofV9bD7ctn']!.id,
    discordUrl: new URL('https://discord.gg/pxmythics'),
    floorPrice: 0.025,
    name: 'pxMythics Genesis',
    openSeaUrl: new URL('https://opensea.io/collection/pxmythics-genesis'),
    slug: 'pxmythics-genesis',
    profilePictureUrl: new URL(
      'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ?w=500&auto=format'
    ),
    totalSupply: 1077,
    twitterUsername: undefined,
    websiteUrl: new URL('https://pxmythics.io')
  },
  '1aomCtnoesD7WVll6Yi1': {
    id: '1aomCtnoesD7WVll6Yi1',
    bannerUrl: new URL(
      'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF?auto=format&dpr=1&w=3840'
    ),
    blurUrl: new URL('https://blur.io/collection/spiral-frequencies'),
    contractId: contractMock['hK2XrmnMpCVneRH7Mbo6']!.id,
    description: 'A Genetic Chain Project.',
    discordGuildId: discordGuildMock['xA40abnyBq6qQHSYmtHj']!.id,
    discordUrl: new URL('https://discord.gg/genetic-chain'),
    floorPrice: 0.037,
    name: 'Spiral Frequencies',
    openSeaUrl: new URL('https://opensea.io/collection/spiral-frequencies'),
    slug: 'spiral-frequencies',
    profilePictureUrl: new URL(
      'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format'
    ),
    totalSupply: 6315,
    twitterUsername: 'GeneticChain',
    websiteUrl: new URL('https://geneticchain.io/project/1')
  }
}
