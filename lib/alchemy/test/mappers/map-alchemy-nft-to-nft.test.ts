import { mapAlchemyNftToNft } from '@echo/alchemy/mappers/map-alchemy-nft-to-nft'
import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('mappers - mapAlchemyNftToNft', () => {
  const alchemyNft: AlchemyNft = {
    contractAddress: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
    chainId: 1,
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' }
    ],
    balance: 1,
    name: 'nft-name',
    pictureUrl: 'https://echo.xyz',
    thumbnailUrl: 'https://echo.xyz',
    tokenId: 1,
    tokenType: 'ERC721'
  }
  const collection = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
  const user: User = {
    username: 'crewnft_',
    discord: {
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
    },
    wallet: {
      address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
      chainId: 1
    }
  }
  const mappedNft: Omit<Nft, 'id' | 'updatedAt'> = {
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' }
    ],
    balance: 1,
    name: 'nft-name',
    pictureUrl: 'https://echo.xyz',
    thumbnailUrl: 'https://echo.xyz',
    tokenId: 1,
    tokenType: 'ERC721',
    blurUrl: 'https://blur.io/asset/0x12c63bbd266db84e117356e664f3604055166cec/1',
    openSeaUrl: 'https://opensea.io/assets/ethereum/0x12c63bbd266db84e117356e664f3604055166cec/1',
    collection,
    owner: {
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chainId: 1
      }
    }
  }

  it('returns the mapped nft', () => {
    const result = mapAlchemyNftToNft(alchemyNft, user, collection)
    expect(result).toStrictEqual(mappedNft)
  })
})
