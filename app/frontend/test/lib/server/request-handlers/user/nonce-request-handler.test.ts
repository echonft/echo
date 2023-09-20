import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { setUserNonce } from '@server/helpers/user/set-user-nonce'
import { nonceRequestHandler } from '@server/request-handlers/user/nonce-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/user/set-user-nonce')

describe('request-handlers - user - nonceRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce({
      id: 'user-id',
      name: 'user-name',
      image: 'user-image'
    })
    jest.mocked(setUserNonce).mockResolvedValueOnce('testNonce')
    const req = mockRequest<never>()
    const res = await nonceRequestHandler(req)
    expect(setUserNonce).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as NonceResponse
    expect(responseData).toEqual({ nonce: 'testNonce' })
  })
})
