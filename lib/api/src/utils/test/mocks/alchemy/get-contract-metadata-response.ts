import { GetContractMetadataResponse } from '@echo/alchemy-v3'

export const mockGetContractMetadataResponse: { [key: string]: GetContractMetadataResponse } = {
  '0xe785E82358879F061BC3dcAC6f0444462D4b5330': {
    contract: {
      address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
      chainId: 1,
      tokenType: 'ERC721',
      name: 'Spiral Frequencies',
      symbol: 'GCP1'
    },
    description:
      'A **[Genetic Chain](https://geneticchain.io)** Project.\r\n\r\nProject #1: [Spiral Frequencies](https://geneticchain.io/project/1) by papaver\r\n\r\nSpirals twisting their beauty through hypnotic frequencies.\r\n\r\nThis is an on-chain dynamic NFT project. Token owners can customize certain art traits. Go to the [Spiral Frequencies DApp](https://geneticchain.io/project/1/dapp) and login using your MetaMask wallet.',
    discordUrl: 'https://discord.gg/genetic-chain',
    floorPrice: 0.037,
    name: 'Spiral Frequencies',
    profilePictureUrl:
      'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format',
    totalSupply: 6315,
    twitterUsername: 'GeneticChain',
    websiteUrl: 'https://geneticchain.io/project/1'
  }
}
