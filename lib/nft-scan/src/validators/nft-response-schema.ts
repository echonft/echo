import type { NftAttribute } from '@echo/model/types/nft'
import { addressSchema } from '@echo/model/validators/address-schema'
import { intStringSchema } from '@echo/model/validators/int-string-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNilOrEmpty } from '@echo/utils/helpers/prop-is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, applySpec, either, ifElse, invoker, isNil, objOf, pipe, prop, reject } from 'ramda'
import { object, string } from 'zod'

export const baseNftAttributeResponseSchema = object({
  attribute_name: string(),
  attribute_value: string()
})

export const baseNftResponseSchema = object({
  attributes: baseNftAttributeResponseSchema.array().nullable(),
  contract_address: addressSchema,
  erc_type: nftTokenTypeSchema,
  image_uri: string().nullable().optional(),
  name: string().nullable().optional(),
  token_id: string().min(1)
})

export const nftResponseSchema = baseNftResponseSchema
  .omit({ attributes: true, token_id: true })
  .extend({
    attributes: baseNftAttributeResponseSchema
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
      .array()
      .nullable()
      .transform((attributes) => (isNil(attributes) ? [] : reject(isNil)(attributes))),
    token_id: intStringSchema
  })
  .transform<PartialNft>(
    applySpec<PartialNft>({
      attributes: prop('attributes'),
      collection: pipe(prop('contract_address'), objOf('contract')),
      name: ifElse(pipe(prop('name'), isNilOrEmpty), pipe(prop('token_id'), invoker(0, 'toString')), prop('name')),
      pictureUrl: prop('image_uri'),
      tokenId: prop('token_id'),
      type: prop('erc_type')
    })
  )
