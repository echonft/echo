import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { nftDocumentDataMock } from '@echo/firestore-mocks/nft/nft-document-data-mock'
import { nftMock } from '@echo/firestore-mocks/nft/nft-mock'
import { nftSnapshotMock } from '@echo/firestore-mocks/nft/nft-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - nftDataConverter', () => {
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
