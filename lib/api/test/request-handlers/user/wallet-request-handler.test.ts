import { ApiError } from '../../../src/helpers/error/api-error'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { handleAddWallet } from '../../../src/request-handlers/user/handle-add-wallet'
import { handleRemoveWallet } from '../../../src/request-handlers/user/handle-remove-wallet'
import { walletRequestHandler } from '../../../src/request-handlers/user/wallet-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { AddWalletRequest, EmptyResponse, RemoveWalletRequest } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { HTTP_METHODS } from 'next/dist/server/web/http'
import { AuthOptions, getServerSession } from 'next-auth'
import { either, equals, reject } from 'ramda'

jest.mock('next-auth')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/request-handlers/user/handle-add-wallet')
jest.mock('../../../src/request-handlers/user/handle-remove-wallet')

describe('request-handlers - user - walletRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request is not PUT or DELETE', async () => {
    const notAllowedMethods = reject(either(equals('PUT'), equals('DELETE')))(HTTP_METHODS)
    for (const method of notAllowedMethods) {
      const { req, res } = mockRequestResponse<AddWalletRequest | RemoveWalletRequest, never, EmptyResponse>(method)
      try {
        await walletRequestHandler(req, res, {} as AuthOptions)
        expect(true).toBeFalsy()
      } catch (e) {
        expect((e as ApiError).status).toBe(405)
      }
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const { req, res } = mockRequestResponse<AddWalletRequest | RemoveWalletRequest, never, EmptyResponse>('PUT')
    try {
      await walletRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })
  it('if authenticated and request is PUT, handleAddWallet should be called', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(handleAddWallet).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<AddWalletRequest | RemoveWalletRequest, never, EmptyResponse>('PUT')
    await walletRequestHandler(req, res, {} as AuthOptions)
    expect(handleAddWallet).toHaveBeenCalledTimes(1)
  })
  it('if authenticated and request is DELETE, handleRemoveWallet should be called', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(handleRemoveWallet).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<AddWalletRequest | RemoveWalletRequest, never, EmptyResponse>('DELETE')
    await walletRequestHandler(req, res, {} as AuthOptions)
    expect(handleRemoveWallet).toHaveBeenCalledTimes(1)
  })
})
