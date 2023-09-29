import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { mapAlchemyNftToFirestore } from '@server/helpers/alchemy/map-alchemy-nft-to-firestore'

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
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
  const userWallet: WalletData = {
    address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
    chainId: 1
  }
  const mappedNft: Omit<FirestoreNft, 'id'> = {
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
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
        chainId: 1
      }
    }
  }

  it('returns the mapped nft', () => {
    const result = mapAlchemyNftToFirestore(alchemyNft, user, userWallet, collection)
    expect(result).toStrictEqual(mappedNft)
  })
})
