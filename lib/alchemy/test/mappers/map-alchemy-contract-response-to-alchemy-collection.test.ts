import { mapAlchemyContractResponseToAlchemyCollection } from '@echo/alchemy/mappers/map-alchemy-contract-response-to-alchemy-collection'
import type { AlchemyCollection } from '@echo/alchemy/types/model/alchemy-collection'
import { describe, expect, it } from '@jest/globals'
import { alchemyContractResponseMock } from '@test/mocks/alchemy-contract-response-mock'

describe('mappers - mapAlchemyContractResponseToAlchemyCollection', () => {
  it('returns mapped nft collection', () => {
    const expected: AlchemyCollection = {
      contract: {
        tokenType: 'ERC721',
        address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
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
    const response = alchemyContractResponseMock['0x320e2fa93A4010ba47edcdE762802374bac8d3F7']!
    expect(mapAlchemyContractResponseToAlchemyCollection(response)).toStrictEqual(expected)
  })
})
