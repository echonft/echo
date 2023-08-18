import { mapUserToUserDetails } from '../../src/mappers/map-user-to-user-details'
import { userMock } from '../mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapUserToUserDetails', () => {
  it('throws an error if the user does not own the passed wallet', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    try {
      mapUserToUserDetails(user, { address: 'not-owned', chainId: 1 })
      expect(true).toBeFalsy()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(error.message).toEqual('user does not own wallet')
    }
  })

  it('to Firestore conversion', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const wallet = {
      address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
      chainId: 1
    }
    const userDetails = mapUserToUserDetails(user, wallet)
    const { id, discordAvatar, discordBanner, discordId, discordUsername } = user
    expect(userDetails).toStrictEqual({
      id,
      discordAvatar,
      discordBanner,
      discordId,
      discordUsername,
      wallet
    })
  })
})
