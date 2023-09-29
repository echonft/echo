import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { userDocumentDataMock } from '@echo/firestore-mocks/user/user-document-data-mock'
import { userReferenceMock } from '@echo/firestore-mocks/user/user-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const userSnapshotMock: Record<string, QueryDocumentSnapshot<UserDocumentData>> = {
  '6rECUMhevHfxABZ1VNOm': {
    ref: userReferenceMock['6rECUMhevHfxABZ1VNOm']!,
    id: userReferenceMock['6rECUMhevHfxABZ1VNOm']!.id,
    exists: true,
    data: () => userDocumentDataMock['6rECUMhevHfxABZ1VNOm']
  } as unknown as QueryDocumentSnapshot<UserDocumentData>,
  oE6yUEQBPn7PZ89yMjKn: {
    ref: userReferenceMock.oE6yUEQBPn7PZ89yMjKn!,
    id: userReferenceMock.oE6yUEQBPn7PZ89yMjKn!.id,
    exists: true,
    data: () => userDocumentDataMock.oE6yUEQBPn7PZ89yMjKn
  } as unknown as QueryDocumentSnapshot<UserDocumentData>
}
