import { mapOfferItem } from '../../../src/lib/server/mappers/to-response/map-offer-item'
import { getOfferMockById } from '@echo/firestore'

describe('mappers - to-response - mapOfferItem', () => {
  const item = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi').receiverItems[0]
  it('converts the object', () => {
    expect(mapOfferItem(item)).toStrictEqual({
      amount: 1,
      nft: {
        id: '8hHFadIrrooORfTOLkBg',
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
        blurUrl: 'https://blur.io/asset/0x320e2fa93A4010ba47edcdE762802374bac8d3F7/1376',
        collection: {
          id: '1aomCtnoesD7WVll6Yi1',
          bannerUrl:
            'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF?auto=format&dpr=1&w=3840',
          blurUrl: 'https://blur.io/collection/spiral-frequencies',
          contract: {
            tokenType: 'ERC721',
            address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
            chainId: 1
          },
          description: 'A Genetic Chain Project.',
          discordUrl: 'https://discord.gg/genetic-chain',
          floorPrice: 0.037,
          name: 'Spiral Frequencies',
          openSeaUrl: 'https://opensea.io/collection/spiral-frequencies',
          slug: 'spiral-frequencies',
          profilePictureUrl:
            'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format',
          totalSupply: 6315,
          twitterUsername: 'GeneticChain',
          websiteUrl: 'https://geneticchain.io/project/1'
        },
        name: 'Spiral Frequencies #1376',
        owner: {
          id: 'oE6yUEQBPn7PZ89yMjKn',
          discordId: '462798252543049728',
          discordUsername: 'johnnycage#0890',
          discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
          wallet: {
            address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
            chainId: 1
          }
        },
        openSeaUrl: 'https://opensea.io/assets/ethereum/0x320e2fa93A4010ba47edcdE762802374bac8d3F7/1376',
        pictureUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        tokenId: 1376,
        tokenType: 'ERC721'
      }
    })
  })
})
