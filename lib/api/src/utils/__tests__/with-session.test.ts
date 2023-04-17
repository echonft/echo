import { successHandler } from '../test/mocks/handler'
import { mockRequestResponse } from '../test/mocks/request-response'
import { mockSession } from '../test/mocks/session'
import { withSession } from '../with-session'
import { getAuthOptions } from '@echo/api-auth'
import { mockUser } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions } from 'next-auth'
import * as auth from 'next-auth/next'

jest.mock('next-auth/next')
jest.mock('../../config/get-server-config')

describe('utils - withSession', () => {
  const mockedGetAuthOptions = jest.mocked(getAuthOptions)
  const mockedGetServerSession = jest.mocked(getServerSession)
  mockedGetAuthOptions.mockReturnValue(undefined as unknown as AuthOptions)
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('not authenticated returns an error', async () => {
    mockedGetServerSession.mockResolvedValue(undefined)
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
    mockedGetServerSession.mockResolvedValue(mockSession)
    const { req, res } = mockRequestResponse('GET')
    await withSession((req, res, session) => {
      expect(session?.user).toEqual(mockUser)
      return successHandler(req, res)
    }, {} as AuthOptions)(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'OK' })
  })
})
