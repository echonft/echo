import wallet from '../wallet'
import * as api from '@echo/api'
import { mockRequestResponse, mockSession, WalletRequest, WalletResponse } from '@echo/api'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('../../auth/[...nextauth]')

describe('routes - user - wallet', () => {
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
    const spiedFunction = jest.spyOn(api, 'walletHandler')
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT')
    await wallet(req, res)
    expect(spiedFunction).toBeCalled()
  })
})
