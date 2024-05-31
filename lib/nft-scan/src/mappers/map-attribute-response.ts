import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { AttributeResponse } from '@echo/nft-scan/types/response/attribute-response'
import { applySpec, prop } from 'ramda'

export function mapAttributeResponse(response: AttributeResponse): NftAttribute {
  return applySpec<NftAttribute>({
    trait: prop('attribute_name'),
    value: prop('attribute_value')
  })(response)
}
