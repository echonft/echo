import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { guarded_setNonceForUser } from '@echo/frontend/lib/server/helpers/user/guarded_set-nonce-for-user'
import { nonceRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/nonce-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'

jest.mock('@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/user/guarded_set-nonce-for-user')

describe('request-handlers - user - nonceRequestHandler', () => {
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_setNonceForUser).mockResolvedValueOnce('testNonce')
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(req)
    expect(guarded_setNonceForUser).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
