import type { Nft } from '@echo/model/types/nft'
import { addressSchema } from '@echo/model/validators/address-schema'
import { seiAddressSchema } from '@echo/model/validators/sei-address-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'
import { applySpec, dissoc, objOf, pipe, prop, unless, when } from 'ramda'
import { array, boolean, nullable, number, object, string } from 'zod'

function removeNullOrEmptyString(value: string | null): string | undefined {
  if (isNilOrEmpty(value)) {
    return undefined
  }
  return value
}

const collectionInfoSchema = object({
  name: string(),
  symbol: string(),
  creator_id: nullable(number()),
  description: nullable(string()),
  evm_address: addressSchema,
  sei_address: seiAddressSchema
})

const ownerInfoSchema = object({
  pfp: nullable(string().url()),
  domain: nullable(string()),
  evm_address: nullable(addressSchema),
  sei_address: seiAddressSchema
})

const traitSchema = object({
  type: string(),
  value: string(),
  display_type: nullable(string()),
  num_tokens_with_trait: number()
})

export const baseNftResponseSchema = object({
  id: string(),
  image: nullable(string().url()),
  last_sale: nullable(
    object({
      denom: string(),
      amount: string()
    })
  ),
  last_sale_num: nullable(string()),
  top_offer: nullable(number()),
  name: string(),
  animation_url: nullable(string().url()),
  rank: nullable(number()),
  collection_info: collectionInfoSchema,
  auction_info: nullable(object({})),
  immediate_reward_id: nullable(string()),
  deploy_env: string(),
  version: string().datetime()
})

export const innerExtendedNftResponseSchema = baseNftResponseSchema.extend({
  description: nullable(string()),
  owner_info: ownerInfoSchema,
  traits: nullable(array(traitSchema)),
  hidden: boolean()
})

const transformToNft = (data: unknown) =>
  pipe(
    applySpec<Nft>({
      collection: pipe(
        prop('collection_info'),
        applySpec({
          contract: prop('evm_address'),
          name: prop('name'),
          description: pipe(prop('description'), removeNullOrEmptyString),
          seiAddress: prop('sei_address')
        })
      ),
      identifier: prop('id'),
      imageUrl: pipe(prop('image'), removeNullOrEmptyString),
      name: prop('name'),
      animationUrl: pipe(prop('animation_url'), removeNullOrEmptyString),
      attributes: pipe(
        prop('traits'),
        unless(isNilOrEmpty, (traits) =>
          traits.map((trait) => ({
            trait: trait.type,
            value: trait.value
          }))
        )
      ),
      owner: pipe(prop('owner_info'), when(propIsNotNil('evm_address'), prop('evm_address')))
    }),
    pipe(
      when(propIsNil('imageUrl'), dissoc('imageUrl')),
      when(propIsNil('animationUrl'), dissoc('animationUrl')),
      when(propIsNil('attributes'), dissoc('attributes')),
      when(propIsNil('owner'), dissoc('owner'))
    ),
    objOf('nft')
  )(data)

export const nftResponseSchema = baseNftResponseSchema.transform(transformToNft)
export const extendedNftResponseSchema = innerExtendedNftResponseSchema.transform(transformToNft)
