import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { getDiscordUserMockByUserId } from '@echo/firestore-mocks/get-discord-user-mock-by-user-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/get-nft-collection-mock-by-id'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { mapAlchemyNftToFirestore } from '@server/helpers/alchemy/map-alchemy-nft-to-firestore'

jest.mock('@echo/firestore/crud/discord-user/find-discord-user-by-user-id')

describe('helpers - alchemy - mapAlchemyNftToFirestore', () => {
  const alchemyNft: AlchemyNft = {
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
    pictureUrl: 'https://echo.xyz',
    thumbnailUrl: 'https://echo.xyz',
    tokenId: 1,
    tokenType: 'ERC721'
  }
  const collection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
  const user: AuthUser = {
    id: '6rECUMhevHfxABZ1VNOm',
    image: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    name: 'crewnft_'
  }
  const userWallet: FirestoreWallet = {
    id: 'wallet-id',
    userId: '6rECUMhevHfxABZ1VNOm',
    address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
    chainId: 1
  }
  it('throws if discord user is not found', async () => {
    jest.mocked(findDiscordUserByUserId).mockResolvedValueOnce(undefined)
    await expect(mapAlchemyNftToFirestore(alchemyNft, user, userWallet, collection)).rejects.toBeDefined()
  })

  it('returns the mapped nft', async () => {
    jest.mocked(findDiscordUserByUserId).mockResolvedValueOnce(getDiscordUserMockByUserId('6rECUMhevHfxABZ1VNOm'))
    const mappedNft = await mapAlchemyNftToFirestore(alchemyNft, user, userWallet, collection)
    expect(mappedNft).toStrictEqual({
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
        discordId: '884593489189433364',
        discordUsername: 'crewnft_',
        discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
        discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
        username: 'crewnft_',
        wallet: {
          address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
          chainId: 1
        }
      }
    })
  })
})
