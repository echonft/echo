import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { propIsNilOrEmpty } from '@echo/utils/fp/prop-is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, applySpec, either, ifElse, prop } from 'ramda'
import { object, string } from 'zod'

export const nftAttributeResponseSchema = object({
  attribute_name: string().readonly(),
  attribute_value: string().readonly(),
  percentage: string().nullable().readonly()
})
  .transform<Nullable<NftAttribute>>(
    ifElse(
      either(propIsNilOrEmpty('attribute_name'), propIsNilOrEmpty('attribute_value')),
      always(null),
      applySpec<NftAttribute>({
        trait: prop('attribute_name'),
        value: prop('attribute_value')
      })
    )
  )
  .readonly()
