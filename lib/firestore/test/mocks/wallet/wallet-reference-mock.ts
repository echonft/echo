import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const walletReferenceMock: Record<string, DocumentReference<WalletDocumentData>> = {
  i28NWtlxElPXCnO0c6BC: {
    id: 'i28NWtlxElPXCnO0c6BC',
    path: 'wallets/i28NWtlxElPXCnO0c6BC'
  } as unknown as DocumentReference<WalletDocumentData>,
  h6oTcucifUZtxI2ZbqrS: {
    id: 'h6oTcucifUZtxI2ZbqrS',
    path: 'wallets/h6oTcucifUZtxI2ZbqrS'
  } as unknown as DocumentReference<WalletDocumentData>
}
