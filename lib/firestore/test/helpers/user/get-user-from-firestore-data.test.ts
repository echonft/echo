import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getWalletDocumentDataMockById } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - user - getUserFromFirestoreData', () => {
  it('returns the user', () => {
    const user = getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC')
    expect(getUserFromFirestoreData(user, wallet)).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        chain: 'ethereum',
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
      }
    })
  })
})
