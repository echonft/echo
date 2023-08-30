import { getSession } from '../../../src/helpers/auth/get-session'
import { getUserFromSession } from '../../../src/helpers/auth/get-user-from-session'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/helpers/auth/get-session')
jest.mock('../../../src/helpers/user/find-user-by-id')

describe('helpers - auth - getUserFromSession', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the session is undefined', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    await expect(getUserFromSession({} as AuthOptions)).rejects.toBeDefined()
  })

  it('throws if the user is undefined', async () => {
    jest.mocked(getSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    } as Session)
    jest.mocked(findUserById).mockResolvedValueOnce(undefined)
    await expect(getUserFromSession({} as AuthOptions)).rejects.toBeDefined()
  })

  it('returns the user if both session and user are defined', async () => {
    const user = {
      id: 'userId'
    } as User
    jest.mocked(getSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    } as Session)
    jest.mocked(findUserById).mockResolvedValueOnce(user)
    const sessionUser = await getUserFromSession({} as AuthOptions)
    expect(sessionUser).toStrictEqual(user)
  })
})
