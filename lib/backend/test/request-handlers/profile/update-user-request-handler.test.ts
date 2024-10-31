import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { fetchDiscordProfile } from '@echo/backend/helpers/user/fetch-discord-profile'
import { discordProfileResponseMock } from '@echo/backend/mocks/discord-profile-response-mock'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { updateUserRequestHandler } from '@echo/backend/request-handlers/profile/update-user-request-handler'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { walletDocumentMockJohnny } from '@echo/firestore/mocks/wallet-document-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { User } from '@echo/model/types/user'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/backend/helpers/user/fetch-discord-profile')
jest.mock('@echo/firestore/crud/user/add-user')
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
    jest.mocked(addUser).mockResolvedValueOnce(userDocumentMockJohnny)
    jest.mocked(getWalletsForUser).mockResolvedValueOnce([walletDocumentMockJohnny])
    const req = mockRequest<UpdateUserRequest>({ access_token: 'token' })
    const res = await updateUserRequestHandler({ req })
    expect(addUser).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseBody = await res.json<User>()
    expect(responseBody).toEqual(userMockJohnny)
  })
})
