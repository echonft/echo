import { mapAlchemyNftToFirestore } from '../../../src/helpers/nft/map-alchemy-nft-to-firestore'
import { getNftCollectionByContract } from '../../../src/helpers/nft-collection/get-nft-collection-by-contract'
import { GetNftResponse } from '@echo/alchemy'
import { getNftCollectionMockById, getUserMockById, Wallet } from '@echo/firestore'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/nft-collection/get-nft-collection-by-contract')

describe('helpers - nft - mapAlchemyNftToFirestore', () => {
  const alchemyNft: GetNftResponse = {
    contractAddress: '0x12c63bbD266dB84e117356e664f3604055166CEc',
    chainId: 1,
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' }
    ],
    balance: 1,
    name: 'nft-name',
    pictureUrl: new URL('https://echo.xyz'),
    thumbnailUrl: new URL('https://echo.xyz'),
    tokenId: 1,
    tokenType: 'ERC721'
  }
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
  const userWallet: Wallet = {
    address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
    chainId: 1
  }
  it('throws if one ore more collections are not found', () => {
    jest.mocked(getNftCollectionByContract).mockImplementationOnce(() => undefined)
    expect(() => mapAlchemyNftToFirestore(alchemyNft, user, userWallet, [])).toThrow()
  })
  it('returns the mapped nft if all collections are found', () => {
    const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    jest.mocked(getNftCollectionByContract).mockImplementationOnce(() => collection)
    expect(mapAlchemyNftToFirestore(alchemyNft, user, userWallet, [])).toStrictEqual({
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' }
      ],
      balance: 1,
      name: 'nft-name',
      pictureUrl: new URL('https://echo.xyz'),
      thumbnailUrl: new URL('https://echo.xyz'),
      tokenId: 1,
      tokenType: 'ERC721',
      blurUrl: new URL('https://blur.io/asset/0x12c63bbD266dB84e117356e664f3604055166CEc/1'),
      openSeaUrl: new URL('https://opensea.io/assets/ethereum/0x12c63bbD266dB84e117356e664f3604055166CEc/1'),
      collection,
      owner: {
        id: '6rECUMhevHfxABZ1VNOm',
        discordId: '884593489189433364',
        discordUsername: 'crewNFT_#2034',
        discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
        discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
        wallet: userWallet
      }
    })
  })
})
