import { NftAttribute } from '@echo/model'
import { applySpec } from '@echo/utils'
import { prop } from 'ramda'

export const mapNftAttribute = applySpec<Record<string, never>, NftAttribute>({
  value: prop('value'),
  traitType: prop('trait_type')
})
