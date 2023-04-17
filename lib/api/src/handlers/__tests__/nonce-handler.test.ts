import { NonceResponse } from '../../types/model/responses/nonce-response'
import { mockRequestResponse } from '../../utils/test/mocks/request-response'
import { mockSession } from '../../utils/test/mocks/session'
import { nonceHandler } from '../user/nonce-handler'
import { setNonceForUser } from '@echo/firebase-admin'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firebase-admin')
describe('handlers - nonceHandler', () => {
  const session = mockSession
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<null, never, NonceResponse>('GET')
    await nonceHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(setNonceForUser).mockResolvedValue('testNonce')
    const { req, res } = mockRequestResponse<null, never, NonceResponse>('GET')
    await nonceHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ nonce: 'testNonce' })
    expect(setNonceForUser).toHaveBeenCalledTimes(1)
  })
})
