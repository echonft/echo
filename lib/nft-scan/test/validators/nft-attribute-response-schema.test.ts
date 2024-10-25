import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { attributesResponseMock } from '@echo/nft-scan/mocks/attributes-response-mock'
import { nftAttributeResponseSchema } from '@echo/nft-scan/validators/nft-attribute-response-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - nftAttributeResponseSchema', () => {
  it('maps correctly', () => {
    const expectedResult: NftAttribute[] = [
      { trait: 'Backgrounds', value: 'Purple' },
      { trait: 'Base', value: 'Purple Gradient' },
      { trait: 'Clothes', value: 'Blue Puffer' },
      { trait: 'Head', value: 'None' },
      { trait: 'Eyes', value: 'None' },
      { trait: 'Acessories', value: 'None' }
    ]
    expect(nftAttributeResponseSchema.array().parse(attributesResponseMock())).toEqual(expectedResult)
  })
})
