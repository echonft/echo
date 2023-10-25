import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { setUserNonce } from '@echo/frontend/lib/server/helpers/user/set-user-nonce'
import { nonceRequestHandler } from '@echo/frontend/lib/server/request-handlers/user/nonce-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/user/set-user-nonce')

describe('request-handlers - user - nonceRequestHandler', () => {
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(setUserNonce).mockResolvedValueOnce('testNonce')
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(req)
    expect(setUserNonce).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
