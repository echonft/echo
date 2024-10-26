import type { Chain } from '@echo/model/constants/chain'
import type { Collection } from '@echo/model/types/collection'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { nftResponseAugmentation } from '@echo/opensea/validators/nft-response-schema'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, applySpec, is, isNil, map, partialRight, pipe, prop, when } from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

const nftTraitSchema = object({
  trait_type: string(),
  display_type: nativeEnum({
    number: 'number',
    boostPercentage: 'boost_percentage',
    boostNumber: 'boost_number',
    author: 'author',
    date: 'date',
    none: 'None'
  })
    .nullable()
    .optional(),
  max_value: string().nullable().optional(),
  value: string().or(number())
})

export function nftExtendedResponseSchema(chain: Chain) {
  return object({
    is_suspicious: boolean(),
    creator: evmAddressSchema.nullable(),
    traits: nftTraitSchema
      .array()
      .nullable()
      .transform((traits) =>
        isNil(traits)
          ? ([] as NftAttribute[])
          : map(
              applySpec<NftAttribute>({
                trait: prop('trait_type'),
                value: pipe(prop('value'), when(is(Number), partialRight(parseInt, [10])))
              }),
              traits
            )
      ),
    owners: object({
      address: evmAddressSchema,
      quantity: number()
    })
      .array()
      .nullable()
  })
    .extend(nftResponseAugmentation)
    .transform<Nullable<PartialNft>>((response) => {
      if (response.is_suspicious) {
        return undefined
      }
      return pipe(
        applySpec<PartialNft>({
          attributes: prop('traits'),
          collection: applySpec<Pick<Collection, 'contract' | 'slug'>>({
            contract: {
              address: prop('contract'),
              chain: always(chain)
            },
            slug: prop('collection')
          }),
          name: prop('name'),
          pictureUrl: prop('image_url'),
          tokenId: prop('identifier'),
          type: prop('token_standard')
        }),
        removeNilProps
      )(response)
    })
}
