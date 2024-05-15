import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { Trait } from '@echo/opensea/types/response/get-nft-response'
import { applySpec, prop } from 'ramda'

export function mapTrait(trait: Trait): NftAttribute {
  return applySpec<NftAttribute>({
    trait: prop('trait_type'),
    value: prop('value')
  })(trait)
}
