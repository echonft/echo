import { mapUserDetails } from '../../../src/lib/server/mappers/to-response/map-user-details'
import { UserDetails } from '@echo/firestore'

describe('mappers - to-response - mapUserDetails', () => {
  it('returns the object as is if there are no undefined props', () => {
    const userDetails: UserDetails = {
      discordAvatar: 'avatar',
      discordBanner: 'banner',
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: {
        chainId: 1,
        address: '0xaddress'
      }
    }
    expect(mapUserDetails(userDetails)).toStrictEqual(userDetails)
  })
  it('removes undefined props', () => {
    const userDetails: UserDetails = {
      discordAvatar: undefined,
      discordBanner: undefined,
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: {
        chainId: 1,
        address: '0xaddress'
      }
    }
    expect(mapUserDetails(userDetails)).toStrictEqual({
      discordId: 'discordId',
      discordUsername: 'discordUsername',
      id: 'id',
      wallet: {
        chainId: 1,
        address: '0xaddress'
      }
    })
  })
})
