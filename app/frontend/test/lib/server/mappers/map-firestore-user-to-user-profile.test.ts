import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getWalletMocksByUserId } from '@echo/firestore-mocks/wallet/get-wallet-mocks-by-user-id'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/server/mappers/map-firestore-user-to-user-profile'
import { type UserProfile } from '@echo/model/types/user-profile'
import { formatAddress } from '@echo/utils/helpers/format-address'

describe('mappers - mapFirestoreUserToUserProfile', () => {
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
  const wallets = getWalletMocksByUserId('6rECUMhevHfxABZ1VNOm')
  const response: UserProfile = {
    discord: {
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    },
    username: 'crewnft_',
    wallets: [
      {
        address: formatAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
        chainId: 1
      }
    ]
  }
  it('converts the object', () => {
    expect(mapFirestoreUserToUserProfile(user, wallets)).toStrictEqual(response)
  })
})
