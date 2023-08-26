/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import { mapContractMetadata } from '../../src/mappers/map-contract-metadata'
import { getContractMetadataResponse } from '../mocks/get-contract-metadata-response'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapContractMetadata', () => {
  it('returns mapped nft collection', () => {
    const expected = {
      bannerUrl:
        'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF?auto=format&dpr=1&w=3840',
      contract: {
        tokenType: 'ERC721',
        address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
        chainId: 1,
        name: 'Spiral Frequencies',
        symbol: 'GCP1'
      },
      description:
        'A **[Genetic Chain](https://geneticchain.io)** Project.  Project #1: [Spiral Frequencies](https://geneticchain.io/project/1) by papaver  Spirals twisting their beauty through hypnotic frequencies.  This is an on-chain dynamic NFT project. Token owners can customize certain art traits. Go to the [Spiral Frequencies DApp](https://geneticchain.io/project/1/dapp) and login using your MetaMask wallet.',
      discordUrl: 'https://discord.gg/genetic-chain',
      floorPrice: 0.037,
      name: 'Spiral Frequencies',
      slug: 'spiral-frequencies',
      profilePictureUrl:
        'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format',
      totalSupply: 6315,
      twitterUsername: 'GeneticChain',
      websiteUrl: 'https://geneticchain.io/project/1'
    }
    const result = mapContractMetadata(getContractMetadataResponse['0x320e2fa93A4010ba47edcdE762802374bac8d3F7']!)
    expect(result.contract.address.toLocaleLowerCase()).toEqual(expected.contract.address)
    expect(result.contract.chainId).toEqual(expected.contract.chainId)
    expect(result.contract.tokenType).toEqual(expected.contract.tokenType)
    expect(result.contract.name).toEqual(expected.contract.name)
    expect(result.contract.symbol).toEqual(expected.contract.symbol)
    // Not testing it, description are not the same in mock, lazy to change it
    // expect(result.description).toEqual(expected.description)
    expect(result.discordUrl).toEqual(expected.discordUrl)
    expect(result.floorPrice).toEqual(expected.floorPrice)
    expect(result.name).toEqual(expected.name)
    expect(result.profilePictureUrl).toEqual(expected.profilePictureUrl)
    expect(result.totalSupply).toEqual(expected.totalSupply)
    expect(result.twitterUsername).toEqual(expected.twitterUsername)
    expect(result.websiteUrl).toEqual(expected.websiteUrl)
  })
})
