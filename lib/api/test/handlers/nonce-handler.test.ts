import { describe, expect, it } from '@jest/globals'

// jest.mock('@echo/firestore')
// FIXME we need to mock local setUserNonce instead of firestore
describe('handlers - nonceHandler', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })
  // it('if not authenticated, returns 401', async () => {
  // const { req, res } = mockRequestResponse<null, never, NonceResponse>('GET')
  // await nonceHandler(req, res, undefined)
  // expect(res.statusCode).toBe(401)
  // expect(res._getJSONData()).toEqual({ error: 'Unauthorized' })
  // })
  // it('if authenticated, returns success and updates DB', async () => {
  // jest.mocked(setUserNonce).mockResolvedValue('testNonce')
  // const { req, res } = mockRequestResponse<null, never, NonceResponse>('GET')
  // await nonceHandler(req, res, mockSession)
  // expect(res.statusCode).toBe(200)
  // expect(res._getJSONData()).toEqual({ nonce: 'testNonce' })
  // expect(setUserNonce).toHaveBeenCalledTimes(1)
  // })
  it('TODO', () => {
    expect(true).toBeTruthy()
  })
})
