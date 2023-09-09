import { getSession } from '../../../src/lib/server/helpers/auth/get-session'
import { ApiError } from '../../../src/lib/server/helpers/error/api-error'
import { getUserById } from '../../../src/lib/server/helpers/user/get-user-by-id'
import { setUserNonce } from '../../../src/lib/server/helpers/user/set-user-nonce'
import { nonceRequestHandler } from '../../../src/lib/server/request-handlers/user/nonce-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { NonceResponse } from '@echo/api'
import { User } from '@echo/firestore-types'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/lib/server/helpers/auth/get-session')
jest.mock('../../../src/lib/server/helpers/user/get-user-by-id')
jest.mock('../../../src/lib/server/helpers/user/set-user-nonce')
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
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(req, {} as AuthOptions)
    expect(setUserNonce).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
