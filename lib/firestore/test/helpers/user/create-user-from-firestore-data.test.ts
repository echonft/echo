import { createUserFromFirestoreData } from '@echo/firestore/helpers/user/create-user-from-firestore-data'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - user - createUserFromFirestoreData', () => {
  it('returns the user', () => {
    const user = getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    expect(createUserFromFirestoreData(user, wallet)).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        chainId: 1,
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
      }
    })
  })
})
