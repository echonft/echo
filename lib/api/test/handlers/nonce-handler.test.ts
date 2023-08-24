import { nonceHandler } from '../../src/handlers/user/nonce-handler'
import { setUserNonce } from '../../src/helpers/user/set-user-nonce'
import { mockRequestResponse } from '../mocks/request-response'
import { mockSession } from '../mocks/session'
import { NonceResponse } from '@echo/api-public'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/helpers/user/set-user-nonce')
// FIXME we need to mock local setUserNonce instead of firestore
describe('handlers - nonceHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<null, never, NonceResponse>('GET')
    await nonceHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Unauthorized' })
  })
  it('if authenticated, returns success and updates DB', async () => {
    jest.mocked(setUserNonce).mockResolvedValue('testNonce')
    const { req, res } = mockRequestResponse<null, never, NonceResponse>('GET')
    await nonceHandler(req, res, mockSession)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ nonce: 'testNonce' })
    expect(setUserNonce).toHaveBeenCalledTimes(1)
  })
})
