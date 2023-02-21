import { getFirestoreWalletData } from '../../data/user/get-firestore-wallet-data'
import { users } from '../../utils/test/mocks/user/user'
import { mapWallet } from '@echo/firestore/dist/mappers/user'
import { describe, expect, it } from '@jest/globals'
import { equals, pipe, prop } from 'ramda'

describe('mapWallet', () => {
  it('correct mapping', async () => {
    const fetchedWallet = await pipe(getFirestoreWalletData, mapWallet)('oE6yUEQBPn7PZ89yMjKn', 'HFXC6RGOBaHlwDhfuKn6')
    expect(fetchedWallet).toEqual(
      users['oE6yUEQBPn7PZ89yMjKn']!.wallets!.find(pipe(prop('id'), equals('HFXC6RGOBaHlwDhfuKn6')))
    )
  })
})
