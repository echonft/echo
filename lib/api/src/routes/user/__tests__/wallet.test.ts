import { walletHandler } from '../../../handlers/user/wallet-handler'
import { WalletRequest } from '../../../types/models/requests/wallet-request'
import { WalletResponse } from '../../../types/models/responses/wallet-response'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { wallet } from '../wallet'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('@echo/api-auth')
jest.mock('../../../handlers/user/wallet-handler')

describe('routes - user - wallet', () => {
  const mockedWalletHandler = jest.mocked(walletHandler)
  const mockedGetServerSession = jest.mocked(getServerSession)

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if invalid method, returns a 405', async () => {
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('GET')
    await wallet(req, res)
    expect(res.statusCode).toBe(405)
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: ['PUT', 'DELETE'] })
    expect(res._getJSONData()).toEqual({ error: 'Method GET Not Allowed' })
  })
  it('if not logged in, returns a 401', async () => {
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT')
    await wallet(req, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if correct req, handler is called', async () => {
    mockedGetServerSession.mockResolvedValue(mockSession)
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT')
    await wallet(req, res)
    expect(mockedWalletHandler).toBeCalled()
  })
})
