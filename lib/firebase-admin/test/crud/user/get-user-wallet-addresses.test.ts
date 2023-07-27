import { getUserWalletAddresses } from '../../../src/crud/user/get-user-wallet-addresses'
import { userFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('crud - user - getUserWalletAddresses', () => {
  it('retrieves addresses for all wallets of a user', async () => {
    const result = getUserWalletAddresses(userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!)
    expect(result.length).toEqual(4)
    expect(result[0]).toEqual('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    expect(result[1]).toEqual('0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9')
    expect(result[2]).toEqual('0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE')
    expect(result[3]).toEqual('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
  })
})
