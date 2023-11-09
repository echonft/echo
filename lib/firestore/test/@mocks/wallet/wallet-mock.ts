import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { formatAddress } from '@echo/utils/helpers/format-address'

export const walletMock: Record<string, WalletDocumentData> = {
  i28NWtlxElPXCnO0c6BC: {
    id: 'i28NWtlxElPXCnO0c6BC',
    userId: 'oE6yUEQBPn7PZ89yMjKn',
    chainId: 1,
    address: formatAddress('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e', 1)
  },
  h6oTcucifUZtxI2ZbqrS: {
    id: 'h6oTcucifUZtxI2ZbqrS',
    userId: '6rECUMhevHfxABZ1VNOm',
    chainId: 1,
    address: formatAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1)
  }
}
