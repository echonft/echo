import { mapUserToAuthUser } from '../../../src/lib/server/mappers/auth/map-user-to-auth-user'
import { User } from '@echo/firestore-types'
import dayjs from 'dayjs'

describe('mappers - auth - mapUserToAuthUser', () => {
  it('maps correctly', () => {
    const user: User = {
      discordAvatar: 'discordAvatar',
      discordBanner: 'discordBanner',
      discordGuilds: [{ discordId: 'guild-id' }, { discordId: 'another-guild-id' }],
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'user-id',
      nonce: 'noncenoncenonce',
      nftsUpdatedAt: dayjs.unix(1676984897),
      username: 'username',
      updatedAt: dayjs.unix(1676984897),
      wallets: [
        {
          address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
          chainId: 1
        },
        {
          address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
          chainId: 1
        }
      ]
    }
    expect(mapUserToAuthUser(user)).toStrictEqual({
      discordAvatar: 'discordAvatar',
      discordBanner: 'discordBanner',
      discordGuilds: [{ discordId: 'guild-id' }, { discordId: 'another-guild-id' }],
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'user-id',
      nftsUpdatedAt: 1676984897,
      updatedAt: 1676984897,
      username: 'username',
      wallets: [
        {
          address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
          chainId: 1
        },
        {
          address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
          chainId: 1
        }
      ]
    })
  })
})
