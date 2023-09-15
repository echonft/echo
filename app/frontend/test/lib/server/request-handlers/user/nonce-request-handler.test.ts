import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { getSession } from '@server/helpers/auth/get-session'
import { ApiError } from '@server/helpers/error/api-error'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import { setUserNonce } from '@server/helpers/user/set-user-nonce'
import { nonceRequestHandler } from '@server/request-handlers/user/nonce-request-handler'
import { mockRequest } from '@server-mocks/request-response'
import type { AuthOptions, Session } from 'next-auth'

jest.mock('@server/helpers/auth/get-session')
jest.mock('@server/helpers/user/get-user-by-id')
jest.mock('@server/helpers/user/set-user-nonce')
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
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as FirestoreDiscordUser)
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(req, {} as AuthOptions)
    expect(setUserNonce).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
