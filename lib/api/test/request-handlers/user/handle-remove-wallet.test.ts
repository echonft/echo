import { ApiError } from '../../../src/helpers/error/api-error'
import { removeUserWallet } from '../../../src/helpers/user/remove-user-wallet'
import { updateUserNfts } from '../../../src/helpers/user/update-user-nfts'
import { handleRemoveWallet } from '../../../src/request-handlers/user/handle-remove-wallet'
import { mockRequestResponse } from '../../mocks/request-response'
import { EmptyResponse, RemoveWalletRequest } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/user/remove-user-wallet')
jest.mock('../../../src/helpers/user/update-user-nfts')

describe('request-handlers - user - handleAddWallet', () => {
  const validWallet = {
    chainId: 1,
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc'
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const { req, res } = mockRequestResponse<RemoveWalletRequest, never, EmptyResponse>(
      'DELETE',
      undefined,
      {} as RemoveWalletRequest
    )
    try {
      await handleRemoveWallet(req, res, { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(removeUserWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<RemoveWalletRequest, never, EmptyResponse>(
      'DELETE',
      undefined,
      validRequest
    )
    await handleRemoveWallet(req, res, { id: 'userId' } as User)
    expect(removeUserWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
  })
})
