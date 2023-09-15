import type { SessionDocumentData } from '@echo/firestore/types/model/session-document-data'
import { sessionDocumentDataMock } from '@echo/firestore-mocks/session-document-data-mock'
import { sessionReferenceMock } from '@echo/firestore-mocks/session-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const sessionSnapshotMock: { [key: string]: QueryDocumentSnapshot<SessionDocumentData> } = {
  '6rECUMhevHfxABZ1VNOm': {
    ref: sessionReferenceMock['fQyCioCYwsjeLwpiHb61']!,
    id: sessionReferenceMock['fQyCioCYwsjeLwpiHb61']!.id,
    exists: true,
    data: () => sessionDocumentDataMock['6rECUMhevHfxABZ1VNOm']
  } as unknown as QueryDocumentSnapshot<SessionDocumentData>
}
