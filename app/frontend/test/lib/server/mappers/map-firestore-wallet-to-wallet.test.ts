import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { mapFirestoreWalletToWallet } from '@echo/frontend/lib/server/mappers/map-firestore-wallet-to-wallet'
import { type Wallet } from '@echo/model/types/wallet'
import { getAddress } from 'viem'

describe('mappers - mapFirestoreWalletToWallet', () => {
  const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
  const response: Wallet = {
    chainId: 1,
    address: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1)
  }
  it('converts the object', () => {
    expect(mapFirestoreWalletToWallet(wallet)).toStrictEqual(response)
  })
})
