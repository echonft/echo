import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUserDocumentDataMockById } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-id'
import { getWalletDocumentDataMockByUserId } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-user-id'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import { type UserProfile } from '@echo/model/types/user-profile'
import { userMockCrewUsername } from '@echo/model/mocks/user/user-mock'
import { getUserProfileMockByUsername } from '@echo/model/mocks/user/user-profile-mock'

jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('helpers - users - getUserProfile', () => {
  const userId = '6rECUMhevHfxABZ1VNOm'
  const user = getUserDocumentDataMockById(userId)
  const expectedProfile: UserProfile = getUserProfileMockByUsername(userMockCrewUsername())
  it('returns the user profile', async () => {
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([getWalletDocumentDataMockByUserId(userId)])
    const profile = await getUserProfile(user)
    expect(profile).toStrictEqual(expectedProfile)
  })
})
