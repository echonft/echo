import { NftCollection } from '../types/nft-collection'
import { contracts } from './contract'
import { discordGuilds } from './discord-guild'

export const nftCollections: { [key: string]: NftCollection } = {
  Rc8pLQXxgyQGIRL0fr13: {
    id: 'Rc8pLQXxgyQGIRL0fr13',
    bannerUrl: new URL(
      'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ?auto=format&dpr=1&w=3840'
    ),
    contract: contracts['37dBlwJYahEAKeL0rNP8']!,
    description:
      'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.\n\nIt is a blending of the ancient past and the rapidly approaching future - the greatest legends ever told, immortalized by technology that will define the future.\n\nOfficial Twitter: https://twitter.com/pxMythicsNFT',
    discordGuild: discordGuilds['ncUnbpFfVCofV9bD7ctn']!,
    discordUrl: new URL('https://discord.gg/pxmythics'),
    floorPrice: 0.025,
    name: 'pxMythics Genesis',
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
    contract: contracts['hK2XrmnMpCVneRH7Mbo6']!,
    description:
      'A **[Genetic Chain](https://geneticchain.io)** Project.\r\n\r\nProject #1: [Spiral Frequencies](https://geneticchain.io/project/1) by papaver\r\n\r\nSpirals twisting their beauty through hypnotic frequencies.\r\n\r\nThis is an on-chain dynamic NFT project. Token owners can customize certain art traits. Go to the [Spiral Frequencies DApp](https://geneticchain.io/project/1/dapp) and login using your MetaMask wallet.',
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    discordUrl: new URL('https://discord.gg/genetic-chain'),
    floorPrice: 0.037,
    name: 'Spiral Frequencies',
    profilePictureUrl: new URL(
      'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format'
    ),
    totalSupply: 6315,
    twitterUsername: 'GeneticChain',
    websiteUrl: new URL('https://geneticchain.io/project/1')
  }
}
