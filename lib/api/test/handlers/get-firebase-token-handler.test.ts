import { getFirebaseTokenHandler } from '../../src/handlers/auth/get-firebase-token-handler'
import { createCustomToken } from '../../src/utils/auth/create-custom-token'
import { mockRequestResponse } from '../mocks/request-response'
import { mockSession } from '../mocks/session'
import { FirebaseTokenResponse } from '@echo/api-public'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/utils/auth/create-custom-token')

describe('handlers - auth - getFirebaseTokenHandler', () => {
  const mockedCreateCustomToken = jest.mocked(createCustomToken)
  const session = mockSession
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<null, never, FirebaseTokenResponse>('GET')
    await getFirebaseTokenHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if authenticated but error on DB write, returns 500', async () => {
    mockedCreateCustomToken.mockRejectedValue(new Error())
    const { req, res } = mockRequestResponse<null, never, FirebaseTokenResponse>('GET')
    await getFirebaseTokenHandler(req, res, session)
    expect(mockedCreateCustomToken).toBeCalled()
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Unhandled error' })
  })
  it('if authenticated, returns success and updates DB', async () => {
    mockedCreateCustomToken.mockResolvedValue('testToken')
    const { req, res } = mockRequestResponse<null, never, FirebaseTokenResponse>('GET')
    await getFirebaseTokenHandler(req, res, session)
    expect(mockedCreateCustomToken).toBeCalled()
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ firebaseToken: 'testToken' })
  })
})
