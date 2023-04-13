import { successHandler } from '../test/mocks/handler'
import { mockRequestResponse } from '../test/mocks/request-response'
import { mockSession } from '../test/mocks/session'
import { withSession } from '../with-session'
import { mockUser } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import * as auth from 'next-auth/next'

jest.mock('next-auth/next')
jest.mock('../../config')

describe('utils - withSession', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('not authenticated returns an error', async () => {
    jest.spyOn(auth, 'getServerSession').mockImplementation(() => Promise.resolve(undefined))

    const { req, res } = mockRequestResponse('GET')
    try {
      await withSession(successHandler)(req, res)
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
    })(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'OK' })
  })
})
