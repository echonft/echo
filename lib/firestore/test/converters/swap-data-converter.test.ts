import { swapDataConverter } from '../../src/converters/swap-data-converter'
import { swapDocumentDataMock } from '../mocks/swap-document-data-mock'
import { swapMock } from '../mocks/swap-mock'
import { swapSnapshotMock } from '../mocks/swap-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('swapDataConverter', () => {
  it('from Firestore conversion', () => {
    const swapSnapshot = swapSnapshotMock['hS6KtAJ03bSolumoHvDJ']!
    const swap = swapMock['hS6KtAJ03bSolumoHvDJ']
    expect(swapDataConverter.fromFirestore(swapSnapshot)).toEqual(swap)
  })

  it('to Firestore conversion', () => {
    const swap = swapMock['hS6KtAJ03bSolumoHvDJ']!
    const swapDocumentData = swapDocumentDataMock['hS6KtAJ03bSolumoHvDJ']
    expect(swapDataConverter.toFirestore(swap)).toEqual(swapDocumentData)
  })
})
