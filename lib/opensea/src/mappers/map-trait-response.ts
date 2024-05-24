import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { TraitResponse } from '@echo/opensea/types/response/nft-extended-response'
import { applySpec, prop } from 'ramda'

export function mapTraitResponse(response: TraitResponse): NftAttribute {
  return applySpec<NftAttribute>({
    trait: prop('trait_type'),
    value: prop('value')
  })(response)
}
