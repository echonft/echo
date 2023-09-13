import { addUser } from '@echo/firestore/crud/user/add-user'
import { findUserByDiscordId } from '@echo/firestore/crud/user/find-user-by-discord-id'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { createOrUpdateUser } from '@server/helpers/auth/create-or-update-user'
import { fetchDiscordUser } from '@server/helpers/user/fetch-discord-user'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { mapUserToAuthUser } from '@server/mappers/auth/map-user-to-auth-user'
import dayjs from 'dayjs'
import { assoc, has, pipe } from 'ramda'

jest.mock('@echo/firestore/crud/user/add-user')
jest.mock('@echo/firestore/crud/user/find-user-by-discord-id')
jest.mock('@echo/firestore/crud/user/update-user')
jest.mock('@server/helpers/user/fetch-discord-user')
jest.mock('@server/helpers/user/update-user-nfts')

describe('helpers - auth - createOrUpdateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createdUserId = 'new-user-id'
  const discordUser = {
    discordAvatar: 'discordAvatar',
    discordBanner: 'discordBanner',
    discordGuilds: [{ discordId: 'guild-id' }, { discordId: 'other-guild-id' }],
    discordId: 'discordId',
    discordUsername: 'discordUsername'
  }
  const existingUser: FirestoreUser = {
    id: 'existing-user-id',
    nonce: 'noncenoncenonce',
    nftsUpdatedAt: dayjs(),
    updatedAt: dayjs(),
    wallets: [
      {
        address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
        chainId: 1
      },
      {
        address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
        chainId: 1
      }
    ],
    discordAvatar: 'existing-discordAvatar',
    discordBanner: 'existing-discordBanner',
    discordGuilds: [{ discordId: 'guild-id' }, { discordId: 'other-guild-id' }],
    discordId: 'existing-discordId',
    discordUsername: 'existing-discordUsername',
    username: 'existing-username'
  }

  it('throws if accessToken is invalid', async () => {
    await expect(createOrUpdateUser(undefined, 'tokenType', undefined)).rejects.toBeDefined()
    await expect(createOrUpdateUser('', 'tokenType', undefined)).rejects.toBeDefined()
  })
  it('throws if tokenType is invalid', async () => {
    await expect(createOrUpdateUser('accessToken', undefined, undefined)).rejects.toBeDefined()
    await expect(createOrUpdateUser('accessToken', '', undefined)).rejects.toBeDefined()
  })
  it('addUser is called if the user is not in the JWT token', async () => {
    jest.mocked(fetchDiscordUser).mockResolvedValueOnce(discordUser)
    jest.mocked(findUserByDiscordId).mockResolvedValueOnce(undefined)
    jest.mocked(addUser).mockResolvedValueOnce(createdUserId)
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(updateUser).mockResolvedValueOnce()
    const createdUser = await createOrUpdateUser('accessToken', 'tokenType', undefined)
    expect(addUser).toHaveBeenCalledTimes(1)
    expect(updateUserNfts).toHaveBeenCalledTimes(0)
    expect(updateUser).toHaveBeenCalledTimes(0)
    expect(createdUser.id).toEqual(createdUserId)
    expect(createdUser.discordAvatar).toEqual(discordUser.discordAvatar)
    expect(createdUser.discordBanner).toEqual(discordUser.discordBanner)
    expect(createdUser.discordGuilds).toEqual(discordUser.discordGuilds)
    expect(createdUser.discordId).toEqual(discordUser.discordId)
    expect(createdUser.discordUsername).toEqual(discordUser.discordUsername)
    // for now we use username = discordUsername
    expect(createdUser.username).toEqual(discordUser.discordUsername)
    expect(has('nonce', createdUser)).toBeFalsy()
    expect(createdUser.wallets).toEqual([])
    const updatedAt = dayjs.unix(createdUser.updatedAt)
    expectDateIsNow(updatedAt)
  })

  it('updateUserNfts and updateUser are called if the user is not in the JWT token, but exists in our db', async () => {
    const nftsUpdatedAt = dayjs().subtract(3, 'hour')
    const updatedAt = dayjs().subtract(3, 'hour')
    jest.mocked(fetchDiscordUser).mockResolvedValueOnce(assoc('discordId', 'existing-discordId')(discordUser))
    jest.mocked(findUserByDiscordId).mockResolvedValueOnce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(assoc('nftsUpdatedAt', nftsUpdatedAt), assoc('updatedAt', updatedAt))(existingUser)
    )
    jest.mocked(addUser).mockResolvedValueOnce(createdUserId)
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(updateUser).mockResolvedValueOnce()
    const updatedUser = await createOrUpdateUser('accessToken', 'tokenType', undefined)
    expect(addUser).toHaveBeenCalledTimes(0)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(updateUser).toHaveBeenCalledTimes(1)
    expect(updatedUser.id).toEqual(existingUser.id)
    expect(updatedUser.discordAvatar).toEqual(discordUser.discordAvatar)
    expect(updatedUser.discordBanner).toEqual(discordUser.discordBanner)
    expect(updatedUser.discordGuilds).toEqual(discordUser.discordGuilds)
    expect(updatedUser.discordId).toEqual('existing-discordId')
    expect(updatedUser.discordUsername).toEqual(discordUser.discordUsername)
    // for now we use username = discordUsername
    expect(updatedUser.username).toEqual(discordUser.discordUsername)
    expect(has('nonce', updatedUser)).toBeFalsy()
    expect(updatedUser.wallets).toEqual(existingUser.wallets)
    const newUpdatedAt = dayjs.unix(updatedUser.updatedAt)
    expectDateIsNow(newUpdatedAt)
    const newNftsUpdatedAt = dayjs.unix(updatedUser.nftsUpdatedAt)
    expectDateIsNow(newNftsUpdatedAt)
  })

  it('updateUserNfts and updateUser are called if the user is in the JWT token, updatedAt is more than 1h ago, and user exists in our db', async () => {
    const nftsUpdatedAt = dayjs().subtract(3, 'hour')
    const updatedAt = dayjs().subtract(3, 'hour')
    jest.mocked(fetchDiscordUser).mockResolvedValueOnce(discordUser)
    jest.mocked(findUserByDiscordId).mockResolvedValueOnce(existingUser)
    jest.mocked(addUser).mockResolvedValueOnce(createdUserId)
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(updateUser).mockResolvedValueOnce()
    const updatedUser = await createOrUpdateUser(
      'accessToken',
      'tokenType',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mapUserToAuthUser(pipe(assoc('nftsUpdatedAt', nftsUpdatedAt), assoc('updatedAt', updatedAt))(existingUser))
    )
    expect(addUser).toHaveBeenCalledTimes(0)
    expect(updateUserNfts).toHaveBeenCalledTimes(1)
    expect(updateUser).toHaveBeenCalledTimes(1)
    expect(updatedUser.id).toEqual(existingUser.id)
    expect(updatedUser.discordAvatar).toEqual(discordUser.discordAvatar)
    expect(updatedUser.discordBanner).toEqual(discordUser.discordBanner)
    expect(updatedUser.discordGuilds).toEqual(discordUser.discordGuilds)
    expect(updatedUser.discordId).toEqual(discordUser.discordId)
    expect(updatedUser.discordUsername).toEqual(discordUser.discordUsername)
    // for now we use username = discordUsername
    expect(updatedUser.username).toEqual(discordUser.discordUsername)
    expect(has('nonce', updatedUser)).toBeFalsy()
    expect(updatedUser.wallets).toEqual(existingUser.wallets)
    const newUpdatedAt = dayjs.unix(updatedUser.updatedAt)
    expectDateIsNow(newUpdatedAt)
    const newNftsUpdatedAt = dayjs.unix(updatedUser.nftsUpdatedAt)
    expectDateIsNow(newNftsUpdatedAt)
  })

  it('nothing is called and the user is returned as is if the user is in the JWT token, updatedAt is less than 1h ago', async () => {
    const nftsUpdatedAt = dayjs().subtract(3, 'minute')
    const updatedAt = dayjs().subtract(3, 'minute')
    jest.mocked(fetchDiscordUser).mockResolvedValueOnce(discordUser)
    jest.mocked(findUserByDiscordId).mockResolvedValueOnce(existingUser)
    jest.mocked(addUser).mockResolvedValueOnce(createdUserId)
    jest.mocked(updateUserNfts).mockResolvedValueOnce()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(updateUser).mockResolvedValueOnce()
    const updatedUser = await createOrUpdateUser(
      'accessToken',
      'tokenType',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mapUserToAuthUser(pipe(assoc('nftsUpdatedAt', nftsUpdatedAt), assoc('updatedAt', updatedAt))(existingUser))
    )
    expect(addUser).toHaveBeenCalledTimes(0)
    expect(updateUserNfts).toHaveBeenCalledTimes(0)
    expect(updateUser).toHaveBeenCalledTimes(0)
    expect(fetchDiscordUser).toHaveBeenCalledTimes(0)
    expect(findUserByDiscordId).toHaveBeenCalledTimes(0)
    expect(updatedUser.id).toEqual(existingUser.id)
    expect(updatedUser.discordAvatar).toEqual(existingUser.discordAvatar)
    expect(updatedUser.discordBanner).toEqual(existingUser.discordBanner)
    expect(updatedUser.discordGuilds).toEqual(existingUser.discordGuilds)
    expect(updatedUser.discordId).toEqual(existingUser.discordId)
    expect(updatedUser.discordUsername).toEqual(existingUser.discordUsername)
    // for now we use username = discordUsername
    expect(updatedUser.username).toEqual(existingUser.username)
    expect(has('nonce', updatedUser)).toBeFalsy()
    expect(updatedUser.wallets).toEqual(existingUser.wallets)
  })
})
