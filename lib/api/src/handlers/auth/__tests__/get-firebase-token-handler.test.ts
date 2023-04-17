import { FirebaseTokenResponse } from '../../../types'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { getFirebaseTokenHandler } from '../get-firebase-token-handler'
import { afterEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../utils/auth/create-custom-token')
describe('handlers - auth - getFirebaseTokenHandler', () => {
  const session = mockSession
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<null, never, FirebaseTokenResponse>('GET')
    await getFirebaseTokenHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if authenticated, returns success and updates DB', async () => {
    const { req, res } = mockRequestResponse<null, never, FirebaseTokenResponse>('GET')
    await getFirebaseTokenHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ firebaseToken: 'testToken' })
  })
})
