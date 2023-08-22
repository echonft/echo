import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { setUserUpdatedAt } from '../../../src/crud/user/set-user-updated-at'
import { updateUser } from '../../../src/crud/user/update-user'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - user - setUserUpdatedAt', () => {
  let initialUpdatedAt: Dayjs
  const id = '6rECUMhevHfxABZ1VNOm'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const user = await findUserById(id)
    initialUpdatedAt = user!.updatedAt!
  })
  afterEach(async () => {
    await updateUser(id, { updatedAt: initialUpdatedAt })
  })

  it('setUserUpdatedAt', async () => {
    await setUserUpdatedAt(id)
    const updatedUser = await findUserById(id)
    expect(updatedUser!.updatedAt?.isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(updatedUser!.updatedAt?.isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
