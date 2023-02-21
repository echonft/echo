import { getFirestoreWalletData } from '../../data/user/get-firestore-wallet-data'
import { userData } from '../../utils/test/mocks/user/user-data'
import { describe, expect, it } from '@jest/globals'
import { equals, pipe, prop } from 'ramda'

describe('convertWallet', () => {
  it('correct conversion', async () => {
    const wallet = await getFirestoreWalletData('oE6yUEQBPn7PZ89yMjKn', 'HFXC6RGOBaHlwDhfuKn6')
    expect(wallet).toEqual(
      userData['oE6yUEQBPn7PZ89yMjKn']!.wallets.data!.find(pipe(prop('id'), equals('HFXC6RGOBaHlwDhfuKn6')))
    )
  })
})
