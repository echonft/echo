import { mapWalletToWalletData } from '@echo/firestore/mappers/map-wallet-to-wallet-data'
import { getWalletMockById } from '@echo/firestore-mocks/get-wallet-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapWalletToWalletData', () => {
  it('correctly maps', () => {
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    expect(mapWalletToWalletData(wallet)).toStrictEqual({
      chainId: 1,
      address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'
    })
  })
})
