import { embedValueForNft } from '../../src/utils/embed/embed-value-for-nft'
import { FirestoreNftData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForNft', () => {
  const nft = {
    id: '8hHFadIrrooORfTOLkBg',
    collection: {
      id: '1aomCtnoesD7WVll6Yi1',
      name: 'Spiral Frequencies'
    },
    name: 'Spiral Frequencies #1376',
    tokenId: 1376
  } as unknown as FirestoreNftData
  it('should return expected result', () => {
    const expectedResult = 'Spiral Frequencies #1376'
    const result = embedValueForNft(nft)
    expect(result).toEqual(expectedResult)
  })
})
