import { ApiError } from '../../../src/helpers/error/api-error'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { setUserNonce } from '../../../src/helpers/user/set-user-nonce'
import { nonceRequestHandler } from '../../../src/request-handlers/user/nonce-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { NonceResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { HTTP_METHODS } from 'next/dist/server/web/http'
import { AuthOptions, getServerSession } from 'next-auth'
import { equals, reject } from 'ramda'

jest.mock('next-auth')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/helpers/user/set-user-nonce')
describe('request-handlers - user - nonceRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request is not GET', async () => {
    const notAllowedMethods = reject(equals('GET'))(HTTP_METHODS)
    for (const method of notAllowedMethods) {
      const { req, res } = mockRequestResponse<never, never, NonceResponse>(method)
      try {
        await nonceRequestHandler(req, res, {} as AuthOptions)
        expect(true).toBeFalsy()
      } catch (e) {
        expect((e as ApiError).status).toBe(405)
      }
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const { req, res } = mockRequestResponse<never, never, NonceResponse>('GET')
    try {
      await nonceRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })
  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(setUserNonce).mockResolvedValueOnce('testNonce')
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    const { req, res } = mockRequestResponse<never, never, NonceResponse>('GET')
    await nonceRequestHandler(req, res, {} as AuthOptions)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ nonce: 'testNonce' })
    expect(setUserNonce).toHaveBeenCalledTimes(1)
  })
})
