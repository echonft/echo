import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import { getWalletDocumentDataMockById } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('mappers - mapWalletDocumentDataToWallet', () => {
  it('maps correctly', () => {
    const wallet = getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC')
    expect(mapWalletDocumentDataToWallet(wallet)).toStrictEqual({
      chain: 'ethereum',
      address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
    })
  })
})
