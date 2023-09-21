import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet/wallet-document-data-mock'
import { walletReferenceMock } from '@echo/firestore-mocks/wallet/wallet-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const walletSnapshotMock: { [key: string]: QueryDocumentSnapshot<WalletDocumentData> } = {
  i28NWtlxElPXCnO0c6BC: {
    ref: walletReferenceMock['i28NWtlxElPXCnO0c6BC']!,
    id: 'i28NWtlxElPXCnO0c6BC',
    exists: true,
    data: () => walletDocumentDataMock['i28NWtlxElPXCnO0c6BC']
  } as unknown as QueryDocumentSnapshot<WalletDocumentData>,
  h6oTcucifUZtxI2ZbqrS: {
    ref: walletReferenceMock['h6oTcucifUZtxI2ZbqrS']!,
    id: 'h6oTcucifUZtxI2ZbqrS',
    exists: true,
    data: () => walletDocumentDataMock['h6oTcucifUZtxI2ZbqrS']
  } as unknown as QueryDocumentSnapshot<WalletDocumentData>
}
