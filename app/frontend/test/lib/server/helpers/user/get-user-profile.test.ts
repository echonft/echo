import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getWalletMocksByUserId } from '@echo/firestore-mocks/wallet/get-wallet-mocks-by-user-id'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import { type UserProfile } from '@echo/model/types/user-profile'
import { toLower } from 'ramda'

jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('helpers - users - getUserProfile', () => {
  const userId = '6rECUMhevHfxABZ1VNOm'
  const user = getUserDocumentDataMockById(userId)
  const expectedProfile: UserProfile = {
    discord: {
      username: 'crewnft_',
      avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
      bannerColor: '#ffffff'
    },
    username: 'crewnft_',
    wallets: [
      {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chainId: 1
      }
    ]
  }
  it('returns the user profile', async () => {
    jest.mocked(getWalletsForUser).mockResolvedValueOnce(getWalletMocksByUserId(userId))
    const profile = await getUserProfile(user)
    expect(profile).toStrictEqual(expectedProfile)
  })
})
