import { getAllUserWalletAddresses } from '../../../src/crud/user/get-all-user-wallet-addresses'
import { describe, expect, it } from '@jest/globals'

describe('crud - user - getAllUserWalletAddresses', () => {
  it('retrieves all user wallet addresses from Firestore', async () => {
    const addresses = await getAllUserWalletAddresses()
    expect(addresses.length).toEqual(6)
    expect(addresses[0]).toEqual('0xf672715f2bA85794659a7150e8C21F8d157bFe1D')
    expect(addresses[1]).toEqual('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    expect(addresses[2]).toEqual('0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9')
    expect(addresses[3]).toEqual('0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE')
    expect(addresses[4]).toEqual('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
    expect(addresses[5]).toEqual('0xf672715f2bA85794659a7150e8C21F8d157bFe1D')
  })
})
