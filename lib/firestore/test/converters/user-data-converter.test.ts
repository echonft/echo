import { userDataConverter } from '../../src/converters/user-data-converter'
import { userDocumentDataMock } from '../mocks/user-document-data-mock'
import { userMock } from '../mocks/user-mock'
import { userSnapshotMock } from '../mocks/user-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  it('from Firestore conversion', () => {
    const userSnapshot = userSnapshotMock['6rECUMhevHfxABZ1VNOm']!
    const user = userMock['6rECUMhevHfxABZ1VNOm']
    expect(userDataConverter.fromFirestore(userSnapshot)).toStrictEqual(user)
  })

  it('to Firestore conversion', () => {
    const user = userMock['6rECUMhevHfxABZ1VNOm']!
    const userDocumentData = userDocumentDataMock['6rECUMhevHfxABZ1VNOm']
    expect(userDataConverter.toFirestore(user)).toStrictEqual(userDocumentData)
  })
})
