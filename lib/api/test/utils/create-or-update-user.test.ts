/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockAreNftsOwnedByWallets } from '../../src/mocks/alchemy/are-nfts-owned-by-wallets'
import { createOrUpdateUser } from '../../src/utils/auth/create-or-update-user'
import { updateUserNfts } from '../../src/utils/handler/update-user-nfts'
import { fetchDiscordUser } from '@echo/discord'
import { addUser, findUserByDiscordId, updateUserDiscordInfo } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../src/utils/handler/update-user-nfts')
jest.mock('@echo/firebase-admin')
jest.mock('@echo/discord')
jest.mock('@echo/alchemy', () => ({
  areNftsOwnedByWallets: mockAreNftsOwnedByWallets
}))

describe('utils - auth - createOrUpdateUser', () => {
  const mockedFindUserByDiscordId = jest
    .mocked(findUserByDiscordId)
    // @ts-ignore
    .mockResolvedValue(R.fromNullable(true, 'Test'))
  const mockedFetchDiscordUser = jest.mocked(fetchDiscordUser).mockResolvedValue(
    // @ts-ignore
    R.fromNullable(
      { id: 'test', username: 'test', discriminator: '1234', avatar: 'test', banner: 'test' },
      'should not happen'
    )
  )
  const mockedAddUser = jest.mocked(addUser)
  const mockedUpdateUserDiscordInfo = jest.mocked(updateUserDiscordInfo)
  // @ts-ignore
  const mockedUpdateUserNfts = jest.mocked(updateUserNfts).mockResolvedValue(undefined)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if accessToken is undefined, rejects', async () => {
    const result = await createOrUpdateUser(undefined, 'tokenType', 'discordId')
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: missing access token'))
  })

  it('if accessToken is empty, rejects', async () => {
    const result = await createOrUpdateUser('', 'tokenType', 'discordId')
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: missing access token'))
  })

  it('if tokenType is undefined, rejects', async () => {
    const result = await createOrUpdateUser('accessToken', undefined, 'discordId')
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: missing access token'))
  })

  it('if tokenType is empty, rejects', async () => {
    const result = await createOrUpdateUser('accessToken', '', 'discordId')
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: missing access token'))
  })

  it('if discordId is undefined, rejects', async () => {
    const result = await createOrUpdateUser('accessToken', 'tokenType', undefined)
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: missing access token'))
  })

  it('if discordId is empty, rejects', async () => {
    const result = await createOrUpdateUser('accessToken', 'tokenType', '')
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: missing access token'))
  })

  it('if fetchDiscordUser is fails, rejects', async () => {
    // @ts-ignore
    mockedFetchDiscordUser.mockResolvedValueOnce(R.fromNullable(undefined, 'error'))
    const result = await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
    expect(R.isError(result)).toBeTruthy()
    R.tapError((error) => expect(errorMessage(error)).toEqual('Auth error: error fetching discord user'))
  })

  it('if no user is found, addUser is called with the proper params', async () => {
    // @ts-ignore
    mockedFindUserByDiscordId.mockResolvedValueOnce(R.fromNullable(undefined, 'error'))
    await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
    expect(mockedAddUser).toBeCalledWith({
      discordAvatar: 'test',
      discordBanner: 'test',
      discordGuildIds: [],
      discordId: 'test',
      discordUsername: 'test#1234'
    })
  })

  // TODO Add params
  it('if user is found, updateUserNfts and updateUserDiscordInfo are called with the proper params', async () => {
    await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
    expect(mockedUpdateUserNfts).toBeCalled()
    expect(mockedUpdateUserDiscordInfo).toBeCalled()
  })
})
