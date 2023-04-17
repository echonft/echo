import { WalletRequest } from '../../../types/models/requests/wallet-request'
import { WalletResponse } from '../../../types/models/responses/wallet-response'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { createWalletHandler } from '../create-wallet-handler'
import { deleteWalletHandler } from '../delete-wallet-handler'
import { walletHandler } from '../wallet-handler'
import { afterEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../create-wallet-handler')
jest.mock('../delete-wallet-handler')

describe('handlers - user - walletHandler', () => {
  const mockedCreateWallet = jest.mocked(createWalletHandler)
  const mockedDeleteWallet = jest.mocked(deleteWalletHandler)

  afterEach(() => {
    jest.clearAllMocks()
  })
  it('if wrong method, returns 500', async () => {
    const session = mockSession
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('GET')
    await walletHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Unhandled error' })
  })
  it('if PUT correct, calls create handler', async () => {
    const session = mockSession
    mockedCreateWallet.mockResolvedValue(undefined)
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('PUT')
    await walletHandler(req, res, session)
    expect(mockedCreateWallet).toBeCalled()
  })
  it('if DELETE correct, calls delete handler', async () => {
    const session = mockSession
    mockedDeleteWallet.mockResolvedValue(undefined)
    const { req, res } = mockRequestResponse<WalletRequest, never, WalletResponse>('DELETE')
    await walletHandler(req, res, session)
    expect(mockedDeleteWallet).toBeCalled()
  })
})
