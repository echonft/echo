import { mapUserToUserDetails } from '../../src/mappers/map-user-to-user-details'
import { getUserMockById } from '../mocks/get-user-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { dissoc, pick } from 'ramda'

describe('mappers - mapUserToUserDetails', () => {
  it('throws an error if the user does not have an id', () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    expect(() => mapUserToUserDetails(dissoc('id', user), { address: '0xaddress', chainId: 1 })).toThrow()
  })

  it('to Firestore conversion', () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = {
      address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
      chainId: 1
    }
    const userDetails = mapUserToUserDetails(user, wallet)
    expect(userDetails).toStrictEqual({
      ...pick(['id', 'discordAvatar', 'discordBanner', 'discordId', 'discordUsername', 'username'], user),
      wallet
    })
  })
})
