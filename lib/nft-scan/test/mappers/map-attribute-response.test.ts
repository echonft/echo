import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { mapAttributeResponse } from '@echo/nft-scan/mappers/map-attribute-response'
import { attributesResponseMock } from '@echo/nft-scan-mocks/attributes-response-mock'
import { describe, expect, it } from '@jest/globals'
import { map } from 'ramda'

describe('mappers - mapAttributeResponse', () => {
  it('maps correctly', () => {
    const expectedResult: NftAttribute[] = [
      { trait: 'Backgrounds', value: 'Purple' },
      { trait: 'Base', value: 'Purple Gradient' },
      { trait: 'Clothes', value: 'Blue Puffer' },
      { trait: 'Head', value: 'None' },
      { trait: 'Eyes', value: 'None' },
      { trait: 'Acessories', value: 'None' }
    ]
    const mappedResult = map(mapAttributeResponse)(attributesResponseMock)
    expect(mappedResult).toEqual(expectedResult)
  })
})
