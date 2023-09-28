import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { walletMock } from '@echo/firestore-mocks/wallet/wallet-mock'
import { walletReferenceMock } from '@echo/firestore-mocks/wallet/wallet-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const walletSnapshotMock: Record<string, QueryDocumentSnapshot<FirestoreWallet>> = {
  i28NWtlxElPXCnO0c6BC: {
    ref: walletReferenceMock.i28NWtlxElPXCnO0c6BC!,
    id: 'i28NWtlxElPXCnO0c6BC',
    exists: true,
    data: () => walletMock.i28NWtlxElPXCnO0c6BC
  } as unknown as QueryDocumentSnapshot<FirestoreWallet>,
  h6oTcucifUZtxI2ZbqrS: {
    ref: walletReferenceMock.h6oTcucifUZtxI2ZbqrS!,
    id: 'h6oTcucifUZtxI2ZbqrS',
    exists: true,
    data: () => walletMock.h6oTcucifUZtxI2ZbqrS
  } as unknown as QueryDocumentSnapshot<FirestoreWallet>
}
