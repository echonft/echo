/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createOrUpdateUser } from '../../src/helpers/auth/create-or-update-user'
import { updateUserNfts } from '../../src/helpers/handler/update-user-nfts'
import { mockAreNftsOwnedByWallets, MockAreNftsOwnedByWalletsArgs } from '../mocks/alchemy/are-nfts-owned-by-wallets'
import { userFirestoreData } from '../mocks/user-firestore-data'
import { fetchDiscordUser } from '@echo/discord'
import { addUser, findUserByDiscordId, updateUserDiscordInfo } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/utils/handler/update-user-nfts')
jest.mock('@echo/firestore')
jest.mock('@echo/discord')
jest.mock('@echo/alchemy', () => ({
  areNftsOwnedByWallets: (args: MockAreNftsOwnedByWalletsArgs) => mockAreNftsOwnedByWallets(args)
}))

describe('utils - auth - createOrUpdateUser', () => {
  const mockedFindUserByDiscordId = jest
    .mocked(findUserByDiscordId)
    // @ts-ignore
    .mockResolvedValue(userFirestoreData['6rECUMhevHfxABZ1VNOm'])
  const mockedFetchDiscordUser = jest.mocked(fetchDiscordUser).mockResolvedValue(
    // @ts-ignore
    { id: 'test', username: 'test', discriminator: '1234', avatar: 'test', banner: 'test' }
  )
  const mockedAddUser = jest.mocked(addUser)
  const mockedUpdateUserDiscordInfo = jest.mocked(updateUserDiscordInfo)
  // @ts-ignore
  const mockedUpdateUserNfts = jest.mocked(updateUserNfts).mockResolvedValue(undefined)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if accessToken is undefined, rejects', async () => {
    try {
      await createOrUpdateUser(undefined, 'tokenType', 'discordId')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if accessToken is empty, rejects', async () => {
    try {
      await createOrUpdateUser('', 'tokenType', 'discordId')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if tokenType is undefined, rejects', async () => {
    try {
      await createOrUpdateUser('accessToken', undefined, 'discordId')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if tokenType is empty, rejects', async () => {
    try {
      await createOrUpdateUser('accessToken', '', 'discordId')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if discordId is undefined, rejects', async () => {
    try {
      await createOrUpdateUser('accessToken', 'tokenType', undefined)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if discordId is empty, rejects', async () => {
    try {
      await createOrUpdateUser('accessToken', 'tokenType', '')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if fetchDiscordUser is fails, rejects', async () => {
    // @ts-ignore
    mockedFetchDiscordUser.mockRejectedValueOnce(Error('test'))
    try {
      await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('if no user is found, addUser is called with the proper params', async () => {
    // @ts-ignore
    mockedFindUserByDiscordId.mockRejectedValueOnce(Error('test'))
    await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
    expect(mockedAddUser).toBeCalledWith({
      discordAvatar: 'test',
      discordBanner: 'test',
      discordGuildIds: [],
      discordId: 'test',
      discordUsername: 'test#1234'
    })
  })

  it('if user is found, updateUserNfts and updateUserDiscordInfo are called with the proper params', async () => {
    await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
    expect(mockedUpdateUserNfts).toBeCalledWith(userFirestoreData['6rECUMhevHfxABZ1VNOm'])
    expect(mockedUpdateUserDiscordInfo).toBeCalledWith(userFirestoreData['6rECUMhevHfxABZ1VNOm']?.id, {
      discordAvatar: 'test',
      discordBanner: 'test',
      discordGuildIds: [],
      discordId: 'test',
      discordUsername: 'test#1234'
    })
  })
})
