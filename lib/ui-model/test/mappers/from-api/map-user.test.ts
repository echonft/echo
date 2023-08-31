import { mapUser } from '../../../src/mappers/from-api/map-user'
import { UserResponse } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'

describe('mappers - from-api - mapUser', () => {
  it('maps non-existent props to undefined props', () => {
    const response: UserResponse = {
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: { address: '0xaddress', chainId: 1 }
    }
    expect(mapUser(response)).toStrictEqual({
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: { address: '0xaddress', chainId: 1 },
      discordAvatar: undefined,
      discordBanner: undefined
    })
  })

  it('maps all props', () => {
    const response: UserResponse = {
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: { address: '0xaddress', chainId: 1 },
      discordAvatar: 'discordAvatar',
      discordBanner: 'discordBanner'
    }
    expect(mapUser(response)).toStrictEqual({
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: { address: '0xaddress', chainId: 1 },
      discordAvatar: 'discordAvatar',
      discordBanner: 'discordBanner'
    })
  })
})
