import { swapDataConverter } from '@echo/firestore/converters/swap/swap-data-converter'
import { getSwapDocumentDataMockById } from '@echo/firestore-mocks/swap/get-swap-document-data-mock-by-id'
import { getSwapMockById } from '@echo/firestore-mocks/swap/get-swap-mock-by-id'
import { swapSnapshotMock } from '@echo/firestore-mocks/swap/swap-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - swapDataConverter', () => {
  const swap = getSwapMockById('2ipuV3drjQlzEgkUkW7q')

  it('from Firestore conversion', () => {
    const swapSnapshot = swapSnapshotMock['2ipuV3drjQlzEgkUkW7q']!
    expect(swapDataConverter.fromFirestore(swapSnapshot)).toStrictEqual(swap)
  })

  it('to Firestore conversion', () => {
    const swapDocumentData = getSwapDocumentDataMockById('2ipuV3drjQlzEgkUkW7q')
    expect(swapDataConverter.toFirestore(swap)).toStrictEqual(swapDocumentData)
  })
})
