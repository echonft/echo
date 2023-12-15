import { mapAlchemyNftResponseToAlchemyNft } from '@echo/alchemy/mappers/map-alchemy-nft-response-to-alchemy-nft'
import { type AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { type AlchemyNftResponse } from '@echo/alchemy/types/response/alchemy-nft-response'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('mappers - mapAlchemyNftResponseToAlchemyNft', () => {
  it('returns mapped nft collection', () => {
    const expected: AlchemyNft = {
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' },
        { value: 'cumulus', trait: 'Density' },
        { value: '0001', trait: 'Colors' },
        { value: 'random1', trait: 'Palette' },
        { value: '#complement', trait: 'Background' }
      ],
      balance: 1,
      contractAddress: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
      chainId: 1,
      name: 'Spiral Frequencies #1376',
      pictureUrl:
        'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      thumbnailUrl:
        'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1376,
      tokenType: 'ERC721'
    }
    const response: AlchemyNftResponse = {
      contract: {
        address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
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
          description:
            'A **[Genetic Chain](https://geneticchain.io)** Project.\r\n\r\nProject #1: [Spiral Frequencies](https://geneticchain.io/project/1) by papaver\r\n\r\nSpirals twisting their beauty through hypnotic frequencies.\r\n\r\nThis is an on-chain dynamic NFT project. Token owners can customize certain art traits. Go to the [Spiral Frequencies DApp](https://geneticchain.io/project/1/dapp) and login using your MetaMask wallet.',
          externalUrl: 'https://geneticchain.io/project/1',
          twitterUsername: 'GeneticChain',
          discordUrl: 'https://discord.gg/genetic-chain',
          lastIngestedAt: '2023-03-22T19:05:31.000Z'
        },
        isSpam: undefined,
        spamClassifications: []
      },
      tokenId: '1376',
      tokenType: 'ERC721',
      name: 'Spiral Frequencies #1376',
      description:
        'A **[Genetic Chain](https://geneticchain.io)** Project.\n\n**Project #1**: [Spiral Frequencies](https://geneticchain.io/project/1) by papaver\n\nSpirals twisting their beauty through hypnotic frequencies.',
      image: {
        cachedUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        contentType: 'image/png',
        size: 18986,
        originalUrl: 'https://geneticchain.io/api/project/1/token/1376/image'
      },
      raw: {
        tokenUri: 'https://geneticchain.io/api/project/1/token/1376/meta',
        metadata: {
          image: 'https://geneticchain.io/api/project/1/token/1376/image',
          name: 'Spiral Frequencies #1376',
          attributes: [
            {
              value: 'archimedean',
              trait_type: 'Algorithm'
            },
            {
              value: 'main',
              trait_type: 'Ring'
            },
            {
              value: 'movie',
              trait_type: 'Animation'
            },
            {
              value: '5',
              trait_type: 'Speed'
            },
            {
              value: 'cumulus',
              trait_type: 'Density'
            },
            {
              value: '0001',
              trait_type: 'Colors'
            },
            {
              value: 'random1',
              trait_type: 'Palette'
            },
            {
              value: '#complement',
              trait_type: 'Background'
            }
          ]
        },
        error: undefined
      },
      tokenUri: 'https://geneticchain.io/api/project/1/token/1376/meta',
      timeLastUpdated: '2022-12-23T06:24:54.339Z'
    }
    expect(mapAlchemyNftResponseToAlchemyNft(1)(response)).toStrictEqual(expected)
  })
})
