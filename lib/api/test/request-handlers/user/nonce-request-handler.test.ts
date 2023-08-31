import { getSession } from '../../../src/helpers/auth/get-session'
import { ApiError } from '../../../src/helpers/error/api-error'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { setUserNonce } from '../../../src/helpers/user/set-user-nonce'
import { nonceRequestHandler } from '../../../src/request-handlers/user/nonce-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { NonceResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/helpers/auth/get-session')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/helpers/user/set-user-nonce')
describe('request-handlers - user - nonceRequestHandler', () => {
  const session = {
    user: {
      id: 'userId'
    }
  } as unknown as Session

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<never>()
    try {
      await nonceRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })
  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(setUserNonce).mockResolvedValueOnce('testNonce')
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(req, {} as AuthOptions)
    expect(setUserNonce).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
