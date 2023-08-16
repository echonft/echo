import { contractConverter } from '../../src/converters/contract-converter'
import { ContractDocumentData } from '../../src/types/model/document-data/contract-document-data'
import { contractDocumentDataMock } from '../mocks/contract-document-data-mock'
import { contractMock } from '../mocks/contract-mock'
import { contractSnapshotMock } from '../mocks/contract-snapshot-mock'
import { describe, expect, it } from '@jest/globals'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('convertContract', () => {
  it('from Firestore conversion', () => {
    const contractSnapshot = contractSnapshotMock['37dBlwJYahEAKeL0rNP8'] as QueryDocumentSnapshot<ContractDocumentData>
    const contract = contractMock['37dBlwJYahEAKeL0rNP8']
    expect(contractConverter.fromFirestore(contractSnapshot)).toEqual(contract)
  })

  it('to Firestore conversion', () => {
    const contract = contractMock['37dBlwJYahEAKeL0rNP8']!
    const contractDocumentData = contractDocumentDataMock['37dBlwJYahEAKeL0rNP8']
    expect(contractConverter.toFirestore(contract)).toEqual(contractDocumentData)
  })
})
