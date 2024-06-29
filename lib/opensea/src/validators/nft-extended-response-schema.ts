import type { Collection } from '@echo/model/types/collection'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { emptyStringToUndefined } from '@echo/opensea/helpers/empty-string-to-undefined'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { nftResponseAugmentation } from '@echo/opensea/validators/nft-response-schema'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { always, applySpec, ifElse, is, isNil, map, partialRight, pipe, prop, when } from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

export function nftExtendedResponseSchema(chain: ChainName) {
  const schema = object({
    animation_url: string()
      .or(string().url())
      .nullable()
      .optional()
      .transform(pipe(emptyStringToUndefined, removeQueryFromUrl)),
    is_suspicious: boolean(),
    creator: evmAddressSchema.nullable(),
    traits: object({
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
      .array()
      .nullable()
      .transform(
        ifElse(
          isNil,
          always([]),
          map(
            applySpec<NftAttribute>({
              trait: prop('trait_type'),
              value: pipe(prop('value'), when(is(Number), partialRight(parseInt, [10])))
            })
          )
        )
      ),
    owners: object({
      address: evmAddressSchema,
      quantity: number()
    })
      .array()
      .nullable()
  }).extend(nftResponseAugmentation)

  function transform(chain: ChainName) {
    return function (response: typeof schema._output) {
      if (response.is_suspicious) {
        return undefined
      }
      return applySpec<PartialNft>({
        animationUrl: prop('animation_url'),
        attributes: prop('traits'),
        collection: applySpec<Pick<Collection, 'contract' | 'slug'>>({
          contract: {
            address: prop('contract'),
            chain: always(chain)
          },
          slug: prop('collection')
        }),
        name: prop('name'),
        metadataUrl: prop('metadata_url'),
        pictureUrl: prop('image_url'),
        tokenId: prop('identifier')
      })(response)
    }
  }
  return schema.transform(transform(chain))
}
