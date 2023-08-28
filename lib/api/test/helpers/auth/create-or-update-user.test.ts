import { createOrUpdateUser } from '../../../src/helpers/auth/create-or-update-user'
import { createUser } from '../../../src/helpers/user/create-user'
import { fetchDiscordUser } from '../../../src/helpers/user/fetch-discord-user'
import { findUserByDiscordId } from '../../../src/helpers/user/find-user-by-discord-id'
import { updateUser } from '../../../src/helpers/user/update-user'
import { updateUserNfts } from '../../../src/helpers/user/update-user-nfts'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/user/create-user')
jest.mock('../../../src/helpers/user/fetch-discord-user')
jest.mock('../../../src/helpers/user/find-user-by-discord-id')
jest.mock('../../../src/helpers/user/update-user')
jest.mock('../../../src/helpers/user/update-user-nfts')

describe('helpers - auth - assertAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if accessToken is invalid', async () => {
    await expect(createOrUpdateUser(undefined, 'tokenType')).rejects.toBeDefined()
    await expect(createOrUpdateUser('', 'tokenType')).rejects.toBeDefined()
  })
  it('throws if tokenType is invalid', async () => {
    await expect(createOrUpdateUser('accessToken', undefined)).rejects.toBeDefined()
    await expect(createOrUpdateUser('accessToken', '')).rejects.toBeDefined()
  })
  it('createUser is called if the user does not exist in our db', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(fetchDiscordUser).mockResolvedValueOnce({})
    jest.mocked(findUserByDiscordId).mockResolvedValueOnce(undefined)
    jest.mocked(createUser).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    jest.mocked(updateUser).mockResolvedValueOnce()
    await createOrUpdateUser('accessToken', 'tokenType')
    expect(createUser).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(0)
    expect(updateUser).toHaveBeenCalledTimes(0)
  })
  it('updateUserNfts and updateUser are called if the user exists in our db', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(fetchDiscordUser).mockResolvedValueOnce({})
    jest.mocked(findUserByDiscordId).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(createUser).mockResolvedValueOnce()
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    jest.mocked(updateUser).mockResolvedValueOnce()
    await createOrUpdateUser('accessToken', 'tokenType')
    expect(createUser).toHaveBeenCalledTimes(0)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(updateUser).toHaveBeenCalledTimes(1)
  })
})
