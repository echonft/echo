import { WalletResponse } from '@echo/api/types/responses/model/wallet-response'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { mapWalletToResponse } from '@server/mappers/to-response/map-wallet-to-response'

describe('mappers - to-response - mapWalletToResponse', () => {
  const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
  const response: WalletResponse = {
    chainId: 1,
    address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'
  }
  it('converts the object', () => {
    expect(mapWalletToResponse(wallet)).toStrictEqual(response)
  })
})
