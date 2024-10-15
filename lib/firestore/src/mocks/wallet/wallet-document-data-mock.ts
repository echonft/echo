import { userMockJohnnyId } from '@echo/firestore/mocks/user/user-document-data-mock'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import { toLower } from 'ramda'

export function walletMockJohnnyId() {
  return 'i28NWtlxElPXCnO0c6BC'
}

export function walletDocumentDataMock(): Record<string, WalletDocumentData> {
  return {
    i28NWtlxElPXCnO0c6BC: {
      userId: userMockJohnnyId(),
      chain: 'ethereum',
      address: toLower('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e'),
      isEvm: true
    },
    h6oTcucifUZtxI2ZbqrS: {
      userId: '6rECUMhevHfxABZ1VNOm',
      chain: 'ethereum',
      address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
      isEvm: true
    }
  }
}
