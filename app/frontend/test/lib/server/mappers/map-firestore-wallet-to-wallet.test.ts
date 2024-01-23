import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { mapFirestoreWalletToWallet } from '@echo/frontend/lib/mappers/map-firestore-wallet-to-wallet'
import { type Wallet } from '@echo/model/types/wallet'
import { toLower } from 'ramda'

describe('mappers - mapFirestoreWalletToWallet', () => {
  const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
  const response: Wallet = {
    chainId: 1,
    address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
  }
  it('converts the object', () => {
    expect(mapFirestoreWalletToWallet(wallet)).toStrictEqual(response)
  })
})
