import { getUser } from '@echo/firestore/helpers/user/get-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/map-wallet-document-data-to-wallet'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { describe, expect, it } from '@jest/globals'

describe('helpers - user - getUser', () => {
  it('returns the user', () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = mapWalletDocumentDataToWallet(getWalletMockById('i28NWtlxElPXCnO0c6BC'))
    expect(getUser(user, wallet)).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        chainId: 1,
        address: formatAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1)
      }
    })
  })
})
