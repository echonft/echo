import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { userSnapshotMock } from '@echo/firestore-mocks/user/user-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')

  it('from Firestore conversion', () => {
    const userSnapshot = userSnapshotMock['6rECUMhevHfxABZ1VNOm']!
    expect(userDataConverter.fromFirestore(userSnapshot)).toStrictEqual(user)
  })

  it('to Firestore conversion', () => {
    const userDocumentData = getUserDocumentDataMockById('6rECUMhevHfxABZ1VNOm')
    expect(userDataConverter.toFirestore(user)).toStrictEqual(userDocumentData)
  })
})
