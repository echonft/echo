import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserProfile } from '@echo/firestore/crud/user/get-user-profile'
import { userMockCrewId } from '@echo/firestore/mocks/user/user-document-data-mock'
import { userMockCrewUsername } from '@echo/model/mocks/user/user-mock'
import { getUserProfileMockByUsername } from '@echo/model/mocks/user/user-profile-mock'
import { type UserProfile } from '@echo/model/types/user-profile'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('CRUD - user - getUserProfile', () => {
  it('returns the user profile', async () => {
    const user = await pipe(userMockCrewId, getUserById)()
    expect(user).toBeDefined()
    const expectedProfile: UserProfile = getUserProfileMockByUsername(userMockCrewUsername())
    const profile = await getUserProfile(user!)
    expect(profile).toStrictEqual(expectedProfile)
  })
})
