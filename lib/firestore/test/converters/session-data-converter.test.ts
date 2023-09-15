import { sessionDataConverter } from '@echo/firestore/converters/session-data-converter'
import { getSessionDocumentDataMockByUserId } from '@echo/firestore-mocks/get-session-document-data-mock-by-user-id'
import { getSessionMockByUserId } from '@echo/firestore-mocks/get-session-mock-by-user-id'
import { sessionSnapshotMock } from '@echo/firestore-mocks/session-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - sessionDataConverter', () => {
  const session = getSessionMockByUserId('6rECUMhevHfxABZ1VNOm')

  it('from Firestore conversion', () => {
    const sessionSnapshot = sessionSnapshotMock['6rECUMhevHfxABZ1VNOm']!
    expect(sessionDataConverter.fromFirestore(sessionSnapshot)).toStrictEqual(session)
  })

  it('to Firestore conversion', () => {
    const sessionDocumentData = getSessionDocumentDataMockByUserId('6rECUMhevHfxABZ1VNOm')
    expect(sessionDataConverter.toFirestore(session)).toStrictEqual(sessionDocumentData)
  })
})
