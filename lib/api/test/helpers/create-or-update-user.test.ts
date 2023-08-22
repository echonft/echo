/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockAreNftsOwnedByWallets, MockAreNftsOwnedByWalletsArgs } from '../mocks/alchemy/are-nfts-owned-by-wallets'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/helpers/user/update-user-nfts')
jest.mock('@echo/firestore')
jest.mock('@echo/discord')
jest.mock('@echo/alchemy', () => ({
  areNftsOwnedByWallets: (args: MockAreNftsOwnedByWalletsArgs) => mockAreNftsOwnedByWallets(args)
}))

// FIXME
describe('utils - auth - createOrUpdateUser', () => {
  // const mockedFindUserByDiscordId = jest
  //   .mocked(findUserByDiscordId)
  //   // @ts-ignore
  //   .mockResolvedValue(getUserMockById('6rECUMhevHfxABZ1VNOm'))
  // const mockedFetchDiscordUser = jest.mocked(fetchDiscordUser).mockResolvedValue(
  //   // @ts-ignore
  //   { id: 'test', username: 'test', discriminator: '1234', avatar: 'test', banner: 'test' }
  // )
  // const mockedAddUser = jest.mocked(addUser)
  // const mockedUpdateUser = jest.mocked(updateUser)
  // // @ts-ignore
  // const mockedUpdateUserNfts = jest.mocked(updateUserNfts).mockResolvedValue(undefined)
  //
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })
  //
  // it('if accessToken is undefined, rejects', async () => {
  //   try {
  //     await createOrUpdateUser(undefined, 'tokenType', 'discordId')
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if accessToken is empty, rejects', async () => {
  //   try {
  //     await createOrUpdateUser('', 'tokenType', 'discordId')
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if tokenType is undefined, rejects', async () => {
  //   try {
  //     await createOrUpdateUser('accessToken', undefined, 'discordId')
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if tokenType is empty, rejects', async () => {
  //   try {
  //     await createOrUpdateUser('accessToken', '', 'discordId')
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if discordId is undefined, rejects', async () => {
  //   try {
  //     await createOrUpdateUser('accessToken', 'tokenType', undefined)
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if discordId is empty, rejects', async () => {
  //   try {
  //     await createOrUpdateUser('accessToken', 'tokenType', '')
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if fetchDiscordUser is fails, rejects', async () => {
  //   // @ts-ignore
  //   mockedFetchDiscordUser.mockRejectedValueOnce(Error('test'))
  //   try {
  //     await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
  //   } catch (error) {
  //     expect(error).toBeDefined()
  //   }
  // })
  //
  // it('if no user is found, addUser is called with the proper params', async () => {
  //   // @ts-ignore
  //   mockedFindUserByDiscordId.mockRejectedValueOnce(Error('test'))
  //   await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
  //   expect(mockedAddUser).toBeCalledWith({
  //     discordAvatar: 'test',
  //     discordBanner: 'test',
  //     discordGuildIds: [],
  //     discordId: 'test',
  //     discordUsername: 'test#1234'
  //   })
  // })
  //
  // it('if user is found, updateUserNfts and updateUserDiscordInfo are called with the proper params', async () => {
  //   await createOrUpdateUser('accessToken', 'tokenType', 'discordId')
  //   expect(mockedUpdateUserNfts).toBeCalledWith(getUserMockById('6rECUMhevHfxABZ1VNOm'))
  //   expect(mockedUpdateUser).toBeCalledWith(getUserMockById('6rECUMhevHfxABZ1VNOm')?.id, {
  //     discordAvatar: 'test',
  //     discordBanner: 'test',
  //     discordGuildIds: [],
  //     discordId: 'test',
  //     discordUsername: 'test#1234'
  //   })
  // })
  it('TODO', () => {
    expect(true).toBeTruthy()
  })
})
