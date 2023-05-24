import { successHandler } from '../test/mocks/handler'
import { mockRequestResponse } from '../test/mocks/request-response'
import { mockSession } from '../test/mocks/session'
import { withSession } from '../with-session'
import { findUserById } from '@echo/firebase-admin'
import { users } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { AuthOptions } from 'next-auth'
import * as auth from 'next-auth/next'

jest.mock('next-auth/next')
jest.mock('@echo/firebase-admin')
describe('utils - withSession', () => {
  const mockUser = users['oE6yUEQBPn7PZ89yMjKn']!
  jest.spyOn(auth, 'getServerSession').mockImplementation(() => Promise.resolve(mockSession))
  const mockedFindUserById = jest
    .mocked(findUserById)
    .mockImplementation(() => Promise.resolve(R.fromFalsy(mockUser, new Error())))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('not authenticated returns an error', async () => {
    jest.spyOn(auth, 'getServerSession').mockImplementationOnce(() => Promise.resolve(undefined))

    const { req, res } = mockRequestResponse('GET')
    try {
      await withSession(successHandler, {} as AuthOptions)(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('You must be logged in')
      expect(res.statusCode).toBe(401)
      expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
    }
  })

  it('authenticated but invalid user returns an error', async () => {
    mockedFindUserById.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
    const { req, res } = mockRequestResponse('GET')
    try {
      await withSession(successHandler, {} as AuthOptions)(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('You must be logged in')
      expect(res.statusCode).toBe(401)
      expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
    }
  })

  it('authenticated returns a success', async () => {
    jest.spyOn(auth, 'getServerSession').mockImplementation(() => Promise.resolve(mockSession))
    const { req, res } = mockRequestResponse('GET')
    await withSession((req, res, session) => {
      expect(session?.user).toEqual(mockUser)
      return successHandler(req, res)
    }, {} as AuthOptions)(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'OK' })
  })
})
