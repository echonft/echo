import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { nonceRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/nonce-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'

jest.mock('@echo/firestore/crud/nonce/set-nonce-for-user')

describe('request-handlers - user - nonceRequestHandler', () => {
  const user = getAuthUserMockByUsername('johnnycagewins')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(setNonceForUser).mockResolvedValueOnce({ nonce: 'testNonce' } as Nonce)
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(user, req)
    expect(setNonceForUser).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
