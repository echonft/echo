import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { NftAttributeResponse } from '@echo/nft-scan/types/response/nft-attribute-response'
import { applySpec, prop } from 'ramda'

export function mapAttributeResponse(response: NftAttributeResponse): NftAttribute {
  return applySpec<NftAttribute>({
    trait: prop('attribute_name'),
    value: prop('attribute_value')
  })(response)
}
