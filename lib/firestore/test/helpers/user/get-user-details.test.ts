import { getDiscordUserMockById } from '@echo/firestore-mocks/get-discord-user-mock-by-id'
import { getUserMockById } from '@echo/firestore-mocks/get-user-mock-by-id'
import { getWalletMockById } from '@echo/firestore-mocks/get-wallet-mock-by-id'
import { getUserDetails } from '@echo/firestore/helpers/user/get-user-details'
import { describe, expect, it } from '@jest/globals'

describe('helpers - user', () => {
  it('returns the user details', () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const discordUser = getDiscordUserMockById('WpgDZHmdpvHjykHRRWp7')
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    expect(getUserDetails(user.name, discordUser, wallet)).toStrictEqual({
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      username: 'johnnycagewins',
      wallet: {
        chainId: 1,
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'
      }
    })
  })
})
