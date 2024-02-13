import { mapContractResponse } from '@echo/alchemy/mappers/map-contract-response'
import { type ContractResponse } from '@echo/alchemy/types/response/contract-response'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { omit, toLower } from 'ramda'

describe('mappers - mapContractResponse', () => {
  it('returns mapped nft collection', () => {
    const response: ContractResponse = {
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
        description: 'A Genetic Chain Project.',
        externalUrl: 'https://geneticchain.io/project/1',
        twitterUsername: 'GeneticChain',
        discordUrl: 'https://discord.gg/genetic-chain',
        lastIngestedAt: '2023-03-22T19:05:31.000Z',
        collectionSlug: 'spiral-frequencies',
        bannerImageUrl:
          'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF?auto=format&dpr=1&w=3840'
      }
    }
    expect(mapContractResponse(1)(response)).toStrictEqual(omit(['id'], getCollectionMockById('1aomCtnoesD7WVll6Yi1')))
  })
})
