import { getSession } from '../../../src/lib/server/helpers/auth/get-session'
import { ApiError } from '../../../src/lib/server/helpers/error/api-error'
import { findUserById } from '../../../src/lib/server/helpers/user/find-user-by-id'
import { removeUserWallet } from '../../../src/lib/server/helpers/user/remove-user-wallet'
import { updateUserNfts } from '../../../src/lib/server/helpers/user/update-user-nfts'
import { removeWalletRequestHandler } from '../../../src/lib/server/request-handlers/user/remove-wallet-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { RemoveWalletRequest } from '@echo/api'
import { User } from '@echo/firestore'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/lib/server/helpers/auth/get-session')
jest.mock('../../../src/lib/server/helpers/user/find-user-by-id')
jest.mock('../../../src/lib/server/helpers/user/remove-user-wallet')
jest.mock('../../../src/lib/server/helpers/user/update-user-nfts')

describe('request-handlers - user - removeWalletRequestHandler', () => {
  const validWallet = {
    chainId: 1,
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc'
  }
  const validRequest: RemoveWalletRequest = {
    wallet: validWallet
  }
  const session = {
    user: {
      id: 'userId'
    }
  } as unknown as Session

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the user is not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    try {
      await removeWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the request cannot be parsed', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    const req = mockRequest<RemoveWalletRequest>({} as RemoveWalletRequest)
    try {
      await removeWalletRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(removeUserWallet).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    const req = mockRequest<RemoveWalletRequest>(validRequest)
    const res = await removeWalletRequestHandler(req, {} as AuthOptions)
    expect(removeUserWallet).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})
