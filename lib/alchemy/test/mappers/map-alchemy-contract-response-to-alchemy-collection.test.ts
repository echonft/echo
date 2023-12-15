import { mapAlchemyContractResponseToAlchemyCollection } from '@echo/alchemy/mappers/map-alchemy-contract-response-to-alchemy-collection'
import { type AlchemyCollection } from '@echo/alchemy/types/model/alchemy-collection'
import { type AlchemyContractResponse } from '@echo/alchemy/types/response/alchemy-contract-response'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('mappers - mapAlchemyContractResponseToAlchemyCollection', () => {
  it('returns mapped nft collection', () => {
    const expected: AlchemyCollection = {
      contract: {
        tokenType: 'ERC721',
        address: toLower('0x320E2fA93A4010BA47EdcdE762802374baC8D3f7'),
        chainId: 1,
        name: 'Spiral Frequencies',
        symbol: 'GCP1'
      },
      description: 'description',
      discordUrl: 'https://discord.gg/genetic-chain',
      floorPrice: 0.037,
      name: 'Spiral Frequencies',
      profilePictureUrl:
        'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format',
      totalSupply: 6315,
      twitterUsername: 'GeneticChain',
      websiteUrl: 'https://geneticchain.io/project/1'
    }
    const response: AlchemyContractResponse = {
      address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
      name: 'Spiral Frequencies',
      symbol: 'GCP1',
      totalSupply: '6315',
      tokenType: 'ERC721',
      contractDeployer: '0xa50750ae4B64b0a64174Ca345870F1A8a5C9A2EE',
      deployedBlockNumber: 13284971,
      openSeaMetadata: {
        floorPrice: 0.037,
        collectionName: 'Spiral Frequencies',
        safelistRequestStatus: 'verified',
        imageUrl:
          'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format',
        description: 'description',
        externalUrl: 'https://geneticchain.io/project/1',
        twitterUsername: 'GeneticChain',
        discordUrl: 'https://discord.gg/genetic-chain',
        lastIngestedAt: '2023-03-22T19:05:31.000Z'
      }
    }
    expect(mapAlchemyContractResponseToAlchemyCollection(1)(response)).toStrictEqual(expected)
  })
})
