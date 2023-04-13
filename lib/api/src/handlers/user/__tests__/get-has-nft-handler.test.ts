import { UserHasNftResponse } from '../../../types'
import { UserHasNftRequest } from '../../../types/models/requests/user-has-nft-request'
import { walletsOwnCollection } from '../../../utils/alchemy/wallets-own-collection'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { getHasNftHandler } from '../get-has-nft-handler'
import { afterEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../utils/guild')
jest.mock('alchemy-sdk')
jest.mock('../../../utils/alchemy/wallets-own-collection')

describe('handlers - user - getHasNftHandler', () => {
  const mockedWalletsOwnCollection = jest.mocked(walletsOwnCollection)
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET')
    await getHasNftHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  describe('if authenticated', () => {
    const session = mockSession
    const emptyWalletSession = { ...mockSession, user: { ...mockSession.user, wallets: [] } }
    it('if empty wallet, returns 200 with hastNft to false', async () => {
      const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET')
      await getHasNftHandler(req, res, emptyWalletSession)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ hasNft: false })
    })
    it('if wrong guild id, returns 500', async () => {
      const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET', {
        guildId: 'test'
      })
      await getHasNftHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Guild test not found or has no contracts registered' })
    })
    it('if correct guild id but no contracts, returns 500', async () => {
      const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET', {
        guildId: 'empty–contract'
      })
      await getHasNftHandler(req, res, session)
      expect(res.statusCode).toBe(500)
      expect(res._getJSONData()).toEqual({ error: 'Guild empty–contract not found or has no contracts registered' })
    })
    it('if correct guild id and does not owns contract, returns false', async () => {
      const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET', {
        guildId: 'xA40abnyBq6qQHSYmtHj'
      })
      mockedWalletsOwnCollection.mockResolvedValue(false)
      await getHasNftHandler(req, res, session)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ hasNft: false })
    })
    it('if correct guild id and owns contract, returns true', async () => {
      const { req, res } = mockRequestResponse<null, UserHasNftRequest, UserHasNftResponse>('GET', {
        guildId: 'xA40abnyBq6qQHSYmtHj'
      })
      mockedWalletsOwnCollection.mockResolvedValue(true)
      await getHasNftHandler(req, res, session)
      expect(res.statusCode).toBe(200)
      expect(res._getJSONData()).toEqual({ hasNft: true })
    })
  })
})
