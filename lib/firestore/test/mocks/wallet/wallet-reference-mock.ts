import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const walletReferenceMock: { [key: string]: DocumentReference<FirestoreWallet> } = {
  i28NWtlxElPXCnO0c6BC: {
    id: 'i28NWtlxElPXCnO0c6BC',
    path: 'wallets/i28NWtlxElPXCnO0c6BC'
  } as unknown as DocumentReference<FirestoreWallet>,
  h6oTcucifUZtxI2ZbqrS: {
    id: 'h6oTcucifUZtxI2ZbqrS',
    path: 'wallets/h6oTcucifUZtxI2ZbqrS'
  } as unknown as DocumentReference<FirestoreWallet>
}
