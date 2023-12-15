import { sessionDataConverter } from '@echo/firestore/converters/session/session-data-converter'
import { getSessionDocumentDataMockById } from '@echo/firestore-mocks/session/get-session-document-data-mock-by-id'
import { getSessionMockById } from '@echo/firestore-mocks/session/get-session-mock-by-id'
import { sessionSnapshotMock } from '@echo/firestore-mocks/session/session-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - sessionDataConverter', () => {
  const session = getSessionMockById('KI5AJISonKCYslDm51Tn')

  it('from Firestore conversion', () => {
    const snapshot = sessionSnapshotMock.KI5AJISonKCYslDm51Tn!
    expect(sessionDataConverter.fromFirestore(snapshot)).toStrictEqual(session)
  })

  it('to Firestore conversion', () => {
    const documentData = getSessionDocumentDataMockById('KI5AJISonKCYslDm51Tn')
    expect(sessionDataConverter.toFirestore(session)).toStrictEqual(documentData)
  })
})
