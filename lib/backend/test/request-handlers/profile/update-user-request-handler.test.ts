import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { discordProfileResponseMock } from '@echo/auth/mocks/discord-profile-response-mock'
import { mockRequest } from '@echo/auth/mocks/mock-request'
import type { AuthUser } from '@echo/auth/types/auth-user'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { fetchDiscordProfile } from '@echo/backend/helpers/user/fetch-discord-profile'
import { updateUserRequestHandler } from '@echo/backend/request-handlers/profile/update-user-request-handler'
import { addOrUpdateUser } from '@echo/firestore/crud/user/add-or-update-user'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { walletDocumentMockJohnny } from '@echo/firestore/mocks/wallet-document-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/backend/helpers/user/fetch-discord-profile')
jest.mock('@echo/firestore/crud/user/add-or-update-user')
jest.mock('@echo/firestore/crud/wallet/get-wallets-for-user')

describe('removeWalletRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<UpdateUserRequest>({} as UpdateUserRequest)
    await expect(updateUserRequestHandler({ req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns a 200 if the request is valid', async () => {
    jest.mocked(fetchDiscordProfile).mockResolvedValueOnce(discordProfileResponseMock)
    jest.mocked(addOrUpdateUser).mockResolvedValueOnce(userDocumentMockJohnny)
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([walletDocumentMockJohnny])
    const req = mockRequest<UpdateUserRequest>({ access_token: 'token' })
    const res = await updateUserRequestHandler({ req })
    expect(addOrUpdateUser).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseBody = await res.json<AuthUser>()
    expect(responseBody).toEqual({ ...userMockJohnny, wallets: [walletMockJohnny] })
  })
})
