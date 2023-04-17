import { getHasNftHandler } from '../../../handlers/user/get-has-nft-handler'
import { UserHasNftResponse } from '../../../types'
import { UserHasNftRequest } from '../../../types/models/requests/user-has-nft-request'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { getHasNft } from '../get-has-nft'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('@echo/api-auth')
jest.mock('../../../handlers/user/get-has-nft-handler')

describe('routes - user - getHasNft', () => {
  const mockedGetHasNftHandler = jest.mocked(getHasNftHandler)
  const mockedGetServerSession = jest.mocked(getServerSession)

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if invalid method, returns a 405', async () => {
    const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('POST')
    await getHasNft(req, res)
    expect(res.statusCode).toBe(405)
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: ['GET'] })
    expect(res._getJSONData()).toEqual({ error: 'Method POST Not Allowed' })
  })
  it('if not logged in, returns a 401', async () => {
    const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET')
    await getHasNft(req, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if correct req, handler is called', async () => {
    mockedGetServerSession.mockResolvedValue(mockSession)
    const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET')
    await getHasNft(req, res)
    expect(mockedGetHasNftHandler).toBeCalled()
  })
})
