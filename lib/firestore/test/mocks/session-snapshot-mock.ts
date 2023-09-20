import type { SessionDocumentData } from '@echo/firestore/types/model/session-document-data'
import { sessionDocumentDataMock } from '@echo/firestore-mocks/session-document-data-mock'
import { sessionReferenceMock } from '@echo/firestore-mocks/session-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const sessionSnapshotMock: { [key: string]: QueryDocumentSnapshot<SessionDocumentData> } = {
  KI5AJISonKCYslDm51Tn: {
    ref: sessionReferenceMock['KI5AJISonKCYslDm51Tn']!,
    id: sessionReferenceMock['KI5AJISonKCYslDm51Tn']!.id,
    exists: true,
    data: () => sessionDocumentDataMock['KI5AJISonKCYslDm51Tn']
  } as unknown as QueryDocumentSnapshot<SessionDocumentData>
}
