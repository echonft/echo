import { nftDataConverter } from '../../src/converters/nft-data-converter'
import { nftDocumentDataMock } from '../mocks/nft-document-data-mock'
import { nftMock } from '../mocks/nft-mock'
import { nftSnapshotMock } from '../mocks/nft-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('nftDataConverter', () => {
  it('from Firestore conversion', () => {
    const nftSnapshot = nftSnapshotMock['8hHFadIrrooORfTOLkBg']!
    const nft = nftMock['8hHFadIrrooORfTOLkBg']
    expect(nftDataConverter.fromFirestore(nftSnapshot)).toStrictEqual(nft)
  })

  it('to Firestore conversion', () => {
    const nft = nftMock['8hHFadIrrooORfTOLkBg']!
    const nftDocumentData = nftDocumentDataMock['8hHFadIrrooORfTOLkBg']!
    expect(nftDataConverter.toFirestore(nft)).toStrictEqual(nftDocumentData)
  })
})
