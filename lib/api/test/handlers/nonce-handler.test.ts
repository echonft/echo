import { describe } from '@jest/globals'

// jest.mock('../../src/helpers/user/set-user-nonce')
describe('handlers - nonceHandler', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })
  // it('if not authenticated, returns 401', async () => {
  //   const { req, res } = mockRequestResponse<never, never, NonceResponse>('GET')
  //   await nonceRequestHandler(req, res, undefined)
  //   expect(res.statusCode).toBe(401)
  //   expect(res._getJSONData()).toEqual({ error: 'Unauthorized' })
  // })
  // it('if authenticated, returns success and updates DB', async () => {
  //   jest.mocked(setUserNonce).mockResolvedValue('testNonce')
  //   const { req, res } = mockRequestResponse<never, never, NonceResponse>('GET')
  //   await nonceRequestHandler(req, res, mockSession)
  //   expect(res.statusCode).toBe(200)
  //   expect(res._getJSONData()).toEqual({ nonce: 'testNonce' })
  //   expect(setUserNonce).toHaveBeenCalledTimes(1)
  // })
})
