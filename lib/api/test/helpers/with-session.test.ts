import { withSession } from '../../src/helpers/with-session'
import { successHandler } from '../mocks/handler'
import { mockRequestResponse } from '../mocks/request-response'
import { mockSession } from '../mocks/session'
import { userFirestoreData } from '../mocks/user-firestore-data'
import { findUserById } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions } from 'next-auth'
import * as auth from 'next-auth/next'

jest.mock('next-auth/next')
jest.mock('@echo/firestore')
describe('utils - withSession', () => {
  const mockUser = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  jest.spyOn(auth, 'getServerSession').mockImplementation(() => Promise.resolve(mockSession))
  const mockedFindUserById = jest.mocked(findUserById).mockImplementation(() => Promise.resolve(mockUser))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('not authenticated returns an error', async () => {
    jest.spyOn(auth, 'getServerSession').mockImplementationOnce(() => Promise.resolve(undefined))

    const { req, res } = mockRequestResponse('GET')
    try {
      await withSession(successHandler, {} as AuthOptions)(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('Forbidden')
      expect(res.statusCode).toBe(401)
      expect(res._getJSONData()).toEqual({ error: 'Forbidden' })
    }
  })

  it('authenticated but invalid user returns an error', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedFindUserById.mockResolvedValueOnce(undefined)
    const { req, res } = mockRequestResponse('GET')
    try {
      await withSession(successHandler, {} as AuthOptions)(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('Forbidden')
      expect(res.statusCode).toBe(401)
      expect(res._getJSONData()).toEqual({ error: 'Forbidden' })
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
