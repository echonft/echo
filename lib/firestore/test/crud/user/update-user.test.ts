import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { assertUsers } from '@echo/firestore-test/user/assert-users'
import { deleteUser } from '@echo/firestore-test/user/delete-user'
import { unchecked_updateUser } from '@echo/firestore-test/user/unchecked_update-user'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNotNil } from 'ramda'

describe('CRUD - user - updateUser', () => {
  let newUserId: Nullable<string>
  let updatedUser: Nullable<UserDocumentData>

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertUsers()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    newUserId = undefined
    updatedUser = undefined
  })
  afterEach(async () => {
    if (isNotNil(updatedUser)) {
      try {
        await unchecked_updateUser(updatedUser)
      } catch (e) {
        logger.error(`Error reverting user with id ${updatedUser.id}: ${errorMessage(e)}`)
      }
    }
    if (isNotNil(newUserId)) {
      try {
        await deleteUser(newUserId)
      } catch (e) {
        logger.error(`Error deleting user with id ${newUserId}: ${errorMessage(e)}`)
      }
    }
  })

  it('adds the user if it does not exist in the database', async () => {
    const newUserData = {
      discord: {
        id: 'discord-id',
        username: 'discord-username',
        avatarUrl: 'discord-avatar-url',
        bannerColor: '#ffffff'
      }
    }
    const user = await updateUser(newUserData)
    newUserId = user.id
    expect(newUserId).toBeDefined()
    const foundUser = (await findUserById(newUserId))!
    expect(foundUser.discord).toStrictEqual(newUserData.discord)
    expect(foundUser.username).toStrictEqual(newUserData.discord.username)
  })

  it('updates the user if it exists in the database', async () => {
    const existingUser = await findUserById('6rECUMhevHfxABZ1VNOm')
    expect(existingUser).toBeDefined()
    updatedUser = existingUser!
    const newUserData = {
      discord: {
        id: updatedUser.discord.id,
        username: 'discord-username',
        avatarUrl: 'discord-avatar-url',
        bannerColor: '#ffffff'
      }
    }
    await updateUser(newUserData)
    const foundUser = (await findUserById(updatedUser.id))!
    expect(foundUser.discord).toStrictEqual(assoc('id', updatedUser.discord.id, newUserData.discord))
  })
})
