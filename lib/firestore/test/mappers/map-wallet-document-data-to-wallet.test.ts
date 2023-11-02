import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/map-wallet-document-data-to-wallet'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapWalletDocumentDataToWallet', () => {
  it('correctly maps', () => {
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    expect(mapWalletDocumentDataToWallet(wallet)).toStrictEqual({
      chainId: 1,
      address: formatAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1)
    })
  })
})
